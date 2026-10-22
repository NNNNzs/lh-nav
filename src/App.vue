<script setup lang="ts">
import { ref } from 'vue'

interface TechBadge {
  name: string
  version: string
  color: string
}

const count = ref<number>(0)

const techStack: TechBadge[] = [
  { name: 'Vue', version: '3.5', color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' },
  { name: 'TypeScript', version: '6.0', color: 'bg-blue-500/10 text-blue-600 border-blue-500/20' },
  { name: 'Vite', version: '8.3', color: 'bg-purple-500/10 text-purple-600 border-purple-500/20' },
  { name: 'Tailwind CSS', version: '4.3', color: 'bg-cyan-500/10 text-cyan-600 border-cyan-500/20' },
]

function increment(): void {
  count.value++
}

function reset(): void {
  count.value = 0
}
</script>

<template>
  <main class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-800 flex flex-col items-center justify-center p-6">
    <div class="max-w-2xl w-full bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200/60 p-8 sm:p-10 transition-all">
      <!-- Title Header -->
      <div class="text-center space-y-3">
        <div class="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-wide uppercase rounded-full bg-emerald-100 text-emerald-700">
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          项目初始化成功
        </div>
        <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
          lh-nav
        </h1>
        <p class="text-slate-500 text-sm sm:text-base">
          基于 Vue 3 + TypeScript + Vite + Tailwind CSS 的轻量现代化项目模板
        </p>
      </div>

      <!-- Tech Stack Badges -->
      <div class="mt-8 flex flex-wrap justify-center gap-2.5">
        <div
          v-for="item in techStack"
          :key="item.name"
          class="flex items-center gap-2 px-3.5 py-1.5 rounded-lg border text-sm font-medium"
          :class="item.color"
        >
          <span>{{ item.name }}</span>
          <span class="text-xs px-1.5 py-0.5 rounded bg-white/60 font-mono">{{ item.version }}</span>
        </div>
      </div>

      <!-- Interactive Counter Demo -->
      <div class="mt-8 p-6 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center gap-4">
        <p class="text-sm font-medium text-slate-600">
          响应式计数器演示 (TypeScript 类型检查 + 响应式状态)
        </p>
        <div class="flex items-center gap-3">
          <button
            type="button"
            class="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg shadow-sm hover:shadow transition-all active:scale-95 cursor-pointer"
            @click="increment"
          >
            点击增加: <span class="font-mono font-bold ml-1">{{ count }}</span>
          </button>
          <button
            v-if="count > 0"
            type="button"
            class="px-3.5 py-2.5 text-slate-500 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg text-sm font-medium transition cursor-pointer"
            @click="reset"
          >
            重置
          </button>
        </div>
      </div>

      <!-- Quick Tips -->
      <div class="mt-8 pt-6 border-t border-slate-100 text-xs text-slate-500 space-y-1.5">
        <div class="flex items-center gap-2">
          <span class="text-emerald-500 font-bold">✓</span>
          <span>已配置路径别名：<code class="px-1.5 py-0.5 bg-slate-100 rounded text-slate-700 font-mono">@/*</code> 指向 <code class="px-1.5 py-0.5 bg-slate-100 rounded text-slate-700 font-mono">./src/*</code></span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-emerald-500 font-bold">✓</span>
          <span>已集成 Tailwind CSS v4，直接在 template 中书写样式即可生效</span>
        </div>
      </div>
    </div>
  </main>
</template>
