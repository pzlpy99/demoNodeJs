const {
  app,
  BrowserWindow,
  ipcMain
} = require('electron')

const isDev = require('electron-is-dev')
let mainWindow
app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1600,
    height: 1200,
    webPreferences: {
      nodeIntegration: true
    }
  })
  const urlLocation = isDev ? "http://localhost:3000" : "FFFFFF"
  mainWindow.loadURL(urlLocation)

})