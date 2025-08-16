# Mouse Home - 官网主页

一个使用 React + Vite + Tailwind CSS 4 + Biome 构建的现代化官网主页。

## 技术栈

- **React 19** - 用户界面框架
- **TypeScript** - 类型安全
- **Vite** - 快速构建工具
- **Tailwind CSS 4** - 原子化 CSS 框架
- **Biome** - 代码格式化和 Linting 工具

## 功能特性

- 🎨 现代化响应式设计
- ✨ 流畅的动画效果
- 📱 移动端友好
- 🎯 无障碍设计
- 🚀 快速加载性能
- 🛡️ TypeScript 类型安全

## 项目结构

```
src/
├── components/          # React 组件
│   ├── Hero.tsx        # 首屏英雄区域
│   ├── Features.tsx    # 功能特性展示
│   ├── Contact.tsx     # 联系表单
│   └── Footer.tsx      # 页脚
├── App.tsx             # 主应用组件
├── main.tsx            # 应用入口
└── index.css           # 全局样式
```

## 开发命令

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览生产构建
pnpm preview

# 代码格式化
pnpm format

# 代码检查
pnpm lint:check

# 代码检查并修复
pnpm lint
```

## 开发服务器

开发服务器运行在 http://localhost:5173

## 部署

项目使用 Vite 构建，生成的静态文件位于 `dist` 目录，可以部署到任何静态文件托管服务。

## 自定义配置

### Tailwind CSS
- 配置文件: `vite.config.ts` 中集成
- 样式文件: `src/index.css`

### Biome
- 配置文件: `biome.json`
- 支持格式化和 Linting
- 已配置 React 相关规则

### TypeScript
- 配置文件: `tsconfig.json` 和 `tsconfig.app.json`
- 严格类型检查
- 现代 ES 模块支持