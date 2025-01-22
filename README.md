# PC-KB 知识库

<div align="center">

一个现代化的电脑维修知识分享平台

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC)
![SQLite](https://img.shields.io/badge/SQLite-3-003B57)

</div>

## ✨ 特性

- 🔍 **智能搜索系统**
  - 基于 SQLite FTS5 的全文检索功能
  - 支持中文分词搜索
  - 智能相关性排序
  - 搜索结果缓存优化
  - 搜索建议和自动补全
  - 搜索历史记录功能

- 📚 **分类知识库**
  - 层级化的内容组织
  - 硬件维修、系统维护等分类
  - 标签系统支持
  - 相关文章推荐
  - 文章阅读进度追踪
  - 文章收藏功能

- 🎯 **内容管理**
  - 基于 SQLite + Drizzle ORM
  - 类型安全的数据操作
  - 自动数据验证
  - 版本控制支持
  - 文章草稿功能
  - 定时发布支持

- 📱 **现代化界面**
  - 基于 Next.js 14 App Router
  - 响应式设计适配多端
  - 优雅的动画效果
  - 深色模式支持
  - 自定义主题配置
  - 键盘快捷操作

- ⚡️ **高性能**
  - React Server Components
  - 数据预取和缓存
  - 路由预加载
  - 增量静态再生成
  - 图片自动优化
  - 智能代码分割

- 🎨 **精美设计**
  - Shadcn UI 组件库
  - Radix UI 无障碍支持
  - Tailwind CSS 原子化样式
  - Lucide Icons 图标库
  - 自适应布局
  - 主题切换动画

## 🚀 快速开始

### 环境要求

- Node.js 18.0 或更高版本
- npm 9.0 或更高版本
- SQLite 3.0 或更高版本

### 安装步骤

1. 克隆项目
```bash
git clone https://github.com/yourusername/PC-KB.git
cd PC-KB
```

2. 安装依赖
```bash
npm install
```

3. 配置环境变量
```bash
cp .env.example .env.local
```
根据需要修改 .env.local 中的配置

4. 初始化数据库
```bash
npx drizzle-kit push:sqlite
npm run db:seed  # 可选：填充示例数据
```

5. 启动开发服务器
```bash
npm run dev
```

6. 在浏览器中打开 [http://localhost:3000](http://localhost:3000)

## 📦 项目结构

```
src/
  ├── app/                # Next.js 14 App Router
  │   ├── page.tsx       # 首页
  │   ├── layout.tsx     # 根布局
  │   └── ...           # 其他页面
  ├── components/        # React 组件
  │   ├── home/         # 首页相关组件
  │   ├── ui/           # 通用UI组件
  │   └── ...          # 其他组件
  ├── lib/              # 工具函数
  │   ├── search.ts     # 搜索功能
  │   └── ...          # 其他工具
  ├── db/               # 数据库相关
  │   ├── index.ts      # 数据库配置
  │   ├── schema.ts     # 数据模型
  │   └── seed.ts       # 示例数据
  └── types/            # TypeScript 类型定义
```

## 🛠️ 技术栈

### 前端框架
- [Next.js 14](https://nextjs.org/) - React 框架
  - App Router - 基于文件系统的路由
  - React Server Components - 减少客户端 JavaScript
  - 服务端渲染 (SSR) - 提升首屏加载速度
  - 静态站点生成 (SSG) - 优化静态内容
  - 增量静态再生成 (ISR) - 定期更新内容

### UI 框架
- [Tailwind CSS](https://tailwindcss.com/) - 原子化 CSS
- [Shadcn/ui](https://ui.shadcn.com/) - 可定制组件库
- [Radix UI](https://www.radix-ui.com/) - 无障碍组件
- [Framer Motion](https://www.framer.com/motion/) - 动画库
- [Lucide Icons](https://lucide.dev/) - 图标库

### 数据库和搜索
- [SQLite](https://www.sqlite.org/) - 轻量级数据库
  - FTS5 - 全文搜索引擎
  - JSON1 - JSON 支持
- [Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM

### 开发工具
- [TypeScript](https://www.typescriptlang.org/) - 类型检查
- [ESLint](https://eslint.org/) - 代码检查
- [Prettier](https://prettier.io/) - 代码格式化
- [PostCSS](https://postcss.org/) - CSS 处理器

## 📝 功能列表

### 已实现功能
- ✅ 响应式布局
- ✅ 文章搜索
- ✅ 分类浏览
- ✅ 工具下载
- ✅ 最新更新
- ✅ 深色模式
- ✅ 文章收藏
- ✅ 阅读进度
- ✅ 搜索历史
- ✅ 快捷键支持

### 开发中功能
- 🚧 用户评论系统
- 🚧 文章分享功能
- 🚧 数据统计面板


## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 📄 许可证

本项目采用 Apache License 2.0 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 鸣谢

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [Drizzle ORM](https://orm.drizzle.team/)

---

<div align="center">
Made with ❤️ by QiannanYou
</div>

## 功能特点

### 1. 内容管理
- 文章管理：支持内部文章和外部文章的发布与管理
- 分类系统：多层级的文章分类，方便内容组织
- 工具库：提供专业维修工具的下载和使用指南
- 实时更新：展示最新的文章和工具更新

### 2. 用户体验
- 深色模式：支持浅色/深色主题切换，自动跟随系统设置
- 响应式设计：完美适配桌面端和移动端
- 搜索功能：支持全站内容搜索，包括文章、工具和分类
- 面包屑导航：清晰的页面层级导航

### 3. 性能优化
- 服务器端渲染：使用 Next.js 14 的 App Router
- 数据缓存：使用 Next.js 的缓存机制优化数据加载
- 增量静态再生成：自动更新静态页面内容
- 图片优化：自动的图片优化和懒加载

### 4. 界面设计
- 现代化UI：使用 Tailwind CSS 构建的清新界面
- 平滑过渡：页面切换和主题切换的流畅动画
- 交互反馈：清晰的操作反馈和状态提示
- 无障碍支持：符合 WCAG 标准的可访问性设计

## 技术栈

- **前端框架**: Next.js 14
- **样式方案**: Tailwind CSS
- **数据库**: DrizzleORM + SQLite
- **状态管理**: React Hooks
- **UI组件**: 
  - Lucide Icons：图标库
  - Framer Motion：动画效果
  - next-themes：主题切换

## 开发环境设置

1. 克隆仓库：
```bash
git clone [仓库地址]
cd PC-KB
```

2. 安装依赖：
```bash
npm install
```

3. 启动开发服务器：
```bash
npm run dev
```

4. 访问 [http://localhost:3000](http://localhost:3000)

## 项目结构

```
src/
├── app/                # Next.js 14 App Router 页面
├── components/         # React 组件
├── db/                # 数据库配置和模型
├── lib/               # 工具函数和服务
└── types/             # TypeScript 类型定义
```

## 主要功能说明

### 深色模式
- 支持手动切换深色/浅色主题
- 自动跟随系统主题设置
- 所有组件和页面都适配深色模式
- 主题切换时平滑过渡
- 自定义主题色彩
- 主题持久化存储

### 搜索功能
- 支持多类型内容搜索（文章/工具/分类）
- 实时搜索结果展示
- 搜索结果高亮显示
- 支持按类型筛选结果
- 搜索历史记录
- 智能搜索建议

### 文章系统
- 支持 Markdown 格式
- 支持外部文章链接
- 文章分类管理
- 阅读时间估算
- 阅读进度保存
- 文章收藏功能
- 相关文章推荐

### 工具库
- 工具下载统计
- 版本管理
- 使用指南
- 分类展示
- 工具评分系统
- 使用教程

## 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 联系方式

- 项目维护者：广州南方学院PC志愿者服务队
- 邮箱：[邮箱地址]
