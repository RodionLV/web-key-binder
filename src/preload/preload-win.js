import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

const api = {
  setViewUrl: (url) => ipcRenderer.send('set-view-url', url),
  setShortcut: (keys) => ipcRenderer.send('set-shortcut', keys),
  onSelectedBtn: (cb) => ipcRenderer.on('selected-btn', (_event, value) => cb(value))
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('__API__', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.__API__ = api
}
