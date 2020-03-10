const mutations = {
  setAPIConfig(state, data) {
    state.instance.experience.setAPIConfig(data);
  },
  setConfig: (state, data) => {
    state.instance.experience.setConfig(data);
  },
  setHotkey: (state, data) => {
    state.app.hotkey = data;
  },
  setMessage: (state, data) => {
    state.app.message = data;
  },
};

export default mutations;
