import {
    showVisibility,
    movingElement,
    loadUser,
    upLoadRanking,
    timerGame,
    timerReady,
    validateForm,
} from "./functions.js";

const wireFrame1 = document.getElementById("wireframe1");
const wireFrame2 = document.getElementById("wireframe2");
const wireFrame3 = document.getElementById("wireframe3");
const wireFrame4 = document.getElementById("wireframe4");
const wireFrame5 = document.getElementById("wireframe5");

const startBtn = document.getElementById("startButton");
const start = document.getElementById("startGameButton");
const playAgain = document.getElementById("playAgainButton");

const userNameInput = document.getElementById("username");
const errorMessage = document.getElementById("error_messagge");

const boardGame = document.getElementById("boardGame");
const clickElement = document.getElementById("clickElement");

const listScore = document.getElementById("listScore");
const downcounter = document.getElementById("downcounter");

var counterClicks = 0;

// Storing user info in objects

// let arrayRanking = [
//     {
//         username: "Cris",
//         scores: 6,
//     },
//     {
//         username: "Carlos",
//         scores: 9,
//     },
//     {
//         username: "Alicia",
//         scores: 1,
//     },
// ];

//let arrayRanking = [];

//localStorage.setItem("ranking", JSON.stringify(arrayRanking));

upLoadRanking();

/****** Wireframe 1 (Username Login) *******/
startBtn.addEventListener("click", function () {
    if (validateForm()) {
        loadUser(userNameInput.value);
        showVisibility(wireFrame1, wireFrame2);
    }
});

/****** Wireframe 2 (Start Game) *******/
start.addEventListener("click", function () {
    showVisibility(wireFrame2, wireFrame3);
    timerReady();
});

/****** Wireframe 4 (Game) *******/
clickElement.addEventListener("click", function () {
    counterClicks++;
    movingElement();
});

/****** Wireframe 5 (Play Again) *******/
playAgain.addEventListener("click", function () {
    showVisibility(wireFrame5, wireFrame3);
    counterClicks = 0;
    clickElement.classList.remove("hide");
    timerReady();
});

export {
    wireFrame3,
    wireFrame4,
    wireFrame5,
    counterClicks,
    clickElement
};