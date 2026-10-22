import { ref } from 'vue'
import type { ToastMessage } from '@/types/nav'

const toasts = ref<ToastMessage[]>([])

export function useToast() {
  function show(title: string, message?: string, type: ToastMessage['type'] = 'info', duration = 3000): void {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
    const toast: ToastMessage = { id, title, message, type, duration }
    toasts.value.push(toast)

    if (duration > 0) {
      setTimeout(() => {
        dismiss(id)
      }, duration)
    }
  }

  function success(title: string, message?: string, duration?: number): void {
    show(title, message, 'success', duration)
  }

  function error(title: string, message?: string, duration?: number): void {
    show(title, message, 'error', duration)
  }

  function info(title: string, message?: string, duration?: number): void {
    show(title, message, 'info', duration)
  }

  function warning(title: string, message?: string, duration?: number): void {
    show(title, message, 'warning', duration)
  }

  function dismiss(id: string): void {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }

  return {
    toasts,
    show,
    success,
    error,
    info,
    warning,
    dismiss,
  }
}
