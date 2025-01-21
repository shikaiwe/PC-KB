# PC-KB 知识库

<div align="center">

一个现代化的电脑维修知识分享平台

</div>

## ✨ 特性

- 🔍 智能搜索系统：基于 SQLite FTS5 的全文检索功能，支持中文搜索，快速定位所需知识内容
- 📚 分类知识库：按分类组织的知识内容，包含硬件维修、系统维护等各类技术文档
- 🎯 内容管理：基于 SQLite + Drizzle ORM 的高效内容管理系统
- 📱 响应式设计：基于 Next.js 14 App Router 和 Tailwind CSS 构建的现代化界面
- ⚡️ 高性能：服务端组件渲染，路由预加载，极致的用户体验
- 🎨 精美界面：集成 Shadcn UI 和 Radix UI，提供美观的用户界面

## 🚀 快速开始

1. 克隆项目
```bash
git clone https://github.com/yourusername/PC-KB.git
cd PC-KB
```

2. 安装依赖
```bash
npm install
```

3. 初始化数据库
```bash
npx drizzle-kit push:sqlite
```

4. 启动开发服务器
```bash
npm run dev
```

5. 在浏览器中打开 [http://localhost:3000](http://localhost:3000)

## 🛠️ 技术栈

### 前端框架和路由
- [Next.js 14](https://nextjs.org/) - React 框架
  - App Router - 基于文件系统的路由
  - 服务端组件 (RSC) - 减少客户端 JavaScript 体积
  - 服务端渲染 (SSR) - 提升首屏加载速度
  - 路由预加载 - 实现快速页面切换

### 样式和 UI
- [Tailwind CSS](https://tailwindcss.com/) - 原子化 CSS 框架
  - JIT 编译 - 按需生成样式
  - 响应式设计 - 完美适配多端显示
- [Shadcn/ui](https://ui.shadcn.com/) - 可定制的组件库
  - 无样式组件 - 高度可定制
  - 深色模式支持 - 自适应主题切换
- [Radix UI](https://www.radix-ui.com/) - 无障碍设计组件
  - 符合 WAI-ARIA 标准
  - 键盘导航支持
- [Lucide Icons](https://lucide.dev/) - 图标库
  - SVG 图标 - 清晰且可缩放
  - 一致的设计风格

### 数据库和搜索
- [SQLite](https://www.sqlite.org/) - 轻量级数据库
  - FTS5 全文搜索 - 支持中文分词
  - 零配置 - 无需额外服务器
  - 文件型数据库 - 易于部署和备份
- [Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM
  - 类型安全 - 完整的 TypeScript 支持
  - 迁移工具 - 自动生成迁移文件
  - 查询构建器 - 直观的 API 设计

### 工具链
- [TypeScript](https://www.typescriptlang.org/) - 类型安全的 JavaScript 超集
  - 静态类型检查
  - 智能提示和自动补全
  - 代码重构支持
- [ESLint](https://eslint.org/) - 代码质量检查
  - 代码风格统一
  - 潜在问题检测
  - 最佳实践建议
- [Prettier](https://prettier.io/) - 代码格式化
  - 自动格式化
  - 支持多种语言
  - 可配置的格式规则
- [PostCSS](https://postcss.org/) - CSS 后处理器
  - 自动添加浏览器前缀
  - CSS 变量支持
  - 现代 CSS 特性转换

## 📝 许可证

本项目采用 Apache License 2.0 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

<div align="center">
Made with ❤️ by QiannanYou!
</div>
