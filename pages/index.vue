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
import { pushOK } from '@/functions/usePush'
import { microphoneOK } from '@/functions/useMicrophone'
import { usePaimonAI } from '@/functions/usePaimonAI'
import { heheCount } from '@/functions/useHeheCount'
import push from 'push.js'
import SleepPaimon from '@/components/SleepPaimon.vue'
import AngerPaimon from '@/components/AngerPaimon.vue'
import SmilePaimon from '@/components/SmilePaimon.vue'
import LoadingText from '@/components/LoadingText.vue'
import HeheTeNandayo from '@/components/HeheTeNandayo.vue'

export default defineComponent({
  components: {
    SleepPaimon,
    AngerPaimon,
    SmilePaimon,
    LoadingText,
    HeheTeNandayo,
  },
  setup() {
    const modelLoad = ref(false)
    const recentHeheCount = ref(0)
    const pointOut = async () => {
      if (process.server) return
      recentHeheCount.value++
      heheCount.value++
      const timeout = 4000
      setTimeout(() => recentHeheCount.value--, timeout)
      if (recentHeheCount.value >= 2) return
      await push.create('パイモン', {
        body: 'えへってなんだよ！',
        icon: 'Anger.png',
        timeout,
        vibrate: true,
      })
    }
    onMounted(async () => {
      if (process.server) return
      await Notification.requestPermission()
      const paimonAI = await usePaimonAI()
      modelLoad.value = true
      const wordLabels = paimonAI.wordLabels()
      paimonAI.listen(
        async (result) => {
          await wordLabels.forEach(async (label, index) => {
            if (
              !pushOK.value ||
              label === 'バックグラウンド ノイズ' ||
              result.scores[index] < 0.8
            )
              return
            await pointOut()
          })
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
      pimonIsSleep: computed(
        () => loading.value || !pushOK.value || !microphoneOK.value
      ),
      paimonIsAnger: computed(() => recentHeheCount.value >= 1),
      pointOut,
    }
  },
})
</script>
