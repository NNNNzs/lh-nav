import { ref } from 'vue'
import { HOT_SHORTCUTS, SEARCH_ENGINES } from '@/constants/zenithData'
import type { SearchEngine } from '@/types/zenith'

export function useZenithSearch() {
  const query = ref('')
  const currentEngine = ref<SearchEngine>(SEARCH_ENGINES[0])
  const engines = SEARCH_ENGINES
  const hotShortcuts = HOT_SHORTCUTS

  function setEngine(engine: SearchEngine) {
    currentEngine.value = engine
  }

  function handleSearch() {
    const q = query.value.trim()
    if (!q) return

    // If it's a direct URL
    if (/^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/.test(q)) {
      const url = q.startsWith('http://') || q.startsWith('https://') ? q : `https://${q}`
      window.open(url, '_blank')
      query.value = ''
      return
    }

    // Otherwise use search engine
    const searchUrl = `${currentEngine.value.searchUrl}${encodeURIComponent(q)}`
    window.open(searchUrl, '_blank')
    query.value = ''
  }

  return {
    query,
    currentEngine,
    engines,
    hotShortcuts,
    setEngine,
    handleSearch,
  }
}
