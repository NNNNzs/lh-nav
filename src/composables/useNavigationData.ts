import { computed, onMounted, ref, watch } from 'vue'
import { DEFAULT_CATEGORIES, DEFAULT_NAV_ITEMS } from '@/constants/initialData'
import type { NavBackupData, NavCategory, NavItem, SearchFilterState } from '@/types/nav'

const STORAGE_KEY_CATEGORIES = 'lh-nav-categories-v1'
const STORAGE_KEY_ITEMS = 'lh-nav-items-v1'

const categories = ref<NavCategory[]>([])
const items = ref<NavItem[]>([])
const isInitialized = ref(false)

const filters = ref<SearchFilterState>({
  keyword: '',
  categoryId: null,
  tag: null,
  onlyFavorites: false,
})

export function useNavigationData() {
  function loadFromStorage(): void {
    try {
      const storedCategories = localStorage.getItem(STORAGE_KEY_CATEGORIES)
      const storedItems = localStorage.getItem(STORAGE_KEY_ITEMS)

      if (storedCategories) {
        categories.value = JSON.parse(storedCategories)
      } else {
        categories.value = [...DEFAULT_CATEGORIES]
      }

      if (storedItems) {
        items.value = JSON.parse(storedItems)
      } else {
        items.value = [...DEFAULT_NAV_ITEMS]
      }
    } catch {
      categories.value = [...DEFAULT_CATEGORIES]
      items.value = [...DEFAULT_NAV_ITEMS]
    } finally {
      isInitialized.value = true
    }
  }

  function saveToStorage(): void {
    if (!isInitialized.value) return
    try {
      localStorage.setItem(STORAGE_KEY_CATEGORIES, JSON.stringify(categories.value))
      localStorage.setItem(STORAGE_KEY_ITEMS, JSON.stringify(items.value))
    } catch {
      // Storage exceeded or quota error
    }
  }

  // Watch for changes to persist
  watch([categories, items], () => {
    saveToStorage()
  }, { deep: true })

  onMounted(() => {
    if (!isInitialized.value) {
      loadFromStorage()
    }
  })

  // Sorted categories
  const sortedCategories = computed(() => {
    return [...categories.value].sort((a, b) => a.sortOrder - b.sortOrder)
  })

  // Filtered items based on search keyword, category, tag, favorites
  const filteredItems = computed(() => {
    const kw = filters.value.keyword.trim().toLowerCase()
    const targetCat = filters.value.categoryId
    const targetTag = filters.value.tag
    const onlyFav = filters.value.onlyFavorites

    return items.value.filter((item) => {
      // Category filter
      if (targetCat && item.categoryId !== targetCat) {
        return false
      }

      // Favorite filter
      if (onlyFav && !item.isFavorite) {
        return false
      }

      // Tag filter
      if (targetTag && (!item.tags || !item.tags.includes(targetTag))) {
        return false
      }

      // Keyword match
      if (kw) {
        const titleMatch = item.title.toLowerCase().includes(kw)
        const descMatch = item.description.toLowerCase().includes(kw)
        const urlMatch = item.url.toLowerCase().includes(kw) || (item.internalUrl?.toLowerCase().includes(kw) ?? false)
        const tagMatch = item.tags?.some(t => t.toLowerCase().includes(kw)) ?? false

        if (!titleMatch && !descMatch && !urlMatch && !tagMatch) {
          return false
        }
      }

      return true
    }).sort((a, b) => (a.sortOrder ?? 99) - (b.sortOrder ?? 99))
  })

  // Grouped items by category for the main layout
  const groupedCategories = computed(() => {
    const map = new Map<string, NavItem[]>()

    for (const cat of sortedCategories.value) {
      map.set(cat.id, [])
    }

    for (const item of filteredItems.value) {
      const list = map.get(item.categoryId)
      if (list) {
        list.push(item)
      }
    }

    return sortedCategories.value
      .map(cat => ({
        category: cat,
        items: map.get(cat.id) || [],
      }))
      // When searching, hide categories that have 0 matching items
      .filter(group => {
        if (filters.value.keyword || filters.value.categoryId || filters.value.tag || filters.value.onlyFavorites) {
          return group.items.length > 0
        }
        return true
      })
  })

  // Favorite items
  const favoriteItems = computed(() => {
    return items.value.filter(item => item.isFavorite)
  })

  // All unique tags
  const allTags = computed(() => {
    const set = new Set<string>()
    for (const item of items.value) {
      if (item.tags) {
        for (const tag of item.tags) {
          set.add(tag)
        }
      }
    }
    return Array.from(set).sort()
  })

  // Category item counts
  const categoryCountMap = computed(() => {
    const counts: Record<string, number> = {}
    for (const cat of categories.value) {
      counts[cat.id] = 0
    }
    for (const item of items.value) {
      if (counts[item.categoryId] !== undefined) {
        counts[item.categoryId]++
      }
    }
    return counts
  })

  // Statistics
  const statistics = computed(() => ({
    totalCategories: categories.value.length,
    totalItems: items.value.length,
    totalFavorites: favoriteItems.value.length,
    totalTags: allTags.value.length,
  }))

  // Actions: Items
  function addItem(itemData: Omit<NavItem, 'id' | 'createdAt' | 'updatedAt'>): NavItem {
    const now = new Date().toISOString()
    const newItem: NavItem = {
      ...itemData,
      id: `item-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      createdAt: now,
      updatedAt: now,
    }
    items.value.unshift(newItem)
    return newItem
  }

  function updateItem(id: string, updates: Partial<Omit<NavItem, 'id' | 'createdAt'>>): boolean {
    const idx = items.value.findIndex(i => i.id === id)
    if (idx === -1) return false
    items.value[idx] = {
      ...items.value[idx],
      ...updates,
      updatedAt: new Date().toISOString(),
    }
    return true
  }

  function deleteItem(id: string): boolean {
    const prevLen = items.value.length
    items.value = items.value.filter(i => i.id !== id)
    return items.value.length < prevLen
  }

  function toggleFavorite(id: string): void {
    const target = items.value.find(i => i.id === id)
    if (target) {
      target.isFavorite = !target.isFavorite
      target.updatedAt = new Date().toISOString()
    }
  }

  // Actions: Categories
  function addCategory(catData: Omit<NavCategory, 'id'>): NavCategory {
    const newCat: NavCategory = {
      ...catData,
      id: `cat-${Date.now()}`,
    }
    categories.value.push(newCat)
    return newCat
  }

  function updateCategory(id: string, updates: Partial<Omit<NavCategory, 'id'>>): boolean {
    const idx = categories.value.findIndex(c => c.id === id)
    if (idx === -1) return false
    categories.value[idx] = { ...categories.value[idx], ...updates }
    return true
  }

  function deleteCategory(id: string): boolean {
    // Delete category and reassign/delete items
    categories.value = categories.value.filter(c => c.id !== id)
    items.value = items.value.filter(i => i.categoryId !== id)
    return true
  }

  // Actions: Filter manipulation
  function setCategoryFilter(categoryId: string | null): void {
    filters.value.categoryId = categoryId
  }

  function setTagFilter(tag: string | null): void {
    filters.value.tag = filters.value.tag === tag ? null : tag
  }

  function toggleFavoriteFilter(): void {
    filters.value.onlyFavorites = !filters.value.onlyFavorites
  }

  function resetFilters(): void {
    filters.value = {
      keyword: '',
      categoryId: null,
      tag: null,
      onlyFavorites: false,
    }
  }

  // Actions: Backup & Restore
  function exportBackup(): string {
    const data: NavBackupData = {
      version: 1,
      exportDate: new Date().toISOString(),
      categories: categories.value,
      items: items.value,
    }
    return JSON.stringify(data, null, 2)
  }

  function importBackup(jsonStr: string): { success: boolean; message: string } {
    try {
      const data = JSON.parse(jsonStr) as Partial<NavBackupData>
      if (!Array.isArray(data.categories) || !Array.isArray(data.items)) {
        return { success: false, message: '导入数据格式不合规：缺少 categories 或 items 数组' }
      }
      categories.value = data.categories
      items.value = data.items
      saveToStorage()
      return { success: true, message: `成功导入 ${data.categories.length} 个分类，${data.items.length} 个导航项` }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      return { success: false, message: `解析 JSON 失败: ${msg}` }
    }
  }

  function resetToDefault(): void {
    categories.value = [...DEFAULT_CATEGORIES]
    items.value = [...DEFAULT_NAV_ITEMS]
    resetFilters()
    saveToStorage()
  }

  return {
    categories: sortedCategories,
    items,
    filters,
    filteredItems,
    groupedCategories,
    favoriteItems,
    allTags,
    categoryCountMap,
    statistics,
    // Operations
    addItem,
    updateItem,
    deleteItem,
    toggleFavorite,
    addCategory,
    updateCategory,
    deleteCategory,
    setCategoryFilter,
    setTagFilter,
    toggleFavoriteFilter,
    resetFilters,
    exportBackup,
    importBackup,
    resetToDefault,
  }
}
