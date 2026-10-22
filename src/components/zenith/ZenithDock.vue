<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'navigate', tab: string): void
  (e: 'openAi'): void
  (e: 'toggleTheme'): void
  (e: 'toggleFullscreen'): void
  (e: 'openAddCard'): void
  (e: 'openSettings'): void
}>()

const activeTab = ref('home')

function handleTab(tab: string) {
  activeTab.value = tab
  emit('navigate', tab)
}
</script>

<template>
  <aside
    class="fixed left-5 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center py-4 px-2 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl space-y-3"
  >
    <!-- User Avatar with status dot -->
    <button
      type="button"
      class="relative group p-1 transition cursor-pointer"
      title="个人中心"
      @click="emit('openSettings')"
    >
      <div
        class="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-orange-400 p-0.5 flex items-center justify-center shadow-md shadow-orange-500/20"
      >
        <div class="w-full h-full rounded-full bg-[#1e2022] flex items-center justify-center text-xs text-amber-200">
          <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>
      </div>
      <span class="absolute bottom-0.5 right-0.5 w-2 h-2 rounded-full bg-orange-400 border border-black ring-1 ring-orange-500/50"></span>
    </button>

    <!-- Divider -->
    <div class="w-5 h-px bg-white/10 my-1"></div>

    <!-- Home Tab -->
    <button
      type="button"
      class="p-2.5 rounded-xl transition cursor-pointer"
      :class="[
        activeTab === 'home'
          ? 'bg-white/15 text-white shadow-inner'
          : 'text-white/50 hover:text-white hover:bg-white/10',
      ]"
      title="主页"
      @click="handleTab('home')"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    </button>

    <!-- AI Copilot Tab -->
    <button
      type="button"
      class="p-2.5 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition cursor-pointer"
      title="Zenith 智能助手"
      @click="emit('openAi')"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    </button>

    <!-- Theme Switcher Tab -->
    <button
      type="button"
      class="p-2.5 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition cursor-pointer"
      title="个性化主题"
      @click="emit('toggleTheme')"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4 5 5 0 014-4c.55 0 1 .45 1 1 0 .55.45 1 1 1s1-.45 1-1c0-.55.45-1 1-1s1 .45 1 1c0 2.5-2 4-4 4zm10-14a4 4 0 100-8 4 4 0 000 8zm0 0v8a4 4 0 01-4 4h-2" />
      </svg>
    </button>

    <!-- Fullscreen Toggle -->
    <button
      type="button"
      class="p-2.5 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition cursor-pointer"
      title="全屏模式"
      @click="emit('toggleFullscreen')"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0 0l-5-5m-6 16H4m0 0v-4m0 4l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
      </svg>
    </button>

    <!-- Divider -->
    <div class="w-5 h-px bg-white/10 my-1"></div>

    <!-- Add Card Button -->
    <button
      type="button"
      class="p-2.5 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition cursor-pointer"
      title="添加网址卡片"
      @click="emit('openAddCard')"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" stroke-width="2" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v8m-4-4h8" />
      </svg>
    </button>

    <!-- Settings Button -->
    <button
      type="button"
      class="p-2.5 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition cursor-pointer"
      title="控制中心与设置"
      @click="emit('openSettings')"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <circle cx="12" cy="12" r="3" stroke-width="2" />
      </svg>
    </button>
  </aside>
</template>
