import {
    showVisibility
} from "./functions.js"

const wireFrame1 = document.getElementById("wireframe1");
const wireFrame2 = document.getElementById("wireframe2");
const wireFrame3 = document.getElementById("wireframe3");
const wireFrame4 = document.getElementById("wireframe4");
const wireFrame5 = document.getElementById("wireframe5");

const startBtn = document.getElementById("startButton");
const start = document.getElementById("startGameButton");
const playAgain = document.getElementById("playAgainButton");

const boardGame = document.getElementById("boardGame");
const clickElement = document.getElementById("clickElement");

startBtn.addEventListener("click", function () {
    showVisibility(wireFrame1, wireFrame2);
});

start.addEventListener("click", function () {
    showVisibility(wireFrame2, wireFrame3);
});

playAgain.addEventListener("click", function () {
    showVisibility(wireFrame5, wireFrame3);
    console.log("hola");
});


/****** Functions for Wireframe 4 (Game) *******/
clickElement.addEventListener("click", movingElement);

function movingElement() {

    resizeElement();
    //Get the elements parent size
    let clientWidth = boardGame.clientWidth;
    let elementWidth = clickElement.clientWidth;
    let clientHeight = boardGame.clientHeight;
    let elementHeight = clickElement.clientHeight;

    //Limit to avoid going off screen
    let limitsX = (clientWidth - elementWidth);
    let limitsY = (clientHeight - elementHeight);
    let randY = Math.floor((Math.random() * limitsY));
    let randX = Math.floor((Math.random() * limitsX));

    clickElement.style.transform = `translate(${randX}px, ${randY}px)`

}

function resizeElement() {

    const viewPortY = window.innerHeight;
    const viewPortX = window.innerWidth;

    // 320 px— 480 px: Mobile devices
    // 481 px— 768 px: iPads, Tablets
    // 769 px— 1024 px: Small screens, laptops
    // 1025 px— 1200 px: Desktops, large screens

    // Play Game Limits for resizing
    //Mobiles:
    // h:50px w:50px Min
    // h:100px w:100px Max
    // Tablets:
    // h:100px w:100px Min
    // h:200px w:200px Max
    // Standard Screens:
    // h:100px w:100px Max
    // h:300px w:300px Max

    switch (true) {
        case viewPortX <= 480:
            clickElement.style.height = getRandomSize(20, 100) + 'px';
            clickElement.style.width = getRandomSize(20, 100) + 'px';
            break;
        case viewPortX > 480 && viewPortX <= 768:
            clickElement.style.height = getRandomSize(50, 200) + 'px';
            clickElement.style.width = getRandomSize(50, 200) + 'px';
            break;
        case viewPortX > 768:
            clickElement.style.height = getRandomSize(50, 300) + 'px';
            clickElement.style.width = getRandomSize(50, 300) + 'px';
            break;
    }

}

/* Function to get random sizes */
function getRandomSize(min, max) {
    let difference = max - min;
    let rand = Math.random();
    // multiply with difference 
    rand = Math.floor(rand * difference);
    // add with min value 
    rand = rand + min;
    return rand;
}