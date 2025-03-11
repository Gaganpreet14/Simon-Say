/*
Task 1: To start the game and game will be started on pressing any key.
Therefore, i need to detect if any key is pressed so i need to add event listener to check keypress on whole doc.

Task 2: Game will be started only once. Therefore, i need to TRACK if the game is started or not too.

Task 3: Once the game is started, we need to track the level. So h2 heading will also show the Level number.

Task 4: As the game has started so now the game will flash any random div.

Task 4: Now user has to press the same button which has flashed, so we need to detect which button was pressed by user.

Task 5: Selecting all the buttons and then applying event listener on those buttons, to check if that button is pressed or not.
And applying flash effect on the pressed button.

Task 6: Tracking userSeq and gameSeq.

Task 7: Even after tracking the sequence, we need to match the sequence. If sequence is matched then it means that game will continue. Incase of wrong answer, game will be over.

Task 8: Even if the sequence matched is correct, there can be 2 cases.
Case 1: The user is in the middle of the sequence so the user will keep on pressing the button.
Case 2: User has pressed th elast of the button, so the level will increment.

Task 9: Re-initialize userSeq to empty array as user has to enter the sequence from the start.

Task 10: We need to keep track of the level so that can be done by useerSeq.length-1 as by that we will be able to know what is the last index.
*/

let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;

let btns = ["col1", "col2", "col3", "col4",]

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
    if (started === false) {
        console.log("Game started.");
        started = true;
        levelUp();
    }
});

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randomIdx = Math.floor(Math.random() * 4);
    let randomBtn = btns[randomIdx];
    let randomColor = document.querySelector(`.${randomBtn}`);
    flashBtn(randomColor);
    gameSeq.push(randomBtn);
    console.log(gameSeq);
}

function flashBtn(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 150);
}

function checkAns(idx) {
    console.log(level);
    if (gameSeq[idx] === userSeq[idx]) {
        if(gameSeq.length == userSeq.length){
            setTimeout(levelUp, 1000);
        }
    }
    else {   
        h2.innerHTML = `Game over! Your score is <b> ${level} </b>. <br /> Press any key to start.`;
        document.querySelector("body").style.backgroundColor = 'red';
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = 'white';
        }, 250)
        reset();
    }
}

function btnPress() {
    let selectedBtn = this;
    this.classList.add("userFlash");
    setTimeout(function () {
        selectedBtn.classList.remove("userFlash");
    }, 250);

    let userColor = selectedBtn.getAttribute('id');
    userSeq.push(userColor);
    console.log(userSeq);
    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}