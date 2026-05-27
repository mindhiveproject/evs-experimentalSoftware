"""
Utilities for extracting a lightweight subset from XDF recordings.

Design goals:
- Keep stream selection deterministic for MD-V7 source streams.
- Keep all channels for multi-channel sources like LiveAmp/RDA.
- Save and load compact NPZ artifacts for downstream analysis.
"""

from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

import numpy as np
import pyxdf


NUMERIC_DTYPE_KINDS = {"b", "i", "u", "f", "c"}


def load_xdf(xdf_path: str | Path) -> tuple[list[dict[str, Any]], dict[str, Any], float]:
    """Load an XDF file and return (streams, header, t0)."""
    streams, header = pyxdf.load_xdf(str(xdf_path))
    non_empty_starts = [np.min(s["time_stamps"]) for s in streams if len(s["time_stamps"]) > 0]
    t0 = float(min(non_empty_starts)) if non_empty_starts else 0.0
    return streams, header, t0


def summarize_streams(streams: list[dict[str, Any]], t0: float) -> list[dict[str, Any]]:
    """Return structured summary metadata for each stream."""
    summary: list[dict[str, Any]] = []
    for idx, stream in enumerate(streams):
        info = stream.get("info", {})
        ts = np.asarray(stream.get("time_stamps", []), dtype=float)
        n_samples = len(stream.get("time_series", []))
        t_min = float(np.min(ts) - t0) if ts.size else None
        t_max = float(np.max(ts) - t0) if ts.size else None

        summary.append(
            {
                "index": idx,
                "name": _safe_first(info.get("name"), ""),
                "source_id": _safe_first(info.get("source_id"), ""),
                "type": _safe_first(info.get("type"), ""),
                "channel_count": _to_int(_safe_first(info.get("channel_count"), 0)),
                "nominal_srate": _to_float(_safe_first(info.get("nominal_srate"), 0.0)),
                "n_samples": int(n_samples),
                "t_min_rel_s": t_min,
                "t_max_rel_s": t_max,
            }
        )
    return summary


def select_streams(
    streams: list[dict[str, Any]],
    *,
    md_v7_source_prefix: str = "MD-V7",
    md_v7_name_patterns: list[str] | None = None,
    keep_markers: bool = True,
    keep_liveamp: bool = True,
    keep_rda: bool = True,
    extra_name_patterns: list[str] | None = None,
) -> dict[str, Any]:
    """
    Build deterministic stream/channel selection.

    channel_selection maps stream index -> None or list[int]
    - None means keep all channels for that stream.
    """
    default_md_patterns = ["eda", "ppg", "mag", "hr", "heart", "temp", "acc", "gyro"]
    md_patterns = [p.lower() for p in (md_v7_name_patterns or default_md_patterns)]
    extra_patterns = [p.lower() for p in (extra_name_patterns or [])]
    md_prefix = md_v7_source_prefix.lower()

    stream_indices: list[int] = []
    channel_selection: dict[int, None] = {}
    reasons: dict[int, str] = {}

    for idx, stream in enumerate(streams):
        info = stream.get("info", {})
        name = str(_safe_first(info.get("name"), "")).lower()
        source_id = str(_safe_first(info.get("source_id"), "")).lower()

        include = False
        reason = ""

        is_md_v7 = source_id.startswith(md_prefix)
        is_marker = ("marker" in name) or ("psychopy" in source_id)
        is_liveamp = ("liveamp" in source_id) or ("liveamp" in name)
        is_rda = (source_id == "rda") or ("rda" in source_id) or ("rda" in name)

        if keep_markers and is_marker:
            include = True
            reason = "marker"
        elif is_md_v7 and any(pattern in name for pattern in md_patterns):
            include = True
            reason = "md_v7_pattern"
        elif keep_liveamp and is_liveamp:
            include = True
            reason = "liveamp_keep_all_channels"
        elif keep_rda and is_rda:
            include = True
            reason = "rda_keep_all_channels"
        elif extra_patterns and any(pattern in name or pattern in source_id for pattern in extra_patterns):
            include = True
            reason = "extra_pattern"

        if include:
            stream_indices.append(idx)
            channel_selection[idx] = None
            reasons[idx] = reason

    return {
        "stream_indices": stream_indices,
        "channel_selection": channel_selection,
        "reasons": reasons,
        "config": {
            "md_v7_source_prefix": md_v7_source_prefix,
            "md_v7_name_patterns": md_patterns,
            "keep_markers": keep_markers,
            "keep_liveamp": keep_liveamp,
            "keep_rda": keep_rda,
            "extra_name_patterns": extra_patterns,
        },
    }


