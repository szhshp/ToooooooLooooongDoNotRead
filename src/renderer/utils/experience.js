/* eslint-disable require-jsdoc */
import CryptoJS from 'crypto-js';
import hmacSHA256 from 'crypto-js/hmac-sha256';
import Base64 from 'crypto-js/enc-base64';
import transform from './audioTransfer';
import {PLAY_STATE} from '../constants/index';
import {defaultVoiceConfig} from '../store/state'
let audioCtx;
let source;

const DEFAULT_TEXT = '似乎没有获取到任何文本, 先复制一段文本再来尝试吧.';

const isChrome = navigator.userAgent.toLowerCase().match(/chrome/);
const notSupportTip = isChrome ?
  '您的浏览器暂时不支持体验功能，请升级您的浏览器' :
  '您现在使用的浏览器暂时不支持体验功能，<br />推荐使用谷歌浏览器Chrome';

class Experience {
  constructor({
    speed = defaultVoiceConfig.speed,
    voice = defaultVoiceConfig.voice,
    pitch = defaultVoiceConfig.pitch,
    voiceName = defaultVoiceConfig.voiceName,
    API_KEY,
    API_SECRET,
    APPID,
    text = '',
    engineType = 'aisound',
    defaultText = '',
  } = {}) {
    this.speed = speed;
    this.voice = voice;
    this.pitch = pitch;
    this.voiceName = voiceName;
    this.API_KEY = API_KEY;
    this.API_SECRET = API_SECRET;
    this.APPID = APPID;
    this.text = text;
    this.defaultText = defaultText;
    this.engineType = engineType;
    this.state = PLAY_STATE.READY;
    this.audioDatas = [];
  }

  setConfig({speed, voice, pitch, text, defaultText, engineType, voiceName}) {
    speed && (this.speed = speed);
    voice && (this.voice = voice);
    pitch && (this.pitch = pitch);
    text && (this.text = text);
    defaultText && (this.defaultText = defaultText);
    engineType && (this.engineType = engineType);
    voiceName && (this.voiceName = voiceName);
    this.resetAudio();
  }


  getWebsocketUrl() {
    return new Promise((resolve, reject) => {
      const apiKey = this.API_KEY;
      const apiSecret = this.API_SECRET;
      let url = 'wss://tts-api.xfyun.cn/v2/tts';
      const host = location.host;
      const date = new Date().toGMTString();
      const algorithm = 'hmac-sha256';
      const headers = 'host date request-line';
      const signatureOrigin = `host: ${host}\ndate: ${date}\nGET /v2/tts HTTP/1.1`;
      const signatureSha = hmacSHA256(signatureOrigin, apiSecret);
      const signature = Base64.stringify(signatureSha);
      const authorizationOrigin = `api_key="${apiKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`;
      const authorization = btoa(authorizationOrigin);
      url = `${url}?authorization=${authorization}&date=${date}&host=${host}`;
      resolve(url);
    });
  }


  onmessageWork(e) {
    switch (e.command) {
      case 'newAudioData': {
        this.audioDatas.push(e.data);
        if (this.state === PLAY_STATE.LOADING && this.audioDatas.length === 1) {
          this.playTimeout = setTimeout(() => {
            this.audioPlay();
          }, 1000);
        }
        break;
      }
    }
  }

  setAPIConfig({API_KEY, API_SECRET, APPID}) {
    this.API_KEY = API_KEY;
    this.API_SECRET = API_SECRET;
    this.APPID = APPID;
  }

  setVoiceConfig({speed, voice, pitch, voiceName}) {
    this.speed = speed;
    this.voice = voice;
    this.pitch = pitch;
    this.voiceName = voiceName;
  }

  setState(state) {
    this.state = state;
  }

  getState() {
    return this.state;
  }

  getAudio() {
    this.setState(PLAY_STATE.LOADING);
    this.getWebsocketUrl().then((url) => {
      this.connectWebsocket(url);
    });
  }

