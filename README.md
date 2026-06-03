# ChingLish Generator - 中式英语生成器

一个有趣的工具，将中文转换为带有中式表达习惯的英语译文，支持案例展示和对比学习。

## 功能特性

- **智能翻译**：将中文句子转换为带有中式英语特色的译文
- **案例展示**：提供丰富的中式英语案例供学习参考
- **对比学习**：支持原文与译文的对比显示
- **历史记录**：保存翻译历史，方便回顾和学习
- **响应式设计**：支持桌面和移动设备

## 技术栈

- **框架**: React 18 + TypeScript
- **构建工具**: Vite 6
- **样式**: Tailwind CSS 3
- **状态管理**: Zustand
- **路由**: React Router DOM
- **图标**: Lucide React

## 项目结构

```
.
├── chinglish-generator/    # 主应用目录
│   ├── src/
│   │   ├── components/     # UI 组件
│   │   ├── pages/          # 页面组件
│   │   ├── hooks/          # 自定义 Hooks
│   │   ├── store/          # 状态管理
│   │   ├── utils/          # 工具函数
│   │   └── lib/            # 通用库
│   ├── public/             # 静态资源
│   └── dist/               # 构建输出
├── .github/workflows/      # CI/CD 配置
├── vercel.json            # Vercel 部署配置
└── deploy.sh              # 部署脚本
```

## 快速开始

### 安装依赖

```bash
cd chinglish-generator
npm ci
```

### 开发模式

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

### 代码检查

```bash
npm run lint
npm run check
```

## 部署

### Vercel 部署

项目已配置 `vercel.json`，可直接在 Vercel 上部署：

```bash
# 登录 Vercel
npx vercel login

# 部署到生产环境
npx vercel deploy --prod
```

### GitHub Pages 部署

项目配置了 GitHub Actions，推送代码到 `main` 分支会自动部署到 GitHub Pages。

## 使用说明

1. **翻译页面**: 在输入框中输入中文句子，点击生成按钮获取中式英语译文
2. **案例页面**: 浏览预设的中式英语案例，学习常见的中式表达
3. **历史页面**: 查看之前的翻译记录，方便复习

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License
