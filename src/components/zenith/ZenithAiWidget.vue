<script setup lang="ts">
const emit = defineEmits<{
  (e: 'openAi'): void
}>()
</script>

<template>
  <div
    class="relative overflow-hidden rounded-3xl p-6 bg-gradient-to-br from-indigo-900/60 via-purple-900/50 to-slate-900/60 backdrop-blur-2xl border border-white/25 shadow-2xl text-white flex flex-col justify-between group hover:border-white/40 transition-all cursor-pointer select-none"
    @click="emit('openAi')"
  >
    <div class="flex items-center justify-between">
      <div
        class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-violet-500 to-indigo-500 flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform"
      >
        <span class="material-symbols-outlined text-[26px]">psychology</span>
      </div>
      <span class="px-2.5 py-1 rounded-full bg-indigo-500/30 text-indigo-200 text-[11px] font-medium border border-indigo-400/30">
        AI Copilot
      </span>
    </div>
    <div class="mt-4">
      <h3 class="text-base font-bold text-white tracking-wide">Zenith 智能助手</h3>
      <p class="text-xs text-white/70 mt-1 line-clamp-2">一键呼出大语言模型，赋能写作、编程与灵感搜索</p>
    </div>
    <div class="mt-4 pt-3 border-t border-white/15 flex items-center justify-between">
      <span class="text-xs text-indigo-300 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
        立即启用 <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
      </span>
      <span class="text-[11px] text-white/50">支持 GPT-4o / Claude</span>
    </div>
  </div>
</template>
