<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import BaseBadge from '@/components/common/BaseBadge.vue'
import type { NavCategory, NavItem } from '@/types/nav'

interface Props {
  modelValue: boolean
  items: NavItem[]
  categories: NavCategory[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void
}>()

const query = ref('')
const selectedIndex = ref(0)
const inputRef = ref<HTMLInputElement | null>(null)

const categoryMap = computed(() => {
  const map: Record<string, string> = {}
  for (const c of props.categories) {
    map[c.id] = c.name
  }
  return map
})

const results = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) {
    return props.items.slice(0, 8)
  }
  return props.items.filter((item) => {
    const titleMatch = item.title.toLowerCase().includes(q)
    const descMatch = item.description.toLowerCase().includes(q)
    const urlMatch = item.url.toLowerCase().includes(q) || (item.internalUrl?.toLowerCase().includes(q) ?? false)
    const tagMatch = item.tags?.some(t => t.toLowerCase().includes(q)) ?? false
    return titleMatch || descMatch || urlMatch || tagMatch
  }).slice(0, 10)
})

watch(results, () => {
  selectedIndex.value = 0
})

watch(
  () => props.modelValue,
  (open) => {
    if (open) {
      query.value = ''
      selectedIndex.value = 0
      nextTick(() => {
        inputRef.value?.focus()
      })
    }
  },
)

function close(): void {
  emit('update:modelValue', false)
}

function handleKeyNavigation(e: KeyboardEvent): void {
  if (!props.modelValue) return

  if (e.key === 'ArrowDown') {
    e.preventDefault()
    if (selectedIndex.value < results.value.length - 1) {
      selectedIndex.value++
    } else {
      selectedIndex.value = 0
    }
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    if (selectedIndex.value > 0) {
      selectedIndex.value--
    } else {
      selectedIndex.value = Math.max(0, results.value.length - 1)
    }
  } else if (e.key === 'Enter') {
    e.preventDefault()
    const selected = results.value[selectedIndex.value]
    if (selected) {
      window.open(selected.url, '_blank')
      close()
    }
  }
}

function handleGlobalKeydown(e: KeyboardEvent): void {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    emit('update:modelValue', !props.modelValue)
  }
  if (e.key === '/' && !props.modelValue && (e.target as HTMLElement).tagName !== 'INPUT' && (e.target as HTMLElement).tagName !== 'TEXTAREA') {
    e.preventDefault()
    emit('update:modelValue', true)
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleGlobalKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleGlobalKeydown)
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 p-4"
        @click.self="close"
      >
        <div
          class="w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transform transition-all"
          @keydown="handleKeyNavigation"
        >
          <!-- Search Header Input -->
          <div class="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
            <svg class="w-5 h-5 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref="inputRef"
              v-model="query"
              type="text"
              placeholder="搜索全站导航或直达链接... (↑↓ 选择，Enter 打开，ESC 退出)"
              class="w-full bg-transparent text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
            />
            <button
              type="button"
              class="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded font-mono"
              @click="close"
            >
              ESC
            </button>
          </div>

          <!-- Results List -->
          <div class="max-h-96 overflow-y-auto p-2 divide-y divide-slate-100 dark:divide-slate-800/40">
            <template v-if="results.length > 0">
              <a
                v-for="(item, idx) in results"
                :key="item.id"
                :href="item.url"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer group"
                :class="[
                  idx === selectedIndex
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-200',
                ]"
                @mouseenter="selectedIndex = idx"
                @click="close"
              >
                <div class="flex items-center gap-3 min-w-0 flex-1">
                  <div class="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-lg shrink-0">
                    {{ item.icon || '🔗' }}
                  </div>
                  <div class="min-w-0 flex-1">
                    <div class="flex items-center gap-2">
                      <span class="font-semibold text-sm truncate">{{ item.title }}</span>
                      <BaseBadge v-if="item.badge" size="xs" :color="item.badge.color || 'emerald'">
                        {{ item.badge.text }}
                      </BaseBadge>
                    </div>
                    <p class="text-xs text-slate-400 truncate mt-0.5">
                      {{ item.description || item.url }}
                    </p>
                  </div>
                </div>

                <div class="flex items-center gap-2 shrink-0 ml-3">
                  <span
                    v-if="item.categoryId && categoryMap[item.categoryId]"
                    class="text-[11px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 font-medium"
                  >
                    {{ categoryMap[item.categoryId] }}
                  </span>
                  <svg
                    class="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </a>
            </template>

            <!-- No results -->
            <div v-else class="py-12 text-center text-slate-400 text-sm">
              未找到与 "<span class="font-semibold text-slate-600 dark:text-slate-300">{{ query }}</span>" 相关的导航项
            </div>
          </div>

          <!-- Footer Tips -->
          <div class="px-4 py-2.5 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <span><kbd class="px-1.5 py-0.5 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 font-mono">↑↓</kbd> 切换选项</span>
              <span><kbd class="px-1.5 py-0.5 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 font-mono">↵</kbd> 直接访问</span>
            </div>
            <span>快捷聚合检索</span>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
