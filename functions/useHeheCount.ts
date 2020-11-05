import { ref } from '@nuxtjs/composition-api'
import { useLocalStorage } from '@vueuse/core'
export const heheCount = ref(
  process.browser ? useLocalStorage<number>('heheCount', 0) : -1
)
