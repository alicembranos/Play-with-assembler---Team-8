// import {showVisibility} from "./functions.js";

const wireFrame1 = document.getElementById("wireframe1");
const wireFrame2 = document.getElementById("wireframe2");
const wireFrame3 = document.getElementById("wireframe3");
const wireFrame4 = document.getElementById("wireframe4");
const wireFrame5 = document.getElementById("wireframe5");
const startBtn = document.getElementById("startButton");
const start = document.getElementById("startGameButton");
const playAgain = document.getElementById("playAgainButton");

start.addEventListener("click", showVisibility(wireFrame1,wireFrame2));

function showVisibility(idElement, lastElement){
    idElement.classList.toggle("hide");
    lastElement.classList.toggle("hide");
    console.log("presionado");
}
//showVisibility(document.getElementById("wireframe1"), document.getElementById("wireframe2"));
