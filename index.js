const { app, BrowserWindow } = require('electron')
const { ElectronBlocker } = require('@cliqz/adblocker-electron')
const fetch = require("cross-fetch")

let win;

function createWindow () {
    win = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    alwaysOnTop: true,
    icon:"icon.ico"
  })



  win.loadURL('https://music.youtube.com/')

}

ElectronBlocker.fromPrebuiltAdsAndTracking(fetch).then((blocker) => {
  blocker.enableBlockingInSession(win);
});

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
