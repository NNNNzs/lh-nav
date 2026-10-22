import { onMounted, ref, watch } from 'vue'
import type { ThemeMode } from '@/types/nav'

const THEME_STORAGE_KEY = 'lh-nav-theme'
const currentTheme = ref<ThemeMode>('system')
const isDark = ref<boolean>(false)

export function useTheme() {
  function applyTheme(theme: ThemeMode): void {
    const root = document.documentElement
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (theme === 'dark' || (theme === 'system' && prefersDark)) {
      root.classList.add('dark')
      isDark.value = true
    } else {
      root.classList.remove('dark')
      isDark.value = false
    }
  }

  function setTheme(theme: ThemeMode): void {
    currentTheme.value = theme
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme)
    } catch {
      // Storage unavailable fallback
    }
    applyTheme(theme)
  }

  function toggleTheme(): void {
    if (currentTheme.value === 'system') {
      setTheme(isDark.value ? 'light' : 'dark')
    } else if (currentTheme.value === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  onMounted(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null
      if (saved && (saved === 'light' || saved === 'dark' || saved === 'system')) {
        currentTheme.value = saved
      }
    } catch {
      // fallback
    }
    applyTheme(currentTheme.value)

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      if (currentTheme.value === 'system') {
        applyTheme('system')
      }
    }

    mediaQuery.addEventListener('change', handleChange)
  })

  watch(currentTheme, (newTheme) => {
    applyTheme(newTheme)
  })

  return {
    currentTheme,
    isDark,
    setTheme,
    toggleTheme,
  }
}
