<script setup lang="ts">
const emit = defineEmits<{
  (e: 'openAddModal'): void
  (e: 'openWallpaperModal'): void
}>()
</script>

<template>
  <header class="relative z-30 w-full px-4 sm:px-8 pt-4 pb-2">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <!-- Left: Zenith Brand & Sync Pill -->
      <div class="flex items-center gap-3">
        <div class="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-xl border border-white/30 shadow-glass transition-all select-none">
          <div class="w-6 h-6 rounded-lg bg-gradient-to-tr from-indigo-500 to-sky-400 flex items-center justify-center text-white shadow-sm">
            <span class="material-symbols-outlined text-[15px]">grid_view</span>
          </div>
          <span class="text-sm font-semibold text-white tracking-tight drop-shadow-sm">
            极简标签 <span class="text-[10px] font-normal px-1.5 py-0.5 bg-white/20 text-white/90 rounded-md ml-0.5">Zenith</span>
          </span>
        </div>
        <div class="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/25 backdrop-blur-xl border border-white/15 text-white/80 text-xs select-none">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>极简工作台 · 专注高效</span>
        </div>
      </div>

      <!-- Right: Action Pills -->
      <div class="flex items-center gap-2.5">
        <!-- Weather pill widget -->
        <div class="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-xl border border-white/25 text-white shadow-glass text-xs select-none">
          <span class="material-symbols-outlined text-amber-300 text-[18px]">partly_cloudy_day</span>
          <span class="font-medium">21°C</span>
          <span class="text-white/60">晴间多云</span>
        </div>

        <!-- Add Card button -->
        <button
          type="button"
          class="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-xl border border-white/30 text-white text-xs font-medium shadow-glass transition-all active:scale-95 cursor-pointer select-none"
          @click="emit('openAddModal')"
        >
          <span class="material-symbols-outlined text-[16px]">add</span>
          <span>添加卡片</span>
        </button>

        <!-- Wallpaper visual modal button -->
        <button
          type="button"
          class="p-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-xl border border-white/30 text-white transition-all shadow-glass cursor-pointer"
          title="壁纸设置"
          @click="emit('openWallpaperModal')"
        >
          <span class="material-symbols-outlined text-[18px]">wallpaper</span>
        </button>
      </div>
    </div>
  </header>
</template>
