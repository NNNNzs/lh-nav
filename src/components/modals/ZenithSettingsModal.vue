<script setup lang="ts">
import BaseModal from '@/components/common/BaseModal.vue'
import { useToast } from '@/composables/useToast'
import { useZenithStorage } from '@/composables/useZenithStorage'

interface Props {
  modelValue: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void
  (e: 'changeBackground', bg: string): void
}>()

const { storageSizeStr, resetToDefault, cards } = useZenithStorage()
const { success } = useToast()

const backgroundThemes = [
  { id: 'default', name: '晨曦森林 (原版效果)', color: 'from-[#423a27] via-[#21382d] to-[#113125]' },
  { id: 'midnight', name: '极光幽蓝', color: 'from-[#172038] via-[#10242b] to-[#0a1820]' },
  { id: 'sunset', name: '日暮暖橙', color: 'from-[#3a2027] via-[#2d222b] to-[#122223]' },
]

function handleReset() {
  if (window.confirm('确定要重置当前布局和卡片回到初始效果图状态吗？')) {
    resetToDefault()
    success('已成功重置为初始效果图布局')
    emit('update:modelValue', false)
  }
}

function exportData() {
  const data = JSON.stringify(cards.value, null, 2)
  navigator.clipboard.writeText(data).then(() => {
    success('配置已导出并复制到剪贴板')
  })
}
</script>

<template>
  <BaseModal
    :model-value="modelValue"
    title="Zenith 控制中心与设置"
    max-width="md"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <div class="space-y-5 text-xs text-slate-600 dark:text-slate-300">
      <!-- Status Box -->
      <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
        <div>
          <span class="font-bold text-slate-800 dark:text-slate-100">本地沙盒与存储占用</span>
          <p class="text-slate-400 mt-0.5">所有数据纯前端离线本地加密保存</p>
        </div>
        <span class="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm">
          {{ storageSizeStr }}
        </span>
      </div>

      <!-- Background themes -->
      <div class="space-y-2">
        <span class="font-bold text-slate-700 dark:text-slate-200">氛围渐变背景</span>
        <div class="grid grid-cols-3 gap-2">
          <button
            v-for="bg in backgroundThemes"
            :key="bg.id"
            type="button"
            class="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-emerald-500 text-center transition cursor-pointer flex flex-col items-center gap-1.5"
            @click="emit('changeBackground', bg.id)"
          >
            <div class="w-full h-8 rounded-lg bg-gradient-to-br" :class="bg.color"></div>
            <span class="text-[11px] truncate">{{ bg.name }}</span>
          </button>
        </div>
      </div>

      <!-- Actions -->
      <div class="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
        <button
          type="button"
          class="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl text-slate-700 dark:text-slate-200 font-semibold transition cursor-pointer flex items-center justify-between"
          @click="exportData"
        >
          <span>备份与导出卡片配置 (JSON)</span>
          <span>📋</span>
        </button>

        <button
          type="button"
          class="w-full py-2.5 px-4 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/40 text-rose-600 dark:text-rose-300 border border-rose-200 dark:border-rose-800 rounded-xl font-semibold transition cursor-pointer flex items-center justify-between"
          @click="handleReset"
        >
          <span>重置为效果图初始布局</span>
          <span>↺</span>
        </button>
      </div>
    </div>
  </BaseModal>
</template>
