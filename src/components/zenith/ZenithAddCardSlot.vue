<script setup lang="ts">
const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <div
    class="relative rounded-2xl border-2 border-dashed border-emerald-400/30 hover:border-emerald-400/60 bg-emerald-500/10 hover:bg-emerald-500/20 active:scale-[0.98] backdrop-blur-xl p-3.5 sm:p-4 flex items-center gap-3.5 shadow-md transition-all duration-200 cursor-pointer group select-none"
    @click="emit('click')"
  >
    <!-- Plus Icon Box -->
    <div
      class="w-12 h-12 rounded-xl bg-emerald-600/70 group-hover:bg-emerald-600 flex items-center justify-center text-white shadow-sm shrink-0 group-hover:scale-105 transition-transform duration-200"
    >
      <svg class="w-6 h-6 stroke-current stroke-2 fill-none" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    </div>

    <!-- Text info -->
    <div class="min-w-0 flex-1">
      <h4 class="text-sm sm:text-base font-bold text-white tracking-tight">
        添加网址卡片
      </h4>
      <p class="text-xs text-emerald-200/70 truncate mt-0.5">
        自定义高颜值小组件
      </p>
    </div>
  </div>
</template>
