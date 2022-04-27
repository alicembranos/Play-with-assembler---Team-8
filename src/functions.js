import {
    wireFrame3,
    wireFrame4,
    wireFrame5,
    counterClicks,
    clickElement
} from "./main.js";

let arrayRanking = [];
const userNameInput = document.getElementById("username");
let interval;
let intervalGame;
let timeToStart = 4;

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
    console.log(localStorage.getItem("ranking"));
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
    }
    return true;
}

/* Load final score in wireframe 5 */
function loadFinalScore(username, score) {
    const p1 = document.querySelector(".finalGameUser__p");
    const p2 = document.querySelector(".finalGameScore__p");

    if (p1) {
        p1.remove();
        p2.remove();
    }

    const gameOver = document.getElementById("gameOver");
    const parr1 = document.createElement("p");
    const parr2 = document.createElement("p");
    parr1.textContent = `${username} your score is`;
    parr2.textContent = `${score} clicks 🍻`;
    parr1.setAttribute("class", "finalGameUser__p");
    parr2.setAttribute("class", "finalGameScore__p");
    gameOver.appendChild(parr1);
    gameOver.appendChild(parr2);

}

/* Downcounter 3 seconds start game */
function timerReady() {
    interval = setInterval(function () {
        //show countdown
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
        timeToEnd--;
        if (timeToEnd == 0) {
            stopGame();
        }
    }, 1000);
}

/* Stop Downcounter 10 seconds play game time*/
function stopGame() {
    setTimeout(function () {
        clearInterval(intervalGame, 1000);
    }, 5);
    clickElement.classList.add("hide");
    setTimeout(function() {
        showVisibility(wireFrame4, wireFrame5);
    },3000)
    //Find the current user in the ranking
    const currentUser = arrayRanking.find(item => item.username == user.username);
    currentUser.scores = counterClicks;
    // arrayRanking[0].scores = counterClicks;
    // loadFinalScore(arrayRanking[0].username, arrayRanking[0].scores);
    loadFinalScore(currentUser.username, currentUser.scores);
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

export {
    showVisibility,
    movingElement,
    loadUser,
    upLoadRanking,
    timerGame,
    timerReady,
    validateForm,
};