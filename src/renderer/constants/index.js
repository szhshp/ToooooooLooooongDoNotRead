const PLAY_STATE = {
  READY: '已就绪',
  LOADING: '正在合成',
  PLAYING: '正在播放',
  STOP: '已停止',
  PAUSE_PLAY: '继续播放',
  PAUSE: '已暂停',
  ENDPLAY: '播放结束',
  ERROR: '合成失败',
};

const DEFAULT_HOTKEY = 'Ctrl+Space';
const HOTKEY = ['Alt+C', 'Alt+X', 'Alt+Z', 'Ctrl+Alt+C', 'Ctrl+Space'];

const API_CONFIG = {
  APPID: '5cfcf744',
  API_SECRET: '2b1a557b433562abbc48a87d9abe8cbd',
  API_KEY: 'bcbb00f840651c4de1686b11db01b549',
};


export {PLAY_STATE, API_CONFIG, HOTKEY, DEFAULT_HOTKEY};
