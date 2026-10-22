<script setup lang="ts">
interface Props {
  visible: boolean
  text: string
}

defineProps<Props>()
</script>

<template>
  <div
    class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all duration-300 flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900/90 text-white backdrop-blur-xl border border-white/20 shadow-2xl text-xs font-medium"
    :class="[
      visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
    ]"
    id="toast"
  >
    <span class="material-symbols-outlined text-[16px] text-emerald-400">check_circle</span>
    <span id="toast-text">{{ text }}</span>
  </div>
</template>
