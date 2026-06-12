const { contextBridge, ipcRenderer } = require('electron'); // Estes módulos são necessários para criar uma ponte segura entre o processo de renderização e o processo principal da aplicação

contextBridge.exposeInMainWorld('api', {

    // Janela
    minimize: () => ipcRenderer.send('window-minimize'),
    maximize: () => ipcRenderer.send('window-maximize'),
    close: () => ipcRenderer.send('window-close'),
    detectGpu: () => ipcRenderer.invoke('detect-gpu'),
    selectFolder: () => ipcRenderer.invoke('select-folder'),
    installOptiScaler : (data) => ipcRenderer.invoke('install-optiscaler',data),
    unistallOptiScaler: (data) => ipcRenderer.invoke('uninstall-optiscaler', data),

    // Futuramente: instalar, remover, listar jogos...


})