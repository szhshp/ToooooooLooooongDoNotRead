import {clipboard} from 'electron';
import Experience from '@/utils/experience.js';
import {API_CONFIG} from '../constants/index';


const experience = new Experience({
  speed: 50,
  voice: 50,
  pitch: 50,
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
    hotkey: 'None',
    version: undefined,
    message: {
      success: false,
      content: '',
      showMessage: false,
    },
  },
};

export default states;
