<script setup lang="ts">
import { ref } from 'vue'
import ToastContainer from '@/components/common/ToastContainer.vue'
import ZenithAddCardModal from '@/components/modals/ZenithAddCardModal.vue'
import ZenithAiChatModal from '@/components/modals/ZenithAiChatModal.vue'
import ZenithFocusModal from '@/components/modals/ZenithFocusModal.vue'
import ZenithSettingsModal from '@/components/modals/ZenithSettingsModal.vue'
import ZenithCardGrid from '@/components/zenith/ZenithCardGrid.vue'
import ZenithCategoryTabs from '@/components/zenith/ZenithCategoryTabs.vue'
import ZenithDock from '@/components/zenith/ZenithDock.vue'
import ZenithFooter from '@/components/zenith/ZenithFooter.vue'
import ZenithHeader from '@/components/zenith/ZenithHeader.vue'
import ZenithHeroClock from '@/components/zenith/ZenithHeroClock.vue'
import ZenithSearchBar from '@/components/zenith/ZenithSearchBar.vue'
import ZenithAiWidget from '@/components/zenith/ZenithAiWidget.vue'
import ZenithFocusWidget from '@/components/zenith/ZenithFocusWidget.vue'
import { useToast } from '@/composables/useToast'
import { useZenithStorage } from '@/composables/useZenithStorage'
import type { ZenithCard } from '@/types/zenith'

const {
  categories,
  activeCategoryId,
  activeCards,
  categoryCounts,
  storageSizeStr,
  addCard,
  togglePin,
  resetToDefault,
} = useZenithStorage()

const { success } = useToast()

// Modals
const isAddModalOpen = ref(false)
const isAiModalOpen = ref(false)
const isFocusModalOpen = ref(false)
const isSettingsModalOpen = ref(false)

// Background style
const bgTheme = ref<'default' | 'midnight' | 'sunset'>('default')

function handleAddCard(cardData: Omit<ZenithCard, 'id' | 'sortOrder'>) {
  addCard(cardData)
  success('添加成功', `已将 ${cardData.title} 加入导航卡片`)
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {})
  } else {
    document.exitFullscreen().catch(() => {})
  }
}

function handleThemeToggle() {
  if (bgTheme.value === 'default') {
    bgTheme.value = 'midnight'
  } else if (bgTheme.value === 'midnight') {
    bgTheme.value = 'sunset'
  } else {
    bgTheme.value = 'default'
  }
  success('背景切换', '已切换氛围渐变色')
}
</script>

<template>
  <div
    class="min-h-screen text-slate-100 flex flex-col justify-between relative overflow-x-hidden selection:bg-emerald-500/30 transition-colors duration-500 font-sans"
    :class="[
      bgTheme === 'midnight'
        ? 'bg-gradient-to-br from-[#121c2e] via-[#0d2228] to-[#071318]'
        : bgTheme === 'sunset'
          ? 'bg-gradient-to-br from-[#381f28] via-[#2a1d27] to-[#122320]'
          : 'bg-gradient-to-br from-[#403825] via-[#21372b] to-[#122e23]',
    ]"
  >
    <!-- Background Radial Glow Layers for Authenticity -->
    <div
      class="fixed inset-0 pointer-events-none z-0"
      style="background: radial-gradient(circle at 12% 18%, rgba(217, 168, 85, 0.18), transparent 45%), radial-gradient(circle at 88% 75%, rgba(16, 185, 129, 0.22), transparent 50%), radial-gradient(circle at 50% 50%, rgba(20, 60, 45, 0.35), transparent 75%);"
    ></div>

    <!-- Left Floating Dock Sidebar -->
    <ZenithDock
      @open-ai="isAiModalOpen = true"
      @toggle-theme="handleThemeToggle"
      @toggle-fullscreen="toggleFullscreen"
      @open-add-card="isAddModalOpen = true"
      @open-settings="isSettingsModalOpen = true"
    />

    <!-- Main Container -->
    <div class="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-8 lg:px-14 flex-1 flex flex-col justify-between">
      <!-- 1. Header Bar -->
      <ZenithHeader
        @open-add-card="isAddModalOpen = true"
        @toggle-theme="handleThemeToggle"
      />

      <!-- 2. Hero Clock & Greeting -->
      <ZenithHeroClock />

      <!-- 3. Central Rounded Search Pill & Hot Direct Shortcuts -->
      <ZenithSearchBar />

      <!-- 4. Category Tab Bar -->
      <ZenithCategoryTabs
        :categories="categories"
        :active-id="activeCategoryId"
        :counts="categoryCounts"
        @select-category="activeCategoryId = $event"
        @open-add-card="isAddModalOpen = true"
      />

      <!-- 5. Feature Widgets Row (Focus Tracker + AI Copilot) -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 my-3">
        <ZenithFocusWidget
          @open-focus="isFocusModalOpen = true"
          @open-todos="isFocusModalOpen = true"
        />
        <ZenithAiWidget
          @open-ai="isAiModalOpen = true"
        />
      </div>

      <!-- 6. Navigation 4x3 Cards Grid -->
      <div class="my-3">
        <ZenithCardGrid
          :cards="activeCards"
          @toggle-pin="togglePin"
          @open-add-card="isAddModalOpen = true"
        />
      </div>

      <!-- 7. Footer Status & Info Bar -->
      <ZenithFooter
        :storage-size="storageSizeStr"
        @reset-layout="resetToDefault"
      />
    </div>

    <!-- Modals -->
    <ZenithAddCardModal
      v-model="isAddModalOpen"
      :categories="categories"
      @add-card="handleAddCard"
    />

    <ZenithAiChatModal
      v-model="isAiModalOpen"
    />

    <ZenithFocusModal
      v-model="isFocusModalOpen"
    />

    <ZenithSettingsModal
      v-model="isSettingsModalOpen"
      @change-background="bgTheme = $event as any"
    />

    <!-- Toast Notifications -->
    <ToastContainer />
  </div>
</template>
