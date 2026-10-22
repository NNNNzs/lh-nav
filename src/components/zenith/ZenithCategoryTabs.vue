<script setup lang="ts">
import type { ZenithCategoryKey, ZenithCategoryTab } from '@/types/zenith'

interface Props {
  tabs: ZenithCategoryTab[]
  activeCategory: ZenithCategoryKey
  totalCount: number
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'selectCategory', cat: ZenithCategoryKey): void
  (e: 'openAddModal'): void
}>()
</script>

<template>
  <section class="w-full mb-6 flex items-center justify-between">
    <!-- Category Tabs Filter Bar -->
    <div
      class="flex items-center gap-1.5 p-1 rounded-2xl bg-black/30 backdrop-blur-xl border border-white/20 shadow-glass overflow-x-auto no-scrollbar"
    >
      <button
        v-for="tab in tabs"
        :key="tab.id"
        type="button"
        class="cat-pill px-4 py-1.5 rounded-xl text-xs transition-all cursor-pointer select-none"
        :class="[
          activeCategory === tab.id
            ? 'active font-semibold bg-white text-slate-900 shadow-md'
            : 'font-medium text-white/80 hover:text-white hover:bg-white/15',
        ]"
        @click="emit('selectCategory', tab.id)"
      >
        <span>{{ tab.name }}</span>
        <span
          v-if="tab.id === 'all'"
          class="ml-1 px-1.5 py-0.2 text-[10px] bg-slate-100 text-slate-700 rounded-full font-mono"
        >
          {{ totalCount }}
        </span>
      </button>
    </div>

    <!-- Right Side Add Card Button -->
    <div class="hidden sm:flex items-center gap-2">
      <button
        type="button"
        class="text-xs text-white/90 hover:text-white flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/20 transition-all shadow-glass cursor-pointer select-none"
        @click="emit('openAddModal')"
      >
        <span class="material-symbols-outlined text-[16px]">add_circle</span>
        <span>添加卡片</span>
      </button>
    </div>
  </section>
</template>
