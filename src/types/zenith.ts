export type BrandIconKey =
  | 'github'
  | 'figma'
  | 'chatgpt'
  | 'notion'
  | 'vercel'
  | 'juejin'
  | 'dribbble'
  | 'sspai'
  | 'bilibili'
  | 'zhihu'
  | 'v2ex'
  | 'custom'

export interface ZenithCard {
  id: string
  title: string
  description: string
  url: string
  iconKey: BrandIconKey
  customIcon?: string
  iconBg?: string
  categoryId: string
  isPinned?: boolean
  sortOrder: number
}

export interface ZenithCategory {
  id: string
  name: string
  sortOrder: number
}

export interface SearchEngine {
  id: string
  name: string
  icon: string
  searchUrl: string
  placeholder: string
}

export interface WeatherData {
  temperature: number
  condition: string
  icon: string
  city: string
}

export interface FocusStats {
  days: number
  startDate: string
  focusMinutesToday: number
  todosCount: number
}

export interface TodoItem {
  id: string
  title: string
  completed: boolean
}

export interface AiChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}
