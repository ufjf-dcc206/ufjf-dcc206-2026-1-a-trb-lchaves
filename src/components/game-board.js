import { Game } from '../Game.js';
import './game-cell.js'; 
import boardStyles from '../styles/game-board.css?inline';

const sheet = new CSSStyleSheet();
sheet.replaceSync(boardStyles);

export class GameBoard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.adoptedStyleSheets = [sheet];        
        this.game = new Game(10, 10, 12);
        this.action_mode = 'reveal'; 
    }

    connectedCallback() {
        this.render();
        this.setup_events();
    }

    setup_events() {
        this.shadowRoot.addEventListener('cell-interaction', (e) => {
            const { x, y } = e.detail;
            if (this.action_mode === 'reveal') {
                this.game.reveal_cell(x, y);
            } else {
                this.game.toggle_flag(x, y);
            }
            this.render(); 
        });
    }

    start_new_game(rows, cols, total_mines) {
        this.game = new Game(rows, cols, total_mines);
        this.action_mode = 'reveal';
        this.render();
    }

    toggle_mode() {
        this.action_mode = this.action_mode === 'reveal' ? 'flag' : 'reveal';
        this.render();
    }

    get_msn_status(status) {
        const statusMap = {
            'idle': { text: 'Disponível', color: '#33cc33' },
            'playing': { text: 'Ocupado (Jogando)', color: '#ff3333' },
            'won': { text: 'Ganhou! <(￣︶￣)>', color: '#00ccff' },
            'lost': { text: 'Invisível (Perdeu!)', color: '#999999' }
        };
        return statusMap[status] || statusMap['idle'];
    }

    render() {
        const msnStatus = this.get_msn_status(this.game.status);
        
        const grid_template = this.game.grid.map(row => {
            return row.map(cell => {
                return `<game-cell
                    x="${cell.x}"
                    y="${cell.y}"
                    is-revealed="${cell.is_revealed}"
                    is-mine="${cell.is_mine}"
                    is-flagged="${cell.is_flagged}"
                    neighbour-mines="${cell.neighbour_mines}">
                </game-cell>`;
            }).join('');
        }).join('');

        this.shadowRoot.innerHTML = `
            <div class="msn-title-bar">
                <span>·´¯\`·.·★ Campo Minado ★·.·´¯\`·</span>
                <div class="window-controls">
                    <span>_</span><span>☐</span><span style="background: #e06c6c; color: white;">X</span>
                </div>
            </div>
            
            <div class="user-info-section">
                <div class="nickname">Player [SubNick: Procurando minas...]</div>
                <div class="status-subtext">
                    <div class="status-bullet" style="background-color: ${msnStatus.color}; color: ${msnStatus.color};"></div>
                    <span>Status: <strong>${msnStatus.text}</strong></span>
                </div>
            </div>

            <div class="toolbar">
                <span style="font-size: 11px; color: #476277;">Modo de Toque:</span>
                <button id="mode-toggle" class="action-btn ${this.action_mode === 'reveal' ? 'active-reveal' : 'active-flag'}">
                    ${this.action_mode === 'reveal' ? 'CAVAR' : 'BANDEIRA'}
                </button>
            </div>
            
            <div class="grid-container">
                <div class="grid" style="grid-template-columns: repeat(${this.game.cols}, 28px); grid-template-rows: repeat(${this.game.rows}, 28px);">
                    ${grid_template}
                </div>
            </div>
        `;

        this.shadowRoot.getElementById('mode-toggle').addEventListener('click', () => {
            this.toggle_mode();
        });
    }
}

customElements.define('game-board', GameBoard);