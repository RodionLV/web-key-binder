import { contextBridge, ipcRenderer } from 'electron'

const api = {
  sendIndexOnButton: (index) => ipcRenderer.send('index-btn', index),
  onActiveHandle: (cb) => ipcRenderer.on('active-handle', (_event, index) => cb(index)) 
}

if (process.contextIsolated) {
  try { 
    contextBridge.exposeInMainWorld('__API__', api)
  } catch (error) {
    console.error(error)
  }
} else { 
  window.__API__ = api
}
