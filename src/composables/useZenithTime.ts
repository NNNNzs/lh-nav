import { computed, onMounted, onUnmounted, ref } from 'vue'

export function useZenithTime() {
  const now = ref(new Date())
  let timer: number | null = null

  function updateTime() {
    now.value = new Date()
  }

  onMounted(() => {
    updateTime()
    timer = window.setInterval(updateTime, 1000)
  })

  onUnmounted(() => {
    if (timer !== null) {
      clearInterval(timer)
    }
  })

  // Format "20:16"
  const timeStr = computed(() => {
    const hours = String(now.value.getHours()).padStart(2, '0')
    const minutes = String(now.value.getMinutes()).padStart(2, '0')
    return `${hours}:${minutes}`
  })

  // Format "10月21日 星期三"
  const dateStr = computed(() => {
    const month = now.value.getMonth() + 1
    const day = now.value.getDate()
    const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    const weekday = weekdays[now.value.getDay()]
    return `${month}月${day}日 ${weekday}`
  })

  // Solar Term / Season Tag (e.g. "霜降", "寒露", "立冬")
  const solarTerm = computed(() => {
    const month = now.value.getMonth() + 1
    const day = now.value.getDate()
    if (month === 10) {
      return day >= 23 ? '霜降' : '寒露'
    } else if (month === 11) {
      return day >= 22 ? '小雪' : '立冬'
    } else if (month === 12) {
      return day >= 21 ? '冬至' : '大雪'
    }
    return '霜降'
  })

  // Dynamic Greeting based on time of day
  const greeting = computed(() => {
    const hour = now.value.getHours()
    if (hour >= 5 && hour < 9) {
      return { icon: '🌅', text: '清晨好，迎接崭新一天' }
    } else if (hour >= 9 && hour < 12) {
      return { icon: '☀️', text: '上午好，专注带来高效' }
    } else if (hour >= 12 && hour < 14) {
      return { icon: '☕', text: '中午好，适度小憩片刻' }
    } else if (hour >= 14 && hour < 18) {
      return { icon: '⛅', text: '下午好，保持灵感涌现' }
    } else if (hour >= 18 && hour < 23) {
      return { icon: '🔆', text: '晚上好，享受静谧时光' }
    } else {
      return { icon: '🌙', text: '夜深了，早点休息充电' }
    }
  })

  return {
    now,
    timeStr,
    dateStr,
    solarTerm,
    greeting,
  }
}
