<template>
  <v-app dark>
    <v-app-bar fixed app>
      <microphone-icon></microphone-icon>
      <v-spacer />
      <v-dialog max-width="600">
        <template #activator="{ on }">
          <v-btn icon v-on="on"><v-icon>mdi-help</v-icon></v-btn>
        </template>
        <help-card></help-card
      ></v-dialog>
      <v-btn icon @click="$vuetify.theme.dark = !$vuetify.theme.dark">
        <v-icon>mdi-theme-light-dark</v-icon>
      </v-btn>
      <v-btn icon @click="tweet"><v-icon>mdi-twitter</v-icon></v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer absolute app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
      <v-spacer></v-spacer>
      <v-chip class="ma-2" href="https://twitter.com/WinterYukke" label>
        <v-icon left>mdi-twitter</v-icon>
        @WinterYukke
      </v-chip>
      <v-btn icon href="https://github.com/WinterYukky/HeheTeNandayo">
        <v-icon>mdi-github</v-icon>
      </v-btn>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { heheCount } from '@/functions/useHeheCount'
import MicrophoneIcon from '@/components/MicrophoneIcon.vue'
import HelpCard from '@/components/HelpCard.vue'
export default defineComponent({
  components: {
    MicrophoneIcon,
    HelpCard,
  },
  setup() {
    return {
      tweet: () => {
        if (process.server) return
        window.open(
          encodeURI(
            `https://twitter.com/intent/tweet?hashtags=原神,えへってなんだよ&text=パイモンに「えへってなんだよ！」って言わせるだけのアプリ\n${heheCount.value}回「えへ」って言ったらしい。\n${location.href}`
          )
        )
      },
    }
  },
})
</script>
