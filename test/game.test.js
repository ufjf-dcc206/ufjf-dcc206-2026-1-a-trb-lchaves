import { describe, it, expect } from "vitest";
import { Game } from "../src/Game";

describe("Logica principal do campo minado", () => {
    it('deve atrasar a criacao de minas ate o primeiro clique', () => {
        const game = new Game(5, 5, 5);
        expect(game.status).toBe('idle');
    
        let has_mines = game.grid.some(row => row.some(cell => cell.is_mine));
        expect(has_mines).toBe(false);

        game.reveal_cell(2, 2);
    
        expect(game.status).toBe('playing');
        has_mines = game.grid.some(row => row.some(cell => cell.is_mine));
        expect(has_mines).toBe(true);
    });

    it('nunca deve colocar uma mina na celula do primeiro clique', () => {
        for (let i = 0; i < 50; i++) {
            const game = new Game(5, 5, 24);
            game.reveal_cell(2, 2);
            expect(game.grid[2][2].is_mine).toBe(false);
        }
    });

    it('deve perder o jogo ao clicar em uma mina', () => {
        const game = new Game(5, 5, 1);
        game.reveal_cell(0, 0); 

        let mineX, mineY;
            game.grid.forEach(row => {
                row.forEach(cell => {
                    if (cell.is_mine) {
                        mineX = cell.x;
                        mineY = cell.y;
                    }
                });
            });

        game.reveal_cell(mineX, mineY);
        expect(game.status).toBe('lost');
    });

    it('nn deve revelar celula que contem bandeira', () => {
        const game = new Game(5, 5, 5);
        game.reveal_cell(0, 0); 
        
        game.toggle_flag(1, 1);
        game.reveal_cell(1, 1);
        
        expect(game.grid[1][1].is_revealed).toBe(false);
    });

    it('deve inicializar todas cells com o estado padrao', () => {
        const size = 5;
        const game = new Game(size, size, 7);
        const cell = game.grid[2][3];

        expect(cell.x).toBe(3);
        expect(cell.y).toBe(2);
        expect(cell.is_mine).toBe(false);
        expect(cell.is_revealed).toBe(false);
        expect(cell.is_flagged).toBe(false);
        expect(cell.neighbour_mines).toBe(0);
    });

    it('deve vencer o jogo ao revelar todas as celulas seguras', () => {
        const game = new Game(3, 3, 1);
        game.reveal_cell(0, 0); 
        
        game.grid.forEach(row => {
            row.forEach(cell => {
                if (!cell.isMine && !cell.is_revealed) {
                    game.reveal_cell(cell.x, cell.y);
                }
            });
        });

        expect(game.status).toBe('won');
    });

    it('deve colocar a quantidade exata de minas', () => {
        const total_mines = 15;
        const game = new Game(10, 10, total_mines);
        
        let mine_count = 0;
        game.grid.forEach(row => {
            row.forEach(cell => {
                if (cell.is_mine) mine_count++;
            });
        });

        expect(mine_count).toBe(total_mines);
    });

    it('deve calcular corretamente o nmr de vizinhos de cada celula', () => {
    const game = new Game(5, 5, 5);
    
    for (let y = 0; y < game.rows; y++) {
        for (let x = 0; x < game.cols; x++) {
            const cell = game.grid[y][x];
            if (!cell.is_mine) {
                let expected_mines = 0;
                for (let dy = -1; dy <= 1; dy++) {
                    for (let dx = -1; dx <= 1; dx++) {
                        if (dy === 0 && dx === 0) continue;
                            const ny = y + dy;
                            const nx = x + dx;

                            if (ny >= 0 && ny < game.rows && nx >= 0 && nx < game.cols) {
                                if (game.grid[ny][nx].is_mine) expected_mines++;
                            }
                        }
                    }
                    expect(cell.neighbour_mines).toBe(expected_mines);
                }
            }
        }
    });
});