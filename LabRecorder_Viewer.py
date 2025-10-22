#%%
"""
XDF Explorer for EmotiBit Validation Study
Author: Franck Porteous (lightweight signal & marker plotting)
"""

import pyxdf
import numpy as np
import matplotlib.pyplot as plt

class XDFExplorer:
    def __init__(self, xdf_path):
        # Load file
        self.streams, self.header = pyxdf.load_xdf(xdf_path)
        print(f"\n✅ Loaded XDF file: {xdf_path}")
        print(f"📊 Found {len(self.streams)} streams")

        # Establish global t0 (first timestamp of experiment)
        self.t0 = min([min(s['time_stamps']) for s in self.streams if len(s['time_stamps']) > 0])
        print(f"🕒 Experiment start (t0): {self.t0:.3f} s")

        self.print_summary()

    def print_summary(self):
        """Print a quick summary of each stream."""
        print("\n--- Stream Summary ---")
        for i, s in enumerate(self.streams):
            name = s['info']['name'][0]
            source_id = s['info']['source_id'][0]
            stype = s['info']['type'][0] if s['info']['type'] else "N/A"
            nch = int(s['info']['channel_count'][0])
            fs = float(s['info']['nominal_srate'][0])
            n_samples = len(s['time_series'])
            tmin = min(s['time_stamps']) - self.t0
            tmax = max(s['time_stamps']) - self.t0
            print(f"[{i}] source_id: {source_id} \t    | {name} \t | type: {stype} \t | channels: {nch} \t | Fs: {fs:.1f} Hz \t | samples: {n_samples} \t | "
                  f"time: {tmin:.2f}–{tmax:.2f}s")

    def print_detailed_summary(self):
        """Print a comprehensive summary with better formatting and more details."""
        print("\n" + "="*80)
        print("📊 DETAILED STREAM ANALYSIS")
        print("="*80)
        
        for i, s in enumerate(self.streams):
            name = s['info']['name'][0]
            source_id = s['info']['source_id'][0]
            stype = s['info']['type'][0] if s['info']['type'] else "N/A"
            nch = int(s['info']['channel_count'][0])
            fs = float(s['info']['nominal_srate'][0])
            n_samples = len(s['time_series'])
            
            # Calculate duration
            if len(s['time_stamps']) > 0:
                tmin = min(s['time_stamps']) - self.t0
                tmax = max(s['time_stamps']) - self.t0
                duration = tmax - tmin
            else:
                duration = 0
                tmin = tmax = 0
                
            # Determine stream category
            if 'psychopy' in source_id.lower() or 'marker' in name.lower():
                category = "🎯 MARKER"
                color = "\033[91m"  # Red
            elif 'md-' in source_id.lower() or 'emotibit' in name.lower():
                category = "📡 EMOTIBIT"
                color = "\033[92m"  # Green
            else:
                category = "📊 OTHER"
                color = "\033[94m"  # Blue
                
            print(f"\n{color}[{i}] {category}\033[0m")
            print(f"    Name: {name}")
            print(f"    Source ID: {source_id}")
            print(f"    Type: {stype}")
            print(f"    Channels: {nch}")
            print(f"    Sample Rate: {fs:.1f} Hz")
            print(f"    Samples: {n_samples:,}")
            print(f"    Duration: {duration:.2f}s")
            print(f"    Time Range: {tmin:.2f}s - {tmax:.2f}s")
            
            # Show data type and range for continuous streams
            if n_samples > 0:
                data = np.array(s['time_series'])
                if data.dtype.kind not in ['U', 'S', 'O']:  # Not string/object
                    print(f"    Data Type: {data.dtype}")
                    if data.size > 0:
                        print(f"    Value Range: {data.min():.3f} - {data.max():.3f}")

    def categorize_streams(self):
        """Categorize streams by type and return organized dictionary."""
        categories = {
            'emotibit_physiological': [],
            'emotibit_magnetometer': [],
            'emotibit_ppg': [],
            'emotibit_eda': [],
            'emotibit_hr': [],
            'markers': [],
            'other': []
        }
        
        for i, s in enumerate(self.streams):
            name = s['info']['name'][0].lower()
            source_id = s['info']['source_id'][0].lower()
            
            if 'psychopy' in source_id or 'marker' in name:
                categories['markers'].append(i)
            elif 'md-' in source_id or 'emotibit' in name:
                if 'mag' in name:
                    categories['emotibit_magnetometer'].append(i)
                elif 'ppg' in name:
                    categories['emotibit_ppg'].append(i)
                elif 'eda' in name:
                    categories['emotibit_eda'].append(i)
                elif 'hr' in name or 'heart' in name:
                    categories['emotibit_hr'].append(i)
                else:
                    categories['emotibit_physiological'].append(i)
            else:
                categories['other'].append(i)
        
        return categories

    def get_streams_by_category(self, category):
        """Get stream indices by category."""
        categories = self.categorize_streams()
        return categories.get(category, [])

    def analyze_data_quality(self):
        """Analyze data quality metrics for each stream."""
        print("\n🔍 DATA QUALITY ANALYSIS")
        print("="*60)
        
        for i, s in enumerate(self.streams):
            name = s['info']['name'][0]
            ts = s['time_stamps'] - self.t0
            data = np.array(s['time_series'])
            
            if len(ts) == 0:
                print(f"[{i}] {name}: ❌ EMPTY STREAM")
                continue
                
            # Calculate metrics
            duration = ts.max() - ts.min()
            nominal_srate = float(s['info']['nominal_srate'][0])
            actual_samples = len(ts)
            
            # Handle different stream types
            if nominal_srate > 0:
                # Continuous stream - calculate completeness based on expected samples
                expected_samples = duration * nominal_srate
                completeness = (actual_samples / expected_samples * 100) if expected_samples > 0 else 0
                
                # Check for gaps in continuous streams
                if len(ts) > 1:
                    intervals = np.diff(ts)
                    expected_interval = 1.0 / nominal_srate
                    gaps = np.sum(intervals > expected_interval * 1.5)
                else:
                    gaps = 0
                    
                # Quality assessment for continuous streams
                if completeness > 95 and gaps == 0:
                    quality = "✅ EXCELLENT"
                elif completeness > 90 and gaps < 5:
                    quality = "⚠️ GOOD"
                elif completeness > 80:
                    quality = "⚠️ FAIR"
                else:
                    quality = "❌ POOR"
                    
                print(f"[{i}] {name}:")
                print(f"    Duration: {duration:.2f}s")
                print(f"    Completeness: {completeness:.1f}%")
                print(f"    Data gaps: {gaps}")
                print(f"    Quality: {quality}")
                
            else:
                # Marker/event stream - different quality metrics
                if len(ts) > 1:
                    intervals = np.diff(ts)
                    # For markers, check for reasonable timing intervals
                    min_interval = np.min(intervals) if len(intervals) > 0 else 0
                    max_interval = np.max(intervals) if len(intervals) > 0 else 0
                    avg_interval = np.mean(intervals) if len(intervals) > 0 else 0
                    
                    # Quality assessment for marker streams
                    if min_interval > 0 and max_interval < 1000:  # Reasonable timing
                        quality = "✅ EXCELLENT"
                    elif min_interval > 0 and max_interval < 5000:
                        quality = "⚠️ GOOD"
                    else:
                        quality = "⚠️ FAIR"
                        
                    print(f"[{i}] {name}:")
                    print(f"    Duration: {duration:.2f}s")
                    print(f"    Markers: {actual_samples}")
                    print(f"    Interval range: {min_interval:.3f}s - {max_interval:.3f}s")
                    print(f"    Avg interval: {avg_interval:.3f}s")
                    print(f"    Quality: {quality}")
                else:
                    print(f"[{i}] {name}:")
                    print(f"    Duration: {duration:.2f}s")
                    print(f"    Markers: {actual_samples}")
                    print(f"    Quality: ⚠️ SINGLE MARKER")

    def list_streams_interactive(self):
        """List streams with interactive selection capabilities."""
        print("\n📋 AVAILABLE STREAMS:")
        print("="*50)
        
        for i, s in enumerate(self.streams):
            name = s['info']['name'][0]
            source_id = s['info']['source_id'][0]
            stype = s['info']['type'][0] if s['info']['type'] else "N/A"
            n_samples = len(s['time_series'])
            
            # Determine category
            if 'psychopy' in source_id.lower():
                category = "🎯 MARKER"
            elif 'md-' in source_id.lower():
                category = "📡 EMOTIBIT"
            else:
                category = "📊 OTHER"
                
            print(f"[{i:2d}] {category} | {name:<15} | {stype:<15} | {n_samples:>6} samples")

    def get_stream_by_name_pattern(self, pattern):
        """Find streams matching a name pattern (case insensitive)."""
        matches = []
        pattern_lower = pattern.lower()
        
        for i, s in enumerate(self.streams):
            name = s['info']['name'][0].lower()
            source_id = s['info']['source_id'][0].lower()
            
            if pattern_lower in name or pattern_lower in source_id:
                matches.append(i)
        
        return matches

    def quick_emotibit_overview(self, max_duration=60):
        """Show a quick overview of all EmotiBit streams."""
        categories = self.categorize_streams()
        
        print("\n🔍 QUICK EMOTIBIT OVERVIEW")
        print("="*50)
        
        for category, indices in categories.items():
            if category.startswith('emotibit') and indices:
                print(f"\n📡 {category.upper().replace('_', ' ')}:")
                for idx in indices:
                    s = self.streams[idx]
                    name = s['info']['name'][0]
                    n_samples = len(s['time_series'])
                    fs = float(s['info']['nominal_srate'][0])
                    print(f"   • {name}: {n_samples} samples @ {fs:.1f} Hz")
        
        # Plot all EmotiBit streams
        all_emotibit = []
        for category, indices in categories.items():
            if category.startswith('emotibit'):
                all_emotibit.extend(indices)
        
        if all_emotibit:
            self.plot_streams_enhanced(all_emotibit, max_duration=max_duration)

    def _get_stream_type(self, stream_name):
        """Helper to determine stream type from name."""
        name_lower = stream_name.lower()
        if 'mag' in name_lower:
            return 'magnetometer'
        elif 'ppg' in name_lower:
            return 'ppg'
        elif 'eda' in name_lower:
            return 'eda'
        elif 'hr' in name_lower or 'heart' in name_lower:
            return 'hr'
        elif 'marker' in name_lower:
            return 'marker'
        else:
            return 'other'

    def plot_markers(self, idx):
        """Plot PsychoPy marker stream (event onsets)."""
        s = self.streams[idx]
        name = s['info']['name'][0]
        ts = s['time_stamps'] - self.t0
        labels = [row[0] for row in s['time_series']]

        plt.figure(figsize=(14, 2))
        for t, lbl in zip(ts, labels):
            plt.axvline(x=t, color='r', linestyle='--', alpha=0.6)
            plt.text(t, 0, lbl, rotation=90, verticalalignment='bottom', fontsize=8)
        plt.title(f"🪧 Marker Stream — {name}")
        plt.xlabel("Time (s)")
        plt.xlim([0, ts.max()])
        plt.yticks([])
        plt.tight_layout()
        plt.show()

    def plot_streams_enhanced(self, indices, channels_per_stream=None, max_duration=None, 
                             labels=None, show_markers=True, figsize=(16, 10)):
        """
        Enhanced plotting with better stream differentiation and layout.
        """
        if channels_per_stream is None:
            channels_per_stream = [None] * len(indices)
        if labels is None:
            labels = [self.streams[idx]['info']['name'][0] for idx in indices]

        # Create subplot layout
        n_streams = len(indices)
        fig, axes = plt.subplots(n_streams, 1, figsize=figsize, sharex=True)
        if n_streams == 1:
            axes = [axes]
        
        # Color scheme for different stream types
        stream_colors = {
            'magnetometer': '#FF6B6B',
            'ppg': '#4ECDC4', 
            'eda': '#45B7D1',
            'hr': '#96CEB4',
            'marker': '#FFEAA7',
            'other': '#DDA0DD'
        }
        
        # Block colors for markers
        block_colors = {1: '#FF6B6B', 2: '#4ECDC4', 3: '#FFE66D'}
        
        max_ts = 0
        
        for i, (idx, chs, lbl) in enumerate(zip(indices, channels_per_stream, labels)):
            ax = axes[i]
            s = self.streams[idx]
            stream_name = s['info']['name'][0]
            ts = s['time_stamps'] - self.t0
            data = np.array(s['time_series'])
            
            # Determine stream type and color
            stream_type = self._get_stream_type(stream_name)
            color = stream_colors.get(stream_type, '#DDA0DD')
            
            # Handle empty streams
            if len(ts) == 0:
                ax.text(0.5, 0.5, f"Empty stream: {stream_name}", 
                       transform=ax.transAxes, ha='center', va='center')
                continue
                
            # Crop time
            if max_duration is not None:
                mask = ts <= max_duration
                ts = ts[mask]
                data = data[mask]
                
            if len(ts) > 0:
                max_ts = max(max_ts, ts.max())
                
            # Determine if continuous or marker stream
            is_continuous = data.dtype.kind not in ['U', 'S', 'O']
            
            if is_continuous:
                # Reshape if single channel
                if data.ndim == 1:
                    data = data.reshape(-1, 1)
                    
                n_channels = data.shape[1]
                if chs is None:
                    chs = range(n_channels)
                    
                # Plot channels
                for ch in chs:
                    channel_label = f"{stream_name} Ch{ch+1}" if n_channels > 1 else stream_name
                    ax.plot(ts, data[:, ch], label=channel_label, color=color, linewidth=1.5)
                    
                ax.set_ylabel(f"{stream_name}\n({stream_type.upper()})", color=color, fontweight='bold')
                ax.tick_params(axis='y', labelcolor=color)
                ax.grid(True, alpha=0.3)
                ax.legend(loc='upper right', fontsize=8)
                
            else:
                # Marker stream
                ax.set_ylabel(f"{stream_name}\n(MARKERS)", color=color, fontweight='bold')
                
                # Plot markers with block-based coloring
                for t, marker_row in zip(ts, data):
                    marker_text = marker_row[0] if isinstance(marker_row, (list, np.ndarray)) else str(marker_row)
                    
                    # Extract block_id
                    block_id = None
                    if 'block_id:' in marker_text:
                        try:
                            block_id = int(marker_text.split('block_id:')[1].split('|')[0])
                        except (ValueError, IndexError):
                            pass
                            
                    marker_color = block_colors.get(block_id, '#999999') if block_id else '#999999'
                    ax.axvline(x=t, color=marker_color, linestyle='--', alpha=0.7, linewidth=2)
                    
                    # Add marker text
                    ax.text(t, 0.5, marker_text.split('|')[0], rotation=90, 
                           verticalalignment='bottom', fontsize=8, color=marker_color)
                
                ax.set_ylim([0, 1])
                ax.set_yticks([])
                
            ax.set_xlim([0, max_ts])
            
        # Set common x-axis label
        axes[-1].set_xlabel("Time (s)", fontweight='bold')
        
        # Add title with experiment info
        fig.suptitle(f"📊 Multi-Stream Analysis - {len(indices)} streams", 
                    fontsize=14, fontweight='bold')
        
        plt.tight_layout()
        plt.show()

    def plot_continuous(self, idx, channels=None, max_duration=None):
        """
        Plot physiological signal(s).
        channels: list of indices to plot (default: all)
        max_duration: optional crop (in seconds)
        """
        s = self.streams[idx]
        name = s['info']['name'][0]
        ts = s['time_stamps'] - self.t0
        data = np.array(s['time_series'])
        n_channels = data.shape[1] if data.ndim > 1 else 1

        # Handle single channel streams
        if n_channels == 1:
            data = data.reshape(-1, 1)

        # Crop
        if max_duration is not None:
            mask = ts <= max_duration
            ts = ts[mask]
            data = data[mask]

        # Channel selection
        if channels is None:
            channels = range(n_channels)

        plt.figure(figsize=(14, 6))
        for ch in channels:
            plt.plot(ts, data[:, ch], label=f"Ch {ch+1}")
        plt.title(f"📈 Continuous Stream — {name}")
        plt.xlabel("Time (s)")
        plt.ylabel("Signal")
        plt.xlim([0, ts[-1]])
        plt.legend(loc="upper right", fontsize=8)
        plt.tight_layout()
        plt.show()

    def get_stream_index(self, name_substring):
        """Helper to find stream index by name."""
        for i, s in enumerate(self.streams):
            if name_substring.lower() in s['info']['name'][0].lower():
                return i
        print(f"⚠️ Stream containing '{name_substring}' not found.")
        for i, s in enumerate(self.streams):
            if name_substring.lower() in s['info']['source_id'][0].lower():
                return i
        print(f"⚠️ Source_id containing '{name_substring}' not found.")
        return None

    def plot_emotibit_all(self, subset=None, max_duration=None):
        """
        Plot all EmotiBit continuous streams.
        EmotiBit streams are identified by 'MD-' in their source_id or name.
        Optionally filter by a substring (e.g., "MAG", "PPG", "TEMP").
        """
        subset = subset.lower() if subset else None

        emotibit_indices = []
        for i, s in enumerate(self.streams):
            name = s['info']['name'][0].lower()
            source_id = s['info']['source_id'][0].lower()

            # Check if it matches EmotiBit identifier and optional subset
            is_emotibit = 'md-' in source_id or 'md-' in name or 'emotibit' in name
            matches_subset = subset in name or subset in source_id if subset else True

            if is_emotibit and matches_subset:
                data = np.array(s['time_series'])
                if data.dtype.kind not in ['U', 'S', 'O']:  # skip string/marker streams
                    emotibit_indices.append(i)

        if not emotibit_indices:
            print("⚠️ No matching EmotiBit continuous streams found.")
            return

        print(f"📦 Found {len(emotibit_indices)} EmotiBit continuous stream(s).")

        labels = [self.streams[idx]['info']['name'][0] for idx in emotibit_indices]
        self.plot_streams(emotibit_indices, max_duration=max_duration, labels=labels)
    
    def plot_streams(self, indices, channels_per_stream=None, max_duration=None, labels=None, 
                     enhanced=True, figsize=(16, 10)):
        """
        Plot multiple streams with enhanced visualization by default.
        
        Args:
            indices (list[int]): stream indices to plot
            channels_per_stream (list[list[int]] or None): which channels to plot for each stream
            max_duration (float or None): crop duration (seconds)
            labels (list[str] or None): optional labels for legend per stream
            enhanced (bool): use enhanced plotting with separate subplots
            figsize (tuple): figure size for plotting
        """
        if enhanced:
            self.plot_streams_enhanced(indices, channels_per_stream, max_duration, labels, figsize=figsize)
        else:
            # Original overlay method
            if channels_per_stream is None:
                channels_per_stream = [None] * len(indices)
            if labels is None:
                labels = [self.streams[idx]['info']['name'][0] for idx in indices]

            # Colors for different streams
            colors = plt.cm.tab10(np.linspace(0, 1, len(indices)))
            
            # Block colors (1, 2, 3)
            block_colors = {1: '#FF6B6B', 2: '#4ECDC4', 3: '#FFE66D'}

            fig, ax_main = plt.subplots(figsize=figsize)
            axes = [ax_main]
            
            continuous_count = 0
            max_ts = 0
            marker_type_colors = {}  # Track marker types and their colors

            for stream_idx, (idx, chs, lbl, color) in enumerate(zip(indices, channels_per_stream, labels, colors)):
                s = self.streams[idx]
                stream_name = s['info']['name'][0]
                ts = s['time_stamps'] - self.t0
                data = np.array(s['time_series'])

                # Handle empty streams
                if len(ts) == 0:
                    print(f"⚠️ Stream '{stream_name}' is empty, skipping.")
                    continue

                # Crop time
                if max_duration is not None:
                    mask = ts <= max_duration
                    ts = ts[mask]
                    data = data[mask]

                if len(ts) > 0:
                    max_ts = max(max_ts, ts.max())

                # Determine if continuous or marker stream
                is_continuous = data.dtype.kind not in ['U', 'S', 'O']

                if is_continuous:
                    # Reshape if single channel
                    if data.ndim == 1:
                        data = data.reshape(-1, 1)

                    n_channels = data.shape[1]
                    if chs is None:
                        chs = range(n_channels)

                    # Create new y-axis for each continuous stream (except first)
                    if continuous_count == 0:
                        ax = ax_main
                    else:
                        ax = ax_main.twinx()
                        ax.spines['right'].set_position(("axes", 1 + 0.1 * continuous_count))
                    
                    axes.append(ax)
                    continuous_count += 1

                    # Plot channels
                    for ch in chs:
                        stream_label = lbl if len(chs) == 1 else f"{lbl} ch {ch+1}"
                        ax.plot(ts, data[:, ch], label=stream_label, color=color, linewidth=1.5)

                    ax.set_ylabel(lbl, color=color)
                    ax.tick_params(axis='y', labelcolor=color)
                    ax.set_xlim([0, max_ts])

                else:
                    # Marker stream - parse by type and color by block_id
                    for t, marker_row in zip(ts, data):
                        marker_text = marker_row[0] if isinstance(marker_row, (list, np.ndarray)) else str(marker_row)
                        
                        # Extract marker type (first part before |)
                        marker_type = marker_text.split('|')[0]
                        
                        # Extract block_id from marker (e.g., "BLOCK_START|block_id:1")
                        block_id = None
                        if 'block_id:' in marker_text:
                            try:
                                block_id = int(marker_text.split('block_id:')[1].split('|')[0])
                            except (ValueError, IndexError):
                                pass
                        
                        marker_color = block_colors.get(block_id, '#999999') if block_id else '#999999'
                        
                        # Track marker type for legend (use block color)
                        if marker_type not in marker_type_colors:
                            marker_type_colors[marker_type] = marker_color
                        
                        ax_main.axvline(x=t, color=marker_color, linestyle='--', alpha=0.5, linewidth=1.2)

            # Set main axis properties
            ax_main.set_xlabel("Time (s)")
            ax_main.set_xlim([0, max_ts])

            # Build legend for continuous streams
            handles, all_labels = [], []
            for a in axes:
                h, l = a.get_legend_handles_labels()
                handles += h
                # Shorten labels - remove "idx_emotibit_" prefix
                shortened_l = [label.replace('idx_emotibit_', '').replace('idx_', '') for label in l]
                all_labels += shortened_l
            
            # Add marker type legend
            for marker_type in sorted(marker_type_colors.keys()):
                marker_color = marker_type_colors[marker_type]
                handles.append(plt.Line2D([0], [0], color=marker_color, linestyle='--', linewidth=1.5))
                all_labels.append(marker_type)
            
            if handles:
                ax_main.legend(handles, all_labels, loc='upper right', fontsize=9, framealpha=0.9)

            plt.title("📊 Overlay of Multiple Streams (Markers colored by block)")
            plt.tight_layout()
            plt.show()

    def plot_by_category(self, category, max_duration=None, figsize=(16, 10)):
        """Plot all streams in a specific category."""
        indices = self.get_streams_by_category(category)
        if not indices:
            print(f"⚠️ No streams found in category: {category}")
            return
        
        print(f"📊 Plotting {len(indices)} streams from category: {category}")
        self.plot_streams_enhanced(indices, max_duration=max_duration, figsize=figsize)

    def plot_emotibit_comparison(self, signal_types=None, max_duration=60):
        """Plot EmotiBit signals for comparison across different types."""
        if signal_types is None:
            signal_types = ['magnetometer', 'ppg', 'eda', 'hr']
        
        categories = self.categorize_streams()
        all_indices = []
        labels = []
        
        for signal_type in signal_types:
            category_key = f'emotibit_{signal_type}'
            if category_key in categories and categories[category_key]:
                all_indices.extend(categories[category_key])
                labels.extend([self.streams[idx]['info']['name'][0] for idx in categories[category_key]])
        
        if all_indices:
            print(f"📊 EmotiBit Comparison: {len(all_indices)} streams")
            self.plot_streams_enhanced(all_indices, max_duration=max_duration, labels=labels)
        else:
            print("⚠️ No EmotiBit streams found for comparison")

    def _parse_marker(self, marker_text):
        """
        Parse marker text and extract all components.
        
        Returns:
            dict: Parsed marker information with keys: type, block_id, trial_id, image_path, raw_text
        """
        parts = marker_text.split('|')
        marker_info = {
            'type': parts[0],
            'block_id': None,
            'trial_id': None,
            'image_path': None,
            'raw_text': marker_text
        }
        
        for part in parts[1:]:
            if part.startswith('block_id:'):
                try:
                    marker_info['block_id'] = int(part.split(':')[1])
                except (ValueError, IndexError):
                    pass
            elif part.startswith('trial_id:'):
                try:
                    marker_info['trial_id'] = int(part.split(':')[1])
                except (ValueError, IndexError):
                    pass
            elif part.startswith('image:'):
                marker_info['image_path'] = part.split(':', 1)[1]
        
        return marker_info

    def print_markers_by_block(self, block_id, marker_stream_idx=None):
        """
        Print all markers for a specific block with detailed information.
        
        Args:
            block_id (int): The block ID to filter markers for
            marker_stream_idx (int, optional): Specific marker stream index. If None, searches all marker streams.
        """
        print(f"\n🎯 MARKERS FOR BLOCK {block_id}")
        print("=" * 60)
        
        # Find marker streams if not specified
        if marker_stream_idx is None:
            marker_indices = self.get_streams_by_category('markers')
            if not marker_indices:
                print("⚠️ No marker streams found.")
                return
        else:
            marker_indices = [marker_stream_idx]
        
        total_markers = 0
        
        for idx in marker_indices:
            s = self.streams[idx]
            name = s['info']['name'][0]
            ts = s['time_stamps'] - self.t0
            data = s['time_series']
            
            if len(ts) == 0:
                print(f"⚠️ Stream '{name}' is empty.")
                continue
            
            # Filter markers for the specified block
            block_markers = []
            for t, marker_row in zip(ts, data):
                marker_text = marker_row[0] if isinstance(marker_row, (list, np.ndarray)) else str(marker_row)
                marker_info = self._parse_marker(marker_text)
                
                if marker_info['block_id'] == block_id:
                    block_markers.append((t, marker_info))
            
            if block_markers:
                print(f"\n📡 Stream: {name}")
                print(f"   Found {len(block_markers)} markers for block {block_id}")
                print("   " + "-" * 60)
                
                for t, marker_info in block_markers:
                    print(f"   {t:8.2f}s | {marker_info['type']:<15}", end="")
                    
                    if marker_info['trial_id'] is not None:
                        print(f" | Trial: {marker_info['trial_id']:<3}", end="")
                    else:
                        print(f" | {'':<10}", end="")
                    
                    if marker_info['image_path'] is not None:
                        # Extract just the filename from the path
                        image_name = marker_info['image_path'].split('/')[-1] if '/' in marker_info['image_path'] else marker_info['image_path']
                        print(f" | Image: {image_name}")
                    else:
                        print()
                
                total_markers += len(block_markers)
            else:
                print(f"\n📡 Stream: {name}")
                print(f"   No markers found for block {block_id}")
        
        print(f"\n📊 Total markers for block {block_id}: {total_markers}")
        
        if total_markers == 0:
            print("💡 Tip: Available block IDs can be found by calling list_all_block_ids()")

    def list_all_block_ids(self):
        """List all unique block IDs found in marker streams with additional statistics."""
        print("\n🔍 AVAILABLE BLOCK IDs")
        print("=" * 40)
        
        marker_indices = self.get_streams_by_category('markers')
        if not marker_indices:
            print("⚠️ No marker streams found.")
            return
        
        all_block_ids = set()
        block_stats = {}
        
        for idx in marker_indices:
            s = self.streams[idx]
            name = s['info']['name'][0]
            data = s['time_series']
            
            for marker_row in data:
                marker_text = marker_row[0] if isinstance(marker_row, (list, np.ndarray)) else str(marker_row)
                marker_info = self._parse_marker(marker_text)
                
                if marker_info['block_id'] is not None:
                    block_id = marker_info['block_id']
                    all_block_ids.add(block_id)
                    
                    if block_id not in block_stats:
                        block_stats[block_id] = {
                            'marker_types': set(),
                            'total_markers': 0,
                            'trials': set()
                        }
                    
                    block_stats[block_id]['marker_types'].add(marker_info['type'])
                    block_stats[block_id]['total_markers'] += 1
                    
                    if marker_info['trial_id'] is not None:
                        block_stats[block_id]['trials'].add(marker_info['trial_id'])
        
        if all_block_ids:
            sorted_block_ids = sorted(all_block_ids)
            print(f"Found block IDs: {sorted_block_ids}")
            print(f"Total blocks: {len(sorted_block_ids)}")
            print("\n📊 Block Statistics:")
            print("-" * 40)
            
            for block_id in sorted_block_ids:
                stats = block_stats[block_id]
                trial_count = len(stats['trials']) if stats['trials'] else "N/A"
                marker_types = sorted(stats['marker_types'])
                
                print(f"Block {block_id}: {stats['total_markers']} markers, {trial_count} trials")
                print(f"  Marker types: {', '.join(marker_types)}")
        else:
            print("⚠️ No block IDs found in marker streams.")

    def print_marker_timeline(self, block_id=None, marker_stream_idx=None):
        """
        Print a timeline of markers with detailed information, optionally filtered by block.
        
        Args:
            block_id (int, optional): Filter by specific block ID. If None, shows all markers.
            marker_stream_idx (int, optional): Specific marker stream index. If None, searches all marker streams.
        """
        if block_id is not None:
            print(f"\n⏰ MARKER TIMELINE FOR BLOCK {block_id}")
        else:
            print(f"\n⏰ COMPLETE MARKER TIMELINE")
        print("=" * 80)
        
        # Find marker streams if not specified
        if marker_stream_idx is None:
            marker_indices = self.get_streams_by_category('markers')
            if not marker_indices:
                print("⚠️ No marker streams found.")
                return
        else:
            marker_indices = [marker_stream_idx]
        
        all_markers = []
        
        for idx in marker_indices:
            s = self.streams[idx]
            name = s['info']['name'][0]
            ts = s['time_stamps'] - self.t0
            data = s['time_series']
            
            if len(ts) == 0:
                continue
            
            for t, marker_row in zip(ts, data):
                marker_text = marker_row[0] if isinstance(marker_row, (list, np.ndarray)) else str(marker_row)
                marker_info = self._parse_marker(marker_text)
                
                # Filter by block if specified
                if block_id is None or marker_info['block_id'] == block_id:
                    all_markers.append((t, marker_info, name))
        
        # Sort by timestamp
        all_markers.sort(key=lambda x: x[0])
        
        if all_markers:
            print(f"{'Time':>8} | {'Type':<15} | {'Block':<5} | {'Trial':<5} | {'Image':<20} | {'Stream'}")
            print("-" * 80)
            
            for t, marker_info, stream_name in all_markers:
                block_str = str(marker_info['block_id']) if marker_info['block_id'] is not None else "N/A"
                trial_str = str(marker_info['trial_id']) if marker_info['trial_id'] is not None else "N/A"
                
                # Extract just filename for image
                image_str = "N/A"
                if marker_info['image_path'] is not None:
                    image_str = marker_info['image_path'].split('/')[-1] if '/' in marker_info['image_path'] else marker_info['image_path']
                    if len(image_str) > 20:
                        image_str = image_str[:17] + "..."
                
                print(f"{t:8.2f}s | {marker_info['type']:<15} | {block_str:<5} | {trial_str:<5} | {image_str:<20} | {stream_name}")
            
            print(f"\n📊 Total markers: {len(all_markers)}")
        else:
            if block_id is not None:
                print(f"⚠️ No markers found for block {block_id}")
            else:
                print("⚠️ No markers found in any stream")




    def extract_block_data(self, block_id, include_markers=True, include_emotibit=True, include_other=False):
        """
        Extract data from a specific block using BLOCK_START marker.
        
        Args:
            block_id (int): The block ID to extract data for
            include_markers (bool): Include marker streams in extraction
            include_emotibit (bool): Include EmotiBit physiological streams
            include_other (bool): Include other non-EmotiBit streams
            
        Returns:
            dict: Extracted block data with structure:
                {
                    'block_id': int,
                    'start_time': float,
                    'end_time': float,
                    'duration': float,
                    'streams': {
                        stream_idx: {
                            'name': str,
                            'type': str,
                            'time_stamps': array,
                            'time_series': array,
                            'sample_rate': float,
                            'n_samples': int
                        }
                    }
                }
        """
        print(f"\n📦 EXTRACTING DATA FOR BLOCK {block_id}")
        print("=" * 50)
        
        # Find BLOCK_START marker for this block
        block_start_time = None
        block_end_time = None
        
        marker_indices = self.get_streams_by_category('markers')
        for idx in marker_indices:
            s = self.streams[idx]
            ts = s['time_stamps'] - self.t0
            data = s['time_series']
            
            for t, marker_row in zip(ts, data):
                marker_text = marker_row[0] if isinstance(marker_row, (list, np.ndarray)) else str(marker_row)
                marker_info = self._parse_marker(marker_text)
                
                if marker_info['block_id'] == block_id and marker_info['type'] == 'BLOCK_START':
                    block_start_time = t
                    print(f"🎯 Found BLOCK_START for block {block_id} at {t:.2f}s")
                    break
            
            if block_start_time is not None:
                break
        
        if block_start_time is None:
            print(f"⚠️ BLOCK_START marker not found for block {block_id}")
            return None
        
        # Find BLOCK_START for next block to determine end time
        next_block_start = None
        all_block_starts = []
        
        for idx in marker_indices:
            s = self.streams[idx]
            ts = s['time_stamps'] - self.t0
            data = s['time_series']
            
            for t, marker_row in zip(ts, data):
                marker_text = marker_row[0] if isinstance(marker_row, (list, np.ndarray)) else str(marker_row)
                marker_info = self._parse_marker(marker_text)
                
                if marker_info['type'] == 'BLOCK_START':
                    all_block_starts.append(t)
        
        # Sort and find next block start
        all_block_starts.sort()
        for start_time in all_block_starts:
            if start_time > block_start_time:
                next_block_start = start_time
                break
        
        # If no next block, use end of experiment
        if next_block_start is None:
            # Find the latest timestamp across all streams
            max_time = 0
            for s in self.streams:
                if len(s['time_stamps']) > 0:
                    max_time = max(max_time, max(s['time_stamps']) - self.t0)
            block_end_time = max_time
        else:
            block_end_time = next_block_start
        
        duration = block_end_time - block_start_time
        print(f"📏 Block duration: {duration:.2f}s ({block_start_time:.2f}s - {block_end_time:.2f}s)")
        
        # Determine which streams to extract
        streams_to_extract = []
        categories = self.categorize_streams()
        
        if include_markers:
            streams_to_extract.extend(categories['markers'])
        
        if include_emotibit:
            for category in categories:
                if category.startswith('emotibit'):
                    streams_to_extract.extend(categories[category])
        
        if include_other:
            streams_to_extract.extend(categories['other'])
        
        # Extract data from selected streams
        extracted_data = {
            'block_id': block_id,
            'start_time': block_start_time,
            'end_time': block_end_time,
            'duration': duration,
            'streams': {}
        }
        
        for idx in streams_to_extract:
            s = self.streams[idx]
            name = s['info']['name'][0]
            stype = s['info']['type'][0] if s['info']['type'] else "N/A"
            fs = float(s['info']['nominal_srate'][0])
            
            # Get timestamps and data
            ts = s['time_stamps'] - self.t0
            data = np.array(s['time_series'])
            
            # Filter data within block time range
            mask = (ts >= block_start_time) & (ts <= block_end_time)
            block_ts = ts[mask]
            block_data = data[mask]
            
            if len(block_ts) > 0:
                extracted_data['streams'][idx] = {
                    'name': name,
                    'type': stype,
                    'time_stamps': block_ts,
                    'time_series': block_data,
                    'sample_rate': fs,
                    'n_samples': len(block_ts)
                }
                print(f"✅ [{idx}] {name}: {len(block_ts)} samples")
            else:
                print(f"⚠️ [{idx}] {name}: No data in block time range")
        
        print(f"\n📊 Extracted data from {len(extracted_data['streams'])} streams")
        return extracted_data

    def save_block_data(self, block_data, filename=None):
        """
        Save extracted block data to a file for later analysis.
        
        Args:
            block_data (dict): Data returned from extract_block_data()
            filename (str, optional): Output filename. If None, auto-generates based on block_id.
        """
        if block_data is None:
            print("⚠️ No block data to save.")
            return
        
        if filename is None:
            filename = f"block_{block_data['block_id']}_data.npz"
        
        # Prepare data for saving
        save_data = {
            'block_id': block_data['block_id'],
            'start_time': block_data['start_time'],
            'end_time': block_data['end_time'],
            'duration': block_data['duration']
        }
        
        # Add stream data
        for stream_idx, stream_data in block_data['streams'].items():
            prefix = f"stream_{stream_idx}"
            save_data[f"{prefix}_name"] = stream_data['name']
            save_data[f"{prefix}_type"] = stream_data['type']
            save_data[f"{prefix}_time_stamps"] = stream_data['time_stamps']
            save_data[f"{prefix}_time_series"] = stream_data['time_series']
            save_data[f"{prefix}_sample_rate"] = stream_data['sample_rate']
            save_data[f"{prefix}_n_samples"] = stream_data['n_samples']
        
        np.savez(filename, **save_data)
        print(f"💾 Block data saved to: {filename}")

    def load_block_data(self, filename):
        """
        Load previously saved block data.
        
        Args:
            filename (str): Path to the saved .npz file
            
        Returns:
            dict: Block data in the same format as extract_block_data()
        """
        try:
            data = np.load(filename, allow_pickle=True)
            
            block_data = {
                'block_id': int(data['block_id']),
                'start_time': float(data['start_time']),
                'end_time': float(data['end_time']),
                'duration': float(data['duration']),
                'streams': {}
            }
            
            # Reconstruct stream data
            stream_indices = set()
            for key in data.keys():
                if key.startswith('stream_') and key.endswith('_name'):
                    stream_idx = int(key.split('_')[1])
                    stream_indices.add(stream_idx)
            
            for stream_idx in stream_indices:
                prefix = f"stream_{stream_idx}"
                block_data['streams'][stream_idx] = {
                    'name': str(data[f"{prefix}_name"]),
                    'type': str(data[f"{prefix}_type"]),
                    'time_stamps': data[f"{prefix}_time_stamps"],
                    'time_series': data[f"{prefix}_time_series"],
                    'sample_rate': float(data[f"{prefix}_sample_rate"]),
                    'n_samples': int(data[f"{prefix}_n_samples"])
                }
            
            print(f"📂 Block data loaded from: {filename}")
            print(f"📊 Block {block_data['block_id']}: {block_data['duration']:.2f}s, {len(block_data['streams'])} streams")
            return block_data
            
        except Exception as e:
            print(f"❌ Error loading block data: {e}")
            return None

    def analyze_block_data(self, block_data):
        """
        Perform basic analysis on extracted block data.
        
        Args:
            block_data (dict): Data returned from extract_block_data()
        """
        if block_data is None:
            print("⚠️ No block data to analyze.")
            return
        
        print(f"\n🔍 ANALYSIS FOR BLOCK {block_data['block_id']}")
        print("=" * 60)
        print(f"Duration: {block_data['duration']:.2f}s")
        print(f"Time range: {block_data['start_time']:.2f}s - {block_data['end_time']:.2f}s")
        print(f"Streams: {len(block_data['streams'])}")
        
        print("\n📊 Stream Analysis:")
        print("-" * 60)
        
        for stream_idx, stream_data in block_data['streams'].items():
            name = stream_data['name']
            data = stream_data['time_series']
            ts = stream_data['time_stamps']
            fs = stream_data['sample_rate']
            
            print(f"\n[{stream_idx}] {name}")
            print(f"    Type: {stream_data['type']}")
            print(f"    Sample Rate: {fs:.1f} Hz")
            print(f"    Samples: {len(ts):,}")
            
            # Analyze data based on type
            if data.dtype.kind not in ['U', 'S', 'O']:  # Continuous data
                if data.size > 0:
                    print(f"    Data Range: {data.min():.3f} - {data.max():.3f}")
                    print(f"    Data Mean: {data.mean():.3f}")
                    print(f"    Data Std: {data.std():.3f}")
                    
                    # Check for gaps in continuous data
                    if len(ts) > 1:
                        intervals = np.diff(ts)
                        expected_interval = 1.0 / fs if fs > 0 else 0
                        gaps = np.sum(intervals > expected_interval * 1.5)
                        print(f"    Data Gaps: {gaps}")
            else:  # Marker data
                unique_markers = np.unique([row[0] if isinstance(row, (list, np.ndarray)) else str(row) for row in data])
                print(f"    Unique Markers: {len(unique_markers)}")
                for marker in unique_markers[:5]:  # Show first 5
                    print(f"      - {marker}")
                if len(unique_markers) > 5:
                    print(f"      ... and {len(unique_markers) - 5} more")

    def export_stream_info(self, filename=None):
        """Export detailed stream information to a text file."""
        if filename is None:
            filename = f"stream_analysis_{len(self.streams)}_streams.txt"
        
        with open(filename, 'w') as f:
            f.write("XDF Stream Analysis Report\n")
            f.write("=" * 50 + "\n\n")
            
            categories = self.categorize_streams()
            for category, indices in categories.items():
                if indices:
                    f.write(f"\n{category.upper().replace('_', ' ')}:\n")
                    f.write("-" * 30 + "\n")
                    for idx in indices:
                        s = self.streams[idx]
                        name = s['info']['name'][0]
                        source_id = s['info']['source_id'][0]
                        stype = s['info']['type'][0] if s['info']['type'] else "N/A"
                        nch = int(s['info']['channel_count'][0])
                        fs = float(s['info']['nominal_srate'][0])
                        n_samples = len(s['time_series'])
                        
                        if len(s['time_stamps']) > 0:
                            tmin = min(s['time_stamps']) - self.t0
                            tmax = max(s['time_stamps']) - self.t0
                            duration = tmax - tmin
                        else:
                            duration = 0
                            tmin = tmax = 0
                        
                        f.write(f"  [{idx}] {name}\n")
                        f.write(f"      Source ID: {source_id}\n")
                        f.write(f"      Type: {stype}\n")
                        f.write(f"      Channels: {nch}, Sample Rate: {fs:.1f} Hz\n")
                        f.write(f"      Samples: {n_samples:,}, Duration: {duration:.2f}s\n")
                        f.write(f"      Time Range: {tmin:.2f}s - {tmax:.2f}s\n\n")
        
        print(f"📄 Stream analysis exported to: {filename}")

