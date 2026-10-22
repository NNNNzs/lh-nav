import { ref } from 'vue'

const isVisible = ref(false)
const toastText = ref('已更新')
let timer: number | null = null

export function useZenithToast() {
  function showToast(text: string, duration = 2200) {
    toastText.value = text
    isVisible.value = true

    if (timer !== null) {
      clearTimeout(timer)
    }

    timer = window.setTimeout(() => {
      isVisible.value = false
      timer = null
    }, duration)
  }

  return {
    isVisible,
    toastText,
    showToast,
  }
}
