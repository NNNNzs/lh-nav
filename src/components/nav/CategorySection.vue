<script setup lang="ts">
import NavCard from '@/components/nav/NavCard.vue'
import type { NavCategory, NavItem } from '@/types/nav'

interface Props {
  category: NavCategory
  items: NavItem[]
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'addItem', categoryId: string): void
  (e: 'editItem', item: NavItem): void
  (e: 'deleteItem', id: string): void
  (e: 'toggleFavorite', id: string): void
  (e: 'filterTag', tag: string): void
}>()
</script>

<template>
  <section :id="category.id" class="scroll-mt-24 space-y-4">
    <!-- Category Title Header -->
    <div class="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800/80">
      <div class="flex items-center gap-3">
        <span class="text-2xl select-none">{{ category.icon || '📁' }}</span>
        <div>
          <div class="flex items-center gap-2">
            <h3 class="text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight">
              {{ category.name }}
            </h3>
            <span
              class="px-2 py-0.5 text-xs font-semibold rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-mono"
            >
              {{ items.length }}
            </span>
          </div>
          <p v-if="category.description" class="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
            {{ category.description }}
          </p>
        </div>
      </div>

      <!-- Quick Add to this category -->
      <button
        type="button"
        class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 rounded-lg transition cursor-pointer"
        @click="emit('addItem', category.id)"
      >
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        <span>添加</span>
      </button>
    </div>

    <!-- Items Grid -->
    <div
      v-if="items.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5"
    >
      <NavCard
        v-for="item in items"
        :key="item.id"
        :item="item"
        @edit="emit('editItem', $event)"
        @delete="emit('deleteItem', $event)"
        @toggle-favorite="emit('toggleFavorite', $event)"
        @filter-tag="emit('filterTag', $event)"
      />
    </div>

    <!-- Empty within this category -->
    <div
      v-else
      class="py-10 text-center rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30"
    >
      <p class="text-sm text-slate-400 dark:text-slate-500">
        该分类下暂无匹配站点
      </p>
      <button
        type="button"
        class="mt-2 text-xs font-medium text-emerald-600 hover:underline cursor-pointer"
        @click="emit('addItem', category.id)"
      >
        点击添加第一个站点
      </button>
    </div>
  </section>
</template>
