const { app, dialog, Menu, ipcMain } = require("electron");
const isDev = require("electron-is-dev");
const { autoUpdater } = require("electron-updater");
const path = require("path");
const menuTemplate = require("./src/menuTemplate");
const AppWindow = require("./src/AppWindow");
const Store = require("electron-store");
const settingsStore = new Store({ name: "Settings" });
const QiniuManager = require('./src/utils/QiniuManager')
const fileStore = new Store({ name: 'Files Data' })

let mainWindow, settingsWindow;
const createManager = () => {
  const accessKey = settingsStore.get('accessKey')
  const secretKey = settingsStore.get('secretKey')
  const bucketName = settingsStore.get('bucketName')
  return new QiniuManager(accessKey, secretKey, bucketName)
}

app.on("ready", () => {
  autoUpdater.autoDownload = false
  autoUpdater.checkForUpdatesAndNotify()
  autoUpdater.on('error', (error) => {
    dialog.showErrorBox('Error:', error == null ? "unknown" : (error.status))
  })
  autoUpdater.on('update-available', () => {
    dialog.showMessageBox({
      type: 'info',
      title: '应用有新的版本',
      message: '发现新的版本，是否更新',
      buttons: ['是', '否']
    }, (buttonIndex) => {
      if (buttonIndex === 0) {
        autoUpdater.downloadUpdate()
      }
    })
  })
  autoUpdater.on('update-not-available', () => {
    dialog.showMessageBox({
      title: '应用没有新的版本',
      message: '当前已经是最新版本'
    })
  })
  const mainWindowConfig = {
    width: 1440,
    height: 768
  };

  const urlLocation = isDev ? "http://localhost:3000" : `file://${path.join(__dirname, './index.html')}`;
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
  ipcMain.on("download-file", (event, data) => {
    const manager = createManager()
    const filesObj = fileStore.get('files')
    const { key, path, id } = data
    manager.getStat(data.key).then((resp) => {
      const serverUpdatedTime = Math.round(resp.putTime / 10000)
      console.log('qiniu', serverUpdatedTime)
      const localUpdatedTime = filesObj[id].updateAt
      console.log('local', localUpdatedTime)
      if (serverUpdatedTime > localUpdatedTime || !localUpdatedTime) {
        console.log('new file downloaded')
        manager.downloadFile(key, path).then(() => {
          mainWindow.webContents.send('file-downloaded', { status: 'download-success', id })
        })
      } else {
        console.log('no new file')
        mainWindow.webContents.send('file-downloaded', { status: 'no-new-file', id })
      }
    }, (error) => {
      console.log(error)
      if (error.statusCode === 612) {
        mainWindow.webContents.send('file-downloaded', { status: 'no-file' })
      }
    })
  })
  ipcMain.on('upload-all-to-qiniu', () => {
    mainWindow.webContents.send('loading-status', true)
    const manager = createManager()
    const filesObj = fileStore.get('files') || {}
    const uploadPromiseArr = Object.keys(filesObj).map(key => {
      const file = filesObj[key]
      return manager.uploadFile(`${file.title}.md`, file.path)
    })
    Promise.all(uploadPromiseArr).then(result => {
      console.log(result)
      dialog.showMessageBox({
        type: 'info',
        title: `成功上传了${result.length}个文件`,
        message: `成功上传了${result.length}个文件`
      })
      mainWindow.webContents.send('files-uploaded')
    }).catch(() => {
      dialog.showMessageBox('同步失败', '请检查七牛云参数是否正确')
    }).finally(() => {
      mainWindow.webContents.send('loading-status', false)
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
