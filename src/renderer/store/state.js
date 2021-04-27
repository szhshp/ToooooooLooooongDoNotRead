import { clipboard } from "electron";
import Experience from "@/utils/experience.js";
import {
  API_CONFIG,
  DEFAULT_HOTKEY,
  STORAGE_KEY,
  DEFAULT_VOICENAME,
} from "../constants/index";

export const defaultVoiceConfig = {
  speed: 80,
  voice: 50,
  pitch: 40,
};

/* Voice config: Use saved config or default config */
const voiceConfig = {
  ...defaultVoiceConfig,
  ...JSON.parse(localStorage.getItem(STORAGE_KEY.CONFIG)),
};

/* API config: Use saved config or default config */
const APIConfig = {
  ...API_CONFIG,
  ...JSON.parse(localStorage.getItem(STORAGE_KEY.API_CONFIG)),
};

/* Hotkey config: Use saved config or default config */
const hotkey =
  JSON.parse(localStorage.getItem(STORAGE_KEY.HOTKEY)) || DEFAULT_HOTKEY;

const voiceName = voiceConfig.voiceName || DEFAULT_VOICENAME;

const experience = new Experience({
  ...voiceConfig,
  ...APIConfig,
});

const states = {
  data: {
    text: "这里显示剪切板的文本",
  },
  util: {
    clipboard,
  },
  instance: {
    experience,
  },
  app: {
    hotkey,
    voiceName,
    version: undefined,
    message: {
      success: false,
      content: "",
      showMessage: false,
    },
  },
};

export default states;
