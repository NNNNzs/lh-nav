<script setup lang="ts">
import { computed, ref } from 'vue'
import BaseBadge from '@/components/common/BaseBadge.vue'
import { useToast } from '@/composables/useToast'
import type { NavItem } from '@/types/nav'

interface Props {
  item: NavItem
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'edit', item: NavItem): void
  (e: 'delete', id: string): void
  (e: 'toggleFavorite', id: string): void
  (e: 'filterTag', tag: string): void
}>()

const { success, error } = useToast()
const imageError = ref(false)

const isUrlIcon = computed(() => {
  if (!props.item.icon) return false
  return props.item.icon.startsWith('http://') || props.item.icon.startsWith('https://') || props.item.icon.startsWith('/')
})

function copyUrl(url: string, label: string = '链接'): void {
  navigator.clipboard.writeText(url)
    .then(() => {
      success('复制成功', `${label}已复制到剪贴板`)
    })
    .catch(() => {
      error('复制失败', '请手动选中复制')
    })
}

function handleTagClick(tag: string, event: Event): void {
  event.stopPropagation()
  event.preventDefault()
  emit('filterTag', tag)
}
</script>

<template>
  <div
    class="group relative bg-white dark:bg-slate-900/80 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-emerald-500/40 dark:hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between"
  >
    <!-- Top Action Bar (Favorite & Menu) -->
    <div class="flex items-start justify-between gap-3">
      <!-- Icon + Title -->
      <a
        :href="item.url"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center gap-3 min-w-0 flex-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors"
      >
        <div
          class="w-11 h-11 shrink-0 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-center text-xl overflow-hidden shadow-inner group-hover:scale-105 transition-transform"
        >
          <img
            v-if="isUrlIcon && !imageError"
            :src="item.icon"
            :alt="item.title"
            class="w-full h-full object-cover"
            @error="imageError = true"
          />
          <span v-else>{{ item.icon || '🔗' }}</span>
        </div>

        <div class="min-w-0 flex-1">
          <div class="flex items-center gap-2">
            <h4 class="font-bold text-slate-800 dark:text-slate-100 text-base truncate">
              {{ item.title }}
            </h4>
            <BaseBadge
              v-if="item.badge"
              :color="item.badge.color || 'emerald'"
              size="xs"
            >
              {{ item.badge.text }}
            </BaseBadge>
          </div>
          <p class="text-xs text-slate-400 dark:text-slate-500 truncate mt-0.5 font-mono">
            {{ item.url.replace(/^https?:\/\//, '') }}
          </p>
        </div>
      </a>

      <!-- Quick Actions -->
      <div class="flex items-center gap-1 shrink-0">
        <!-- Favorite Button -->
        <button
          type="button"
          class="p-1.5 rounded-lg text-slate-300 dark:text-slate-600 hover:text-amber-500 dark:hover:text-amber-400 transition cursor-pointer"
          :class="{ '!text-amber-400 dark:!text-amber-400': item.isFavorite }"
          :title="item.isFavorite ? '取消收藏' : '添加收藏'"
          @click.stop="emit('toggleFavorite', item.id)"
        >
          <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        </button>

        <!-- More Dropdown / Actions (Hidden by default, shown on hover/touch) -->
        <div class="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
          <button
            type="button"
            class="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            title="编辑"
            @click.stop="emit('edit', item)"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
          <button
            type="button"
            class="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition cursor-pointer"
            title="删除"
            @click.stop="emit('delete', item.id)"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Description -->
    <p class="mt-3 text-xs sm:text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
      {{ item.description || '暂无描述信息' }}
    </p>

    <!-- Bottom Footer: Dual URL & Tags -->
    <div class="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between gap-2 text-xs">
      <!-- Tags -->
      <div class="flex flex-wrap items-center gap-1.5 overflow-hidden">
        <span
          v-for="tag in item.tags?.slice(0, 3)"
          :key="tag"
          class="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 cursor-pointer transition select-none"
          @click="handleTagClick(tag, $event)"
        >
          #{{ tag }}
        </span>
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center gap-1.5 shrink-0">
        <!-- Internal URL badge / button if present -->
        <a
          v-if="item.internalUrl"
          :href="item.internalUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-blue-50 hover:bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:hover:bg-blue-900/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800 transition"
          title="点击访问内网镜像地址"
          @click.stop
        >
          <span>内网</span>
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>

        <!-- Copy Link button -->
        <button
          type="button"
          class="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          title="复制链接"
          @click.stop="copyUrl(item.url)"
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
