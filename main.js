// Modules
const { app, BrowserWindow } = require("electron");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

let secondWindow;

// Create a new BrowserWindow when `app` is ready
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      // --- !! IMPORTANT !! ---
      // Disable 'contextIsolation' to allow 'nodeIntegration'
      // 'contextIsolation' defaults to "true" as from Electron v12
      contextIsolation: false,
      nodeIntegration: true,

      // preload: path.join(__dirname, 'preload.js')
      //  show : false // to prevect the fliker
    },
  });

  // secondWindow = new BrowserWindow({
  //   width: 800,
  //   height: 600,
  //   webPreferences: { contextIsolation: false ,zoomFactor:3.0, transparent:true},
  //   parent: mainWindow,
  //   modal:true,
  //   resizable: false,
    
  // });

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile("index.html");


  // secondWindow.loadURL("https:google.com");
  // secondWindow.loadFile("secondary.html");

  // Open DevTools - Remove for PRODUCTION!
  mainWindow.webContents.openDevTools();

  // Listen for window being closed
  mainWindow.on("closed", () => {
    mainWindow = null;
  });


  mainWindow.on('app-command', (e, cmd) => {
    // Navigate the window back when the user hits their mouse back button
    // if (cmd === 'browser-backward' && win.webContents.canGoBack()) {
    //   win.webContents.goBack()
    // }
    console.log("cmd ", cmd);
  })

  // Listen for second  window being closed
  // secondWindow.on("closed", () => {
  //   mainWindow = null;
  // });
}

// Electron `app` is ready
app.on("ready", createWindow);

// Quit when all windows are closed - (Not macOS - Darwin)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on("activate", () => {
  if (mainWindow === null) createWindow();
});
