/*
MODES
EMOTIONS USING TEACHABLE MACHINE
Happy
    Detect: Big teeth smile
    Effect: Sparkle Eyes
    Music: September
Sad
    Detect: Pout with eyebrows raised
    Effect: Tears
    Music: Someone Like You intrumental loop
Angry
    Detect: Eyebrows scrunched
    Effect: Angry Veins
    Music: I don't fk w you instrumental loop

EASTER EGG
Rick Roll em all
    Detect: Arms raised!
    Effect: Sun Glasses, Disco ball?
    Music: Never Gonna Give You Up
*/

//GLOBAL VARIABLES
//Video
let video;
let flippedVideo;

//Assets
let tear = {};
let angryVein = {};
let sparkle = {};
let sunglasses = {};
let discoBall = {};

//PoseNet
let poseNet;
let poses = [];
let keypoints = [];
let interpolatedKeypoints = [];

//FaceMesh
let facemesh;
let latestPrediction = null;
const FOREHEAD_POINT = 151;
const LEFT_FOREHEAD = 104;
const RIGHT_FOREHEAD = 333;
const TEAR_PATH = [350, 266, 434];
const VEIN_POINTS = [333, 139, 67];
const SUNGLASSES_POINT = 6;
const BACKUP_EYE_POINTS = [159, 396];

//TeachableMachine
let classifier;
let imageModelURL = "https://teachablemachine.withgoogle.com/models/vDqI7hBWK/"; //HI USER UPDATE ME!
let label = "";

//Load assets
function preload() {
  tear.image = loadImage("assets/tear.png");
  angryVein.image = loadImage("assets/angryvein.png");
  sparkle.image = loadImage("assets/sparkle.png");
  sunglasses.image = loadImage("assets/sunglasses.png");
  discoBall.image = loadImage("assets/discoball.gif");
  classifier = ml5.imageClassifier(imageModelURL + "model.json");
}

//MAIN FUNCTIONS
//Get video and prepare FaceMesh and PoseNet
function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  flippedVideo = ml5.flipImage(video);
  classifyVideo();

  facemesh = ml5.facemesh(video, () => {
    poseNet = ml5.poseNet(video);
    poseNet.on("pose", function (results) {
      poses = results;
    });  
  });
  facemesh.on("predict", (results) => {
    latestPrediction = results[0];
  });
  
  createInitialKeypoints();

  video.hide();
}

function draw() {
  image(video, 0, 0, width, height);
  if (latestPrediction == null) return; // don't draw anything else

  let foreheadLocation = latestPrediction.scaledMesh[FOREHEAD_POINT];
  let leftForeheadLocation = latestPrediction.scaledMesh[LEFT_FOREHEAD];
  let rightForeheadLocation = latestPrediction.scaledMesh[RIGHT_FOREHEAD];

  let foreheadWidth = dist(
    leftForeheadLocation[0],
    leftForeheadLocation[1],
    rightForeheadLocation[0],
    rightForeheadLocation[1]
  );
  setImageSizes(foreheadWidth);

  updateKeypoints();
  // drawKeypoints(); //Uncomment for debugging purposes

  if (
    interpolatedKeypoints[9].y < height &&
    interpolatedKeypoints[10].y < height
  ) {
    drawSwagger();
  } else {
    drawEmotions();
  }

  //If posenet is broken, express emotions anyway
  if (!poses.length) {
    drawEmotions();
  }
}

//HELPER FUNCTIONS
function drawEmotions() {
  imageMode(CENTER);
  if (label === "Happy") {
    drawHappy();
  } else if (label === "Sad") {
    drawSad();
  } else if (label === "Angry") {
    drawAngry();
  }
  imageMode(CORNER);
}

function drawSwagger() {
  imageMode(CENTER);
  drawSunglasses();
  drawDiscoBall();
  imageMode(CORNER);
}

