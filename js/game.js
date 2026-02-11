'use strict';

const WALL = '&#8251;';
const FOOD = '&middot;';
const CHERRY = '🍒';
const SUPER = '🍯';
const EMPTY = ' ';

const gGame = {
  score: 0,
  isOn: false,
};
var gBoard;
var gIsWin = false;
var gEmptyCells = [];

function init() {
  gBoard = buildBoard();
  createPacman(gBoard);
  createGhosts(gBoard);
  getFoodCount(gBoard);
  setInterval(() => {
    getEmptyCells(gBoard);
    if (!gEmptyCells.length) return;

    const randomCell = getRandomCell(gEmptyCells);
    const i = randomCell.i;
    const j = randomCell.j;
    gBoard[i][j] = CHERRY;
    renderCell({ i, j }, CHERRY);
  }, 15000);

  renderBoard(gBoard, '.board-container');
  gGame.isOn = true;
}

function buildBoard() {
  const size = 10;
  const board = [];

  for (var i = 0; i < size; i++) {
    board.push([]);

    for (var j = 0; j < size; j++) {
      board[i][j] = FOOD;

      if (
        i === 0 ||
        i === size - 1 ||
        j === 0 ||
        j === size - 1 ||
        (j === 3 && i > 4 && i < size - 2)
      ) {
        board[i][j] = WALL;
      }
      if (
        (i === 1 && j === 1) ||
        (i === size - 2 && j === 1) ||
        (j === size - 2 && i === 1) ||
        (j === size - 2 && i === size - 2)
      ) {
        board[i][j] = SUPER;
      }
    }
  }
  return board;
}

function updateScore(diff) {
  // update model
  gGame.score += diff;

  // update DOM
  const elScore = document.querySelector('.score span');
  elScore.innerText = gGame.score;
}

function winGame() {
  if (gFoodCount === 0) {
    gGame.isOn = false;
    gIsWin = true;
    toggleModal();
  }
}

function restartGame() {
  gGame.isOn = true;
  toggleModal();
  clearAll();
  init();
}

function gameOver() {
  console.log('Game Over');
  toggleModal();
  gGame.isOn = false;
}
