const { app, BrowserWindow, ipcMain } = require('electron'); // Estes módulos são necessários para criar a janela da aplicação e lidar com a comunicação entre o processo principal e o processo de renderização
const path = require('path'); // Este módulo é necessário para lidar com caminhos de arquivos de forma cross-platform
const fs = require('fs');// Este módulo é necessário para ler o arquivo de configuração
const { execSync } = require('child_process'); // Este módulo é necessário para executar comandos do sistema operacional

function createWindow(){
    const win = new BrowserWindow({
        width: 800,
        height: 700,
        minWidth: 800,
        minHeight: 700,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    })// Esta função é responsável por criar a janela da aplicação com as configurações especificadas, como tamanho, preferências de web e o arquivo de preload

    win.loadFile('renderer/index.html');// Esta linha carrega o arquivo HTML que será exibido na janela da aplicação
}

app.whenReady().then(createWindow) // Este método é chamado quando a aplicação está pronta e chama a função createWindow para criar a janela da aplicação

app.on('window-all-closed', () => {
    if(process.plaform !== 'darwin') app.quit();
}) // Este método é chamado quando todas as janelas da aplicação são fechadas e, se o sistema operacional não for macOS, a aplicação é encerrada

// Detectar GPU via PowerShell
ipcMain.handle('detect-gpu', async () => {
    try {
        const result = execSync('powershell "Get-WmiOject Win32_VideoController | Select-Object -ExpandProperty Name"').toString().trim(); // Este comando PowerShell é executado para obter o nome da GPU instalada no sistema
        return result
    }catch {
        return 'GPU não detectada'; // Se ocorrer um erro ao executar o comando, uma mensagem de erro é retornada
    }
});

// Controles da Janela

ipcMain.on('window-control', () => BrowserWindow.getFocusedWindow()?.minimize()) // Este método é chamado quando o evento 'window-control' é recebido e minimiza a janela da aplicação

ipcMain.on('window-maximixe', () => {
    const win =BrowserWindow.getFocusedWindow();
    win?.isMaximized() ? win.unmaximize() : win?.maximize(); // Este método é chamado quando o evento 'window-maximize' é recebido e alterna entre maximizar e restaurar a janela da aplicação
})

ipcMain.on('window-close', () => BrowserWindow.getFocusedWindow()?.close())// Este método é chamado quando o evento 'window-close' é recebido e fecha a janela da aplicação