def extract_stream_subset(
    streams: list[dict[str, Any]],
    t0: float,
    selection: dict[str, Any],
    *,
    source_path: str | Path | None = None,
    time_window: tuple[float, float] | None = None,
) -> dict[str, Any]:
    """
    Extract selected streams into a compact in-memory payload.

    time_window is relative to t0 and represented as (start_s, end_s).
    """
    selected_indices = selection.get("stream_indices", [])
    channel_selection = selection.get("channel_selection", {})
    selection_config = selection.get("config", {})
    reasons = selection.get("reasons", {})

    extracted: dict[str, Any] = {
        "format_version": 1,
        "created_utc": datetime.now(timezone.utc).isoformat(),
        "source_path": str(source_path) if source_path is not None else None,
        "source_basename": Path(source_path).name if source_path else None,
        "t0": float(t0),
        "time_window": list(time_window) if time_window is not None else None,
        "selection_config": selection_config,
        "streams": {},
    }

    for idx in selected_indices:
        stream = streams[idx]
        info = stream.get("info", {})
        ts_raw = np.asarray(stream.get("time_stamps", []), dtype=float)
        data_raw = np.asarray(stream.get("time_series", []))
        ts_rel = ts_raw - float(t0)

        if time_window is not None and ts_rel.size:
            start_s, end_s = time_window
            mask = (ts_rel >= start_s) & (ts_rel <= end_s)
            ts_rel = ts_rel[mask]
            data_raw = data_raw[mask]

        selected_channels = channel_selection.get(idx)
        data_selected = _select_channels(data_raw, selected_channels)

        stream_payload = {
            "index": idx,
            "name": _safe_first(info.get("name"), ""),
            "source_id": _safe_first(info.get("source_id"), ""),
            "type": _safe_first(info.get("type"), ""),
            "nominal_srate": _to_float(_safe_first(info.get("nominal_srate"), 0.0)),
            "channel_count": _to_int(_safe_first(info.get("channel_count"), 0)),
            "channel_labels": _extract_channel_labels(info),
            "selected_channels": selected_channels,
            "selection_reason": reasons.get(idx, ""),
            "dtype_kind": str(data_selected.dtype.kind) if data_selected.size else "f",
            "time_stamps_rel_s": ts_rel,
            "time_series": data_selected,
            "n_samples": int(ts_rel.size),
        }
        extracted["streams"][idx] = stream_payload

    return extracted


def save_npz(extracted: dict[str, Any], out_path: str | Path) -> Path:
    """Persist extracted payload as a lightweight NPZ artifact."""
    out = Path(out_path)
    out.parent.mkdir(parents=True, exist_ok=True)

    stream_indices = sorted(int(idx) for idx in extracted.get("streams", {}).keys())
    npz_payload: dict[str, Any] = {
        "meta_json": json.dumps(
            {
                "format_version": extracted.get("format_version", 1),
                "created_utc": extracted.get("created_utc"),
                "source_path": extracted.get("source_path"),
                "source_basename": extracted.get("source_basename"),
                "t0": extracted.get("t0"),
                "time_window": extracted.get("time_window"),
                "selection_config": extracted.get("selection_config", {}),
                "stream_indices": stream_indices,
            }
        )
    }

    for idx in stream_indices:
        stream_payload = extracted["streams"][idx]
        prefix = f"stream_{idx}"
        meta = {
            "index": int(stream_payload.get("index", idx)),
            "name": stream_payload.get("name", ""),
            "source_id": stream_payload.get("source_id", ""),
            "type": stream_payload.get("type", ""),
            "nominal_srate": stream_payload.get("nominal_srate", 0.0),
            "channel_count": stream_payload.get("channel_count", 0),
            "channel_labels": stream_payload.get("channel_labels", []),
            "selected_channels": stream_payload.get("selected_channels"),
            "selection_reason": stream_payload.get("selection_reason", ""),
            "dtype_kind": stream_payload.get("dtype_kind", "f"),
        }
        npz_payload[f"{prefix}_meta_json"] = json.dumps(meta)
        npz_payload[f"{prefix}_time_stamps_rel_s"] = np.asarray(stream_payload["time_stamps_rel_s"])
        npz_payload[f"{prefix}_time_series"] = np.asarray(stream_payload["time_series"])

    np.savez_compressed(out, **npz_payload)
    return out


