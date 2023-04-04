/* eslint-disable no-console */
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const fs = require('fs');
const md5 = require('js-md5');
const dataUrl = require('dataurl');

function createWindow() {
  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '../index.html'),
    protocol: 'file:',
    slashes: true,
  });
  const win = new BrowserWindow({
    width: 900,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    }
  });
  win.loadURL(startUrl);
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
}
app.whenReady().then(createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.handle('sendFile', (e, data) => new Promise((res, rej) => {
  fs.readdir(data, (err, files) => {
    res(files.filter((file) => path.extname(file) && '.jpg,.jpeg,.png,.webp,.png,.mp3'.includes(path.extname(file.toLowerCase()))));
  });
}));

ipcMain.handle('hash', (e, data) => new Promise((res, rej) => {
  fs.readFile(data, 'utf-8', (err, result) => {
    if (err) {
      console.log(`error on ${data} read`);
    }
    res(JSON.stringify({
      name: data,
      hash: md5(result),
      ext: path.extname(data)
    }));
  });
}));

ipcMain.handle('saveHash', (e, data) => new Promise((res, rej) => {
  const { hash, path: folder } = JSON.parse(data);
  fs.writeFile(`${folder}_map.hash`, JSON.stringify(hash), (err) => {
    res('button--success');
  });
}));

ipcMain.handle('toBase64', (e, message) => new Promise((res, rej) => {
  fs.readFile(message, (er, data) => {
    res(data.toString('base64'));
  });
}));

ipcMain.handle('toMp3', (e, message) => new Promise((res, rej) => {
  fs.readFile(message, (er, data) => {
    res(dataUrl.convert({ data, mimetype: 'audio/mp3' }));
  });
}));

ipcMain.handle('replaceFiles', (e, data) => {
  const dataObj = JSON.parse(data);
  dataObj.old.forEach((file, i) => {
    fs.rename(file, dataObj.new[i], (err) => {
      if (err) {throw err;}
    });
  });
});
