const { contextBridge } = require('electron/renderer')


contextBridge.exposeInMainWorld('__API__', {
})