const cells = document.querySelectorAll(".cell");
const playerTurn = document.querySelector("#player-turn");
const restartButton = document.querySelector("#restart-button");
const winCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options =["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initializeGame()

function initializeGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartButton.addEventListener("click", restartGame);
    playerTurn.textContent = `${currentPlayer}'s turn`;
    running = true;
}

function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex");

    if(options[cellIndex] != "" || !running) {
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer() {
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    playerTurn.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
    let roundWon = false;

    for(let win = 0; win < winCondition.length; win++){
        const condition = winCondition[win];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == "") {
            continue;
        }
        if(cellA == cellB && cellB == cellC) {
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        playerTurn.textContent =`${currentPlayer} wins!`;
        running = false;
    }
    else if(!options.includes("")){
        playerTurn.textContent = `Draw!`;
        running = false;
    }
    else {
        changePlayer();
    }
}

function restartGame() {
    currentPlayer = "X";
    options =["", "", "", "", "", "", "", "", ""];
    playerTurn.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}