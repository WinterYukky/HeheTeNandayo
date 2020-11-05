<template>
  <v-card>
    <v-img src="sample.gif"></v-img>
    <v-card-title>遊び方</v-card-title>
    <v-card-text>
      マイクと通知を許可して「えへ」って喋りかけるだけ。
    </v-card-text>
    <v-divider class="ma-4"></v-divider>
    <v-card-title>動かない時</v-card-title>
    <v-card-text>
      左上のアイコンがこうなっていたらマイクか通知が許可されていない可能性があります。
      <v-list>
        <v-list-item>
          <v-list-item-icon><v-icon>mdi-bell-off</v-icon></v-list-item-icon>
          <v-list-item-content>通知が許可されていません</v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon
            ><v-icon>mdi-microphone-off</v-icon></v-list-item-icon
          >
          <v-list-item-content>マイクが許可されていません</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    return {
      step: ref(1),
    }
  },
})
</script>
