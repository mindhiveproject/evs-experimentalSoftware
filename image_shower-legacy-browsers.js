/********************* 
 * Image_Shower *
 *********************/


// store info about the experiment session:
let expName = 'image_shower';  // from the Builder filename that created this script
let expInfo = {
    'participant': `${util.pad(Number.parseFloat(util.randint(0, 999999)).toFixed(0), 6)}`,
    'session': '001',
};

// Start code blocks for 'Before Experiment'
window.IMAGES = new Map();

fetch('images.csv')
      .then(response => response.text())
      .then(text => {
        const lines = text.split('\n');
        // 4 categories
        let persons = [];
        let scenes = [];
        let objects = [];
        let animals = [];
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i];
            const values = line.split(',');
            if (values[1] === "Person") {
                persons.push(values[2]);
            }
            if (values[1] === "Scene") {
                scenes.push(values[2]);
            }
            if (values[1] === "Object") {
                objects.push(values[2]);
            }
            if (values[1] === "Animal") {
                animals.push(values[2]);
            }
        }
        window.IMAGES.set('person': persons);
        window.IMAGES.set('scene': scenes);
        window.IMAGES.set('object': objects);
        window.IMAGES.set('animal': animals);
      });
// init psychoJS:
const psychoJS = new PsychoJS({
  debug: true
});

// open window:
psychoJS.openWindow({
  fullscr: true,
  color: new util.Color([0,0,0]),
  units: 'height',
  waitBlanking: true,
  backgroundImage: '',
  backgroundFit: 'none',
});
// schedule the experiment:
psychoJS.schedule(psychoJS.gui.DlgFromDict({
  dictionary: expInfo,
  title: expName
}));

const flowScheduler = new Scheduler(psychoJS);
const dialogCancelScheduler = new Scheduler(psychoJS);
psychoJS.scheduleCondition(function() { return (psychoJS.gui.dialogComponent.button === 'OK'); },flowScheduler, dialogCancelScheduler);

// flowScheduler gets run if the participants presses OK
flowScheduler.add(updateInfo); // add timeStamp
flowScheduler.add(experimentInit);
const trialsLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(trialsLoopBegin(trialsLoopScheduler));
flowScheduler.add(trialsLoopScheduler);
flowScheduler.add(trialsLoopEnd);







flowScheduler.add(quitPsychoJS, 'Thank you for your patience.', true);

// quit if user presses Cancel in dialog box:
dialogCancelScheduler.add(quitPsychoJS, 'Thank you for your patience.', false);

