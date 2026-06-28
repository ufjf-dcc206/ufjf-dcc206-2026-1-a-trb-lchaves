import './styles/main.css';
import './components/game-board.js';
import './components/game-menu.js'

document.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('game-menu');
    const board = document.querySelector('game-board');

    menu.addEventListener('new-game-request', () => {
        const {rows, cols, total_mines} = event.detail;
        board.start_new_game(rows, cols, total_mines);
    });
});