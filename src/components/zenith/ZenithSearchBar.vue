<script setup lang="ts">
import { useZenithSearch } from '@/composables/useZenithSearch'
import type { ZenithEngine } from '@/types/zenith'

const emit = defineEmits<{
  (e: 'showToast', text: string): void
}>()

const {
  query,
  currentEngine,
  engines,
  hotShortcuts,
  isDropdownOpen,
  inputRef,
  selectEngine,
  handleSearch,
} = useZenithSearch(msg => emit('showToast', msg))

function onSelectEngine(eng: ZenithEngine) {
  selectEngine(eng)
}

function setInputRef(el: any) {
  inputRef.value = el
}
</script>

<template>
  <section class="w-full max-w-2xl mb-8 relative z-30">
    <div class="relative group z-30">
      <form
        class="relative z-30 flex items-center bg-white/95 hover:bg-white focus-within:bg-white backdrop-blur-2xl rounded-full p-1.5 shadow-2xl border border-white/60 transition-all duration-300 ring-4 ring-white/10 focus-within:ring-white/30"
        @submit.prevent="handleSearch"
      >
        <!-- Engine Selector Button -->
        <button
          type="button"
          class="flex items-center gap-1.5 px-3.5 py-2 rounded-full hover:bg-slate-100/80 transition-colors shrink-0 text-slate-700 font-medium text-xs sm:text-sm cursor-pointer select-none"
          @click.stop="isDropdownOpen = !isDropdownOpen"
        >
          <span
            class="w-6 h-6 rounded-full text-white font-bold text-xs flex items-center justify-center shadow-sm"
            :class="currentEngine.iconBg"
          >
            {{ currentEngine.icon }}
          </span>
          <span>{{ currentEngine.name }}</span>
          <span class="material-symbols-outlined text-[16px] text-slate-400">expand_more</span>
        </button>

        <!-- Engine Popover Dropdown -->
        <div
          v-if="isDropdownOpen"
          class="absolute left-2 top-14 mt-1 w-48 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-100 shadow-2xl p-1.5 z-50 text-slate-800 animate-in fade-in zoom-in-95 duration-150"
          @click.stop
        >
          <div class="space-y-1">
            <button
              v-for="eng in engines"
              :key="eng.id"
              type="button"
              class="engine-opt w-full flex items-center justify-between px-3 py-2 rounded-xl transition-colors text-xs cursor-pointer"
              :class="[
                currentEngine.id === eng.id
                  ? 'bg-blue-50/80 text-blue-600 font-semibold'
                  : 'text-slate-700 hover:bg-slate-100/70 font-medium',
              ]"
              @click="onSelectEngine(eng)"
            >
              <div class="flex items-center gap-2.5">
                <span
                  class="w-5 h-5 rounded-full text-white font-bold text-[11px] flex items-center justify-center shadow-sm"
                  :class="eng.iconBg"
                >
                  {{ eng.icon }}
                </span>
                <span>{{ eng.name }}</span>
              </div>
              <span
                v-if="currentEngine.id === eng.id"
                class="material-symbols-outlined text-[16px] text-blue-600 shrink-0"
              >
                check
              </span>
            </button>
          </div>
        </div>

        <!-- Input Query -->
        <input
          :ref="setInputRef"
          v-model="query"
          autocomplete="off"
          type="text"
          placeholder="输入搜索内容，或按 Tab 快捷聚焦..."
          class="flex-1 bg-transparent border-0 outline-none focus:ring-0 text-slate-900 text-sm sm:text-base placeholder:text-slate-400 py-2.5 px-2 font-normal"
        />

        <!-- Submit Button -->
        <button
          type="submit"
          class="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-full text-xs font-medium flex items-center gap-1.5 transition-all shadow-md active:scale-95 shrink-0 cursor-pointer"
        >
          <span>搜索</span>
          <span class="material-symbols-outlined text-[15px]">arrow_forward</span>
        </button>
      </form>
    </div>

    <!-- Quick Shortcuts under search -->
    <div class="flex items-center justify-center gap-2 mt-3 text-xs text-white/90 flex-wrap select-none">
      <span class="text-white/60 drop-shadow-sm">热搜直达:</span>
      <a
        v-for="item in hotShortcuts"
        :key="item.label"
        :href="item.url"
        target="_blank"
        rel="noopener noreferrer"
        class="px-2.5 py-1 rounded-full bg-black/20 hover:bg-white/20 backdrop-blur-md border border-white/15 transition-all text-white drop-shadow-sm"
      >
        {{ item.label }}
      </a>
    </div>
  </section>
</template>
