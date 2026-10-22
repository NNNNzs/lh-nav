<script setup lang="ts">
interface Props {
  storageSize: string
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'resetLayout'): void
}>()
</script>

<template>
  <footer class="relative z-20 w-full py-4 text-xs text-white/80 select-none">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 md:pl-20 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
      <div class="flex items-center gap-2 px-3 py-1 rounded-full bg-black/25 backdrop-blur-md border border-white/10 shadow-sm">
        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>本地数据已加密存储至浏览器 localStorage · 零外部追踪</span>
      </div>
      <div class="flex items-center gap-4 text-white/70">
        <span class="hidden sm:inline">已使用空间 {{ storageSize }}</span>
        <span class="hidden sm:inline">•</span>
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
    </div>
  </footer>
</template>
