const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  showMessageBox: (options) => ipcRenderer.invoke('show-message-box', options),
  openExternal: (url) => ipcRenderer.invoke('open-external', url),
  getVersion: () => ipcRenderer.invoke('get-version'),
  minimizeWindow: () => ipcRenderer.invoke('minimize-window'),
  maximizeWindow: () => ipcRenderer.invoke('maximize-window'),
  closeWindow: () => ipcRenderer.invoke('close-window')
});

// Expose some useful utilities
contextBridge.exposeInMainWorld('uselessAPI', {
  generateRandomNumber: () => Math.floor(Math.random() * 100),
  getCurrentTime: () => new Date().toLocaleTimeString(),
  createUselessData: () => ({
    randomBytes: Array.from({length: 10}, () => Math.floor(Math.random() * 256)),
    timestamp: Date.now(),
    uselessness: 'Maximum'
  })
});
