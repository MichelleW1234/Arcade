import { app, BrowserWindow, screen} from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

// Required to construct __dirname in ES module style
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define zoom globally
let adjustedZoom = 0.7;

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


  /*Accounting for consistency in zoom across different machines: */
  const scaleFactor = screen.getPrimaryDisplay().scaleFactor;     // Get screen scale (DPI factor)
  const baseZoom = 0.7;    // Define a base zoom
  adjustedZoom = baseZoom / scaleFactor;    // Adjust for screen DPI


  win.webContents.on('did-finish-load', () => {
    win.webContents.setZoomFactor(adjustedZoom);
  });

}

app.on('browser-window-focus', () => {
  const win = BrowserWindow.getFocusedWindow();
  if (win) {
    win.webContents.setZoomFactor(adjustedZoom);
  }
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
