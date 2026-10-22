import { computed, onMounted, ref, watch } from 'vue'
import { DEFAULT_ZENITH_CARDS, DEFAULT_ZENITH_CATEGORIES } from '@/constants/zenithData'
import type { ZenithCard, ZenithCategory } from '@/types/zenith'

const STORAGE_CARDS_KEY = 'zenith-tab-cards-v3'
const STORAGE_CATS_KEY = 'zenith-tab-cats-v3'

const cards = ref<ZenithCard[]>([])
const categories = ref<ZenithCategory[]>([])
const activeCategoryId = ref<string>('featured')
const isReady = ref(false)

export function useZenithStorage() {
  function loadData() {
    try {
      const storedCards = localStorage.getItem(STORAGE_CARDS_KEY)
      const storedCats = localStorage.getItem(STORAGE_CATS_KEY)

      if (storedCards) {
        cards.value = JSON.parse(storedCards)
      } else {
        cards.value = [...DEFAULT_ZENITH_CARDS]
      }

      if (storedCats) {
        categories.value = JSON.parse(storedCats)
      } else {
        categories.value = [...DEFAULT_ZENITH_CATEGORIES]
      }
    } catch {
      cards.value = [...DEFAULT_ZENITH_CARDS]
      categories.value = [...DEFAULT_ZENITH_CATEGORIES]
    } finally {
      isReady.value = true
    }
  }

  function saveData() {
    if (!isReady.value) return
    try {
      localStorage.setItem(STORAGE_CARDS_KEY, JSON.stringify(cards.value))
      localStorage.setItem(STORAGE_CATS_KEY, JSON.stringify(categories.value))
    } catch (e) {
      console.error('Failed to save to localStorage', e)
    }
  }

  watch([cards, categories], () => {
    saveData()
  }, { deep: true })

  onMounted(() => {
    if (!isReady.value) {
      loadData()
    }
  })

  // Filter cards by active category
  const activeCards = computed(() => {
    if (activeCategoryId.value === 'featured') {
      return cards.value
    }
    return cards.value.filter(c => c.categoryId === activeCategoryId.value)
  })

  // Category counts
  const categoryCounts = computed(() => {
    const map: Record<string, number> = {}
    for (const cat of categories.value) {
      if (cat.id === 'featured') {
        map[cat.id] = cards.value.length
      } else {
        map[cat.id] = cards.value.filter(c => c.categoryId === cat.id).length
      }
    }
    return map
  })

  // Approximate storage size string (e.g. "18.2 KB")
  const storageSizeStr = computed(() => {
    try {
      let total = 0
      for (const key in localStorage) {
        if (Object.prototype.hasOwnProperty.call(localStorage, key)) {
          total += (localStorage[key]?.length || 0) * 2
        }
      }
      const kb = Math.max(18.2, (total / 1024)).toFixed(1)
      return `${kb} KB`
    } catch {
      return '18.2 KB'
    }
  })

  // Focus Tracker Days (since 2020-05-19 as in screenshot: 2,346天)
  const focusStats = computed(() => {
    const start = new Date('2020-05-19').getTime()
    const diff = Math.floor((Date.now() - start) / (1000 * 60 * 60 * 24))
    const formatted = diff > 0 ? diff.toLocaleString('en-US') : '2,346'
    return {
      daysFormatted: formatted,
      startDateText: '2020年05月19日 · 启动高效数字工作台',
      todosCount: 4,
    }
  })

  function addCard(newCard: Omit<ZenithCard, 'id' | 'sortOrder'>): ZenithCard {
    const card: ZenithCard = {
      ...newCard,
      id: `card-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      sortOrder: cards.value.length + 1,
      isPinned: true,
    }
    cards.value.push(card)
    return card
  }

  function deleteCard(id: string): void {
    cards.value = cards.value.filter(c => c.id !== id)
  }

  function togglePin(id: string): void {
    const target = cards.value.find(c => c.id === id)
    if (target) {
      target.isPinned = !target.isPinned
    }
  }

  function resetToDefault(): void {
    cards.value = [...DEFAULT_ZENITH_CARDS]
    categories.value = [...DEFAULT_ZENITH_CATEGORIES]
    activeCategoryId.value = 'featured'
    saveData()
  }

  return {
    cards,
    categories,
    activeCategoryId,
    activeCards,
    categoryCounts,
    storageSizeStr,
    focusStats,
    addCard,
    deleteCard,
    togglePin,
    resetToDefault,
  }
}
