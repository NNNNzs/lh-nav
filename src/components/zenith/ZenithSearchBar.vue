<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useZenithSearch } from '@/composables/useZenithSearch'
import type { SearchEngine } from '@/types/zenith'

const {
  query,
  currentEngine,
  engines,
  hotShortcuts,
  setEngine,
  handleSearch,
} = useZenithSearch()

const isDropdownOpen = ref(false)
const inputRef = ref<HTMLInputElement | null>(null)

function selectEngine(e: SearchEngine) {
  setEngine(e)
  isDropdownOpen.value = false
  inputRef.value?.focus()
}

function handleTabKey(e: KeyboardEvent) {
  if (e.key === 'Tab' && document.activeElement !== inputRef.value) {
    e.preventDefault()
    inputRef.value?.focus()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleTabKey)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleTabKey)
})
</script>

<template>
  <div class="max-w-2xl w-full mx-auto space-y-3.5">
    <!-- Main Search Pill Bar -->
    <div
      class="relative bg-white/95 dark:bg-white/90 backdrop-blur-2xl rounded-full p-1.5 shadow-2xl flex items-center justify-between border border-white/40 focus-within:ring-4 focus-within:ring-white/20 transition-all"
    >
      <!-- Search Engine Selector -->
      <div class="relative shrink-0">
        <button
          type="button"
          class="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full hover:bg-slate-100/80 transition cursor-pointer text-slate-700 text-xs font-semibold select-none"
          @click="isDropdownOpen = !isDropdownOpen"
        >
          <!-- Engine Icon Circle -->
          <div
            class="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs shadow-xs"
          >
            {{ currentEngine.icon }}
          </div>
          <span>{{ currentEngine.name }}</span>
          <svg class="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <!-- Dropdown Menu -->
        <div
          v-if="isDropdownOpen"
          class="absolute left-0 mt-2 w-36 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 py-1.5 z-50 text-xs overflow-hidden"
        >
          <button
            v-for="eng in engines"
            :key="eng.id"
            type="button"
            class="w-full px-3 py-2 flex items-center gap-2.5 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition cursor-pointer"
            @click="selectEngine(eng)"
          >
            <span class="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-700 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-[11px]">
              {{ eng.icon }}
            </span>
            <span class="font-medium">{{ eng.name }}</span>
          </button>
        </div>
      </div>

      <!-- Text Input -->
      <input
        ref="inputRef"
        v-model="query"
        type="text"
        :placeholder="currentEngine.placeholder"
        class="flex-1 px-3 py-1.5 bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none min-w-0"
        @keydown.enter="handleSearch"
      />

      <!-- Search Submit Button -->
      <button
        type="button"
        class="shrink-0 flex items-center gap-1.5 px-5 py-2.5 bg-slate-900 hover:bg-black active:scale-95 text-white rounded-full text-xs font-semibold shadow-md transition cursor-pointer"
        @click="handleSearch"
      >
        <span>搜索</span>
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>
    </div>

    <!-- Hot Search Shortcuts (热搜直达) -->
    <div class="flex flex-wrap items-center justify-center gap-2 text-xs select-none">
      <span class="text-white/60">热搜直达:</span>
      <a
        v-for="item in hotShortcuts"
        :key="item.label"
        :href="item.url"
        target="_blank"
        rel="noopener noreferrer"
        class="px-3.5 py-1 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 backdrop-blur-md text-white/90 text-xs font-medium transition cursor-pointer"
      >
        {{ item.label }}
      </a>
    </div>
  </div>
</template>
