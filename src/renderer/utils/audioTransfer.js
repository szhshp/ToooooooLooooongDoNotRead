const minSampleRate = 22050;

const transform = {
  transData(audioDataStr, sampleRate) {
    let newAudioData;
    const audioData = this.toFloat32(this.strToUint8Array(audioDataStr));
    if (sampleRate >= minSampleRate) {
      newAudioData = audioData;
    } else {
      newAudioData = this.changeSampleRate(
          audioData,
          sampleRate,
          minSampleRate,
      );
    }
    return newAudioData;
  },
  changeSampleRate(buffer, from) {
    const data = new Float32Array(buffer);
    const fitCount = Math.round(data.length * (minSampleRate / from));
    const newData = new Float32Array(fitCount);
    const springFactor = (data.length - 1) / (fitCount - 1);
    newData[0] = data[0];
    for (let i = 1; i < fitCount - 1; i++) {
      const tmp = i * springFactor;
      const before = Math.floor(tmp).toFixed();
      const after = Math.ceil(tmp).toFixed();
      const atPoint = tmp - before;
      newData[i] = data[before] + (data[after] - data[before]) * atPoint;
    }
    newData[fitCount - 1] = data[data.length - 1];
    return newData;
  },
  toFloat32(input) {
    const tmp = new Int16Array(new DataView(input.buffer).buffer);
    const tmpData = [];
    for (let i = 0; i < tmp.length; i++) {
      const d = tmp[i] < 0 ? tmp[i] / 0x8000 : tmp[i] / 0x7fff;
      tmpData.push(d);
    }
    return new Float32Array(tmpData);
  },
  strToUint8Array(rawData) {
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  },
};

export default transform;
