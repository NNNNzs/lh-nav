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
  <footer class="w-full flex flex-col sm:flex-row items-center justify-between gap-4 pt-12 pb-8">
    <!-- Left: Encrypted LocalStorage Capsule -->
    <div
      class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-white/80 shadow-sm"
    >
      <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
      <span>本地数据已加密存储至浏览器 localStorage · 寻外追踪</span>
    </div>

    <!-- Right: Stats & Version & Reset Layout -->
    <div class="flex items-center gap-3 text-xs text-white/50 select-none">
      <span>已使用空间 {{ storageSize }}</span>
      <span class="text-white/20">•</span>
      <button
        type="button"
        class="text-white/70 hover:text-white underline cursor-pointer transition"
        @click="emit('resetLayout')"
      >
        重置布局
      </button>
      <span class="text-white/20">•</span>
      <span class="font-mono text-white/60">Zenith Tab v3.0 Pro</span>
    </div>
  </footer>
</template>
