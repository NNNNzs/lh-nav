<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

const emit = defineEmits<{
  (e: 'openFocus'): void
  (e: 'openTodos'): void
}>()

// Calculate elapsed days dynamically from 2020-05-19
const START_DATE = new Date('2020-05-19T00:00:00')
const elapsedDays = computed(() => {
  const diff = Date.now() - START_DATE.getTime()
  const days = Math.max(1, Math.floor(diff / (1000 * 60 * 60 * 24)))
  return days.toLocaleString()
})

// Clock reactive state
const hourAngle = ref(0)
const minuteAngle = ref(0)
const secondAngle = ref(0)
const currentTimeStr = ref('')
let timer: ReturnType<typeof setInterval> | null = null

function updateClock() {
  const now = new Date()
  const hours = now.getHours()
  const minutes = now.getMinutes()
  const seconds = now.getSeconds()

  // 12-hour continuous angle
  hourAngle.value = ((hours % 12) + minutes / 60 + seconds / 3600) * 30
  minuteAngle.value = (minutes + seconds / 60) * 6
  secondAngle.value = seconds * 6

  currentTimeStr.value = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

onMounted(() => {
  updateClock()
  timer = setInterval(updateClock, 1000)
})

onUnmounted(() => {
  if (timer !== null) {
    clearInterval(timer)
    timer = null
  }
})

// Clock dial 12 tick marks for SVG
const tickMarks = [
  { deg: 0, isMajor: true },
  { deg: 30, isMajor: false },
  { deg: 60, isMajor: false },
  { deg: 90, isMajor: true },
  { deg: 120, isMajor: false },
  { deg: 150, isMajor: false },
  { deg: 180, isMajor: true },
  { deg: 210, isMajor: false },
  { deg: 240, isMajor: false },
  { deg: 270, isMajor: true },
  { deg: 300, isMajor: false },
  { deg: 330, isMajor: false },
]
</script>

<template>
  <div
    class="md:col-span-2 relative overflow-hidden rounded-3xl p-6 bg-gradient-to-r from-amber-900/40 via-stone-900/50 to-emerald-950/40 backdrop-blur-2xl border border-white/25 shadow-2xl text-white flex flex-col sm:flex-row items-center justify-between gap-6 group hover:border-white/40 transition-all select-none"
  >
    <div class="space-y-3 z-10 text-left w-full sm:w-auto">
      <div
        class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-medium border border-white/20"
      >
        <span class="material-symbols-outlined text-amber-300 text-[16px]">auto_awesome</span>
        <span>与灵感与自律相伴</span>
      </div>
      <div>
        <div class="flex items-baseline gap-2">
          <span
            class="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-amber-100 to-amber-300 bg-clip-text text-transparent font-sans"
          >
            {{ elapsedDays }}
          </span>
          <span class="text-base font-medium text-white/80">天</span>
        </div>
        <p class="text-xs text-white/70 mt-1">2020年05月19日 · 启动高效数字工作台</p>
      </div>
      <div class="flex items-center gap-2 pt-1">
        <button
          type="button"
          class="text-[11px] px-2 py-0.5 rounded bg-white/15 text-white/90 hover:bg-white/25 transition cursor-pointer"
          @click="emit('openFocus')"
        >
          专注模式
        </button>
        <button
          type="button"
          class="text-[11px] px-2 py-0.5 rounded bg-white/15 text-white/90 hover:bg-white/25 transition cursor-pointer"
          @click="emit('openTodos')"
        >
          待办 4 项
        </button>
      </div>
    </div>

    <!-- Analog / Minimalist Luxury Clock graphic element inside widget -->
    <div
      class="relative w-36 h-36 rounded-full border border-white/30 bg-gradient-to-br from-white/15 via-white/5 to-black/30 backdrop-blur-xl flex items-center justify-center shrink-0 shadow-[0_8px_32px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.4)] group-hover:scale-105 transition-transform duration-500"
      :title="`当前本地时间：${currentTimeStr}`"
    >
      <!-- Outer subtle dial glow / inner ring -->
      <div class="absolute inset-1.5 rounded-full border border-white/15 pointer-events-none"></div>

      <!-- 12-Hour SVG tick marks -->
      <svg class="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 144 144">
        <line
          v-for="tick in tickMarks"
          :key="tick.deg"
          :x1="72"
          :y1="tick.isMajor ? 8 : 10"
          :x2="72"
          :y2="tick.isMajor ? 16 : 14"
          :stroke="tick.isMajor ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.4)'"
          :stroke-width="tick.isMajor ? 2 : 1.2"
          stroke-linecap="round"
          :transform="`rotate(${tick.deg} 72 72)`"
        />
      </svg>

      <!-- Brand / Logo mark inside dial -->
      <div class="absolute top-8 text-[9px] font-mono tracking-widest text-white/50 select-none">
        ZENITH
      </div>

      <!-- Hour Hand -->
      <div
        class="absolute left-1/2 top-1/2 w-[3.5px] h-[34px] bg-white rounded-full shadow-md z-10 pointer-events-none"
        :style="{
          marginLeft: '-1.75px',
          marginTop: '-34px',
          transformOrigin: '50% 100%',
          transform: `rotate(${hourAngle}deg)`,
          transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        }"
      ></div>

      <!-- Minute Hand -->
      <div
        class="absolute left-1/2 top-1/2 w-[2.2px] h-[46px] bg-white/95 rounded-full shadow-md z-10 pointer-events-none"
        :style="{
          marginLeft: '-1.1px',
          marginTop: '-46px',
          transformOrigin: '50% 100%',
          transform: `rotate(${minuteAngle}deg)`,
          transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        }"
      ></div>

      <!-- Second Hand (Amber needle with counterbalance tail) -->
      <div
        class="absolute left-1/2 top-1/2 w-[1.5px] h-[60px] bg-amber-400 rounded-full shadow-sm z-20 pointer-events-none"
        :style="{
          marginLeft: '-0.75px',
          marginTop: '-48px',
          transformOrigin: '50% 48px',
          transform: `rotate(${secondAngle}deg)`,
        }"
      ></div>

      <!-- Center Pin Cap -->
      <div
        class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 border-2 border-stone-900 shadow-md z-30 pointer-events-none flex items-center justify-center"
      >
        <div class="w-1 h-1 rounded-full bg-white/80"></div>
      </div>

      <!-- Digital time subtext at bottom -->
      <div class="absolute bottom-5 text-[9px] font-mono text-white/70 select-none tracking-wider">
        {{ currentTimeStr }}
      </div>
    </div>
  </div>
</template>
