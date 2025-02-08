const { app, BrowserWindow, BaseWindow, WebContentsView } = require('electron')

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

  const targetPage = new WebContentsView()
  win.contentView.addChildView(targetPage)
  targetPage.setBounds(boundsView)

  targetPage.webContents.loadURL('https://github.com')


  win.loadFile("../web/index.html")
  
  win.webContents.on('did-finish-load', ()=>{
    fs.readFile("./src/app/injected-script.js", (err, data)=>{
      if(err) throw err
      win.webContents.executeJavaScript(data)
    })
  })

  win.webContents.openDevTools()
}

app.whenReady().then(()=>{
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})