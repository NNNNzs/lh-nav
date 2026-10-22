<script setup lang="ts">
import type { NavCategory } from '@/types/nav'

interface Props {
  isOpen: boolean
  categories: NavCategory[]
  categoryCountMap: Record<string, number>
  activeCategoryId: string | null
  onlyFavorites: boolean
  totalItems: number
  totalFavorites: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'selectCategory', id: string | null): void
  (e: 'selectFavorites'): void
  (e: 'openManageCategory'): void
}>()

function scrollToCategory(id: string): void {
  emit('selectCategory', null) // clear single category filter so all categories are visible
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  emit('close')
}
</script>

<template>
  <!-- Mobile Drawer Backdrop -->
  <Transition
    enter-active-class="transition-opacity duration-200"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-150"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isOpen"
      class="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden"
      @click="emit('close')"
    ></div>
  </Transition>

  <!-- Sidebar Content Container -->
  <aside
    class="fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800/80 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:z-auto shrink-0 flex flex-col justify-between"
    :class="[isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0']"
  >
    <!-- Top Navigation Links -->
    <div class="p-4 space-y-6 overflow-y-auto flex-1">
      <!-- Quick Status Filter (All & Favorites) -->
      <div class="space-y-1">
        <button
          type="button"
          class="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer"
          :class="[
            !activeCategoryId && !onlyFavorites
              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60',
          ]"
          @click="emit('selectCategory', null); emit('close')"
        >
          <span class="flex items-center gap-2.5">
            <span class="text-base">🧭</span>
            <span>全部站点</span>
          </span>
          <span class="px-2 py-0.5 rounded-full text-[11px] bg-slate-100 dark:bg-slate-800 font-mono">
            {{ totalItems }}
          </span>
        </button>

        <button
          type="button"
          class="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer"
          :class="[
            onlyFavorites
              ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60',
          ]"
          @click="emit('selectFavorites'); emit('close')"
        >
          <span class="flex items-center gap-2.5">
            <span class="text-base">⭐</span>
            <span>特别收藏</span>
          </span>
          <span class="px-2 py-0.5 rounded-full text-[11px] bg-slate-100 dark:bg-slate-800 font-mono">
            {{ totalFavorites }}
          </span>
        </button>
      </div>

      <!-- Categories Navigation -->
      <div class="space-y-1.5">
        <div class="flex items-center justify-between px-3 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          <span>分类导航</span>
          <button
            type="button"
            class="hover:text-emerald-600 dark:hover:text-emerald-400 transition"
            title="管理分类"
            @click="emit('openManageCategory')"
          >
            管理
          </button>
        </div>

        <div class="space-y-1">
          <button
            v-for="cat in categories"
            :key="cat.id"
            type="button"
            class="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium transition cursor-pointer group"
            :class="[
              activeCategoryId === cat.id
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60',
            ]"
            @click="scrollToCategory(cat.id)"
          >
            <span class="flex items-center gap-2.5 truncate">
              <span class="text-base shrink-0 group-hover:scale-110 transition-transform">
                {{ cat.icon || '📁' }}
              </span>
              <span class="truncate">{{ cat.name }}</span>
            </span>
            <span
              class="px-2 py-0.5 text-[10px] rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 font-mono shrink-0"
            >
              {{ categoryCountMap[cat.id] || 0 }}
            </span>
          </button>
        </div>
      </div>
    </div>

    <!-- Bottom Actions / Profile & Docs -->
    <div class="p-4 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50">
      <div class="flex items-center justify-between text-xs text-slate-400">
        <span>快捷跳转</span>
        <button
          type="button"
          class="text-emerald-600 dark:text-emerald-400 font-medium hover:underline cursor-pointer"
          @click="emit('openManageCategory')"
        >
          + 调整分类
        </button>
      </div>
    </div>
  </aside>
</template>
