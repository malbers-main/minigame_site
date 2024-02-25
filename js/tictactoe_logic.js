const rows = 3;
const cols = 3;

// Holds the value of the next piece to be played (X or O)
export var nextPiece;
// 3x3 matrix which holds the board state
export var board;
// 1 if X, 0 if O, -1 if draw, -2 if game is in progress
export var winner;

/*-----------------------------------------------------------------------------------------------*/

// Initialize board state and reset all global values
function startGame() {
  size = 0;
  nextPiece = -1;
  winner = -2;

  // If the board has been initialized just clear its values, if not then initialize it
  if (board) {
    clearBoard();
  } else {
    initializeBoard();
  }

  pickFirstPlayer();
}

// Create 3x3 board and initialize all values to -1
function initializeBoard() {
  board = Array.from({ length: rows }, () => Array(cols).fill(-1));
}

// Reset all board values to -1
function clearBoard() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      board[i][j] = -1;
    }
  }
}

// Return number of moves made
function calculateBoardSize() {
  var count = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (board[i][j] != -1) {
        count++;
      }
    }
  }
  size = count;
}

/*-----------------------------------------------------------------------------------------------*/

// Places new piece onto the board and switches the next piece to the other player
function placePiece(index) {
  placePieceByIndex(index);
  checkWinner(nextPiece);
  toggleNextPiece();
}

// Helper function to convert index to rows and columns
function placePieceByIndex(index) {
  switch (index) {
    case 0:
      placePieceRowCol(0, 0);
      break;
    case 1:
      placePieceRowCol(0, 1);
      break;
    case 2:
      placePieceRowCol(0, 2);
      break;
    case 3:
      placePieceRowCol(1, 0);
      break;
    case 4:
      placePieceRowCol(1, 1);
      break;
    case 5:
      placePieceRowCol(1, 2);
      break;
    case 6:
      placePieceRowCol(2, 0);
      break;
    case 7:
      placePieceRowCol(2, 1);
      break;
    case 8:
      placePieceRowCol(2, 2);
      break;
  }
}

// Helper function to place the piece in the correct area on the board
function placePieceRowCol(row, column) {
  board[row][column] = nextPiece;
}

/*-----------------------------------------------------------------------------------------------*/

function checkWinner(player) {
  if (determineWinner(player)) {
    return winner;
  }

  // If there is no winner found then see if the board is full or not and determine if its a tie
  if (calculateBoardSize() === 9) {
    winner = -1;
  } else {
    winner = -2;
  }

  return winner;
}

function determineWinner(player) {
  if (
    checkWinnerRows(player) ||
    checkWinnerCols(player) ||
    checkWinnerDiag(player)
  ) {
    return true;
  }
  return false;
}

function checkWinnerRows(player) {
  let count;

  for (let i = 0; i < rows; i++) {
    count = 0;
    for (let j = 0; j < cols; j++) {
      if (board[i][j] === player) {
        count++;
      }
    }
    if (count === cols) {
      winner = player;
      return true;
    }
  }
  return false;
}

function checkWinnerCols(player) {
  let count;

  for (let i = 0; i < cols; i++) {
    count = 0;
    for (let j = 0; j < rows; j++) {
      if (board[j][i] === player) {
        count++;
      }
    }
    if (count === rows) {
      winner = player;
      return true;
    }
  }
  return false;
}

function checkWinnerDiag(player) {
  let count = 0;

  for (let i = 0; i < rows; i++) {
    if (board[i][i] === player) {
      count++;
    }
  }
  if (count === rows) {
    winner = player;
    return true;
  }

  count = 0;
  for (let i = rows - 1; i >= 0; i--) {
    for (let j = 0; j < cols; j++) {
      if (board[i][j] === player) {
        count++;
      }
    }
  }
  if (count === rows) {
    winner = player;
    return true;
  }

  return false;
}

/*-----------------------------------------------------------------------------------------------*/

function toggleNextPiece() {
  nextPiece = nextPiece === 0 ? 1 : 0;
}

function pickFirstPlayer() {
  nextPiece = Math.round(Math.random());
}
