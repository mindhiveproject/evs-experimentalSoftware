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
