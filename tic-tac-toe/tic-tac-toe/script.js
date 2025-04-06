const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('statusText');
const overlay = document.getElementById('overlay');
const popupText = document.getElementById('popupText');
const emoji = document.getElementById('emoji');
const closePopup = document.getElementById('closePopup');
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
closePopup.addEventListener('click', restartGame);

function handleCellClick(event) {
  const cell = event.target;
  const index = cell.getAttribute('data-index');

  if (gameState[index] !== '' || !gameActive) {
    return;
  }

  gameState[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWin()) {
    setTimeout(() => showPopup(`${currentPlayer} wins!`), 300);
    gameActive = false;
    return;
  }

  if (gameState.every(cell => cell !== '')) {
    setTimeout(() => showPopup(`It's a draw!`), 300);
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWin() {
  return winConditions.some(condition => {
    return condition.every(index => gameState[index] === currentPlayer);
  });
}

function showPopup(message) {
  overlay.style.display = 'flex';
  popupText.textContent = message;
  emoji.textContent = message.includes('wins') ? '🔥' : '🤝';
}

function restartGame() {
  gameState.fill('');
  cells.forEach(cell => cell.textContent = '');
  currentPlayer = 'X';
  gameActive = true;
  statusText.textContent = `${currentPlayer}'s turn`;
  overlay.style.display = 'none';
}
