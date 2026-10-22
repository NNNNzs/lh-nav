import { ref } from 'vue'
import { WALLPAPERS } from '@/constants/zenithData'

export function useZenithWallpaper() {
  const currentWpIndex = ref(-1) // -1 is default twilight nature
  const isCustomWp = ref(false)
  const currentWpUrl = ref('')

  function toggleWallpaper() {
    currentWpIndex.value = (currentWpIndex.value + 1) % (WALLPAPERS.length + 1)
    if (currentWpIndex.value >= WALLPAPERS.length) {
      currentWpIndex.value = -1
      isCustomWp.value = false
      currentWpUrl.value = ''
    } else {
      isCustomWp.value = true
      currentWpUrl.value = WALLPAPERS[currentWpIndex.value]
    }
  }

  return {
    isCustomWp,
    currentWpUrl,
    toggleWallpaper,
  }
}
