import { describe, it, expect } from "vitest";
import { Game } from "../src/Game";

describe("Logica principal do campo minado", () => {
    it("deve inicializar o tabuleiro com dimensoes corretas", () => {
        const game = new Game(8, 12, 10);

        expect(game.rows).toBe(8);
        expect(game.cols).toBe(12);
        expect(game.grid.length).toBe(8);
        expect(game.grid[0].length).toBe(12);
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