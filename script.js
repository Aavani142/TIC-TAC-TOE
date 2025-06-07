const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const message = document.getElementById('statusMessage');
const restartBtn = document.getElementById('restartBtn');
const scoreX = document.getElementById('scoreX');
const scoreO = document.getElementById('scoreO');

let xTurn = true;
let xScore = 0;
let oScore = 0;
let gameOver = false;

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

startGame();

restartBtn.addEventListener('click', startGame);

function startGame() {
  xTurn = true;
  gameOver = false;
  message.textContent = "";
  cells.forEach(cell => {
    cell.classList.remove('x', 'o');
    cell.textContent = "";
    cell.addEventListener('click', handleClick, { once: true });
  });
}

function handleClick(e) {
  if (gameOver) return;
  const cell = e.target;
  const currentClass = xTurn ? 'x' : 'o';
  placeMark(cell, currentClass);

  if (checkWin(currentClass)) {
    gameOver = true;
    endGame(false, currentClass);
  } else if (isDraw()) {
    gameOver = true;
    endGame(true);
  } else {
    xTurn = !xTurn;
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
  cell.textContent = currentClass.toUpperCase();
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(comb => {
    return comb.every(index => {
      return cells[index].classList.contains(currentClass);
    });
  });
}

function isDraw() {
  return [...cells].every(cell =>
    cell.classList.contains('x') || cell.classList.contains('o')
  );
}

function endGame(draw, winner) {
  if (draw) {
    message.textContent = "😐 It's a Draw!";
  } else {
    message.textContent = `🎉 ${winner.toUpperCase()} Wins!`;
    if (winner === 'x') {
      xScore++;
      scoreX.textContent = xScore;
    } else {
      oScore++;
      scoreO.textContent = oScore;
    }
  }

  cells.forEach(cell => {
    cell.removeEventListener('click', handleClick);
  });
}

