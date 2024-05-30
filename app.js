document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const restartButton = document.getElementById('restart-button');
    let currentPlayer = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const handleCellClick = (e) => {
        const cell = e.target;
        const cellIndex = parseInt(cell.getAttribute('id').replace('cell-', ''));
        
        if (board[cellIndex] !== '' || !gameActive) {
            return;
        }

        board[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;
        checkResult();
    };

    const checkResult = () => {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            setTimeout(() => alert(`Player ${currentPlayer} wins!`), 10);
            gameActive = false;
            return;
        }

        if (!board.includes('')) {
            setTimeout(() => alert('Game is a draw!'), 10);
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    };

    const restartGame = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        currentPlayer = 'X';
        cells.forEach(cell => cell.textContent = '');
    };

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', restartGame);
});
