const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('__API__', {
  sendIndexOnButton: (index)=>ipcRenderer.send("index-btn", index)
})