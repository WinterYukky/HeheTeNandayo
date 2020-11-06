<template>
  <v-tooltip bottom
    ><template #activator="{ on }">
      <div v-on="on">
        <v-icon
          v-bind="$attrs"
          :disabled="!microphoneOK"
          right
          color="red"
          v-text="icon"
        ></v-icon></div></template
    >{{ text }}</v-tooltip
  >
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import { microphoneOK, microphoneAccess } from '@/functions/useMicrophone'
export default defineComponent({
  inheritAttrs: false,
  setup() {
    return {
      microphoneOK,
      icon: computed(() => {
        switch (microphoneAccess.value) {
          case 'granted':
            return 'mdi-microphone'
          case 'prompt':
            return 'mdi-microphone-settings'
          default:
            return 'mdi-microphone-off'
        }
      }),
      text: computed(() => {
        switch (microphoneAccess.value) {
          case 'granted':
            return 'マイクが許可されています'
          case 'prompt':
            return 'マイクが許可されるのを待っています'
          case 'denied':
            return 'マイクが許可されていません'
          default:
            return 'マイクの許可が確認出来ないブラウザです'
        }
      }),
    }
  },
})
</script>
