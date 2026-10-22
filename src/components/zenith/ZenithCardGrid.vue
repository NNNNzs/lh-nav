<script setup lang="ts">
import ZenithAddCardSlot from '@/components/zenith/ZenithAddCardSlot.vue'
import ZenithNavCard from '@/components/zenith/ZenithNavCard.vue'
import type { ZenithBookmark } from '@/types/zenith'

interface Props {
  cards: ZenithBookmark[]
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'togglePin', id: string): void
  (e: 'openAddModal'): void
}>()
</script>

<template>
  <section class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5" id="cards-grid">
    <ZenithNavCard
      v-for="card in cards"
      :key="card.id"
      :card="card"
      @toggle-pin="emit('togglePin', $event)"
    />
    <ZenithAddCardSlot
      @click="emit('openAddModal')"
    />
  </section>
</template>
