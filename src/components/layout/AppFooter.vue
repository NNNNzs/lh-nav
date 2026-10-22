<script setup lang="ts">
interface Props {
  totalCategories: number
  totalItems: number
  totalFavorites: number
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'openBackup'): void
}>()
</script>

<template>
  <footer class="mt-16 border-t border-slate-200/80 dark:border-slate-800/80 py-8 text-xs text-slate-400 dark:text-slate-500">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <!-- Left: Copyright and Stack -->
      <div class="flex items-center gap-2">
        <span class="font-bold text-slate-700 dark:text-slate-300">lh-nav</span>
        <span>•</span>
        <span>基于 Vue 3 + TypeScript + Tailwind CSS 构建</span>
      </div>

      <!-- Right: Summary Stats & Backup Action -->
      <div class="flex items-center gap-4">
        <span>已收录 {{ totalCategories }} 个分类，共 {{ totalItems }} 个聚合站点</span>
        <button
          type="button"
          class="text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
          @click="emit('openBackup')"
        >
          备份数据
        </button>
      </div>
    </div>
  </footer>
</template>
