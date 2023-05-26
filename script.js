let userScore = 0,
  computerScore = 0;
const maxScore = 10;
let gameWon = false;

// Function to generate a random move for the computer
function generateComputerMove() {
  const moves = ["rock", "paper", "scissor"];
  const randomIndex = Math.floor(Math.random() * moves.length);
  return moves[randomIndex];
}

// Function to calculate the winner
function calculateWinner(playerMove, computerMove) {
  let winner,
    userWon = false,
    computerWon = false;

  if (playerMove === computerMove) {
    winner = "It's a tie!";
  } else if (
    (playerMove === "rock" && computerMove === "scissor") ||
    (playerMove === "paper" && computerMove === "rock") ||
    (playerMove === "scissor" && computerMove === "paper")
  ) {
    winner = "Player wins!";
    userWon = true;
  } else {
    winner = "Computer wins!";
    computerWon = true;
  }
  return {
    message: winner,
    className: userWon ? "" : computerWon ? "error" : "info",
    userWon,
    computerWon,
  };
}

// Function to handle user input
function handleUserInput(input) {
  const playerMove = input.toLowerCase();

  if (playerMove === "restart") {
    restartGame();
    // Add your restart logic here
  } else if (playerMove === "exit") {
    console.log("Game exited");
    // Add your exit logic here
  } else if (
    playerMove === "rock" ||
    playerMove === "paper" ||
    playerMove === "scissor"
  ) {
    if (gameWon) return;
    const computerMove = generateComputerMove();
    const winner = calculateWinner(playerMove, computerMove);
    showMoves(playerMove, computerMove, winner);
  }
}

function showMessage(message, className, delay) {
  setTimeout(() => {
    const messageElement = document.getElementById("message");
    messageElement.innerText = message;
    messageElement.className = ["active", className].join(" ");

    setTimeout(() => {
      messageElement.className = "message";
    }, 1000);
  }, delay || 0);
}

const showMoves = (playerMove, computerMove, winner) => {
  const userDisplay = document.getElementById("user-" + playerMove);
  const compDisplay = document.getElementById("computer-" + computerMove);

  userDisplay.classList.add("active");
  compDisplay.classList.add("active");

  setTimeout(() => {
    userDisplay.classList.remove("active");
    compDisplay.classList.remove("active");
  }, 2000);

  showMessage(winner.message, winner.className, 1000);

  if (winner.userWon) {
    userScore++;
    updateScore(userScore, "user");
  } else if (winner.computerWon) {
    computerScore++;
    updateScore(computerScore, "computer");
  }
};

const restartGame = () => {
  updateScore(0, "user");
  updateScore(0, "computer");
  gameWon = false;
  userScore = 0;
  computerScore = 0;
  showMessage("Game restarted!", "info");
};

function updateScore(score, user) {
  const scoreElement = document.getElementById(user + "-score");
  let cscore = ((maxScore - score) / maxScore) * -3 + "em";
  //   set cscore css variable
  scoreElement.parentElement.style.setProperty("--cscore", cscore);

  scoreElement.innerHTML = score;
  if (score === maxScore) {
    gameWon = true;
    showMessage(user + " won the game!", "success");
  }
}

const actionElements = document.querySelector(".actions").children;

for (let element of actionElements) {
  element.addEventListener("click", (event) => {
    // get data-value attribute of the clicked element
    const move = event.target.getAttribute("data-value");
    handleUserInput(move);
  });
}

// restartGame();