psychoJS.start({
  expName: expName,
  expInfo: expInfo,
  resources: [
    // resources:
    {'name': 'image/Acorns 1.jpg', 'path': 'image/Acorns 1.jpg'},
    {'name': 'default.png', 'path': 'https://pavlovia.org/assets/default/default.png'},
    {'name': 'images.csv', 'path': 'images.csv'},
    {'name': 'image/Acorns 1.jpg', 'path': 'image/Acorns 1.jpg'},
    {'name': 'image/Acorns 2.jpg', 'path': 'image/Acorns 2.jpg'},
    {'name': 'image/Acorns 3.jpg', 'path': 'image/Acorns 3.jpg'},
    {'name': 'image/Alcohol 1.jpg', 'path': 'image/Alcohol 1.jpg'},
    {'name': 'image/Alcohol 2.jpg', 'path': 'image/Alcohol 2.jpg'},
    {'name': 'image/Alcohol 3.jpg', 'path': 'image/Alcohol 3.jpg'},
    {'name': 'image/Alcohol 4.jpg', 'path': 'image/Alcohol 4.jpg'},
    {'name': 'image/Alcohol 5.jpg', 'path': 'image/Alcohol 5.jpg'},
    {'name': 'image/Alcohol 6.jpg', 'path': 'image/Alcohol 6.jpg'},
    {'name': 'image/Alcohol 7.jpg', 'path': 'image/Alcohol 7.jpg'},
    {'name': 'image/Alcohol 8.jpg', 'path': 'image/Alcohol 8.jpg'},
    {'name': 'image/Ambulance 1.jpg', 'path': 'image/Ambulance 1.jpg'},
    {'name': 'image/Ambulance 2.jpg', 'path': 'image/Ambulance 2.jpg'},
    {'name': 'image/Ambulance 3.jpg', 'path': 'image/Ambulance 3.jpg'},
    {'name': 'image/Angry face 1.jpg', 'path': 'image/Angry face 1.jpg'},
    {'name': 'image/Angry face 2.jpg', 'path': 'image/Angry face 2.jpg'},
    {'name': 'image/Angry face 3.jpg', 'path': 'image/Angry face 3.jpg'},
    {'name': 'image/Angry face 4.jpg', 'path': 'image/Angry face 4.jpg'},
    {'name': 'image/Angry face 5.jpg', 'path': 'image/Angry face 5.jpg'},
    {'name': 'image/Angry pose 1.jpg', 'path': 'image/Angry pose 1.jpg'},
    {'name': 'image/Angry pose 2.jpg', 'path': 'image/Angry pose 2.jpg'},
    {'name': 'image/Animal carcass 1.jpg', 'path': 'image/Animal carcass 1.jpg'},
    {'name': 'image/Animal carcass 2.jpg', 'path': 'image/Animal carcass 2.jpg'},
    {'name': 'image/Animal carcass 3.jpg', 'path': 'image/Animal carcass 3.jpg'},
    {'name': 'image/Animal carcass 4.jpg', 'path': 'image/Animal carcass 4.jpg'},
    {'name': 'image/Animal carcass 5.jpg', 'path': 'image/Animal carcass 5.jpg'},
    {'name': 'image/Animal carcass 6.jpg', 'path': 'image/Animal carcass 6.jpg'},
    {'name': 'image/Archery 1.jpg', 'path': 'image/Archery 1.jpg'},
    {'name': 'image/Archery 2.jpg', 'path': 'image/Archery 2.jpg'},
    {'name': 'image/Astronaut 1.jpg', 'path': 'image/Astronaut 1.jpg'},
    {'name': 'image/Astronaut 2.jpg', 'path': 'image/Astronaut 2.jpg'},
    {'name': 'image/Baby 1.jpg', 'path': 'image/Baby 1.jpg'},
    {'name': 'image/Baby 2.jpg', 'path': 'image/Baby 2.jpg'},
    {'name': 'image/Baby 3.jpg', 'path': 'image/Baby 3.jpg'},
    {'name': 'image/Baby 4.jpg', 'path': 'image/Baby 4.jpg'},
    {'name': 'image/Baby 5.jpg', 'path': 'image/Baby 5.jpg'},
    {'name': 'image/Baby 6.jpg', 'path': 'image/Baby 6.jpg'},
    {'name': 'image/Baby 7.jpg', 'path': 'image/Baby 7.jpg'},
    {'name': 'image/Baby 8.jpg', 'path': 'image/Baby 8.jpg'},
    {'name': 'image/Baby 9.jpg', 'path': 'image/Baby 9.jpg'},
    {'name': 'image/Baby 10.jpg', 'path': 'image/Baby 10.jpg'},
    {'name': 'image/Band 1.jpg', 'path': 'image/Band 1.jpg'},
    {'name': 'image/Band 2.jpg', 'path': 'image/Band 2.jpg'},
    {'name': 'image/Bar 1.jpg', 'path': 'image/Bar 1.jpg'},
    {'name': 'image/Bar 3.jpg', 'path': 'image/Bar 3.jpg'},
    {'name': 'image/Barbeque 1.jpg', 'path': 'image/Barbeque 1.jpg'},
    {'name': 'image/Barbeque 2.jpg', 'path': 'image/Barbeque 2.jpg'},
    {'name': 'image/Bark 1.jpg', 'path': 'image/Bark 1.jpg'},
    {'name': 'image/Bark 2.jpg', 'path': 'image/Bark 2.jpg'},
    {'name': 'image/Bark 3.jpg', 'path': 'image/Bark 3.jpg'},
    {'name': 'image/Bark 4.jpg', 'path': 'image/Bark 4.jpg'},
    {'name': 'image/Bark 5.jpg', 'path': 'image/Bark 5.jpg'},
    {'name': 'image/Bark 6.jpg', 'path': 'image/Bark 6.jpg'},
    {'name': 'image/Barrels 1.jpg', 'path': 'image/Barrels 1.jpg'},
    {'name': 'image/BDSM 1.jpg', 'path': 'image/BDSM 1.jpg'},
    {'name': 'image/BDSM 2.jpg', 'path': 'image/BDSM 2.jpg'},
    {'name': 'image/BDSM 3.jpg', 'path': 'image/BDSM 3.jpg'},
    {'name': 'image/Beach 1.jpg', 'path': 'image/Beach 1.jpg'},
    {'name': 'image/Beach 2.jpg', 'path': 'image/Beach 2.jpg'},
  ]
});

