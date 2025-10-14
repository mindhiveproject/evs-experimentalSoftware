#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
This experiment was created using PsychoPy3 Experiment Builder (v2025.1.1),
    on Tue Oct 14 17:02:59 2025
If you publish work using this script the most relevant publication is:

    Peirce J, Gray JR, Simpson S, MacAskill M, Höchenberger R, Sogo H, Kastman E, Lindeløv JK. (2019) 
        PsychoPy2: Experiments in behavior made easy Behav Res 51: 195. 
        https://doi.org/10.3758/s13428-018-01193-y

"""

# --- Import packages ---
from psychopy import locale_setup
from psychopy import prefs
from psychopy import plugins
plugins.activatePlugins()
prefs.hardware['audioLib'] = 'ptb'
from psychopy import sound, gui, visual, core, data, event, logging, clock, colors, layout, hardware
from psychopy.tools import environmenttools
from psychopy.constants import (
    NOT_STARTED, STARTED, PLAYING, PAUSED, STOPPED, STOPPING, FINISHED, PRESSED, 
    RELEASED, FOREVER, priority
)

import numpy as np  # whole numpy lib is available, prepend 'np.'
from numpy import (sin, cos, tan, log, log10, pi, average,
                   sqrt, std, deg2rad, rad2deg, linspace, asarray)
from numpy.random import random, randint, normal, shuffle, choice as randchoice
import os  # handy system and path functions
import sys  # to get file system encoding

import psychopy.iohub as io
from psychopy.hardware import keyboard

# Run 'Before Experiment' code from welcome_setup
import csv

# Initialize category lists
persons = []
scenes = []
objects = []
animals = []

# Create a dictionary to replicate the JS Map structure
IMAGES = {}

print("Fetching images.")

# Open and read the CSV
with open('images.csv', newline='', encoding='utf-8') as csvfile:
    reader = csv.reader(csvfile)
    next(reader)  # Skip the header row
    for row in reader:
        if len(row) < 3:
            continue  # Skip rows that don't have enough columns
        category = row[1]
        filename = row[2]
        if category == "Person":
            persons.append(filename)
        elif category == "Scene":
            scenes.append(filename)
        elif category == "Object":
            objects.append(filename)
        elif category == "Animal":
            animals.append(filename)

# Populate the IMAGES dictionary
IMAGES["person"] = persons
IMAGES["scene"] = scenes
IMAGES["object"] = objects
IMAGES["animal"] = animals

# Optional: Print to confirm
# print("Persons:", persons)
# print("Scenes:", scenes)
# print("Objects:", objects)
# print("Animals:", animals)

# --- Setup global variables (available in all functions) ---
# create a device manager to handle hardware (keyboards, mice, mirophones, speakers, etc.)
deviceManager = hardware.DeviceManager()
# ensure that relative paths start from the same directory as this script
_thisDir = os.path.dirname(os.path.abspath(__file__))
# store info about the experiment session
psychopyVersion = '2025.1.1'
expName = 'image_shower'  # from the Builder filename that created this script
expVersion = ''
# a list of functions to run when the experiment ends (starts off blank)
runAtExit = []
# information about this experiment
expInfo = {
    'participant': f"{randint(0, 999999):06.0f}",
    'session': '001',
    'date|hid': data.getDateStr(),
    'expName|hid': expName,
    'expVersion|hid': expVersion,
    'psychopyVersion|hid': psychopyVersion,
}

# --- Define some variables which will change depending on pilot mode ---
'''
To run in pilot mode, either use the run/pilot toggle in Builder, Coder and Runner, 
or run the experiment with `--pilot` as an argument. To change what pilot 
#mode does, check out the 'Pilot mode' tab in preferences.
'''
# work out from system args whether we are running in pilot mode
PILOTING = core.setPilotModeFromArgs()
# start off with values from experiment settings
_fullScr = True
_winSize = [1710, 1107]
# if in pilot mode, apply overrides according to preferences
if PILOTING:
    # force windowed mode
    if prefs.piloting['forceWindowed']:
        _fullScr = False
        # set window size
        _winSize = prefs.piloting['forcedWindowSize']
    # replace default participant ID
    if prefs.piloting['replaceParticipantID']:
        expInfo['participant'] = 'pilot'

def showExpInfoDlg(expInfo):
    """
    Show participant info dialog.
    Parameters
    ==========
    expInfo : dict
        Information about this experiment.
    
    Returns
    ==========
    dict
        Information about this experiment.
    """
    # show participant info dialog
    dlg = gui.DlgFromDict(
        dictionary=expInfo, sortKeys=False, title=expName, alwaysOnTop=True
    )
    if dlg.OK == False:
        core.quit()  # user pressed cancel
    # return expInfo
    return expInfo


def setupData(expInfo, dataDir=None):
    """
    Make an ExperimentHandler to handle trials and saving.
    
    Parameters
    ==========
    expInfo : dict
        Information about this experiment, created by the `setupExpInfo` function.
    dataDir : Path, str or None
        Folder to save the data to, leave as None to create a folder in the current directory.    
    Returns
    ==========
    psychopy.data.ExperimentHandler
        Handler object for this experiment, contains the data to save and information about 
        where to save it to.
    """
    # remove dialog-specific syntax from expInfo
    for key, val in expInfo.copy().items():
        newKey, _ = data.utils.parsePipeSyntax(key)
        expInfo[newKey] = expInfo.pop(key)
    
    # data file name stem = absolute path + name; later add .psyexp, .csv, .log, etc
    if dataDir is None:
        dataDir = _thisDir
    filename = u'data/%s_%s_%s' % (expInfo['participant'], expName, expInfo['date'])
    # make sure filename is relative to dataDir
    if os.path.isabs(filename):
        dataDir = os.path.commonprefix([dataDir, filename])
        filename = os.path.relpath(filename, dataDir)
    
    # an ExperimentHandler isn't essential but helps with data saving
    thisExp = data.ExperimentHandler(
        name=expName, version=expVersion,
        extraInfo=expInfo, runtimeInfo=None,
        originPath='/Users/franckporteous/Documents/MindHive/EmotiBit NYU Validation Study/psychopy_experiment/testing2/image_shower_lastrun.py',
        savePickle=True, saveWideText=True,
        dataFileName=dataDir + os.sep + filename, sortColumns='time'
    )
    thisExp.setPriority('thisRow.t', priority.CRITICAL)
    thisExp.setPriority('expName', priority.LOW)
    # return experiment handler
    return thisExp


def setupLogging(filename):
    """
    Setup a log file and tell it what level to log at.
    
    Parameters
    ==========
    filename : str or pathlib.Path
        Filename to save log file and data files as, doesn't need an extension.
    
    Returns
    ==========
    psychopy.logging.LogFile
        Text stream to receive inputs from the logging system.
    """
    # set how much information should be printed to the console / app
    if PILOTING:
        logging.console.setLevel(
            prefs.piloting['pilotConsoleLoggingLevel']
        )
    else:
        logging.console.setLevel('warning')
    # save a log file for detail verbose info
    logFile = logging.LogFile(filename+'.log')
    if PILOTING:
        logFile.setLevel(
            prefs.piloting['pilotLoggingLevel']
        )
    else:
        logFile.setLevel(
            logging.getLevel('info')
        )
    
    return logFile


def setupWindow(expInfo=None, win=None):
    """
    Setup the Window
    
    Parameters
    ==========
    expInfo : dict
        Information about this experiment, created by the `setupExpInfo` function.
    win : psychopy.visual.Window
        Window to setup - leave as None to create a new window.
    
    Returns
    ==========
    psychopy.visual.Window
        Window in which to run this experiment.
    """
    if PILOTING:
        logging.debug('Fullscreen settings ignored as running in pilot mode.')
    
    if win is None:
        # if not given a window to setup, make one
        win = visual.Window(
            size=_winSize, fullscr=_fullScr, screen=0,
            winType='pyglet', allowGUI=False, allowStencil=False,
            monitor='testMonitor', color=[0,0,0], colorSpace='rgb',
            backgroundImage='', backgroundFit='none',
            blendMode='avg', useFBO=True,
            units='height',
            checkTiming=False  # we're going to do this ourselves in a moment
        )
    else:
        # if we have a window, just set the attributes which are safe to set
        win.color = [0,0,0]
        win.colorSpace = 'rgb'
        win.backgroundImage = ''
        win.backgroundFit = 'none'
        win.units = 'height'
    if expInfo is not None:
        # get/measure frame rate if not already in expInfo
        if win._monitorFrameRate is None:
            win._monitorFrameRate = win.getActualFrameRate(infoMsg='Attempting to measure frame rate of screen, please wait...')
        expInfo['frameRate'] = win._monitorFrameRate
    win.hideMessage()
    if PILOTING:
        # show a visual indicator if we're in piloting mode
        if prefs.piloting['showPilotingIndicator']:
            win.showPilotingIndicator()
        # always show the mouse in piloting mode
        if prefs.piloting['forceMouseVisible']:
            win.mouseVisible = True
    
    return win


def setupDevices(expInfo, thisExp, win):
    """
    Setup whatever devices are available (mouse, keyboard, speaker, eyetracker, etc.) and add them to 
    the device manager (deviceManager)
    
    Parameters
    ==========
    expInfo : dict
        Information about this experiment, created by the `setupExpInfo` function.
    thisExp : psychopy.data.ExperimentHandler
        Handler object for this experiment, contains the data to save and information about 
        where to save it to.
    win : psychopy.visual.Window
        Window in which to run this experiment.
    Returns
    ==========
    bool
        True if completed successfully.
    """
    # --- Setup input devices ---
    ioConfig = {}
    
    # Setup iohub keyboard
    ioConfig['Keyboard'] = dict(use_keymap='psychopy')
    
    # Setup iohub experiment
    ioConfig['Experiment'] = dict(filename=thisExp.dataFileName)
    
    # Start ioHub server
    ioServer = io.launchHubServer(window=win, **ioConfig)
    
    # store ioServer object in the device manager
    deviceManager.ioServer = ioServer
    
    # create a default keyboard (e.g. to check for escape)
    if deviceManager.getDevice('defaultKeyboard') is None:
        deviceManager.addDevice(
            deviceClass='keyboard', deviceName='defaultKeyboard', backend='iohub'
        )
    if deviceManager.getDevice('welcome_key_input') is None:
        # initialise welcome_key_input
        welcome_key_input = deviceManager.addDevice(
            deviceClass='keyboard',
            deviceName='welcome_key_input',
        )
    if deviceManager.getDevice('image_key_input') is None:
        # initialise image_key_input
        image_key_input = deviceManager.addDevice(
            deviceClass='keyboard',
            deviceName='image_key_input',
        )
    # return True if completed successfully
    return True

def pauseExperiment(thisExp, win=None, timers=[], currentRoutine=None):
    """
    Pause this experiment, preventing the flow from advancing to the next routine until resumed.
    
    Parameters
    ==========
    thisExp : psychopy.data.ExperimentHandler
        Handler object for this experiment, contains the data to save and information about 
        where to save it to.
    win : psychopy.visual.Window
        Window for this experiment.
    timers : list, tuple
        List of timers to reset once pausing is finished.
    currentRoutine : psychopy.data.Routine
        Current Routine we are in at time of pausing, if any. This object tells PsychoPy what Components to pause/play/dispatch.
    """
    # if we are not paused, do nothing
    if thisExp.status != PAUSED:
        return
    
    # start a timer to figure out how long we're paused for
    pauseTimer = core.Clock()
    # pause any playback components
    if currentRoutine is not None:
        for comp in currentRoutine.getPlaybackComponents():
            comp.pause()
    # make sure we have a keyboard
    defaultKeyboard = deviceManager.getDevice('defaultKeyboard')
    if defaultKeyboard is None:
        defaultKeyboard = deviceManager.addKeyboard(
            deviceClass='keyboard',
            deviceName='defaultKeyboard',
            backend='ioHub',
        )
    # run a while loop while we wait to unpause
    while thisExp.status == PAUSED:
        # check for quit (typically the Esc key)
        if defaultKeyboard.getKeys(keyList=['escape']):
            endExperiment(thisExp, win=win)
        # dispatch messages on response components
        if currentRoutine is not None:
            for comp in currentRoutine.getDispatchComponents():
                comp.device.dispatchMessages()
        # sleep 1ms so other threads can execute
        clock.time.sleep(0.001)
    # if stop was requested while paused, quit
    if thisExp.status == FINISHED:
        endExperiment(thisExp, win=win)
    # resume any playback components
    if currentRoutine is not None:
        for comp in currentRoutine.getPlaybackComponents():
            comp.play()
    # reset any timers
    for timer in timers:
        timer.addTime(-pauseTimer.getTime())


def run(expInfo, thisExp, win, globalClock=None, thisSession=None):
    """
    Run the experiment flow.
    
    Parameters
    ==========
    expInfo : dict
        Information about this experiment, created by the `setupExpInfo` function.
    thisExp : psychopy.data.ExperimentHandler
        Handler object for this experiment, contains the data to save and information about 
        where to save it to.
    psychopy.visual.Window
        Window in which to run this experiment.
    globalClock : psychopy.core.clock.Clock or None
        Clock to get global time from - supply None to make a new one.
    thisSession : psychopy.session.Session or None
        Handle of the Session object this experiment is being run from, if any.
    """
    # mark experiment as started
    thisExp.status = STARTED
    # make sure window is set to foreground to prevent losing focus
    win.winHandle.activate()
    # make sure variables created by exec are available globally
    exec = environmenttools.setExecEnvironment(globals())
    # get device handles from dict of input devices
    ioServer = deviceManager.ioServer
    # get/create a default keyboard (e.g. to check for escape)
    defaultKeyboard = deviceManager.getDevice('defaultKeyboard')
    if defaultKeyboard is None:
        deviceManager.addDevice(
            deviceClass='keyboard', deviceName='defaultKeyboard', backend='ioHub'
        )
    eyetracker = deviceManager.getDevice('eyetracker')
    # make sure we're running in the directory for this experiment
    os.chdir(_thisDir)
    # get filename from ExperimentHandler for convenience
    filename = thisExp.dataFileName
    frameTolerance = 0.001  # how close to onset before 'same' frame
    endExpNow = False  # flag for 'escape' or other condition => quit the exp
    # get frame duration from frame rate in expInfo
    if 'frameRate' in expInfo and expInfo['frameRate'] is not None:
        frameDur = 1.0 / round(expInfo['frameRate'])
    else:
        frameDur = 1.0 / 60.0  # could not measure, so guess
    
    # Start Code - component code to be run after the window creation
    
    # --- Initialize components for Routine "welcome" ---
    text = visual.TextStim(win=win, name='text',
        text='c',
        font='Arial',
        pos=(0, 0), draggable=False, height=0.05, wrapWidth=None, ori=0.0, 
        color='white', colorSpace='rgb', opacity=None, 
        languageStyle='LTR',
        depth=0.0);
    welcome_key_input = keyboard.Keyboard(deviceName='welcome_key_input')
    welcome_1 = visual.TextStim(win=win, name='welcome_1',
        text='Hello :) Welcome to the experiment! In this phase, you will remain seated. A new image will appear every 2-10 seconds. Before each image, you will see a fixation point. After each image, there will be a brief blank screen. As soon as you see the image, press the spacebar immediately. Press the spacebar now to begin Phase 1.',
        font='Arial',
        pos=(0, 0), draggable=False, height=0.05, wrapWidth=None, ori=0.0, 
        color='white', colorSpace='rgb', opacity=None, 
        languageStyle='LTR',
        depth=-3.0);
    welcome_2 = visual.TextStim(win=win, name='welcome_2',
        text=':D --- Welcome to the next phase! In this phase, you will stand. A new image will appear every 2-10 seconds. Before each image, you will see a fixation point. After each image, there will be a blank screen. As soon as you see the image, press the spacebar immediately. Press the spacebar now to begin Phase 2.',
        font='Arial',
        pos=(0, 0), draggable=False, height=0.05, wrapWidth=None, ori=0.0, 
        color='white', colorSpace='rgb', opacity=None, 
        languageStyle='LTR',
        depth=-4.0);
    welcome_3 = visual.TextStim(win=win, name='welcome_3',
        text=';) --- Welcome to the final phase! In this phase, you will be seated again. A new image will appear every 2-10 seconds. You will see a fixation point before each image and a blank screen after each image. Press the spacebar immediately when you see the image. Press the spacebar now to begin Phase 3.',
        font='Arial',
        pos=(0, 0), draggable=False, height=0.05, wrapWidth=None, ori=0.0, 
        color='white', colorSpace='rgb', opacity=None, 
        languageStyle='LTR',
        depth=-5.0);
    
    # --- Initialize components for Routine "trial" ---
    presentation_duration = visual.TextStim(win=win, name='presentation_duration',
        text=None,
        font='Arial',
        units='pix', pos=(0, -150), draggable=False, height=0.05, wrapWidth=None, ori=0.0, 
        color='white', colorSpace='rgb', opacity=None, 
        languageStyle='LTR',
        depth=0.0);
    text_fixationCross = visual.TextStim(win=win, name='text_fixationCross',
        text='+',
        font='Arial',
        pos=(0, 0), draggable=False, height=0.05, wrapWidth=None, ori=0.0, 
        color='white', colorSpace='rgb', opacity=None, 
        languageStyle='LTR',
        depth=-1.0);
    image = visual.ImageStim(
        win=win,
        name='image', 
        image='default.png', mask=None, anchor='center',
        ori=0.0, pos=(0, 0), draggable=False, size=(0.5, 0.5),
        color=[1,1,1], colorSpace='rgb', opacity=None,
        flipHoriz=False, flipVert=False,
        texRes=128.0, interpolate=True, depth=-2.0)
    image_key_input = keyboard.Keyboard(deviceName='image_key_input')
    # Run 'Begin Experiment' code from trial_code
    import csv
    import random
    IMAGE_ORDER = []
    
    # read csv
    with open("images.csv") as f:
        reader = csv.reader(f)
        next(reader, None) # skip header
        for row in reader:
            image_path = row[2]
            IMAGE_ORDER.append(image_path)
    
    random.shuffle(IMAGE_ORDER)
    print("After shuffle: ",IMAGE_ORDER)
    
    # --- Initialize components for Routine "wait" ---
    text_3 = visual.TextStim(win=win, name='text_3',
        text=None,
        font='Arial',
        pos=(0, 0), draggable=False, height=0.05, wrapWidth=None, ori=0.0, 
        color='white', colorSpace='rgb', opacity=None, 
        languageStyle='LTR',
        depth=0.0);
    
    # --- Initialize components for Routine "break_2" ---
    text_countdown = visual.TextStim(win=win, name='text_countdown',
        text='5',
        font='Arial',
        pos=(0, 0), draggable=False, height=0.05, wrapWidth=None, ori=0.0, 
        color='white', colorSpace='rgb', opacity=None, 
        languageStyle='LTR',
        depth=0.0);
    text_4 = visual.TextStim(win=win, name='text_4',
        text='Take a small break',
        font='Arial',
        units='norm', pos=(0, 0.5), draggable=False, height=0.05, wrapWidth=None, ori=0.0, 
        color='white', colorSpace='rgb', opacity=None, 
        languageStyle='LTR',
        depth=-2.0);
    
    # create some handy timers
    
    # global clock to track the time since experiment started
    if globalClock is None:
        # create a clock if not given one
        globalClock = core.Clock()
    if isinstance(globalClock, str):
        # if given a string, make a clock accoridng to it
        if globalClock == 'float':
            # get timestamps as a simple value
            globalClock = core.Clock(format='float')
        elif globalClock == 'iso':
            # get timestamps in ISO format
            globalClock = core.Clock(format='%Y-%m-%d_%H:%M:%S.%f%z')
        else:
            # get timestamps in a custom format
            globalClock = core.Clock(format=globalClock)
    if ioServer is not None:
        ioServer.syncClock(globalClock)
    logging.setDefaultClock(globalClock)
    # routine timer to track time remaining of each (possibly non-slip) routine
    routineTimer = core.Clock()
    win.flip()  # flip window to reset last flip timer
    # store the exact time the global clock started
    expInfo['expStart'] = data.getDateStr(
        format='%Y-%m-%d %Hh%M.%S.%f %z', fractionalSecondDigits=6
    )
    
    # set up handler to look after randomisation of conditions etc
    bloc = data.TrialHandler2(
        name='bloc',
        nReps=3.0, 
        method='random', 
        extraInfo=expInfo, 
        originPath=-1, 
        trialList=[None], 
        seed=None, 
    )
    thisExp.addLoop(bloc)  # add the loop to the experiment
    thisBloc = bloc.trialList[0]  # so we can initialise stimuli with some values
    # abbreviate parameter names if possible (e.g. rgb = thisBloc.rgb)
    if thisBloc != None:
        for paramName in thisBloc:
            globals()[paramName] = thisBloc[paramName]
    if thisSession is not None:
        # if running in a Session with a Liaison client, send data up to now
        thisSession.sendExperimentData()
    
    for thisBloc in bloc:
        bloc.status = STARTED
        if hasattr(thisBloc, 'status'):
            thisBloc.status = STARTED
        currentLoop = bloc
        thisExp.timestampOnFlip(win, 'thisRow.t', format=globalClock.format)
        if thisSession is not None:
            # if running in a Session with a Liaison client, send data up to now
            thisSession.sendExperimentData()
        # abbreviate parameter names if possible (e.g. rgb = thisBloc.rgb)
        if thisBloc != None:
            for paramName in thisBloc:
                globals()[paramName] = thisBloc[paramName]
        
        # --- Prepare to start Routine "welcome" ---
        # create an object to store info about Routine welcome
        welcome = data.Routine(
            name='welcome',
            components=[text, welcome_key_input, welcome_1, welcome_2, welcome_3],
        )
        welcome.status = NOT_STARTED
        continueRoutine = True
        # update component parameters for each repeat
        # Run 'Begin Routine' code from welcome_setup
        print("made it here")
        if bloc.thisN == 0: 
            print("in 1")
            text.text = welcome_1.text
        elif bloc.thisN == 1:
            text.text = welcome_2.text
            print("in 2")
        elif bloc.thisN == 2:
            text.text = welcome_3.text
            print("in 3")
        import random
        
        # Initialize the final list
        routine_image_list = []
        
        # Randomly sample 10 from each category and combine
        for key in ["person", "scene", "object", "animal"]:
            if key in IMAGES:
                images = IMAGES[key]
                sample = random.sample(images, min(10, len(images)))
                routine_image_list.extend(sample)
        
        # Store the randomized list
        RANDOM_IMAGES = routine_image_list.copy()
        
        # Optional: Print for debugging
        # print("RANDOM_IMAGES:", RANDOM_IMAGES)
        # create starting attributes for welcome_key_input
        welcome_key_input.keys = []
        welcome_key_input.rt = []
        _welcome_key_input_allKeys = []
        # store start times for welcome
        welcome.tStartRefresh = win.getFutureFlipTime(clock=globalClock)
        welcome.tStart = globalClock.getTime(format='float')
        welcome.status = STARTED
        thisExp.addData('welcome.started', welcome.tStart)
        welcome.maxDuration = None
        # keep track of which components have finished
        welcomeComponents = welcome.components
        for thisComponent in welcome.components:
            thisComponent.tStart = None
            thisComponent.tStop = None
            thisComponent.tStartRefresh = None
            thisComponent.tStopRefresh = None
            if hasattr(thisComponent, 'status'):
                thisComponent.status = NOT_STARTED
        # reset timers
        t = 0
        _timeToFirstFrame = win.getFutureFlipTime(clock="now")
        frameN = -1
        
        # --- Run Routine "welcome" ---
        welcome.forceEnded = routineForceEnded = not continueRoutine
        while continueRoutine:
            # if trial has changed, end Routine now
            if hasattr(thisBloc, 'status') and thisBloc.status == STOPPING:
                continueRoutine = False
            # get current time
            t = routineTimer.getTime()
            tThisFlip = win.getFutureFlipTime(clock=routineTimer)
            tThisFlipGlobal = win.getFutureFlipTime(clock=None)
            frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
            # update/draw components on each frame
            
            # *text* updates
            
            # if text is starting this frame...
            if text.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                # keep track of start time/frame for later
                text.frameNStart = frameN  # exact frame index
                text.tStart = t  # local t and not account for scr refresh
                text.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(text, 'tStartRefresh')  # time at next scr refresh
                # add timestamp to datafile
                thisExp.timestampOnFlip(win, 'text.started')
                # update status
                text.status = STARTED
                text.setAutoDraw(True)
            
            # if text is active this frame...
            if text.status == STARTED:
                # update params
                pass
            
            # *welcome_key_input* updates
            waitOnFlip = False
            
            # if welcome_key_input is starting this frame...
            if welcome_key_input.status == NOT_STARTED and tThisFlip >= 1-frameTolerance:
                # keep track of start time/frame for later
                welcome_key_input.frameNStart = frameN  # exact frame index
                welcome_key_input.tStart = t  # local t and not account for scr refresh
                welcome_key_input.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(welcome_key_input, 'tStartRefresh')  # time at next scr refresh
                # add timestamp to datafile
                thisExp.timestampOnFlip(win, 'welcome_key_input.started')
                # update status
                welcome_key_input.status = STARTED
                # keyboard checking is just starting
                waitOnFlip = True
                win.callOnFlip(welcome_key_input.clock.reset)  # t=0 on next screen flip
                win.callOnFlip(welcome_key_input.clearEvents, eventType='keyboard')  # clear events on next screen flip
            if welcome_key_input.status == STARTED and not waitOnFlip:
                theseKeys = welcome_key_input.getKeys(keyList=['space'], ignoreKeys=["escape"], waitRelease=False)
                _welcome_key_input_allKeys.extend(theseKeys)
                if len(_welcome_key_input_allKeys):
                    welcome_key_input.keys = _welcome_key_input_allKeys[-1].name  # just the last key pressed
                    welcome_key_input.rt = _welcome_key_input_allKeys[-1].rt
                    welcome_key_input.duration = _welcome_key_input_allKeys[-1].duration
                    # a response ends the routine
                    continueRoutine = False
            
            # *welcome_1* updates
            
            # if welcome_1 is starting this frame...
            if welcome_1.status == NOT_STARTED and tThisFlip >= 00-frameTolerance:
                # keep track of start time/frame for later
                welcome_1.frameNStart = frameN  # exact frame index
                welcome_1.tStart = t  # local t and not account for scr refresh
                welcome_1.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(welcome_1, 'tStartRefresh')  # time at next scr refresh
                # add timestamp to datafile
                thisExp.timestampOnFlip(win, 'welcome_1.started')
                # update status
                welcome_1.status = STARTED
                welcome_1.setAutoDraw(True)
            
            # if welcome_1 is active this frame...
            if welcome_1.status == STARTED:
                # update params
                pass
            
            # if welcome_1 is stopping this frame...
            if welcome_1.status == STARTED:
                # is it time to stop? (based on global clock, using actual start)
                if tThisFlipGlobal > welcome_1.tStartRefresh + 0-frameTolerance:
                    # keep track of stop time/frame for later
                    welcome_1.tStop = t  # not accounting for scr refresh
                    welcome_1.tStopRefresh = tThisFlipGlobal  # on global time
                    welcome_1.frameNStop = frameN  # exact frame index
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'welcome_1.stopped')
                    # update status
                    welcome_1.status = FINISHED
                    welcome_1.setAutoDraw(False)
            
            # *welcome_2* updates
            
            # if welcome_2 is starting this frame...
            if welcome_2.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                # keep track of start time/frame for later
                welcome_2.frameNStart = frameN  # exact frame index
                welcome_2.tStart = t  # local t and not account for scr refresh
                welcome_2.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(welcome_2, 'tStartRefresh')  # time at next scr refresh
                # add timestamp to datafile
                thisExp.timestampOnFlip(win, 'welcome_2.started')
                # update status
                welcome_2.status = STARTED
                welcome_2.setAutoDraw(True)
            
            # if welcome_2 is active this frame...
            if welcome_2.status == STARTED:
                # update params
                pass
            
            # if welcome_2 is stopping this frame...
            if welcome_2.status == STARTED:
                # is it time to stop? (based on global clock, using actual start)
                if tThisFlipGlobal > welcome_2.tStartRefresh + 0-frameTolerance:
                    # keep track of stop time/frame for later
                    welcome_2.tStop = t  # not accounting for scr refresh
                    welcome_2.tStopRefresh = tThisFlipGlobal  # on global time
                    welcome_2.frameNStop = frameN  # exact frame index
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'welcome_2.stopped')
                    # update status
                    welcome_2.status = FINISHED
                    welcome_2.setAutoDraw(False)
            
            # *welcome_3* updates
            
            # if welcome_3 is starting this frame...
            if welcome_3.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                # keep track of start time/frame for later
                welcome_3.frameNStart = frameN  # exact frame index
                welcome_3.tStart = t  # local t and not account for scr refresh
                welcome_3.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(welcome_3, 'tStartRefresh')  # time at next scr refresh
                # add timestamp to datafile
                thisExp.timestampOnFlip(win, 'welcome_3.started')
                # update status
                welcome_3.status = STARTED
                welcome_3.setAutoDraw(True)
            
            # if welcome_3 is active this frame...
            if welcome_3.status == STARTED:
                # update params
                pass
            
            # if welcome_3 is stopping this frame...
            if welcome_3.status == STARTED:
                # is it time to stop? (based on global clock, using actual start)
                if tThisFlipGlobal > welcome_3.tStartRefresh + 0-frameTolerance:
                    # keep track of stop time/frame for later
                    welcome_3.tStop = t  # not accounting for scr refresh
                    welcome_3.tStopRefresh = tThisFlipGlobal  # on global time
                    welcome_3.frameNStop = frameN  # exact frame index
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'welcome_3.stopped')
                    # update status
                    welcome_3.status = FINISHED
                    welcome_3.setAutoDraw(False)
            
            # check for quit (typically the Esc key)
            if defaultKeyboard.getKeys(keyList=["escape"]):
                thisExp.status = FINISHED
            if thisExp.status == FINISHED or endExpNow:
                endExperiment(thisExp, win=win)
                return
            # pause experiment here if requested
            if thisExp.status == PAUSED:
                pauseExperiment(
                    thisExp=thisExp, 
                    win=win, 
                    timers=[routineTimer, globalClock], 
                    currentRoutine=welcome,
                )
                # skip the frame we paused on
                continue
            
            # check if all components have finished
            if not continueRoutine:  # a component has requested a forced-end of Routine
                welcome.forceEnded = routineForceEnded = True
                break
            continueRoutine = False  # will revert to True if at least one component still running
            for thisComponent in welcome.components:
                if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                    continueRoutine = True
                    break  # at least one component has not yet finished
            
            # refresh the screen
            if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
                win.flip()
        
        # --- Ending Routine "welcome" ---
        for thisComponent in welcome.components:
            if hasattr(thisComponent, "setAutoDraw"):
                thisComponent.setAutoDraw(False)
        # store stop times for welcome
        welcome.tStop = globalClock.getTime(format='float')
        welcome.tStopRefresh = tThisFlipGlobal
        thisExp.addData('welcome.stopped', welcome.tStop)
        # check responses
        if welcome_key_input.keys in ['', [], None]:  # No response was made
            welcome_key_input.keys = None
        bloc.addData('welcome_key_input.keys',welcome_key_input.keys)
        if welcome_key_input.keys != None:  # we had a response
            bloc.addData('welcome_key_input.rt', welcome_key_input.rt)
            bloc.addData('welcome_key_input.duration', welcome_key_input.duration)
        # the Routine "welcome" was not non-slip safe, so reset the non-slip timer
        routineTimer.reset()
        
        # set up handler to look after randomisation of conditions etc
        loops = data.TrialHandler2(
            name='loops',
            nReps=3.0, 
            method='sequential', 
            extraInfo=expInfo, 
            originPath=-1, 
            trialList=[None], 
            seed=None, 
        )
        thisExp.addLoop(loops)  # add the loop to the experiment
        thisLoop = loops.trialList[0]  # so we can initialise stimuli with some values
        # abbreviate parameter names if possible (e.g. rgb = thisLoop.rgb)
        if thisLoop != None:
            for paramName in thisLoop:
                globals()[paramName] = thisLoop[paramName]
        if thisSession is not None:
            # if running in a Session with a Liaison client, send data up to now
            thisSession.sendExperimentData()
        
        for thisLoop in loops:
            loops.status = STARTED
            if hasattr(thisLoop, 'status'):
                thisLoop.status = STARTED
            currentLoop = loops
            thisExp.timestampOnFlip(win, 'thisRow.t', format=globalClock.format)
            if thisSession is not None:
                # if running in a Session with a Liaison client, send data up to now
                thisSession.sendExperimentData()
            # abbreviate parameter names if possible (e.g. rgb = thisLoop.rgb)
            if thisLoop != None:
                for paramName in thisLoop:
                    globals()[paramName] = thisLoop[paramName]
            
            # --- Prepare to start Routine "trial" ---
            # create an object to store info about Routine trial
            trial = data.Routine(
                name='trial',
                components=[presentation_duration, text_fixationCross, image, image_key_input],
            )
            trial.status = NOT_STARTED
            continueRoutine = True
            # update component parameters for each repeat
            image.setImage(image_path)
            # create starting attributes for image_key_input
            image_key_input.keys = []
            image_key_input.rt = []
            _image_key_input_allKeys = []
            # Run 'Begin Routine' code from trial_code
            import random 
            random_duration = random.randint(2,5)
            presentation_duration.text = random_duration
            print("presentation_duration.text : ", )
            
            image_path = IMAGE_ORDER[loops.thisN]
            print("loops.thisN : ", loops.thisN)
            print("image_path : ", image_path)
            image.Image = image_path
            # store start times for trial
            trial.tStartRefresh = win.getFutureFlipTime(clock=globalClock)
            trial.tStart = globalClock.getTime(format='float')
            trial.status = STARTED
            thisExp.addData('trial.started', trial.tStart)
            trial.maxDuration = None
            # keep track of which components have finished
            trialComponents = trial.components
            for thisComponent in trial.components:
                thisComponent.tStart = None
                thisComponent.tStop = None
                thisComponent.tStartRefresh = None
                thisComponent.tStopRefresh = None
                if hasattr(thisComponent, 'status'):
                    thisComponent.status = NOT_STARTED
            # reset timers
            t = 0
            _timeToFirstFrame = win.getFutureFlipTime(clock="now")
            frameN = -1
            
            # --- Run Routine "trial" ---
            trial.forceEnded = routineForceEnded = not continueRoutine
            while continueRoutine:
                # if trial has changed, end Routine now
                if hasattr(thisLoop, 'status') and thisLoop.status == STOPPING:
                    continueRoutine = False
                # get current time
                t = routineTimer.getTime()
                tThisFlip = win.getFutureFlipTime(clock=routineTimer)
                tThisFlipGlobal = win.getFutureFlipTime(clock=None)
                frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
                # update/draw components on each frame
                
                # *presentation_duration* updates
                
                # if presentation_duration is starting this frame...
                if presentation_duration.status == NOT_STARTED and tThisFlip >= 0-frameTolerance:
                    # keep track of start time/frame for later
                    presentation_duration.frameNStart = frameN  # exact frame index
                    presentation_duration.tStart = t  # local t and not account for scr refresh
                    presentation_duration.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(presentation_duration, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'presentation_duration.started')
                    # update status
                    presentation_duration.status = STARTED
                    presentation_duration.setAutoDraw(True)
                
                # if presentation_duration is active this frame...
                if presentation_duration.status == STARTED:
                    # update params
                    pass
                
                # if presentation_duration is stopping this frame...
                if presentation_duration.status == STARTED:
                    # is it time to stop? (based on global clock, using actual start)
                    if tThisFlipGlobal > presentation_duration.tStartRefresh + 1-frameTolerance:
                        # keep track of stop time/frame for later
                        presentation_duration.tStop = t  # not accounting for scr refresh
                        presentation_duration.tStopRefresh = tThisFlipGlobal  # on global time
                        presentation_duration.frameNStop = frameN  # exact frame index
                        # add timestamp to datafile
                        thisExp.timestampOnFlip(win, 'presentation_duration.stopped')
                        # update status
                        presentation_duration.status = FINISHED
                        presentation_duration.setAutoDraw(False)
                
                # *text_fixationCross* updates
                
                # if text_fixationCross is starting this frame...
                if text_fixationCross.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    text_fixationCross.frameNStart = frameN  # exact frame index
                    text_fixationCross.tStart = t  # local t and not account for scr refresh
                    text_fixationCross.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(text_fixationCross, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'text_fixationCross.started')
                    # update status
                    text_fixationCross.status = STARTED
                    text_fixationCross.setAutoDraw(True)
                
                # if text_fixationCross is active this frame...
                if text_fixationCross.status == STARTED:
                    # update params
                    pass
                
                # if text_fixationCross is stopping this frame...
                if text_fixationCross.status == STARTED:
                    # is it time to stop? (based on global clock, using actual start)
                    if tThisFlipGlobal > text_fixationCross.tStartRefresh + 1.0-frameTolerance:
                        # keep track of stop time/frame for later
                        text_fixationCross.tStop = t  # not accounting for scr refresh
                        text_fixationCross.tStopRefresh = tThisFlipGlobal  # on global time
                        text_fixationCross.frameNStop = frameN  # exact frame index
                        # add timestamp to datafile
                        thisExp.timestampOnFlip(win, 'text_fixationCross.stopped')
                        # update status
                        text_fixationCross.status = FINISHED
                        text_fixationCross.setAutoDraw(False)
                
                # *image* updates
                
                # if image is starting this frame...
                if image.status == NOT_STARTED and tThisFlip >= 1-frameTolerance:
                    # keep track of start time/frame for later
                    image.frameNStart = frameN  # exact frame index
                    image.tStart = t  # local t and not account for scr refresh
                    image.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(image, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'image.started')
                    # update status
                    image.status = STARTED
                    image.setAutoDraw(True)
                
                # if image is active this frame...
                if image.status == STARTED:
                    # update params
                    pass
                
                # if image is stopping this frame...
                if image.status == STARTED:
                    # is it time to stop? (based on global clock, using actual start)
                    if tThisFlipGlobal > image.tStartRefresh + random_duration-frameTolerance:
                        # keep track of stop time/frame for later
                        image.tStop = t  # not accounting for scr refresh
                        image.tStopRefresh = tThisFlipGlobal  # on global time
                        image.frameNStop = frameN  # exact frame index
                        # add timestamp to datafile
                        thisExp.timestampOnFlip(win, 'image.stopped')
                        # update status
                        image.status = FINISHED
                        image.setAutoDraw(False)
                
                # *image_key_input* updates
                waitOnFlip = False
                
                # if image_key_input is starting this frame...
                if image_key_input.status == NOT_STARTED and tThisFlip >= 1-frameTolerance:
                    # keep track of start time/frame for later
                    image_key_input.frameNStart = frameN  # exact frame index
                    image_key_input.tStart = t  # local t and not account for scr refresh
                    image_key_input.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(image_key_input, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'image_key_input.started')
                    # update status
                    image_key_input.status = STARTED
                    # keyboard checking is just starting
                    waitOnFlip = True
                    win.callOnFlip(image_key_input.clock.reset)  # t=0 on next screen flip
                    win.callOnFlip(image_key_input.clearEvents, eventType='keyboard')  # clear events on next screen flip
                
                # if image_key_input is stopping this frame...
                if image_key_input.status == STARTED:
                    # is it time to stop? (based on global clock, using actual start)
                    if tThisFlipGlobal > image_key_input.tStartRefresh + random_duration-frameTolerance:
                        # keep track of stop time/frame for later
                        image_key_input.tStop = t  # not accounting for scr refresh
                        image_key_input.tStopRefresh = tThisFlipGlobal  # on global time
                        image_key_input.frameNStop = frameN  # exact frame index
                        # add timestamp to datafile
                        thisExp.timestampOnFlip(win, 'image_key_input.stopped')
                        # update status
                        image_key_input.status = FINISHED
                        image_key_input.status = FINISHED
                if image_key_input.status == STARTED and not waitOnFlip:
                    theseKeys = image_key_input.getKeys(keyList=['space'], ignoreKeys=["escape"], waitRelease=False)
                    _image_key_input_allKeys.extend(theseKeys)
                    if len(_image_key_input_allKeys):
                        image_key_input.keys = _image_key_input_allKeys[-1].name  # just the last key pressed
                        image_key_input.rt = _image_key_input_allKeys[-1].rt
                        image_key_input.duration = _image_key_input_allKeys[-1].duration
                
                # check for quit (typically the Esc key)
                if defaultKeyboard.getKeys(keyList=["escape"]):
                    thisExp.status = FINISHED
                if thisExp.status == FINISHED or endExpNow:
                    endExperiment(thisExp, win=win)
                    return
                # pause experiment here if requested
                if thisExp.status == PAUSED:
                    pauseExperiment(
                        thisExp=thisExp, 
                        win=win, 
                        timers=[routineTimer, globalClock], 
                        currentRoutine=trial,
                    )
                    # skip the frame we paused on
                    continue
                
                # check if all components have finished
                if not continueRoutine:  # a component has requested a forced-end of Routine
                    trial.forceEnded = routineForceEnded = True
                    break
                continueRoutine = False  # will revert to True if at least one component still running
                for thisComponent in trial.components:
                    if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                        continueRoutine = True
                        break  # at least one component has not yet finished
                
                # refresh the screen
                if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
                    win.flip()
            
            # --- Ending Routine "trial" ---
            for thisComponent in trial.components:
                if hasattr(thisComponent, "setAutoDraw"):
                    thisComponent.setAutoDraw(False)
            # store stop times for trial
            trial.tStop = globalClock.getTime(format='float')
            trial.tStopRefresh = tThisFlipGlobal
            thisExp.addData('trial.stopped', trial.tStop)
            # check responses
            if image_key_input.keys in ['', [], None]:  # No response was made
                image_key_input.keys = None
            loops.addData('image_key_input.keys',image_key_input.keys)
            if image_key_input.keys != None:  # we had a response
                loops.addData('image_key_input.rt', image_key_input.rt)
                loops.addData('image_key_input.duration', image_key_input.duration)
            # the Routine "trial" was not non-slip safe, so reset the non-slip timer
            routineTimer.reset()
            
            # --- Prepare to start Routine "wait" ---
            # create an object to store info about Routine wait
            wait = data.Routine(
                name='wait',
                components=[text_3],
            )
            wait.status = NOT_STARTED
            continueRoutine = True
            # update component parameters for each repeat
            # store start times for wait
            wait.tStartRefresh = win.getFutureFlipTime(clock=globalClock)
            wait.tStart = globalClock.getTime(format='float')
            wait.status = STARTED
            thisExp.addData('wait.started', wait.tStart)
            wait.maxDuration = None
            # keep track of which components have finished
            waitComponents = wait.components
            for thisComponent in wait.components:
                thisComponent.tStart = None
                thisComponent.tStop = None
                thisComponent.tStartRefresh = None
                thisComponent.tStopRefresh = None
                if hasattr(thisComponent, 'status'):
                    thisComponent.status = NOT_STARTED
            # reset timers
            t = 0
            _timeToFirstFrame = win.getFutureFlipTime(clock="now")
            frameN = -1
            
            # --- Run Routine "wait" ---
            wait.forceEnded = routineForceEnded = not continueRoutine
            while continueRoutine and routineTimer.getTime() < 1.0:
                # if trial has changed, end Routine now
                if hasattr(thisLoop, 'status') and thisLoop.status == STOPPING:
                    continueRoutine = False
                # get current time
                t = routineTimer.getTime()
                tThisFlip = win.getFutureFlipTime(clock=routineTimer)
                tThisFlipGlobal = win.getFutureFlipTime(clock=None)
                frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
                # update/draw components on each frame
                
                # *text_3* updates
                
                # if text_3 is starting this frame...
                if text_3.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    text_3.frameNStart = frameN  # exact frame index
                    text_3.tStart = t  # local t and not account for scr refresh
                    text_3.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(text_3, 'tStartRefresh')  # time at next scr refresh
                    # add timestamp to datafile
                    thisExp.timestampOnFlip(win, 'text_3.started')
                    # update status
                    text_3.status = STARTED
                    text_3.setAutoDraw(True)
                
                # if text_3 is active this frame...
                if text_3.status == STARTED:
                    # update params
                    pass
                
                # if text_3 is stopping this frame...
                if text_3.status == STARTED:
                    # is it time to stop? (based on global clock, using actual start)
                    if tThisFlipGlobal > text_3.tStartRefresh + 1.0-frameTolerance:
                        # keep track of stop time/frame for later
                        text_3.tStop = t  # not accounting for scr refresh
                        text_3.tStopRefresh = tThisFlipGlobal  # on global time
                        text_3.frameNStop = frameN  # exact frame index
                        # add timestamp to datafile
                        thisExp.timestampOnFlip(win, 'text_3.stopped')
                        # update status
                        text_3.status = FINISHED
                        text_3.setAutoDraw(False)
                
                # check for quit (typically the Esc key)
                if defaultKeyboard.getKeys(keyList=["escape"]):
                    thisExp.status = FINISHED
                if thisExp.status == FINISHED or endExpNow:
                    endExperiment(thisExp, win=win)
                    return
                # pause experiment here if requested
                if thisExp.status == PAUSED:
                    pauseExperiment(
                        thisExp=thisExp, 
                        win=win, 
                        timers=[routineTimer, globalClock], 
                        currentRoutine=wait,
                    )
                    # skip the frame we paused on
                    continue
                
                # check if all components have finished
                if not continueRoutine:  # a component has requested a forced-end of Routine
                    wait.forceEnded = routineForceEnded = True
                    break
                continueRoutine = False  # will revert to True if at least one component still running
                for thisComponent in wait.components:
                    if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                        continueRoutine = True
                        break  # at least one component has not yet finished
                
                # refresh the screen
                if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
                    win.flip()
            
            # --- Ending Routine "wait" ---
            for thisComponent in wait.components:
                if hasattr(thisComponent, "setAutoDraw"):
                    thisComponent.setAutoDraw(False)
            # store stop times for wait
            wait.tStop = globalClock.getTime(format='float')
            wait.tStopRefresh = tThisFlipGlobal
            thisExp.addData('wait.stopped', wait.tStop)
            # using non-slip timing so subtract the expected duration of this Routine (unless ended on request)
            if wait.maxDurationReached:
                routineTimer.addTime(-wait.maxDuration)
            elif wait.forceEnded:
                routineTimer.reset()
            else:
                routineTimer.addTime(-1.000000)
            # mark thisLoop as finished
            if hasattr(thisLoop, 'status'):
                thisLoop.status = FINISHED
            # if awaiting a pause, pause now
            if loops.status == PAUSED:
                thisExp.status = PAUSED
                pauseExperiment(
                    thisExp=thisExp, 
                    win=win, 
                    timers=[globalClock], 
                )
                # once done pausing, restore running status
                loops.status = STARTED
            thisExp.nextEntry()
            
        # completed 3.0 repeats of 'loops'
        loops.status = FINISHED
        
        if thisSession is not None:
            # if running in a Session with a Liaison client, send data up to now
            thisSession.sendExperimentData()
        
        # --- Prepare to start Routine "break_2" ---
        # create an object to store info about Routine break_2
        break_2 = data.Routine(
            name='break_2',
            components=[text_countdown, text_4],
        )
        break_2.status = NOT_STARTED
        continueRoutine = True
        # update component parameters for each repeat
        # Run 'Begin Routine' code from code_3
        task_timer = core.CountdownTimer(start = 5)
        # store start times for break_2
        break_2.tStartRefresh = win.getFutureFlipTime(clock=globalClock)
        break_2.tStart = globalClock.getTime(format='float')
        break_2.status = STARTED
        thisExp.addData('break_2.started', break_2.tStart)
        break_2.maxDuration = None
        # keep track of which components have finished
        break_2Components = break_2.components
        for thisComponent in break_2.components:
            thisComponent.tStart = None
            thisComponent.tStop = None
            thisComponent.tStartRefresh = None
            thisComponent.tStopRefresh = None
            if hasattr(thisComponent, 'status'):
                thisComponent.status = NOT_STARTED
        # reset timers
        t = 0
        _timeToFirstFrame = win.getFutureFlipTime(clock="now")
        frameN = -1
        
        # --- Run Routine "break_2" ---
        break_2.forceEnded = routineForceEnded = not continueRoutine
        while continueRoutine:
            # if trial has changed, end Routine now
            if hasattr(thisBloc, 'status') and thisBloc.status == STOPPING:
                continueRoutine = False
            # get current time
            t = routineTimer.getTime()
            tThisFlip = win.getFutureFlipTime(clock=routineTimer)
            tThisFlipGlobal = win.getFutureFlipTime(clock=None)
            frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
            # update/draw components on each frame
            
            # *text_countdown* updates
            
            # if text_countdown is starting this frame...
            if text_countdown.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                # keep track of start time/frame for later
                text_countdown.frameNStart = frameN  # exact frame index
                text_countdown.tStart = t  # local t and not account for scr refresh
                text_countdown.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(text_countdown, 'tStartRefresh')  # time at next scr refresh
                # add timestamp to datafile
                thisExp.timestampOnFlip(win, 'text_countdown.started')
                # update status
                text_countdown.status = STARTED
                text_countdown.setAutoDraw(True)
            
            # if text_countdown is active this frame...
            if text_countdown.status == STARTED:
                # update params
                pass
            # Run 'Each Frame' code from code_3
            # end task after 5 secs
            time_left = task_timer.getTime()
            minutes = int(time_left/60)
            seconds = int(time_left - minutes * 60)
            
            text_countdown.text = seconds
            if time_left <= 0.0:
                continueRoutine = False
            
            
            
            # *text_4* updates
            
            # if text_4 is starting this frame...
            if text_4.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                # keep track of start time/frame for later
                text_4.frameNStart = frameN  # exact frame index
                text_4.tStart = t  # local t and not account for scr refresh
                text_4.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(text_4, 'tStartRefresh')  # time at next scr refresh
                # add timestamp to datafile
                thisExp.timestampOnFlip(win, 'text_4.started')
                # update status
                text_4.status = STARTED
                text_4.setAutoDraw(True)
            
            # if text_4 is active this frame...
            if text_4.status == STARTED:
                # update params
                pass
            
            # check for quit (typically the Esc key)
            if defaultKeyboard.getKeys(keyList=["escape"]):
                thisExp.status = FINISHED
            if thisExp.status == FINISHED or endExpNow:
                endExperiment(thisExp, win=win)
                return
            # pause experiment here if requested
            if thisExp.status == PAUSED:
                pauseExperiment(
                    thisExp=thisExp, 
                    win=win, 
                    timers=[routineTimer, globalClock], 
                    currentRoutine=break_2,
                )
                # skip the frame we paused on
                continue
            
            # check if all components have finished
            if not continueRoutine:  # a component has requested a forced-end of Routine
                break_2.forceEnded = routineForceEnded = True
                break
            continueRoutine = False  # will revert to True if at least one component still running
            for thisComponent in break_2.components:
                if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                    continueRoutine = True
                    break  # at least one component has not yet finished
            
            # refresh the screen
            if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
                win.flip()
        
        # --- Ending Routine "break_2" ---
        for thisComponent in break_2.components:
            if hasattr(thisComponent, "setAutoDraw"):
                thisComponent.setAutoDraw(False)
        # store stop times for break_2
        break_2.tStop = globalClock.getTime(format='float')
        break_2.tStopRefresh = tThisFlipGlobal
        thisExp.addData('break_2.stopped', break_2.tStop)
        # the Routine "break_2" was not non-slip safe, so reset the non-slip timer
        routineTimer.reset()
        # mark thisBloc as finished
        if hasattr(thisBloc, 'status'):
            thisBloc.status = FINISHED
        # if awaiting a pause, pause now
        if bloc.status == PAUSED:
            thisExp.status = PAUSED
            pauseExperiment(
                thisExp=thisExp, 
                win=win, 
                timers=[globalClock], 
            )
            # once done pausing, restore running status
            bloc.status = STARTED
        thisExp.nextEntry()
        
    # completed 3.0 repeats of 'bloc'
    bloc.status = FINISHED
    
    if thisSession is not None:
        # if running in a Session with a Liaison client, send data up to now
        thisSession.sendExperimentData()
    
    # mark experiment as finished
    endExperiment(thisExp, win=win)


def saveData(thisExp):
    """
    Save data from this experiment
    
    Parameters
    ==========
    thisExp : psychopy.data.ExperimentHandler
        Handler object for this experiment, contains the data to save and information about 
        where to save it to.
    """
    filename = thisExp.dataFileName
    # these shouldn't be strictly necessary (should auto-save)
    thisExp.saveAsWideText(filename + '.csv', delim='auto')
    thisExp.saveAsPickle(filename)


def endExperiment(thisExp, win=None):
    """
    End this experiment, performing final shut down operations.
    
    This function does NOT close the window or end the Python process - use `quit` for this.
    
    Parameters
    ==========
    thisExp : psychopy.data.ExperimentHandler
        Handler object for this experiment, contains the data to save and information about 
        where to save it to.
    win : psychopy.visual.Window
        Window for this experiment.
    """
    if win is not None:
        # remove autodraw from all current components
        win.clearAutoDraw()
        # Flip one final time so any remaining win.callOnFlip() 
        # and win.timeOnFlip() tasks get executed
        win.flip()
    # return console logger level to WARNING
    logging.console.setLevel(logging.WARNING)
    # mark experiment handler as finished
    thisExp.status = FINISHED
    # run any 'at exit' functions
    for fcn in runAtExit:
        fcn()
    logging.flush()


def quit(thisExp, win=None, thisSession=None):
    """
    Fully quit, closing the window and ending the Python process.
    
    Parameters
    ==========
    win : psychopy.visual.Window
        Window to close.
    thisSession : psychopy.session.Session or None
        Handle of the Session object this experiment is being run from, if any.
    """
    thisExp.abort()  # or data files will save again on exit
    # make sure everything is closed down
    if win is not None:
        # Flip one final time so any remaining win.callOnFlip() 
        # and win.timeOnFlip() tasks get executed before quitting
        win.flip()
        win.close()
    logging.flush()
    if thisSession is not None:
        thisSession.stop()
    # terminate Python process
    core.quit()


# if running this experiment as a script...
if __name__ == '__main__':
    # call all functions in order
    expInfo = showExpInfoDlg(expInfo=expInfo)
    thisExp = setupData(expInfo=expInfo)
    logFile = setupLogging(filename=thisExp.dataFileName)
    win = setupWindow(expInfo=expInfo)
    setupDevices(expInfo=expInfo, thisExp=thisExp, win=win)
    run(
        expInfo=expInfo, 
        thisExp=thisExp, 
        win=win,
        globalClock='float'
    )
    saveData(thisExp=thisExp)
    quit(thisExp=thisExp, win=win)
