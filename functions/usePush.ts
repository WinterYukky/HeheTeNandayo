import { computed, ref } from '@nuxtjs/composition-api'
import { usePermission } from '@vueuse/core'
const pushAccess = ref(process.browser ? usePermission('notifications') : null)
export const pushOK = computed(() => pushAccess.value === 'granted')
