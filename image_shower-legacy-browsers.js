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
console.log("Fetching images2.");
window.IMAGES = new Map();

console.log("Fetching images.");
fetch('images.csv')
      .then(response => response.text())
      .then(text => {
        const lines = text.split("\n");
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
//        console.log("persons");
//        console.log(persons);
//        console.log("scenes");
//        console.log(scenes);
//        console.log("objects");
//        console.log(objects);
//        console.log("animals");
//        console.log(animals);
        window.IMAGES.set("person", persons);
        window.IMAGES.set("scene", scenes);
        window.IMAGES.set("object", objects);
        window.IMAGES.set("animal", animals);
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
    {'name': 'image/Bar 2.jpg', 'path': 'image/Bar 2.jpg'},
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
    {'name': 'image/Beach 3.jpg', 'path': 'image/Beach 3.jpg'},
    {'name': 'image/Beach 4.jpg', 'path': 'image/Beach 4.jpg'},
    {'name': 'image/Beach 5.jpg', 'path': 'image/Beach 5.jpg'},
    {'name': 'image/Beach 6.jpg', 'path': 'image/Beach 6.jpg'},
    {'name': 'image/Beach 7.jpg', 'path': 'image/Beach 7.jpg'},
    {'name': 'image/Beach 8.jpg', 'path': 'image/Beach 8.jpg'},
    {'name': 'image/Bear 1.jpg', 'path': 'image/Bear 1.jpg'},
    {'name': 'image/Bear 2.jpg', 'path': 'image/Bear 2.jpg'},
    {'name': 'image/Bear 3.jpg', 'path': 'image/Bear 3.jpg'},
    {'name': 'image/Bed 1.jpg', 'path': 'image/Bed 1.jpg'},
    {'name': 'image/Bee 1.jpg', 'path': 'image/Bee 1.jpg'},
    {'name': 'image/Biking 1.jpg', 'path': 'image/Biking 1.jpg'},
    {'name': 'image/Billiards 1.jpg', 'path': 'image/Billiards 1.jpg'},
    {'name': 'image/Bird 1.jpg', 'path': 'image/Bird 1.jpg'},
    {'name': 'image/Bird 2.jpg', 'path': 'image/Bird 2.jpg'},
    {'name': 'image/Bird 3.jpg', 'path': 'image/Bird 3.jpg'},
    {'name': 'image/Bird 4.jpg', 'path': 'image/Bird 4.jpg'},
    {'name': 'image/Bird 5.jpg', 'path': 'image/Bird 5.jpg'},
    {'name': 'image/Birthday 1.jpg', 'path': 'image/Birthday 1.jpg'},
    {'name': 'image/Birthday 2.jpg', 'path': 'image/Birthday 2.jpg'},
    {'name': 'image/Birthday 3.jpg', 'path': 'image/Birthday 3.jpg'},
    {'name': 'image/Bloody knife 1.jpg', 'path': 'image/Bloody knife 1.jpg'},
    {'name': 'image/Bloody knife 2.jpg', 'path': 'image/Bloody knife 2.jpg'},
    {'name': 'image/Boat 1.jpg', 'path': 'image/Boat 1.jpg'},
    {'name': 'image/Bored face 1.jpg', 'path': 'image/Bored face 1.jpg'},
    {'name': 'image/Bored pose 1.jpg', 'path': 'image/Bored pose 1.jpg'},
    {'name': 'image/Bored pose 2.jpg', 'path': 'image/Bored pose 2.jpg'},
    {'name': 'image/Bored pose 3.jpg', 'path': 'image/Bored pose 3.jpg'},
    {'name': 'image/Bored pose 4.jpg', 'path': 'image/Bored pose 4.jpg'},
    {'name': 'image/Bored pose 5.jpg', 'path': 'image/Bored pose 5.jpg'},
    {'name': 'image/Bored pose 6.jpg', 'path': 'image/Bored pose 6.jpg'},
    {'name': 'image/Bottle 1.jpg', 'path': 'image/Bottle 1.jpg'},
    {'name': 'image/Boxing 1.jpg', 'path': 'image/Boxing 1.jpg'},
    {'name': 'image/Boxing 2.jpg', 'path': 'image/Boxing 2.jpg'},
    {'name': 'image/Bricks 1.jpg', 'path': 'image/Bricks 1.jpg'},
    {'name': 'image/Bridge 1.jpg', 'path': 'image/Bridge 1.jpg'},
    {'name': 'image/Bubble 1.jpg', 'path': 'image/Bubble 1.jpg'},
    {'name': 'image/Bubble 2.jpg', 'path': 'image/Bubble 2.jpg'},
    {'name': 'image/Building 1.jpg', 'path': 'image/Building 1.jpg'},
    {'name': 'image/Building 2.jpg', 'path': 'image/Building 2.jpg'},
    {'name': 'image/Bungee jumping 1.jpg', 'path': 'image/Bungee jumping 1.jpg'},
    {'name': 'image/Bungee jumping 2.jpg', 'path': 'image/Bungee jumping 2.jpg'},
    {'name': 'image/Bungee jumping 3.jpg', 'path': 'image/Bungee jumping 3.jpg'},
    {'name': 'image/Camping 1.jpg', 'path': 'image/Camping 1.jpg'},
    {'name': 'image/Camping 2.jpg', 'path': 'image/Camping 2.jpg'},
    {'name': 'image/Camping 3.jpg', 'path': 'image/Camping 3.jpg'},
    {'name': 'image/Camping 4.jpg', 'path': 'image/Camping 4.jpg'},
    {'name': 'image/Camping 6.jpg', 'path': 'image/Camping 6.jpg'},
    {'name': 'image/Camping 7.jpg', 'path': 'image/Camping 7.jpg'},
    {'name': 'image/Camping 8.jpg', 'path': 'image/Camping 8.jpg'},
    {'name': 'image/Camping 9.jpg', 'path': 'image/Camping 9.jpg'},
    {'name': 'image/Camping 10.jpg', 'path': 'image/Camping 10.jpg'},
    {'name': 'image/Candle 1.jpg', 'path': 'image/Candle 1.jpg'},
    {'name': 'image/Car 1.jpg', 'path': 'image/Car 1.jpg'},
    {'name': 'image/Car 2.jpg', 'path': 'image/Car 2.jpg'},
    {'name': 'image/Car accident 1.jpg', 'path': 'image/Car accident 1.jpg'},
    {'name': 'image/Car accident 2.jpg', 'path': 'image/Car accident 2.jpg'},
    {'name': 'image/Car accident 3.jpg', 'path': 'image/Car accident 3.jpg'},
    {'name': 'image/Car accident 4.jpg', 'path': 'image/Car accident 4.jpg'},
    {'name': 'image/Car crash 1.jpg', 'path': 'image/Car crash 1.jpg'},
    {'name': 'image/Car crash 2.jpg', 'path': 'image/Car crash 2.jpg'},
    {'name': 'image/Car crash 3.jpg', 'path': 'image/Car crash 3.jpg'},
    {'name': 'image/Car race 1.jpg', 'path': 'image/Car race 1.jpg'},
    {'name': 'image/Car race 2.jpg', 'path': 'image/Car race 2.jpg'},
    {'name': 'image/Car race 3.jpg', 'path': 'image/Car race 3.jpg'},
    {'name': 'image/Car race 4.jpg', 'path': 'image/Car race 4.jpg'},
    {'name': 'image/Cardboard 1.jpg', 'path': 'image/Cardboard 1.jpg'},
    {'name': 'image/Cardboard 2.jpg', 'path': 'image/Cardboard 2.jpg'},
    {'name': 'image/Cardboard 3.jpg', 'path': 'image/Cardboard 3.jpg'},
    {'name': 'image/Cat 1.jpg', 'path': 'image/Cat 1.jpg'},
    {'name': 'image/Cat 2.jpg', 'path': 'image/Cat 2.jpg'},
    {'name': 'image/Cat 3.jpg', 'path': 'image/Cat 3.jpg'},
    {'name': 'image/Cat 4.jpg', 'path': 'image/Cat 4.jpg'},
    {'name': 'image/Cat 5.jpg', 'path': 'image/Cat 5.jpg'},
    {'name': 'image/Cat 6.jpg', 'path': 'image/Cat 6.jpg'},
    {'name': 'image/Cat 7.jpg', 'path': 'image/Cat 7.jpg'},
    {'name': 'image/Cat 8.jpg', 'path': 'image/Cat 8.jpg'},
    {'name': 'image/Cat 9.jpg', 'path': 'image/Cat 9.jpg'},
    {'name': 'image/Cat 10.jpg', 'path': 'image/Cat 10.jpg'},
    {'name': 'image/Cat 11.jpg', 'path': 'image/Cat 11.jpg'},
    {'name': 'image/Cat 12.jpg', 'path': 'image/Cat 12.jpg'},
    {'name': 'image/Cat 13.jpg', 'path': 'image/Cat 13.jpg'},
    {'name': 'image/Cat 14.jpg', 'path': 'image/Cat 14.jpg'},
    {'name': 'image/Celebration 1.jpg', 'path': 'image/Celebration 1.jpg'},
    {'name': 'image/Celebration 2.jpg', 'path': 'image/Celebration 2.jpg'},
    {'name': 'image/Cemetery 1.jpg', 'path': 'image/Cemetery 1.jpg'},
    {'name': 'image/Cemetery 2.jpg', 'path': 'image/Cemetery 2.jpg'},
    {'name': 'image/Cemetery 3.jpg', 'path': 'image/Cemetery 3.jpg'},
    {'name': 'image/Cemetery 4.jpg', 'path': 'image/Cemetery 4.jpg'},
    {'name': 'image/Cemetery 5.jpg', 'path': 'image/Cemetery 5.jpg'},
    {'name': 'image/Cheerleader 1.jpg', 'path': 'image/Cheerleader 1.jpg'},
    {'name': 'image/Cheerleader 2.jpg', 'path': 'image/Cheerleader 2.jpg'},
    {'name': 'image/Child labor 1.jpg', 'path': 'image/Child labor 1.jpg'},
    {'name': 'image/Child labor 2.jpg', 'path': 'image/Child labor 2.jpg'},
    {'name': 'image/Child labor 3.jpg', 'path': 'image/Child labor 3.jpg'},
    {'name': 'image/Child labor 4.jpg', 'path': 'image/Child labor 4.jpg'},
    {'name': 'image/Children 1.jpg', 'path': 'image/Children 1.jpg'},
    {'name': 'image/Chipmunk 1.jpg', 'path': 'image/Chipmunk 1.jpg'},
    {'name': 'image/Chipmunk 2.jpg', 'path': 'image/Chipmunk 2.jpg'},
    {'name': 'image/Chipmunk 3.jpg', 'path': 'image/Chipmunk 3.jpg'},
    {'name': 'image/City 1.jpg', 'path': 'image/City 1.jpg'},
    {'name': 'image/Clean 1.jpg', 'path': 'image/Clean 1.jpg'},
    {'name': 'image/Cliff diver 1.jpg', 'path': 'image/Cliff diver 1.jpg'},
    {'name': 'image/Cliff diver 2.jpg', 'path': 'image/Cliff diver 2.jpg'},
    {'name': 'image/Cliff diver 3.jpg', 'path': 'image/Cliff diver 3.jpg'},
    {'name': 'image/Cockroach 1.jpg', 'path': 'image/Cockroach 1.jpg'},
    {'name': 'image/Cockroach 2.jpg', 'path': 'image/Cockroach 2.jpg'},
    {'name': 'image/Cockroach 3.jpg', 'path': 'image/Cockroach 3.jpg'},
    {'name': 'image/Cockroach 4.jpg', 'path': 'image/Cockroach 4.jpg'},
    {'name': 'image/Coffee 1.jpg', 'path': 'image/Coffee 1.jpg'},
    {'name': 'image/Cold 1.jpg', 'path': 'image/Cold 1.jpg'},
    {'name': 'image/Cold 2.jpg', 'path': 'image/Cold 2.jpg'},
    {'name': 'image/Cold 3.jpg', 'path': 'image/Cold 3.jpg'},
    {'name': 'image/Cold 4.jpg', 'path': 'image/Cold 4.jpg'},
    {'name': 'image/Cold 5.jpg', 'path': 'image/Cold 5.jpg'},
    {'name': 'image/Cold 6.jpg', 'path': 'image/Cold 6.jpg'},
    {'name': 'image/Cold 7.jpg', 'path': 'image/Cold 7.jpg'},
    {'name': 'image/Cold 8.jpg', 'path': 'image/Cold 8.jpg'},
    {'name': 'image/Collaboration 1.jpg', 'path': 'image/Collaboration 1.jpg'},
    {'name': 'image/Cotton swabs 1.jpg', 'path': 'image/Cotton swabs 1.jpg'},
    {'name': 'image/Cotton swabs 2.jpg', 'path': 'image/Cotton swabs 2.jpg'},
    {'name': 'image/Cotton swabs 3.jpg', 'path': 'image/Cotton swabs 3.jpg'},
    {'name': 'image/Couple 1.jpg', 'path': 'image/Couple 1.jpg'},
    {'name': 'image/Couple 2.jpg', 'path': 'image/Couple 2.jpg'},
    {'name': 'image/Couple 3.jpg', 'path': 'image/Couple 3.jpg'},
    {'name': 'image/Couple 4.jpg', 'path': 'image/Couple 4.jpg'},
    {'name': 'image/Couple 5.jpg', 'path': 'image/Couple 5.jpg'},
    {'name': 'image/Couple 6.jpg', 'path': 'image/Couple 6.jpg'},
    {'name': 'image/Couple 7.jpg', 'path': 'image/Couple 7.jpg'},
    {'name': 'image/Couple 8.jpg', 'path': 'image/Couple 8.jpg'},
    {'name': 'image/Couple 9.jpg', 'path': 'image/Couple 9.jpg'},
    {'name': 'image/Crosswalk 1.jpg', 'path': 'image/Crosswalk 1.jpg'},
    {'name': 'image/Crow 1.jpg', 'path': 'image/Crow 1.jpg'},
    {'name': 'image/Crow 2.jpg', 'path': 'image/Crow 2.jpg'},
    {'name': 'image/Cups 1.jpg', 'path': 'image/Cups 1.jpg'},
    {'name': 'image/Cups 2.jpg', 'path': 'image/Cups 2.jpg'},
    {'name': 'image/Cups 3.jpg', 'path': 'image/Cups 3.jpg'},
    {'name': 'image/Cups 4.jpg', 'path': 'image/Cups 4.jpg'},
    {'name': 'image/Dancing 1.jpg', 'path': 'image/Dancing 1.jpg'},
    {'name': 'image/Dancing 2.jpg', 'path': 'image/Dancing 2.jpg'},
    {'name': 'image/Dancing 3.jpg', 'path': 'image/Dancing 3.jpg'},
    {'name': 'image/Dancing 4.jpg', 'path': 'image/Dancing 4.jpg'},
    {'name': 'image/Dancing 5.jpg', 'path': 'image/Dancing 5.jpg'},
    {'name': 'image/Dancing 6.jpg', 'path': 'image/Dancing 6.jpg'},
    {'name': 'image/Dancing 7.jpg', 'path': 'image/Dancing 7.jpg'},
    {'name': 'image/Dancing 8.jpg', 'path': 'image/Dancing 8.jpg'},
    {'name': 'image/Dancing 9.jpg', 'path': 'image/Dancing 9.jpg'},
    {'name': 'image/Dead bodies 1.jpg', 'path': 'image/Dead bodies 1.jpg'},
    {'name': 'image/Dead bodies 2.jpg', 'path': 'image/Dead bodies 2.jpg'},
    {'name': 'image/Dead bodies 3.jpg', 'path': 'image/Dead bodies 3.jpg'},
    {'name': 'image/Depressed face 1.jpg', 'path': 'image/Depressed face 1.jpg'},
    {'name': 'image/Depressed face 2.jpg', 'path': 'image/Depressed face 2.jpg'},
    {'name': 'image/Depressed pose 1.jpg', 'path': 'image/Depressed pose 1.jpg'},
    {'name': 'image/Depressed pose 2.jpg', 'path': 'image/Depressed pose 2.jpg'},
    {'name': 'image/Depressed pose 3.jpg', 'path': 'image/Depressed pose 3.jpg'},
    {'name': 'image/Depressed pose 4.jpg', 'path': 'image/Depressed pose 4.jpg'},
    {'name': 'image/Desert 1.jpg', 'path': 'image/Desert 1.jpg'},
    {'name': 'image/Dessert 1.jpg', 'path': 'image/Dessert 1.jpg'},
    {'name': 'image/Dessert 2.jpg', 'path': 'image/Dessert 2.jpg'},
    {'name': 'image/Dessert 3.jpg', 'path': 'image/Dessert 3.jpg'},
    {'name': 'image/Dessert 4.jpg', 'path': 'image/Dessert 4.jpg'},
    {'name': 'image/Dessert 5.jpg', 'path': 'image/Dessert 5.jpg'},
    {'name': 'image/Dessert 6.jpg', 'path': 'image/Dessert 6.jpg'},
    {'name': 'image/Dessert 7.jpg', 'path': 'image/Dessert 7.jpg'},
    {'name': 'image/Dessert 8.jpg', 'path': 'image/Dessert 8.jpg'},
    {'name': 'image/Destruction 1.jpg', 'path': 'image/Destruction 1.jpg'},
    {'name': 'image/Destruction 2.jpg', 'path': 'image/Destruction 2.jpg'},
    {'name': 'image/Destruction 3.jpg', 'path': 'image/Destruction 3.jpg'},
    {'name': 'image/Destruction 4.jpg', 'path': 'image/Destruction 4.jpg'},
    {'name': 'image/Destruction 5.jpg', 'path': 'image/Destruction 5.jpg'},
    {'name': 'image/Destruction 6.jpg', 'path': 'image/Destruction 6.jpg'},
    {'name': 'image/Destruction 7.jpg', 'path': 'image/Destruction 7.jpg'},
    {'name': 'image/Destruction 8.jpg', 'path': 'image/Destruction 8.jpg'},
    {'name': 'image/Destruction 9.jpg', 'path': 'image/Destruction 9.jpg'},
    {'name': 'image/Destruction 10.jpg', 'path': 'image/Destruction 10.jpg'},
    {'name': 'image/Dirt 1.jpg', 'path': 'image/Dirt 1.jpg'},
    {'name': 'image/Dirt 2.jpg', 'path': 'image/Dirt 2.jpg'},
    {'name': 'image/Dirt 3.jpg', 'path': 'image/Dirt 3.jpg'},
    {'name': 'image/Dirt 4.jpg', 'path': 'image/Dirt 4.jpg'},
    {'name': 'image/Dirt 5.jpg', 'path': 'image/Dirt 5.jpg'},
    {'name': 'image/Dock 1.jpg', 'path': 'image/Dock 1.jpg'},
    {'name': 'image/Doctor 1.jpg', 'path': 'image/Doctor 1.jpg'},
    {'name': 'image/Doctor 2.jpg', 'path': 'image/Doctor 2.jpg'},
    {'name': 'image/Doctor 3.jpg', 'path': 'image/Doctor 3.jpg'},
    {'name': 'image/Doctor 4.jpg', 'path': 'image/Doctor 4.jpg'},
    {'name': 'image/Doctor 5.jpg', 'path': 'image/Doctor 5.jpg'},
    {'name': 'image/Doctor 6.jpg', 'path': 'image/Doctor 6.jpg'},
    {'name': 'image/Doctor 7.jpg', 'path': 'image/Doctor 7.jpg'},
    {'name': 'image/Doctor 8.jpg', 'path': 'image/Doctor 8.jpg'},
    {'name': 'image/Doctor 9.jpg', 'path': 'image/Doctor 9.jpg'},
    {'name': 'image/Dog 1.jpg', 'path': 'image/Dog 1.jpg'},
    {'name': 'image/Dog 2.jpg', 'path': 'image/Dog 2.jpg'},
    {'name': 'image/Dog 3.jpg', 'path': 'image/Dog 3.jpg'},
    {'name': 'image/Dog 4.jpg', 'path': 'image/Dog 4.jpg'},
    {'name': 'image/Dog 5.jpg', 'path': 'image/Dog 5.jpg'},
    {'name': 'image/Dog 6.jpg', 'path': 'image/Dog 6.jpg'},
    {'name': 'image/Dog 7.jpg', 'path': 'image/Dog 7.jpg'},
    {'name': 'image/Dog 8.jpg', 'path': 'image/Dog 8.jpg'},
    {'name': 'image/Dog 9.jpg', 'path': 'image/Dog 9.jpg'},
    {'name': 'image/Dog 10.jpg', 'path': 'image/Dog 10.jpg'},
    {'name': 'image/Dog 11.jpg', 'path': 'image/Dog 11.jpg'},
    {'name': 'image/Dog 12.jpg', 'path': 'image/Dog 12.jpg'},
    {'name': 'image/Dog 13.jpg', 'path': 'image/Dog 13.jpg'},
    {'name': 'image/Dog 14.jpg', 'path': 'image/Dog 14.jpg'},
    {'name': 'image/Dog 15.jpg', 'path': 'image/Dog 15.jpg'},
    {'name': 'image/Dog 16.jpg', 'path': 'image/Dog 16.jpg'},
    {'name': 'image/Dog 17.jpg', 'path': 'image/Dog 17.jpg'},
    {'name': 'image/Dog 18.jpg', 'path': 'image/Dog 18.jpg'},
    {'name': 'image/Dog 19.jpg', 'path': 'image/Dog 19.jpg'},
    {'name': 'image/Dog 20.jpg', 'path': 'image/Dog 20.jpg'},
    {'name': 'image/Dog 21.jpg', 'path': 'image/Dog 21.jpg'},
    {'name': 'image/Dog 22.jpg', 'path': 'image/Dog 22.jpg'},
    {'name': 'image/Dog 23.jpg', 'path': 'image/Dog 23.jpg'},
    {'name': 'image/Dog 24.jpg', 'path': 'image/Dog 24.jpg'},
    {'name': 'image/Dog 25.jpg', 'path': 'image/Dog 25.jpg'},
    {'name': 'image/Dog 26.jpg', 'path': 'image/Dog 26.jpg'},
    {'name': 'image/Dog 27.jpg', 'path': 'image/Dog 27.jpg'},
    {'name': 'image/Dog 28.jpg', 'path': 'image/Dog 28.jpg'},
    {'name': 'image/Dog 29.jpg', 'path': 'image/Dog 29.jpg'},
    {'name': 'image/Dog 30.jpg', 'path': 'image/Dog 30.jpg'},
    {'name': 'image/Dog 31.jpg', 'path': 'image/Dog 31.jpg'},
    {'name': 'image/Dog attack 1.jpg', 'path': 'image/Dog attack 1.jpg'},
    {'name': 'image/Dog attack 2.jpg', 'path': 'image/Dog attack 2.jpg'},
    {'name': 'image/Dog attack 3.jpg', 'path': 'image/Dog attack 3.jpg'},
    {'name': 'image/Drink 1.jpg', 'path': 'image/Drink 1.jpg'},
    {'name': 'image/Drink 2.jpg', 'path': 'image/Drink 2.jpg'},
    {'name': 'image/Dummy 1.jpg', 'path': 'image/Dummy 1.jpg'},
    {'name': 'image/Eating 1.jpg', 'path': 'image/Eating 1.jpg'},
    {'name': 'image/Eating 2.jpg', 'path': 'image/Eating 2.jpg'},
    {'name': 'image/Eating 3.jpg', 'path': 'image/Eating 3.jpg'},
    {'name': 'image/Elephant 1.jpg', 'path': 'image/Elephant 1.jpg'},
    {'name': 'image/Excited face 1.jpg', 'path': 'image/Excited face 1.jpg'},
    {'name': 'image/Excited face 2.jpg', 'path': 'image/Excited face 2.jpg'},
    {'name': 'image/Excited face 3.jpg', 'path': 'image/Excited face 3.jpg'},
    {'name': 'image/Excited face 4.jpg', 'path': 'image/Excited face 4.jpg'},
    {'name': 'image/Excited face 5.jpg', 'path': 'image/Excited face 5.jpg'},
    {'name': 'image/Excited face 6.jpg', 'path': 'image/Excited face 6.jpg'},
    {'name': 'image/Excited face 7.jpg', 'path': 'image/Excited face 7.jpg'},
    {'name': 'image/Exercise 1.jpg', 'path': 'image/Exercise 1.jpg'},
    {'name': 'image/Exercise 2.jpg', 'path': 'image/Exercise 2.jpg'},
    {'name': 'image/Exercise 3.jpg', 'path': 'image/Exercise 3.jpg'},
    {'name': 'image/Explosion 1.jpg', 'path': 'image/Explosion 1.jpg'},
    {'name': 'image/Explosion 2.jpg', 'path': 'image/Explosion 2.jpg'},
    {'name': 'image/Explosion 3.jpg', 'path': 'image/Explosion 3.jpg'},
    {'name': 'image/Explosion 4.jpg', 'path': 'image/Explosion 4.jpg'},
    {'name': 'image/Explosion 5.jpg', 'path': 'image/Explosion 5.jpg'},
    {'name': 'image/Explosion 6.jpg', 'path': 'image/Explosion 6.jpg'},
    {'name': 'image/Father 1.jpg', 'path': 'image/Father 1.jpg'},
    {'name': 'image/Feces 1.jpg', 'path': 'image/Feces 1.jpg'},
    {'name': 'image/Feces 2.jpg', 'path': 'image/Feces 2.jpg'},
    {'name': 'image/Fence 1.jpg', 'path': 'image/Fence 1.jpg'},
    {'name': 'image/Fence 2.jpg', 'path': 'image/Fence 2.jpg'},
    {'name': 'image/Fence 3.jpg', 'path': 'image/Fence 3.jpg'},
    {'name': 'image/Fence 4.jpg', 'path': 'image/Fence 4.jpg'},
    {'name': 'image/Fence 5.jpg', 'path': 'image/Fence 5.jpg'},
    {'name': 'image/Fence 6.jpg', 'path': 'image/Fence 6.jpg'},
    {'name': 'image/Ferret 1.jpg', 'path': 'image/Ferret 1.jpg'},
    {'name': 'image/Fire 1.jpg', 'path': 'image/Fire 1.jpg'},
    {'name': 'image/Fire 2.jpg', 'path': 'image/Fire 2.jpg'},
    {'name': 'image/Fire 3.jpg', 'path': 'image/Fire 3.jpg'},
    {'name': 'image/Fire 4.jpg', 'path': 'image/Fire 4.jpg'},
    {'name': 'image/Fire 5.jpg', 'path': 'image/Fire 5.jpg'},
    {'name': 'image/Fire 6.jpg', 'path': 'image/Fire 6.jpg'},
    {'name': 'image/Fire 7.jpg', 'path': 'image/Fire 7.jpg'},
    {'name': 'image/Fire 8.jpg', 'path': 'image/Fire 8.jpg'},
    {'name': 'image/Fire 9.jpg', 'path': 'image/Fire 9.jpg'},
    {'name': 'image/Fire 10.jpg', 'path': 'image/Fire 10.jpg'},
    {'name': 'image/Fire 11.jpg', 'path': 'image/Fire 11.jpg'},
    {'name': 'image/Fire hydrant 1.jpg', 'path': 'image/Fire hydrant 1.jpg'},
    {'name': 'image/Fire hydrant 2.jpg', 'path': 'image/Fire hydrant 2.jpg'},
    {'name': 'image/Fire hydrant 3.jpg', 'path': 'image/Fire hydrant 3.jpg'},
    {'name': 'image/Fire hydrant 4.jpg', 'path': 'image/Fire hydrant 4.jpg'},
    {'name': 'image/Fireman 1.jpg', 'path': 'image/Fireman 1.jpg'},
    {'name': 'image/Fireworks 1.jpg', 'path': 'image/Fireworks 1.jpg'},
    {'name': 'image/Fireworks 2.jpg', 'path': 'image/Fireworks 2.jpg'},
    {'name': 'image/Fireworks 3.jpg', 'path': 'image/Fireworks 3.jpg'},
    {'name': 'image/Fireworks 4.jpg', 'path': 'image/Fireworks 4.jpg'},
    {'name': 'image/Fireworks 5.jpg', 'path': 'image/Fireworks 5.jpg'},
    {'name': 'image/Fireworks 6.jpg', 'path': 'image/Fireworks 6.jpg'},
    {'name': 'image/Fireworks 7.jpg', 'path': 'image/Fireworks 7.jpg'},
    {'name': 'image/Flood 1.jpg', 'path': 'image/Flood 1.jpg'},
    {'name': 'image/Flood 2.jpg', 'path': 'image/Flood 2.jpg'},
    {'name': 'image/Flood 3.jpg', 'path': 'image/Flood 3.jpg'},
    {'name': 'image/Flowers 1.jpg', 'path': 'image/Flowers 1.jpg'},
    {'name': 'image/Flowers 2.jpg', 'path': 'image/Flowers 2.jpg'},
    {'name': 'image/Flowers 3.jpg', 'path': 'image/Flowers 3.jpg'},
    {'name': 'image/Flowers 4.jpg', 'path': 'image/Flowers 4.jpg'},
    {'name': 'image/Flowers 5.jpg', 'path': 'image/Flowers 5.jpg'},
    {'name': 'image/Flowers 6.jpg', 'path': 'image/Flowers 6.jpg'},
    {'name': 'image/Flowers 7.jpg', 'path': 'image/Flowers 7.jpg'},
    {'name': 'image/Flowers 8.jpg', 'path': 'image/Flowers 8.jpg'},
    {'name': 'image/Flowers 9.jpg', 'path': 'image/Flowers 9.jpg'},
    {'name': 'image/Flowers 10.jpg', 'path': 'image/Flowers 10.jpg'},
    {'name': 'image/Food 1.jpg', 'path': 'image/Food 1.jpg'},
    {'name': 'image/Food 2.jpg', 'path': 'image/Food 2.jpg'},
    {'name': 'image/Food 3.jpg', 'path': 'image/Food 3.jpg'},
    {'name': 'image/Food 4.jpg', 'path': 'image/Food 4.jpg'},
    {'name': 'image/Food 5.jpg', 'path': 'image/Food 5.jpg'},
    {'name': 'image/Food 6.jpg', 'path': 'image/Food 6.jpg'},
    {'name': 'image/Football player 1.jpg', 'path': 'image/Football player 1.jpg'},
    {'name': 'image/Frisbee 1.jpg', 'path': 'image/Frisbee 1.jpg'},
    {'name': 'image/Frustrated pose 1.jpg', 'path': 'image/Frustrated pose 1.jpg'},
    {'name': 'image/Frustrated pose 2.jpg', 'path': 'image/Frustrated pose 2.jpg'},
    {'name': 'image/Frustrated pose 3.jpg', 'path': 'image/Frustrated pose 3.jpg'},
    {'name': 'image/Frustrated pose 4.jpg', 'path': 'image/Frustrated pose 4.jpg'},
    {'name': 'image/Frustrated pose 5.jpg', 'path': 'image/Frustrated pose 5.jpg'},
    {'name': 'image/Frustrated pose 6.jpg', 'path': 'image/Frustrated pose 6.jpg'},
    {'name': 'image/Frustrated pose 7.jpg', 'path': 'image/Frustrated pose 7.jpg'},
    {'name': 'image/Frustrated pose 8.jpg', 'path': 'image/Frustrated pose 8.jpg'},
    {'name': 'image/Funeral 1.jpg', 'path': 'image/Funeral 1.jpg'},
    {'name': 'image/Galaxy 1.jpg', 'path': 'image/Galaxy 1.jpg'},
    {'name': 'image/Galaxy 2.jpg', 'path': 'image/Galaxy 2.jpg'},
    {'name': 'image/Galaxy 3.jpg', 'path': 'image/Galaxy 3.jpg'},
    {'name': 'image/Galaxy 4.jpg', 'path': 'image/Galaxy 4.jpg'},
    {'name': 'image/Galaxy 5.jpg', 'path': 'image/Galaxy 5.jpg'},
    {'name': 'image/Galaxy 6.jpg', 'path': 'image/Galaxy 6.jpg'},
    {'name': 'image/Galaxy 7.jpg', 'path': 'image/Galaxy 7.jpg'},
    {'name': 'image/Galaxy 8.jpg', 'path': 'image/Galaxy 8.jpg'},
    {'name': 'image/Garbage dump 1.jpg', 'path': 'image/Garbage dump 1.jpg'},
    {'name': 'image/Garbage dump 2.jpg', 'path': 'image/Garbage dump 2.jpg'},
    {'name': 'image/Garbage dump 3.jpg', 'path': 'image/Garbage dump 3.jpg'},
    {'name': 'image/Garbage dump 4.jpg', 'path': 'image/Garbage dump 4.jpg'},
    {'name': 'image/Garbage dump 5.jpg', 'path': 'image/Garbage dump 5.jpg'},
    {'name': 'image/Garbage dump 6.jpg', 'path': 'image/Garbage dump 6.jpg'},
    {'name': 'image/Garbage dump 7.jpg', 'path': 'image/Garbage dump 7.jpg'},
    {'name': 'image/Garbage dump 8.jpg', 'path': 'image/Garbage dump 8.jpg'},
    {'name': 'image/Gargoyle 1.jpg', 'path': 'image/Gargoyle 1.jpg'},
    {'name': 'image/Gargoyle 2.jpg', 'path': 'image/Gargoyle 2.jpg'},
    {'name': 'image/Gazing 1.jpg', 'path': 'image/Gazing 1.jpg'},
    {'name': 'image/Gazing 2.jpg', 'path': 'image/Gazing 2.jpg'},
    {'name': 'image/Gazing 3.jpg', 'path': 'image/Gazing 3.jpg'},
    {'name': 'image/Gazing 4.jpg', 'path': 'image/Gazing 4.jpg'},
    {'name': 'image/Gazing 5.jpg', 'path': 'image/Gazing 5.jpg'},
    {'name': 'image/Gazing 6.jpg', 'path': 'image/Gazing 6.jpg'},
    {'name': 'image/Gazing 7.jpg', 'path': 'image/Gazing 7.jpg'},
    {'name': 'image/Goat 1.jpg', 'path': 'image/Goat 1.jpg'},
    {'name': 'image/Goat 2.jpg', 'path': 'image/Goat 2.jpg'},
    {'name': 'image/Gorrila 1.jpg', 'path': 'image/Gorrila 1.jpg'},
    {'name': 'image/Grass 1.jpg', 'path': 'image/Grass 1.jpg'},
    {'name': 'image/Grass 2.jpg', 'path': 'image/Grass 2.jpg'},
    {'name': 'image/Grass 3.jpg', 'path': 'image/Grass 3.jpg'},
    {'name': 'image/Grass 4.jpg', 'path': 'image/Grass 4.jpg'},
    {'name': 'image/Grass 5.jpg', 'path': 'image/Grass 5.jpg'},
    {'name': 'image/Grass 6.jpg', 'path': 'image/Grass 6.jpg'},
    {'name': 'image/Grass 7.jpg', 'path': 'image/Grass 7.jpg'},
    {'name': 'image/Graveyard 1.jpg', 'path': 'image/Graveyard 1.jpg'},
    {'name': 'image/Graveyard 2.jpg', 'path': 'image/Graveyard 2.jpg'},
    {'name': 'image/Graveyard 3.jpg', 'path': 'image/Graveyard 3.jpg'},
    {'name': 'image/Graveyard 4.jpg', 'path': 'image/Graveyard 4.jpg'},
    {'name': 'image/Guitar 1.jpg', 'path': 'image/Guitar 1.jpg'},
    {'name': 'image/Gun 1.jpg', 'path': 'image/Gun 1.jpg'},
    {'name': 'image/Gun 2.jpg', 'path': 'image/Gun 2.jpg'},
    {'name': 'image/Gun 3.jpg', 'path': 'image/Gun 3.jpg'},
    {'name': 'image/Gun 4.jpg', 'path': 'image/Gun 4.jpg'},
    {'name': 'image/Gun 5.jpg', 'path': 'image/Gun 5.jpg'},
    {'name': 'image/Gun 6.jpg', 'path': 'image/Gun 6.jpg'},
    {'name': 'image/Gun 7.jpg', 'path': 'image/Gun 7.jpg'},
    {'name': 'image/Gun 8.jpg', 'path': 'image/Gun 8.jpg'},
    {'name': 'image/Gun 9.jpg', 'path': 'image/Gun 9.jpg'},
    {'name': 'image/Gun 10.jpg', 'path': 'image/Gun 10.jpg'},
    {'name': 'image/Hallway 1.jpg', 'path': 'image/Hallway 1.jpg'},
    {'name': 'image/Hang gliding 1.jpg', 'path': 'image/Hang gliding 1.jpg'},
    {'name': 'image/Hang gliding 2.jpg', 'path': 'image/Hang gliding 2.jpg'},
    {'name': 'image/Hang gliding 3.jpg', 'path': 'image/Hang gliding 3.jpg'},
    {'name': 'image/Hangover 1.jpg', 'path': 'image/Hangover 1.jpg'},
    {'name': 'image/Happy face 1.jpg', 'path': 'image/Happy face 1.jpg'},
    {'name': 'image/Happy face 2.jpg', 'path': 'image/Happy face 2.jpg'},
    {'name': 'image/Happy pose 1.jpg', 'path': 'image/Happy pose 1.jpg'},
    {'name': 'image/Happy pose 2.jpg', 'path': 'image/Happy pose 2.jpg'},
    {'name': 'image/Happy pose 3.jpg', 'path': 'image/Happy pose 3.jpg'},
    {'name': 'image/Heart 1.jpg', 'path': 'image/Heart 1.jpg'},
    {'name': 'image/Heart 2.jpg', 'path': 'image/Heart 2.jpg'},
    {'name': 'image/Heart 3.jpg', 'path': 'image/Heart 3.jpg'},
    {'name': 'image/Horse 1.jpg', 'path': 'image/Horse 1.jpg'},
    {'name': 'image/Horse racing 1.jpg', 'path': 'image/Horse racing 1.jpg'},
    {'name': 'image/House 1.jpg', 'path': 'image/House 1.jpg'},
    {'name': 'image/Injury 1.jpg', 'path': 'image/Injury 1.jpg'},
    {'name': 'image/Injury 2.jpg', 'path': 'image/Injury 2.jpg'},
    {'name': 'image/Injury 3.jpg', 'path': 'image/Injury 3.jpg'},
    {'name': 'image/Injury 4.jpg', 'path': 'image/Injury 4.jpg'},
    {'name': 'image/Intensity 1.jpg', 'path': 'image/Intensity 1.jpg'},
    {'name': 'image/Jail 1.jpg', 'path': 'image/Jail 1.jpg'},
    {'name': 'image/Jail 2.jpg', 'path': 'image/Jail 2.jpg'},
    {'name': 'image/Jail 3.jpg', 'path': 'image/Jail 3.jpg'},
    {'name': 'image/Jail 4.jpg', 'path': 'image/Jail 4.jpg'},
    {'name': 'image/Jail 5.jpg', 'path': 'image/Jail 5.jpg'},
    {'name': 'image/Keyboard 1.jpg', 'path': 'image/Keyboard 1.jpg'},
    {'name': 'image/Keyboard 2.jpg', 'path': 'image/Keyboard 2.jpg'},
    {'name': 'image/Keyboard 3.jpg', 'path': 'image/Keyboard 3.jpg'},
    {'name': 'image/Keys 1.jpg', 'path': 'image/Keys 1.jpg'},
    {'name': 'image/KKK rally 1.jpg', 'path': 'image/KKK rally 1.jpg'},
    {'name': 'image/KKK rally 2.jpg', 'path': 'image/KKK rally 2.jpg'},
    {'name': 'image/Knife 1.jpg', 'path': 'image/Knife 1.jpg'},
    {'name': 'image/Knife 2.jpg', 'path': 'image/Knife 2.jpg'},
    {'name': 'image/Lake 1.jpg', 'path': 'image/Lake 1.jpg'},
    {'name': 'image/Lake 2.jpg', 'path': 'image/Lake 2.jpg'},
    {'name': 'image/Lake 3.jpg', 'path': 'image/Lake 3.jpg'},
    {'name': 'image/Lake 4.jpg', 'path': 'image/Lake 4.jpg'},
    {'name': 'image/Lake 5.jpg', 'path': 'image/Lake 5.jpg'},
    {'name': 'image/Lake 6.jpg', 'path': 'image/Lake 6.jpg'},
    {'name': 'image/Lake 7.jpg', 'path': 'image/Lake 7.jpg'},
    {'name': 'image/Lake 8.jpg', 'path': 'image/Lake 8.jpg'},
    {'name': 'image/Lake 9.jpg', 'path': 'image/Lake 9.jpg'},
    {'name': 'image/Lake 10.jpg', 'path': 'image/Lake 10.jpg'},
    {'name': 'image/Lake 11.jpg', 'path': 'image/Lake 11.jpg'},
    {'name': 'image/Lake 12.jpg', 'path': 'image/Lake 12.jpg'},
    {'name': 'image/Lake 13.jpg', 'path': 'image/Lake 13.jpg'},
    {'name': 'image/Lake 14.jpg', 'path': 'image/Lake 14.jpg'},
    {'name': 'image/Lake 15.jpg', 'path': 'image/Lake 15.jpg'},
    {'name': 'image/Lake 16.jpg', 'path': 'image/Lake 16.jpg'},
    {'name': 'image/Lake 17.jpg', 'path': 'image/Lake 17.jpg'},
    {'name': 'image/Lamb 1.jpg', 'path': 'image/Lamb 1.jpg'},
    {'name': 'image/Lava 1.jpg', 'path': 'image/Lava 1.jpg'},
    {'name': 'image/Lightning 1.jpg', 'path': 'image/Lightning 1.jpg'},
    {'name': 'image/Lightning 2.jpg', 'path': 'image/Lightning 2.jpg'},
    {'name': 'image/Lightning 3.jpg', 'path': 'image/Lightning 3.jpg'},
    {'name': 'image/Lightning 4.jpg', 'path': 'image/Lightning 4.jpg'},
    {'name': 'image/Lightning 5.jpg', 'path': 'image/Lightning 5.jpg'},
    {'name': 'image/Lightning 6.jpg', 'path': 'image/Lightning 6.jpg'},
    {'name': 'image/Lightning 7.jpg', 'path': 'image/Lightning 7.jpg'},
    {'name': 'image/Lion 1.jpg', 'path': 'image/Lion 1.jpg'},
    {'name': 'image/Lion 2.jpg', 'path': 'image/Lion 2.jpg'},
    {'name': 'image/Lion 3.jpg', 'path': 'image/Lion 3.jpg'},
    {'name': 'image/Lion 4.jpg', 'path': 'image/Lion 4.jpg'},
    {'name': 'image/Lion 5.jpg', 'path': 'image/Lion 5.jpg'},
    {'name': 'image/Massage 1.jpg', 'path': 'image/Massage 1.jpg'},
    {'name': 'image/Massage 2.jpg', 'path': 'image/Massage 2.jpg'},
    {'name': 'image/Meerkat 1.jpg', 'path': 'image/Meerkat 1.jpg'},
    {'name': 'image/Memorial 1.jpg', 'path': 'image/Memorial 1.jpg'},
    {'name': 'image/Memorial 2.jpg', 'path': 'image/Memorial 2.jpg'},
    {'name': 'image/Memorial 3.jpg', 'path': 'image/Memorial 3.jpg'},
    {'name': 'image/Miserable face 1.jpg', 'path': 'image/Miserable face 1.jpg'},
    {'name': 'image/Miserable face 2.jpg', 'path': 'image/Miserable face 2.jpg'},
    {'name': 'image/Miserable pose 1.jpg', 'path': 'image/Miserable pose 1.jpg'},
    {'name': 'image/Miserable pose 2.jpg', 'path': 'image/Miserable pose 2.jpg'},
    {'name': 'image/Miserable pose 3.jpg', 'path': 'image/Miserable pose 3.jpg'},
    {'name': 'image/Miserable pose 4.jpg', 'path': 'image/Miserable pose 4.jpg'},
    {'name': 'image/Miserable pose 5.jpg', 'path': 'image/Miserable pose 5.jpg'},
    {'name': 'image/Money 1.jpg', 'path': 'image/Money 1.jpg'},
    {'name': 'image/Monkey 1.jpg', 'path': 'image/Monkey 1.jpg'},
    {'name': 'image/Monkey 2.jpg', 'path': 'image/Monkey 2.jpg'},
    {'name': 'image/Monkey 3.jpg', 'path': 'image/Monkey 3.jpg'},
    {'name': 'image/Monkey 4.jpg', 'path': 'image/Monkey 4.jpg'},
    {'name': 'image/Moon 1.jpg', 'path': 'image/Moon 1.jpg'},
    {'name': 'image/Mother 1.jpg', 'path': 'image/Mother 1.jpg'},
    {'name': 'image/Mother 2.jpg', 'path': 'image/Mother 2.jpg'},
    {'name': 'image/Mother 3.jpg', 'path': 'image/Mother 3.jpg'},
    {'name': 'image/Mother 4.jpg', 'path': 'image/Mother 4.jpg'},
    {'name': 'image/Mother 5.jpg', 'path': 'image/Mother 5.jpg'},
    {'name': 'image/Mother 6.jpg', 'path': 'image/Mother 6.jpg'},
    {'name': 'image/Mother 7.jpg', 'path': 'image/Mother 7.jpg'},
    {'name': 'image/Mother 8.jpg', 'path': 'image/Mother 8.jpg'},
    {'name': 'image/Mother 9.jpg', 'path': 'image/Mother 9.jpg'},
    {'name': 'image/Motocross 1.jpg', 'path': 'image/Motocross 1.jpg'},
    {'name': 'image/Musician 1.jpg', 'path': 'image/Musician 1.jpg'},
    {'name': 'image/Nature 1.jpg', 'path': 'image/Nature 1.jpg'},
    {'name': 'image/Nature 2.jpg', 'path': 'image/Nature 2.jpg'},
    {'name': 'image/Neonazi 1.jpg', 'path': 'image/Neonazi 1.jpg'},
    {'name': 'image/Neutral face 1.jpg', 'path': 'image/Neutral face 1.jpg'},
    {'name': 'image/Neutral face 2.jpg', 'path': 'image/Neutral face 2.jpg'},
    {'name': 'image/Neutral face 3.jpg', 'path': 'image/Neutral face 3.jpg'},
    {'name': 'image/Neutral face 4.jpg', 'path': 'image/Neutral face 4.jpg'},
    {'name': 'image/Neutral face 5.jpg', 'path': 'image/Neutral face 5.jpg'},
    {'name': 'image/Neutral pose 1.jpg', 'path': 'image/Neutral pose 1.jpg'},
    {'name': 'image/Neutral pose 2.jpg', 'path': 'image/Neutral pose 2.jpg'},
    {'name': 'image/Neutral pose 3.jpg', 'path': 'image/Neutral pose 3.jpg'},
    {'name': 'image/Nude couple 1.jpg', 'path': 'image/Nude couple 1.jpg'},
    {'name': 'image/Nude couple 2.jpg', 'path': 'image/Nude couple 2.jpg'},
    {'name': 'image/Nude couple 3.jpg', 'path': 'image/Nude couple 3.jpg'},
    {'name': 'image/Nude couple 4.jpg', 'path': 'image/Nude couple 4.jpg'},
    {'name': 'image/Nude couple 5.jpg', 'path': 'image/Nude couple 5.jpg'},
    {'name': 'image/Nude couple 6.jpg', 'path': 'image/Nude couple 6.jpg'},
    {'name': 'image/Nude couple 7.jpg', 'path': 'image/Nude couple 7.jpg'},
    {'name': 'image/Nude couple 8.jpg', 'path': 'image/Nude couple 8.jpg'},
    {'name': 'image/Nude couple 9.jpg', 'path': 'image/Nude couple 9.jpg'},
    {'name': 'image/Nude couple 10.jpg', 'path': 'image/Nude couple 10.jpg'},
    {'name': 'image/Nude couple 11.jpg', 'path': 'image/Nude couple 11.jpg'},
    {'name': 'image/Nude couple 12.jpg', 'path': 'image/Nude couple 12.jpg'},
    {'name': 'image/Nude couple 13.jpg', 'path': 'image/Nude couple 13.jpg'},
    {'name': 'image/Nude couple 14.jpg', 'path': 'image/Nude couple 14.jpg'},
    {'name': 'image/Nude man 1.jpg', 'path': 'image/Nude man 1.jpg'},
    {'name': 'image/Nude man 2.jpg', 'path': 'image/Nude man 2.jpg'},
    {'name': 'image/Nude man 3.jpg', 'path': 'image/Nude man 3.jpg'},
    {'name': 'image/Nude man 4.jpg', 'path': 'image/Nude man 4.jpg'},
    {'name': 'image/Nude man 5.jpg', 'path': 'image/Nude man 5.jpg'},
    {'name': 'image/Nude man 6.jpg', 'path': 'image/Nude man 6.jpg'},
    {'name': 'image/Nude man 7.jpg', 'path': 'image/Nude man 7.jpg'},
    {'name': 'image/Nude man 8.jpg', 'path': 'image/Nude man 8.jpg'},
    {'name': 'image/Nude man 9.jpg', 'path': 'image/Nude man 9.jpg'},
    {'name': 'image/Nude man 10.jpg', 'path': 'image/Nude man 10.jpg'},
    {'name': 'image/Nude man 11.jpg', 'path': 'image/Nude man 11.jpg'},
    {'name': 'image/Nude man 12.jpg', 'path': 'image/Nude man 12.jpg'},
    {'name': 'image/Nude man 13.jpg', 'path': 'image/Nude man 13.jpg'},
    {'name': 'image/Nude man 14.jpg', 'path': 'image/Nude man 14.jpg'},
    {'name': 'image/Nude man 15.jpg', 'path': 'image/Nude man 15.jpg'},
    {'name': 'image/Nude man 16.jpg', 'path': 'image/Nude man 16.jpg'},
    {'name': 'image/Nude man 17.jpg', 'path': 'image/Nude man 17.jpg'},
    {'name': 'image/Nude man 18.jpg', 'path': 'image/Nude man 18.jpg'},
    {'name': 'image/Nude man 19.jpg', 'path': 'image/Nude man 19.jpg'},
    {'name': 'image/Nude man 20.jpg', 'path': 'image/Nude man 20.jpg'},
    {'name': 'image/Nude man 21.jpg', 'path': 'image/Nude man 21.jpg'},
    {'name': 'image/Nude man 22.jpg', 'path': 'image/Nude man 22.jpg'},
    {'name': 'image/Nude man 23.jpg', 'path': 'image/Nude man 23.jpg'},
    {'name': 'image/Nude woman 1.jpg', 'path': 'image/Nude woman 1.jpg'},
    {'name': 'image/Nude woman 2.jpg', 'path': 'image/Nude woman 2.jpg'},
    {'name': 'image/Nude woman 3.jpg', 'path': 'image/Nude woman 3.jpg'},
    {'name': 'image/Nude woman 4.jpg', 'path': 'image/Nude woman 4.jpg'},
    {'name': 'image/Nude woman 5.jpg', 'path': 'image/Nude woman 5.jpg'},
    {'name': 'image/Nude woman 6.jpg', 'path': 'image/Nude woman 6.jpg'},
    {'name': 'image/Nude woman 7.jpg', 'path': 'image/Nude woman 7.jpg'},
    {'name': 'image/Nude woman 8.jpg', 'path': 'image/Nude woman 8.jpg'},
    {'name': 'image/Nude woman 9.jpg', 'path': 'image/Nude woman 9.jpg'},
    {'name': 'image/Nude woman 10.jpg', 'path': 'image/Nude woman 10.jpg'},
    {'name': 'image/Nude woman 11.jpg', 'path': 'image/Nude woman 11.jpg'},
    {'name': 'image/Nude woman 12.jpg', 'path': 'image/Nude woman 12.jpg'},
    {'name': 'image/Nude woman 13.jpg', 'path': 'image/Nude woman 13.jpg'},
    {'name': 'image/Nude woman 14.jpg', 'path': 'image/Nude woman 14.jpg'},
    {'name': 'image/Nude woman 15.jpg', 'path': 'image/Nude woman 15.jpg'},
    {'name': 'image/Nude woman 16.jpg', 'path': 'image/Nude woman 16.jpg'},
    {'name': 'image/Nude woman 17.jpg', 'path': 'image/Nude woman 17.jpg'},
    {'name': 'image/Nude woman 18.jpg', 'path': 'image/Nude woman 18.jpg'},
    {'name': 'image/Nude woman 19.jpg', 'path': 'image/Nude woman 19.jpg'},
    {'name': 'image/Nude woman 20.jpg', 'path': 'image/Nude woman 20.jpg'},
    {'name': 'image/Nude woman 21.jpg', 'path': 'image/Nude woman 21.jpg'},
    {'name': 'image/Nude woman 22.jpg', 'path': 'image/Nude woman 22.jpg'},
    {'name': 'image/Office supplies 1.jpg', 'path': 'image/Office supplies 1.jpg'},
    {'name': 'image/Office supplies 2.jpg', 'path': 'image/Office supplies 2.jpg'},
    {'name': 'image/Office supplies 3.jpg', 'path': 'image/Office supplies 3.jpg'},
    {'name': 'image/Office supplies 4.jpg', 'path': 'image/Office supplies 4.jpg'},
    {'name': 'image/Office supplies 5.jpg', 'path': 'image/Office supplies 5.jpg'},
    {'name': 'image/Opossum 1.jpg', 'path': 'image/Opossum 1.jpg'},
    {'name': 'image/Orangutan 1.jpg', 'path': 'image/Orangutan 1.jpg'},
    {'name': 'image/Ornament 1.jpg', 'path': 'image/Ornament 1.jpg'},
    {'name': 'image/Paintbrush 1.jpg', 'path': 'image/Paintbrush 1.jpg'},
    {'name': 'image/Paper 1.jpg', 'path': 'image/Paper 1.jpg'},
    {'name': 'image/Paper 2.jpg', 'path': 'image/Paper 2.jpg'},
    {'name': 'image/Paper 3.jpg', 'path': 'image/Paper 3.jpg'},
    {'name': 'image/Paper 4.jpg', 'path': 'image/Paper 4.jpg'},
    {'name': 'image/Paper 5.jpg', 'path': 'image/Paper 5.jpg'},
    {'name': 'image/Paperclips 1.jpg', 'path': 'image/Paperclips 1.jpg'},
    {'name': 'image/Paperclips 2.jpg', 'path': 'image/Paperclips 2.jpg'},
    {'name': 'image/Paperclips 3.jpg', 'path': 'image/Paperclips 3.jpg'},
    {'name': 'image/Paperclips 4.jpg', 'path': 'image/Paperclips 4.jpg'},
    {'name': 'image/Parachuting 1.jpg', 'path': 'image/Parachuting 1.jpg'},
    {'name': 'image/Parachuting 2.jpg', 'path': 'image/Parachuting 2.jpg'},
    {'name': 'image/Parachuting 3.jpg', 'path': 'image/Parachuting 3.jpg'},
    {'name': 'image/Parachuting 4.jpg', 'path': 'image/Parachuting 4.jpg'},
    {'name': 'image/Parade 1.jpg', 'path': 'image/Parade 1.jpg'},
    {'name': 'image/Parasailing 1.jpg', 'path': 'image/Parasailing 1.jpg'},
    {'name': 'image/Parasailing 2.jpg', 'path': 'image/Parasailing 2.jpg'},
    {'name': 'image/Parasailing 3.jpg', 'path': 'image/Parasailing 3.jpg'},
    {'name': 'image/Parasailing 4.jpg', 'path': 'image/Parasailing 4.jpg'},
    {'name': 'image/Party 1.jpg', 'path': 'image/Party 1.jpg'},
    {'name': 'image/Path 1.jpg', 'path': 'image/Path 1.jpg'},
    {'name': 'image/Penguins 1.jpg', 'path': 'image/Penguins 1.jpg'},
    {'name': 'image/Penguins 2.jpg', 'path': 'image/Penguins 2.jpg'},
    {'name': 'image/Performance 1.jpg', 'path': 'image/Performance 1.jpg'},
    {'name': 'image/Performance 2.jpg', 'path': 'image/Performance 2.jpg'},
    {'name': 'image/Phone 1.jpg', 'path': 'image/Phone 1.jpg'},
    {'name': 'image/Picnic 1.jpg', 'path': 'image/Picnic 1.jpg'},
    {'name': 'image/Picnic 2.jpg', 'path': 'image/Picnic 2.jpg'},
    {'name': 'image/Picnic 3.jpg', 'path': 'image/Picnic 3.jpg'},
    {'name': 'image/Picnic 4.jpg', 'path': 'image/Picnic 4.jpg'},
    {'name': 'image/Pig 1.jpg', 'path': 'image/Pig 1.jpg'},
    {'name': 'image/Pig 2.jpg', 'path': 'image/Pig 2.jpg'},
    {'name': 'image/Pigeon 1.jpg', 'path': 'image/Pigeon 1.jpg'},
    {'name': 'image/Pigeon 2.jpg', 'path': 'image/Pigeon 2.jpg'},
    {'name': 'image/Pigeon 3.jpg', 'path': 'image/Pigeon 3.jpg'},
    {'name': 'image/Pigeon 4.jpg', 'path': 'image/Pigeon 4.jpg'},
    {'name': 'image/Pigeon 5.jpg', 'path': 'image/Pigeon 5.jpg'},
    {'name': 'image/Pigeon 6.jpg', 'path': 'image/Pigeon 6.jpg'},
    {'name': 'image/Pinecone 1.jpg', 'path': 'image/Pinecone 1.jpg'},
    {'name': 'image/Pinecone 2.jpg', 'path': 'image/Pinecone 2.jpg'},
    {'name': 'image/Pinecone 3.jpg', 'path': 'image/Pinecone 3.jpg'},
    {'name': 'image/Pinecone 4.jpg', 'path': 'image/Pinecone 4.jpg'},
    {'name': 'image/Plane crash 1.jpg', 'path': 'image/Plane crash 1.jpg'},
    {'name': 'image/Plane crash 2.jpg', 'path': 'image/Plane crash 2.jpg'},
    {'name': 'image/Plane crash 3.jpg', 'path': 'image/Plane crash 3.jpg'},
    {'name': 'image/Plane crash 4.jpg', 'path': 'image/Plane crash 4.jpg'},
    {'name': 'image/Police 1.jpg', 'path': 'image/Police 1.jpg'},
    {'name': 'image/Police 2.jpg', 'path': 'image/Police 2.jpg'},
    {'name': 'image/Police 3.jpg', 'path': 'image/Police 3.jpg'},
    {'name': 'image/Police 4.jpg', 'path': 'image/Police 4.jpg'},
    {'name': 'image/Police 5.jpg', 'path': 'image/Police 5.jpg'},
    {'name': 'image/Pollution 1.jpg', 'path': 'image/Pollution 1.jpg'},
    {'name': 'image/Power lines 1.jpg', 'path': 'image/Power lines 1.jpg'},
    {'name': 'image/Present 1.jpg', 'path': 'image/Present 1.jpg'},
    {'name': 'image/Present 2.jpg', 'path': 'image/Present 2.jpg'},
    {'name': 'image/Prison 1.jpg', 'path': 'image/Prison 1.jpg'},
    {'name': 'image/Prison 2.jpg', 'path': 'image/Prison 2.jpg'},
    {'name': 'image/Pumpkin 1.jpg', 'path': 'image/Pumpkin 1.jpg'},
    {'name': 'image/Raccoon 1.jpg', 'path': 'image/Raccoon 1.jpg'},
    {'name': 'image/Rafting 1.jpg', 'path': 'image/Rafting 1.jpg'},
    {'name': 'image/Rafting 2.jpg', 'path': 'image/Rafting 2.jpg'},
    {'name': 'image/Rafting 3.jpg', 'path': 'image/Rafting 3.jpg'},
    {'name': 'image/Rafting 4.jpg', 'path': 'image/Rafting 4.jpg'},
    {'name': 'image/Rafting 5.jpg', 'path': 'image/Rafting 5.jpg'},
    {'name': 'image/Rafting 6.jpg', 'path': 'image/Rafting 6.jpg'},
    {'name': 'image/Railroad 1.jpg', 'path': 'image/Railroad 1.jpg'},
    {'name': 'image/Rainbow 1.jpg', 'path': 'image/Rainbow 1.jpg'},
    {'name': 'image/Rainbow 2.jpg', 'path': 'image/Rainbow 2.jpg'},
    {'name': 'image/Research 1.jpg', 'path': 'image/Research 1.jpg'},
    {'name': 'image/Road 1.jpg', 'path': 'image/Road 1.jpg'},
    {'name': 'image/Rock climbing 1.jpg', 'path': 'image/Rock climbing 1.jpg'},
    {'name': 'image/Rock climbing 2.jpg', 'path': 'image/Rock climbing 2.jpg'},
    {'name': 'image/Rock climbing 3.jpg', 'path': 'image/Rock climbing 3.jpg'},
    {'name': 'image/Rock climbing 4.jpg', 'path': 'image/Rock climbing 4.jpg'},
    {'name': 'image/Rocks 1.jpg', 'path': 'image/Rocks 1.jpg'},
    {'name': 'image/Rocks 2.jpg', 'path': 'image/Rocks 2.jpg'},
    {'name': 'image/Rocks 3.jpg', 'path': 'image/Rocks 3.jpg'},
    {'name': 'image/Rocks 4.jpg', 'path': 'image/Rocks 4.jpg'},
    {'name': 'image/Rocks 5.jpg', 'path': 'image/Rocks 5.jpg'},
    {'name': 'image/Rocks 6.jpg', 'path': 'image/Rocks 6.jpg'},
    {'name': 'image/Rocks 7.jpg', 'path': 'image/Rocks 7.jpg'},
    {'name': 'image/Rollercoaster 1.jpg', 'path': 'image/Rollercoaster 1.jpg'},
    {'name': 'image/Rollercoaster 2.jpg', 'path': 'image/Rollercoaster 2.jpg'},
    {'name': 'image/Rollercoaster 3.jpg', 'path': 'image/Rollercoaster 3.jpg'},
    {'name': 'image/Roofing 1.jpg', 'path': 'image/Roofing 1.jpg'},
    {'name': 'image/Roofing 2.jpg', 'path': 'image/Roofing 2.jpg'},
    {'name': 'image/Roofing 3.jpg', 'path': 'image/Roofing 3.jpg'},
    {'name': 'image/Roofing 4.jpg', 'path': 'image/Roofing 4.jpg'},
    {'name': 'image/Roofing 5.jpg', 'path': 'image/Roofing 5.jpg'},
    {'name': 'image/Rooster 1.jpg', 'path': 'image/Rooster 1.jpg'},
    {'name': 'image/Rubber duck 1.jpg', 'path': 'image/Rubber duck 1.jpg'},
    {'name': 'image/Rugby 1.jpg', 'path': 'image/Rugby 1.jpg'},
    {'name': 'image/Rugby 2.jpg', 'path': 'image/Rugby 2.jpg'},
    {'name': 'image/Running away 1.jpg', 'path': 'image/Running away 1.jpg'},
    {'name': 'image/Sad face 1.jpg', 'path': 'image/Sad face 1.jpg'},
    {'name': 'image/Sad face 2.jpg', 'path': 'image/Sad face 2.jpg'},
    {'name': 'image/Sad face 3.jpg', 'path': 'image/Sad face 3.jpg'},
    {'name': 'image/Sad face 4.jpg', 'path': 'image/Sad face 4.jpg'},
    {'name': 'image/Sad face 5.jpg', 'path': 'image/Sad face 5.jpg'},
    {'name': 'image/Sad face 6.jpg', 'path': 'image/Sad face 6.jpg'},
    {'name': 'image/Sad face 7.jpg', 'path': 'image/Sad face 7.jpg'},
    {'name': 'image/Sad face 8.jpg', 'path': 'image/Sad face 8.jpg'},
    {'name': 'image/Sad face 9.jpg', 'path': 'image/Sad face 9.jpg'},
    {'name': 'image/Sad pose 1.jpg', 'path': 'image/Sad pose 1.jpg'},
    {'name': 'image/Sad pose 2.jpg', 'path': 'image/Sad pose 2.jpg'},
    {'name': 'image/Sad pose 3.jpg', 'path': 'image/Sad pose 3.jpg'},
    {'name': 'image/Sad pose 4.jpg', 'path': 'image/Sad pose 4.jpg'},
    {'name': 'image/Sad pose 5.jpg', 'path': 'image/Sad pose 5.jpg'},
    {'name': 'image/Sad pose 6.jpg', 'path': 'image/Sad pose 6.jpg'},
    {'name': 'image/Sad pose 7.jpg', 'path': 'image/Sad pose 7.jpg'},
    {'name': 'image/Sailing 1.jpg', 'path': 'image/Sailing 1.jpg'},
    {'name': 'image/Sailing 2.jpg', 'path': 'image/Sailing 2.jpg'},
    {'name': 'image/Sailing 3.jpg', 'path': 'image/Sailing 3.jpg'},
    {'name': 'image/Satellite 1.jpg', 'path': 'image/Satellite 1.jpg'},
    {'name': 'image/Scared cat 1.jpg', 'path': 'image/Scared cat 1.jpg'},
    {'name': 'image/Scared face 1.jpg', 'path': 'image/Scared face 1.jpg'},
    {'name': 'image/Scared face 2.jpg', 'path': 'image/Scared face 2.jpg'},
    {'name': 'image/Scared face 3.jpg', 'path': 'image/Scared face 3.jpg'},
    {'name': 'image/Scared face 4.jpg', 'path': 'image/Scared face 4.jpg'},
    {'name': 'image/Scared face 5.jpg', 'path': 'image/Scared face 5.jpg'},
    {'name': 'image/Scary face 1.jpg', 'path': 'image/Scary face 1.jpg'},
    {'name': 'image/Scary face 2.jpg', 'path': 'image/Scary face 2.jpg'},
    {'name': 'image/School 1.jpg', 'path': 'image/School 1.jpg'},
    {'name': 'image/School 2.jpg', 'path': 'image/School 2.jpg'},
    {'name': 'image/School 3.jpg', 'path': 'image/School 3.jpg'},
    {'name': 'image/School 4.jpg', 'path': 'image/School 4.jpg'},
    {'name': 'image/School 5.jpg', 'path': 'image/School 5.jpg'},
    {'name': 'image/School 6.jpg', 'path': 'image/School 6.jpg'},
    {'name': 'image/School 7.jpg', 'path': 'image/School 7.jpg'},
    {'name': 'image/School 8.jpg', 'path': 'image/School 8.jpg'},
    {'name': 'image/Seal 1.jpg', 'path': 'image/Seal 1.jpg'},
    {'name': 'image/Severed finger 1.jpg', 'path': 'image/Severed finger 1.jpg'},
    {'name': 'image/Shark 1.jpg', 'path': 'image/Shark 1.jpg'},
    {'name': 'image/Shark 2.jpg', 'path': 'image/Shark 2.jpg'},
    {'name': 'image/Shark 3.jpg', 'path': 'image/Shark 3.jpg'},
    {'name': 'image/Shark 4.jpg', 'path': 'image/Shark 4.jpg'},
    {'name': 'image/Shark 5.jpg', 'path': 'image/Shark 5.jpg'},
    {'name': 'image/Shark 6.jpg', 'path': 'image/Shark 6.jpg'},
    {'name': 'image/Shark 7.jpg', 'path': 'image/Shark 7.jpg'},
    {'name': 'image/Shark 8.jpg', 'path': 'image/Shark 8.jpg'},
    {'name': 'image/Shark 9.jpg', 'path': 'image/Shark 9.jpg'},
    {'name': 'image/Shark 10.jpg', 'path': 'image/Shark 10.jpg'},
    {'name': 'image/Shark 11.jpg', 'path': 'image/Shark 11.jpg'},
    {'name': 'image/Shooting 1.jpg', 'path': 'image/Shooting 1.jpg'},
    {'name': 'image/Shot 1.jpg', 'path': 'image/Shot 1.jpg'},
    {'name': 'image/Shot 2.jpg', 'path': 'image/Shot 2.jpg'},
    {'name': 'image/Shot 3.jpg', 'path': 'image/Shot 3.jpg'},
    {'name': 'image/Shot 4.jpg', 'path': 'image/Shot 4.jpg'},
    {'name': 'image/Shot 5.jpg', 'path': 'image/Shot 5.jpg'},
    {'name': 'image/Siblings 1.jpg', 'path': 'image/Siblings 1.jpg'},
    {'name': 'image/Sidewalk 1.jpg', 'path': 'image/Sidewalk 1.jpg'},
    {'name': 'image/Sidewalk 2.jpg', 'path': 'image/Sidewalk 2.jpg'},
    {'name': 'image/Sidewalk 3.jpg', 'path': 'image/Sidewalk 3.jpg'},
    {'name': 'image/Sidewalk 4.jpg', 'path': 'image/Sidewalk 4.jpg'},
    {'name': 'image/Sidewalk 5.jpg', 'path': 'image/Sidewalk 5.jpg'},
    {'name': 'image/Sidewalk 6.jpg', 'path': 'image/Sidewalk 6.jpg'},
    {'name': 'image/Skier 1.jpg', 'path': 'image/Skier 1.jpg'},
    {'name': 'image/Skijump 1.jpg', 'path': 'image/Skijump 1.jpg'},
    {'name': 'image/Skijump 2.jpg', 'path': 'image/Skijump 2.jpg'},
    {'name': 'image/Skinhead 1.jpg', 'path': 'image/Skinhead 1.jpg'},
    {'name': 'image/Sky 1.jpg', 'path': 'image/Sky 1.jpg'},
    {'name': 'image/Skydiving 1.jpg', 'path': 'image/Skydiving 1.jpg'},
    {'name': 'image/Skydiving 2.jpg', 'path': 'image/Skydiving 2.jpg'},
    {'name': 'image/Skydiving 3.jpg', 'path': 'image/Skydiving 3.jpg'},
    {'name': 'image/Skydiving 4.jpg', 'path': 'image/Skydiving 4.jpg'},
    {'name': 'image/Skydiving 5.jpg', 'path': 'image/Skydiving 5.jpg'},
    {'name': 'image/Skyscraper 1.jpg', 'path': 'image/Skyscraper 1.jpg'},
    {'name': 'image/Skyscraper 2.jpg', 'path': 'image/Skyscraper 2.jpg'},
    {'name': 'image/Sleepy pose 1.jpg', 'path': 'image/Sleepy pose 1.jpg'},
    {'name': 'image/Sleepy pose 2.jpg', 'path': 'image/Sleepy pose 2.jpg'},
    {'name': 'image/Sleepy pose 3.jpg', 'path': 'image/Sleepy pose 3.jpg'},
    {'name': 'image/Sleepy pose 4.jpg', 'path': 'image/Sleepy pose 4.jpg'},
    {'name': 'image/Smiling face 1.jpg', 'path': 'image/Smiling face 1.jpg'},
    {'name': 'image/Snake 1.jpg', 'path': 'image/Snake 1.jpg'},
    {'name': 'image/Snake 2.jpg', 'path': 'image/Snake 2.jpg'},
    {'name': 'image/Snake 3.jpg', 'path': 'image/Snake 3.jpg'},
    {'name': 'image/Snake 4.jpg', 'path': 'image/Snake 4.jpg'},
    {'name': 'image/Snake 5.jpg', 'path': 'image/Snake 5.jpg'},
    {'name': 'image/Snake 6.jpg', 'path': 'image/Snake 6.jpg'},
    {'name': 'image/Snow 1.jpg', 'path': 'image/Snow 1.jpg'},
    {'name': 'image/Snow 2.jpg', 'path': 'image/Snow 2.jpg'},
    {'name': 'image/Snow 3.jpg', 'path': 'image/Snow 3.jpg'},
    {'name': 'image/Snow 4.jpg', 'path': 'image/Snow 4.jpg'},
    {'name': 'image/Snow 5.jpg', 'path': 'image/Snow 5.jpg'},
    {'name': 'image/Soccer 1.jpg', 'path': 'image/Soccer 1.jpg'},
    {'name': 'image/Soccer 2.jpg', 'path': 'image/Soccer 2.jpg'},
    {'name': 'image/Socks 1.jpg', 'path': 'image/Socks 1.jpg'},
    {'name': 'image/Solar panel 1.jpg', 'path': 'image/Solar panel 1.jpg'},
    {'name': 'image/Soldiers 1.jpg', 'path': 'image/Soldiers 1.jpg'},
    {'name': 'image/Soldiers 2.jpg', 'path': 'image/Soldiers 2.jpg'},
    {'name': 'image/Soldiers 3.jpg', 'path': 'image/Soldiers 3.jpg'},
    {'name': 'image/Soldiers 4.jpg', 'path': 'image/Soldiers 4.jpg'},
    {'name': 'image/Soldiers 5.jpg', 'path': 'image/Soldiers 5.jpg'},
    {'name': 'image/Soldiers 6.jpg', 'path': 'image/Soldiers 6.jpg'},
    {'name': 'image/Soldiers 7.jpg', 'path': 'image/Soldiers 7.jpg'},
    {'name': 'image/Soldiers 8.jpg', 'path': 'image/Soldiers 8.jpg'},
    {'name': 'image/Soldiers 9.jpg', 'path': 'image/Soldiers 9.jpg'},
    {'name': 'image/Soldiers 10.jpg', 'path': 'image/Soldiers 10.jpg'},
    {'name': 'image/Soup 1.jpg', 'path': 'image/Soup 1.jpg'},
    {'name': 'image/Spider 1.jpg', 'path': 'image/Spider 1.jpg'},
    {'name': 'image/Spider 2.jpg', 'path': 'image/Spider 2.jpg'},
    {'name': 'image/Statue 1.jpg', 'path': 'image/Statue 1.jpg'},
    {'name': 'image/Statue 2.jpg', 'path': 'image/Statue 2.jpg'},
    {'name': 'image/Stingray 1.jpg', 'path': 'image/Stingray 1.jpg'},
    {'name': 'image/Stingray 2.jpg', 'path': 'image/Stingray 2.jpg'},
    {'name': 'image/Stingray 3.jpg', 'path': 'image/Stingray 3.jpg'},
    {'name': 'image/Storage 1.jpg', 'path': 'image/Storage 1.jpg'},
    {'name': 'image/Storage 2.jpg', 'path': 'image/Storage 2.jpg'},
    {'name': 'image/Storage 3.jpg', 'path': 'image/Storage 3.jpg'},
    {'name': 'image/Street 1.jpg', 'path': 'image/Street 1.jpg'},
    {'name': 'image/Street 2.jpg', 'path': 'image/Street 2.jpg'},
    {'name': 'image/Street 3.jpg', 'path': 'image/Street 3.jpg'},
    {'name': 'image/Street 4.jpg', 'path': 'image/Street 4.jpg'},
    {'name': 'image/Street 5.jpg', 'path': 'image/Street 5.jpg'},
    {'name': 'image/Sun 1.jpg', 'path': 'image/Sun 1.jpg'},
    {'name': 'image/Sunflower 1.jpg', 'path': 'image/Sunflower 1.jpg'},
    {'name': 'image/Sunset 1.jpg', 'path': 'image/Sunset 1.jpg'},
    {'name': 'image/Sunset 2.jpg', 'path': 'image/Sunset 2.jpg'},
    {'name': 'image/Sunset 3.jpg', 'path': 'image/Sunset 3.jpg'},
    {'name': 'image/Sunset 4.jpg', 'path': 'image/Sunset 4.jpg'},
    {'name': 'image/Sunset 5.jpg', 'path': 'image/Sunset 5.jpg'},
    {'name': 'image/Sunset 6.jpg', 'path': 'image/Sunset 6.jpg'},
    {'name': 'image/Surgery 1.jpg', 'path': 'image/Surgery 1.jpg'},
    {'name': 'image/Surgery 2.jpg', 'path': 'image/Surgery 2.jpg'},
    {'name': 'image/Surgery 3.jpg', 'path': 'image/Surgery 3.jpg'},
    {'name': 'image/Surgery 4.jpg', 'path': 'image/Surgery 4.jpg'},
    {'name': 'image/Surgery 5.jpg', 'path': 'image/Surgery 5.jpg'},
    {'name': 'image/Surprise 1.jpg', 'path': 'image/Surprise 1.jpg'},
    {'name': 'image/Surprise 2.jpg', 'path': 'image/Surprise 2.jpg'},
    {'name': 'image/Swimming 1.jpg', 'path': 'image/Swimming 1.jpg'},
    {'name': 'image/Swingset 1.jpg', 'path': 'image/Swingset 1.jpg'},
    {'name': 'image/Thunderstorm 1.jpg', 'path': 'image/Thunderstorm 1.jpg'},
    {'name': 'image/Thunderstorm 2.jpg', 'path': 'image/Thunderstorm 2.jpg'},
    {'name': 'image/Thunderstorm 3.jpg', 'path': 'image/Thunderstorm 3.jpg'},
    {'name': 'image/Thunderstorm 4.jpg', 'path': 'image/Thunderstorm 4.jpg'},
    {'name': 'image/Thunderstorm 5.jpg', 'path': 'image/Thunderstorm 5.jpg'},
    {'name': 'image/Thunderstorm 6.jpg', 'path': 'image/Thunderstorm 6.jpg'},
    {'name': 'image/Thunderstorm 7.jpg', 'path': 'image/Thunderstorm 7.jpg'},
    {'name': 'image/Thunderstorm 8.jpg', 'path': 'image/Thunderstorm 8.jpg'},
    {'name': 'image/Thunderstorm 9.jpg', 'path': 'image/Thunderstorm 9.jpg'},
    {'name': 'image/Thunderstorm 10.jpg', 'path': 'image/Thunderstorm 10.jpg'},
    {'name': 'image/Thunderstorm 11.jpg', 'path': 'image/Thunderstorm 11.jpg'},
    {'name': 'image/Tickling 1.jpg', 'path': 'image/Tickling 1.jpg'},
    {'name': 'image/Tiger 1.jpg', 'path': 'image/Tiger 1.jpg'},
    {'name': 'image/Tiger 2.jpg', 'path': 'image/Tiger 2.jpg'},
    {'name': 'image/Timber 1.jpg', 'path': 'image/Timber 1.jpg'},
    {'name': 'image/Timber 2.jpg', 'path': 'image/Timber 2.jpg'},
    {'name': 'image/Timber 3.jpg', 'path': 'image/Timber 3.jpg'},
    {'name': 'image/Timber 4.jpg', 'path': 'image/Timber 4.jpg'},
    {'name': 'image/Toast 1.jpg', 'path': 'image/Toast 1.jpg'},
    {'name': 'image/Toilet 1.jpg', 'path': 'image/Toilet 1.jpg'},
    {'name': 'image/Toilet 2.jpg', 'path': 'image/Toilet 2.jpg'},
    {'name': 'image/Toilet 3.jpg', 'path': 'image/Toilet 3.jpg'},
    {'name': 'image/Toilet 4.jpg', 'path': 'image/Toilet 4.jpg'},
    {'name': 'image/Tornado 1.jpg', 'path': 'image/Tornado 1.jpg'},
    {'name': 'image/Tornado 2.jpg', 'path': 'image/Tornado 2.jpg'},
    {'name': 'image/Tornado 3.jpg', 'path': 'image/Tornado 3.jpg'},
    {'name': 'image/Tornado 4.jpg', 'path': 'image/Tornado 4.jpg'},
    {'name': 'image/Tornado 5.jpg', 'path': 'image/Tornado 5.jpg'},
    {'name': 'image/Torture chamber 1.jpg', 'path': 'image/Torture chamber 1.jpg'},
    {'name': 'image/Traffic 1.jpg', 'path': 'image/Traffic 1.jpg'},
    {'name': 'image/Tumor 1.jpg', 'path': 'image/Tumor 1.jpg'},
    {'name': 'image/Volcano 1.jpg', 'path': 'image/Volcano 1.jpg'},
    {'name': 'image/Volcano 2.jpg', 'path': 'image/Volcano 2.jpg'},
    {'name': 'image/Volcano 3.jpg', 'path': 'image/Volcano 3.jpg'},
    {'name': 'image/Wall 1.jpg', 'path': 'image/Wall 1.jpg'},
    {'name': 'image/Wall 2.jpg', 'path': 'image/Wall 2.jpg'},
    {'name': 'image/Wall 3.jpg', 'path': 'image/Wall 3.jpg'},
    {'name': 'image/Wall 4.jpg', 'path': 'image/Wall 4.jpg'},
    {'name': 'image/Wall 5.jpg', 'path': 'image/Wall 5.jpg'},
    {'name': 'image/War 1.jpg', 'path': 'image/War 1.jpg'},
    {'name': 'image/War 2.jpg', 'path': 'image/War 2.jpg'},
    {'name': 'image/War 3.jpg', 'path': 'image/War 3.jpg'},
    {'name': 'image/War 4.jpg', 'path': 'image/War 4.jpg'},
    {'name': 'image/War 5.jpg', 'path': 'image/War 5.jpg'},
    {'name': 'image/War 6.jpg', 'path': 'image/War 6.jpg'},
    {'name': 'image/War 7.jpg', 'path': 'image/War 7.jpg'},
    {'name': 'image/War 8.jpg', 'path': 'image/War 8.jpg'},
    {'name': 'image/Waterfall 1.jpg', 'path': 'image/Waterfall 1.jpg'},
    {'name': 'image/Weapon 1.jpg', 'path': 'image/Weapon 1.jpg'},
    {'name': 'image/Wedding 1.jpg', 'path': 'image/Wedding 1.jpg'},
    {'name': 'image/Wedding 2.jpg', 'path': 'image/Wedding 2.jpg'},
    {'name': 'image/Wedding 3.jpg', 'path': 'image/Wedding 3.jpg'},
    {'name': 'image/Wedding 4.jpg', 'path': 'image/Wedding 4.jpg'},
    {'name': 'image/Wedding 5.jpg', 'path': 'image/Wedding 5.jpg'},
    {'name': 'image/Wedding 6.jpg', 'path': 'image/Wedding 6.jpg'},
    {'name': 'image/Wedding 7.jpg', 'path': 'image/Wedding 7.jpg'},
    {'name': 'image/Wedding 8.jpg', 'path': 'image/Wedding 8.jpg'},
    {'name': 'image/Wedding 9.jpg', 'path': 'image/Wedding 9.jpg'},
    {'name': 'image/Wedding 10.jpg', 'path': 'image/Wedding 10.jpg'},
    {'name': 'image/Wedding 11.jpg', 'path': 'image/Wedding 11.jpg'},
    {'name': 'image/Wedding 12.jpg', 'path': 'image/Wedding 12.jpg'},
    {'name': 'image/Wedding ring 1.jpg', 'path': 'image/Wedding ring 1.jpg'},
    {'name': 'image/Windmill 1.jpg', 'path': 'image/Windmill 1.jpg'},
    {'name': 'image/Wolf 1.jpg', 'path': 'image/Wolf 1.jpg'},
    {'name': 'image/Wolf 2.jpg', 'path': 'image/Wolf 2.jpg'},
    {'name': 'image/Woods 1.jpg', 'path': 'image/Woods 1.jpg'},
    {'name': 'image/Yarn 1.jpg', 'path': 'image/Yarn 1.jpg'},
    {'name': 'image/Yarn 2.jpg', 'path': 'image/Yarn 2.jpg'},
    {'name': 'image/Yarn 3.jpg', 'path': 'image/Yarn 3.jpg'},
    {'name': 'image/Yarn 4.jpg', 'path': 'image/Yarn 4.jpg'},
    {'name': 'image/Yoga 1.jpg', 'path': 'image/Yoga 1.jpg'},
    {'name': 'image/Yoga 2.jpg', 'path': 'image/Yoga 2.jpg'},
    {'name': 'image/Yoga 3.jpg', 'path': 'image/Yoga 3.jpg'},
    {'name': 'image/Yoga 4.jpg', 'path': 'image/Yoga 4.jpg'},
    {'name': 'image/Yoga 5.jpg', 'path': 'image/Yoga 5.jpg'},
    {'name': 'image/Zebra 1.jpg', 'path': 'image/Zebra 1.jpg'},
    {'name': 'images.csv', 'path': 'images.csv'},
  ]
});

