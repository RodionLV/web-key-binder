import { contextBridge, ipcRenderer } from 'electron'

import type { MainApi } from './types/types.ts'

declare const window: {
  __API__: MainApi
} & Window

const api: MainApi = {
  setViewUrl: (url) => ipcRenderer.send('set-view-url', url),
  setShortcut: (keys) => ipcRenderer.send('set-shortcut', keys),
  onSelectedElement: (cb) => ipcRenderer.on('selected-element', (_event, elem) => cb(elem)),
  setOptions: (options) => ipcRenderer.send('set-options', options)
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
