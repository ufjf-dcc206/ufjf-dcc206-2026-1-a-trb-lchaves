export class Game {
    constructor(rows = 10, cols = 10, total_mines = 10) {
        this.rows = rows;
        this.cols = cols;
        this.total_mines = total_mines;
        this.grid = this.#create_grid();
    }

    #create_grid() {
        const grid = [];
        for (let y = 0; y < this.rows; y++) {
            const row = [];
            for (let x = 0; x < this.cols; x++) {
                row.push({
                    x,
                    y,
                    is_mine: false,
                    is_revealed: false,
                    is_flagged: false,
                    neighbour_mines: 0
                });
            }
            grid.push(row);
        }
        return grid;
    }
}