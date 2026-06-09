const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1024,
    minHeight: 768,
    titleBarStyle: 'hidden',
    trafficLightPosition: { x: 10, y: 10 },
    backgroundColor: '#09090b',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webviewTag: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    icon: path.join(__dirname, '../public/icon.png'),
  });

  // Load the app
  const isDev = process.env.NODE_ENV === 'development';
  
  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC handlers for browser control
ipcMain.handle('navigate', async (event, url) => {
  const webView = mainWindow.getWebView();
  if (webView) {
    webView.loadURL(url);
    return { success: true };
  }
  return { success: false, error: 'No webview found' };
});

ipcMain.handle('go-back', async () => {
  const webView = mainWindow.getWebView();
  if (webView && webView.canGoBack()) {
    webView.goBack();
    return { success: true };
  }
  return { success: false };
});

ipcMain.handle('go-forward', async () => {
  const webView = mainWindow.getWebView();
  if (webView && webView.canGoForward()) {
    webView.goForward();
    return { success: true };
  }
  return { success: false };
});

ipcMain.handle('refresh', async () => {
  const webView = mainWindow.getWebView();
  if (webView) {
    webView.reload();
    return { success: true };
  }
  return { success: false };
});

ipcMain.handle('execute-script', async (event, script) => {
  const webView = mainWindow.getWebView();
  if (webView) {
    try {
      const result = await webView.executeJavaScript(script);
      return { success: true, result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  return { success: false, error: 'No webview found' };
});
