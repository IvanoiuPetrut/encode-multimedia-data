const { app, BrowserWindow } = require("electron");
const path = require("path");

if (require("electron-squirrel-startup")) {
  app.quit();
}

let mainWindow;
let shannonView;
let lz77View;
let lzwView;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadFile(path.join(__dirname, "views/shannon.html"));

  mainWindow.webContents.openDevTools();

  shannonView = new BrowserWindow({
    width: 1100,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  lz77View = new BrowserWindow({
    width: 1100,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  lzwView = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  shannonView.loadFile(path.join(__dirname, "views/shannon.html"));
  lz77View.loadFile(path.join(__dirname, "views/lz77.html"));
  lzwView.loadFile(path.join(__dirname, "views/lzw.html"));

  shannonView.hide();
  lz77View.hide();
  lzwView.hide();
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

function navigateToView(view) {
  switch (view) {
    case "shannon":
      shannonView.show();
      lz77View.hide();
      lzwView.hide();
      break;
    case "lz77":
      shannonView.hide();
      lz77View.show();
      lzwView.hide();
      break;
    case "lzw":
      shannonView.hide();
      lz77View.hide();
      lzwView.show();
      break;
    default:
      break;
  }
}

exports.navigateToView = navigateToView;
