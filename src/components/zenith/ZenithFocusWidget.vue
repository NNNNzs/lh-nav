<script setup lang="ts">
import { useZenithStorage } from '@/composables/useZenithStorage'

const emit = defineEmits<{
  (e: 'openFocus'): void
  (e: 'openTodos'): void
}>()

const { focusStats } = useZenithStorage()
</script>

<template>
  <div
    class="relative rounded-3xl bg-[#3d2f1f]/40 backdrop-blur-xl border border-amber-500/20 p-6 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 shadow-xl overflow-hidden group"
  >
    <!-- Background subtle ambient glow -->
    <div
      class="absolute -top-12 -left-12 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"
    ></div>

    <!-- Left Content -->
    <div class="space-y-3 z-10 flex-1">
      <!-- Tag Pill -->
      <div
        class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-medium text-amber-200/90 shadow-xs"
      >
        <span>✨</span>
        <span>与灵感与自律相伴</span>
      </div>

      <!-- Main Days Number -->
      <div class="flex items-baseline gap-1.5">
        <span class="text-4xl sm:text-5xl font-black tracking-tight text-white font-sans drop-shadow-sm">
          {{ focusStats.daysFormatted }}
        </span>
        <span class="text-sm font-medium text-white/80">天</span>
      </div>

      <!-- Start Date Subtitle -->
      <p class="text-xs text-white/60">
        {{ focusStats.startDateText }}
      </p>

      <!-- Pill Buttons Row -->
      <div class="flex items-center gap-2 pt-1">
        <button
          type="button"
          class="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 border border-white/10 text-xs font-medium text-white transition cursor-pointer select-none"
          @click="emit('openFocus')"
        >
          专注模式
        </button>
        <button
          type="button"
          class="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 border border-white/10 text-xs font-medium text-white transition cursor-pointer select-none"
          @click="emit('openTodos')"
        >
          待办 {{ focusStats.todosCount }} 项
        </button>
      </div>
    </div>

    <!-- Right Zenith Circular Analogue Dial -->
    <div class="relative shrink-0 w-32 h-32 flex items-center justify-center self-center sm:self-auto">
      <!-- Outer Dial Circle with Dashed Accent -->
      <div
        class="w-28 h-28 rounded-full border border-white/20 flex items-center justify-center relative shadow-inner"
      >
        <!-- Dashed indicator line -->
        <div class="absolute inset-1 rounded-full border border-dashed border-emerald-400/40 animate-spin-slow"></div>

        <!-- Clock Hands / Compass needle -->
        <div class="absolute w-12 h-0.5 bg-white origin-left transform -rotate-45 translate-x-3 rounded-full"></div>
        <div class="absolute w-2 h-2 rounded-full bg-white top-7 right-7 shadow-xs"></div>
        <div class="absolute w-3 h-3 rounded-full bg-amber-400 bottom-6 left-7 shadow-xs"></div>

        <!-- Center Point -->
        <div class="w-2 h-2 rounded-full bg-white/80"></div>

        <!-- ZENITH wordmark -->
        <span
          class="absolute bottom-2 text-[9px] font-bold tracking-widest text-white/40 uppercase font-mono"
        >
          ZENITH
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes spinSlow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.animate-spin-slow {
  animation: spinSlow 40s linear infinite;
}
</style>
