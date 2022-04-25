import {
    showVisibility,
    movingElement
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

let counterClicks = 0;
let interval;
let intervalGame;

// Storing user info in objects

let user = {
    username: "",
    //   currentPlaying: true,
    scores: 0,
};

let arrayRanking = [
    {
        username: "Cris",
        scores: 6,
    },
    {
        username: "Carlos",
        scores: 9,
    },
    {
        username: "Alicia",
        scores: 1,
    },
];

//let arrayRanking = [];

localStorage.setItem("ranking", JSON.stringify(arrayRanking));

upLoadRanking();

startBtn.addEventListener("click", function () {
    if (validateForm()) {
        loadUser(userNameInput.value);

        showVisibility(wireFrame1, wireFrame2);
    }
});

start.addEventListener("click", function () {
    showVisibility(wireFrame2, wireFrame3);
    timerReady();
});

playAgain.addEventListener("click", function () {
    showVisibility(wireFrame5, wireFrame3);
    timerReady();
});

/****** Functions for Wireframe 4 (Game) *******/
clickElement.addEventListener("click", function () {
    counterClicks++;
    movingElement();
});

// FUNCTIONS
function loadUser(userName, scores = "current playing") {
    //
    user.username = userName;
    user.scores = scores;

    if (arrayRanking === "null") {
        arrayRanking.push(user);
    } else {
        arrayRanking.unshift(user);
    }
    createList(arrayRanking);
}

function upLoadRanking() {
    console.log(localStorage.getItem("ranking"));
    if (localStorage.getItem("ranking") !== "null") {
        arrayRanking = JSON.parse(localStorage.getItem("ranking"));
        createList(arrayRanking);
    }
}

function finalStorageScore(score) {
    arrayRanking[0].scores = score;
    localStorage.setItem("ranking", JSON.stringify(arrayRanking));
}

function validateForm() {
    const regex = /^[^\s]+$/;
    if (userNameInput.value === "" || userNameInput.value === Number) {
        errorMessage.textContent = "Please insert a name";
        return false;
    } else if (!regex.test(userNameInput.value)) {
        errorMessage.textContent = "Please insert a name whitout blank spaces";
        return false;
    }
    return true;
}

//Timer of step three
function timerReady() {
    let timeToStart = 4;
    interval = setInterval(function () {
        //show countdown
        downcounter.textContent = timeToStart-1;
        console.log(downcounter.textContent);
        timeToStart--;
        if (timeToStart == 0) {
            stopReady();
        }
    }, 1000);
}

function stopReady() {
    setTimeout(function () {
        clearInterval(interval, 1000);
    }, 1000);
    showVisibility(wireFrame3, wireFrame4);
    timerGame();
}

//Timer of GAME
function timerGame(){
    let timeToEnd = 10;
    intervalGame = setInterval(function () {
        //show countdown
        console.log(timeToEnd);
        timeToEnd--;
        if (timeToEnd == 0) {
            stopGame();
        }
    }, 1000);
}

function stopGame(){
    setTimeout(function () {
        clearInterval(intervalGame, 1000);
    }, 5)
    showVisibility(wireFrame4, wireFrame5);
    arrayRanking[0].scores = counterClicks;
    counterClicks = 0;
    createList(arrayRanking);
    localStorage.setItem('ranking', JSON.stringify(arrayRanking));
}

function createList(array) {
    array.sort(function (obj1, obj2) {
        return obj2.scores - obj1.scores;
    });

    listScore.textContent = "";

    for (const item of array) {
        const liElement = document.createElement("li");
        const parr1 = document.createElement("p");
        const parr2 = document.createElement("p");
        parr1.textContent = item.username;
        parr2.textContent = item.scores;
        parr1.setAttribute("class", "nameBold");
        parr2.setAttribute("class", "score");
        liElement.appendChild(parr1);
        liElement.appendChild(parr2);
        listScore.appendChild(liElement);
    }
}