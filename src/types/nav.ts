export interface NavItem {
  id: string
  title: string
  description: string
  url: string
  internalUrl?: string
  icon?: string
  categoryId: string
  tags?: string[]
  isFavorite?: boolean
  badge?: {
    text: string
    color?: 'emerald' | 'blue' | 'purple' | 'amber' | 'rose'
  }
  sortOrder?: number
  createdAt?: string
  updatedAt?: string
}

export interface NavCategory {
  id: string
  name: string
  icon?: string
  description?: string
  sortOrder: number
}

export interface SearchFilterState {
  keyword: string
  categoryId: string | null
  tag: string | null
  onlyFavorites: boolean
}

export type ThemeMode = 'light' | 'dark' | 'system'

export interface ToastMessage {
  id: string
  type: 'success' | 'info' | 'warning' | 'error'
  title: string
  message?: string
  duration?: number
}

export interface NavBackupData {
  version: number
  exportDate: string
  categories: NavCategory[]
  items: NavItem[]
}
