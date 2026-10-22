<script setup lang="ts">
import { ref } from 'vue'
import BaseModal from '@/components/common/BaseModal.vue'
import { useToast } from '@/composables/useToast'

interface Props {
  modelValue: boolean
  exportData: () => string
  importData: (json: string) => { success: boolean; message: string }
  resetToDefault: () => void
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void
}>()

const { success, error, info } = useToast()
const importJsonText = ref('')
const fileInputRef = ref<HTMLInputElement | null>(null)

function copyToClipboard(): void {
  const data = props.exportData()
  navigator.clipboard.writeText(data)
    .then(() => {
      success('复制成功', '导航配置 JSON 已复制到剪贴板')
    })
    .catch(() => {
      error('复制失败', '请手动全选复制')
    })
}

function downloadBackupFile(): void {
  const data = props.exportData()
  const blob = new Blob([data], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  const dateStr = new Date().toISOString().split('T')[0]
  a.href = url
  a.download = `lh-nav-backup-${dateStr}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
  success('已生成备份文件下载')
}

function handleImport(): void {
  if (!importJsonText.value.trim()) {
    error('请粘贴待导入的 JSON 内容')
    return
  }

  const res = props.importData(importJsonText.value.trim())
  if (res.success) {
    success('导入成功', res.message)
    importJsonText.value = ''
    emit('update:modelValue', false)
  } else {
    error('导入失败', res.message)
  }
}

function handleFileSelect(e: Event): void {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (event) => {
    const text = event.target?.result as string
    if (text) {
      importJsonText.value = text
      info('文件已读取', '点击下方“确认恢复数据”完成覆盖')
    }
  }
  reader.readAsText(file)
}

function handleReset(): void {
  if (window.confirm('确定要恢复默认预设数据吗？这将会覆盖当前所有修改！')) {
    props.resetToDefault()
    success('已重置为初始默认配置')
    emit('update:modelValue', false)
  }
}
</script>

<template>
  <BaseModal
    :model-value="modelValue"
    title="数据备份与恢复"
    max-width="lg"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <div class="space-y-6">
      <!-- Export Section -->
      <div class="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-3">
        <div class="flex items-center justify-between">
          <div>
            <h4 class="text-sm font-bold text-slate-800 dark:text-slate-100">
              数据导出与备份
            </h4>
            <p class="text-xs text-slate-400 mt-0.5">
              将分类、站点配置导出为本地 JSON 备份
            </p>
          </div>
          <div class="flex gap-2">
            <button
              type="button"
              class="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition cursor-pointer"
              @click="copyToClipboard"
            >
              复制 JSON
            </button>
            <button
              type="button"
              class="px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition active:scale-95 cursor-pointer"
              @click="downloadBackupFile"
            >
              下载文件
            </button>
          </div>
        </div>
      </div>

      <!-- Import Section -->
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <h4 class="text-sm font-bold text-slate-800 dark:text-slate-100">
            数据恢复与导入
          </h4>
          <button
            type="button"
            class="text-xs text-emerald-600 hover:underline cursor-pointer"
            @click="fileInputRef?.click()"
          >
            从本地文件读取 (.json)
          </button>
          <input
            ref="fileInputRef"
            type="file"
            accept=".json"
            class="hidden"
            @change="handleFileSelect"
          />
        </div>

        <textarea
          v-model="importJsonText"
          rows="4"
          placeholder="在此处粘贴导出的 JSON 备份数据..."
          class="w-full p-3 font-mono text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
        ></textarea>

        <div class="flex justify-end">
          <button
            type="button"
            :disabled="!importJsonText.trim()"
            class="px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white transition cursor-pointer"
            @click="handleImport"
          >
            确认恢复数据
          </button>
        </div>
      </div>

      <!-- Danger Zone: Reset to default -->
      <div class="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div>
          <span class="text-xs font-bold text-rose-600 dark:text-rose-400">危险操作</span>
          <p class="text-xs text-slate-400">
            清空用户个性化编辑，重置为系统默认预设数据
          </p>
        </div>
        <button
          type="button"
          class="px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition cursor-pointer border border-rose-200 dark:border-rose-900"
          @click="handleReset"
        >
          恢复初始预设
        </button>
      </div>
    </div>

    <template #footer>
      <button
        type="button"
        class="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition cursor-pointer"
        @click="emit('update:modelValue', false)"
      >
        关闭
      </button>
    </template>
  </BaseModal>
</template>
