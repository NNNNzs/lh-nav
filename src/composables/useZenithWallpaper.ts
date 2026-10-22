import { onMounted, ref } from 'vue'
import { DEFAULT_WALLPAPER_URL, PRESET_WALLPAPERS } from '@/constants/zenithData'

const STORAGE_KEY = 'zenith_current_wallpaper_v2'

export function useZenithWallpaper() {
  const currentWpUrl = ref(DEFAULT_WALLPAPER_URL)

  function loadSaved() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        currentWpUrl.value = saved
      }
    } catch {
      currentWpUrl.value = DEFAULT_WALLPAPER_URL
    }
  }

  function setWallpaper(url: string) {
    if (!url.trim()) return
    currentWpUrl.value = url.trim()
    try {
      localStorage.setItem(STORAGE_KEY, url.trim())
    } catch (e) {
      console.error(e)
    }
  }

  function resetToDefault() {
    currentWpUrl.value = DEFAULT_WALLPAPER_URL
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (e) {
      console.error(e)
    }
  }

  onMounted(() => {
    loadSaved()
  })

  return {
    currentWpUrl,
    wallpapers: PRESET_WALLPAPERS,
    setWallpaper,
    resetToDefault,
  }
}
