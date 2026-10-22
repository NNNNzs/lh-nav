<script setup lang="ts">
const emit = defineEmits<{
  (e: 'openAi'): void
}>()
</script>

<template>
  <div
    class="relative rounded-3xl bg-[#1c2237]/50 backdrop-blur-xl border border-white/10 p-6 text-white flex flex-col justify-between gap-5 shadow-xl overflow-hidden group hover:border-indigo-500/30 transition-all duration-300"
  >
    <!-- Ambient glow -->
    <div
      class="absolute -bottom-10 -right-10 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"
    ></div>

    <!-- Top Row: Icon + Copilot Badge -->
    <div class="flex items-center justify-between z-10">
      <!-- AI Icon -->
      <div
        class="w-11 h-11 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform"
      >
        <svg class="w-6 h-6 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="4" />
          <path stroke-linecap="round" d="M12 2v2m0 16v2M2 12h2m16 0h2m-3.05-6.95l-1.41 1.41M6.46 17.54l-1.41 1.41m12.73 0l-1.41-1.41M6.46 6.46L5.05 5.05" />
        </svg>
      </div>

      <!-- Badge -->
      <div
        class="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-medium text-indigo-300 shadow-xs"
      >
        AI Copilot
      </div>
    </div>

    <!-- Title & Description -->
    <div class="space-y-1.5 z-10">
      <h3 class="text-lg font-bold text-white tracking-tight">
        Zenith 智能助手
      </h3>
      <p class="text-xs text-white/70 leading-relaxed">
        一键呼出大语言模型，赋能写作、编程与灵感搜索
      </p>
    </div>

    <!-- Bottom Row: Action link & model support info -->
    <div class="pt-2 flex items-center justify-between text-xs z-10">
      <button
        type="button"
        class="inline-flex items-center gap-1.5 font-bold text-white hover:text-indigo-300 transition cursor-pointer select-none group/btn"
        @click="emit('openAi')"
      >
        <span>立即启用</span>
        <svg class="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>

      <span class="text-[11px] text-white/40 font-mono">
        支持 GPT-4o / Claude
      </span>
    </div>
  </div>
</template>
