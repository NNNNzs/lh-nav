<script setup lang="ts">
import type { ZenithCategory } from '@/types/zenith'

interface Props {
  categories: ZenithCategory[]
  activeId: string
  counts: Record<string, number>
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'selectCategory', id: string): void
  (e: 'openAddCard'): void
}>()
</script>

<template>
  <div class="w-full flex items-center justify-between gap-4 pt-6 pb-2 select-none">
    <!-- Category Tabs Group -->
    <div
      class="inline-flex items-center gap-1 p-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 overflow-x-auto max-w-full"
    >
      <button
        v-for="cat in categories"
        :key="cat.id"
        type="button"
        class="shrink-0 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer"
        :class="[
          activeId === cat.id
            ? 'bg-white text-slate-900 shadow-sm'
            : 'text-white/70 hover:text-white hover:bg-white/10',
        ]"
        @click="emit('selectCategory', cat.id)"
      >
        <span>{{ cat.name }}</span>
        <span
          v-if="cat.id === 'featured'"
          class="text-[10px] font-mono font-bold"
          :class="[activeId === cat.id ? 'text-slate-900' : 'text-white/60']"
        >
          {{ counts[cat.id] || 11 }}
        </span>
      </button>
    </div>

    <!-- Right Add Card Shortcut -->
    <button
      type="button"
      class="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 backdrop-blur-md border border-white/15 text-xs font-medium text-white/90 transition cursor-pointer"
      @click="emit('openAddCard')"
    >
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" stroke-width="2" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v8m-4-4h8" />
      </svg>
      <span>添加卡片</span>
    </button>
  </div>
</template>
