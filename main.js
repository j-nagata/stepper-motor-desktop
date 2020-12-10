const { app, BrowserWindow, protocol, ipcMain } = require('electron');
const path = require('path');
const SerialPort = require('serialport');
const url = require('url');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1280,
        height: 720,
        minWidth: 640,
        minHeight: 720,
        webPreferences: {
            nodeIntegration: true,
        },
        resizable: true,
    });

    win.loadFile('build/index.html');

    win.webContents.openDevTools();
};

app.allowRendererProcessReuse = false;

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    // if (process.platform !== "darwin") {
    //     app.quit();
    // }
    app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

ipcMain.handle('rotation', async (event, arg) => {
    var ports = await SerialPort.list();

    console.log(arg);
});

ipcMain.handle('save', async (event) => {
    console.log('save');
});

ipcMain.handle('reset', async (event) => {
    console.log('reset');
});
