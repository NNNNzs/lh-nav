<script setup lang="ts">
import type { ZenithCategoryKey } from '@/types/zenith'

interface Props {
  activeCategory: ZenithCategoryKey
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'filterCategory', cat: ZenithCategoryKey): void
  (e: 'openWallpaperModal'): void
  (e: 'openAddModal'): void
}>()

interface DockTab {
  id: ZenithCategoryKey
  name: string
  icon: string
}

const dockTabs: DockTab[] = [
  { id: 'all', name: '常用推荐', icon: 'home' },
  { id: 'work', name: '办公效率', icon: 'work' },
  { id: 'ai', name: 'AI 助手', icon: 'auto_awesome' },
  { id: 'media', name: '影音娱乐', icon: 'play_circle' },
  { id: 'social', name: '社交资讯', icon: 'forum' },
]
</script>

<template>
  <aside
    class="fixed left-3.5 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-3 py-3.5 px-2 rounded-2xl bg-black/35 hover:bg-black/45 backdrop-blur-2xl border border-white/20 shadow-2xl transition-all duration-300"
  >
    <!-- Navigation items (fully linked with activeCategory) -->
    <div class="flex flex-col items-center gap-2">
      <button
        v-for="tab in dockTabs"
        :key="tab.id"
        class="relative group p-2 rounded-xl transition-all cursor-pointer"
        :class="[
          activeCategory === tab.id
            ? 'bg-white/25 text-white shadow-inner scale-105'
            : 'text-white/70 hover:text-white hover:bg-white/15 hover:scale-105',
        ]"
        :title="tab.name"
        type="button"
        @click="emit('filterCategory', tab.id)"
      >
        <span class="material-symbols-outlined text-[20px]">{{ tab.icon }}</span>
        <span
          class="absolute left-14 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md text-white text-[11px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg z-50"
        >
          {{ tab.name }}
        </span>
      </button>

      <!-- Wallpaper settings modal -->
      <button
        class="relative group p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/15 transition-all hover:scale-105 cursor-pointer"
        title="壁纸与背景设置"
        type="button"
        @click="emit('openWallpaperModal')"
      >
        <span class="material-symbols-outlined text-[20px]">wallpaper</span>
        <span
          class="absolute left-14 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md text-white text-[11px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg z-50"
        >
          壁纸与背景设置
        </span>
      </button>
    </div>

    <div class="w-5 h-[1px] bg-white/15 my-0.5"></div>

    <!-- Bottom Actions: Add Bookmark Widget Card -->
    <button
      class="relative group p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/15 transition-all hover:scale-105 cursor-pointer"
      title="添加组件卡片"
      type="button"
      @click="emit('openAddModal')"
    >
      <span class="material-symbols-outlined text-[20px]">add_circle</span>
      <span
        class="absolute left-14 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md text-white text-[11px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg z-50"
      >
        添加组件卡片
      </span>
    </button>
  </aside>
</template>
