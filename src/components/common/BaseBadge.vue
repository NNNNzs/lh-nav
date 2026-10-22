<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  color?: 'emerald' | 'blue' | 'purple' | 'amber' | 'rose' | 'slate'
  size?: 'xs' | 'sm' | 'md'
  clickable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  color: 'emerald',
  size: 'xs',
  clickable: false,
})

const colorClasses = computed(() => {
  switch (props.color) {
    case 'emerald':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/60'
    case 'blue':
      return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800/60'
    case 'purple':
      return 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800/60'
    case 'amber':
      return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/60'
    case 'rose':
      return 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800/60'
    case 'slate':
    default:
      return 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
  }
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'xs':
      return 'text-[11px] px-2 py-0.5'
    case 'md':
      return 'text-sm px-3 py-1'
    case 'sm':
    default:
      return 'text-xs px-2.5 py-0.5'
  }
})
</script>

<template>
  <span
    class="inline-flex items-center gap-1 font-medium rounded-full border transition-colors select-none"
    :class="[
      colorClasses,
      sizeClasses,
      clickable ? 'cursor-pointer hover:opacity-85 active:scale-95' : '',
    ]"
  >
    <slot />
  </span>
</template>
