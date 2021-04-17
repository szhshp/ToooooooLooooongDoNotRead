# ToooooooLooooongDoNotRead

## 开发背景

太长了不愿写

## 功能

使用快捷键阅读剪贴板里面的文字

1. 注册 [讯飞开放平台账号](https://www.xfyun.cn/)
1. 到[控制台](https://console.xfyun.cn/app/myapp) 创建一个 APP, 拷贝下
    
     ![image](https://user-images.githubusercontent.com/10084666/115117637-2f460a80-9fd2-11eb-86f9-1d0f1f64fc75.png)
     
3. 复制对应的 `APPID`, `APISecret`, `APIKey` 到设置页面
    
     ![image](https://user-images.githubusercontent.com/10084666/115117652-408f1700-9fd2-11eb-8088-03feac59cf76.png)
     



## Debug

```
yarn
yarn run dev
```

## Build

Prod 环境会关闭 Developer Tools 窗体
需要管理员权限

```
# build 全部环境
yarn build

# build 特定环境
yarn build:win32
```

## TODO

- 功能
  - [ ] 暂停功能
  - [ ] 自动更新
  - [ ] 保存到托盘
  - [x] 显示阅读状态
  - [x] 最大文本长度 13000 错误信息提醒
  - [x] Error Handling
  - [x] ~~超出 1000 字就分多次调用~~
  - [x] ~~多语言~~
- 快捷键
  - [x] 默认快捷键
  - [x] 快捷键绑定状态与信息
- UI
  - [x] 菜单 UI
  - [x] 播放的状态文本
  - [x] 快捷键错误信息
  - [x] 保存成功的信息
  - [x] 导入 Icon Font
  - [x] Github 链接
  - [x] 加上开发者的帅气的联系方式
  - [x] 软件图标
  - [ ] API Keys 输入之后显示不可见
- 配置
  - [x] API Key 自定义
  - [x] 声音自定义
  - [x] 音调自定义
  - [x] 语速自定义
  - [x] 本地保存配置
- Release
  - [x] Build Alpha
  - [ ] ~~Mac 版本 (Mac 不是自带类似的功能嘛)~~
  - [ ] 官方网站?
  - [ ] CI/CD?