psychoJS.experimentLogger.setLevel(core.Logger.ServerLevel.INFO);

async function updateInfo() {
  currentLoop = psychoJS.experiment;  // right now there are no loops
  expInfo['date'] = util.MonotonicClock.getDateStr();  // add a simple timestamp
  expInfo['expName'] = expName;
  expInfo['psychopyVersion'] = '2024.2.4';
  expInfo['OS'] = window.navigator.platform;


  // store frame rate of monitor if we can measure it successfully
  expInfo['frameRate'] = psychoJS.window.getActualFrameRate();
  if (typeof expInfo['frameRate'] !== 'undefined')
    frameDur = 1.0 / Math.round(expInfo['frameRate']);
  else
    frameDur = 1.0 / 60.0; // couldn't get a reliable measure so guess

  // add info from the URL:
  util.addInfoFromUrl(expInfo);
  

  
  psychoJS.experiment.dataFileName = (("." + "/") + `data/${expInfo["participant"]}_${expName}_${expInfo["date"]}`);
  psychoJS.experiment.field_separator = '\t';


  return Scheduler.Event.NEXT;
}

async function experimentInit() {
  // Initialize components for Routine "welcome"
  welcomeClock = new util.Clock();
  text = new visual.TextStim({
    win: psychoJS.window,
    name: 'text',
    text: 'c',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], draggable: false, height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  key_resp_2 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  welcome_1 = new visual.TextStim({
    win: psychoJS.window,
    name: 'welcome_1',
    text: '*** Welcome to the experiment! :) \nIn this phase, you will remain seated. A new image will appear every 2-10 seconds. Before each image, you will see a fixation point. After each image, there will be a brief blank screen. As soon as you see the image, press the spacebar immediately. Press the spacebar now to begin Phase 1.',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], draggable: false, height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -3.0 
  });
  
  welcome_2 = new visual.TextStim({
    win: psychoJS.window,
    name: 'welcome_2',
    text: 'Welcome to phase two! :)\nIn this phase, you will stand. A new image will appear every 2-10 seconds. Before each image, you will see a fixation point. After each image, there will be a blank screen. As soon as you see the image, press the spacebar immediately. Press the spacebar now to begin Phase 2.',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], draggable: false, height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -4.0 
  });
  
  welcome_3 = new visual.TextStim({
    win: psychoJS.window,
    name: 'welcome_3',
    text: 'welcome 3',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], draggable: false, height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -5.0 
  });
  
  // Initialize components for Routine "trial"
  trialClock = new util.Clock();
  polygon = new visual.ShapeStim ({
    win: psychoJS.window, name: 'polygon', 
    vertices: 'cross', size:[0.5, 0.5],
    ori: 0.0, 
    pos: [0, 0], 
    draggable: false, 
    anchor: 'center', 
    lineWidth: 1.0, 
    lineColor: new util.Color('white'), 
    fillColor: new util.Color('white'), 
    colorSpace: 'rgb', 
    opacity: undefined, 
    depth: 0, 
    interpolate: true, 
  });
  
  image = new visual.ImageStim({
    win : psychoJS.window,
    name : 'image', units : undefined, 
    image : 'default.png', mask : undefined,
    anchor : 'center',
    ori : 0.0, 
    pos : [0, 0], 
    draggable: false,
    size : [0.5, 0.5],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -1.0 
  });
  key_resp = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "wait"
  waitClock = new util.Clock();
  text_3 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_3',
    text: '',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], draggable: false, height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  // Initialize components for Routine "break_2"
  break_2Clock = new util.Clock();
  text_countdown = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_countdown',
    text: '10',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], draggable: false, height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  text_4 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_4',
    text: 'Please take a small break!',
    font: 'Arial',
    units: 'norm', 
    pos: [0, 0.5], draggable: false, height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -2.0 
  });
  
  // Create some handy timers
  globalClock = new util.Clock();  // to track the time since experiment started
  routineTimer = new util.CountdownTimer();  // to track time remaining of each (non-slip) routine
  
  return Scheduler.Event.NEXT;
}

