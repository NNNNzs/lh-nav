<script setup lang="ts">
import { ref } from 'vue'
import BaseBadge from '@/components/common/BaseBadge.vue'

interface Props {
  keyword: string
  activeTag: string | null
  onlyFavorites: boolean
  allTags: string[]
  totalMatches: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:keyword', val: string): void
  (e: 'clearTag'): void
  (e: 'selectTag', tag: string): void
  (e: 'toggleFavorites'): void
  (e: 'openSpotlight'): void
}>()

const inputRef = ref<HTMLInputElement | null>(null)

function handleInput(event: Event): void {
  const target = event.target as HTMLInputElement
  emit('update:keyword', target.value)
}

function clearKeyword(): void {
  emit('update:keyword', '')
  inputRef.value?.focus()
}
</script>

<template>
  <div class="space-y-3">
    <!-- Main Search Input Bar -->
    <div class="relative flex items-center">
      <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      <input
        ref="inputRef"
        type="text"
        :value="keyword"
        placeholder="搜索站点名称、网址、描述或标签... (按 / 聚焦，⌘K 聚合搜索)"
        class="w-full pl-10 pr-24 py-2.5 sm:py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
        @input="handleInput"
      />

      <div class="absolute inset-y-0 right-0 pr-2.5 flex items-center gap-1.5">
        <!-- Clear input button -->
        <button
          v-if="keyword"
          type="button"
          class="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition cursor-pointer"
          title="清空搜索"
          @click="clearKeyword"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- Command Palette Trigger button -->
        <button
          type="button"
          class="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-[11px] font-mono text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition cursor-pointer"
          title="打开全局快捷面板"
          @click="emit('openSpotlight')"
        >
          <span class="text-xs">⌘</span>K
        </button>
      </div>
    </div>

    <!-- Active Filters & Tags Quick Filter Bar -->
    <div class="flex flex-wrap items-center justify-between gap-2 text-xs">
      <!-- Tag Pills & Filter toggles -->
      <div class="flex flex-wrap items-center gap-1.5">
        <!-- Only Favorites Toggle -->
        <button
          type="button"
          class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition cursor-pointer"
          :class="[
            onlyFavorites
              ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-300 border-amber-300 dark:border-amber-700 shadow-sm'
              : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-300',
          ]"
          @click="emit('toggleFavorites')"
        >
          <span>⭐</span>
          <span>特别收藏</span>
        </button>

        <!-- Active Tag Indicator -->
        <div v-if="activeTag" class="inline-flex items-center gap-1">
          <BaseBadge color="emerald" size="sm">
            <span>#{{ activeTag }}</span>
            <button
              type="button"
              class="ml-0.5 hover:text-emerald-900 transition"
              @click="emit('clearTag')"
            >
              ×
            </button>
          </BaseBadge>
        </div>

        <!-- Tag shortcuts -->
        <span class="text-slate-300 dark:text-slate-700 select-none">|</span>
        <button
          v-for="t in allTags.slice(0, 6)"
          :key="t"
          type="button"
          class="px-2.5 py-0.5 rounded-full text-xs transition cursor-pointer select-none"
          :class="[
            activeTag === t
              ? 'bg-emerald-600 text-white font-medium'
              : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400',
          ]"
          @click="emit('selectTag', t)"
        >
          #{{ t }}
        </button>
      </div>

      <!-- Match Stats -->
      <div v-if="keyword || activeTag || onlyFavorites" class="text-slate-400 dark:text-slate-500 font-mono text-xs shrink-0">
        匹配到 <span class="font-bold text-emerald-600 dark:text-emerald-400">{{ totalMatches }}</span> 项
      </div>
    </div>
  </div>
</template>