function updateKeypoints() {
  // If there are no poses, ignore it.
  if (poses.length <= 0) {
    return;
  }

  // Otherwise, let's update the points;
  let pose = poses[0].pose;
  keypoints = pose.keypoints;

  for (let kp = 0; kp < keypoints.length; kp++) {
    let oldKeypoint = interpolatedKeypoints[kp];
    let newKeypoint = keypoints[kp].position;

    let interpX = lerp(oldKeypoint.x, newKeypoint.x, 0.3);
    let interpY = lerp(oldKeypoint.y, newKeypoint.y, 0.3);

    let interpolatedKeypoint = { x: interpX, y: interpY };

    interpolatedKeypoints[kp] = interpolatedKeypoint;
  }
}

function drawKeypoints() {
  for (let i = 0; i < interpolatedKeypoints.length; i++) {
    keypoint = interpolatedKeypoints[i];
    fill(255, 0, 0);
    text(i, keypoint.x, keypoint.y);
  }
}

function createInitialKeypoints() {
  let numKeypoints = 17;
  for (let i = 0; i < numKeypoints; i++) {
    newKeypoint = { x: width / 2, y: height / 2 };
    interpolatedKeypoints.push(newKeypoint);
  }
}

function drawHappy() {
  for (let i = 1; i < 3; i++) {
    let sparkleLocation = interpolatedKeypoints[i];
    image(
      sparkle.image,
      sparkleLocation.x,
      sparkleLocation.y,
      sparkle.width,
      sparkle.height
    );
  }
}

function drawSad() {
  if (!tear.hasOwnProperty("locationPoint")) {
    tear.locationPoint = TEAR_PATH[0];
  }
  if (frameCount % 25 == 0) {
    if (tear.locationPoint == TEAR_PATH[0]) {
      tear.locationPoint = TEAR_PATH[1];
    } else if (tear.locationPoint == TEAR_PATH[1]) {
      tear.locationPoint = TEAR_PATH[2];
    } else if (tear.locationPoint == TEAR_PATH[2]) {
      tear.locationPoint = TEAR_PATH[0];
    }
  }
  tear.location = latestPrediction.scaledMesh[tear.locationPoint];

  image(
    tear.image,
    tear.location[0 /* x */],
    tear.location[1 /* y */],
    tear.width,
    tear.height
  );
}

function drawAngry() {
  if (!angryVein.hasOwnProperty("numVeins")) {
    angryVein.numVeins = 1;
  }
  if (frameCount % 25 == 0) {
    if (angryVein.numVeins == 1) {
      angryVein.numVeins = 2;
    } else if (angryVein.numVeins == 2) {
      angryVein.numVeins = 3;
    } else if (angryVein.numVeins == 3) {
      angryVein.numVeins = 1;
    }
  }
  for (let i = 0; i < angryVein.numVeins; i++) {
    let veinLocation = latestPrediction.scaledMesh[VEIN_POINTS[i]];
    image(
      angryVein.image,
      veinLocation[0],
      veinLocation[1],
      angryVein.width,
      angryVein.height
    );
  }
}

function drawSunglasses() {
  let sunglassesLocation = latestPrediction.scaledMesh[SUNGLASSES_POINT];
  image(
    sunglasses.image,
    sunglassesLocation[0],
    sunglassesLocation[1],
    sunglasses.width,
    sunglasses.height
  );
  image(discoBall.image, 100, 30, 100, 110);
}

function drawDiscoBall() {
  image(discoBall.image, 100, 30, 100, 110);
}

function setImageSizes(foreheadWidth) {
  angryVein.width = foreheadWidth / 2.5;
  angryVein.height =
    (angryVein.image.height / angryVein.image.width) * angryVein.width;

  tear.width = foreheadWidth / 5;
  tear.height = (tear.image.height / tear.image.width) * tear.width;

  sparkle.width = foreheadWidth / 2;
  sparkle.height = (sparkle.image.height / sparkle.image.width) * sparkle.width;

  sunglasses.width = foreheadWidth * 1.5;
  sunglasses.height =
    (sunglasses.image.height / sunglasses.image.width) * sunglasses.width;
}

function classifyVideo() {
  flippedVideo = ml5.flipImage(video);
  classifier.classify(flippedVideo, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  label = results[0].label;
  // Classifiy again!
  classifyVideo();
}
