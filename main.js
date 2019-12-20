const { app, BrowserWindow, Menu } = require('electron')
const isDev = require('electron-is-dev')
const menuTemplate = require('./src/menuTemplate')
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

  const menu = Menu.buildFromTemplate(menuTemplate)
  Menu.setApplicationMenu(menu)
})