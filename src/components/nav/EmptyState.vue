<script setup lang="ts">
interface Props {
  title?: string
  description?: string
  actionText?: string
}

withDefaults(defineProps<Props>(), {
  title: '未搜索到相关站点',
  description: '可以尝试更换搜索关键词，或者清空当前筛选条件',
  actionText: '清空筛选条件',
})

const emit = defineEmits<{
  (e: 'reset'): void
}>()
</script>

<template>
  <div class="py-16 px-4 text-center max-w-md mx-auto">
    <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-3xl shadow-inner">
      🔍
    </div>
    <h3 class="text-base font-bold text-slate-700 dark:text-slate-200">
      {{ title }}
    </h3>
    <p class="mt-1.5 text-xs sm:text-sm text-slate-400 dark:text-slate-500 leading-relaxed">
      {{ description }}
    </p>
    <div class="mt-6 flex justify-center gap-3">
      <button
        type="button"
        class="px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition active:scale-95 cursor-pointer"
        @click="emit('reset')"
      >
        {{ actionText }}
      </button>
    </div>
  </div>
</template>
