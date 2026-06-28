import cellStyles from '../styles/game-cell.css?inline';

const sheet = new CSSStyleSheet();
sheet.replaceSync(cellStyles);

export class GameCell extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.adoptedStyleSheets = [sheet];
    }

    connectedCallback() {
        this.render();
        this.addEventListener('click', this.handle_click.bind(this));
    }

    disconnectedCallback() {
        this.removeEventListener('click', this.handle_click);
    }

    handle_click() {
        const x = parseInt(this.getAttribute('x'), 10);
        const y = parseInt(this.getAttribute('y'), 10);

        this.dispatchEvent(new CustomEvent('cell-interaction', {
            detail: { x, y },
            bubbles: true,
            composed: true 
        }));
    }

    get_content(is_revealed, is_mine, is_flagged, neighbour_mines) {
        if (is_flagged) return '🚩';
        if (!is_revealed) return '';
        if (is_mine) return '💣';
        return neighbour_mines > 0 ? neighbour_mines : '';
    }

    get_color(neighbour_mines) {
        const colors = [
            '', '#0022ff', '#008800', '#dd0000', '#000088',
            '#880000', '#008888', '#000000', '#777777'
        ];
        return colors[neighbour_mines] || '';
    }

    render() {
        const is_revealed = this.getAttribute('is-revealed') === 'true';
        const is_mine = this.getAttribute('is-mine') === 'true';
        const is_flagged = this.getAttribute('is-flagged') === 'true';
        const neighbour_mines = parseInt(this.getAttribute('neighbour-mines'), 10) || 0;

        const content = this.get_content(is_revealed, is_mine, is_flagged, neighbour_mines);
        const color = this.get_color(neighbour_mines);

        let class_name = 'cell';
        if (is_revealed) class_name += ' revealed';
        if (is_revealed && is_mine) class_name += ' mine';

        this.shadowRoot.innerHTML = `
            <div class="${class_name}" style="color: ${color}">
                ${content}
            </div>
        `;
    }
}

customElements.define('game-cell', GameCell);