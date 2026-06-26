export class Game {
    constructor(rows = 10, cols = 10, total_mines = 10) {
        this.rows = rows;
        this.cols = cols;
        this.status = 'idle';
        this.total_mines = total_mines;
        this.grid = this.#create_grid();
        this.revealed_count = 0;
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

    #initialize_board(safe_x, safe_y) {
        this.#place_mines(safe_x, safe_y);
        this.#calc_neighbours();
        this.status = 'playing';
    }

    #place_mines(safe_x, safe_y) {
        let placed = 0;
        while (placed < this.total_mines) {
            const x = Math.floor(Math.random() * this.cols);
            const y = Math.floor(Math.random() * this.rows);

            if (!this.grid[y][x].is_mine && (x !== safe_x || y !== safe_y)) {
                this.grid[y][x].is_mine = true;
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

    reveal_cell(x, y) {
        if (this.status === "lost" || this.status === "won") return;
        
        const cell = this.grid[y][x];
        if (cell.is_flagged || cell.is_revealed) return;
        
        if (this.status === "idle") {
            this.#initialize_board(x, y);
        }

        if (cell.is_mine) {
            cell.is_revealed = true;
            this.status = "lost";
            return;
        }

        this.#flood_fill(x, y);
        console.log("state before:", this.status);
        this.#check_win_condition();
        console.log("state after:", this.status);
    }

    toggle_flag(x, y) {
        if (this.status == 'lost' || this.status == 'won') return;
        if (this.status == 'idle') return; 

        const cell = this.grid[y][x];
        if (!cell.is_revealed) {
            cell.is_flagged = !cell.is_flagged;
        }
    }

    #flood_fill(start_x, start_y) {
        const q = [[start_x, start_y]];

        while (q.length > 0) {
            const [x,y] = q.shift();
            const cell = this.grid[y][x];

            if (cell.is_revealed || cell.is_flagged || cell.is_mine) continue;
            cell.is_revealed = true;
            this.revealed_count++;

            if (cell.neighbour_mines == 0) {
                for (let dy = -1; dy <= 1; dy++) {
                    for (let dx = -1; dx <= 1; dx++) {
                        if (dy === 0 && dx === 0) continue;
                        const ny = y + dy;
                        const nx = x + dx;
            
                        if (ny >= 0 && ny < this.rows && nx >= 0 && nx < this.cols) {
                            q.push([nx, ny]);
                        }
                    }
                }
            }
        }
    }

    #check_win_condition() {
        const total_safe_cells = (this.rows * this.cols) - this.total_mines;
        if (this.revealed_count === total_safe_cells) {
            this.status = "won";
        }
    }
}