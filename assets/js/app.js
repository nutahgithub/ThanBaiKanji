const kingPicture = 'king.jpeg';
const commonerPicture = 'commoner.jpeg';
const slavePicture = 'slave.jpeg';

let kingIndex = 0;
let slaveIndex = 0;

// Card player choice
let cardTeamAchoice = null;
let cardTeamBchoice = null;

let listCardTeamA = document.querySelectorAll('.team-a .card');
let listCardTeamB = document.querySelectorAll('.team-b .card');

let cardChoiceTeamA = document.querySelector('.card-team-a .card');
let cardChoiceTeamB = document.querySelector('.card-team-b .card');


let arrayListRamainA = [1,1,1,1,1];
let arrayListRamainB = [1,1,1,1,1];


// Init screen
function init() {
    resetData();
    ResetResultChoice();
    kingIndex = Math.floor(Math.random() * 5);
    slaveIndex = Math.floor(Math.random() * 5);

    arrayListRamainA = [1,1,1,1,1];
    arrayListRamainB = [1,1,1,1,1];

    setDisplayCardA();
    setDisplayCardB();

    listCardTeamB = document.querySelectorAll('.team-b .card');
    document.querySelector(".btn-open-card").disabled = false;
}

// Click choice card
function choiceCard(card) {
    ResetResultChoice();
    setDisplayCardB();

    // Team B choice
    cardChoiceTeamB.innerHTML = card.innerHTML;
    card.innerHTML = '';
    card.classList.add('card-select-b');
    listCardTeamB = document.querySelectorAll('.team-b .card');
    cardTeamBchoice = getCardTeamBChoice();

    
    // team A choice
    if (cardTeamAchoice == null) {
        cardChoiceTeamA.classList.add('card-have');
        cardTeamAchoice = getTeamAChoiceRandom();
    }
    setDisplayCardA();
}

function getTeamAChoiceRandom() {
    while(1) {
        let result = Math.floor(Math.random() * 5);
        for (let i = 0; i < arrayListRamainA.length; i++) {
            if (arrayListRamainA[i] == 1 && result == i) {
                return result;
            }
        }
    }
}

function getCardTeamBChoice() {
    let lenghtListB = listCardTeamB.length;
    for(let i = 0; i < lenghtListB; i++) {
        let element = listCardTeamB[i];
        if (element.className.includes('card-select-b')) {
            return i;
        }
    }
}

// Set display card for init.
function setDisplayCardB(element) {
    let lenghtListB = listCardTeamB.length;
    for(let i = 0; i < lenghtListB; i++) {
        let element = listCardTeamB[i];
        element.classList.remove('card-select-b');
        if (arrayListRamainB[i] == 1) {
            if (slaveIndex == i) {
                element.innerHTML = `<img class="img" src="./assets/img/${slavePicture}">`;
            } else {
                element.innerHTML = `<img class="img" src="./assets/img/${commonerPicture}">`;
            }
        }
    }
    // When click result choice
    if(element != undefined) {
        element.innerHTML = '';
    }
}

// Set display card for init.
function setDisplayCardA(element) {
    let lenghtListA = listCardTeamA.length;
    for(let i = 0; i < lenghtListA; i++) {
        let element = listCardTeamA[i];
        if (arrayListRamainA[i] == 1) {
            element.classList.add('card-have');
            if (cardTeamAchoice == i) {
                element.classList.remove('card-have');
                element.classList.add('card-select-a');
            } else {
                element.classList.remove('card-select-a');
            }
        } else {
            element.classList.remove('card-select-a');
        }
    }
}

function openCard() {
    if (cardTeamAchoice == null || cardTeamBchoice == null) {
        alert('Bạn chưa chọn lá bài!')
        return;
    }
    if (cardTeamAchoice == kingIndex) {
        cardChoiceTeamA.innerHTML = `<img class="img" src="./assets/img/${kingPicture}">`;
    } else {
        cardChoiceTeamA.innerHTML = `<img class="img" src="./assets/img/${commonerPicture}">`;
    }

    let resultElement = document.querySelector('.result-game .result-content');
    if (cardTeamAchoice != kingIndex && cardTeamBchoice != slaveIndex) {
        resultElement.innerText = "Hoà! Hãy chọn lá bài tiếp theo...";
        resultElement.style.color = '#D3AB68';
    } else if (cardTeamAchoice == kingIndex && cardTeamBchoice == slaveIndex) {
        resultElement.innerText = "Xin chúc mừng! Bạn đã chiến thắng ^_^";
        resultElement.style.color = 'green';
        document.querySelector(".btn-open-card").disabled = true;
    } else {
        resultElement.innerText = "Thua cuộc! Chơi lại để phục thù nhé ...";
        resultElement.style.color = '#742e1A';
        document.querySelector(".btn-open-card").disabled = true;
    }
    arrayListRamainA[cardTeamAchoice] = 0;
    arrayListRamainB[cardTeamBchoice] = 0;
    resetData();
}

function resetData() {
    cardTeamAchoice = null;
    cardTeamBchoice = null;
}

function ResetResultChoice() {
    cardChoiceTeamA.innerHTML = '';
    cardChoiceTeamB.innerHTML = '';
}