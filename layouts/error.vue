<template>
  <v-container class="pt-0">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6" class="text-center">
        <down-paimon></down-paimon>
        <sorry-text></sorry-text>
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6" class="text-center">
        <v-btn v-if="error.statusCode === 404" nuxt to="/">To Home page</v-btn>
        <template v-else>
          <v-btn class="my-4" @click="reload">reload</v-btn>
          <p v-if="microphoneAccess === ''">
            <v-icon left color="amber">mdi-lightbulb-on</v-icon
            >マイクが利用出来ないブラウザの可能性があります
          </p>
          <p v-else-if="microphoneAccess === 'denied'">
            <v-icon left color="amber">mdi-lightbulb-on</v-icon
            >マイクが許可されていないようです
          </p>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { microphoneOK, microphoneAccess } from '@/functions/useMicrophone'
import DownPaimon from '@/components/DownPaimon.vue'
import SorryText from '@/components/SorryText.vue'
import { NuxtError } from '@nuxt/types'

export default defineComponent({
  components: {
    DownPaimon,
    SorryText,
  },
  props: {
    error: {
      type: Object as () => NuxtError,
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
