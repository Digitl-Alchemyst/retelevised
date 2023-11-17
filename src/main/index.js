const { app, BrowserWindow, nativeTheme } = require('electron');
const path = require('path');

const baseURL =
  process.env.NODE_ENV === 'production'
    ? process.env.PRODUCTION_URL || 'placeholder_for_production_url'
    : 'http://localhost:3333';

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

  win.loadURL(baseURL);

  win.removeMenu();

  nativeTheme.themeSource = 'dark';

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
