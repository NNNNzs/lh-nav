import { computed, onMounted, ref, watch } from 'vue'
import { CATEGORY_TABS, DEFAULT_BOOKMARKS } from '@/constants/zenithData'
import type { ZenithBookmark, ZenithCategoryKey } from '@/types/zenith'

const STORAGE_KEY = 'zenith_tab_bookmarks_v1'

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

  function addBookmark(item: { title: string; url: string; desc?: string; category: ZenithCategoryKey }) {
    let url = item.url.trim()
    if (!/^https?:\/\//i.test(url)) {
      url = `https://${url}`
    }

    const newBm: ZenithBookmark = {
      id: `bm-${Date.now()}`,
      title: item.title.trim(),
      desc: item.desc?.trim() || '快捷网站组件',
      url,
      category: item.category,
      iconKind: 'material',
      iconValue: 'bookmark',
      iconBg: 'bg-gradient-to-br from-indigo-500 to-sky-500',
      isPinned: false,
    }
    bookmarks.value.push(newBm)
  }

  function resetLayout() {
    bookmarks.value = [...DEFAULT_BOOKMARKS]
    activeCategory.value = 'all'
    save()
  }

  const storageSize = computed(() => {
    try {
      let total = 0
      for (const k in localStorage) {
        if (Object.prototype.hasOwnProperty.call(localStorage, k)) {
          total += (localStorage[k]?.length || 0) * 2
        }
      }
      return `${Math.max(18.2, total / 1024).toFixed(1)} KB`
    } catch {
      return '18.2 KB'
    }
  })

  return {
    bookmarks,
    activeCategory,
    filteredBookmarks,
    categoryTabs: CATEGORY_TABS,
    storageSize,
    setCategory,
    addBookmark,
    resetLayout,
  }
}
