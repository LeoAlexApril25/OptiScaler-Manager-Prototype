# OptiScaler-Manager-Prototype
 OptiScaler Manager

### Gerencie o OptiScaler nos seus jogos com um clique — sem editar arquivos manualmente.

[![Status](https://img.shields.io/badge/status-em%20desenvolvimento-orange)]()
[![Electron](https://img.shields.io/badge/Electron-35.x-47848F?logo=electron)]()
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2022-F7DF1E?logo=javascript)]()
[![Plataforma](https://img.shields.io/badge/plataforma-Windows-0078D6?logo=windows)]()
[![Licença](https://img.shields.io/badge/licença-MIT-green)]()

</div>

---

## 📖 O que é

O **OptiScaler Manager** é um aplicativo desktop para Windows que facilita a instalação, configuração e remoção do [OptiScaler](https://github.com/optiscaler/OptiScaler) nos seus jogos — tudo através de uma interface visual moderna, sem precisar mexer em arquivos manualmente.

O OptiScaler é uma ferramenta poderosa que permite substituir e melhorar os upscalers de jogos (FSR, DLSS, XeSS), adicionar Frame Generation e aplicar sharpening — mas a instalação manual é complexa, exige conhecimento técnico e é fácil de errar.

Este app resolve isso.

---

## 😤 O problema — dores que esse app resolve

### Sem o OptiScaler Manager, o processo manual é assim:

1. Baixar o OptiScaler do GitHub e descompactar
2. Descobrir qual DLL usar para cada jogo (`dxgi.dll`? `winmm.dll`? `d3d12.dll`?)
3. Copiar manualmente os arquivos para a pasta do jogo
4. Abrir o `OptiScaler.ini` num bloco de notas e editar dezenas de linhas
5. Configurar o spoofing de GPU para AMD/Intel
6. Se algo der errado, deletar os arquivos um por um na mão
7. Repetir todo esse processo para cada jogo novo

**Isso é demorado, confuso e fácil de errar — especialmente para quem não tem experiência técnica.**

### Com o OptiScaler Manager:

- ✅ Seleciona a pasta do jogo com um clique
- ✅ Escolhe o upscaler, qualidade e frame generation pela interface
- ✅ O app copia os arquivos e gera o `.ini` automaticamente
- ✅ Remove o OptiScaler de um jogo com um botão
- ✅ Vê todos os jogos configurados em um só lugar
- ✅ Funciona com AMD, NVIDIA e Intel

---

## ✨ Funcionalidades

### 🎮 Gerenciamento de Jogos
- Adiciona jogos manualmente selecionando a pasta do executável
- Visualiza todos os jogos em grade ou lista
- Identifica automaticamente se o OptiScaler já está instalado no jogo
- Busca rápida por nome

### ⚙️ Configuração por jogo
- Escolha do nome da DLL (`dxgi.dll`, `winmm.dll`, `version.dll`, etc.)
- Seleção do upscaler: **FSR 4**, **FSR 3.1**, **DLSS**, **XeSS**
- Nível de qualidade: Quality, Balanced, Performance, Ultra Performance
- Frame Generation: **OptiFG**, **FSR FG**, **XeFG**
- RCAS Sharpening para reduzir borrão dos upscalers
- Spoofing de GPU para AMD/Intel usarem recursos NVIDIA

### 📚 Biblioteca de versões
- Gerencia versões do OptiScaler instaladas localmente
- Filtros por tecnologia: FSR 4, FSR 3.1, DLSS, XeSS, OptiFG

### 🎨 Temas visuais
- Preto e Branco (padrão)
- **AMD** Dark e Vivo
- **NVIDIA** Dark e Vivo  
- **Intel** Dark e Vivo
- Detecção automática da GPU para aplicar o tema correspondente

---

## 🛠️ Tecnologias utilizadas

| Tecnologia | Versão | Para que serve no projeto |
|------------|--------|--------------------------|
| [Node.js](https://nodejs.org) | 22.x LTS | Motor JavaScript — copia arquivos, acessa o sistema |
| [Electron](https://electronjs.org) | 35.x | Transforma o app web em janela desktop |
| [electron-builder](https://electron.build) | 25.x | Empacota tudo em um instalador `.exe` |
| [@tabler/icons-webfont](https://tabler.io/icons) | latest | Biblioteca com 5000+ ícones para a interface |
| HTML5 / CSS3 | — | Estrutura e estilo da interface visual |
| JavaScript ES2022 | — | Lógica do app, interatividade, comunicação IPC |
| PowerShell (via Node.js) | — | Detecta a GPU do sistema automaticamente |
| Windows Dialog API | — | Abre o explorador de arquivos nativo do Windows |

### 🔜 Tecnologias planejadas

| Tecnologia | Para que vai servir |
|------------|---------------------|
| SteamGridDB API | Buscar capas dos jogos automaticamente pelo nome |
| Windows Registry API | Detectar jogos instalados do Steam, Epic, GOG automaticamente |
| electron-updater | Atualizações automáticas do app |
| VDF parser | Ler as bibliotecas do Steam (`libraryfolders.vdf`) |

---

## 📁 Estrutura do projeto

```
optiscaler-manager/
├── main.js                 # Processo principal — lógica de sistema
├── preload.js              # Ponte segura entre Node.js e interface
├── package.json            # Configurações e dependências do projeto
│
├── renderer/               # Interface visual (o que o usuário vê)
│   ├── index.html          # Estrutura da interface
│   ├── style.css           # Estilos e temas
│   └── app.js              # Lógica da interface e interatividade
│
└── assets/
    ├── icons/              # Ícones do app (.ico, .svg, .png)
    │   ├── icon.ico        # Ícone para o executável final
    │   ├── icon_512.svg    # Versão grande
    │   ├── icon_128.svg    # Versão média
    │   └── icon_48.svg     # Versão pequena
    │
    └── optiscaler/         # Arquivos do OptiScaler bundled
        ├── OptiScaler.dll
        ├── OptiScaler.ini
        ├── fakenvapi.dll
        ├── fakenvapi.ini
        ├── libxess.dll
        ├── libxess_dx11.dll
        ├── libxess_fg.dll
        ├── libxell.dll
        ├── amd_fidelityfx_dx12.dll
        ├── amd_fidelityfx_framegeneration_dx12.dll
        ├── amd_fidelityfx_upscaler_dx12.dll
        ├── amd_fidelityfx_vk.dll
        └── dlssg_to_fsr3_amd_is_better.dll
```

---

## 🚀 Como rodar em modo de desenvolvimento

### Pré-requisitos

- [Node.js](https://nodejs.org) 18+ instalado
- Windows 10 ou 11

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seuusuario/optiscaler-manager.git
cd optiscaler-manager

# Instale as dependências
npm install

# Rode o app
npm start
```

### Gerar o executável

```bash
npm run build
# O instalador aparece em dist/
```

---

## 🗺️ Roadmap

- [x] Interface visual completa (topbar, navegação, temas)
- [x] Adicionar jogos manualmente
- [x] Detecção de GPU
- [ ] Instalar e remover OptiScaler nos jogos
- [ ] Geração automática do OptiScaler.ini
- [ ] Detecção automática de jogos do Steam
- [ ] Capas dos jogos via SteamGridDB
- [ ] Detecção automática de jogos do Epic, GOG
- [ ] Atualizações automáticas do app
- [ ] Suporte a múltiplas versões do OptiScaler

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Se você encontrou um bug ou tem uma sugestão, abra uma [issue](https://github.com/seuusuario/optiscaler-manager/issues).

---

## ⚠️ Aviso

Este projeto não é afiliado ao projeto oficial do OptiScaler. Os arquivos do OptiScaler incluídos são redistribuídos sob os termos da licença original do projeto.

---

## 📄 Licença

MIT © 2026 — feito com 💛 para a comunidade gamer brasileira.
