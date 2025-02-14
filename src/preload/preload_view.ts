import { contextBridge, ipcRenderer } from 'electron'

import { IPC_EVENTS } from '../utils/consts.js'

declare const window: {
  __API__: ViewApi
} & Window

const api: ViewApi = {
  sendBindingElement: (index) =>
    ipcRenderer.send(IPC_EVENTS.SET_BINDING_ELEMENT, index),
  onActivate: (cb) =>
    ipcRenderer.on(IPC_EVENTS.ON_ACTIVATE_SHORTCUT, (_event, index) =>
      cb(index)
    ),
  onChangeOptions: (cb) =>
    ipcRenderer.on(IPC_EVENTS.ON_CHANGE_OPTIONS, (_event, options) =>
      cb(options)
    )
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
