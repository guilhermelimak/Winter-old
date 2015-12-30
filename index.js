'use strict';

const electron = require('electron');
const app = electron.app;

// report crashes to the Electron project
require('crash-reporter').start();
require('electron-debug')();

let mainWindow;

function onClosed() {
	mainWindow = null;
}

function createMainWindow() {
	const win = new electron.BrowserWindow({
		width: 300,
		height: 300
		// resizable: false
	});

	win.loadURL(`file://${__dirname}/build/index.html`);
	win.on('closed', onClosed);

	return win;
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

app.on('ready', () => {
	mainWindow = createMainWindow();
});
