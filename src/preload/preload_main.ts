import { contextBridge, ipcRenderer } from 'electron'
import { elementBindStore } from '../db/stores/element_bind_store.js'

import { IPC_EVENTS } from '../utils/consts.js'

declare const window: {
  __API__: MainApi
} & Window

const api: MainApi = {
  setViewUrl: (url) => ipcRenderer.send(IPC_EVENTS.SET_VIEW_URL, url),
  setShortcut: (bind) => ipcRenderer.send(IPC_EVENTS.SET_SHORTCUT, bind),
  onSelectedElement: (cb) =>
    ipcRenderer.on(IPC_EVENTS.ON_SELECT_ELEMENT, (_event, elem) =>
      cb(elem)
    ),
  setOptions: (options) =>
    ipcRenderer.send(IPC_EVENTS.SET_OPTIONS, options),
  getAllBindByUrl: (_url) => elementBindStore.getAll()
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
