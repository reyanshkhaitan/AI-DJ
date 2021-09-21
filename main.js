song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log("left wrist x = " + leftWristX + " left wrist y = " + leftWristY);
        console.log("right wrist x = " + rightWristX + "right wrist y = " + rightWristY);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreLeftWrist);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log(scoreRightWrist);
    }
}

function modelLoaded() {
    console.log('model is loaded');
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

    if (scoreRightWrist > 0.2) {



        circle(rightWristX, rightWristY, 20);

        if (rightWristY > 0 && rightWristY <= 100) {
            document.getElementById("speed_text").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        }
        else if (rightWristY > 100 && rightWristY <= 200) {
            document.getElementById("speed_text").innerHTML = "Speed = 1x";
            song.rate(1);
        }
        else if (rightWristY > 200 && rightWristY <= 300) {
            document.getElementById("speed_text").innerHTML = "Speed = 1.5x";
            song.rate(1);
        }
        else if (rightWristY > 300 && rightWristY <= 500) {
            document.getElementById("speed_text").innerHTML = "Speed = 2x";
            song.rate(2);
        }
    }
}

if (scoreLeftWrist > 0.2) {
    circle(leftWristX, leftWristY, 20);
    var numberLeftWristY = Number(leftWristY);
    var removeDecimals = floor(numberLeftWristY);
    volume = removeDecimals / 500;
    document.getElementById("volume_text").innerHTML = "volume = " + volume;
    song.setVolume(volume);
}


function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function stop() {
    song.stop();
}

function stop() {
    song.stop();
}