#%%
# Example usage
if __name__ == "__main__":
    # Load the XDF file
    xdf_stream = XDFExplorer("./data/P006.xdf")
    
    # Show detailed summary
    xdf_stream.print_detailed_summary()
    
    # Analyze data quality
    xdf_stream.analyze_data_quality()
    
    # List streams interactively
    xdf_stream.list_streams_interactive()
    
    # Quick EmotiBit overview
    xdf_stream.quick_emotibit_overview(max_duration=6000)
    
    # Plot by category
    xdf_stream.plot_by_category('emotibit_magnetometer', max_duration=6000)
    
    # Plot EmotiBit comparison
    xdf_stream.plot_emotibit_comparison(['magnetometer', 'ppg', 'eda'], max_duration=6000)
    
    # Export stream info
    xdf_stream.export_stream_info()

#%%
xdf_stream.analyze_data_quality()

#%%
xdf_stream.export_stream_info()
#%%
xdf_stream.plot_streams(
    indices=[0],
    channels_per_stream=[[0]],
    max_duration=90,
    labels=["Markers"]
)
#%%
xdf_stream.plot_streams(
    indices=[0],
    channels_per_stream=[[0]],
    max_duration=90,
    labels=["LiveAmpSN-054907-0281"]
)
#%%
xdf_stream.plot_streams(
    indices=[0, 1, 2, 3, 4, 5, 6],
    channels_per_stream=[[0], [0], [0], [0], [0], [0], [0]],
    max_duration=90,
    labels=["PPG_RED", "EDA", "Markers", "MAG_Z", "MAG_Y", "HR", "MAG_X"]
)

