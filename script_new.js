let video;
let latestPrediction = null;
let modelIsLoading = true;
let crownImage;
const FOREHEAD_POINT = 151;
const LEFT_FOREHEAD = 104;
const RIGHT_FOREHEAD = 333;
const TEAR_PATH = [350,266,434]
let crown = {};
let tear = {};
let angryVein = {};
let sparkle = {};
let poseNet;
let poses = [];
let keypoints = [];
let interpolatedKeypoints = [];

// p5 function
function preload() {
  crown.image = loadImage("assets/crown.png");
  tear.image = loadImage("assets/tear.png");
  angryVein.image = loadImage("assets/angryvein.png");
  sparkle.image = loadImage("assets/sparkle.png");
}
// p5 function
function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  // ml5 function
  let facemesh = ml5.facemesh(video, () => {
    console.log("Model is ready!");
    modelIsLoading = false;
  });
  // ml5 function
  facemesh.on("predict", (results) => {
    // results is an Array
    // we care about the first object only
    // results[0]
    // console.log(results[0]);
    latestPrediction = results[0];
  });

  poseNet = ml5.poseNet(video, { flipHorizontal: true });
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on("pose", function (results) {
    poses = results;
  });

  video.hide();

  // setup original keypoints
  createInitialKeypoints();
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


// p5 function
function draw() {
  // if (modelIsLoading)
  // show a loading screen
  // draw webcam video
  image(video, 0, 0, width, height);
  //-----------------------------------
  if (latestPrediction == null) return; // don't draw anything else
  // get forhead location
  let foreheadLocation = latestPrediction.scaledMesh[FOREHEAD_POINT];
//   console.log(foreheadLocation);
  

  let leftForeheadLocation = latestPrediction.scaledMesh[LEFT_FOREHEAD];
  let rightForeheadLocation = latestPrediction.scaledMesh[RIGHT_FOREHEAD];

//   line (
//       leftForeheadLocation[0],
//       leftForeheadLocation[1],
//       rightForeheadLocation[0],
//       rightForeheadLocation[1]
//     )

  let foreheadWidth = dist(
      leftForeheadLocation[0],
      leftForeheadLocation[1],
      rightForeheadLocation[0],
      rightForeheadLocation[1],
  )

  crown.width = foreheadWidth*3
  crown.height = crown.image.height/crown.image.width*crown.width
  angryVein.width = foreheadWidth/2
  angryVein.height = angryVein.image.height/angryVein.image.height*angryVein.width
  tear.width = foreheadWidth/4
  tear.height = tear.image.height/tear.image.height*tear.width
  sparkle.width = foreheadWidth/3
  sparkle.height = sparkle.image.height/sparkle.image.height*sparkle.width

  imageMode(CENTER);
//   image(
//     crown.image,
//     foreheadLocation[0 /* x */],
//     foreheadLocation[1 /* y */] - foreheadWidth,
//     crown.width,
//     crown.height,
//   );
  image(
    angryVein.image,
    rightForeheadLocation[0 /* x */],
    rightForeheadLocation[1 /* y */],
    angryVein.width,
    angryVein.height,
  );

  if(!tear.hasOwnProperty('location')) {
    tear.location = latestPrediction.scaledMesh[TEAR_PATH[0]]
    tear.locationPoint = TEAR_PATH[0]
  }
  if (frameCount % 50 == 0) {
      console.log(frameCount)
      if(tear.locationPoint == TEAR_PATH[0]) {
        tear.locationPoint = TEAR_PATH[1]
      }
      else if(tear.locationPoint == TEAR_PATH[1]) {
        tear.locationPoint = TEAR_PATH[2]
      }
      else if(tear.locationPoint == TEAR_PATH[2]) {
        tear.locationPoint = TEAR_PATH[0]
      }
  }
  tear.location = latestPrediction.scaledMesh[tear.locationPoint]

  image(
    tear.image,
    tear.location[0 /* x */],
    tear.location[1 /* y */],
    tear.width,
    tear.height,
  );


  image(
    sparkle.image,
    leftForeheadLocation[0 /* x */],
    leftForeheadLocation[1 /* y */],
    sparkle.width,
    sparkle.height,
  );
  imageMode(CORNER);

  updateKeypoints();

  drawKeypoints();
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
    for (let i = 0; i < interpolatedKeypoints.length; i++) {
      keypoint = interpolatedKeypoints[i];
      fill(255, 0, 0);
      text(i, keypoint.x, keypoint.y); // draw keypoint number on video
      // ellipse(keypoint.x, keypoint.y, 10, 10); // just draw red dots
    }
  }
  
  // Create default keypoints for interpolation easing
  function createInitialKeypoints() {
    let numKeypoints = 17;
    for (let i = 0; i < numKeypoints; i++) {
      newKeypoint = { x: width / 2, y: height / 2 };
  
      interpolatedKeypoints.push(newKeypoint);
    }
  }