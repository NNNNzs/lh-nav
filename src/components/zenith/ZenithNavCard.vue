<script setup lang="ts">
import type { ZenithBookmark } from '@/types/zenith'

interface Props {
  card: ZenithBookmark
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'togglePin', id: string): void
}>()
</script>

<template>
  <a
    :href="card.url"
    target="_blank"
    rel="noopener noreferrer"
    class="nav-item group flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/80 hover:bg-white/95 backdrop-blur-xl border border-white/70 shadow-glass-subtle hover:shadow-[0_12px_28px_rgba(0,0,0,0.14)] hover:-translate-y-1 transition-all duration-200"
    :data-cat="card.category"
  >
    <!-- Card Icon Box (Android Squircle App Icon) -->
    <div
      class="w-12 h-12 rounded-2xl overflow-hidden shrink-0 shadow-icon group-hover:scale-105 transition-transform bg-white/30 flex items-center justify-center border border-black/5"
      :class="[card.iconBg || '']"
    >
      <!-- Real Android/iOS App Icon Image -->
      <img
        v-if="card.iconKind === 'img'"
        :src="card.iconValue"
        :alt="card.title"
        class="w-full h-full object-cover rounded-2xl"
        loading="lazy"
      />

      <!-- SVG Icon -->
      <svg
        v-else-if="card.iconKind === 'svg'"
        class="w-6 h-6 fill-white"
        viewBox="0 0 24 24"
      >
        <path :d="card.iconValue" />
      </svg>

      <!-- Material Symbols Icon -->
      <span
        v-else-if="card.iconKind === 'material'"
        class="material-symbols-outlined text-[24px]"
      >
        {{ card.iconValue }}
      </span>

      <!-- Text / Initial Character Icon -->
      <span v-else class="text-white font-bold text-lg">
        {{ card.iconValue }}
      </span>
    </div>

    <!-- Title and Subtitle Info -->
    <div class="flex-1 min-w-0">
      <div class="flex items-center justify-between">
        <h4 class="text-sm font-bold text-slate-800 truncate group-hover:text-indigo-600 transition-colors">
          {{ card.title }}
        </h4>
        <button
          type="button"
          class="p-0.5 rounded transition-colors cursor-pointer"
          :title="card.isPinned ? '取消置顶' : '置顶卡片'"
          @click.prevent.stop="emit('togglePin', card.id)"
        >
          <span
            class="material-symbols-outlined text-[15px] transition-colors"
            :class="card.isPinned ? 'text-amber-500 icon-fill' : 'text-slate-400 group-hover:text-amber-500'"
          >
            push_pin
          </span>
        </button>
      </div>
      <p class="text-[11px] text-slate-500 truncate mt-0.5">
        {{ card.desc }}
      </p>
    </div>
  </a>
</template>
