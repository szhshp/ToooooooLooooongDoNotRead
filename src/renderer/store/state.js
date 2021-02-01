import {clipboard} from 'electron';
import Experience from '@/utils/experience.js';
import {API_CONFIG, DEFAULT_HOTKEY} from '../constants/index';


const experience = new Experience({
  speed: 80,
  voice: 50,
  pitch: 40,
  ...API_CONFIG,
});

const states = {
  data: {
    text: '这里显示剪切板的文本',
  },
  util: {
    clipboard,
  },
  instance: {
    experience,
  },
  app: {
    hotkey: DEFAULT_HOTKEY,
    version: undefined,
    message: {
      success: false,
      content: '',
      showMessage: false,
    },
  },
};

export default states;