psychoJS.experimentLogger.setLevel(core.Logger.ServerLevel.INFO);


var currentLoop;
var frameDur;
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


var welcomeClock;
var text;
var welcome_key_input;
var welcome_1;
var welcome_2;
var welcome_3;
var trialClock;
var polygon;
var image;
var image_key_input;
var waitClock;
var text_3;
var break_2Clock;
var text_countdown;
var text_4;
var globalClock;
var routineTimer;
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
  
  welcome_key_input = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  welcome_1 = new visual.TextStim({
    win: psychoJS.window,
    name: 'welcome_1',
    text: '@@@@@@@@@@@@@@@@ Welcome to the experiment! In this phase, you will remain seated. A new image will appear every 2-10 seconds. Before each image, you will see a fixation point. After each image, there will be a brief blank screen. As soon as you see the image, press the spacebar immediately. Press the spacebar now to begin Phase 1.',
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
    text: 'Welcome to the next phase! In this phase, you will stand. A new image will appear every 2-10 seconds. Before each image, you will see a fixation point. After each image, there will be a blank screen. As soon as you see the image, press the spacebar immediately. Press the spacebar now to begin Phase 2.',
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
    text: 'Welcome to the final phase! In this phase, you will be seated again. A new image will appear every 2-10 seconds. You will see a fixation point before each image and a blank screen after each image. Press the spacebar immediately when you see the image. Press the spacebar now to begin Phase 3.',
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
  image_key_input = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
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
    text: '5',
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
    text: 'Take a small break',
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


var trials;
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


var loops;
function loopsLoopBegin(loopsLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    loops = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 5, method: TrialHandler.Method.SEQUENTIAL,
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


var t;
var frameN;
var continueRoutine;
var welcomeMaxDurationReached;
var routine_image_list;
var _welcome_key_input_allKeys;
var welcomeMaxDuration;
var welcomeComponents;
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
    console.log("Trial:  " + trials.thisN);
    if (trials.thisN === 0) {
        text.text = welcome_1.text;
    } else if (trials.thisN === 1) {
        text.text = welcome_2.text;
    } else if (trials.thisN === 2) {
        text.text = welcome_3.text;
    }
    
    // Initialize list of 40 images
    routine_image_list = []
    
    for (const [key, arr] of window.IMAGES.entries()) {
    //    console.log(key, arr);
        const slice = arr.sort(() => 0.5 - Math.random()).slice(0, 10);
    //    console.log(key, slice);
        routine_image_list.push.apply(routine_image_list, slice);
    }
    //console.log("Randomizing images");
    window.RANDOM_IMAGES = routine_image_list.slice()
    //console.log(window.RANDOM_IMAGES)
    welcome_key_input.keys = undefined;
    welcome_key_input.rt = undefined;
    _welcome_key_input_allKeys = [];
    psychoJS.experiment.addData('welcome.started', globalClock.getTime());
    welcomeMaxDuration = null
    // keep track of which components have finished
    welcomeComponents = [];
    welcomeComponents.push(text);
    welcomeComponents.push(welcome_key_input);
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


var frameRemains;
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
    
    
    // *welcome_key_input* updates
    if (t >= 1 && welcome_key_input.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      welcome_key_input.tStart = t;  // (not accounting for frame time here)
      welcome_key_input.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { welcome_key_input.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { welcome_key_input.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { welcome_key_input.clearEvents(); });
    }
    
    if (welcome_key_input.status === PsychoJS.Status.STARTED) {
      let theseKeys = welcome_key_input.getKeys({keyList: ['space'], waitRelease: false});
      _welcome_key_input_allKeys = _welcome_key_input_allKeys.concat(theseKeys);
      if (_welcome_key_input_allKeys.length > 0) {
        welcome_key_input.keys = _welcome_key_input_allKeys[_welcome_key_input_allKeys.length - 1].name;  // just the last key pressed
        welcome_key_input.rt = _welcome_key_input_allKeys[_welcome_key_input_allKeys.length - 1].rt;
        welcome_key_input.duration = _welcome_key_input_allKeys[_welcome_key_input_allKeys.length - 1].duration;
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
      currentLoop.addResponse(welcome_key_input.corr, level);
    }
    psychoJS.experiment.addData('welcome_key_input.keys', welcome_key_input.keys);
    if (typeof welcome_key_input.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('welcome_key_input.rt', welcome_key_input.rt);
        psychoJS.experiment.addData('welcome_key_input.duration', welcome_key_input.duration);
        routineTimer.reset();
        }
    
    welcome_key_input.stop();
    // the Routine "welcome" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var trialMaxDurationReached;
var _image_key_input_allKeys;
var random_duration;
var image_path;
var trialMaxDuration;
var trialComponents;
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
    image_key_input.keys = undefined;
    image_key_input.rt = undefined;
    _image_key_input_allKeys = [];
    // Run 'Begin Routine' code from code
    let image_time_range = 1;
    
    random_duration = 2 + Math.floor(Math.random() * image_time_range);
    //text_2.text = random_duration;
    
    image_path = window.RANDOM_IMAGES[loops.thisN];
    console.log("Loop " + loops.thisN + ": " + image_path);
    image.image = image_path;
    psychoJS.experiment.addData('trial.started', globalClock.getTime());
    trialMaxDuration = null
    // keep track of which components have finished
    trialComponents = [];
    trialComponents.push(polygon);
    trialComponents.push(image);
    trialComponents.push(image_key_input);
    
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
    
    
    // *image_key_input* updates
    if (t >= 1 && image_key_input.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      image_key_input.tStart = t;  // (not accounting for frame time here)
      image_key_input.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { image_key_input.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { image_key_input.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { image_key_input.clearEvents(); });
    }
    
    frameRemains = 1 + random_duration - psychoJS.window.monitorFramePeriod * 0.75;// most of one frame period left
    if (image_key_input.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      image_key_input.status = PsychoJS.Status.FINISHED;
        }
      
    if (image_key_input.status === PsychoJS.Status.STARTED) {
      let theseKeys = image_key_input.getKeys({keyList: ['space'], waitRelease: false});
      _image_key_input_allKeys = _image_key_input_allKeys.concat(theseKeys);
      if (_image_key_input_allKeys.length > 0) {
        image_key_input.keys = _image_key_input_allKeys[_image_key_input_allKeys.length - 1].name;  // just the last key pressed
        image_key_input.rt = _image_key_input_allKeys[_image_key_input_allKeys.length - 1].rt;
        image_key_input.duration = _image_key_input_allKeys[_image_key_input_allKeys.length - 1].duration;
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
      currentLoop.addResponse(image_key_input.corr, level);
    }
    psychoJS.experiment.addData('image_key_input.keys', image_key_input.keys);
    if (typeof image_key_input.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('image_key_input.rt', image_key_input.rt);
        psychoJS.experiment.addData('image_key_input.duration', image_key_input.duration);
        }
    
    image_key_input.stop();
    // the Routine "trial" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var waitMaxDurationReached;
var waitMaxDuration;
var waitComponents;
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


var break_2MaxDurationReached;
var clock;
var current_time;
var countdown_time;
var break_2MaxDuration;
var break_2Components;
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
    countdown_time = 5
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
