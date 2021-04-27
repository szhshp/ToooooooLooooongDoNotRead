import {STORAGE_KEY} from '../constants/index';

const mutations = {
  setAPIConfig(state, data) {
    state.instance.experience.setAPIConfig(data);
    localStorage.setItem(STORAGE_KEY.API_CONFIG, JSON.stringify(data));
  },
  setVoiceConfig: (state, data) => {
    state.instance.experience.setVoiceConfig(data);
    localStorage.setItem(STORAGE_KEY.CONFIG, JSON.stringify(data));
  },
  setHotkey: (state, data) => {
    state.app.hotkey = data;
    localStorage.setItem(STORAGE_KEY.HOTKEY, JSON.stringify(data));
  },
  setMessage: (state, data) => {
    state.app.message = data;
  },
};

export default mutations;
