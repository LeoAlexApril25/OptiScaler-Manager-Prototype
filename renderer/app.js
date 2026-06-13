//const { mkdirSync } = require("original-fs")

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
    const grids = document.querySelectorAll('.games-grid')
    const isList = btn.classList.contains('active')
    grids.forEach( g=> {
        g.style.gridTemplateColumns = isList ? '1fr' : 'repeat(auto-fill, minmax(100px, 1fr))'
    })
    btn.querySelector('i').className = isList ? 'ti ti-list': 'ti ti-layout-grid'
}


// Biblioteca tabs
function setLibTab(el) {
    document.querySelectorAll('.lib-tab').forEach( t=> t.classList.remove('active'))
    el.classList.add('active')
}

// Modal
function openModal(game) {
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
    
    // Remove grids antetiores (mantém o empty-state no DOM)
    empty.style.display = 'none'
    area.querySelectorAll('.sec-label, .games-grid').forEach( el => el.remove())

    const label = document.createElement('div')
    label.className = 'sec-label'
    label.textContent = 'Adicionamos manualmente'


    const grid = document.createElement('div')
    grid.className = 'games-grid'
    
    games.forEach(game => {
    const card = document.createElement('div')
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
    card.addEventListener('click', () => openModal(game))
    grid.appendChild(card)
})

  
area.insertBefore(label,empty)
area.insertBefore(grid, empty)


}

function showToast(msg, isError = false) {
    const existing = document.getElementById('toast')
    if(existing) existing.remove()
    const toast = document.createElement('div')
    toast.id = 'toast'
    toast.textContent = msg
    toast.style.cssText = `
    position:fixed; bottom:24px; left:50%; transform:translateX(-50%);
    background:${isError ? '#c0392b' : '#27ae60'}; color:#fff;
    padding:10px 22px; border-radius:8px; font-size:13px;
    z-index:9999; box-shadow:0 4px 12px rgba(0,0,0,.4); transition:opacity .3s;
  `

    document.body.appendChild(toast)
    setTimeout(() => {toast.style.opacity='0';
    setTimeout(() => toast.remove(), 300)
})
}

async function addGame() {
    const folderPath = await window.api.selectFolder()
    if(!folderPath) return // Usuário Cancelou


    // Pega o nome da pasta como nome do jogo
    const name = folderPath.split('\\').pop() || folderPath.split('/').pop()

    // Adiciona na lista
    games.push({
        name: name,
        path: folderPath,
        installed: false
    })

    renderGames()

}

// Botão de Instalar / Aplicar
document.getElementById('btn-apply').addEventListener('click', async () => {
    if(!currentGame) return

    const config = {
        upscaler: document.getElementById('mf-upscaler').value,
        quality: document.getElementById('mf-quality').value,
        fg:      document.getElementById('mf-fg').value,
        rcas:    document.getElementById('mf-rcas').value,
        spoof:   document.getElementById('mf-spoof').value,
    }

    const dllName = document.getElementById('mf-dll').value

    const result = await window.api.installOptiScaler({
        gamePath: currentGame.path,
        dllName: dllName,
        config: config
    })

    if(result.success) {
        // Marca o jogo como instalado
        currentGame.installed = true
        renderGames()
        closeModal()
        alert('✅ OptiScaler instalado com sucesso em:\n' + currentGame.path)
    }else{
        alert('❌ Erro ao instalar o OptiScaler:\n' + result.error)
    }
})

// Detectar GPU ao abrir
window.api.detectGpu().then(gpu => {
    document.getElementById('gpu-name').innerHTML =
    `<b style="color:var(--text)">GPU detectada:</b> ${gpu}`
})

// Botão Desinstalar
document.getElementById('btn-uninstall').addEventListener('click', async () => {
    if (!currentGame) return

    const dllName = document.getElementById('mf-dll').value
    const confirmar = confirm(`Remover OptiScaler de:\n${currentGame.path}?`)
    if (!confirmar) return

    const result = await window.api.uninstallOptiScaler({
        gamePath: currentGame.path,
        dllName: dllName
    })

    if(result.success){
        currentGame.installed = false
        renderGames()
        closeModal()
        alert('✅ OptiScaler removido com sucesso!')
    } else {
        alert('❌ Erro ao remover o OptiScaler:\n' + result.error)
    }
})



// Botão Abrir pastas
document.getElementById('btn-open-folder').addEventListener('click', () => {
    if(!currentGame) return
    window.api.openFolder(currentGame.path)
})


document.getElementById('btn-add-game').addEventListener('click', addGame)
document.getElementById('btn-add-first').addEventListener('click', addGame)

// Inicializar
renderGames()