/* eslint-disable require-jsdoc */
import {
  app,
  Tray,
  BrowserWindow,
  globalShortcut,
  nativeImage,
  ipcMain,
  Menu,
} from "electron";
import path from "path";
import { DEFAULT_HOTKEY } from "../../src/renderer/constants";

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== "development") {
  global.__static = require("path")
    .join(__dirname, "/static")
    .replace(/\\/g, "\\\\");
}

let mainWindow;
const winURL =
  process.env.NODE_ENV === "development"
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`;

function createWindow() {
  mainWindow = new BrowserWindow({
    skipTaskbar: true,
    height: 600,
    width: 400,
    maxWidth: 400,
    minWidth: 400,
    maxHeight: 600,
    minHeight: 600,
  });

  mainWindow.loadURL(winURL);
  // mainWindow.webContents.openDevTools();

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  mainWindow.on("close", (event) => {
    mainWindow.minimize();
    event.preventDefault();
  });
}

const setHotKey = (hotkey) => {
  globalShortcut.unregisterAll();

  try {
    if (hotkey !== "None") {
      const ret = globalShortcut.register(hotkey, () => {
        mainWindow.webContents.send("triggerHotkey");
      });
      if (!ret) {
        mainWindow.webContents.send("setMessage", {
          content: "快捷键被占用啦",
          showMessage: true,
        });
        return;
      }
      if (!globalShortcut.isRegistered(hotkey)) {
        mainWindow.webContents.send("setMessage", {
          content: "绑定失败, 快捷键已绑定",
          showMessage: true,
        });
        return;
      }
      mainWindow.webContents.send("setMessage", {
        content: "设置快捷键成功",
        showMessage: true,
      });
    } else {
      mainWindow.webContents.send("setMessage", {
        content: "快捷键已取消",
        showMessage: true,
      });
    }
  } catch (error) {
    mainWindow.webContents.send("setMessage", {
      content: "绑定失败, 天知道哪里出问题了",
      showMessage: true,
    });
  }
};

app.on("ready", () => {
  createWindow();

  Menu.setApplicationMenu(null);

  /* received msg from renderer, then reset the hotkey */
  ipcMain.on("setHotkey", function(event, { hotkey }) {
    setHotKey(hotkey);
  });
  setHotKey(DEFAULT_HOTKEY);
  const image = nativeImage.createFromPath(path.join(__dirname, "book.png"));
  const tray = new Tray(image);
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "关于",
      submenu: [
        {
          label: "Github",
          click: async () => {
            const { shell } = require("electron");
            await shell.openExternal(
              "https://github.com/szhielelp/ToooooooLooooongDoNotRead"
            );
          },
        },
        {
          label: "作者",
          click: async () => {
            const { shell } = require("electron");
            await shell.openExternal("https://szhshp.org");
          },
        },
      ],
    },
    {
      label: "显示主窗口",
      click: () => {
        mainWindow.focus();
        mainWindow.restore();
      },
    },
    {
      label: "退出",
      click: () => app.exit(),
    },
  ]);
  tray.on("double-click", () => {
    mainWindow.focus();
    mainWindow.restore();
  });
  tray.setToolTip("ToooooooLooooogDoNotRead");
  tray.setContextMenu(contextMenu);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
