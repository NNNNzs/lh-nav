import { computed, onMounted, ref, watch } from 'vue'
import { CATEGORY_TABS } from '@/constants/zenithData'
import type { IconKind, ZenithBookmark, ZenithCategoryKey } from '@/types/zenith'

interface NavConfig {
  storageKey: string
  bookmarks: ZenithBookmark[]
}

const CONFIG_URL = `${import.meta.env.BASE_URL}nav-config.json`

export function useZenithBookmarks() {
  const bookmarks = ref<ZenithBookmark[]>([])
  const activeCategory = ref<ZenithCategoryKey>('all')
  const isLoaded = ref(false)
  const config = ref<NavConfig | null>(null)

  async function load() {
    try {
      const response = await fetch(CONFIG_URL, { cache: 'no-store' })
      if (!response.ok) throw new Error(`Failed to load nav config: ${response.status}`)
      const loadedConfig = await response.json() as NavConfig
      if (!loadedConfig.storageKey || !Array.isArray(loadedConfig.bookmarks)) {
        throw new Error('Invalid nav-config.json structure')
      }
      config.value = loadedConfig
      const saved = localStorage.getItem(loadedConfig.storageKey)
      bookmarks.value = saved ? JSON.parse(saved) as ZenithBookmark[] : [...loadedConfig.bookmarks]
    } catch (error) {
      console.error('Failed to load navigation configuration', error)
      if (!config.value) {
        config.value = {
          storageKey: 'zenith_tab_bookmarks_v4',
          bookmarks: [],
        }
      }
      try {
        const saved = localStorage.getItem(config.value.storageKey)
        bookmarks.value = saved ? JSON.parse(saved) as ZenithBookmark[] : [...config.value.bookmarks]
      } catch {
        bookmarks.value = [...config.value.bookmarks]
      }
    } finally {
      isLoaded.value = true
    }
  }

  function save() {
    if (!isLoaded.value || !config.value) return
    try {
      localStorage.setItem(config.value.storageKey, JSON.stringify(bookmarks.value))
    } catch (error) {
      console.error('Storage failed', error)
    }
  }

  watch(bookmarks, save, { deep: true })

  onMounted(() => {
    if (!isLoaded.value) void load()
  })

  const totalCount = computed(() => bookmarks.value.length)
  const categoryTabs = computed(() => CATEGORY_TABS)
  const filteredBookmarks = computed(() => {
    const list = activeCategory.value === 'all'
      ? [...bookmarks.value]
      : bookmarks.value.filter(bookmark => bookmark.category === activeCategory.value)

    return list.sort((a, b) => Number(b.isPinned) - Number(a.isPinned))
  })

  function setCategory(category: ZenithCategoryKey) {
    activeCategory.value = category
  }

  function addBookmark(item: {
    title: string
    url: string
    desc?: string
    category: ZenithCategoryKey
    iconKind?: IconKind
    iconValue?: string
    iconBg?: string
  }) {
    let url = item.url.trim()
    if (!/^https?:\/\//i.test(url)) url = `https://${url}`

    let iconKind = item.iconKind || 'img'
    let iconValue = item.iconValue?.trim() || ''
    let iconBg = item.iconBg || ''

    if (!iconValue) {
      try {
        const domain = new URL(url).hostname
        iconKind = 'img'
        iconValue = `https://api.iowen.cn/favicon/${domain}.png`
      } catch {
        iconKind = 'text'
        iconValue = item.title.trim().charAt(0) || '网'
        iconBg = 'bg-gradient-to-br from-indigo-500 to-sky-500'
      }
    }

    bookmarks.value.push({
      id: `bm-${Date.now()}`,
      title: item.title.trim(),
      desc: item.desc?.trim() || '快捷网站组件',
      url,
      category: item.category,
      iconKind,
      iconValue,
      iconBg,
      isPinned: false,
    })
  }

  function resetLayout() {
    bookmarks.value = [...(config.value?.bookmarks ?? [])]
    activeCategory.value = 'all'
    save()
  }

  return {
    bookmarks,
    activeCategory,
    filteredBookmarks,
    categoryTabs,
    totalCount,
    setCategory,
    addBookmark,
    resetLayout,
  }
}
