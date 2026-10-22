<script setup lang="ts">
import { onUnmounted, ref } from 'vue'
import BaseModal from '@/components/common/BaseModal.vue'
import type { TodoItem } from '@/types/zenith'

interface Props {
  modelValue: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void
}>()

// Pomodoro Timer
const durationMinutes = 25
const timeLeft = ref(durationMinutes * 60)
const isRunning = ref(false)
let timerId: number | null = null

function toggleTimer() {
  if (isRunning.value) {
    if (timerId !== null) clearInterval(timerId)
    isRunning.value = false
  } else {
    isRunning.value = true
    timerId = window.setInterval(() => {
      if (timeLeft.value > 0) {
        timeLeft.value--
      } else {
        clearInterval(timerId!)
        isRunning.value = false
        alert('🎉 专注时段完成！喝杯水休息一下吧。')
      }
    }, 1000)
  }
}

function resetTimer() {
  if (timerId !== null) clearInterval(timerId)
  isRunning.value = false
  timeLeft.value = durationMinutes * 60
}

function formatSeconds(sec: number) {
  const m = String(Math.floor(sec / 60)).padStart(2, '0')
  const s = String(sec % 60).padStart(2, '0')
  return `${m}:${s}`
}

onUnmounted(() => {
  if (timerId !== null) clearInterval(timerId)
})

// Todos
const newTodoTitle = ref('')
const todos = ref<TodoItem[]>([
  { id: '1', title: '完成 lh-nav 导航站组件化与原型还原', completed: true },
  { id: '2', title: '配置 Tailwind CSS v4 渐变与主题色', completed: true },
  { id: '3', title: '复盘产品架构设计规范与交互逻辑', completed: false },
  { id: '4', title: '同步本地沙盒数据并进行代码 Review', completed: false },
])

function toggleTodo(todo: TodoItem) {
  todo.completed = !todo.completed
}

function addTodo() {
  const text = newTodoTitle.value.trim()
  if (!text) return
  todos.value.push({
    id: `todo-${Date.now()}`,
    title: text,
    completed: false,
  })
  newTodoTitle.value = ''
}

function deleteTodo(id: string) {
  todos.value = todos.value.filter(t => t.id !== id)
}
</script>

<template>
  <BaseModal
    :model-value="modelValue"
    title="高效工作台 · 专注与待办"
    max-width="lg"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <div class="space-y-6">
      <!-- Pomodoro Focus Section -->
      <div
        class="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent border border-amber-500/20 text-center space-y-3"
      >
        <span class="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
          番茄专注计时器 (Pomodoro)
        </span>

        <div class="text-5xl font-mono font-black text-slate-800 dark:text-slate-100 tracking-tight">
          {{ formatSeconds(timeLeft) }}
        </div>

        <div class="flex items-center justify-center gap-2 pt-1">
          <button
            type="button"
            class="px-5 py-2 rounded-xl text-xs font-bold text-white shadow-sm transition active:scale-95 cursor-pointer"
            :class="[isRunning ? 'bg-amber-600 hover:bg-amber-700' : 'bg-emerald-600 hover:bg-emerald-700']"
            @click="toggleTimer"
          >
            {{ isRunning ? '暂停计时' : '开始专注 (25分钟)' }}
          </button>
          <button
            type="button"
            class="px-3.5 py-2 rounded-xl text-xs font-medium text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            @click="resetTimer"
          >
            重置
          </button>
        </div>
      </div>

      <!-- Todo List Section -->
      <div class="space-y-3">
        <div class="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
          <span>今日待办事项 ({{ todos.filter(t => !t.completed).length }} 待完成)</span>
          <span class="text-slate-400 font-normal">点击勾选即完成</span>
        </div>

        <!-- Add Input -->
        <div class="flex gap-2">
          <input
            v-model="newTodoTitle"
            type="text"
            placeholder="输入新的任务项并按回车..."
            class="flex-1 px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            @keydown.enter="addTodo"
          />
          <button
            type="button"
            class="px-4 py-2 bg-slate-900 dark:bg-slate-700 hover:bg-black text-white text-xs font-semibold rounded-xl transition cursor-pointer"
            @click="addTodo"
          >
            添加
          </button>
        </div>

        <!-- Items list -->
        <div class="space-y-1.5 max-h-48 overflow-y-auto">
          <div
            v-for="todo in todos"
            :key="todo.id"
            class="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition cursor-pointer text-xs"
            @click="toggleTodo(todo)"
          >
            <div class="flex items-center gap-2.5 min-w-0">
              <input
                type="checkbox"
                :checked="todo.completed"
                class="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                @click.stop="toggleTodo(todo)"
              />
              <span
                class="truncate"
                :class="[
                  todo.completed
                    ? 'line-through text-slate-400 dark:text-slate-500'
                    : 'text-slate-700 dark:text-slate-200 font-medium',
                ]"
              >
                {{ todo.title }}
              </span>
            </div>

            <button
              type="button"
              class="text-slate-300 hover:text-rose-500 p-1 rounded transition"
              @click.stop="deleteTodo(todo.id)"
            >
              ×
            </button>
          </div>
        </div>
      </div>
    </div>
  </BaseModal>
</template>
