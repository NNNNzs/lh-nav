<script setup lang="ts">
import { useZenithTime } from '@/composables/useZenithTime'

const { timeStr, dateStr, solarTerm, greeting } = useZenithTime()
</script>

<template>
  <div class="flex flex-col items-center justify-center pt-8 pb-6 text-center select-none">
    <!-- Big Digital Time Display -->
    <h1
      class="text-7xl sm:text-8xl md:text-9xl font-bold tracking-tight text-white drop-shadow-md font-sans"
    >
      {{ timeStr }}
    </h1>

    <!-- Date & Greeting Capsule -->
    <div
      class="mt-4 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white/90 text-xs sm:text-sm shadow-sm"
    >
      <span class="text-amber-300">{{ greeting.icon }}</span>
      <span>{{ greeting.text }}</span>
      <span class="text-white/30">•</span>
      <span>{{ dateStr }}</span>
      <span
        class="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-white/15 text-white/80"
      >
        {{ solarTerm }}
      </span>
    </div>
  </div>
</template>