def load_npz(npz_path: str | Path) -> dict[str, Any]:
    """Load NPZ payload created by save_npz()."""
    path = Path(npz_path)
    loaded: dict[str, Any] = {}
    with np.load(path, allow_pickle=True) as data:
        root_meta = json.loads(str(data["meta_json"]))
        loaded = {
            "format_version": root_meta.get("format_version", 1),
            "created_utc": root_meta.get("created_utc"),
            "source_path": root_meta.get("source_path"),
            "source_basename": root_meta.get("source_basename"),
            "t0": float(root_meta.get("t0", 0.0)),
            "time_window": root_meta.get("time_window"),
            "selection_config": root_meta.get("selection_config", {}),
            "streams": {},
        }

        for idx in root_meta.get("stream_indices", []):
            prefix = f"stream_{idx}"
            stream_meta = json.loads(str(data[f"{prefix}_meta_json"]))
            loaded["streams"][int(idx)] = {
                **stream_meta,
                "time_stamps_rel_s": data[f"{prefix}_time_stamps_rel_s"],
                "time_series": data[f"{prefix}_time_series"],
                "n_samples": int(len(data[f"{prefix}_time_stamps_rel_s"])),
            }
    return loaded


def validate_extracted_payload(extracted: dict[str, Any]) -> list[str]:
    """Return a list of validation errors; empty list means valid payload."""
    errors: list[str] = []
    streams = extracted.get("streams", {})

    if not isinstance(streams, dict) or not streams:
        return ["No streams present in extracted payload."]

    for idx, stream_payload in streams.items():
        ts = np.asarray(stream_payload.get("time_stamps_rel_s", []))
        data = np.asarray(stream_payload.get("time_series", []))
        dtype_kind = str(stream_payload.get("dtype_kind", data.dtype.kind if data.size else "f"))

        if len(ts) != len(data):
            errors.append(
                f"Stream {idx}: timestamp length ({len(ts)}) != data length ({len(data)})."
            )
        if dtype_kind in NUMERIC_DTYPE_KINDS and data.ndim not in (1, 2):
            errors.append(f"Stream {idx}: numeric stream has unexpected ndim={data.ndim}.")

    return errors


def _select_channels(data: np.ndarray, selected_channels: list[int] | None) -> np.ndarray:
    """Select channels from numeric arrays; marker/object streams are returned unchanged."""
    if selected_channels is None:
        return data

    if data.dtype.kind not in NUMERIC_DTYPE_KINDS:
        return data

    if data.ndim == 1:
        return data

    if data.ndim != 2:
        return data

    return data[:, selected_channels]


def _extract_channel_labels(info: dict[str, Any]) -> list[str]:
    """
    Best-effort extraction of channel labels from XDF stream info.

    The structure can vary by recorder/toolchain, so this intentionally
    favors resilience over strict schema assumptions.
    """
    desc = info.get("desc")
    if not desc or not isinstance(desc, list) or not desc[0]:
        return []

    first_desc = desc[0]
    channels_entry = first_desc.get("channels")
    if not channels_entry or not isinstance(channels_entry, list) or not channels_entry[0]:
        return []

    channel_entries = channels_entry[0].get("channel")
    if not channel_entries or not isinstance(channel_entries, list):
        return []

    labels: list[str] = []
    for channel in channel_entries:
        if not isinstance(channel, dict):
            continue
        label = _safe_first(channel.get("label"), None)
        if label is not None:
            labels.append(str(label))
    return labels


def _safe_first(value: Any, default: Any) -> Any:
    """Return first element if value is a non-empty list, else value/default."""
    if isinstance(value, list):
        return value[0] if value else default
    if value is None:
        return default
    return value


def _to_float(value: Any) -> float:
    try:
        return float(value)
    except (TypeError, ValueError):
        return 0.0


def _to_int(value: Any) -> int:
    try:
        return int(value)
    except (TypeError, ValueError):
        return 0
