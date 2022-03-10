# Emotion Lens

This lens animates 4 emotions: Happy 😁, Sad 😢, Angry 😠💢, and PARTY 🕺💃.

## Experience

### Full Demo

<img src="assets/fulldemo.gif" alt="drawing" height="400"/>

<!--- Prefer to watch it at your own pace? Go to https://youtu.be/isgkG8hV6fg --->

### Individual Demos

Happy 😁 | Sad 😢
:-------------------------:|:-------------------------:
<img src="assets/happy-sample.gif" alt="drawing" height="200"/> | <img src="assets/sad-sample.gif" alt="drawing" height="200"/>
**Angry 😠💢** | **Party 🕺💃**
<img src="assets/angry-sample.gif" alt="drawing" height="200"/> | <img src="assets/party-sample.gif" alt="drawing" height="200"/>

## Try yourself at this link!

Link: https://jonathancng.github.io/Emotion-Lens/

Warning: The machine learning is trained on a small set of data—me & myself. If you'd like to train the machine learning algorithm to your face, follow **Debugging** steps below!

Instructions:
1. **Happy**: Wide Smile
2. **Sad**: Pout with raised eyebrows, head tilted back.
3. **Angry**: Scrunch eyebrows, mean teeth, head tilted forward.
4. **Party**: Raise both arms!



## To Run

1. Install extension (https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
2. Go to index.html
3. Right-click blank space and select Open With Live Server

## Debugging

Ready to be a professional developer? Well there's no need to be if you just follow my instructions!

1. Download & Install VS Code (https://code.visualstudio.com/download).
2. Clone this repository (Either your own way, or with Github Desktop (https://desktop.github.com/)).
3. Open the repository with VS Code.
4. Install the Live Server extension to VS Code (https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).
5. Go to Google's Teachable Machine (https://teachablemachine.withgoogle.com/train/image).
6. Create classes: "Nothing", "Happy", "Sad", "Angry".
3. Use "Webcam" to give corresponding data.
4. Click "Train Model".
5. Click "Export" > "Upload my model"
6. Copy Shareable Link URL.
7. Replace URL in Line 55 of emotion_lens.js with the copied link.
7. Go to `index.html`.
8. Right-click blank space and select "Open With Live Server".
9. You did it! 🎉 Now, have fun!! 

## Tools Used
1. p5.js (https://p5js.org/)
2. ml5.js (https://ml5js.org/)
3. Teachable Machine (https://teachablemachine.withgoogle.com/)
