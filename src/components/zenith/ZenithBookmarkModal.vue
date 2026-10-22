<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import baiduIcon from '@/assets/icons/baidu.jpg'
import bilibiliIcon from '@/assets/icons/bilibili.jpg'
import doubaoIcon from '@/assets/icons/doubao.jpg'
import douyinIcon from '@/assets/icons/douyin.jpg'
import feishuIcon from '@/assets/icons/feishu.jpg'
import iqiyiIcon from '@/assets/icons/iqiyi.jpg'
import jdIcon from '@/assets/icons/jd.jpg'
import kimiIcon from '@/assets/icons/kimi.jpg'
import neteaseIcon from '@/assets/icons/netease-music.jpg'
import quarkIcon from '@/assets/icons/quark.jpg'
import taobaoIcon from '@/assets/icons/taobao.jpg'
import tencentdocIcon from '@/assets/icons/tencentdoc.jpg'
import wereadIcon from '@/assets/icons/weread.jpg'
import wpsIcon from '@/assets/icons/wps.jpg'
import xiaohongshuIcon from '@/assets/icons/xiaohongshu.jpg'
import zhihuIcon from '@/assets/icons/zhihu.jpg'
import type { IconKind, ZenithCategoryKey } from '@/types/zenith'

interface Props {
  modelValue: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'save', payload: {
    title: string
    url: string
    desc: string
    category: ZenithCategoryKey
    iconKind: IconKind
    iconValue: string
    iconBg?: string
  }): void
}>()

const title = ref('')
const url = ref('')
const desc = ref('')
const category = ref<ZenithCategoryKey>('all')

// Icon mode: 'preset' | 'custom' | 'text'
const iconMode = ref<'preset' | 'custom' | 'text'>('preset')
const selectedPresetIndex = ref(0)
const customImageUrl = ref('')
const customLetter = ref('')
const selectedGradientIndex = ref(0)
const fileInputRef = ref<HTMLInputElement | null>(null)

// 16 Presets
const PRESET_ICONS = [
  { name: '豆包', src: doubaoIcon },
  { name: '知乎', src: zhihuIcon },
  { name: '网易云', src: neteaseIcon },
  { name: '抖音', src: douyinIcon },
  { name: '爱奇艺', src: iqiyiIcon },
  { name: '哔哩哔哩', src: bilibiliIcon },
  { name: '飞书', src: feishuIcon },
  { name: 'Kimi', src: kimiIcon },
  { name: '小红书', src: xiaohongshuIcon },
  { name: '微信读书', src: wereadIcon },
  { name: '腾讯文档', src: tencentdocIcon },
  { name: 'WPS', src: wpsIcon },
  { name: '夸克', src: quarkIcon },
  { name: '百度', src: baiduIcon },
  { name: '淘宝', src: taobaoIcon },
  { name: '京东', src: jdIcon },
]

// 6 Gradients for text icons
const GRADIENTS = [
  { label: '靛蓝', class: 'bg-gradient-to-br from-indigo-600 to-purple-700' },
  { label: '翡翠', class: 'bg-gradient-to-br from-emerald-600 to-teal-700' },
  { label: '蔚蓝', class: 'bg-gradient-to-br from-sky-500 to-blue-600' },
  { label: '暖阳', class: 'bg-gradient-to-br from-amber-500 to-orange-600' },
  { label: '樱粉', class: 'bg-gradient-to-br from-rose-500 to-pink-600' },
  { label: '极夜', class: 'bg-gradient-to-br from-slate-800 to-slate-950' },
]

// Current effective icon data
const currentIconData = computed(() => {
  if (iconMode.value === 'preset') {
    return {
      kind: 'img' as IconKind,
      value: PRESET_ICONS[selectedPresetIndex.value]?.src || doubaoIcon,
      bg: '',
    }
  }

  if (iconMode.value === 'custom') {
    if (customImageUrl.value.trim()) {
      return {
        kind: 'img' as IconKind,
        value: customImageUrl.value.trim(),
        bg: '',
      }
    }
    // fallback if empty
    return {
      kind: 'img' as IconKind,
      value: PRESET_ICONS[0].src,
      bg: '',
    }
  }

  // text mode
  const letter = (customLetter.value.trim() || title.value.trim() || '网').charAt(0)
  return {
    kind: 'text' as IconKind,
    value: letter,
    bg: GRADIENTS[selectedGradientIndex.value].class,
  }
})

watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      title.value = ''
      url.value = ''
      desc.value = ''
      category.value = 'all'
      iconMode.value = 'preset'
      selectedPresetIndex.value = 0
      customImageUrl.value = ''
      customLetter.value = ''
      selectedGradientIndex.value = 0
    }
  },
)

function handleClose() {
  emit('update:modelValue', false)
}

function handleFileUpload(e: Event) {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  if (file.size > 2 * 1024 * 1024) {
    alert('请选择小于 2MB 的图片文件')
    return
  }

  const reader = new FileReader()
  reader.onload = () => {
    customImageUrl.value = reader.result as string
    iconMode.value = 'custom'
  }
  reader.readAsDataURL(file)
}

function handleAutoFetchFavicon() {
  const inputUrl = url.value.trim()
  if (!inputUrl) {
    alert('请先输入网址 URL')
    return
  }

  try {
    const full = /^https?:\/\//i.test(inputUrl) ? inputUrl : `https://${inputUrl}`
    const domain = new URL(full).hostname
    if (domain) {
      customImageUrl.value = `https://api.iowen.cn/favicon/${domain}.png`
      iconMode.value = 'custom'
    }
  } catch {
    alert('请输入有效的网址 URL')
  }
}

function handleSave() {
  if (!title.value.trim() || !url.value.trim()) {
    return
  }

  const icon = currentIconData.value

  emit('save', {
    title: title.value.trim(),
    url: url.value.trim(),
    desc: desc.value.trim(),
    category: category.value,
    iconKind: icon.kind,
    iconValue: icon.value,
    iconBg: icon.bg,
  })

  handleClose()
}
</script>

