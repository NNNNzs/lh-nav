<script setup lang="ts">
import { reactive, watch } from 'vue'
import BaseModal from '@/components/common/BaseModal.vue'
import type { BrandIconKey, ZenithCard, ZenithCategory } from '@/types/zenith'

interface Props {
  modelValue: boolean
  categories: ZenithCategory[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void
  (e: 'addCard', card: Omit<ZenithCard, 'id' | 'sortOrder'>): void
}>()

const form = reactive({
  title: '',
  url: '',
  description: '',
  iconKey: 'custom' as BrandIconKey,
  customIcon: '🔗',
  categoryId: 'featured',
})

const availableIcons: { key: BrandIconKey; label: string; icon: string }[] = [
  { key: 'github', label: 'GitHub', icon: '🐙' },
  { key: 'figma', label: 'Figma', icon: '🎨' },
  { key: 'chatgpt', label: 'ChatGPT', icon: '🤖' },
  { key: 'notion', label: 'Notion', icon: '📝' },
  { key: 'vercel', label: 'Vercel', icon: '▲' },
  { key: 'juejin', label: '稀土掘金', icon: '💎' },
  { key: 'dribbble', label: 'Dribbble', icon: '🏀' },
  { key: 'sspai', label: '少数派', icon: 'π' },
  { key: 'bilibili', label: 'Bilibili', icon: '📺' },
  { key: 'zhihu', label: '知乎', icon: '知' },
  { key: 'v2ex', label: 'V2EX', icon: 'V2' },
  { key: 'custom', label: '自定义', icon: '🔗' },
]

watch(
  () => props.modelValue,
  (open) => {
    if (open) {
      form.title = ''
      form.url = ''
      form.description = ''
      form.iconKey = 'custom'
      form.customIcon = '🔗'
      form.categoryId = 'featured'
    }
  },
)

function submit() {
  if (!form.title.trim() || !form.url.trim()) return

  let url = form.url.trim()
  if (!/^https?:\/\//i.test(url)) {
    url = `https://${url}`
  }

  emit('addCard', {
    title: form.title.trim(),
    url,
    description: form.description.trim(),
    iconKey: form.iconKey,
    customIcon: form.iconKey === 'custom' ? form.customIcon : undefined,
    categoryId: form.categoryId,
    isPinned: true,
  })

  emit('update:modelValue', false)
}
</script>

<template>
  <BaseModal
    :model-value="modelValue"
    title="添加网址卡片"
    max-width="md"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <form class="space-y-4" @submit.prevent="submit">
      <!-- Title -->
      <div>
        <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
          站点名称 <span class="text-rose-500">*</span>
        </label>
        <input
          v-model="form.title"
          type="text"
          required
          placeholder="例如: Google Cloud"
          class="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
        />
      </div>

      <!-- URL -->
      <div>
        <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
          网址链接 <span class="text-rose-500">*</span>
        </label>
        <input
          v-model="form.url"
          type="text"
          required
          placeholder="https://cloud.google.com"
          class="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
        />
      </div>

      <!-- Description -->
      <div>
        <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
          简介描述
        </label>
        <input
          v-model="form.description"
          type="text"
          placeholder="一句话介绍该站点的核心功能..."
          class="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
        />
      </div>

      <!-- Brand Logo / Icon Selection -->
      <div>
        <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          图标样式
        </label>
        <div class="grid grid-cols-4 sm:grid-cols-6 gap-2">
          <button
            v-for="item in availableIcons"
            :key="item.key"
            type="button"
            class="p-2 rounded-xl border text-center transition cursor-pointer flex flex-col items-center gap-1"
            :class="[
              form.iconKey === item.key
                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-300 font-bold'
                : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400',
            ]"
            @click="form.iconKey = item.key"
          >
            <span class="text-base">{{ item.icon }}</span>
            <span class="text-[10px] truncate max-w-full">{{ item.label }}</span>
          </button>
        </div>
      </div>

      <!-- Custom Emoji (if selected custom) -->
      <div v-if="form.iconKey === 'custom'">
        <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
          自定义 Emoji 或 图标符号
        </label>
        <input
          v-model="form.customIcon"
          type="text"
          maxlength="5"
          placeholder="🔗"
          class="w-16 px-2 py-2 text-center bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-lg focus:outline-none"
        />
      </div>

      <!-- Category -->
      <div>
        <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
          所属分类
        </label>
        <select
          v-model="form.categoryId"
          class="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none"
        >
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">
            {{ cat.name }}
          </option>
        </select>
      </div>
    </form>

    <template #footer>
      <button
        type="button"
        class="px-4 py-2 text-xs font-medium text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition cursor-pointer"
        @click="emit('update:modelValue', false)"
      >
        取消
      </button>
      <button
        type="button"
        class="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm transition active:scale-95 cursor-pointer"
        @click="submit"
      >
        确认添加
      </button>
    </template>
  </BaseModal>
</template>
