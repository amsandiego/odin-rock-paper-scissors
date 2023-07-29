const OBJECTS = ['rock', 'paper', 'scissors'];
const ROUNDS = 5;

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


function playRound(playerSelection, computerSelection) {
    const winnerVsLoser = {
        'rock': 'scissors',
        'paper': 'rock',
        'scissors': 'paper'
    }
    let winner = '';

    if (winnerVsLoser[playerSelection] === computerSelection) {
        winner = 'player';
    }  else if (winnerVsLoser[computerSelection] === playerSelection) {
        winner = 'computer';
    }
    return winner;
}

function game() {
    let playerScore = 0;
    let compScore = 0;
    let roundResult = '';

    for (let i = 0; i < ROUNDS; i++) {
        let playerSelection = prompt('Enter your choice:').toLowerCase();
        let computerSelection = getComputerChoice();
        let winner = playRound(playerSelection, computerSelection);

        if (winner === 'player') {
            roundResult = `You win! ${playerSelection} beats ${computerSelection}.`;
            playerScore++;
        } else if (winner === 'computer') {
            roundResult = `You lose! ${computerSelection} beats ${playerSelection}.`;
            compScore++;
        } else {
            roundResult = "It's a tie!";
        }

        console.log(roundResult);
        console.log(`PLAYER: ${playerScore} | COMPUTER: ${compScore}`);
    } 

    if (playerScore > compScore) {
        console.log('Player wins!');
    } else if (compScore > playerScore) {
        console.log('Computer wins!');
    } else {
        console.log("There is no winner!");
    }
}

game();


