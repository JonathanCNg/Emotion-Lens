let video;

//PoseNet
let poseNet;
let poses = [];
let keypoints = [];
let interpolatedKeypoints = [];

//FaceMesh
let facemesh;
let modelIsLoading = true;
const FOREHEAD_POINT = 151;
const LEFT_FOREHEAD = 104;
const RIGHT_FOREHEAD = 333;
const TEAR_PATH = [350,266,434]
const VEIN_POINTS = [333, 139, 67]
const SUNGLASSES_POINT = 6;

// //Assets
// let tear = {};
// let angryVein = {};
// let sparkle = {};
// let sunglasses = {};
// let discoBall = {};

// function preload() {
//     tear.image = loadImage("assets/tear.png");
//     angryVein.image = loadImage("assets/angryvein.png");
//     sparkle.image = loadImage("assets/sparkle.png");
//     sunglasses.image = loadImage("assets/sunglasses.png");
//     discoBall.image = loadImage("assets/discoball.gif");
//     classifier = ml5.imageClassifier(imageModelURL + 'model.json');
// }

function setup() {
    //Video
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide();
    video2 = video;
    
    //PoseNet
    poseNet = ml5.poseNet(video, { flipHorizontal: true });
    poseNet.on("pose", function (results) {
    poses = results;
    });
    createInitialKeypoints();

    //FaceMesh
    facemesh = ml5.facemesh(video, () => {
        console.log("Model is ready!");
        modelIsLoading = false;
    });
    facemesh.on("predict", (stuff) => {
        latestPrediction = stuff[0];
    });
}

function updateKeypoints() {
  console.log(poses.length)
  if (poses.length <= 0) {
    return;
  }
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

function draw() {
  let flippedVideo = ml5.flipImage(video);
  image(flippedVideo, 0, 0, width, height);
  updateKeypoints();
  drawKeypoints();
  if (interpolatedKeypoints[9].y < height) {
    tint(0,150,200);
  }
  else {
    tint(255,255,255);
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
