import { board, winner, nextPiece, rows, cols } from "./tictactoe_logic.js";

// Displays the board information as well as the winner and next player
export function displayBoard(board) {

  const gridBoxes = document.querySelectorAll(".gridBox");
  let boxCount = 0;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (board[i][j] === 0) {
        gridBoxes[boxCount].textContent = "O";
      } else if (board[i][j] === 1) {
        gridBoxes[boxCount].textContent = "X";
      }
      boxCount++;
    }
  }

  displayNextPlayer(nextPiece);
  displayWinner(winner);
}

// Displays what symbol is placed next 'I.E. who the current player is'
function displayNextPlayer(nextPiece) {
  // Get container element and clear inner html
  let nextPlayerDiv = document.getElementById("nextPlayerDisplay");
  nextPlayerDiv.innerHTML = "";
  // Create new header and populate
  let header = document.createElement("h2");
  if (nextPiece === 0) {
    header.textContent = "Next Placement: O";
  } else {
    header.textContent = "Next Placement: X";
  }
  nextPlayerDiv.appendChild(header);
}

// Displays the winner's symbol or tie if one exists
function displayWinner(winner) {
  var winnerPiece;
  if (winner === 0) {
    winnerPiece = "O";
  } else if (winner === 1) {
    winnerPiece = "X";
  } else if (winner === -1) {
    winnerPiece = "Tie";
  } else {
    return;
  }

  let header = document.createElement("h2");
  if (winnerPiece != "Tie") {
    header.textContent = `Winner: ${winnerPiece}`;
  } else {
    header.textContent = `${winnerPiece}`;
  }
  let winnerContainer = document.getElementById("winnerDisplay");
  winnerContainer.innerHTML = "";
  winnerContainer.appendChild(header);
}

export function clearDisplays() {
  // Clear the contents of the nextPlayer display
  let nextPlayerDiv = document.getElementById("nextPlayerDisplay");
  nextPlayerDiv.innerHTML = "";

  // Clear the contents of winnerDisplay display
  let winnerContainer = document.getElementById("winnerDisplay");
  winnerContainer.innerHTML = "";

  // Clear the contents of the grid boxes
  const gridBoxes = document.querySelectorAll(".gridBox");
  gridBoxes.forEach(function (box) {
    box.textContent = "";
  });
}
