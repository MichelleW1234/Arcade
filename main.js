import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

// Required to construct __dirname in ES module style
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    fullscreen: true,
    webPreferences: {
      nodeIntegration: true
    }
  });

  const isDev = !app.isPackaged;

  if (isDev) {
    win.loadURL('http://localhost:5000');
  } else {
    win.loadFile(path.join(__dirname, 'dist', 'index.html'));
  }

  // 🔧 Set zoom to normal (1 = 100%)
  win.webContents.on('did-finish-load', () => {
    win.webContents.setZoomFactor(0.70);
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});


app.on('browser-window-focus', () => {
  const win = BrowserWindow.getFocusedWindow();
  if (win) {
    win.webContents.setZoomFactor(0.7);  // or 1.0, whatever you want as default
  }
});