function trialsLoopBegin(trialsLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    trials = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 3, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'trials'
    });
    psychoJS.experiment.addLoop(trials); // add the loop to the experiment
    currentLoop = trials;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    trials.forEach(function() {
      snapshot = trials.getSnapshot();
    
      trialsLoopScheduler.add(importConditions(snapshot));
      trialsLoopScheduler.add(welcomeRoutineBegin(snapshot));
      trialsLoopScheduler.add(welcomeRoutineEachFrame());
      trialsLoopScheduler.add(welcomeRoutineEnd(snapshot));
      const loopsLoopScheduler = new Scheduler(psychoJS);
      trialsLoopScheduler.add(loopsLoopBegin(loopsLoopScheduler, snapshot));
      trialsLoopScheduler.add(loopsLoopScheduler);
      trialsLoopScheduler.add(loopsLoopEnd);
      trialsLoopScheduler.add(break_2RoutineBegin(snapshot));
      trialsLoopScheduler.add(break_2RoutineEachFrame());
      trialsLoopScheduler.add(break_2RoutineEnd(snapshot));
      trialsLoopScheduler.add(trialsLoopEndIteration(trialsLoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}

function loopsLoopBegin(loopsLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    loops = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 3, method: TrialHandler.Method.SEQUENTIAL,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'loops'
    });
    psychoJS.experiment.addLoop(loops); // add the loop to the experiment
    currentLoop = loops;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    loops.forEach(function() {
      snapshot = loops.getSnapshot();
    
      loopsLoopScheduler.add(importConditions(snapshot));
      loopsLoopScheduler.add(trialRoutineBegin(snapshot));
      loopsLoopScheduler.add(trialRoutineEachFrame());
      loopsLoopScheduler.add(trialRoutineEnd(snapshot));
      loopsLoopScheduler.add(waitRoutineBegin(snapshot));
      loopsLoopScheduler.add(waitRoutineEachFrame());
      loopsLoopScheduler.add(waitRoutineEnd(snapshot));
      loopsLoopScheduler.add(loopsLoopEndIteration(loopsLoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}

async function loopsLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(loops);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}

function loopsLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      } else {
        psychoJS.experiment.nextEntry(snapshot);
      }
    return Scheduler.Event.NEXT;
    }
  };
}

async function trialsLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(trials);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}

function trialsLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      } else {
        psychoJS.experiment.nextEntry(snapshot);
      }
    return Scheduler.Event.NEXT;
    }
  };
}

function welcomeRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'welcome' ---
    t = 0;
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    welcomeClock.reset();
    routineTimer.reset();
    welcomeMaxDurationReached = false;
    // update component parameters for each repeat
    // Run 'Begin Routine' code from code_2
    if (trials.thisN === 0) {
        text.text = welcome_1.text;
    } else if (trials.thisN === 1) {
        text.text = welcome_2.text;
    } else if (trials.thisN === 2) {
        text.text = welcome_3.text;
    }
    
    // Initialize list of 40 images
    routine_image_list = []
    
    for (let key in window.IMAGES) {
        const arr = window.IMAGES[key]
        console.log(key, arr);
        const slice = arr.slice(0, 10).sort(() => 0.5 - Math.random());
        console.log(key, slice);
    }
    
    window.RANDOM_IMAGES = window.IMAGES.slice().sort(() => 0.5 - Math.random());
    
    console.log("Randomizing images");
    console.log(window.RANDOM_IMAGES)
    key_resp_2.keys = undefined;
    key_resp_2.rt = undefined;
    _key_resp_2_allKeys = [];
    psychoJS.experiment.addData('welcome.started', globalClock.getTime());
    welcomeMaxDuration = null
    // keep track of which components have finished
    welcomeComponents = [];
    welcomeComponents.push(text);
    welcomeComponents.push(key_resp_2);
    welcomeComponents.push(welcome_1);
    welcomeComponents.push(welcome_2);
    welcomeComponents.push(welcome_3);
    
    welcomeComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}

function welcomeRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'welcome' ---
    // get current time
    t = welcomeClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text* updates
    if (t >= 0.0 && text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text.tStart = t;  // (not accounting for frame time here)
      text.frameNStart = frameN;  // exact frame index
      
      text.setAutoDraw(true);
    }
    
    
    // *key_resp_2* updates
    if (t >= 1 && key_resp_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_resp_2.tStart = t;  // (not accounting for frame time here)
      key_resp_2.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_resp_2.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_resp_2.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_resp_2.clearEvents(); });
    }
    
    if (key_resp_2.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_resp_2.getKeys({keyList: ['space'], waitRelease: false});
      _key_resp_2_allKeys = _key_resp_2_allKeys.concat(theseKeys);
      if (_key_resp_2_allKeys.length > 0) {
        key_resp_2.keys = _key_resp_2_allKeys[_key_resp_2_allKeys.length - 1].name;  // just the last key pressed
        key_resp_2.rt = _key_resp_2_allKeys[_key_resp_2_allKeys.length - 1].rt;
        key_resp_2.duration = _key_resp_2_allKeys[_key_resp_2_allKeys.length - 1].duration;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    
    // *welcome_1* updates
    if (t >= 0 && welcome_1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      welcome_1.tStart = t;  // (not accounting for frame time here)
      welcome_1.frameNStart = frameN;  // exact frame index
      
      welcome_1.setAutoDraw(true);
    }
    
    frameRemains = 0 + 0 - psychoJS.window.monitorFramePeriod * 0.75;// most of one frame period left
    if (welcome_1.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      welcome_1.setAutoDraw(false);
    }
    
    
    // *welcome_2* updates
    if (t >= 0.0 && welcome_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      welcome_2.tStart = t;  // (not accounting for frame time here)
      welcome_2.frameNStart = frameN;  // exact frame index
      
      welcome_2.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 0 - psychoJS.window.monitorFramePeriod * 0.75;// most of one frame period left
    if (welcome_2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      welcome_2.setAutoDraw(false);
    }
    
    
    // *welcome_3* updates
    if (t >= 0.0 && welcome_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      welcome_3.tStart = t;  // (not accounting for frame time here)
      welcome_3.frameNStart = frameN;  // exact frame index
      
      welcome_3.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 0 - psychoJS.window.monitorFramePeriod * 0.75;// most of one frame period left
    if (welcome_3.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      welcome_3.setAutoDraw(false);
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    welcomeComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}

function welcomeRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'welcome' ---
    welcomeComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    psychoJS.experiment.addData('welcome.stopped', globalClock.getTime());
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(key_resp_2.corr, level);
    }
    psychoJS.experiment.addData('key_resp_2.keys', key_resp_2.keys);
    if (typeof key_resp_2.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('key_resp_2.rt', key_resp_2.rt);
        psychoJS.experiment.addData('key_resp_2.duration', key_resp_2.duration);
        routineTimer.reset();
        }
    
    key_resp_2.stop();
    // the Routine "welcome" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}

function trialRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'trial' ---
    t = 0;
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    trialClock.reset();
    routineTimer.reset();
    trialMaxDurationReached = false;
    // update component parameters for each repeat
    image.setImage('image/Acorns 1.jpg');
    key_resp.keys = undefined;
    key_resp.rt = undefined;
    _key_resp_allKeys = [];
    // Run 'Begin Routine' code from code
    let image_time_range = 1;
    
    random_duration = 2 + Math.floor(Math.random() * image_time_range);
    //text_2.text = random_duration;
    
    image_path = window.RANDOM_IMAGES[loops.thisN];
    image.image = image_path;
    psychoJS.experiment.addData('trial.started', globalClock.getTime());
    trialMaxDuration = null
    // keep track of which components have finished
    trialComponents = [];
    trialComponents.push(polygon);
    trialComponents.push(image);
    trialComponents.push(key_resp);
    
    trialComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}

function trialRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'trial' ---
    // get current time
    t = trialClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *polygon* updates
    if (t >= 0.0 && polygon.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      polygon.tStart = t;  // (not accounting for frame time here)
      polygon.frameNStart = frameN;  // exact frame index
      
      polygon.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 1.0 - psychoJS.window.monitorFramePeriod * 0.75;// most of one frame period left
    if (polygon.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      polygon.setAutoDraw(false);
    }
    
    
    // *image* updates
    if (t >= 1 && image.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      image.tStart = t;  // (not accounting for frame time here)
      image.frameNStart = frameN;  // exact frame index
      
      image.setAutoDraw(true);
    }
    
    frameRemains = 1 + random_duration - psychoJS.window.monitorFramePeriod * 0.75;// most of one frame period left
    if (image.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      image.setAutoDraw(false);
    }
    
    
    // *key_resp* updates
    if (t >= 1 && key_resp.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_resp.tStart = t;  // (not accounting for frame time here)
      key_resp.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_resp.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_resp.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_resp.clearEvents(); });
    }
    
    frameRemains = 1 + random_duration - psychoJS.window.monitorFramePeriod * 0.75;// most of one frame period left
    if (key_resp.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      key_resp.status = PsychoJS.Status.FINISHED;
        }
      
    if (key_resp.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_resp.getKeys({keyList: ['space'], waitRelease: false});
      _key_resp_allKeys = _key_resp_allKeys.concat(theseKeys);
      if (_key_resp_allKeys.length > 0) {
        key_resp.keys = _key_resp_allKeys[_key_resp_allKeys.length - 1].name;  // just the last key pressed
        key_resp.rt = _key_resp_allKeys[_key_resp_allKeys.length - 1].rt;
        key_resp.duration = _key_resp_allKeys[_key_resp_allKeys.length - 1].duration;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    trialComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}

function trialRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'trial' ---
    trialComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    psychoJS.experiment.addData('trial.stopped', globalClock.getTime());
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(key_resp.corr, level);
    }
    psychoJS.experiment.addData('key_resp.keys', key_resp.keys);
    if (typeof key_resp.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('key_resp.rt', key_resp.rt);
        psychoJS.experiment.addData('key_resp.duration', key_resp.duration);
        }
    
    key_resp.stop();
    // the Routine "trial" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}

function waitRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'wait' ---
    t = 0;
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    waitClock.reset(routineTimer.getTime());
    routineTimer.add(1.000000);
    waitMaxDurationReached = false;
    // update component parameters for each repeat
    psychoJS.experiment.addData('wait.started', globalClock.getTime());
    waitMaxDuration = null
    // keep track of which components have finished
    waitComponents = [];
    waitComponents.push(text_3);
    
    waitComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}

function waitRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'wait' ---
    // get current time
    t = waitClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text_3* updates
    if (t >= 0.0 && text_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_3.tStart = t;  // (not accounting for frame time here)
      text_3.frameNStart = frameN;  // exact frame index
      
      text_3.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 1.0 - psychoJS.window.monitorFramePeriod * 0.75;// most of one frame period left
    if (text_3.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      text_3.setAutoDraw(false);
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    waitComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}

function waitRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'wait' ---
    waitComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    psychoJS.experiment.addData('wait.stopped', globalClock.getTime());
    if (waitMaxDurationReached) {
        waitClock.add(waitMaxDuration);
    } else {
        waitClock.add(1.000000);
    }
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}

function break_2RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'break_2' ---
    t = 0;
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    break_2Clock.reset();
    routineTimer.reset();
    break_2MaxDurationReached = false;
    // update component parameters for each repeat
    // Run 'Begin Routine' code from code_3
    clock = new util.Clock();
    current_time = 0
    countdown_time = 10
    psychoJS.experiment.addData('break_2.started', globalClock.getTime());
    break_2MaxDuration = null
    // keep track of which components have finished
    break_2Components = [];
    break_2Components.push(text_countdown);
    break_2Components.push(text_4);
    
    break_2Components.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}

function break_2RoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'break_2' ---
    // get current time
    t = break_2Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text_countdown* updates
    if (t >= 0.0 && text_countdown.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_countdown.tStart = t;  // (not accounting for frame time here)
      text_countdown.frameNStart = frameN;  // exact frame index
      
      text_countdown.setAutoDraw(true);
    }
    
    // Run 'Each Frame' code from code_3
    if (current_time >= countdown_time) {
        text_countdown.text = countdown_time
        continueRoutine = false;
    }
    
    let now = Math.floor(clock.getTime());
    if (now !== current_time) {
      current_time = now;
      text_countdown.text = countdown_time - now;
    }
    
    // *text_4* updates
    if (t >= 0.0 && text_4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_4.tStart = t;  // (not accounting for frame time here)
      text_4.frameNStart = frameN;  // exact frame index
      
      text_4.setAutoDraw(true);
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    break_2Components.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}

function break_2RoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'break_2' ---
    break_2Components.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    psychoJS.experiment.addData('break_2.stopped', globalClock.getTime());
    // the Routine "break_2" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}

function importConditions(currentLoop) {
  return async function () {
    psychoJS.importAttributes(currentLoop.getCurrentTrial());
    return Scheduler.Event.NEXT;
    };
}

async function quitPsychoJS(message, isCompleted) {
  // Check for and save orphaned data
  if (psychoJS.experiment.isEntryEmpty()) {
    psychoJS.experiment.nextEntry();
  }
  psychoJS.window.close();
  psychoJS.quit({message: message, isCompleted: isCompleted});
  
  return Scheduler.Event.QUIT;
}
