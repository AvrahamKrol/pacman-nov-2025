'use strict';

function renderBoard(mat, selector) {
  var strHTML = '<table><tbody>';
  for (var i = 0; i < mat.length; i++) {
    strHTML += '<tr>';
    for (var j = 0; j < mat[0].length; j++) {
      const cell = mat[i][j];
      const className = `cell cell-${i}-${j}`;

      strHTML += `<td class="${className}">${cell}</td>`;
    }
    strHTML += '</tr>';
  }
  strHTML += '</tbody></table>';

  const elContainer = document.querySelector(selector);
  elContainer.innerHTML = strHTML;
}

// pos is an object like this - { i: 2, j: 7 }
function renderCell(pos, value) {
  // Select the elCell and set the value
  const elCell = document.querySelector(`.cell-${pos.i}-${pos.j}`);
  elCell.innerHTML = value;
}

function clearAll() {
  clearInterval(gGhostsInterval);
  clearTimeout(gTimeOutId);
  gGhostsInterval = null;
  gTimeOutId = null;
  gGhosts = [];
  gGhostsEatenCount = 0;
  gGame.score = 0;
  gFoodCount = 0;
  updateScore(0);
}

function toggleModal() {
  var message = '';
  const modal = document.querySelector('.modal');
  const table = document.querySelector('table');
  table.style.display = !gGame.isOn ? 'none' : 'table';
  modal.style.display = !gGame.isOn ? 'flex' : 'none';
  message = gIsWin
    ? `VICTORY!!! Your total score is ${gGame.score}`
    : 'GAME OVER';
  modal.innerHTML = `
    ${message}
    <button onclick="restartGame()">PLAY AGAIN</button>
  `;
}

function getFoodCount(board) {
  for (var i = 1; i < board.length - 1; i++) {
    for (var j = 1; j < board[0].length - 1; j++) {
      if (board[i][j] === FOOD) gFoodCount++;
    }
  }
  console.log(gFoodCount);
}

function getRandomCell(emptyCells) {
  if (!emptyCells.length) return;

  const length = emptyCells.length;
  const randomIdx = getRandomIntInclusive(0, length - 1);
  return emptyCells[randomIdx];
}

function getEmptyCells(board) {
  gEmptyCells = [];
  for (var i = 1; i < board.length - 1; i++) {
    for (var j = 1; j < board[0].length - 1; j++) {
      if (board[i][j] === ' ') {
        const emptyCell = { i, j };
        gEmptyCells.push(emptyCell);
      }
    }
  }
}

function getGhostColor(ghost) {
  return !gPacman.isSuper ? ghost.color : 'darkblue';
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
