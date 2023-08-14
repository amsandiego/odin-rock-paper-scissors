const OBJECTS = ["rock", "paper", "scissors"];
let playerScore = 0;
let compScore = 0;
const buttons = document.querySelectorAll("button");

function getComputerChoice() {
  const idx = getRandomInt(0, 2);
  const chosen = OBJECTS[idx];
  return chosen;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const choices = document.querySelectorAll(".choices i");
const playerScoreDisplay = document.querySelector("#player-score");
const compScoreDisplay = document.querySelector("#comp-score");
const roundResult = document.querySelector("#round-result");
const finalResult = document.querySelector("#final-result");
const playerChoice = document.querySelector("#player-choice");
const compChoice = document.querySelector("#computer-choice");
const restartGame = document.querySelector("#restart-game");
const section = document.querySelector("section");
const overlay = document.querySelector(".overlay");

choices.forEach((choice) => {
  choice.addEventListener("click", playRound);
});

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function playRound() {
  let playerSelection = this.id;
  let computerSelection = getComputerChoice();
  const winnerVsLoser = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper",
  };
  let winner = "";

  if (winnerVsLoser[playerSelection] === computerSelection) {
    winner = "player";
  } else if (winnerVsLoser[computerSelection] === playerSelection) {
    winner = "computer";
  }

  playerChoice.className = `fas fa-hand-${playerSelection}`;
  compChoice.className = `fas fa-hand-${computerSelection}`;

  if (playerScore < 5 && compScore < 5) {
    if (winner === "player") {
      playerScore++;
      roundResult.textContent = `You win! ${capitalize(
        playerSelection
      )} beats ${computerSelection}.`;
      playerScoreDisplay.textContent = playerScore;
      playerChoice.classList.remove("lose-color", "tie-color");
      playerChoice.classList.add("win-color");
      compChoice.classList.remove("win-color", "tie-color");
      compChoice.classList.add("lose-color");
    } else if (winner === "computer") {
      compScore++;
      roundResult.textContent = `You lose! ${capitalize(
        computerSelection
      )} beats ${playerSelection}.`;
      compScoreDisplay.textContent = compScore;
      compChoice.classList.remove("lose-color", "tie-color");
      compChoice.classList.add("win-color");
      playerChoice.classList.remove("win-color", "tie-color");
      playerChoice.classList.add("lose-color");
    } else {
      roundResult.textContent = "It's a tie!";
      compChoice.classList.remove("lose-color", "win-color");
      compChoice.classList.add("tie-color");
      playerChoice.classList.remove("lose-color", "win-color");
      playerChoice.classList.add("tie-color");
    }

    if (playerScore === 5 || compScore === 5) {
      finalResult.textContent =
        playerScore > compScore
          ? "WINNER, WINNER, CHICKEN DINNER!"
          : "YOU'RE DEFEATED!";

      finalResult.style.color = playerScore > compScore ? "#fece00" : "#37dbbd";

      showModal();
    }
  }
}

function restart() {
  playerScore = 0;
  compScore = 0;
  playerChoice.className = "";
  compChoice.className = "";
  roundResult.textContent = "";
  playerScoreDisplay.textContent = "0";
  compScoreDisplay.textContent = "0";
  playerChoice.className = "";
  compChoice.className = "";
  section.classList.remove("active");
}

function showModal() {
  section.classList.add("active");
}

restartGame.addEventListener("click", restart);
