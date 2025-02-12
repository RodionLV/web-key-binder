import { contextBridge, ipcRenderer } from 'electron'

import type { ViewApi } from './types/types.ts'

declare const window: {
  __API__: ViewApi
} & Window

const api: ViewApi = {
  sendIndexOnButton: (index) => ipcRenderer.send('index-btn', index),
  onActivate: (cb) => ipcRenderer.on('activate', (_event, index) => cb(index)),
  onChangeOptions: (cb) => ipcRenderer.on('options', (_event, options) => cb(options))
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
