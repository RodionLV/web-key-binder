import { contextBridge, ipcRenderer } from 'electron'
import { elementBindStore } from '../db/stores/element_bind_store.js'

import { IPC_EVENTS } from '../utils/consts'

import { MainWindow, MainApi } from '../types/types'

declare const window: MainWindow

const api: MainApi = {
  setViewUrl: (url) => ipcRenderer.send(IPC_EVENTS.SET_VIEW_URL, url),
  setShortcut: (url, element, shortcut) =>
    ipcRenderer.send(IPC_EVENTS.SET_SHORTCUT, {
      url,
      element,
      shortcut
    }),
  onSelectedElement: (cb) =>
    ipcRenderer.on(IPC_EVENTS.ON_SELECT_ELEMENT, (_event, elem) => cb(elem)),
  setOptions: (options) => ipcRenderer.send(IPC_EVENTS.SET_OPTIONS, options),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getAllBindByUrl: (url) => elementBindStore.getAll(),
  deleteById: (id) => elementBindStore.deleteById(id)
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
