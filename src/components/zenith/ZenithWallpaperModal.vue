<script setup lang="ts">
import { computed, ref } from 'vue'
import type { ZenithWallpaperItem } from '@/types/zenith'

interface Props {
  modelValue: boolean
  currentUrl: string
  wallpapers: ZenithWallpaperItem[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'selectWallpaper', url: string): void
  (e: 'resetDefault'): void
}>()

const activeCategory = ref<'all' | 'nature' | 'universe' | 'urban' | 'abstract'>('all')
const customUrlInput = ref('')

const filteredWallpapers = computed(() => {
  if (activeCategory.value === 'all') {
    return props.wallpapers
  }
  return props.wallpapers.filter(w => w.category === activeCategory.value)
})

function handleClose() {
  emit('update:modelValue', false)
}

function handleSelect(url: string) {
  emit('selectWallpaper', url)
}

function handleApplyCustom() {
  const url = customUrlInput.value.trim()
  if (!url) return
  if (!/^https?:\/\//i.test(url)) {
    alert('请输入以 https:// 开头的高清壁纸外链地址')
    return
  }
  emit('selectWallpaper', url)
  customUrlInput.value = ''
}

function handleResetDefault() {
  emit('resetDefault')
}
</script>

<template>
  <div
    v-if="modelValue"
    class="fixed inset-0 z-50 bg-black/65 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
    @click.self="handleClose"
  >
    <div
      class="bg-slate-900/95 text-white backdrop-blur-2xl rounded-3xl shadow-2xl max-w-2xl w-full border border-white/20 p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200 my-8"
    >
      <!-- Header -->
      <div class="flex items-center justify-between border-b border-white/10 pb-3">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-400 to-indigo-500 flex items-center justify-center text-white shadow-md">
            <span class="material-symbols-outlined text-[19px]">wallpaper</span>
          </div>
          <div>
            <h3 class="font-bold text-base text-white">壁纸与背景氛围</h3>
            <p class="text-[11px] text-white/50">精选多款高清视觉壁纸，支持自定义网络外链</p>
          </div>
        </div>
        <button
          type="button"
          class="text-white/50 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          @click="handleClose"
        >
          <span class="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      <!-- Category Filter Tabs -->
      <div class="flex items-center gap-1.5 p-1 rounded-xl bg-white/10 text-xs select-none">
        <button
          type="button"
          class="px-3 py-1.5 rounded-lg transition cursor-pointer"
          :class="[activeCategory === 'all' ? 'bg-white/20 text-white font-semibold shadow-xs' : 'text-white/60 hover:text-white']"
          @click="activeCategory = 'all'"
        >
          全部 ({{ wallpapers.length }})
        </button>
        <button
          type="button"
          class="px-3 py-1.5 rounded-lg transition cursor-pointer"
          :class="[activeCategory === 'nature' ? 'bg-white/20 text-white font-semibold shadow-xs' : 'text-white/60 hover:text-white']"
          @click="activeCategory = 'nature'"
        >
          自然风光
        </button>
        <button
          type="button"
          class="px-3 py-1.5 rounded-lg transition cursor-pointer"
          :class="[activeCategory === 'universe' ? 'bg-white/20 text-white font-semibold shadow-xs' : 'text-white/60 hover:text-white']"
          @click="activeCategory = 'universe'"
        >
          星空极光
        </button>
        <button
          type="button"
          class="px-3 py-1.5 rounded-lg transition cursor-pointer"
          :class="[activeCategory === 'urban' || activeCategory === 'abstract' ? 'bg-white/20 text-white font-semibold shadow-xs' : 'text-white/60 hover:text-white']"
          @click="activeCategory = 'urban'"
        >
          都市与暗调
        </button>
      </div>

      <!-- Wallpapers Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[360px] overflow-y-auto pr-1 custom-wp-scrollbar">
        <div
          v-for="wp in filteredWallpapers"
          :key="wp.id"
          class="group relative aspect-video rounded-2xl overflow-hidden border-2 cursor-pointer transition-all hover:scale-[1.02] shadow-md bg-black/40"
          :class="[
            currentUrl === wp.url
              ? 'border-indigo-400 ring-2 ring-indigo-400/40'
              : 'border-white/15 hover:border-white/40'
          ]"
          @click="handleSelect(wp.url)"
        >
          <!-- Background image thumbnail -->
          <img
            :src="wp.url"
            :alt="wp.name"
            class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />

          <!-- Overlay gradient for title -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5">
            <span class="text-xs font-semibold text-white drop-shadow">
              {{ wp.name }}
            </span>
          </div>

          <!-- Active check badge -->
          <div
            v-if="currentUrl === wp.url"
            class="absolute top-2 right-2 w-6 h-6 rounded-full bg-indigo-500 text-white flex items-center justify-center shadow-lg"
          >
            <span class="material-symbols-outlined text-[15px]">check</span>
          </div>
        </div>
      </div>

      <!-- Custom HTTPS Wallpaper Input -->
      <div class="p-3 rounded-2xl bg-white/10 border border-white/10 space-y-2">
        <label class="block text-xs font-semibold text-white/90">
          自定义网络壁纸外链 (HTTPS)
        </label>
        <div class="flex items-center gap-2">
          <input
            v-model="customUrlInput"
            type="url"
            placeholder="粘贴任意高清图片绝对路径 https://..."
            class="flex-1 px-3 py-1.5 bg-black/30 border border-white/20 rounded-xl text-xs text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-400/30 focus:border-indigo-400 transition"
            @keydown.enter="handleApplyCustom"
          />
          <button
            type="button"
            class="px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition cursor-pointer shrink-0 shadow-sm"
            @click="handleApplyCustom"
          >
            应用壁纸
          </button>
        </div>
      </div>

      <!-- Footer Actions -->
      <div class="flex items-center justify-between pt-2 border-t border-white/10">
        <button
          type="button"
          class="text-xs text-white/60 hover:text-white underline underline-offset-4 decoration-white/30 transition cursor-pointer"
          @click="handleResetDefault"
        >
          恢复默认暮光壁纸
        </button>

        <button
          type="button"
          class="px-5 py-2 text-xs font-semibold text-slate-900 bg-white hover:bg-slate-100 rounded-xl shadow-md transition cursor-pointer"
          @click="handleClose"
        >
          完成
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-wp-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-wp-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 9999px;
}
.custom-wp-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.4);
}
</style>
