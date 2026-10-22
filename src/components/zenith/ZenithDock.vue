<script setup lang="ts">
import type { ZenithCategoryKey } from '@/types/zenith'

const emit = defineEmits<{
  (e: 'filterCategory', cat: ZenithCategoryKey): void
  (e: 'toggleWallpaper'): void
  (e: 'openAddModal'): void
  (e: 'showTip'): void
}>()
</script>

<template>
  <aside
    class="fixed left-3.5 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-4 py-4 px-2 rounded-2xl bg-black/35 hover:bg-black/45 backdrop-blur-2xl border border-white/20 shadow-2xl transition-all duration-300"
  >
    <!-- User Profile Avatar -->
    <button
      class="relative group p-1 transition cursor-pointer"
      title="用户中心"
      type="button"
    >
      <div class="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-400 to-rose-400 p-0.5 shadow-md">
        <div class="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-white text-xs font-semibold overflow-hidden">
          <span class="material-symbols-outlined text-[18px]">account_circle</span>
        </div>
      </div>
      <span
        class="absolute left-14 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md text-white text-[11px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg z-50"
      >
        用户中心
      </span>
    </button>

    <div class="w-5 h-[1px] bg-white/15 my-0.5"></div>

    <!-- Navigation items -->
    <div class="flex flex-col items-center gap-2">
      <!-- Home -->
      <button
        class="relative group p-2 rounded-xl bg-white/25 text-white shadow-inner transition-all hover:scale-105 cursor-pointer"
        title="主页导航"
        type="button"
        @click="emit('filterCategory', 'all')"
      >
        <span class="material-symbols-outlined text-[20px] text-white">home</span>
        <span
          class="absolute left-14 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md text-white text-[11px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg z-50"
        >
          主页导航
        </span>
      </button>

      <!-- AI & Tech -->
      <button
        class="relative group p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/15 transition-all hover:scale-105 cursor-pointer"
        title="AI 助手 & 开发"
        type="button"
        @click="emit('filterCategory', 'dev')"
      >
        <span class="material-symbols-outlined text-[20px]">auto_awesome</span>
        <span
          class="absolute left-14 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md text-white text-[11px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg z-50"
        >
          AI & 技术
        </span>
      </button>

      <!-- Design Inspiration -->
      <button
        class="relative group p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/15 transition-all hover:scale-105 cursor-pointer"
        title="设计灵感"
        type="button"
        @click="emit('filterCategory', 'design')"
      >
        <span class="material-symbols-outlined text-[20px]">palette</span>
        <span
          class="absolute left-14 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md text-white text-[11px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg z-50"
        >
          设计灵感
        </span>
      </button>

      <!-- Wallpaper cycle -->
      <button
        class="relative group p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/15 transition-all hover:scale-105 cursor-pointer"
        title="切换壁纸/视觉"
        type="button"
        @click="emit('toggleWallpaper')"
      >
        <span class="material-symbols-outlined text-[20px]">wallpaper</span>
        <span
          class="absolute left-14 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md text-white text-[11px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg z-50"
        >
          切换壁纸氛围
        </span>
      </button>
    </div>

    <div class="w-5 h-[1px] bg-white/15 my-0.5"></div>

    <!-- Bottom Actions -->
    <button
      class="relative group p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/15 transition-all hover:scale-105 cursor-pointer"
      title="添加网站组件"
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

    <button
      class="relative group p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/15 transition-all hover:scale-105 cursor-pointer"
      title="系统设置"
      type="button"
      @click="emit('showTip')"
    >
      <span class="material-symbols-outlined text-[20px]">settings</span>
      <span
        class="absolute left-14 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md text-white text-[11px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg z-50"
      >
        偏好设置
      </span>
    </button>
  </aside>
</template>
