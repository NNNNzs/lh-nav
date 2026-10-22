import { onMounted, onUnmounted, ref } from 'vue'
import { ENGINES, HOT_SHORTCUTS } from '@/constants/zenithData'
import type { ZenithEngine } from '@/types/zenith'

export function useZenithSearch(onNotify?: (msg: string) => void) {
  const query = ref('')
  const currentEngine = ref<ZenithEngine>(ENGINES[0])
  const isDropdownOpen = ref(false)
  const inputRef = ref<HTMLInputElement | null>(null)

  function selectEngine(eng: ZenithEngine) {
    currentEngine.value = eng
    isDropdownOpen.value = false
    onNotify?.(`已切换至 ${eng.name}`)
  }

  function handleSearch() {
    const q = query.value.trim()
    if (!q) return

    const targetUrl = `${currentEngine.value.url}?${currentEngine.value.param}=${encodeURIComponent(q)}`
    window.open(targetUrl, '_blank')
    query.value = ''
  }

  function handleKeydown(e: KeyboardEvent) {
    const isInputFocused = document.activeElement === inputRef.value

    if (e.key === 'Tab' && !isInputFocused) {
      e.preventDefault()
      inputRef.value?.focus()
      return
    }

    if (!isInputFocused && ['1', '2', '3', '4'].includes(e.key)) {
      const idx = parseInt(e.key, 10) - 1
      if (ENGINES[idx]) {
        selectEngine(ENGINES[idx])
      }
    }
  }

  function handleWindowClick() {
    if (isDropdownOpen.value) {
      isDropdownOpen.value = false
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', handleKeydown)
    window.addEventListener('click', handleWindowClick)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown)
    window.removeEventListener('click', handleWindowClick)
  })

  return {
    query,
    currentEngine,
    engines: ENGINES,
    hotShortcuts: HOT_SHORTCUTS,
    isDropdownOpen,
    inputRef,
    selectEngine,
    handleSearch,
  }
}
