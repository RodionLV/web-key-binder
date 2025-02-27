import {
  app,
  shell,
  BrowserWindow,
  globalShortcut,
  WebContentsView,
  ipcMain
} from 'electron'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { join } from 'path'

import { injectScript, injectCSS } from './inject'
import { IPC_EVENTS } from '../utils/consts'
import { isNotUndefined } from '../utils/type.utils'
import { elementBindStore } from '../db/stores/element_bind_store'

import { ElementBindType, Shortcut } from '../types/types'

const boundsView = {
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
      preload: join(__dirname, '../preload/preload_main.js'),
      sandbox: false
    }
  })

  // win.webContents.insertCSS(`#view { flex: 0 0 ${boundsView.width}px}`)
  const view = new WebContentsView({
    webPreferences: {
      preload: join(__dirname, '../preload/preload_view.js'),
      sandbox: false
    }
  })

  win.contentView.addChildView(view)
  view.setBounds(boundsView)

  view.webContents
    .loadURL('https://translate.google.com/?sl=auto&tl=en&op=translate')
    .then(() => {
      view.webContents.insertCSS(injectCSS())
      view.webContents.executeJavaScript(injectScript())
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

const onActiveShortcut = (view, element) => {
  view.webContents.send(IPC_EVENTS.ON_ACTIVATE_SHORTCUT, element)
}

const registerAllShortcuts = async (view) => {
  const items = await elementBindStore.getAll()

  for (const item of items) {
    globalShortcut.register(item.shortcut.join('+'), () =>
      onActiveShortcut(view, item.element)
    )
  }
}

const initHandlers = ({ view, win }) => {
  ipcMain.on(IPC_EVENTS.SET_VIEW_URL, (_event, url) => {
    view.webContents.loadURL(url)
  })

  ipcMain.on(IPC_EVENTS.SET_BINDING_ELEMENT, (_event, elem) => {
    console.log('selected element:', elem)
    win.webContents.send(IPC_EVENTS.ON_SELECT_ELEMENT, elem)
  })

  ipcMain.on(
    IPC_EVENTS.DELETE_BIND,
    (_e, { id, shortcut }: { id: string; shortcut: Shortcut }) => {
      console.log(id, shortcut)
      globalShortcut.unregister(shortcut.join('+'))
      elementBindStore.deleteById(id)
    }
  )

  ipcMain.handle(
    IPC_EVENTS.SET_SHORTCUT,
    async (_event, { url, shortcut, element }: ElementBindType) => {
      if (!isNotUndefined(url))
        return { error: 'url is undefined', result: null }
      if (!isNotUndefined(element))
        return { error: 'element is undefined', result: null }

      const joinedShortcut = shortcut.join('+')
      const ret = globalShortcut.register(joinedShortcut, () =>
        onActiveShortcut(view, element)
      )

      if (!ret)
        return {
          error: `registration failed for shortcut ${joinedShortcut}`,
          result: null
        }

      const isExist = !!(await elementBindStore.getByUrlAndElementId(
        url,
        element.id
      ))

      console.log('isExist =', isExist)
      if (isExist) return { error: 'bind is already exist', result: null }

      if (globalShortcut.isRegistered(joinedShortcut)) {
        const createdElement = await elementBindStore.create({
          url,
          element,
          shortcut
        })

        console.log('creation succesed for shortcut:', joinedShortcut)
        return { error: null, result: createdElement }
      }

      return { error: 'unknown error', result: null }
    }
  )

  ipcMain.on(IPC_EVENTS.SET_OPTIONS, (_e, options) => {
    console.log(options)
    view.webContents.send(IPC_EVENTS.ON_CHANGE_OPTIONS, options)
  })
}

const startApp = () => {
  const { view, win } = createWindow()

  initHandlers({ view, win })
  registerAllShortcuts(view)
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
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
