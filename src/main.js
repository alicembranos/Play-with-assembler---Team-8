import { showVisibility } from "./functions.js"

const wireFrame1 = document.getElementById("wireframe1");
const wireFrame2 = document.getElementById("wireframe2");
const wireFrame3 = document.getElementById("wireframe3");
const wireFrame4 = document.getElementById("wireframe4");
const wireFrame5 = document.getElementById("wireframe5");

const startBtn = document.getElementById("startButton");
const start = document.getElementById("startGameButton");
const playAgain = document.getElementById("playAgainButton");

startBtn.addEventListener("click", function(){
    showVisibility(wireFrame1,wireFrame2);
});

start.addEventListener("click", function(){
    showVisibility(wireFrame2,wireFrame3);
});

playAgain.addEventListener("click", function(){
    showVisibility(wireFrame5,wireFrame3);
    console.log("hola");
});
