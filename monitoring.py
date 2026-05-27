#%%
from LabRecorder_Viewer import XDFExplorer
explorer = XDFExplorer("./data/DY_001.xdf")
#%%
explorer.plot_streams_enhanced(
    indices=[43],
    channels_per_stream=[list(range(19))],
    labels=["BrainVision RDA"],
    time_range=(5, 15),
    clip_std_outliers=True,
)
# %%
explorer.plot_channels_grouped(
    idx=43,
    channels=list(range(19)),   # optional; default = all channels
    channels_per_subplot=1,     # default
    label="BrainVision RDA",
    time_range=(600, 660),
    clip_std_outliers=True,
    show_markers=True,
)

# %%
explorer.plot_channels_grouped(
    idx=11,
    channels=list(range(19)),   # optional; default = all channels
    channels_per_subplot=1,     # default
    label="BrainVision RDA",
    time_range=(600, 660),
    clip_std_outliers=True,
    show_markers=True,
)

# %%
