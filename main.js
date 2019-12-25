const { app, dialog, Menu, ipcMain } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");
const menuTemplate = require("./src/menuTemplate");
const AppWindow = require("./src/AppWindow");
const Store = require("electron-store");
const settingsStore = new Store({ name: "Settings" });
const QiniuManager = require('./src/utils/QiniuManager')

let mainWindow, settingsWindow;
const createManager = () => {
  const accessKey = settingsStore.get('accessKey')
  const secretKey = settingsStore.get('secretKey')
  const bucketName = settingsStore.get('bucketName')
  return new QiniuManager(accessKey, secretKey, bucketName)
}

app.on("ready", () => {
  const mainWindowConfig = {
    width: 1440,
    height: 768
  };
  const urlLocation = isDev ? "http://localhost:3000" : "FFFFFF";
  mainWindow = new AppWindow(mainWindowConfig, urlLocation);
  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  ipcMain.on("open-settings-window", () => {
    const settingsWindowConfig = {
      width: 500,
      height: 400,
      parent: mainWindow
    };
    const settingsFileLocation = `file://${path.join(
      __dirname,
      "./settings/settings.html"
    )}`;
    settingsWindow = new AppWindow(settingsWindowConfig, settingsFileLocation);
    settingsWindow.removeMenu()
    settingsWindow.on("closed", () => {
      settingsWindow = null;
    });
  });
  let menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);

  ipcMain.on('upload-file', (event, data) => {
    const manager = createManager()
    manager.uploadFile(data.key, data.path).then(data => {
      console.log("上传成功", data)
      mainWindow.webContents.send('active-file-uploaded')
    }).catch(() => {
      dialog.showErrorBox('同步失败', '请检查七牛云参数')
    })
  })
  ipcMain.on("config-is-saved", () => {
    let qiniuMenu = process.platform === 'darwin' ? menu.items[3] : menu.items[2]
    const switchItems = (toggle) => {
      [1, 2, 3].forEach(number => {
        qiniuMenu.submenu.items[number].enabled = toggle
      })
    }
    const qiniuIsConfiged = ['accessKey', 'secretKey', 'bucketName'].every(key => !!settingsStore.get(key))
    if (qiniuIsConfiged) {
      switchItems(true)
    } else {
      switchItems(false)
    }
  });

});
