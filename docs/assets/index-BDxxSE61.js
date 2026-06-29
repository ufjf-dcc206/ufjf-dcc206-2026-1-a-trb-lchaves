(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=class{constructor(e=10,t=10,n=10){this.rows=e,this.cols=t,this.status=`idle`,this.total_mines=n,this.grid=this.#e(),this.revealed_count=0}#e(){let e=[];for(let t=0;t<this.rows;t++){let n=[];for(let e=0;e<this.cols;e++)n.push({x:e,y:t,is_mine:!1,is_revealed:!1,is_flagged:!1,neighbour_mines:0});e.push(n)}return e}#t(e,t){this.#n(e,t),this.#r(),this.status=`playing`}#n(e,t){let n=0;for(;n<this.total_mines;){let r=Math.floor(Math.random()*this.cols),i=Math.floor(Math.random()*this.rows);!this.grid[i][r].is_mine&&(r!==e||i!==t)&&(this.grid[i][r].is_mine=!0,n++)}}#r(){let e=[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];for(let t=0;t<this.rows;t++)for(let n=0;n<this.cols;n++){if(this.grid[t][n].is_mine)continue;let r=0;for(let[i,a]of e){let e=t+i,o=n+a;e>=0&&e<this.rows&&o>=0&&o<this.cols&&this.grid[e][o].is_mine&&r++}this.grid[t][n].neighbour_mines=r}}reveal_cell(e,t){if(this.status===`lost`||this.status===`won`)return;let n=this.grid[t][e];if(!(n.is_flagged||n.is_revealed)){if(this.status===`idle`&&this.#t(e,t),n.is_mine){n.is_revealed=!0,this.status=`lost`;return}this.#i(e,t),console.log(`state before:`,this.status),this.#a(),console.log(`state after:`,this.status)}}toggle_flag(e,t){if(this.status==`lost`||this.status==`won`||this.status==`idle`)return;let n=this.grid[t][e];n.is_revealed||(n.is_flagged=!n.is_flagged)}#i(e,t){let n=[[e,t]];for(;n.length>0;){let[e,t]=n.shift(),r=this.grid[t][e];if(!(r.is_revealed||r.is_flagged||r.is_mine)&&(r.is_revealed=!0,this.revealed_count++,r.neighbour_mines==0))for(let r=-1;r<=1;r++)for(let i=-1;i<=1;i++){if(r===0&&i===0)continue;let a=t+r,o=e+i;a>=0&&a<this.rows&&o>=0&&o<this.cols&&n.push([o,a])}}}#a(){let e=this.rows*this.cols-this.total_mines;this.revealed_count===e&&(this.status=`won`)}},t=`:host{width:100%;height:100%;display:block}.cell{box-sizing:border-box;cursor:pointer;background-color:#f0f4f9;border:2px solid #a6b9c7;border-color:#fff #a6b9c7 #a6b9c7 #fff;justify-content:center;align-items:center;width:100%;height:100%;font-family:VT323,monospace;font-size:22px;font-weight:700;transition:background-color 50ms;display:flex}.cell:active:not(.revealed){background-color:#dbe4ee;border:1px solid #a6b9c7}.cell.revealed{cursor:default;background-color:#dbe4ee;border:1px solid #cbdde9}.cell.mine{background-color:#ff6b6b;animation:.5s infinite alternate blink}@keyframes blink{0%{background-color:#ff6b6b}to{background-color:red}}`,n=new CSSStyleSheet;n.replaceSync(t);var r=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:`open`}),this.shadowRoot.adoptedStyleSheets=[n]}connectedCallback(){this.render(),this.addEventListener(`click`,this.handle_click.bind(this))}disconnectedCallback(){this.removeEventListener(`click`,this.handle_click)}handle_click(){let e=parseInt(this.getAttribute(`x`),10),t=parseInt(this.getAttribute(`y`),10);this.dispatchEvent(new CustomEvent(`cell-interaction`,{detail:{x:e,y:t},bubbles:!0,composed:!0}))}get_content(e,t,n,r){return n?`🚩`:e?t?`💣`:r>0?r:``:``}get_color(e){return[``,`#0022ff`,`#008800`,`#dd0000`,`#000088`,`#880000`,`#008888`,`#000000`,`#777777`][e]||``}render(){let e=this.getAttribute(`is-revealed`)===`true`,t=this.getAttribute(`is-mine`)===`true`,n=this.getAttribute(`is-flagged`)===`true`,r=parseInt(this.getAttribute(`neighbour-mines`),10)||0,i=this.get_content(e,t,n,r),a=this.get_color(r),o=`cell`;e&&(o+=` revealed`),e&&t&&(o+=` mine`),this.shadowRoot.innerHTML=`
            <div class="${o}" style="color: ${a}">
                ${i}
            </div>
        `}};customElements.define(`game-cell`,r);var i=`:host{box-sizing:border-box;background:#e1e9f4;border:2px solid #699fc7;border-radius:6px 6px 4px 4px;width:100%;max-width:340px;font-family:Tahoma,sans-serif;display:block;box-shadow:0 10px 30px #00000080,inset 0 1px #fff}.msn-title-bar{color:#fff;text-shadow:1px 1px 1px #0006;background:linear-gradient(90deg,#4a75a0,#699fc7);border-radius:4px 4px 0 0;justify-content:space-between;align-items:center;padding:6px 10px;font-size:11px;font-weight:700;display:flex}.window-controls span{color:#4a75a0;text-align:center;cursor:pointer;background:#e1e9f4;border-radius:2px;width:14px;height:14px;margin-left:2px;font-size:9px;line-height:12px;display:inline-block}.user-info-section{background:linear-gradient(#f3f7fc,#e1e9f4);border-bottom:1px solid #b0c7d6;flex-direction:column;gap:4px;padding:10px;display:flex}.nickname{color:#1c3d5a;font-size:13px;font-weight:700}.status-subtext{color:#555;align-items:center;gap:6px;font-size:11px;display:flex}.status-bullet{border-radius:50%;width:8px;height:8px;box-shadow:0 0 4px}.toolbar{justify-content:space-between;align-items:center;padding:8px 10px;display:flex}.action-btn{color:#fff;cursor:pointer;text-shadow:1px 1px #0006;background:linear-gradient(#cedce7 0%,#596a72 100%);border:1px solid #4a555a;border-radius:12px;padding:6px 14px;font-size:11px;font-weight:700;transition:all .1s;box-shadow:0 2px 4px #0003,inset 0 1px #fff6}.action-btn.active-reveal{background:linear-gradient(#7abcff 0%,#4096ee 100%);border-color:#1d62a9}.action-btn.active-flag{background:linear-gradient(#f28080 0%,#c62828 100%);border-color:#7f1414}.grid-container{background:#d4e0ee;justify-content:center;padding:10px;display:flex}.grid{background-color:#8faec4;border:1px solid #699fc7;gap:1px;padding:2px;display:grid;box-shadow:inset 0 2px 5px #00000026}`,a=new CSSStyleSheet;a.replaceSync(i);var o=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:`open`}),this.shadowRoot.adoptedStyleSheets=[a],this.game=new e(10,10,12),this.action_mode=`reveal`}connectedCallback(){this.render(),this.setup_events()}setup_events(){this.shadowRoot.addEventListener(`cell-interaction`,e=>{let{x:t,y:n}=e.detail;this.action_mode===`reveal`?this.game.reveal_cell(t,n):this.game.toggle_flag(t,n),this.render()})}start_new_game(t,n,r){this.game=new e(t,n,r),this.action_mode=`reveal`,this.render()}toggle_mode(){this.action_mode=this.action_mode===`reveal`?`flag`:`reveal`,this.render()}get_msn_status(e){let t={idle:{text:`Disponível`,color:`#33cc33`},playing:{text:`Ocupado (Jogando)`,color:`#ff3333`},won:{text:`Ganhou! <(￣︶￣)>`,color:`#00ccff`},lost:{text:`Invisível (Perdeu!)`,color:`#999999`}};return t[e]||t.idle}render(){let e=this.get_msn_status(this.game.status),t=this.game.grid.map(e=>e.map(e=>`<game-cell
                    x="${e.x}"
                    y="${e.y}"
                    is-revealed="${e.is_revealed}"
                    is-mine="${e.is_mine}"
                    is-flagged="${e.is_flagged}"
                    neighbour-mines="${e.neighbour_mines}">
                </game-cell>`).join(``)).join(``);this.shadowRoot.innerHTML=`
            <div class="msn-title-bar">
                <span>·´¯\`·.·★ Campo Minado ★·.·´¯\`·</span>
                <div class="window-controls">
                    <span>_</span><span>☐</span><span style="background: #e06c6c; color: white;">X</span>
                </div>
            </div>
            
            <div class="user-info-section">
                <div class="nickname">Player [SubNick: Procurando minas...]</div>
                <div class="status-subtext">
                    <div class="status-bullet" style="background-color: ${e.color}; color: ${e.color};"></div>
                    <span>Status: <strong>${e.text}</strong></span>
                </div>
            </div>

            <div class="toolbar">
                <span style="font-size: 11px; color: #476277;">Modo de Toque:</span>
                <button id="mode-toggle" class="action-btn ${this.action_mode===`reveal`?`active-reveal`:`active-flag`}">
                    ${this.action_mode===`reveal`?`CAVAR`:`BANDEIRA`}
                </button>
            </div>
            
            <div class="grid-container">
                <div class="grid" style="grid-template-columns: repeat(${this.game.cols}, 28px); grid-template-rows: repeat(${this.game.rows}, 28px);">
                    ${t}
                </div>
            </div>
        `,this.shadowRoot.getElementById(`mode-toggle`).addEventListener(`click`,()=>{this.toggle_mode()})}};customElements.define(`game-board`,o);var s=`:host{box-sizing:border-box;background:#e1e9f4;border:2px solid #699fc7;border-radius:6px 6px 4px 4px;width:100%;max-width:340px;margin-bottom:20px;font-family:Tahoma,sans-serif;display:block;box-shadow:0 10px 30px #00000080,inset 0 1px #fff}.msn-title-bar{color:#fff;text-shadow:1px 1px 1px #0006;background:linear-gradient(90deg,#4a75a0,#699fc7);border-radius:4px 4px 0 0;justify-content:space-between;align-items:center;padding:6px 10px;font-size:11px;font-weight:700;display:flex}.window-controls span{color:#4a75a0;text-align:center;cursor:pointer;background:#e1e9f4;border-radius:2px;width:14px;height:14px;margin-left:2px;font-size:9px;line-height:12px;display:inline-block}.menu-body{background:linear-gradient(#f3f7fc,#e1e9f4);flex-direction:column;gap:12px;padding:15px;display:flex}.form-group{flex-direction:column;gap:4px;display:flex}label{color:#1c3d5a;font-size:12px;font-weight:700}select{color:#333;background:#fff;border:1px solid #7b9ebd;border-radius:2px;padding:4px;font-family:Tahoma,sans-serif;font-size:12px}.start-btn{color:#fff;cursor:pointer;text-shadow:1px 1px #0006;background:linear-gradient(#cedce7 0%,#596a72 100%);border:1px solid #4a555a;border-radius:4px;margin-top:8px;padding:8px;font-size:12px;font-weight:700;box-shadow:0 2px 4px #0003,inset 0 1px #fff6}.start-btn:active{background:linear-gradient(#596a72 0%,#cedce7 100%);box-shadow:inset 0 2px 4px #0006}`,c=new CSSStyleSheet;c.replaceSync(s);var l=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:`open`}),this.shadowRoot.adoptedStyleSheets=[c]}connectedCallback(){this.render(),this.setup_events()}setup_events(){this.shadowRoot.getElementById(`start-btn`).addEventListener(`click`,()=>{let e=parseInt(this.shadowRoot.getElementById(`board-size`).value,10),t=parseFloat(this.shadowRoot.getElementById(`difficulty`).value),n=e*e,r=Math.floor(n*t);this.dispatchEvent(new CustomEvent(`new-game-request`,{detail:{rows:e,cols:e,total_mines:r},bubbles:!0,composed:!0}))})}render(){this.shadowRoot.innerHTML=`
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
        `}};customElements.define(`game-menu`,l),document.addEventListener(`DOMContentLoaded`,()=>{let e=document.querySelector(`game-menu`),t=document.querySelector(`game-board`);e.addEventListener(`new-game-request`,()=>{let{rows:e,cols:n,total_mines:r}=event.detail;t.start_new_game(e,n,r)})});