#%%
xdf_stream.plot_streams(
    indices=[1, 0],
    channels_per_stream=[list(range(19)), [0]],  # LiveAmpSN-054907-0281 has 19 channels
    max_duration=90,
    labels=["LiveAmpSN-054907-0281", "Markers"]
)


#%%
# See all available blocks with statistics
xdf_stream.list_all_block_ids()

# Print details for block 1
print("Print detailed markers for block 1")
# xdf_stream.print_markers_by_block(1)
xdf_stream.print_marker_timeline(block_id=1)

# Print details for block 2
print("Print detailed markers for block 2")
# xdf_stream.print_markers_by_block(2)
xdf_stream.print_marker_timeline(block_id=2)

# See all markers across all blocks
print("See all markers across all blocks")
xdf_stream.print_marker_timeline()

#%%


#%%
# Legacy example (for backward compatibility)
"""
# Get stream indices
idx_emotibit_MAG_X = explorer.get_stream_index("MAG_X")
idx_emotibit_MAG_Y = explorer.get_stream_index("MAG_Y")
idx_emotibit_MAG_Z = explorer.get_stream_index("MAG_Z")
idx_emotibit_PPG_RED = explorer.get_stream_index("PPG_RED")
idx_emotibit_EDA = explorer.get_stream_index("EDA")
idx_markers = explorer.get_stream_index("Markers")

# Plot with enhanced visualization (default)
explorer.plot_streams(
    indices=[
        idx_emotibit_MAG_X, 
        idx_emotibit_MAG_Y, 
        idx_markers
    ],
    channels_per_stream=[[0], [0], None],
    max_duration=60,
    labels=[
        "MAG_X", 
        "MAG_Y", 
        "Markers"
    ]
)

# Plot with original overlay method
explorer.plot_streams(
    indices=[
        idx_emotibit_MAG_X, 
        idx_emotibit_MAG_Y, 
        idx_markers
    ],
    channels_per_stream=[[0], [0], None],
    max_duration=60,
    labels=[
        "MAG_X", 
        "MAG_Y", 
        "Markers"
    ],
    enhanced=False  # Use original overlay method
)
"""

# %%
