<script setup lang="ts">
const emit = defineEmits<{
  (e: 'openFocus'): void
  (e: 'openTodos'): void
}>()
</script>

<template>
  <div
    class="md:col-span-2 relative overflow-hidden rounded-3xl p-6 bg-gradient-to-r from-amber-900/40 via-stone-900/50 to-emerald-950/40 backdrop-blur-2xl border border-white/25 shadow-2xl text-white flex flex-col sm:flex-row items-center justify-between gap-6 group hover:border-white/40 transition-all select-none"
  >
    <div class="space-y-3 z-10 text-left w-full sm:w-auto">
      <div
        class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-medium border border-white/20"
      >
        <span class="material-symbols-outlined text-amber-300 text-[16px]">auto_awesome</span>
        <span>与灵感与自律相伴</span>
      </div>
      <div>
        <div class="flex items-baseline gap-2">
          <span
            class="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-amber-100 to-amber-300 bg-clip-text text-transparent font-sans"
          >
            2,346
          </span>
          <span class="text-base font-medium text-white/80">天</span>
        </div>
        <p class="text-xs text-white/70 mt-1">2020年05月19日 · 启动高效数字工作台</p>
      </div>
      <div class="flex items-center gap-2 pt-1">
        <button
          type="button"
          class="text-[11px] px-2 py-0.5 rounded bg-white/15 text-white/90 hover:bg-white/25 transition cursor-pointer"
          @click="emit('openFocus')"
        >
          专注模式
        </button>
        <button
          type="button"
          class="text-[11px] px-2 py-0.5 rounded bg-white/15 text-white/90 hover:bg-white/25 transition cursor-pointer"
          @click="emit('openTodos')"
        >
          待办 4 项
        </button>
      </div>
    </div>

    <!-- Analog / Minimalist Clock graphic element inside widget -->
    <div
      class="relative w-36 h-36 rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-md flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-500"
    >
      <div class="absolute inset-2 rounded-full border border-dashed border-white/20"></div>
      <!-- Clock pointers -->
      <div class="absolute w-1 h-12 bg-white/90 rounded-full -top-1 origin-bottom rotate-45 shadow"></div>
      <div class="absolute w-1.5 h-8 bg-amber-300 rounded-full origin-bottom -rotate-45 shadow"></div>
      <div class="w-3 h-3 rounded-full bg-white shadow-md z-10"></div>
      <div class="absolute bottom-3 text-[10px] font-mono text-white/60">ZENITH</div>
    </div>
  </div>
</template>
