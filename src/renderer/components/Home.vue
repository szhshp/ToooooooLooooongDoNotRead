<template>
  <v-container fluid>
    <v-card outlined elevation="4" class="mx-auto my-4">
      <v-list-item three-line>
        <v-list-item-content>
          <v-textarea clearable label="文本栏" :value="text" @input="updateText"></v-textarea>
        </v-list-item-content>
      </v-list-item>

      <v-card-actions>
        <v-container>
          <v-row justify="center">
            <v-col cols="auto">
              <v-row justify="center">{{status}}</v-row>
              <v-col cols="auto"></v-col>
              <v-btn color="primary" @click="readerPlay" fab small :disabled="!showPlayBtn">
                <v-icon>mdi-play</v-icon>
              </v-btn>
              <v-btn color="error" @click="readerPlay" fab small :disabled="!showStopBtn">
                <v-icon>mdi-stop</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="auto">
              <v-btn large class="mx-1" @click="getClipboard">获取剪贴板</v-btn>
              <v-btn large class="mx-1" @click="readClipboard" color="primary">阅读剪切板</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import {mapState} from 'vuex';
import {PLAY_STATE} from '../constants/index';
import {ipcRenderer} from 'electron';

export default {
  created: function() {
    ipcRenderer.on('triggerHotkey', (event, arg) => {
      this.readClipboard();
    });
  },

  computed: {
    ...mapState({
      text: (state) => state.instance.experience.text,
      clipboard: (state) => state.util.clipboard,
      status: (state) => state.instance.experience.getState(),
      showStopBtn: (state) =>
        [PLAY_STATE.PLAYING, PLAY_STATE.PAUSE].indexOf(
            state.instance.experience.getState(),
        ) > -1,
      showPauseBtn: (state) =>
        [PLAY_STATE.PLAYING].indexOf(state.instance.experience.getState()) > -1,
      showPlayBtn: (state) =>
        [PLAY_STATE.PAUSE, PLAY_STATE.ENDPLAY, PLAY_STATE.READY].indexOf(
            state.instance.experience.getState(),
        ) > -1,
    }),
  },
  methods: {
    readClipboard: function() {
      this.getClipboard();
    },
    getClipboard: function() {
      this.$store.dispatch({type: 'readerPlay', text: this.$store.state.util.clipboard.readText()});
    },
    readerPlay: function() {
      this.$store.dispatch({type: 'readerPlay', text: this.text});
    },
    updateText(text) {
      this.$store.dispatch({type: 'setText', text: text});
    },
  },
};
</script>
