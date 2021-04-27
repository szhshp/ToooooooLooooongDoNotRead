# Dev Doc

## Installation

```
yarn
```

### Windows 依赖安装: windows build tools

> 安装需要管理员权限

 - 在线安装: `npm install -g windows-build-tools`
 - 可以使用特定版本 `npm install --global windows-build-tools@4.0.0`
 - 这个步骤会下载 **vs_BuildTools.exe 以及 python**
     - python 安装后需要重复确认一下环境变量是否设置成功, 并且同时将 python 目录加到 path 中
 - 需要用管理员权限
     - 最好在 cmd 里面临时加一下 python 的环境变量
 - 如果无法下载那就是网络问题
 - **vs_BuildTools.exe** 离线安装
   - 可以单独下载 **vs_BuildTools.exe** 然后放到 `C:\Users\{用户名}\.windows-build-tools\vs_BuildTools.exe`


## Debug

```
yarn dev
```

- Ctrl + Shift + I: 打开 Dev Tools (Prod 环境会完全关闭 Dev Tools 功能)

## Build

```
# build 全部环境
yarn build

# build 特定环境
yarn build:win32
```

## 软件图标

1. [build/icons](../build/icons): 用于窗体 logo
2. [static/book.ico](../static/book.ico): 用于任务栏 tray 的 logo 