import menuStyles from '../styles/game-menu.css?inline';

const sheet = new CSSStyleSheet();
sheet.replaceSync(menuStyles);

export class GameMenu extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.adoptedStyleSheets = [sheet];
    }

    connectedCallback() {
        this.render();
        this.setup_events();
    }

    setup_events() {
        const btn = this.shadowRoot.getElementById('start-btn');
        btn.addEventListener('click', () => {
            const size = parseInt(this.shadowRoot.getElementById('board-size').value, 10);
            const difficulty = parseFloat(this.shadowRoot.getElementById('difficulty').value);
            
            const total_cells = size * size;
            const total_mines = Math.floor(total_cells * difficulty);

            this.dispatchEvent(new CustomEvent('new-game-request', {
                detail: { rows: size, cols: size, total_mines },
                bubbles: true,
                composed: true
            }));
        });
    }

    render() {
        this.shadowRoot.innerHTML = `
            <div class="msn-title-bar">
                <span>·´¯\`·.·★ Nova Conversa ★·.·´¯\`·</span>
                <div class="window-controls">
                    <span>_</span><span>☐</span><span style="background: #e06c6c; color: white;">X</span>
                </div>
            </div>
            
            <div class="menu-body">
                <div class="form-group">
                    <label for="board-size">Tamanho da Janela:</label>
                    <select id="board-size">
                        <option value="6">Pequeno (6x6)</option>
                        <option value="8">Médio (8x8)</option>
                        <option value="10" selected>Grande (10x10)</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="difficulty">Nível de Ameaça:</label>
                    <select id="difficulty">
                        <option value="0.10">Fácil</option>
                        <option value="0.25" selected>Médio</option>
                        <option value="0.50">Difícil</option>
                    </select>
                </div>

                <button id="start-btn" class="start-btn">Iniciar Jogo</button>
            </div>
        `;
    }
}

customElements.define('game-menu', GameMenu);