export class Game {
    constructor(rows = 10, cols = 10, total_mines = 10) {
        this.rows = rows;
        this.cols = cols;
        this.total_mines = total_mines;
        this.grid = this.#create_grid();
        // TODO: Tirar o place_mines do construtor para que nao tenha chance do primeiro clique ser numa mina
        this.#place_mines();
        this.#calc_neighbours();
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

    #place_mines() {
        let placed = 0;
        while (placed < this.total_mines) {
            const x = Math.floor(Math.random() * this.cols);
            const y = Math.floor(Math.random() * this.rows);

            if (!this.grid[y][x].is_mine) {
                this.grid[y][x].is_mine = true;
                console.log(`Colocada Mina em ${y},${x}`);
                placed++;
            }
        }
    }

    #calc_neighbours() {
        // N, NE, E, SE, S, SW, W, NW
        const dirs = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1],           [0, 1],
            [1, -1],  [1, 0],  [1, 1]
        ];

        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                if (this.grid[y][x].is_mine) continue;
                let count = 0;
                for (const [dy, dx] of dirs) {
                    const ny = y + dy;
                    const nx = x + dx;

                    if (ny >= 0 && ny < this.rows && nx >= 0 && nx < this.cols) {
                        if (this.grid[ny][nx].is_mine) {
                            count++;
                        }
                    }
                }
            this.grid[y][x].neighbour_mines = count;
            }
        }
    }
}