document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll(".cell");
    const resetButton = document.querySelector('.reset');
   
    let currentPlayer = "X";
    let gameActive = true;
    let gameStatus = ["", "", "", "", "", "", "", "", ""];
   
    const winningConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
   
    function handleCellClick(e){
        const cellIndex = parseInt(e.target.getAttribute("data-cell-index"));
   
        if(gameStatus[cellIndex] !=="" || !gameActive) return;
   
        gameStatus[cellIndex] = currentPlayer;
        e.target.textContent = currentPlayer;
        checkWin();
        checkDraw();
        currentPlayer = currentPlayer === "X"? "O" : "X";
    }
   
    function checkWin() {
        for (let condition of winningConditions) {
            const [a, b, c] = condition;
    
            if (gameStatus[a] !== "" && gameStatus[a] === gameStatus[b] && gameStatus[a] === gameStatus[c]) {
                gameActive = false;
                alert(`Player ${gameStatus[a]} wins!`);
                return;
            }
        }
    }
   
    function checkDraw(){
        if(!gameStatus.includes("") && gameActive){
            gameActive = false;
            alert("It's a draw!");
        }
    }
       
    function restartGame(){
        currentPlayer = "X";
        gameActive = true;
        gameStatus = ["", "", "", "", "", "", "", "", ""];
   
        cells.forEach(cell => {
            cell.textContent = "";
        });
    }
   
    cells.forEach(cell => {
        cell.addEventListener("click", handleCellClick);
    });
    resetButton.addEventListener("click", restartGame);
});