<template>
  <div
    v-if="modelValue"
    class="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
    @click.self="handleClose"
  >
    <div
      class="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl max-w-lg w-full border border-white/50 p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200 my-8"
    >
      <!-- Modal Header -->
      <div class="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 class="font-bold text-slate-800 text-base flex items-center gap-2">
          <span class="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <span class="material-symbols-outlined text-[18px]">bookmark_add</span>
          </span>
          添加快捷网址卡片
        </h3>
        <button
          type="button"
          class="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
          @click="handleClose"
        >
          <span class="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      <!-- Live Preview Card Header -->
      <div class="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-inner">
        <!-- Squircle App Icon Preview -->
        <div
          class="w-12 h-12 rounded-2xl overflow-hidden shrink-0 shadow-icon border border-black/10 flex items-center justify-center bg-white"
          :class="currentIconData.bg"
        >
          <img
            v-if="currentIconData.kind === 'img'"
            :src="currentIconData.value"
            :alt="title || '预览'"
            class="w-full h-full object-cover rounded-2xl"
          />
          <span v-else class="text-white font-bold text-lg select-none">
            {{ currentIconData.value }}
          </span>
        </div>
        <div class="min-w-0 flex-1">
          <div class="font-bold text-sm text-slate-800 truncate">
            {{ title.trim() || '卡片名称预览' }}
          </div>
          <p class="text-[11px] text-slate-500 truncate mt-0.5">
            {{ desc.trim() || url.trim() || '在这里输入网站信息与自定义图标' }}
          </p>
        </div>
        <span class="text-[10px] px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 font-medium shrink-0">
          实时效果
        </span>
      </div>

      <!-- Form Fields -->
      <div class="space-y-3.5">
        <!-- Title & URL Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">网站名称 <span class="text-rose-500">*</span></label>
            <input
              v-model="title"
              class="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              placeholder="例如：知乎、豆包"
              type="text"
              autofocus
            />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">网址 URL <span class="text-rose-500">*</span></label>
            <input
              v-model="url"
              class="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              placeholder="https://"
              type="url"
            />
          </div>
        </div>

        <!-- Icon Settings Section -->
        <div>
          <div class="flex items-center justify-between mb-1.5">
            <label class="block text-xs font-semibold text-slate-700">卡片图标设置</label>
            <!-- Mode Switch Tabs -->
            <div class="flex items-center gap-1 p-0.5 rounded-lg bg-slate-100 text-[11px] select-none">
              <button
                type="button"
                class="px-2.5 py-1 rounded-md font-medium transition cursor-pointer"
                :class="[iconMode === 'preset' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900']"
                @click="iconMode = 'preset'"
              >
                热门应用
              </button>
              <button
                type="button"
                class="px-2.5 py-1 rounded-md font-medium transition cursor-pointer"
                :class="[iconMode === 'custom' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900']"
                @click="iconMode = 'custom'"
              >
                图片/上传
              </button>
              <button
                type="button"
                class="px-2.5 py-1 rounded-md font-medium transition cursor-pointer"
                :class="[iconMode === 'text' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900']"
                @click="iconMode = 'text'"
              >
                文字/首字
              </button>
            </div>
          </div>

          <!-- Mode 1: Preset App Icons Grid -->
          <div v-if="iconMode === 'preset'" class="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <div class="grid grid-cols-8 gap-2">
              <button
                v-for="(item, idx) in PRESET_ICONS"
                :key="item.name"
                type="button"
                class="relative aspect-square rounded-xl overflow-hidden border-2 transition-all hover:scale-105 cursor-pointer flex items-center justify-center bg-white shadow-xs"
                :class="[
                  selectedPresetIndex === idx
                    ? 'border-indigo-600 ring-2 ring-indigo-500/30'
                    : 'border-transparent hover:border-slate-300'
                ]"
                :title="item.name"
                @click="selectedPresetIndex = idx"
              >
                <img :src="item.src" :alt="item.name" class="w-full h-full object-cover" />
              </button>
            </div>
            <div class="text-[10px] text-slate-400 mt-1.5 text-center">
              点击上方热门原生 App 图标快速应用到新卡片
            </div>
          </div>

          <!-- Mode 2: Custom Image URL / Upload / Auto Favicon -->
          <div v-else-if="iconMode === 'custom'" class="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2.5">
            <div class="flex items-center gap-2">
              <input
                v-model="customImageUrl"
                class="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                placeholder="输入图片直链 URL (如 https://...)"
                type="url"
              />
              <button
                type="button"
                class="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer shrink-0"
                title="根据上方输入的网址自动提取站点图标"
                @click="handleAutoFetchFavicon"
              >
                提取图标
              </button>
              <button
                type="button"
                class="px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer shrink-0"
                @click="fileInputRef?.click()"
              >
                本地上传
              </button>
              <input
                ref="fileInputRef"
                type="file"
                accept="image/*"
                class="hidden"
                @change="handleFileUpload"
              />
            </div>
            <div class="text-[10px] text-slate-400">
              支持粘贴网络高清图片 URL、点击「提取图标」抓取网站图标，或点击「本地上传」直接选用本地图片文件。
            </div>
          </div>

          <!-- Mode 3: Text / Initial Letter with Color Palette -->
          <div v-else class="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2.5">
            <div class="flex items-center gap-3">
              <div class="w-24">
                <label class="block text-[10px] text-slate-500 mb-0.5">展示文字</label>
                <input
                  v-model="customLetter"
                  class="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 text-center font-bold"
                  maxlength="2"
                  :placeholder="(title.trim().charAt(0) || '网')"
                />
              </div>
              <div class="flex-1">
                <label class="block text-[10px] text-slate-500 mb-1">选择质感渐变底色</label>
                <div class="flex items-center gap-2">
                  <button
                    v-for="(grad, idx) in GRADIENTS"
                    :key="grad.label"
                    type="button"
                    class="w-7 h-7 rounded-lg transition cursor-pointer border-2"
                    :class="[
                      grad.class,
                      selectedGradientIndex === idx ? 'border-indigo-600 ring-2 ring-indigo-500/30 scale-110' : 'border-white'
                    ]"
                    :title="grad.label"
                    @click="selectedGradientIndex = idx"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Description & Category Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">描述备注 (选填)</label>
            <input
              v-model="desc"
              class="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              placeholder="简短的一句话说明"
              type="text"
            />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">所属分类</label>
            <select
              v-model="category"
              class="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer"
            >
              <option value="all">常用推荐</option>
              <option value="work">办公效率</option>
              <option value="ai">AI 助手</option>
              <option value="media">影音娱乐</option>
              <option value="social">社交资讯</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100">
        <button
          type="button"
          class="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          @click="handleClose"
        >
          取消
        </button>
        <button
          type="button"
          class="px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-md transition-colors cursor-pointer"
          @click="handleSave"
        >
          保存添加
        </button>
      </div>
    </div>
  </div>
</template>
