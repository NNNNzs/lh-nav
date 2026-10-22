<script setup lang="ts">
import BrandIcon from '@/components/zenith/BrandIcon.vue'
import type { ZenithCard } from '@/types/zenith'

interface Props {
  card: ZenithCard
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'clickCard', card: ZenithCard): void
  (e: 'togglePin', id: string): void
}>()

function handleClick() {
  window.open(props.card.url, '_blank')
  emit('clickCard', props.card)
}
</script>

<template>
  <div
    class="relative rounded-2xl bg-white/10 hover:bg-white/15 active:scale-[0.98] backdrop-blur-xl border border-white/15 hover:border-white/30 p-3.5 sm:p-4 flex items-center justify-between gap-3 shadow-md hover:shadow-xl transition-all duration-200 cursor-pointer group select-none overflow-hidden"
    @click="handleClick"
  >
    <!-- Left: Brand Icon + Text info -->
    <div class="flex items-center gap-3.5 min-w-0 flex-1">
      <BrandIcon
        :icon-key="card.iconKey"
        :custom-icon="card.customIcon"
        class="group-hover:scale-105 transition-transform duration-200"
      />

      <div class="min-w-0 flex-1">
        <div class="flex items-center gap-2">
          <h4 class="text-sm sm:text-base font-bold text-white truncate tracking-tight">
            {{ card.title }}
          </h4>
        </div>
        <p class="text-xs text-white/60 truncate mt-0.5 leading-relaxed">
          {{ card.description || card.url }}
        </p>
      </div>
    </div>

    <!-- Right: Pin Icon -->
    <button
      type="button"
      class="shrink-0 p-1 text-amber-400 hover:scale-110 transition cursor-pointer"
      :class="[card.isPinned ? 'opacity-90' : 'opacity-30 hover:opacity-80']"
      :title="card.isPinned ? '取消置顶' : '固定在推荐'"
      @click.stop="emit('togglePin', card.id)"
    >
      <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
        <!-- Pin icon -->
        <path d="M16 9V4l1 0c.55 0 1-.45 1-1s-.45-1-1-1H7c-.55 0-1 .45-1 1s.45 1 1 1l1 0v5c0 1.66-1.34 3-3 3v2h5.97v7l1 1 1-1v-7H19v-2c-1.66 0-3-1.34-3-3z" />
      </svg>
    </button>
  </div>
</template>
