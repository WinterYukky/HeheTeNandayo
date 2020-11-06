<template>
  <v-app dark>
    <v-container class="pt-0">
      <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="6" class="text-center">
          <down-paimon></down-paimon>
          <sorry-text></sorry-text>
        </v-col>
      </v-row>
      <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="6" class="text-center">
          <template v-if="$route.path === '/'">
            <v-btn class="my-4" @click="reload">reload</v-btn>
            <p v-if="!microphoneOK">
              <v-icon left color="amber">mdi-lightbulb-on</v-icon>
              <template v-if="microphoneAccess === ''"
                >マイクが利用出来ないブラウザの可能性があります</template
              >
              <template v-else-if="microphoneAccess === 'denied'"
                >マイクが許可されていないようです</template
              >
            </p>
          </template>
          <v-btn v-else nuxt to="/">To Home page</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { microphoneOK, microphoneAccess } from '@/functions/useMicrophone'
import DownPaimon from '@/components/DownPaimon.vue'
import SorryText from '@/components/SorryText.vue'

export default defineComponent({
  components: {
    DownPaimon,
    SorryText,
  },
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  setup() {
    return {
      microphoneOK,
      microphoneAccess,
      reload: () => {
        if (process.browser) location.reload()
      },
    }
  },
})
</script>
