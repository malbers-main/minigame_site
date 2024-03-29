import { displayBoard, clearDisplays } from "./tictactoe_display.js";

export const rows = 3;
export const cols = 3;

// Holds the value of the next piece to be played (X or O)
export var nextPiece;
// 3x3 matrix which holds the board state
export var board;
// 1 if X, 0 if O, -1 if draw, -2 if game is in progress
export var winner;

/*-----------------------------------------------------------------------------------------------*/

// Initialize board state and reset all global values
function startGame() {
  nextPiece = -1;
  winner = -2;

  // If the board has been initialized just clear its values, if not then initialize it
  if (board) {
    clearBoard();
  } else {
    initializeBoard();
  }
  pickFirstPlayer();
  clearDisplays();
  displayBoard(board);
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
  if (!board) {
    return;
  }
  var count = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (board[i][j] != -1) {
        count++;
      }
    }
  }
  return count;
}

/*-----------------------------------------------------------------------------------------------*/

// Places new piece onto the board and switches the next piece to the other player
function placePiece(index) {
  // New piece only placed if board isn't full, board is initialized, and a winner or tie has not been foundÏ
  if (calculateBoardSize() === 9 || !board || winner != -2) {
    return;
  }

  // Only check for the winner and toggle the next piece if a piece was placed
  if (placePieceByIndex(index)) {
    checkWinner(nextPiece);
    toggleNextPiece();
  }
}

// Helper function to convert index to rows and columns
function placePieceByIndex(index) {
  switch (index) {
    case 0:
      if (placePieceRowCol(0, 0)) {
        return true;
      }
      break;
    case 1:
      if (placePieceRowCol(0, 1)) {
        return true;
      }
      break;
    case 2:
      if (placePieceRowCol(0, 2)) {
        return true;
      }
      break;
    case 3:
      if (placePieceRowCol(1, 0)) {
        return true;
      }
      break;
    case 4:
      if (placePieceRowCol(1, 1)) {
        return true;
      }
      break;
    case 5:
      if (placePieceRowCol(1, 2)) {
        return true;
      }
      break;
    case 6:
      if (placePieceRowCol(2, 0)) {
        return true;
      }
      break;
    case 7:
      if (placePieceRowCol(2, 1)) {
        return true;
      }
      break;
    case 8:
      if (placePieceRowCol(2, 2)) {
        return true;
      }
      break;
  }
  return false;
}

// Helper function to place the piece in the correct area on the board
function placePieceRowCol(row, column) {
  // Only place piece if its not already populated
  if (board[row][column] != -1) {
    return false;
  }
  board[row][column] = nextPiece;
  return true;
}

/*-----------------------------------------------------------------------------------------------*/

// Changes 'winner' global variable to reflect if a winner or tie has been found, or if the game is ongoing
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

// Checks if the player has any wins
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

// Checks if the player has wins in any of the rows
function checkWinnerRows(player) {
  let count = 0;

  for (let i = 0; i < rows; i++) {
    count = 0;
    for (let j = 0; j < cols; j++) {
      if (board[i][j] === player) {
        count++;
      }
    }
    if (count === cols) {
      winner = player;
      console.log("Row Victory");
      return true;
    }
  }
  return false;
}

// Checks if the player has wins in any of the columns
function checkWinnerCols(player) {
  let count = 0;

  for (let i = 0; i < cols; i++) {
    count = 0;
    for (let j = 0; j < rows; j++) {
      if (board[j][i] === player) {
        count++;
      }
    }
    if (count === rows) {
      winner = player;
      console.log("Column Victory");
      return true;
    }
  }
  return false;
}

// Checks if the player has wins on the diagonals
function checkWinnerDiag(player) {
  let countDiag1 = 0; // Count for diagonal from top-left to bottom-right
  let countDiag2 = 0; // Count for diagonal from top-right to bottom-left

  // Check diagonal from top-left to bottom-right
  for (let i = 0; i < rows; i++) {
    if (board[i][i] === player) {
      countDiag1++;
    }
  }

  // Check diagonal from top-right to bottom-left
  for (let i = 0; i < rows; i++) {
    if (board[i][rows - 1 - i] === player) {
      countDiag2++;
    }
  }

  // Check if either diagonal has a winning sequence
  if (countDiag1 === rows || countDiag2 === rows) {
    winner = player;
    console.log("Diagonal Victory");
    return true;
  }

  return false;
}

// Returns indices of winning boxes
export function getWinningBoxes(board, winner) {
    // Define all possible winning combinations
    const winningCombos = [
        [[0, 0], [0, 1], [0, 2]], // Top row
        [[1, 0], [1, 1], [1, 2]], // Middle row
        [[2, 0], [2, 1], [2, 2]], // Bottom row
        [[0, 0], [1, 0], [2, 0]], // Left column
        [[0, 1], [1, 1], [2, 1]], // Middle column
        [[0, 2], [1, 2], [2, 2]], // Right column
        [[0, 0], [1, 1], [2, 2]], // Diagonal from top-left to bottom-right
        [[0, 2], [1, 1], [2, 0]]  // Diagonal from top-right to bottom-left
    ];

    // Array to store the winning indices
    let winningIndices = [];

    // Iterate through each winning combination
    for (const combo of winningCombos) {
        const [[aX, aY], [bX, bY], [cX, cY]] = combo;
        // Check if the winner occupies all positions in the current combination
        if (board[aX][aY] === winner && board[bX][bY] === winner && board[cX][cY] === winner) {
            // If yes, add the winning indices to the array
            winningIndices.push(...[aX * 3 + aY, bX * 3 + bY, cX * 3 + cY]);
        }
    }

    // Return the array of winning indices
    return winningIndices;
}

/*-----------------------------------------------------------------------------------------------*/

function setupPage() {
  const gridBoxes = document.querySelectorAll(".gridBox");
  gridBoxes.forEach(function (box) {
    box.addEventListener("click", function () {
      let boxNumber = parseInt(box.id[3]);
      // Piece is only placed and the board is only updated if the board is initialized
      if (board) {
        placePiece(boxNumber);
        displayBoard(board);
      }
    });
  });

  startGame();
}

/*-----------------------------------------------------------------------------------------------*/

// Switches player from X to O or O to X
function toggleNextPiece() {
  nextPiece = nextPiece === 0 ? 1 : 0;
}

// Randomly selects 0 or 1 to represent the first player
function pickFirstPlayer() {
  nextPiece = Math.round(Math.random());
}

/*-----------------------------------------------------------------------------------------------*/

// Start game button event listener
const startButton = document.getElementById("startButton");
startButton.addEventListener("click", function () {
  startGame();
});

// Event listener to initialize functions for objects and begin the game once the DOM content is loaded
document.addEventListener("DOMContentLoaded", setupPage());
