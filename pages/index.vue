<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <sleep-paimon v-if="pimonIsSleep"></sleep-paimon>
      <template v-else-if="paimonIsAnger">
        <anger-paimon></anger-paimon>
        <hehe-te-nandayo></hehe-te-nandayo>
      </template>
      <smile-paimon v-else></smile-paimon>
      <loading-text v-if="loading"></loading-text>
      <please-say-text v-if="pleaseSayHehe"></please-say-text>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  ref,
} from '@nuxtjs/composition-api'
import { useNow } from '@vueuse/core'
import { usePaimonAI } from '@/functions/usePaimonAI'
import { heheCount } from '@/functions/useHeheCount'
import SleepPaimon from '@/components/SleepPaimon.vue'
import AngerPaimon from '@/components/AngerPaimon.vue'
import SmilePaimon from '@/components/SmilePaimon.vue'
import LoadingText from '@/components/LoadingText.vue'
import PleaseSayText from '@/components/PleaseSayText.vue'
import HeheTeNandayo from '@/components/HeheTeNandayo.vue'

export default defineComponent({
  components: {
    SleepPaimon,
    AngerPaimon,
    SmilePaimon,
    LoadingText,
    HeheTeNandayo,
    PleaseSayText,
  },
  setup() {
    const modelLoad = ref(false)
    const recentHeheCount = ref(0)
    const now = ref(process.browser ? useNow() : 0)
    const lastHehe = ref(now.value)
    onMounted(async () => {
      if (process.server) return
      const paimonAI = await usePaimonAI()
      modelLoad.value = true
      lastHehe.value = now.value
      const wordLabels = paimonAI.wordLabels()
      paimonAI.listen(
        (result) => {
          wordLabels.forEach((label, index) => {
            if (
              label === 'バックグラウンド ノイズ' ||
              result.scores[index] < 0.8
            )
              return
            recentHeheCount.value++
            heheCount.value++
            lastHehe.value = now.value
            const timeout = 4000
            setTimeout(() => recentHeheCount.value--, timeout)
          })
          return new Promise(() => {})
        },
        {
          includeSpectrogram: true,
          probabilityThreshold: 0.75,
          invokeCallbackOnNoiseAndUnknown: true,
          overlapFactor: 0.5,
        }
      )
    })
    const loading = computed(() => !modelLoad.value)

    return {
      loading,
      pimonIsSleep: computed(() => loading.value),
      paimonIsAnger: computed(() => recentHeheCount.value >= 1),
      pleaseSayHehe: computed(
        () => !loading.value && now.value - lastHehe.value > 5000
      ),
    }
  },
})
</script>
