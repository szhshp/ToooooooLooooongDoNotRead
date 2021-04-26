<template>
  <v-container fluid>
    <v-card outlined elevation="4" class="mx-auto my-4">
      <v-list-item three-line>
        <v-list-item-content>
          <div class="card-title mb-4">关于应用</div>

          <v-list-item-title class="card-item-title mb-1">字多不看</v-list-item-title>
          <v-list-item-title class="card-item-title mb-1">ToooooooLooooogDoNotRead</v-list-item-title>
          <v-list-item-title class="card-item-title mb-1">V0.3</v-list-item-title>
          <v-list-item-subtitle>开发一个软件方便我偷懒</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-card-actions>
        <v-btn
          text
          color="primary"
          @click="openLinks('https://github.com/szhielelp/ToooooooLooooongDoNotRead')"
        >Github</v-btn>
      </v-card-actions>
    </v-card>

    <v-card outlined elevation="4" class="mx-auto my-4">
      <v-list-item three-line>
        <v-list-item-content>
          <div class="card-title mb-4">关于作者</div>

          <v-list-item-title class="card-item-title mb-1">Szhshp</v-list-item-title>
        </v-list-item-content>

        <v-list-item-avatar tile size="80" color="grey">
          <img :src="avatar" alt="szhshp" />
        </v-list-item-avatar>
      </v-list-item>

      <v-card-actions>
        <v-btn text color="primary" @click="openLinks('https://github.com/szhielelp')">Github</v-btn>
        <v-btn text color="primary" @click="openLinks('https://szhshp.org')">Blog</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>


<script>
import avatar from '@/assets/avatar.png';
import {shell} from 'electron';

export default {
  data: function() {
    return {
      avatar,
    };
  },
  methods: {
    openLinks: function(link) {
      shell.openExternal(link);
    },
  },
};
</script>
