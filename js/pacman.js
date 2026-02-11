'use strict';

const PACMAN = '😁';
const SUPERPACMAN = '👿';
var gPacman;
var gFoodCount = 0;
var gTimeOutId = null;

function createPacman(board) {
  // TODO: initialize gPacman...
  gPacman = {
    pos: { i: 5, j: 5 },
    isSuper: false,
  };
  board[gPacman.pos.i][gPacman.pos.j] = PACMAN;
}

function movePacman(ev) {
  if (!gGame.isOn) return;

  // TODO: use getNextPos(), nextCell
  const currPos = gPacman.pos;
  const nextPos = getNextPos(ev);
  if (!nextPos) return;

  const nextCell = gBoard[nextPos.i][nextPos.j];

  // TODO: return if cannot move
  if (nextCell === WALL) return;

  // TODO: hitting a ghost? call gameOver
  if (nextCell === GHOST) {
    if (gPacman.isSuper) {
      gGhostsEatenCount++;
      gGhosts = gGhosts.filter(
        (ghost) => ghost.pos.i !== nextPos.i && ghost.pos.j !== nextPos.j,
      );
    } else {
      gGame.isOn = false;
      gameOver();
      return;
    }
  }
  if (nextCell === SUPER) {
    if (gPacman.isSuper) return;
    gPacman.isSuper = true;
    gGhostsEatenCount = 0;

    gTimeOutId = setTimeout(() => {
      gPacman.isSuper = false;
      gBoard[gPacman.pos.i][gPacman.pos.j] = PACMAN;
      renderCell(gPacman.pos, PACMAN);

      if (gGhosts.length === 3) return;
      createGhosts(gBoard);
    }, 5000);
  }

  // TODO: hitting food? call updateScore
  if (nextCell === FOOD) {
    gFoodCount--;
    updateScore(1);
    winGame();
  }

  if (nextCell === CHERRY) updateScore(10);

  // TODO: moving from current pos:
  // TODO: update the model
  gBoard[currPos.i][currPos.j] = EMPTY;

  // TODO: update the DOM
  renderCell(currPos, EMPTY);

  // TODO: Move the pacman to new pos:
  // TODO: update the model
  gPacman.pos = nextPos;

  if (gPacman.isSuper) {
    gBoard[gPacman.pos.i][gPacman.pos.j] = SUPERPACMAN;
    renderCell(gPacman.pos, SUPERPACMAN);
    return;
  }

  gBoard[gPacman.pos.i][gPacman.pos.j] = PACMAN;

  // TODO: update the DOM
  renderCell(gPacman.pos, PACMAN);
}

function getNextPos(ev) {
  var nextPos = { i: gPacman.pos.i, j: gPacman.pos.j };
  // TODO: figure out nextPos
  switch (ev.key) {
    case 'ArrowUp':
      nextPos.i--;
      break;

    case 'ArrowDown':
      nextPos.i++;
      break;

    case 'ArrowLeft':
      nextPos.j--;
      break;

    case 'ArrowRight':
      nextPos.j++;
      break;

    default:
      return null;
  }
  return nextPos;
}
