import {
    wireFrame3,
    wireFrame4,
    wireFrame5,
    counterClicks
} from './main.js';
let arrayRanking = [];
const userNameInput = document.getElementById("username");
let interval;
let intervalGame;
let timeToStart = 4;

let user = {
    username: "",
    scores: 0,
};

function showVisibility(current, next) {
    current.classList.toggle("hide");
    next.classList.toggle("hide");
}

function movingElement() {
    resizeElement();
    //Get the elements parent size
    let clientWidth = boardGame.clientWidth;
    let elementWidth = clickElement.clientWidth;
    let clientHeight = boardGame.clientHeight;
    let elementHeight = clickElement.clientHeight;

    //Limit to avoid going off screen
    let limitsX = clientWidth - elementWidth;
    let limitsY = clientHeight - elementHeight;
    let randY = Math.floor(Math.random() * limitsY);
    let randX = Math.floor(Math.random() * limitsX);

    clickElement.style.transform = `translate(${randX}px, ${randY}px)`;
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
            clickElement.style.height = getRandomSize(20, 100) + "px";
            clickElement.style.width = clickElement.style.height;
            // clickElement.style.width = getRandomSize(20, 100) + "px";
            break;
        case viewPortX > 480 && viewPortX <= 768:
            clickElement.style.height = getRandomSize(50, 200) + "px";
            clickElement.style.width = clickElement.style.height;
            // clickElement.style.width = getRandomSize(50, 200) + "px";
            break;
        case viewPortX > 768:
            clickElement.style.height = getRandomSize(50, 300) + "px";
            clickElement.style.width = clickElement.style.height;
            // clickElement.style.width = getRandomSize(50, 300) + "px";
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

/********************************************************************* */
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

function loadFinalScore(username, score) {
    const gameOver = document.getElementById("gameOver");
    const parr1 = document.createElement("p");
    const parr2 = document.createElement("p");
    parr1.textContent = `${username} your score is`;
    parr2.textContent = `${score} clicks&#127866`;
    parr1.setAttribute("class", "finalGameUser__p");
    parr2.setAttribute("class", "finalGameScore__p");
    gameOver.appendChild(parr1);
    gameOver.appendChild(parr2);
    
}
//Timer of step three
function timerReady() {
    interval = setInterval(function () {
        //show countdown
        downcounter.textContent = timeToStart - 1;
        console.log(downcounter.textContent);
        timeToStart--;
        if (timeToStart == 0) {
            stopReady();
            timeToStart = 4;
        }
    }, 1000);
}

function stopReady() {
    setTimeout(function () {
        clearInterval(interval, 1000);
    }, 1000);
    showVisibility(wireFrame3, wireFrame4);
    movingElement();
    timerGame();
}

//Timer of GAME
function timerGame() {
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

function stopGame() {
    setTimeout(function () {
        clearInterval(intervalGame, 1000);
    }, 5)
    showVisibility(wireFrame4, wireFrame5);
    arrayRanking[0].scores = counterClicks;
    createList(arrayRanking);
    localStorage.setItem('ranking', JSON.stringify(arrayRanking));
    loadFinalScore(arrayRanking[0].username, arrayRanking[0].scores);
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

export {
    showVisibility,
    movingElement,
    loadUser,
    upLoadRanking,
    timerGame,
    timerReady,
    validateForm
};