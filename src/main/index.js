import { app, shell, BrowserWindow, globalShortcut, WebContentsView, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'

import fs from 'fs'

let boundsView = {
  width: 800,
  height: 670,
  y: 0,
  x: 0
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1600,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    // ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/preload-win.js'),
      sandbox: false
    }
  })

  win.webContents.insertCSS(`#view { flex: 0 0 ${boundsView.width}px}`)
  const view = new WebContentsView({
    webPreferences: {
      preload: join(__dirname, '../preload/preload-view.js')
    }
  })

  win.contentView.addChildView(view)
  view.setBounds(boundsView)

  view.webContents.loadURL('https://translate.yandex.com/')

  view.webContents.on('did-finish-load', () => {
    fs.readFile('./src/main/injected-script.js', (err, data) => {
      if (err) throw err
      view.webContents.executeJavaScript(data)
    })
  })

  win.on('ready-to-show', () => {
    win.show()
  })

  win.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    win.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    win.loadFile(join(__dirname, '../renderer/index.html'))
  }

  view.webContents.openDevTools()
  // win.webContents.openDevTools()
  return {
    view: view,
    win: win
  }
}

const initHandlers = ({ view, win }) => {
  ipcMain.on('set-view-url', (event, url) => {
    view.webContents.loadURL(url)
  })

  ipcMain.on('index-btn', (event, index) => {
    win.webContents.send('selected-btn', index)
  })

  ipcMain.on('bind-keys', (event, keys) => {
    console.log(keys)
  })
}

const startApp = () => {
  initHandlers(createWindow())
}

app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  startApp()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) startApp()
  })

  // const ret = globalShortcut.register('X', () => {
  //   console.log('X is pressed')
  // })

  // if (!ret) {
  //   console.log('registration failed')
  // }

  // // Check whether a shortcut is registered.
  // console.log(globalShortcut.isRegistered('X'))
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