  connectWebsocket(url) {
    if ('WebSocket' in window) {
      this.websocket = new WebSocket(url);
    } else if ('MozWebSocket' in window) {
      this.websocket = new MozWebSocket(url);
    } else {
      alert(notSupportTip);
      return;
    }
    const self = this;
    this.websocket.onopen = (e) => {
      const params = {
        common: {
          app_id: this.APPID, // APPID
        },
        business: {
          ent: self.engineType,
          aue: 'raw',
          auf: 'audio/L16;rate=16000',
          vcn: self.voiceName,
          speed: self.speed,
          volume: self.voice * 10,
          pitch: self.pitch,
          // 'bgs': 1,
          tte: 'UTF8',
        },
        data: {
          status: 2,
          text: CryptoJS.enc.Utf8.parse(
              self.text || self.defaultText || DEFAULT_TEXT,
          ).toString(CryptoJS.enc.Base64),
        },
      };
      this.websocket.send(JSON.stringify(params));
    };
    this.websocket.onmessage = (e) => {
      const jsonData = JSON.parse(e.data);
      // 合成失败
      if (jsonData.code !== 0) {
        alert(`${jsonData.code}:${jsonData.message}`);
        self.resetAudio();
        this.websocket.close();
        return;
      }
      const newAudioData = transform.transData(
          atob(jsonData.data.audio),
          16000,
      );
      this.onmessageWork({
        command: 'newAudioData',
        data: newAudioData,
      });

      if (jsonData.code === 0 && jsonData.data.status === 2) {
        this.websocket.close();
      }
    };
    this.websocket.onerror = (e) => {
      console.log(e);
      console.log(e.data);
    };
    this.websocket.onclose = (e) => {
      console.log(e);
    };
  }

  resetAudio() {
    this.audioPause();
    this.setState(PLAY_STATE.READY);
    this.audioDatasIndex = 0;
    this.audioDatas = [];
    this.websocket && this.websocket.close();
    clearTimeout(this.playTimeout);
  }

  audioPlay() {
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (!audioCtx) {
        alert(notSupportTip);
        return;
      }
    } catch (e) {
      alert(notSupportTip);
      return;
    }
    this.audioDatasIndex = 0;
    if (this.audioDatas.length) {
      this.playSource();
      this.setState(PLAY_STATE.PLAYING);
    } else {
      this.getAudio();
    }
  }

  audioPause(state) {
    if (this.state === PLAY_STATE.PLAYING) {
      this.setState(state || PLAY_STATE.ENDPLAY);
    }
    clearTimeout(this.playTimeout);
    try {
      source && source.stop();
    } catch (e) {
      console.log(e);
    }
  }

  playSource() {
    let bufferLength = 0;
    const dataLength = this.audioDatas.length;
    for (let i = this.audioDatasIndex; i < dataLength; i++) {
      bufferLength += this.audioDatas[i].length;
    }
    const audioBuffer = audioCtx.createBuffer(1, bufferLength, 22050);
    let offset = 0;
    const nowBuffering = audioBuffer.getChannelData(0);
    for (let i = this.audioDatasIndex; i < dataLength; i++) {
      const audioData = this.audioDatas[i];
      if (audioBuffer.copyToChannel) {
        audioBuffer.copyToChannel(audioData, 0, offset);
      } else {
        for (let j = 0; j < audioData.length; j++) {
          nowBuffering[offset + j] = audioData[j];
        }
      }
      offset += audioData.length;
      this.audioDatasIndex++;
    }

    source = audioCtx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioCtx.destination);
    source.start();
    source.onended = (event) => {
      if (this.state !== PLAY_STATE.PLAYING) {
        return;
      }
      if (this.audioDatasIndex < this.audioDatas.length) {
        this.playSource();
      } else {
        this.audioPause(PLAY_STATE.ENDPLAY);
      }
    };
  }
}

export default Experience;
