<template>
  <div id="app">
    <v-snackbar v-model="message.showMessage" :timeout="timeout">
      {{ message.content }}
      <template v-slot:action="{ attrs }">
        <v-btn icon color="red" text v-bind="attrs" @click="message.showMessage = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <v-app-bar color="deep-purple accent-4" dense dark fixed>
      <v-tabs grow background-color="primary" dark id="topbar">
        <v-tab
          v-for="route in routes"
          :key="route.name"
          @click="routeChange(route.path)"
          >{{ route.name }}</v-tab
        >
      </v-tabs>

      <v-spacer></v-spacer>

      <v-btn icon @click="gimmeStar">
        <v-icon>mdi-heart</v-icon>
      </v-btn>
    </v-app-bar>

    <v-app>
      <v-content id="content">
        <v-container>
          <router-view></router-view>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import { shell, ipcRenderer } from "electron";
import routes from "@/router/routes";
import { mapState } from "vuex";

export default {
  created: function() {
    ipcRenderer.on("setMessage", (event, arg) => {
      this.showMessage(arg);
    });
  },
  computed: {
    ...mapState({
      message: (state) => state.app.message,
    }),
  },
  data: function() {
    return {
      function() {
        return {
          timeout: 2000,
        };
      },
    };
  },
  methods: {
    showMessage: function(arg) {
      this.$store.dispatch("setMessage", arg);
    },
    routeChange: function(path) {
      this.$router.push(path);
    },
    hideMessage: function() {
      this.$store.dispatch("setMessage", {
        showMessage: false,
      });
    },
    gimmeStar: function() {
      shell.openExternal(
        "https://github.com/szhielelp/ToooooooLooooongDoNotRead"
      );
    },
  },
  data: function() {
    return {
      routes,
    };
  },
};
</script>

<style lang="scss">
@import "@/styles/mixin.scss";

body {
  font-family: $GlobalFont;
}
div.container {
  padding: 4px;
}
.v-application {
  font-family: $GlobalFont;
  line-height: 1.5;
}
.v-tab {
  font-family: $GlobalFont;
}
#content {
  margin-top: 3rem;
}
.card-title,
.card-item-title {
  font-family: $GlobalFont;
}
.card-title {
  font-size: 1rem;
  font-weight: 900;
}
.v-input,
.v-input .v-label {
  font-size: 0.8em;
}
</style>
