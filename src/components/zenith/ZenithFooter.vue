<script setup lang="ts">
const emit = defineEmits<{
  (e: 'resetLayout'): void
}>()
</script>

<template>
  <footer class="relative z-20 w-full py-4 text-xs text-white/70 select-none">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 md:pl-20 flex items-center justify-center gap-4">
      <button
        type="button"
        class="hover:text-white transition-colors underline decoration-white/30 underline-offset-2 cursor-pointer"
        @click="emit('resetLayout')"
      >
        重置布局
      </button>
      <span>•</span>
      <span class="font-medium">Zenith Tab v3.0 Pro</span>
    </div>
  </footer>
</template>
