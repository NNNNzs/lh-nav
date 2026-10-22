<script setup lang="ts">
import { computed, reactive, watch } from 'vue'
import BaseModal from '@/components/common/BaseModal.vue'
import { useToast } from '@/composables/useToast'
import type { NavCategory, NavItem } from '@/types/nav'

interface Props {
  modelValue: boolean
  categories: NavCategory[]
  editingItem?: NavItem | null
  defaultCategoryId?: string | null
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  editingItem: null,
  defaultCategoryId: null,
})

const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void
  (e: 'save', item: Omit<NavItem, 'id' | 'createdAt' | 'updatedAt'>, id?: string): void
}>()

const { error } = useToast()

const isEdit = computed(() => !!props.editingItem)

const form = reactive({
  title: '',
  url: '',
  internalUrl: '',
  description: '',
  icon: '🔗',
  categoryId: '',
  tagsString: '',
  badgeText: '',
  badgeColor: 'emerald' as 'emerald' | 'blue' | 'purple' | 'amber' | 'rose',
  isFavorite: false,
})

const commonIcons = ['🔗', '🤖', '💻', '🐙', '📊', '🛡️', '⚙️', '📚', '🚀', '🧠', '🐋', '🎨', '🧩', '🌐', '📈']

function resetForm(): void {
  if (props.editingItem) {
    form.title = props.editingItem.title
    form.url = props.editingItem.url
    form.internalUrl = props.editingItem.internalUrl || ''
    form.description = props.editingItem.description || ''
    form.icon = props.editingItem.icon || '🔗'
    form.categoryId = props.editingItem.categoryId
    form.tagsString = (props.editingItem.tags || []).join(', ')
    form.badgeText = props.editingItem.badge?.text || ''
    form.badgeColor = props.editingItem.badge?.color || 'emerald'
    form.isFavorite = !!props.editingItem.isFavorite
  } else {
    form.title = ''
    form.url = ''
    form.internalUrl = ''
    form.description = ''
    form.icon = '🔗'
    form.categoryId = props.defaultCategoryId || props.categories[0]?.id || ''
    form.tagsString = ''
    form.badgeText = ''
    form.badgeColor = 'emerald'
    form.isFavorite = false
  }
}

watch(
  () => props.modelValue,
  (open) => {
    if (open) {
      resetForm()
    }
  },
)

function handleSubmit(): void {
  if (!form.title.trim()) {
    error('请填写标题')
    return
  }
  if (!form.url.trim()) {
    error('请填写有效网址')
    return
  }
  if (!form.categoryId) {
    error('请选择所属分类')
    return
  }

  // Normalize URL
  let finalUrl = form.url.trim()
  if (!/^https?:\/\//i.test(finalUrl)) {
    finalUrl = `https://${finalUrl}`
  }

  let finalInternalUrl = form.internalUrl.trim()
  if (finalInternalUrl && !/^https?:\/\//i.test(finalInternalUrl)) {
    finalInternalUrl = `http://${finalInternalUrl}`
  }

  const tags = form.tagsString
    .split(/[,，\s]+/)
    .map(t => t.trim())
    .filter(Boolean)

  const payload: Omit<NavItem, 'id' | 'createdAt' | 'updatedAt'> = {
    title: form.title.trim(),
    url: finalUrl,
    internalUrl: finalInternalUrl || undefined,
    description: form.description.trim(),
    icon: form.icon.trim() || '🔗',
    categoryId: form.categoryId,
    tags: tags.length > 0 ? tags : undefined,
    isFavorite: form.isFavorite,
    badge: form.badgeText.trim()
      ? { text: form.badgeText.trim(), color: form.badgeColor }
      : undefined,
  }

  emit('save', payload, props.editingItem?.id)
  emit('update:modelValue', false)
}
</script>

<template>
  <BaseModal
    :model-value="modelValue"
    :title="isEdit ? '编辑导航站点' : '添加导航站点'"
    max-width="lg"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <form class="space-y-4" @submit.prevent="handleSubmit">
      <!-- Title & Icon -->
      <div class="grid grid-cols-4 gap-3">
        <div class="col-span-3">
          <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            站点名称 <span class="text-rose-500">*</span>
          </label>
          <input
            v-model="form.title"
            type="text"
            required
            placeholder="例如: GitHub"
            class="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          />
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            图标 (Emoji)
          </label>
          <input
            v-model="form.icon"
            type="text"
            maxlength="20"
            placeholder="🔗"
            class="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-center text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          />
        </div>
      </div>

      <!-- Quick Icon Selector -->
      <div class="flex items-center gap-1.5 flex-wrap">
        <span class="text-[11px] text-slate-400">常用:</span>
        <button
          v-for="icon in commonIcons"
          :key="icon"
          type="button"
          class="w-7 h-7 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-sm flex items-center justify-center transition cursor-pointer"
          @click="form.icon = icon"
        >
          {{ icon }}
        </button>
      </div>

      <!-- Category -->
      <div>
        <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
          所属分类 <span class="text-rose-500">*</span>
        </label>
        <select
          v-model="form.categoryId"
          required
          class="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
        >
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">
            {{ cat.icon }} {{ cat.name }}
          </option>
        </select>
      </div>

      <!-- URL -->
      <div>
        <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
          主访问网址 (公网/外网) <span class="text-rose-500">*</span>
        </label>
        <input
          v-model="form.url"
          type="text"
          required
          placeholder="https://example.com"
          class="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
        />
      </div>

      <!-- Internal URL (Dual-link mode) -->
      <div>
        <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
          内网镜像地址 (可选，支持局域网 IP / 端口)
        </label>
        <input
          v-model="form.internalUrl"
          type="text"
          placeholder="http://172.18.1.100:8080"
          class="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
        />
        <p class="text-[11px] text-slate-400 mt-1">
          填写后卡片将展示单独的“内网”快捷访问胶囊按钮。
        </p>
      </div>

      <!-- Description -->
      <div>
        <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
          描述说明
        </label>
        <textarea
          v-model="form.description"
          rows="2"
          placeholder="简要概括该站点的用途与核心功能..."
          class="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
        ></textarea>
      </div>

      <!-- Tags & Badge -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            标签 (逗号分隔)
          </label>
          <input
            v-model="form.tagsString"
            type="text"
            placeholder="AI, 生产力, 常用"
            class="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          />
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            徽章文本与颜色
          </label>
          <div class="flex gap-2">
            <input
              v-model="form.badgeText"
              type="text"
              placeholder="例如: 推荐"
              class="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
            <select
              v-model="form.badgeColor"
              class="px-2 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none"
            >
              <option value="emerald">绿</option>
              <option value="blue">蓝</option>
              <option value="purple">紫</option>
              <option value="amber">黄</option>
              <option value="rose">红</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Favorite Checkbox -->
      <div class="pt-2 flex items-center gap-2">
        <input
          id="isFav"
          v-model="form.isFavorite"
          type="checkbox"
          class="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
        />
        <label for="isFav" class="text-xs text-slate-700 dark:text-slate-300 select-none cursor-pointer">
          设为特别收藏（在侧边栏与顶部快捷筛选）
        </label>
      </div>
    </form>

    <template #footer>
      <button
        type="button"
        class="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition cursor-pointer"
        @click="emit('update:modelValue', false)"
      >
        取消
      </button>
      <button
        type="button"
        class="px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm transition active:scale-95 cursor-pointer"
        @click="handleSubmit"
      >
        {{ isEdit ? '保存修改' : '确认添加' }}
      </button>
    </template>
  </BaseModal>
</template>
