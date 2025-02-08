const { contextBridge, ipcRenderer } = require('electron/renderer')


contextBridge.exposeInMainWorld('__API__', {
  setViewUrl: (url) => ipcRenderer.send("set-view-url", url)
})