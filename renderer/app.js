let games = []
let currentGame = null

// Navegação
function showPage(name){
    document.querySelectorAll('.page').forEach( p => p.classList.remove('active'))
    document.querySelectorAll('.nav-btn').forEach( b => b.classList.remove('active'))
    document.getElementById('page-' + name).classList.add('active')
    document.getElementById('nav-' + name).classList.add('active')

    ;['games', 'library', 'settings'].forEach(p => {
    const ag = document.getElementById('ag-' + p)
    if (ag) ag.style.display = p === name ? 'flex' : 'none'
  })

    const placeholders = {
        games: ' Buscar jogo ...',
        library: ' Buscar versão...',
        settings: ' Buscar configurações...'
    }
    document.getElementById('search-input').placeholder = 
    placeholders[name]
}

// Vista grade/ lista

function toggleView(){
    const btn = document.getElementById('btn-view')
    btn.classList.toggle('active')
    const gride = document.querySelectorAll('.games-grid')
    const isList = btn.classList.contains('active')
    grids.forEach( g=> {
        g.style.gridTemplateColumns = isList ? '1fr' : 'repeat(auto-fill, minmax(100px, 1fr)'
    })
    btn.querySelector('i').className = isList ? 'ti ti-list': 'ti ti-layout-grid'
}


// Biblioteca tabs
function setLibTab(el) {
    document.querySelectorAll('.lib-tab').forEach( t=> t.classList.remove('active'))
    el.classList.add('active')
}

// Modal
function openModel(game) {
    currentGame = game
    document.getElementById('modal-title').textContent = game.name
    document.getElementById('modal-path').textContent = game.path
    document.getElementById('modal-status').textContent =
    game.installed ? 'OptiScaler instalado' : 'Não instalado'
    document.getElementById('modal-status').className =
    'modal-badge ' + (game.installed ? 'badge-ok': 'badge-api')
    document.getElementById('modal-backdrop').classList.add('open')
}
function closeModal() {
    document.getElementById('modal-backdrop').classList.remove('open')
    currentGame = null
}

// Fecha modal clicando fora
document.getElementById('modal-backdrop').addEventListener('click', e => {
    if (e.target === document.getElementById('modal-backdrop')) closeModal()
})

// Renderizar lista de jogos
function renderGames(){
    const area = document.getElementById('games-area')
    const empty = document.getElementById('empty-state')

    if(games.length === 0){
        empty.style.display = 'flex'
        return
    }

    empty.style.display = 'none'
}

// Remove grids antetiores (mantém o empty-state no DOM)
area.querySelectorAll('.sec-label, .games-grid').forEach(el => el.remove())

const grid = document.createElement('div')
grid.className = 'games-grid'

games.forEach(game => {
    const car = document.createElement('div')
    card.className = 'game-card'
    card.innerHTML =
     `
      <div class="game-card-inner">
        <i class="ti ti-device-gamepad-2" style="font-size:24px;color:#555;margin-bottom:6px"></i>
        <span>${game.name}</span>
      </div>
      <div class="game-foot">
        <span class="gf-tag">OptiScaler</span>
        <span class="gf-ver">${game.installed ? '✓' : 'N/A'}</span>
      </div>
    `
    card.addEventListener('click', () => openModel(game))
    grid.appendChild(card)
})

const label = document.createElement('div')
label.className = 'sec-label'
label.textContent = 'Adicionando manualmente'

area.insertBefore(label,empty)
area.insertBefore(grid, empty)

// Detectar GPU ao abrir
window.api.detectGPU().then(gpu => {
    document.getElementyById('gpu-name').innerHTML =
    `<b style="color:var(--text)">GPU detectada:</b> ${gpu}`
})

// Inicializar
renderGames()