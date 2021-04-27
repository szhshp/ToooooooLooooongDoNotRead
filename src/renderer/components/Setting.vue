<template>
  <div>
    <v-form v-model="valid">
      <v-container fluid>
        <v-card outlined elevation="1" class="mx-auto my-4">
          <v-list-item three-line>
            <v-list-item-content>
              <div class="about-title mb-4">快捷键</div>
              <v-list-item-title class="about-item-title mb-1">
                快速阅读剪切板
              </v-list-item-title>
              <v-list-item-subtitle
                >按下此快捷键将直接阅读剪贴板的文本</v-list-item-subtitle
              >

              <v-select
                v-model="hotkey"
                :items="hotkeyItems"
                label="快捷键选择"
                required
              ></v-select>
            </v-list-item-content>
          </v-list-item>
          <v-card-actions>
            <v-row>
              <v-col cols="auto" class="mr-auto">
                <v-btn small class="mx-1" @click="setHotkey">确定</v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>

        <v-card outlined elevation="1" class="mx-auto my-4">
          <v-list-item three-line>
            <v-list-item-content>
              <div class="about-title mb-4">API Keys 设置</div>
              <v-text-field
                v-model="APPID"
                :type="'password'"
                :rules="rules"
                label="APPID"
                required
              ></v-text-field>
              <v-text-field
                v-model="API_SECRET"
                :type="'password'"
                :rules="rules"
                label="API_SECRET"
                required
              ></v-text-field>
              <v-text-field
                v-model="API_KEY"
                :type="'password'"
                :rules="rules"
                label="API_KEY"
                required
              ></v-text-field>
            </v-list-item-content>
          </v-list-item>
          <v-card-actions>
            <v-row>
              <v-col cols="auto" class="mr-auto">
                <v-btn small class="mx-1" @click="setAPIConfig">确定</v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>

        <v-card outlined elevation="1" class="mx-auto my-4">
          <v-list-item three-line>
            <v-list-item-content>
              <div class="about-title mb-4">语音设置</div>
              <v-select
                v-model="voiceName"
                :items="voiceNames"
                item-text="name"
                item-value="value"
                label="发音人"
                required
              ></v-select>
              <v-slider
                v-model="speed"
                label="语速"
                class="align-center"
                :max="100"
                :min="0"
                track-color="gray"
                hide-details
              >
                <template v-slot:append>
                  <v-text-field
                    v-model="speed"
                    class="mt-0 pt-0"
                    hide-details
                    single-line
                    type="number"
                    style="width: 60px"
                  ></v-text-field>
                </template>
              </v-slider>
              <v-slider
                v-model="pitch"
                label="音高"
                class="align-center"
                :max="100"
                :min="0"
                track-color="gray"
                hide-details
              >
                <template v-slot:append>
                  <v-text-field
                    v-model="pitch"
                    class="mt-0 pt-0"
                    hide-details
                    single-line
                    type="number"
                    style="width: 60px"
                  ></v-text-field>
                </template>
              </v-slider>
              <v-slider
                v-model="voice"
                label="音量"
                class="align-center"
                :max="100"
                :min="0"
                track-color="gray"
                hide-details
              >
                <template v-slot:append>
                  <v-text-field
                    v-model="voice"
                    class="mt-0 pt-0"
                    hide-details
                    single-line
                    type="number"
                    style="width: 60px"
                  ></v-text-field>
                </template>
              </v-slider>
            </v-list-item-content>
          </v-list-item>
          <v-card-actions>
            <v-row>
              <v-col cols="auto" class="mr-auto">
                <v-btn small class="mx-1" @click="setVoiceConfig">确定</v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import { shell } from "electron";
import { HOTKEYS, VOICENAMES } from "../constants/index";

export default {
  data: function() {
    return {
      ...["API_KEY", "APPID", "API_SECRET", "speed", "pitch", "voice"].reduce(
        (a, c) => {
          a[c] = this.$store.state.instance.experience[c];
          return a;
        },
        {}
      ),
      rules: [(v) => !!v || "请输入正确的 API Keys"],
      hotkey: this.$store.state.app.hotkey,
      hotkeyItems: ["None", ...HOTKEYS],
      voiceName: this.$store.state.app.voiceName,
      voiceNames: VOICENAMES,
      voiceNameLabels: VOICENAMES.map((e) => e.name),
      voiceNameValues: VOICENAMES.map((e) => e.value),
    };
  },
  methods: {
    openLinks: function(link) {
      shell.openExternal(link);
    },
    setHotkey: function() {
      this.$store.dispatch("setHotkey", {
        hotkey: this.hotkey,
      });
    },
    setAPIConfig: function() {
      this.$store.dispatch("setAPIConfig", {
        API_KEY: this.API_KEY,
        APPID: this.APPID,
        API_SECRET: this.API_SECRET,
      });
    },
    setVoiceConfig: function() {
      this.$store.dispatch("setVoiceConfig", {
        voice: this.voice,
        pitch: this.pitch,
        speed: this.speed,
        voiceName: this.voiceName,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";

.about-title,
.about-item-title {
  font-family: $GlobalFont;
}
.about-title {
  font-size: 1rem;
  font-weight: 900;
}
</style>
