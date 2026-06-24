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
});