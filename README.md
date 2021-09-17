# Emotion Lens

##Short Demo
Link: https://youtu.be/C7lpT3OPrLA

##Description
This lens animates 3 emotions:
1. Happy, 
<img src="assets/happydemo.png" alt="drawing" height="200"/>
2. Sad, and 
<img src="assets/saddemo.png" alt="drawing" height="200"/>
3. Angry.
<img src="assets/angrydemo.png" alt="drawing" height="200"/>
Also, there's a surprise for you when you put both your hands in the air!
<details>
    <summary>Spoilers!</summary>
    <img src="assets/eastereggdemo.png" alt="drawing" height="500"/>
</details>

## To Run

1. Install extension (https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
2. Go to index.html
3. Right-click blank space and select Open With Live Server

Debugging:
The machine learning is trained on a small set of data, me. If you'd like to train the machine to your face, follow these steps:
1. Go to https://teachablemachine.withgoogle.com/train/image
2. Create classes: Nothing, Happy, Sad, Angry
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
