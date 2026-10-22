<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'

interface Props {
  isSidebarOpen: boolean
  totalItems: number
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'toggleSidebar'): void
  (e: 'openSpotlight'): void
  (e: 'openAddItem'): void
  (e: 'openManageCategory'): void
  (e: 'openBackup'): void
}>()

const { isDark, toggleTheme } = useTheme()
</script>

<template>
  <header
    class="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
      <!-- Left: Mobile Menu Toggle & Brand Logo -->
      <div class="flex items-center gap-3">
        <!-- Mobile Sidebar Toggle -->
        <button
          type="button"
          class="lg:hidden p-2 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          aria-label="打开侧边菜单"
          @click="emit('toggleSidebar')"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <!-- Brand -->
        <a href="#" class="flex items-center gap-2.5 group">
          <div
            class="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform"
          >
            <span class="font-black text-lg tracking-tighter">LH</span>
          </div>
          <div>
            <div class="flex items-center gap-1.5">
              <h1 class="text-base font-extrabold tracking-tight text-slate-800 dark:text-slate-100">
                lh-nav
              </h1>
              <span class="text-[10px] px-1.5 py-0.2 rounded-full font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-mono">
                v1.0
              </span>
            </div>
            <p class="text-[10px] text-slate-400 dark:text-slate-500 hidden sm:block">
              现代导航聚合平台
            </p>
          </div>
        </a>
      </div>

      <!-- Center: Quick Search Trigger (Spotlight) -->
      <div class="flex-1 max-w-md hidden md:block">
        <button
          type="button"
          class="w-full flex items-center justify-between px-3.5 py-1.5 text-xs text-slate-400 bg-slate-100/80 hover:bg-slate-100 dark:bg-slate-800/80 dark:hover:bg-slate-800 rounded-xl border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition cursor-pointer"
          @click="emit('openSpotlight')"
        >
          <span class="flex items-center gap-2">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>快速直达导航站点...</span>
          </span>
          <kbd class="px-1.5 py-0.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded text-[10px] font-mono shadow-xs">
            ⌘K
          </kbd>
        </button>
      </div>

      <!-- Right: Action Buttons & Theme Switcher -->
      <div class="flex items-center gap-1.5 sm:gap-2">
        <!-- Add Item Button -->
        <button
          type="button"
          class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm hover:shadow transition active:scale-95 cursor-pointer"
          @click="emit('openAddItem')"
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          <span class="hidden sm:inline">新增站点</span>
        </button>

        <!-- Category Management -->
        <button
          type="button"
          class="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          title="分类管理"
          @click="emit('openManageCategory')"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
        </button>

        <!-- Backup & Restore -->
        <button
          type="button"
          class="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          title="数据备份与恢复"
          @click="emit('openBackup')"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
        </button>

        <!-- Theme Toggle Button -->
        <button
          type="button"
          class="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          :title="isDark ? '切换浅色模式' : '切换深色模式'"
          @click="toggleTheme"
        >
          <span v-if="isDark" class="text-sm">🌙</span>
          <span v-else class="text-sm">☀️</span>
        </button>
      </div>
    </div>
  </header>
</template>
