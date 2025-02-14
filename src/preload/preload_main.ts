import { contextBridge, ipcRenderer } from 'electron'

import { IPC_EVENTS } from '../utils/consts.js'

declare const window: {
  __API__: MainApi
} & Window

const api: MainApi = {
  setViewUrl: (url) => ipcRenderer.send(IPC_EVENTS.SET_VIEW_URL, url),
  setShortcut: (keys) => ipcRenderer.send(IPC_EVENTS.SET_SHORTCUT, keys),
  onSelectedElement: (cb) =>
    ipcRenderer.on(IPC_EVENTS.ON_SELECT_ELEMENT, (_event, elem) => cb(elem)),
  setOptions: (options) => ipcRenderer.send(IPC_EVENTS.SET_OPTIONS, options)
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
