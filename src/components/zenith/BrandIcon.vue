<script setup lang="ts">
import type { BrandIconKey } from '@/types/zenith'

interface Props {
  iconKey: BrandIconKey
  customIcon?: string
}

defineProps<Props>()
</script>

<template>
  <!-- GitHub: Black background with white Octocat -->
  <div
    v-if="iconKey === 'github'"
    class="w-12 h-12 rounded-xl bg-[#18181b] flex items-center justify-center text-white shadow-sm shrink-0"
  >
    <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  </div>

  <!-- Figma: Purple gradient background with Figma logo -->
  <div
    v-else-if="iconKey === 'figma'"
    class="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#6366f1] via-[#8b5cf6] to-[#a855f7] flex items-center justify-center text-white shadow-sm shrink-0"
  >
    <svg class="w-6 h-6 fill-current" viewBox="0 0 38 57">
      <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" />
      <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" />
      <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" />
      <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" />
      <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" />
    </svg>
  </div>

  <!-- ChatGPT: Emerald background with swirl logo -->
  <div
    v-else-if="iconKey === 'chatgpt'"
    class="w-12 h-12 rounded-xl bg-[#10a37f] flex items-center justify-center text-white shadow-sm shrink-0"
  >
    <svg class="w-6 h-6 fill-none stroke-current stroke-[2]" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" />
      <path stroke-linecap="round" d="M12 7v5l3 3" />
      <circle cx="12" cy="12" r="3" stroke-dasharray="2 2" />
    </svg>
  </div>

  <!-- Notion: Charcoal background with white N -->
  <div
    v-else-if="iconKey === 'notion'"
    class="w-12 h-12 rounded-xl bg-[#2f3437] flex items-center justify-center text-white shadow-sm shrink-0 font-serif font-black text-2xl"
  >
    N
  </div>

  <!-- Vercel: Black background with white triangle -->
  <div
    v-else-if="iconKey === 'vercel'"
    class="w-12 h-12 rounded-xl bg-[#000000] flex items-center justify-center text-white shadow-sm shrink-0"
  >
    <svg class="w-5 h-5 fill-current" viewBox="0 0 115 100">
      <path d="M57.5 0L115 100H0L57.5 0Z" />
    </svg>
  </div>

  <!-- 稀土掘金: Royal Blue background with folded logo -->
  <div
    v-else-if="iconKey === 'juejin'"
    class="w-12 h-12 rounded-xl bg-[#1e80ff] flex items-center justify-center text-white shadow-sm shrink-0"
  >
    <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
      <path d="M12 2l-3.5 3.5L12 9l3.5-3.5L12 2zm0 6.5L6 14.5l2 2L12 12.5l4 4 2-2L12 8.5zm0 6l-9 9 2 2 7-7 7 7 2-2-9-9z" />
    </svg>
  </div>

  <!-- Dribbble: Vibrant Pink with basketball logo -->
  <div
    v-else-if="iconKey === 'dribbble'"
    class="w-12 h-12 rounded-xl bg-[#ea4c89] flex items-center justify-center text-white shadow-sm shrink-0"
  >
    <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm7.93 9.07c-2.42-.4-4.81-.34-7.07.13-.19-.44-.39-.88-.6-1.32 2.76-1.38 4.96-3.37 6.4-5.83 1.15 1.83 1.76 4.12 1.27 7.02zM12 3.96c2.4 0 4.59.9 6.27 2.39-1.32 2.27-3.32 4.09-5.87 5.37-1.14-2.18-2.44-4.13-3.86-5.81 1.09-.43 2.27-.67 3.46-.67zm-5.74 3.1c1.39 1.63 2.66 3.53 3.77 5.65-3.07 1-6.4 1.12-9.61.27.75-2.52 2.68-4.59 5.84-5.92zm-2.22 8.01c3.09.78 6.27.64 9.24-.31.33.68.64 1.38.92 2.08-3.9 1.6-6.72 4.47-8.15 8.16-1.63-2.61-2.13-6.66-2.01-9.93zm9.95 7.15c1.33-3.41 3.93-6.07 7.57-7.58.48 2.7-.09 5.49-1.57 7.74-1.74 1.55-4.04 2.45-6.56 2.45-.63 0-1.24-.06-1.84-.19.78-.73 1.59-1.55 2.4-2.42z" />
    </svg>
  </div>

  <!-- 少数派 sspai: Red background with white π -->
  <div
    v-else-if="iconKey === 'sspai'"
    class="w-12 h-12 rounded-xl bg-[#d71a1b] flex items-center justify-center text-white shadow-sm shrink-0 font-serif font-black text-2xl"
  >
    π
  </div>

  <!-- 哔哩哔哩: Pink background with white TV mascot -->
  <div
    v-else-if="iconKey === 'bilibili'"
    class="w-12 h-12 rounded-xl bg-[#fb7299] flex items-center justify-center text-white shadow-sm shrink-0"
  >
    <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
      <path d="M17.813 4.653h.854c1.51 0 2.733 1.224 2.733 2.734v9.645c0 1.51-1.224 2.734-2.733 2.734H5.333c-1.51 0-2.733-1.224-2.733-2.734V7.387c0-1.51 1.224-2.734 2.733-2.734h.875L4.858 3.303a.625.625 0 01.884-.884l2.122 2.122.112.112h8.048l.112-.112 2.122-2.122a.625.625 0 01.884.884l-1.329 1.35zm-9.313 5.43c0-.69-.56-1.25-1.25-1.25s-1.25.56-1.25 1.25v2.5c0 .69.56 1.25 1.25 1.25s1.25-.56 1.25-1.25v-2.5zm8 0c0-.69-.56-1.25-1.25-1.25s-1.25.56-1.25 1.25v2.5c0 .69.56 1.25 1.25 1.25s1.25-.56 1.25-1.25v-2.5z" />
    </svg>
  </div>

  <!-- 知乎: Bright Blue background with "知" -->
  <div
    v-else-if="iconKey === 'zhihu'"
    class="w-12 h-12 rounded-xl bg-[#0084ff] flex items-center justify-center text-white shadow-sm shrink-0 font-bold text-xl"
  >
    知
  </div>

  <!-- V2EX: Dark charcoal with white "V2" -->
  <div
    v-else-if="iconKey === 'v2ex'"
    class="w-12 h-12 rounded-xl bg-[#333344] flex items-center justify-center text-white shadow-sm shrink-0 font-mono font-black text-lg tracking-tighter"
  >
    V2
  </div>

  <!-- Custom icon or fallback -->
  <div
    v-else
    class="w-12 h-12 rounded-xl bg-slate-700/80 flex items-center justify-center text-white text-xl shadow-sm shrink-0"
  >
    <span>{{ customIcon || '🔗' }}</span>
  </div>
</template>
