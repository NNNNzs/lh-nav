<script setup lang="ts">
import { ref, watch } from 'vue'
import type { ZenithCategoryKey } from '@/types/zenith'

interface Props {
  modelValue: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'save', payload: { title: string; url: string; desc: string; category: ZenithCategoryKey }): void
}>()

const title = ref('')
const url = ref('')
const desc = ref('')
const category = ref<ZenithCategoryKey>('all')

watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      title.value = ''
      url.value = ''
      desc.value = ''
      category.value = 'all'
    }
  },
)

function handleClose() {
  emit('update:modelValue', false)
}

function handleSave() {
  if (!title.value.trim() || !url.value.trim()) {
    return
  }
  emit('save', {
    title: title.value.trim(),
    url: url.value.trim(),
    desc: desc.value.trim(),
    category: category.value,
  })
  handleClose()
}
</script>

<template>
  <div
    v-if="modelValue"
    class="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
    @click.self="handleClose"
  >
    <div
      class="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl max-w-md w-full border border-white/50 p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200"
    >
      <div class="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 class="font-bold text-slate-800 text-base flex items-center gap-2">
          <span class="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <span class="material-symbols-outlined text-[18px]">bookmark_add</span>
          </span>
          添加快捷网址卡片
        </h3>
        <button
          type="button"
          class="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
          @click="handleClose"
        >
          <span class="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      <div class="space-y-3">
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">网站名称</label>
          <input
            v-model="title"
            class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            placeholder="例如：GitHub"
            type="text"
            autofocus
            @keydown.enter="handleSave"
          />
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">网址 URL</label>
          <input
            v-model="url"
            class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            placeholder="https://"
            type="url"
            @keydown.enter="handleSave"
          />
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">描述备注 (选填)</label>
          <input
            v-model="desc"
            class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            placeholder="简短的一句话描述"
            type="text"
            @keydown.enter="handleSave"
          />
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">分类</label>
          <select
            v-model="category"
            class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          >
            <option value="all">常用推荐</option>
            <option value="work">办公效率</option>
            <option value="ai">AI 助手</option>
            <option value="media">影音娱乐</option>
            <option value="social">社交资讯</option>
          </select>
        </div>
      </div>

      <div class="flex items-center justify-end gap-2.5 pt-3">
        <button
          type="button"
          class="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          @click="handleClose"
        >
          取消
        </button>
        <button
          type="button"
          class="px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-md transition-colors cursor-pointer"
          @click="handleSave"
        >
          保存添加
        </button>
      </div>
    </div>
  </div>
</template>
