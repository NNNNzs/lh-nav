<script setup lang="ts">
import ZenithAddCardSlot from '@/components/zenith/ZenithAddCardSlot.vue'
import ZenithNavCard from '@/components/zenith/ZenithNavCard.vue'
import type { ZenithCard } from '@/types/zenith'

interface Props {
  cards: ZenithCard[]
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'clickCard', card: ZenithCard): void
  (e: 'togglePin', id: string): void
  (e: 'openAddCard'): void
}>()
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
    <!-- List of cards -->
    <ZenithNavCard
      v-for="card in cards"
      :key="card.id"
      :card="card"
      @click-card="emit('clickCard', $event)"
      @toggle-pin="emit('togglePin', $event)"
    />

    <!-- 12th card: Add Card Slot -->
    <ZenithAddCardSlot @click="emit('openAddCard')" />
  </div>
</template>
