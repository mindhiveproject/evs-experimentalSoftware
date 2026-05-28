#%%
from LabRecorder_Viewer import XDFExplorer
explorer = XDFExplorer("./data/DY_002.xdf")
#%%
# explorer.plot_streams_enhanced(
#     indices=[43],
#     channels_per_stream=[list(range(19))],
#     labels=["BrainVision RDA"],
#     time_range=(5, 15),
#     clip_std_outliers=True,
# )
# %%
explorer.plot_channels_grouped(
    idx=13,
    channels=list(range(19)),
    channels_per_subplot=1,
    label="V-Amp",
    time_range=(600, 614),
    clip_std_outliers=True,
    show_markers=True,
)

# %%
explorer.plot_channels_grouped(
    idx=0,
    channels=list(range(20)),
    channels_per_subplot=1,
    label="LiveAmp",
    # time_range=(600, 614),
    clip_std_outliers=True,
    show_markers=True,
)

# %%
