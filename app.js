// Selecting elements from the DOM
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset");
let newBtn = document.querySelector(".new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector(".msg");

let turnO = true; // Player O starts first
let clickCounts = 0; // Count to track the number of clicks (max 9)
const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Function to reset the game
const resetGame = () => {
    turnO = true;
    clickCounts = 0;
    boxEnabled();
    msgContainer.classList.add("hide");
}

// Disable all boxes
const boxDisabled = () => {
    boxes.forEach(box => box.disabled = true);
}

// Enable all boxes and reset their content
const boxEnabled = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
    });
}

// Add event listeners to all boxes
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O"; // Player O's turn
            turnO = false;
        } else {
            box.innerText = "X"; // Player X's turn
            turnO = true;
        }
        box.disabled = true; // Disable the clicked box
        clickCounts++;
        checkWinner(); // Check if someone won or it's a draw
    });
});

// Function to check if a player has won
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val); // Announce winner
                boxDisabled();
                return;
            }
        }
    }
    
    // If all 9 boxes are clicked and no winner, it's a draw
    if (clickCounts === 9) {
        showDraw();
        boxDisabled();
    }
}

// Function to display the winner message
const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}!`;
    msgContainer.classList.remove("hide");
}

// Function to display a draw message
const showDraw = () => {
    msg.innerText = "It's a draw!";
    msgContainer.classList.remove("hide");
}

// Event listeners for the "Reset" and "New Game" buttons
newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
