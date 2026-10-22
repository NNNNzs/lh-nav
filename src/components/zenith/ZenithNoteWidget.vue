<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

const emit = defineEmits<{
  (e: 'copy'): void
  (e: 'clear'): void
}>()

const STORAGE_KEY = 'zenith_apple_quick_note_v1'

const defaultText = `⚡️ 今日重点：
1. 专注当下工作，保持高效节奏
2. 保持灵感充沛，记录点滴思考`

const noteContent = ref('')
const lastUpdatedText = ref('刚刚')

onMounted(() => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved !== null) {
      noteContent.value = saved
    } else {
      noteContent.value = defaultText
    }
  } catch {
    noteContent.value = defaultText
  }
})

watch(noteContent, (val) => {
  try {
    localStorage.setItem(STORAGE_KEY, val)
    const now = new Date()
    const hrs = String(now.getHours()).padStart(2, '0')
    const mins = String(now.getMinutes()).padStart(2, '0')
    lastUpdatedText.value = `${hrs}:${mins}`
  } catch (e) {
    console.error(e)
  }
})

function handleCopy() {
  if (!noteContent.value.trim()) return
  navigator.clipboard.writeText(noteContent.value).then(() => {
    emit('copy')
  }).catch(() => {})
}

function handleClear() {
  noteContent.value = ''
  emit('clear')
}
</script>

<template>
  <div
    class="relative overflow-hidden rounded-3xl p-5 bg-gradient-to-br from-[#272115]/75 via-[#1e1c17]/80 to-[#141311]/85 backdrop-blur-2xl border border-amber-400/25 shadow-2xl text-white flex flex-col justify-between group hover:border-amber-400/40 transition-all min-h-[220px]"
  >
    <!-- Top Bar: Apple Note Icon + Title + Actions -->
    <div class="flex items-center justify-between pb-2 border-b border-amber-300/15">
      <div class="flex items-center gap-2.5">
        <div
          class="w-7 h-7 rounded-xl bg-gradient-to-b from-amber-400 to-amber-500 text-slate-900 flex items-center justify-center font-bold text-xs shadow-md shrink-0"
        >
          <span class="material-symbols-outlined text-[17px]">edit_note</span>
        </div>
        <div>
          <h3 class="text-xs font-bold text-amber-100 tracking-wide flex items-center gap-1.5">
            <span>随手便签</span>
            <span class="text-[9px] font-normal px-1.5 py-0.2 rounded-full bg-amber-400/15 text-amber-300/90">
              备忘
            </span>
          </h3>
          <p class="text-[10px] text-amber-200/50 leading-none mt-0.5">
            更新于 {{ lastUpdatedText }}
          </p>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center gap-1">
        <button
          type="button"
          class="p-1 rounded-lg text-amber-200/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          title="复制便签文本"
          @click="handleCopy"
        >
          <span class="material-symbols-outlined text-[16px]">content_copy</span>
        </button>
        <button
          type="button"
          class="p-1 rounded-lg text-amber-200/70 hover:text-rose-400 hover:bg-white/10 transition-colors cursor-pointer"
          title="清空便签"
          @click="handleClear"
        >
          <span class="material-symbols-outlined text-[16px]">delete_outline</span>
        </button>
      </div>
    </div>

    <!-- Middle: Truly Editable Note Content -->
    <div class="flex-1 my-2 min-h-[90px] flex flex-col">
      <textarea
        v-model="noteContent"
        placeholder="记录灵感、待办清单或随时粘贴的文字..."
        class="w-full flex-1 bg-transparent border-0 outline-none resize-none text-xs sm:text-sm text-amber-50/90 placeholder:text-amber-200/30 font-normal leading-relaxed focus:ring-0 custom-note-scrollbar"
        spellcheck="false"
      />
    </div>

    <!-- Bottom Status Bar -->
    <div class="pt-2 border-t border-amber-300/10 flex items-center justify-between text-[10px] text-amber-200/50">
      <span>{{ noteContent.length }} 字</span>
      <div class="flex items-center gap-1.5 text-amber-300/70">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>已实时保存</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-note-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-note-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(251, 191, 36, 0.25);
  border-radius: 4px;
}
.custom-note-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(251, 191, 36, 0.45);
}
</style>
