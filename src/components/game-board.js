import { Game } from "../Game.js";
import "./game-cell.js";

export class GameBoard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.game = new Game(10,10,10);
        this.action_mode = 'reveal';
    }

    connectedCallback() {
        this.render();
        this.setup_events();
    }

    setup_events() {
        this.shadowRoot.addEventListener('cell-interaction', (e) => {
            const { x, y } = e.detail;

            if (this.action_mode == 'reveal') {
                this.game.reveal_cell(x, y);
            } else {
                this.game.toggle_flag(x, y);
            }

            this.render(); 
        });
    }

    toggle_mode() {
        this.action_mode = this.action_mode == 'reveal' ? 'flag' : 'reveal';
        this.render();
    }

    render() {
        const grid_template = this.game.grid.map(row => {
            return row.map(cell => {
                return `<ms-cell
                    x="${cell.x}"
                    y="${cell.y}"
                    is-revealed="${cell.is_revealed}"
                    is-mine="${cell.is_mine}"
                    is-flagged="${cell.is_flagged}"
                    neighbour-mines="${cell.neighbour_mines}">
                </ms-cell>`;
            }).join('');
        }).join('');

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    font-family: sans-serif;
                    user-select: none;
                }
                .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                    max-width: 320px;
                    margin-bottom: 1rem;
                    padding: 0.5rem;
                    background: #f0f0f0;
                    border-radius: 8px;
                }
                .grid {
                    display: grid;
                    grid-template-columns: repeat(${this.game.cols}, 30px);
                    grid-template-rows: repeat(${this.game.rows}, 30px);
                    gap: 2px;
                    background-color: #bdbdbd;
                    padding: 2px;
                    border: 3px solid #7b7b7b;
                    border-top-color: #fff;
                    border-left-color: #fff;
                }
                button {
                    padding: 8px 16px;
                    cursor: pointer;
                    font-weight: bold;
                    border: 2px solid #7b7b7b;
                    border-top-color: #fff;
                    border-left-color: #fff;
                    background: #e0e0e0;
                }
                button:active {
                    border: 2px solid #fff;
                    border-top-color: #7b7b7b;
                    border-left-color: #7b7b7b;
                }
            </style>
            
            <div class="header">
                <span class="status">Status: <strong>${this.game.status.toUpperCase()}</strong></span>
                <button id="mode-toggle">
                    ${this.action_mode === 'reveal' ? 'Cavar' : 'Bandeira'}
                </button>
            </div>
            
            <div class="grid">
                ${grid_template}
            </div>
        `;

        this.shadowRoot.getElementById('mode-toggle').addEventListener('click', () => {
            this.toggle_mode();
        });
    }
}

customElements.define('game-board', GameBoard);