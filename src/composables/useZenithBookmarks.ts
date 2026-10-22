import { computed, onMounted, ref, watch } from 'vue'
import { CATEGORY_TABS, DEFAULT_BOOKMARKS } from '@/constants/zenithData'
import type { IconKind, ZenithBookmark, ZenithCategoryKey } from '@/types/zenith'

const STORAGE_KEY = 'zenith_tab_bookmarks_v2'

export function useZenithBookmarks() {
  const bookmarks = ref<ZenithBookmark[]>([])
  const activeCategory = ref<ZenithCategoryKey>('all')
  const isLoaded = ref(false)

  function load() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        bookmarks.value = JSON.parse(saved)
      } else {
        bookmarks.value = [...DEFAULT_BOOKMARKS]
      }
    } catch {
      bookmarks.value = [...DEFAULT_BOOKMARKS]
    } finally {
      isLoaded.value = true
    }
  }

  function save() {
    if (!isLoaded.value) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks.value))
    } catch (e) {
      console.error('Storage failed', e)
    }
  }

  watch(bookmarks, () => save(), { deep: true })

  onMounted(() => {
    if (!isLoaded.value) {
      load()
    }
  })

  const filteredBookmarks = computed(() => {
    if (activeCategory.value === 'all') {
      return bookmarks.value
    }
    return bookmarks.value.filter(b => b.category === activeCategory.value)
  })

  function setCategory(cat: ZenithCategoryKey) {
    activeCategory.value = cat
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
    if (!/^https?:\/\//i.test(url)) {
      url = `https://${url}`
    }

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

    const newBm: ZenithBookmark = {
      id: `bm-${Date.now()}`,
      title: item.title.trim(),
      desc: item.desc?.trim() || '快捷网站组件',
      url,
      category: item.category,
      iconKind,
      iconValue,
      iconBg,
      isPinned: false,
    }
    bookmarks.value.push(newBm)
  }

  function resetLayout() {
    bookmarks.value = [...DEFAULT_BOOKMARKS]
    activeCategory.value = 'all'
    save()
  }

  return {
    bookmarks,
    activeCategory,
    filteredBookmarks,
    categoryTabs: CATEGORY_TABS,
    setCategory,
    addBookmark,
    resetLayout,
  }
}
