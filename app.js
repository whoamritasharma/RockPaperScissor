let userWins = 0;
let compWins = 0;
let draws = 0;
let gameStarted = false;
let countdown;

const choices = document.querySelectorAll(".choice");
const startButton = document.querySelector("#startButton");
const timerElement = document.querySelector("#timeLeft");
const message = document.querySelector("#message");
const compWinsPara = document.querySelector("#compWins");
const userWinsPara = document.querySelector("#userWins");
const drawsPara = document.querySelector("#draws");
const compImg = document.querySelector("#compImg");
const userImg = document.querySelector("#userImg");
const popup = document.getElementById("popup");
const popupMessage = document.getElementById("popupMessage");
const popupButton = document.getElementById("popupButton");

const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  const choice = options[randIdx];
  compImg.src = `images/${choice}.png`;
  compImg.alt = `Computer chose ${choice}`;
  return choice;
};

const startGame = () => {
  console.log("Start button clicked.");
  if (!gameStarted) {
    console.log("Game started.");
    gameStarted = true;
    startButton.disabled = true;
    clearInterval(countdown);
    playRound();
  }
};

const playRound = () => {
  console.log("Playing round.");
  message.textContent = 'Game is in progress...';
  let timer = 3;

  countdown = setTimeout(() => {
    finishRound(true);
  }, timer * 1000);

  const timerId = setInterval(() => {
    timerElement.textContent = `${--timer} `;
    if (timer <= 0) {
      clearInterval(timerId);
      clearTimeout(countdown);
      finishRound(false);
    }
  }, 1000);
};

const finishRound = (timeout) => {
  console.log("Finishing round.");
  gameStarted = false;
  startButton.disabled = false;
  timerElement.textContent = '3 ';
  if (timeout) {
    showPopup('Time out! You did not make a choice.');
  } else {
    message.textContent = 'Play your move';
  }
  userImg.src = '';
  userImg.alt = '';
  compImg.src = '';
  compImg.alt = '';
};

const updateScoreboard = (userChoice, compChoice) => {
  if (userChoice === compChoice) {
    draws++;
    message.textContent = "It's a draw!";
    drawsPara.textContent = draws;
  } else {
    let winConditions = {
      'rock': 'scissors',
      'paper': 'rock',
      'scissors': 'paper'
    };
    if (winConditions[userChoice] === compChoice) {
      userWins++;
      message.textContent = 'You win!';
      userWinsPara.textContent = userWins;
    } else {
      compWins++;
      message.textContent = 'Computer wins!';
      compWinsPara.textContent = compWins;
    }
  }
};

choices.forEach(choice => {
  choice.addEventListener("click", function() {
    if (gameStarted) {
      userImg.src = this.children[0].src;
      userImg.alt = `You chose ${this.id}`;
      clearInterval(countdown);
      updateScoreboard(this.id, genCompChoice());
    }
  });
});

startButton.addEventListener("click", startGame);


const showPopup = (message) => {
  popupMessage.textContent = message;
  popup.classList.remove("hidden");
};

const hidePopup = () => {
  popup.classList.add("hidden");
};

popupButton.addEventListener("click", hidePopup);
