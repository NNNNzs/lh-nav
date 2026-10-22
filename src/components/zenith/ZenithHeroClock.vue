<script setup lang="ts">
import { useZenithClock } from '@/composables/useZenithClock'

const { liveTime, liveDate, liveGreeting, solarTerm } = useZenithClock()
</script>

<template>
  <section class="text-center my-4 sm:my-6 select-none">
    <h1
      class="text-6xl sm:text-7xl md:text-8xl font-light tracking-tight text-white drop-shadow-md font-sans"
      id="live-time"
    >
      {{ liveTime }}
    </h1>
    <div class="mt-2.5 flex items-center justify-center gap-2 text-white/90 text-xs sm:text-sm font-normal drop-shadow">
      <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-black/25 backdrop-blur-md border border-white/15">
        <span class="material-symbols-outlined text-[15px] text-amber-300">wb_sunny</span>
        <span id="live-greeting">{{ liveGreeting }}</span>
        <span class="text-white/40">•</span>
        <span id="live-date">{{ liveDate }}</span>
        <span class="text-white/40">•</span>
        <span class="text-amber-200/90 text-xs font-medium">{{ solarTerm }}</span>
      </span>
    </div>
  </section>
</template>
