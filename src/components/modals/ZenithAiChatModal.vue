<script setup lang="ts">
import { nextTick, ref } from 'vue'
import BaseModal from '@/components/common/BaseModal.vue'
import type { AiChatMessage } from '@/types/zenith'

interface Props {
  modelValue: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void
}>()

const inputMessage = ref('')
const isThinking = ref(false)
const chatContainer = ref<HTMLDivElement | null>(null)

const messages = ref<AiChatMessage[]>([
  {
    id: 'msg-1',
    role: 'assistant',
    content: '你好！我是 Zenith 智能副驾驶。我可以协助你搜索灵感、梳理工作待办、解析技术文档或生成代码片段。今天有什么想探索的？',
    timestamp: '刚刚',
  },
])

const quickPrompts = [
  '⚡ 今日 GitHub 热门开源项目',
  '🎨 2026 前端设计趋势解读',
  '🛠️ 推荐 5 个超实用的在线开发者工具',
]

function sendPrompt(text: string) {
  inputMessage.value = text
  sendMessage()
}

function sendMessage() {
  const text = inputMessage.value.trim()
  if (!text || isThinking.value) return

  messages.value.push({
    id: `user-${Date.now()}`,
    role: 'user',
    content: text,
    timestamp: '刚刚',
  })

  inputMessage.value = ''
  isThinking.value = true

  scrollToBottom()

  setTimeout(() => {
    isThinking.value = false
    let reply = `已收到你的需求：“${text}”。\n\n💡 **Zenith 建议**：\n- 建议将核心目标拆解为 3 个关键步骤，结合工作流卡片快速聚焦；\n- 你可以使用顶部的搜索栏快速跳转到官方文档或社区进行深度调研。\n\n如果有具体的代码或设计规范需要分析，请随时告诉我！`
    if (text.includes('GitHub')) {
      reply = '🔥 **近期热门开源趋势**：\n1. **Vite 8 & Rolldown** - 超高速 Rust 打包内核与原生 ESM 体验；\n2. **Tailwind CSS v4** - 基于 CSS 原生变量的高性能原子化引擎；\n3. **Vue 3.5 & React 19** - 带来更精简的响应式内存与编译期优化。'
    } else if (text.includes('工具')) {
      reply = '🧰 **精选高效开发者工具**：\n- **Can I Use**：权威前端浏览器兼容性查询；\n- **Regex101**：交互式正则表达式实时调试与解释；\n- **Bundlephobia**：NPM 依赖体积与加载耗时分析；\n- **Squoosh**：新一代现代 WebP/AVIF 图片无损压缩利器。'
    }

    messages.value.push({
      id: `ai-${Date.now()}`,
      role: 'assistant',
      content: reply,
      timestamp: '刚刚',
    })
    scrollToBottom()
  }, 900)
}

function scrollToBottom() {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  })
}
</script>

<template>
  <BaseModal
    :model-value="modelValue"
    title="Zenith AI 智能助手"
    max-width="xl"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <div class="space-y-4">
      <!-- AI Model Badge Header -->
      <div class="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 text-xs">
        <div class="flex items-center gap-2">
          <div class="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
            ✨
          </div>
          <span class="font-bold text-slate-800 dark:text-slate-100">Zenith Copilot</span>
          <span class="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[10px] font-mono">
            ● GPT-4o Online
          </span>
        </div>
        <span class="text-slate-400 text-[11px]">按 Enter 发送</span>
      </div>

      <!-- Messages Log -->
      <div
        ref="chatContainer"
        class="h-72 overflow-y-auto space-y-3.5 pr-1 text-xs sm:text-sm"
      >
        <div
          v-for="msg in messages"
          :key="msg.id"
          class="flex items-start gap-3"
          :class="[msg.role === 'user' ? 'flex-row-reverse' : '']"
        >
          <!-- Avatar -->
          <div
            class="w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 select-none shadow-xs"
            :class="[
              msg.role === 'user'
                ? 'bg-amber-500 text-white'
                : 'bg-indigo-600 text-white',
            ]"
          >
            {{ msg.role === 'user' ? '我' : 'AI' }}
          </div>

          <!-- Bubble -->
          <div
            class="max-w-[80%] rounded-2xl p-3.5 leading-relaxed whitespace-pre-wrap"
            :class="[
              msg.role === 'user'
                ? 'bg-emerald-600 text-white rounded-tr-none'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none border border-slate-200/60 dark:border-slate-700/60',
            ]"
          >
            {{ msg.content }}
          </div>
        </div>

        <!-- Thinking loader -->
        <div v-if="isThinking" class="flex items-center gap-2 text-slate-400 text-xs pl-10">
          <span class="w-2 h-2 rounded-full bg-indigo-500 animate-ping"></span>
          <span>Zenith 思考中...</span>
        </div>
      </div>

      <!-- Quick prompts -->
      <div class="flex flex-wrap items-center gap-1.5 pt-2">
        <button
          v-for="prompt in quickPrompts"
          :key="prompt"
          type="button"
          class="px-2.5 py-1 rounded-full text-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition cursor-pointer select-none"
          @click="sendPrompt(prompt)"
        >
          {{ prompt }}
        </button>
      </div>

      <!-- Input box -->
      <div class="relative flex items-center gap-2 pt-2">
        <input
          v-model="inputMessage"
          type="text"
          placeholder="问点什么吧，或输入编程/设计问题..."
          class="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          @keydown.enter="sendMessage"
        />
        <button
          type="button"
          :disabled="!inputMessage.trim() || isThinking"
          class="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white rounded-xl text-xs font-semibold shadow-sm transition active:scale-95 cursor-pointer shrink-0"
          @click="sendMessage"
        >
          发送
        </button>
      </div>
    </div>
  </BaseModal>
</template>
