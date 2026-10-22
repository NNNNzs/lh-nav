export type ZenithCategoryKey = 'all' | 'work' | 'ai' | 'media' | 'social'

export type IconKind = 'img' | 'svg' | 'material' | 'text'

export interface ZenithBookmark {
  id: string
  title: string
  desc: string
  url: string
  category: ZenithCategoryKey
  iconKind: IconKind
  iconValue: string
  iconBg?: string
  isPinned: boolean
}

export interface ZenithEngine {
  id: string
  name: string
  icon: string
  iconBg: string
  url: string
  param: string
  shortcutKey: string
}

export interface ZenithCategoryTab {
  id: ZenithCategoryKey
  name: string
  count?: number
}

export interface HotShortcut {
  label: string
  url: string
}

export interface ZenithWallpaperItem {
  id: string
  name: string
  category: 'nature' | 'universe' | 'urban' | 'abstract'
  url: string
}
