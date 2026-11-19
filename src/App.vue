<script setup lang="ts">
import { computed, ref } from 'vue'
import ZenithBookmarkModal from '@/components/zenith/ZenithBookmarkModal.vue'
import ZenithCardGrid from '@/components/zenith/ZenithCardGrid.vue'
import ZenithCategoryTabs from '@/components/zenith/ZenithCategoryTabs.vue'
import ZenithDock from '@/components/zenith/ZenithDock.vue'
import ZenithFocusWidget from '@/components/zenith/ZenithFocusWidget.vue'
import ZenithFooter from '@/components/zenith/ZenithFooter.vue'
import ZenithHeader from '@/components/zenith/ZenithHeader.vue'
import ZenithHeroClock from '@/components/zenith/ZenithHeroClock.vue'
import ZenithNoteWidget from '@/components/zenith/ZenithNoteWidget.vue'
import ZenithSearchBar from '@/components/zenith/ZenithSearchBar.vue'
import ZenithToast from '@/components/zenith/ZenithToast.vue'
import ZenithWallpaperModal from '@/components/zenith/ZenithWallpaperModal.vue'
import { useZenithBookmarks } from '@/composables/useZenithBookmarks'
import { useZenithToast } from '@/composables/useZenithToast'
import { useZenithWallpaper } from '@/composables/useZenithWallpaper'
import type { IconKind, ZenithCategoryKey } from '@/types/zenith'

const {
  bookmarks,
  activeCategory,
  filteredBookmarks,
  categoryTabs,
  totalCount,
  setCategory,
  addBookmark,
  resetLayout,
} = useZenithBookmarks()

const { currentWpUrl, wallpapers, setWallpaper, resetToDefault: resetWallpaper } = useZenithWallpaper()
const { isVisible: isToastVisible, toastText, showToast } = useZenithToast()

const isAddModalOpen = ref(false)
const isWallpaperModalOpen = ref(false)

function handleFilterCategory(cat: ZenithCategoryKey) {
  setCategory(cat)
  showToast('已筛选分类')
}

function handleSelectWallpaper(url: string) {
  setWallpaper(url)
  showToast('已更换精美高清壁纸')
}

function handleResetWallpaper() {
  resetWallpaper()
  showToast('已恢复默认暮光壁纸')
}

function handleResetLayout() {
  resetLayout()
  showToast('已重置布局为默认推荐')
}

function handleSaveBookmark(payload: {
  title: string
  url: string
  desc: string
  category: ZenithCategoryKey
  iconKind: IconKind
  iconValue: string
  iconBg?: string
}) {
  if (!payload.title || !payload.url) {
    showToast('请填写网站名称和网址')
    return
  }
  addBookmark(payload)
  showToast(`小组件「${payload.title}」已成功添加！`)
}

function handleTogglePin(id: string) {
  const item = bookmarks.value.find(b => b.id === id)
  if (item) {
    item.isPinned = !item.isPinned
    showToast(item.isPinned ? `已置顶「${item.title}」` : `已取消置顶「${item.title}」`)
  }
}

const wallpaperStyle = computed(() => {
  return {
    backgroundImage: `
      radial-gradient(circle at 15% 20%, rgba(251, 146, 60, 0.28), transparent 45%),
      radial-gradient(circle at 85% 15%, rgba(56, 189, 248, 0.22), transparent 45%),
      linear-gradient(180deg, rgba(15, 23, 42, 0.35) 0%, rgba(15, 23, 42, 0.1) 40%, rgba(15, 23, 42, 0.45) 100%),
      url('${currentWpUrl.value}')
    `,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
  }
})
</script>

<template>
  <div
    class="min-h-screen bg-twilight-nature text-slate-800 antialiased selection:bg-white/30 selection:text-white relative flex flex-col justify-between overflow-x-hidden font-sans"
    :style="wallpaperStyle"
  >
    <!-- Ambient Light Overlay for readability & softness -->
    <div class="fixed inset-0 pointer-events-none bg-black/15 backdrop-blur-[0.5px] z-0"></div>

    <!-- Left Dock Navigation (WeTab inspired sleek vertical dock) -->
    <ZenithDock
      :active-category="activeCategory"
      @filter-category="handleFilterCategory"
      @open-wallpaper-modal="isWallpaperModalOpen = true"
      @open-add-modal="isAddModalOpen = true"
    />

    <!-- Top Glass Header -->
    <ZenithHeader
      @open-add-modal="isAddModalOpen = true"
      @open-wallpaper-modal="isWallpaperModalOpen = true"
    />

    <!-- Main Center Content -->
    <main class="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 md:pl-20 py-4 flex flex-col items-center flex-1 justify-start">
      <!-- Hero Time & Atmospheric Greeting -->
      <ZenithHeroClock />

      <!-- Capsule Search Bar (WeTab / Modern SuperTab pill style) -->
      <ZenithSearchBar
        @show-toast="showToast"
      />

      <!-- Category Tabs Navigation Filter -->
      <ZenithCategoryTabs
        :tabs="categoryTabs"
        :active-category="activeCategory"
        :total-count="totalCount"
        @select-category="handleFilterCategory"
        @open-add-modal="isAddModalOpen = true"
      />

      <!-- Grid Container with WeTab-inspired Multi-Sized Widget Layout -->
      <div class="w-full space-y-4">
        <!-- Top Row Feature Widgets: Large Focus Widget + Apple Style Notes Widget -->
        <div class="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
          <ZenithFocusWidget
            @open-focus="showToast('已进入专注计时')"
            @open-todos="showToast('打开待办清单 (共 4 项)')"
          />
          <ZenithNoteWidget
            @copy="showToast('便签内容已复制到剪贴板')"
            @clear="showToast('已清空便签')"
          />
        </div>

        <!-- Main Navigation Cards Grid: Squircle WeTab Style with custom high-fidelity icons -->
        <ZenithCardGrid
          :cards="filteredBookmarks"
          @toggle-pin="handleTogglePin"
          @open-add-modal="isAddModalOpen = true"
        />
      </div>
    </main>

    <!-- Modern Floating Bottom Status Bar -->
    <ZenithFooter
      @reset-layout="handleResetLayout"
    />

    <!-- Modal: Add / Edit Bookmark -->
    <ZenithBookmarkModal
      v-model="isAddModalOpen"
      @save="handleSaveBookmark"
    />

    <!-- Modal: Wallpaper Gallery Configuration -->
    <ZenithWallpaperModal
      v-model="isWallpaperModalOpen"
      :current-url="currentWpUrl"
      :wallpapers="wallpapers"
      @select-wallpaper="handleSelectWallpaper"
      @reset-default="handleResetWallpaper"
    />

    <!-- Toast Notification -->
    <ZenithToast
      :visible="isToastVisible"
      :text="toastText"
    />
  </div>
</template>
