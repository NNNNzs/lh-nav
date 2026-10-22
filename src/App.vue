<script setup lang="ts">
import { ref } from 'vue'
import ToastContainer from '@/components/common/ToastContainer.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import CategoryManageModal from '@/components/modal/CategoryManageModal.vue'
import DataBackupModal from '@/components/modal/DataBackupModal.vue'
import ItemEditModal from '@/components/modal/ItemEditModal.vue'
import CategorySection from '@/components/nav/CategorySection.vue'
import EmptyState from '@/components/nav/EmptyState.vue'
import SearchBar from '@/components/search/SearchBar.vue'
import SearchSpotlightModal from '@/components/search/SearchSpotlightModal.vue'
import { useNavigationData } from '@/composables/useNavigationData'
import { useTheme } from '@/composables/useTheme'
import { useToast } from '@/composables/useToast'
import type { NavItem } from '@/types/nav'

// Initialize Theme
useTheme()

// Initialize Navigation Data Composable
const {
  categories,
  items,
  filters,
  filteredItems,
  groupedCategories,
  allTags,
  categoryCountMap,
  statistics,
  addItem,
  updateItem,
  deleteItem,
  toggleFavorite,
  addCategory,
  updateCategory,
  deleteCategory,
  setCategoryFilter,
  setTagFilter,
  toggleFavoriteFilter,
  resetFilters,
  exportBackup,
  importBackup,
  resetToDefault,
} = useNavigationData()

const { success } = useToast()

// UI state
const isSidebarOpen = ref(false)
const isSpotlightOpen = ref(false)
const isItemModalOpen = ref(false)
const isCategoryModalOpen = ref(false)
const isBackupModalOpen = ref(false)

const editingItem = ref<NavItem | null>(null)
const prefillCategoryId = ref<string | null>(null)

// Item modal openers
function openCreateItem(categoryId?: string): void {
  editingItem.value = null
  prefillCategoryId.value = categoryId || null
  isItemModalOpen.value = true
}

function openEditItem(item: NavItem): void {
  editingItem.value = item
  prefillCategoryId.value = item.categoryId
  isItemModalOpen.value = true
}

function handleSaveItem(itemData: Omit<NavItem, 'id' | 'createdAt' | 'updatedAt'>, id?: string): void {
  if (id) {
    updateItem(id, itemData)
    success('站点修改成功')
  } else {
    addItem(itemData)
    success('站点添加成功')
  }
}

function handleDeleteItem(id: string): void {
  if (window.confirm('确定要删除该导航站点吗？')) {
    deleteItem(id)
    success('站点已删除')
  }
}
</script>

<template>
  <div class="min-h-screen bg-slate-50/80 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
    <!-- Header -->
    <AppHeader
      :is-sidebar-open="isSidebarOpen"
      :total-items="statistics.totalItems"
      @toggle-sidebar="isSidebarOpen = !isSidebarOpen"
      @open-spotlight="isSpotlightOpen = true"
      @open-add-item="openCreateItem()"
      @open-manage-category="isCategoryModalOpen = true"
      @open-backup="isBackupModalOpen = true"
    />

    <!-- Main Container with Sidebar -->
    <div class="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex gap-8 pt-6">
      <!-- Sidebar -->
      <AppSidebar
        :is-open="isSidebarOpen"
        :categories="categories"
        :category-count-map="categoryCountMap"
        :active-category-id="filters.categoryId"
        :only-favorites="filters.onlyFavorites"
        :total-items="statistics.totalItems"
        :total-favorites="statistics.totalFavorites"
        @close="isSidebarOpen = false"
        @select-category="setCategoryFilter($event)"
        @select-favorites="toggleFavoriteFilter"
        @open-manage-category="isCategoryModalOpen = true"
      />

      <!-- Content Area -->
      <main class="flex-1 min-w-0 space-y-8">
        <!-- Top Search & Filter Bar -->
        <SearchBar
          v-model:keyword="filters.keyword"
          :active-tag="filters.tag"
          :only-favorites="filters.onlyFavorites"
          :all-tags="allTags"
          :total-matches="filteredItems.length"
          @clear-tag="setTagFilter(null)"
          @select-tag="setTagFilter($event)"
          @toggle-favorites="toggleFavoriteFilter"
          @open-spotlight="isSpotlightOpen = true"
        />

        <!-- Category Sections -->
        <div v-if="groupedCategories.length > 0" class="space-y-12">
          <CategorySection
            v-for="group in groupedCategories"
            :key="group.category.id"
            :category="group.category"
            :items="group.items"
            @add-item="openCreateItem($event)"
            @edit-item="openEditItem($event)"
            @delete-item="handleDeleteItem($event)"
            @toggle-favorite="toggleFavorite($event)"
            @filter-tag="setTagFilter($event)"
          />
        </div>

        <!-- Empty State -->
        <EmptyState
          v-else
          title="未找到匹配的站点"
          description="尝试调整搜索关键词、清除分类筛选或特别收藏过滤"
          @reset="resetFilters"
        />
      </main>
    </div>

    <!-- Footer -->
    <AppFooter
      :total-categories="statistics.totalCategories"
      :total-items="statistics.totalItems"
      :total-favorites="statistics.totalFavorites"
      @open-backup="isBackupModalOpen = true"
    />

    <!-- Modals -->
    <ItemEditModal
      v-model="isItemModalOpen"
      :categories="categories"
      :editing-item="editingItem"
      :default-category-id="prefillCategoryId"
      @save="handleSaveItem"
    />

    <CategoryManageModal
      v-model="isCategoryModalOpen"
      :categories="categories"
      :category-count-map="categoryCountMap"
      @add-category="addCategory"
      @update-category="updateCategory"
      @delete-category="deleteCategory"
    />

    <DataBackupModal
      v-model="isBackupModalOpen"
      :export-data="exportBackup"
      :import-data="importBackup"
      :reset-to-default="resetToDefault"
    />

    <SearchSpotlightModal
      v-model="isSpotlightOpen"
      :items="items"
      :categories="categories"
    />

    <!-- Global Toasts -->
    <ToastContainer />
  </div>
</template>
