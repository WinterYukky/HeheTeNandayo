<template>
  <v-card>
    <v-img src="sample.gif"></v-img>
    <v-card-title>遊び方</v-card-title>
    <v-card-text> マイクを許可して「えへ」って喋りかけるだけ。 </v-card-text>
    <v-divider class="ma-4"></v-divider>
    <v-card-title>動かない時</v-card-title>
    <v-card-text>
      マイクを利用出来ないブラウザ、もしくはマイクが許可されていない可能性があります。左上のアイコンを確認してください。
      <v-list>
        <v-list-item>
          <v-list-item-icon
            ><v-icon color="red">mdi-microphone</v-icon></v-list-item-icon
          >
          <v-list-item-content>マイクが許可されています</v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon
            ><v-icon disabled>mdi-microphone</v-icon></v-list-item-icon
          >
          <v-list-item-content>マイクの確認が出来ません</v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon
            ><v-icon disabled>mdi-microphone-settings</v-icon></v-list-item-icon
          >
          <v-list-item-content>マイクの許可待ち状態です</v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon
            ><v-icon disabled>mdi-microphone-off</v-icon></v-list-item-icon
          >
          <v-list-item-content>マイクが許可されていません</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    return {}
  },
})
</script>
