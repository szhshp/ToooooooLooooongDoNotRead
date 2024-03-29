import { ipcRenderer } from "electron";

const validateText = (text) => {
  if (typeof text !== "string") {
    return {
      error: "你好像拷贝了个奇怪的东西",
      success: false,
      validatedText: text,
    };
  }
  if (text.trim().length === 0) {
    return {
      error: "至少拷贝一个文字才能阅读",
      success: false,
      validatedText: text,
    };
  }
  if (text.length > 10000) {
    return {
      error: "内容长度须小于 10000 字",
      success: true,
      validatedText: text.substring(0, 10000),
    };
  }

  return {
    error: "",
    success: true,
    validatedText: text,
  };
};

const actions = {
  /* set text from inputs */
  setText: (store, { text }) => {
    text = text.trim();
    const experience = store.state.instance.experience;

    const { error, success, validatedText } = validateText(text);

    if (error) {
      store.commit("setMessage", {
        showMessage: true,
        content: error,
      });
      return;
    }

    if (success) {
      experience.setConfig({
        text: validatedText,
      });
    }
  },
  readerPlay: (store, { text }) => {
    const experience = store.state.instance.experience;

    if (text !== experience.text) {
      store.dispatch("setText", {
        text,
      });
    }
    experience.audioPlay();
  },
  readerPause: (store) => {
    const experience = store.state.instance.experience;
    experience.audioPause();
  },
  readerStop: (store) => {
    const experience = store.state.instance.experience;
    experience.audioStop();
  },
  setAPIConfig: (store, data) => {
    store.commit("setAPIConfig", data);
    store.commit("setMessage", {
      showMessage: true,
      content: "API 设置完成",
    });
  },
  setHotkey: async (store, data) => {
    try {
      ipcRenderer.send("setHotkey", data);
      store.commit("setHotkey", data.hotkey);
    } catch (error) {
      store.commit("setMessage", {
        showMessage: true,
        content: "设置失败:" + error,
      });
    }
  },
  setVoiceConfig: (store, data) => {
    store.commit("setVoiceConfig", data);
    store.commit("setMessage", {
      showMessage: true,
      content: "语音设置完成",
    });
  },
  setMessage: (store, data) => {
    store.commit("setMessage", data);
  },
};

export default actions;
