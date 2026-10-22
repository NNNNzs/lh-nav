<script setup lang="ts">
import { reactive, ref } from 'vue'
import BaseModal from '@/components/common/BaseModal.vue'
import { useToast } from '@/composables/useToast'
import type { NavCategory } from '@/types/nav'

interface Props {
  modelValue: boolean
  categories: NavCategory[]
  categoryCountMap: Record<string, number>
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void
  (e: 'addCategory', cat: Omit<NavCategory, 'id'>): void
  (e: 'updateCategory', id: string, cat: Partial<Omit<NavCategory, 'id'>>): void
  (e: 'deleteCategory', id: string): void
}>()

const { error, success } = useToast()

const editingId = ref<string | null>(null)
const newCategory = reactive({
  name: '',
  icon: '📁',
  description: '',
  sortOrder: 10,
})

function handleAddCategory(): void {
  if (!newCategory.name.trim()) {
    error('分类名称不能为空')
    return
  }

  emit('addCategory', {
    name: newCategory.name.trim(),
    icon: newCategory.icon.trim() || '📁',
    description: newCategory.description.trim() || undefined,
    sortOrder: Number(newCategory.sortOrder) || props.categories.length + 1,
  })

  newCategory.name = ''
  newCategory.icon = '📁'
  newCategory.description = ''
  success('分类添加成功')
}

function handleSaveEdit(cat: NavCategory, newName: string, newIcon: string, newSort: number): void {
  if (!newName.trim()) {
    error('分类名称不能为空')
    return
  }
  emit('updateCategory', cat.id, {
    name: newName.trim(),
    icon: newIcon.trim() || '📁',
    sortOrder: Number(newSort) || cat.sortOrder,
  })
  editingId.value = null
  success('分类更新成功')
}

function confirmDelete(id: string, name: string): void {
  const count = props.categoryCountMap[id] || 0
  const confirmMsg = count > 0
    ? `确定删除分类【${name}】吗？该分类下的 ${count} 个站点也会被同步清除！`
    : `确定删除分类【${name}】吗？`

  if (window.confirm(confirmMsg)) {
    emit('deleteCategory', id)
    success('分类已删除')
  }
}
</script>

<template>
  <BaseModal
    :model-value="modelValue"
    title="分类管理"
    max-width="lg"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <div class="space-y-6">
      <!-- Existing Categories List -->
      <div class="space-y-2">
        <h4 class="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          现有分类列表 ({{ categories.length }})
        </h4>

        <div class="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
          <div
            v-for="cat in categories"
            :key="cat.id"
            class="p-3 bg-white dark:bg-slate-900 flex items-center justify-between gap-3 text-sm"
          >
            <!-- Normal View -->
            <template v-if="editingId !== cat.id">
              <div class="flex items-center gap-2.5 min-w-0">
                <span class="text-xl shrink-0">{{ cat.icon || '📁' }}</span>
                <div class="min-w-0">
                  <div class="flex items-center gap-2">
                    <span class="font-bold text-slate-800 dark:text-slate-100 truncate">{{ cat.name }}</span>
                    <span class="text-[11px] px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 font-mono">
                      {{ categoryCountMap[cat.id] || 0 }} 项
                    </span>
                  </div>
                  <p v-if="cat.description" class="text-xs text-slate-400 truncate">
                    {{ cat.description }}
                  </p>
                </div>
              </div>

              <div class="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  class="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  title="编辑"
                  @click="editingId = cat.id"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
                <button
                  type="button"
                  class="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
                  title="删除"
                  @click="confirmDelete(cat.id, cat.name)"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </template>

            <!-- Inline Edit View -->
            <template v-else>
              <div class="flex items-center gap-2 flex-1">
                <input
                  v-model="cat.icon"
                  type="text"
                  maxlength="5"
                  class="w-10 px-1 py-1 text-center bg-slate-50 dark:bg-slate-800 border rounded text-sm"
                />
                <input
                  v-model="cat.name"
                  type="text"
                  class="flex-1 px-2 py-1 bg-slate-50 dark:bg-slate-800 border rounded text-sm"
                />
                <input
                  v-model="cat.sortOrder"
                  type="number"
                  placeholder="排序"
                  class="w-16 px-1 py-1 text-center bg-slate-50 dark:bg-slate-800 border rounded text-sm font-mono"
                />
              </div>

              <div class="flex items-center gap-1 ml-2">
                <button
                  type="button"
                  class="px-2 py-1 bg-emerald-600 text-white rounded text-xs font-semibold"
                  @click="handleSaveEdit(cat, cat.name, cat.icon || '📁', cat.sortOrder)"
                >
                  保存
                </button>
                <button
                  type="button"
                  class="px-2 py-1 text-slate-500 rounded text-xs"
                  @click="editingId = null"
                >
                  取消
                </button>
              </div>
            </template>
          </div>
        </div>
      </div>

      <!-- Add New Category -->
      <div class="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-3">
        <h4 class="text-xs font-semibold text-slate-700 dark:text-slate-300">
          新增分类
        </h4>

        <div class="grid grid-cols-6 gap-2">
          <input
            v-model="newCategory.icon"
            type="text"
            placeholder="图标"
            maxlength="5"
            class="col-span-1 px-2 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-center text-sm"
          />
          <input
            v-model="newCategory.name"
            type="text"
            placeholder="分类名称 (如: 运维工具)"
            class="col-span-3 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm"
          />
          <input
            v-model="newCategory.sortOrder"
            type="number"
            placeholder="排序号"
            class="col-span-2 px-2 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-center font-mono"
          />
        </div>

        <input
          v-model="newCategory.description"
          type="text"
          placeholder="分类描述说明 (可选)"
          class="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs"
        />

        <div class="text-right">
          <button
            type="button"
            class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition active:scale-95 cursor-pointer"
            @click="handleAddCategory"
          >
            添加新分类
          </button>
        </div>
      </div>
    </div>

    <template #footer>
      <button
        type="button"
        class="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition cursor-pointer"
        @click="emit('update:modelValue', false)"
      >
        完成
      </button>
    </template>
  </BaseModal>
</template>
