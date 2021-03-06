import {
    wireFrame3,
    wireFrame4,
    wireFrame5,
    counterClicks,
    clickElement,
} from "./main.js";

const errorMessage = document.getElementById("error_messagge");

let arrayRanking = [];
const userNameInput = document.getElementById("username");
let interval;
let intervalGame;
let timeToStart = 4;
const clip = document.getElementById("audio");

const arrayUserImage = [
    "bear",
    "cat",
    "chicken",
    "cow",
    "deer",
    "dog",
    "fox",
    "monkey",
    "pig",
];

let user = {
    username: "",
    scores: 0,
    photoProfile: "",
};

/* Toggle between hide and show mode */
function showVisibility(current, next) {
    current.classList.toggle("hide");
    next.classList.toggle("hide");
}

/* Moving element randomly */
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

/* Resize element randomly depending on viewport size*/
function resizeElement() {
    const viewPortX = window.innerWidth;

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

/* Load user in wireframe 1 */
function loadUser(userName, scores = "current playing") {
    //
    user.username = userName;
    user.scores = scores;
    user.photoProfile = useImgProfile(arrayUserImage);

    if (arrayRanking === "null") {
        arrayRanking.push(user);
    } else {
        arrayRanking.unshift(user);
    }
    createList(arrayRanking);
}

function upLoadRanking() {
    if (localStorage.getItem("ranking") !== null) {
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
    } else if (existValue(arrayRanking, userNameInput.value)) {
        errorMessage.textContent = `${userNameInput.value} is already used, please enter another one`;
        return false;
    }

    return true;

}

function existValue(array, name) {
    for (const item of array) {
        if (item.username == name) {
            return true;
        }
    }
    return false;
}

/* Load final score in wireframe 5 */
function loadFinalScore(username, score, bestScore) {
    const p1 = document.querySelector(".finalGameUser__p");
    const p2 = document.querySelectorAll(".finalGameScore__p");

    if (p1) {
        p1.remove();
        p2[0].remove();
        p2[1].remove();
    }

    const gameOver = document.getElementById("gameOver");
    const parr1 = document.createElement("p");
    const parr2 = document.createElement("p");
    const parr3 = document.createElement("p");

    parr1.textContent = `${username} your score is`;
    parr2.textContent = `${score} clicks ????`;
    parr3.textContent = `Best score: ${bestScore}`;

    parr1.setAttribute("class", "finalGameUser__p");
    parr2.setAttribute("class", "finalGameScore__p");
    parr3.setAttribute("class", "finalGameScore__p");

    gameOver.appendChild(parr1);
    gameOver.appendChild(parr2);
    gameOver.appendChild(parr3);
}

/* Downcounter 3 seconds start game */
function timerReady() {
    interval = setInterval(function () {
        downcounter.textContent = timeToStart - 1;
        timeToStart--;
        if (timeToStart == 0) {
            stopReady();
            timeToStart = 4;
        }
    }, 1000);
}

/* Stop Downcounter 3 seconds start game */
function stopReady() {
    setTimeout(function () {
        clearInterval(interval, 1000);
    }, 1000);
    showVisibility(wireFrame3, wireFrame4);
    movingElement();
    timerGame();
}

/* Downcounter 10 seconds play game time*/
function timerGame() {
    let timeToEnd = 10;
    intervalGame = setInterval(function () {
        console.log(timeToEnd);
        clip.play();
        clip.volume = 0.5;
        timeToEnd--;
        if (timeToEnd == 0) {
            stopGame();
            clip.pause();
        }
    }, 1000);
}

/* Stop Downcounter 10 seconds play game time*/
function stopGame() {
    setTimeout(function () {
        clearInterval(intervalGame, 1000);
    }, 5);
    clickElement.classList.add("hide");
    setTimeout(function () {
        showVisibility(wireFrame4, wireFrame5);
    }, 3000);

    // Finding the higher score of the user when it??s not the first that he is playing
    const currentUser = arrayRanking.find(
        (item) =>
        item.username == user.username && item.scores !== "current playing"
    );

    // If he/she is the first is playing,
    if (currentUser === undefined) {
        const currentUser_2 = arrayRanking.find(
            (item) => item.username == user.username
        );
        currentUser_2.scores = counterClicks;
        loadFinalScore(currentUser_2.username, counterClicks, counterClicks);
    } else {
        if (compareScores(counterClicks, currentUser.scores)) {
            currentUser.scores = counterClicks;
        }
        loadFinalScore(currentUser.username, counterClicks, currentUser.scores);
    }
    createList(arrayRanking);
    localStorage.setItem("ranking", JSON.stringify(arrayRanking));
}

function createList(array) {
    array.sort(function (obj1, obj2) {
        return obj2.scores - obj1.scores;
    });

    listScore.textContent = "";

    for (const item of array) {
        const liElement = document.createElement("li");
        const img = document.createElement("img");
        const parr1 = document.createElement("p");
        const parr2 = document.createElement("p");
        img.src = item.photoProfile;
        parr1.textContent = item.username;
        parr2.textContent = item.scores;
        img.setAttribute("class", "ranking__img");
        parr1.setAttribute("class", "ranking__p--name");
        parr2.setAttribute("class", "ranking__p--score");
        liElement.setAttribute("class", "ranking__li--box");
        liElement.appendChild(img);
        liElement.appendChild(parr1);
        liElement.appendChild(parr2);
        listScore.appendChild(liElement);
    }
}

// Inser user image profile
function useImgProfile(arr) {
    const index = Math.floor(Math.random() * 8);
    const result = `./src/assets/images/${arr[index]}.png`;
    return result;
}

function compareScores(currNum, lastNum) {
    return currNum >= lastNum ? true : false;
}

export {
    showVisibility,
    movingElement,
    loadUser,
    upLoadRanking,
    timerReady,
    validateForm,
};