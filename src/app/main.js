const { app, BrowserWindow, WebContentsView, ipcMain, globalShortcut } = require('electron')

const readline = require('node:readline');
const path = require('node:path')
const fs = require('fs')

let boundsView = {
  width: 800,
  height: 600,
  y: 0,
  x: 0
}


const createWindow = ()=>{
  const win = new BrowserWindow({
    height: 600,
    width: 1600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.webContents.insertCSS(`#view { flex: 0 0 ${boundsView.width}px}`)

  const view = new WebContentsView({
    webPreferences: {
      preload: path.join(__dirname, 'preload-view.js')
    }
  })
  win.contentView.addChildView(view)
  view.setBounds(boundsView)

  view.webContents.loadURL('https://translate.yandex.com/')
  win.loadFile("../web/index.html")
  
  view.webContents.on('did-finish-load', ()=>{
    fs.readFile("./src/app/injected-script.js", (err, data)=>{
      if(err) throw err
      view.webContents.executeJavaScript(data)
    })
  })
 
  view.webContents.openDevTools()
  // win.webContents.openDevTools()
  return {
    view: view,
    win: win
  }
}

const initHandlers = ({ view, win })=>{
  ipcMain.on("set-view-url", (event, url)=>{
   view.webContents.loadURL(url) 
  })

  ipcMain.on("index-btn", (event, index) => {
    win.webContents.send('selected-btn', index)
  })

  ipcMain.on("bind-keys", (event, keys) => {
   console.log(keys) 
  })
}

const startApp = ()=>{
  initHandlers(createWindow())
}

app.whenReady().then(()=>{
  startApp()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) startApp() 
  })

  const ret = globalShortcut.register('X', () => {
    console.log('X is pressed')
  })

  if (!ret) {
    console.log('registration failed')
  }
  
  // Check whether a shortcut is registered.
  console.log(globalShortcut.isRegistered('X'))
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})