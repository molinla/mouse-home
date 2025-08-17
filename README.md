# Mouse Home

一个使用 React + TypeScript + Vite 构建的现代化 Web 应用程序。

## 🚀 特性

- ⚡️ **Vite** - 快速的构建工具和开发服务器
- ⚛️ **React 19** - 最新版本的 React
- 🔷 **TypeScript** - 类型安全的 JavaScript
- 🎨 **TailwindCSS** - 实用优先的 CSS 框架
- 🎭 **Framer Motion** - 强大的动画库
- ✨ **GSAP** - 专业级动画库
- 🎯 **HeroUI** - 现代化 UI 组件库
- 📦 **pnpm** - 快速、节省磁盘空间的包管理器

## 📦 安装

首先克隆仓库：

```bash
git clone https://github.com/你的用户名/mouse-home.git
cd mouse-home
```

安装依赖：

```bash
# 使用 pnpm (推荐)
pnpm install

# 或者使用 npm
npm install
```

## 🛠️ 开发

启动开发服务器：

```bash
pnpm dev
```

打开浏览器访问 [http://localhost:5173](http://localhost:5173)

## 🏗️ 构建

构建生产版本：

```bash
pnpm build
```

本地预览构建结果：

```bash
pnpm preview
```

## 🚀 部署

项目配置了自动部署到 GitHub Pages：

1. 每次推送到 `main` 分支时，GitHub Actions 会自动构建并部署
2. 部署后的网站可在以下地址访问：`https://你的用户名.github.io/mouse-home/`

### 手动部署步骤

如果需要手动配置部署：

1. 在 GitHub 仓库中进入 **Settings** → **Pages**
2. Source 选择 **GitHub Actions**
3. 推送代码到 `main` 分支即可触发自动部署

## 📂 项目结构

```
mouse-home/
├── public/                 # 静态资源
├── src/
│   ├── assets/            # 资源文件
│   │   ├── fonts/         # 字体文件
│   │   ├── icons/         # 图标
│   │   └── imgs/          # 图片
│   ├── components/        # React 组件
│   ├── hero-sections/     # Hero 区域组件
│   ├── App.tsx           # 主应用组件
│   ├── main.tsx          # 应用入口
│   └── index.css         # 全局样式
├── .github/
│   └── workflows/        # GitHub Actions 工作流
├── vite.config.ts        # Vite 配置
└── package.json          # 项目配置
```

## 🛠️ 技术栈

- **前端框架**: React 19
- **开发语言**: TypeScript
- **构建工具**: Vite
- **样式框架**: TailwindCSS
- **动画库**: Framer Motion, GSAP
- **UI 组件**: HeroUI
- **3D 渲染**: OGL
- **代码规范**: Biome
- **包管理**: pnpm

## 📋 可用脚本

- `pnpm dev` - 启动开发服务器
- `pnpm build` - 构建生产版本
- `pnpm preview` - 预览构建结果

## 🤝 贡献

欢迎提交 Pull Request 或 Issue！

## 📄 许可证

[MIT](LICENSE)
