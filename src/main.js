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

// Storing user info in objects

let user = {
    username: "",
    //   currentPlaying: true,
    scores: 0,
};

let arrayRanking = [{
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

// localStorage.setItem("ranking", JSON.stringify(arrayRanking));

upLoadRanking();

startBtn.addEventListener("click", function () {
    if (validateForm()) {
        loadUser(userNameInput.value);

        showVisibility(wireFrame1, wireFrame2);
    }
});

start.addEventListener("click", function () {
    showVisibility(wireFrame2, wireFrame3);
});

playAgain.addEventListener("click", function () {
    <<
    << << < HEAD
    showVisibility(wireFrame5, wireFrame3); ===
    === =
    showVisibility(wireFrame5, wireFrame3); >>>
    >>> > c08ff8266dde4c474f3ccd22c83e8244df0d0ad3
});

/****** Functions for Wireframe 4 (Game) *******/
clickElement.addEventListener("click", function () {
    movingElement();
});

function loadUser(userName, scores = "current playing") {
    //
    user.username = userName;
    user.scores = scores;

    arrayRanking.unshift(user);
}

loadUser();

function upLoadRanking() {
    let arrayRanking = JSON.parse(localStorage.getItem("ranking"));

    if (arrayRanking !== null) {
        arrayRanking.sort(function (obj1, obj2) {
            return obj2.scores - obj1.scores;
        });

        for (const ranking of arrayRanking) {
            const liElement = document.createElement("li");
            const parr1 = document.createElement("p");
            const parr2 = document.createElement("p");
            parr1.textContent = ranking.username;
            parr2.textContent = ranking.scores;
            parr1.setAttribute("class", "nameBold");
            parr2.setAttribute("class", "score");
            liElement.appendChild(parr1);
            liElement.appendChild(parr2);
            listScore.appendChild(liElement);
        }
    }
}
upLoadRanking();

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