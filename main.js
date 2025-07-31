import { app, BrowserWindow, screen} from 'electron';
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
    resizable: false,
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

  // Accounting for machines with different DPI scaling
  win.webContents.on('did-finish-load', () => {
    const display = screen.getDisplayNearestPoint(win.getBounds());
    const scaleFactor = display.scaleFactor;
    const baseZoom = 1.35;
    const normalizedZoom = baseZoom / scaleFactor;
    win.webContents.setZoomFactor(normalizedZoom);
  });

  win.on('focus', () => {
    const display = screen.getDisplayNearestPoint(win.getBounds());
    const scaleFactor = display.scaleFactor;
    const baseZoom = 1.35;
    const normalizedZoom = baseZoom / scaleFactor;
    win.webContents.setZoomFactor(normalizedZoom);
  });

}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
