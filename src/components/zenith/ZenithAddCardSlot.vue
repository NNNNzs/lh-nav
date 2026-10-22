<script setup lang="ts">
const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <button
    type="button"
    class="group flex items-center justify-center gap-3 p-3.5 rounded-2xl bg-white/40 hover:bg-white/70 backdrop-blur-xl border-2 border-dashed border-white/60 hover:border-white text-white/90 hover:text-slate-800 transition-all duration-200 shadow-glass-subtle hover:-translate-y-1 min-h-[74px] cursor-pointer"
    @click="emit('click')"
  >
    <div
      class="w-10 h-10 rounded-xl bg-white/30 group-hover:bg-indigo-600 text-white flex items-center justify-center transition-colors shadow-sm"
    >
      <span class="material-symbols-outlined text-[22px]">add</span>
    </div>
    <div class="text-left">
      <span class="text-xs font-bold block">添加网址卡片</span>
      <span class="text-[10px] text-white/70 group-hover:text-slate-500 block">自定义高颜值小组件</span>
    </div>
  </button>
</template>
