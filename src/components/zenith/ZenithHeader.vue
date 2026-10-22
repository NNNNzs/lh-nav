<script setup lang="ts">
import { ref } from 'vue'
import { DEFAULT_WEATHER } from '@/constants/zenithData'

const emit = defineEmits<{
  (e: 'openAddCard'): void
  (e: 'toggleTheme'): void
}>()

const weather = ref(DEFAULT_WEATHER)
const isNightMode = ref(false)

function handleTheme() {
  isNightMode.value = !isNightMode.value
  emit('toggleTheme')
}
</script>

<template>
  <header class="w-full flex items-center justify-between gap-4 pt-5 pb-3">
    <!-- Left Badges -->
    <div class="flex items-center gap-3">
      <!-- 极简标签 Zenith Badge -->
      <div
        class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white shadow-sm"
      >
        <!-- Blue icon box -->
        <div class="w-4 h-4 rounded-md bg-[#3b82f6] flex items-center justify-center text-white">
          <svg class="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
            <path d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z" />
          </svg>
        </div>
        <span class="text-xs font-semibold tracking-wide">极简标签</span>
        <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-white/10 text-white/70 font-mono">
          Zenith
        </span>
      </div>

      <!-- 离线可用已同步本地沙盒 -->
      <div
        class="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-white/80 shadow-sm"
      >
        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>离线可用 · 已同步本地沙盒</span>
      </div>
    </div>

    <!-- Right Controls -->
    <div class="flex items-center gap-2.5">
      <!-- Weather Widget -->
      <div
        class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-white/90 shadow-sm cursor-pointer hover:bg-white/15 transition select-none"
      >
        <span class="text-amber-300">{{ weather.icon }}</span>
        <span class="font-bold">{{ weather.temperature }}°C</span>
        <span class="text-white/70">{{ weather.condition }}</span>
      </div>

      <!-- Add Card Button -->
      <button
        type="button"
        class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 backdrop-blur-md border border-white/15 text-xs font-semibold text-white shadow-sm transition cursor-pointer"
        @click="emit('openAddCard')"
      >
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        <span>添加卡片</span>
      </button>

      <!-- Theme / Moon Toggle -->
      <button
        type="button"
        class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/80 hover:text-white transition cursor-pointer"
        title="切换主题"
        @click="handleTheme"
      >
        <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M21.64 13a1 1 0 00-1.05-.14 8.049 8.049 0 01-3.37.73 8.15 8.15 0 01-8.14-8.1 8.59 8.59 0 01.25-2 1 1 0 00-1.3-1.07A10 10 0 1022 14.05a1 1 0 00-.36-1.05z" />
        </svg>
      </button>
    </div>
  </header>
</template>
