<template>
  <v-app dark>
    <v-app-bar fixed app>
      <v-tooltip bottom
        ><template #activator="{ on }"
          ><v-icon right v-on="on">{{
            microphoneOK ? 'mdi-microphone' : 'mdi-microphone-off'
          }}</v-icon></template
        ><template v-if="microphoneOK">マイクが許可されています</template>
        <template v-else>マイクが許可されていません</template></v-tooltip
      >
      <v-spacer />
      <v-dialog max-width="600">
        <template #activator="{ on }">
          <v-btn icon v-on="on"><v-icon>mdi-help</v-icon></v-btn>
        </template>
        <help-card></help-card
      ></v-dialog>
      <v-tooltip bottom
        ><template #activator="{ on }"
          ><v-btn
            icon
            v-on="on"
            @click="$vuetify.theme.dark = !$vuetify.theme.dark"
          >
            <v-icon>mdi-theme-light-dark</v-icon>
          </v-btn></template
        >ライトモードの切替</v-tooltip
      >
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
import { microphoneOK } from '@/functions/useMicrophone'
import { heheCount } from '@/functions/useHeheCount'
import HelpCard from '@/components/HelpCard.vue'
export default defineComponent({
  components: {
    HelpCard,
  },
  setup() {
    return {
      microphoneOK,
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
