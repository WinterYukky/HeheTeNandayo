import { computed, ref } from '@nuxtjs/composition-api'
import { usePermission } from '@vueuse/core'
export const microphoneAccess = ref(
  process.browser ? usePermission('microphone') : null
)
export const microphoneOK = computed(() => microphoneAccess.value === 'granted')
