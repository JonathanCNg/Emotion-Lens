# Emotion Lens
Description: This lens animates 3 emotions- Happy, sad, and angry.

## Short Demo

Link: https://youtu.be/C7lpT3OPrLA

## App Experience

### Full Demo

<img src="assets/fulldemo.gif" alt="drawing" height="400"/>

Prefer to watch it at your own pace? Go to https://youtu.be/isgkG8hV6fg

### Individual Demos

Happy | Sad
:-------------------------:|:-------------------------:
<img src="assets/happy-sample.gif" alt="drawing" height="200"/> | <img src="assets/sad-sample.gif" alt="drawing" height="200"/>
Angry | Party
<img src="assets/angry-sample.gif" alt="drawing" height="200"/> | <img src="assets/party-sample.gif" alt="drawing" height="200"/>

## To Run

1. Install extension (https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
2. Go to index.html
3. Right-click blank space and select Open With Live Server

Debugging:
The machine learning is trained on a small set of data—me & myself. If you'd like to train the machine learning algorithm to your face, follow these steps:
1. Go to https://teachablemachine.withgoogle.com/train/image
2. Create classes: "Nothing", "Happy", "Sad", "Angry"
3. Use Webcam to give corresponding data.
4. Click Train Model
5. Click Export > Upload my model
6. Copy Shareable Link URL
7. Replace URL in Line 55 of emotion_lens.js
8. That's it! Refresh the Live Server and have fun!

## Link + Instructions

Link: https://jonathancng.github.io/Emotion-Lens/
Instructions:
1. Happy: Wide Smile
2. Sad: Pout with raised eyebrows.
3. Angry: Scrunch eyebrows.
4. Easter egg: Raise both arms!

## Tools Used
1. p5.js (https://p5js.org/)
2. ml5.js (https://ml5js.org/)
3. Teachable Machine (https://teachablemachine.withgoogle.com/)
