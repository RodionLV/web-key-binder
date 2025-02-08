const { app, BrowserWindow, WebContentsView, ipcMain } = require('electron')

const path = require('node:path')
const fs = require('fs')

let boundsView = {
  width: 420,
  height: 600,
  y: 0,
  x: 0
}


const createWindow = ()=>{
  const win = new BrowserWindow({
    height: 600,
    width: 1000,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.webContents.insertCSS(`#view { flex: 0 0 ${boundsView.width}px}`)

  const view = new WebContentsView()
  win.contentView.addChildView(view)
  view.setBounds(boundsView)

  view.webContents.loadURL('https://github.com')


  win.loadFile("../web/index.html")
  
  view.webContents.on('did-finish-load', ()=>{
    fs.readFile("./src/app/injected-script.js", (err, data)=>{
      if(err) throw err
      view.webContents.executeJavaScript(data)
    })
  })

  win.webContents.openDevTools()
  return {
    view: view,
    win: win
  }
}

const initHandlers = ({ view })=>{
  ipcMain.on("set-view-url", (event, url)=>{
   view.webContents.loadURL(url) 
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
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})