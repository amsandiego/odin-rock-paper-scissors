const OBJECTS = ["rock", "paper", "scissors"];
let playerScore = 0;
let compScore = 0;
const buttons = document.querySelectorAll("button");

// helper functions
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

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function disableButtons() {
  buttons.forEach((elem) => {
    elem.disabled = true;
  });
}

buttons.forEach((button) => {
  button.addEventListener("click", playRound);
});

function playRound(event) {
  let playerSelection = this.id;
  let computerSelection = getComputerChoice();
  const winnerVsLoser = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper",
  };
  let winner = "";
  let roundResult = "";
  let finalResult = "";

  let result = document.querySelector(".result");
  if (result.lastElementChild) result.removeChild(result.lastElementChild);

  if (winnerVsLoser[playerSelection] === computerSelection) {
    winner = "player";
  } else if (winnerVsLoser[computerSelection] === playerSelection) {
    winner = "computer";
  }

  if (playerScore !== 5 && compScore !== 5) {
    if (winner === "player") {
      roundResult = `You win! ${capitalize(
        playerSelection
      )} beats ${computerSelection}.`;
      playerScore++;
    } else if (winner === "computer") {
      roundResult = `You lose! ${capitalize(
        computerSelection
      )} beats ${playerSelection}.`;
      compScore++;
    } else {
      roundResult = "It's a tie!";
    }
  } else {
    disableButtons();
  }

  finalResult =
    playerScore === 5 ? "YOU WIN." : compScore === 5 ? "COMPUTER WINS!" : "";

  const tally = `Player score: ${playerScore} | Computer score: ${compScore}`;

  const p = document.createElement("p");
  p.innerHTML = `${roundResult} <br> ${tally} <br> ${finalResult}`;
  result.appendChild(p);
}
