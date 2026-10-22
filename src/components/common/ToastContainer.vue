<script setup lang="ts">
import { useToast } from '@/composables/useToast'

const { toasts, dismiss } = useToast()
</script>

<template>
  <div class="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
    <TransitionGroup
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 translate-y-3 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-2 scale-95"
    >
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-lg border backdrop-blur-md transition-all"
        :class="[
          toast.type === 'success'
            ? 'bg-emerald-50/95 dark:bg-emerald-950/90 text-emerald-900 dark:text-emerald-100 border-emerald-200 dark:border-emerald-800'
            : toast.type === 'error'
              ? 'bg-rose-50/95 dark:bg-rose-950/90 text-rose-900 dark:text-rose-100 border-rose-200 dark:border-rose-800'
              : toast.type === 'warning'
                ? 'bg-amber-50/95 dark:bg-amber-950/90 text-amber-900 dark:text-amber-100 border-amber-200 dark:border-amber-800'
                : 'bg-white/95 dark:bg-slate-800/95 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700',
        ]"
      >
        <!-- Icon -->
        <div class="mt-0.5 shrink-0 text-base">
          <span v-if="toast.type === 'success'">✅</span>
          <span v-else-if="toast.type === 'error'">❌</span>
          <span v-else-if="toast.type === 'warning'">⚠️</span>
          <span v-else>ℹ️</span>
        </div>

        <!-- Content -->
        <div class="flex-1 min-w-0">
          <p class="text-sm font-semibold leading-5">
            {{ toast.title }}
          </p>
          <p v-if="toast.message" class="mt-0.5 text-xs opacity-90 leading-4">
            {{ toast.message }}
          </p>
        </div>

        <!-- Close -->
        <button
          type="button"
          class="shrink-0 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded transition cursor-pointer"
          @click="dismiss(toast.id)"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>
