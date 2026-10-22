import { computed, onMounted, onUnmounted, ref } from 'vue'

export function useZenithClock() {
  const now = ref(new Date())
  let timer: number | null = null

  function update() {
    now.value = new Date()
  }

  onMounted(() => {
    update()
    timer = window.setInterval(update, 1000)
  })

  onUnmounted(() => {
    if (timer !== null) {
      clearInterval(timer)
    }
  })

  const liveTime = computed(() => {
    const hrs = String(now.value.getHours()).padStart(2, '0')
    const mins = String(now.value.getMinutes()).padStart(2, '0')
    return `${hrs}:${mins}`
  })

  const liveDate = computed(() => {
    const months = now.value.getMonth() + 1
    const date = now.value.getDate()
    const dayNames = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    return `${months}月${date}日 ${dayNames[now.value.getDay()]}`
  })

  const liveGreeting = computed(() => {
    const hour = now.value.getHours()
    if (hour < 6) return '夜深了，注意休息'
    if (hour < 11) return '早上好，开启灵感充沛的一天'
    if (hour < 13) return '午后好，专注当下，保持节奏'
    if (hour < 18) return '下午好，保持灵感与专注'
    return '晚上好，享受静谧时光'
  })

  const solarTerm = ref('霜降')

  return {
    liveTime,
    liveDate,
    liveGreeting,
    solarTerm,
  }
}
