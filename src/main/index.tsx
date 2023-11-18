const { app, BrowserWindow, nativeTheme } = require('electron');
const path = require('path');

let win;

const createWindow = () => {
  win = new BrowserWindow({
    width: 1920,
    height: 1080,
    backgroundColor: '#000',
    icon: path.join(__dirname, '../../public/favicon.ico'),
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
    },
  });

  win.removeMenu();

  win.on('closed', () => {
    win = null;
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
