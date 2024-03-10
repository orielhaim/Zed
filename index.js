const { app, BrowserWindow, ipcMain } = require('electron')
const fs = require('fs')
const path = require('path')
const model = require('./model.js');

let window;

const createWindow = async () => {
  const win = new BrowserWindow({
    title: app.name,
    show: false,
    width: 700,
    height: 400,
    minWidth: 700,
    minHeight: 400,
    //icon: path.join(__dirname, 'app', 'logo.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true, // Protect against prototype pollution.
      enableRemoteModule: false, // Turn off Remote
      preload: path.join(__dirname, 'App', 'api.js'),
    },
  });
  win.webContents.userAgent = "Zed";
  win.on('ready-to-show', () => {
    //win.maximize();
    win.show();
  });
  win.on('closed', () => {
    app.quit();
  });

  win.removeMenu(); // Remove menu.

  await win.loadFile(path.join(__dirname, 'App', 'main.html'));
  return win;
};

if (!app.requestSingleInstanceLock()) {
  app.quit();
}

app.on('second-instance', () => {
  if (window) {
    if (window.isMinimized()) {
      window.restore();
    }

    window.show();
  }
});

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', async () => {
  if (!window) {
    window = await createWindow();
  }
});

(async () => {
  await app.whenReady();
  //require(path.join(__dirname, "ipc.js"))
  window = await createWindow();
  model.init();
  ipcMain.handle('model_generete', async (event, text) => {
    console.log(text)
    return await model.generete(text);
  });
})();