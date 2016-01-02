(() => {
  const Electron = require('electron');
  const shell = Electron.shell;

  window.openUrl = (url) => shell.openExternal(url);
})();
