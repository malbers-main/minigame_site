import {
  board,
  winner,
  nextPiece,
  rows,
  cols,
  getWinningBoxes,
} from "./tictactoe_logic.js";

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
  setUserDisplays(nextPiece);

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

// Change the css styles of the user profiles
function setUserDisplays(nextPiece) {
  let xPlayer = document.getElementById("xHolder");
  let oPlayer = document.getElementById("oHolder");

  if (nextPiece === 1) {
    xPlayer.classList.add("activePlayer");
    xPlayer.classList.remove("inactivePlayer");
    oPlayer.classList.add("inactivePlayer");
    oPlayer.classList.remove("activePlayer");
  } else {
    oPlayer.classList.add("activePlayer");
    oPlayer.classList.remove("inactivePlayer");
    xPlayer.classList.add("inactivePlayer");
    xPlayer.classList.remove("activePlayer");
  }
}

// Displays the winner's symbol or tie if one exists
function displayWinner(winner) {
  let xPlayer = document.getElementById("xHolder");
  let oPlayer = document.getElementById("oHolder");

  var winnerPiece;
  if (winner === 0) {
    xPlayer.classList.add("losingPlayer");
    xPlayer.classList.remove("activePlayer");
    oPlayer.classList.remove("inactivePlayer");
    oPlayer.classList.add("winningPlayer");
    winnerPiece = "O";
  } else if (winner === 1) {
    oPlayer.classList.add("losingPlayer");
    oPlayer.classList.remove("activePlayer");
    xPlayer.classList.remove("inactivePlayer");
    xPlayer.classList.add("winningPlayer");
    winnerPiece = "X";
  } else if (winner === -1) {
    oPlayer.classList.add("inactivePlayer");
    oPlayer.classList.remove("activePlayer");
    xPlayer.classList.remove("activePlayer");
    xPlayer.classList.add("inactivePlayer");
    winnerPiece = "Tie";
  } else {
    return;
  }

  let header = document.createElement("h2");
  if (winnerPiece != "Tie") {
    let winningIndices = getWinningBoxes(board, winner);
    displayWinningBoxes(winningIndices);
    header.textContent = `Winner: ${winnerPiece}`;
  } else {
    header.textContent = `${winnerPiece}`;
  }
  let winnerContainer = document.getElementById("winnerDisplay");
  winnerContainer.innerHTML = "";
  winnerContainer.appendChild(header);
}

function displayWinningBoxes(winningIndices) {
  // Clear the contents of the grid boxes
  const gridBoxes = document.querySelectorAll(".gridBox");
  for (let i = 0; i < gridBoxes.length; i++) {
    if (winningIndices.includes(i)) {
        gridBoxes[i].classList.add("winningBox");
    }
  }
}

export function clearDisplays() {
  // Clear user dispaly styles
  let xPlayer = document.getElementById("xHolder");
  let oPlayer = document.getElementById("oHolder");
  xPlayer.classList.remove("activePlayer");
  xPlayer.classList.remove("inactivePlayer");
  xPlayer.classList.remove("winningPlayer");
  xPlayer.classList.remove("losingPlayer");
  oPlayer.classList.remove("activePlayer");
  oPlayer.classList.remove("inactivePlayer");
  oPlayer.classList.remove("winningPlayer");
  oPlayer.classList.remove("losingPlayer");

  // Clear the contents of the nextPlayer display
  let nextPlayerDiv = document.getElementById("nextPlayerDisplay");
  nextPlayerDiv.innerHTML = "";

  // Clear the contents of winnerDisplay display
  let winnerContainer = document.getElementById("winnerDisplay");
  winnerContainer.innerHTML = "";

  // Clear the contents of the grid boxes and reset the winning boxes styles
  const gridBoxes = document.querySelectorAll(".gridBox");
  gridBoxes.forEach(function (box) {
    box.textContent = "";
    box.classList.remove("winningBox");
  });
}
