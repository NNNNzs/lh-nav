# lh-nav

基于 Vue 3 + TypeScript + Vite + Tailwind CSS 的轻量现代化项目。

## 技术栈

- **框架**: Vue 3 (`<script setup>` + Composition API)
- **语言**: TypeScript
- **构建工具**: Vite
- **样式方案**: Tailwind CSS v4 (`@tailwindcss/vite`)
- **包管理器**: pnpm

## 常用脚本

```bash
# 安装依赖
pnpm install

# 启动本地开发服务器
pnpm dev

# 类型检查并打包
pnpm build

# 本地预览打包产物
pnpm preview
```

## 工程化配置

- **路径别名**: `@/*` 映射至 `./src/*`（在 `vite.config.ts` 与 `tsconfig.app.json` 中已同步配置）。
- **Tailwind CSS**: 采用 Tailwind CSS v4 官方 Vite 插件，开箱即用。
