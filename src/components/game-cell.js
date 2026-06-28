export class MSCell extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.addEventListener('click', this.handle_click.bind(this));
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
            '', '#0000FF', '#008000', '#FF0000', '#000080',
            '#800000', '#008080', '#000000', '#808080'
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
            <style>
                :host {
                    display: block;
                    width: 100%;
                    height: 100%;
                }
                .cell {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    height: 100%;
                    background-color: #bdbdbd;
                    box-sizing: border-box;
                    font-family: monospace;
                    font-weight: 900;
                    font-size: 18px;
                    cursor: pointer;
                    border: 3px solid;
                    border-top-color: #fff;
                    border-left-color: #fff;
                    border-bottom-color: #7b7b7b;
                    border-right-color: #7b7b7b;
                }
                .cell:active:not(.revealed) {
                    border: 1px solid #7b7b7b;
                }
                .cell.revealed {
                    border: 1px solid #7b7b7b;
                    background-color: #e0e0e0;
                    cursor: default;
                }
                .cell.mine {
                    background-color: #ff4c4c;
                }
            </style>
            <div class="${class_name}" style="color: ${color}">
                ${content}
            </div>
        `;
    }
}

customElements.define('ms-cell', MSCell);