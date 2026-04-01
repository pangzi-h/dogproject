# Web 前端工作区指南

本指南适用于 `web/` 目录下的 React + TypeScript 前端项目。

## 技术栈

| 分类 | 技术 |
|------|------|
| 框架 | React 19 + TypeScript |
| 构建 | Vite 8 |
| 请求库 | Axios |
| 服务端状态管理 | TanStack Query (v5) |
| UI 组件库 | shadcn/ui（基于 Radix UI + Tailwind CSS） |
| 代码规范 | ESLint + typescript-eslint |

## 目录结构约定

```
src/
├── api/           # Axios 实例及各模块请求函数（按业务模块拆分文件）
├── hooks/         # 自定义 React Hooks，TanStack Query 封装放在此处
├── components/    # 可复用 UI 组件，shadcn/ui 生成组件放在 components/ui/
├── pages/         # 路由页面组件
├── lib/           # 工具函数、shadcn/ui 的 cn() 等辅助方法
├── types/         # 全局 TypeScript 类型定义
└── store/         # 客户端全局状态（若使用 Zustand 等）
```

## 请求与数据获取

### Axios 封装
- 统一在 `src/api/` 下创建 Axios 实例，配置 `baseURL`、请求/响应拦截器（token 注入、错误处理）。
- 每个业务模块单独一个文件（如 `src/api/user.ts`、`src/api/booking.ts`）。
- API 函数返回 Promise，**不要**在函数内部直接调用 TanStack Query。

### TanStack Query
- Query/Mutation 封装统一放在 `src/hooks/` 目录，文件命名为 `use<Resource>.ts`（如 `useUser.ts`）。
- `queryKey` 使用数组形式，第一个元素为资源名字符串常量（如 `['users', userId]`）。
- 使用 `QueryClient` 实例时通过 `useQueryClient()` Hook 获取，不要直接 import 实例。
- 在 `main.tsx` 中配置 `QueryClientProvider`，`staleTime` 默认设为 `1000 * 60`（1 分钟）。

## UI 组件

### shadcn/ui
- 通过 CLI 添加组件：`npx shadcn@latest add <component>`，组件文件生成在 `src/components/ui/`。
- 不要手动修改 `components/ui/` 下由 shadcn/ui 生成的文件，通过覆写 CSS 变量或在外层封装来定制样式。
- 工具类函数 `cn()` 放在 `src/lib/utils.ts`，通过 `import { cn } from '@/lib/utils'` 引用。
- 路径别名 `@` 已映射到 `src/`，在 `vite.config.ts` 和 `tsconfig.app.json` 中均需配置。

## TypeScript 规范

- 所有组件 Props 使用 `interface` 定义，避免使用 `any`。
- API 响应类型定义在 `src/types/` 目录下，与业务模块对应。
- 使用 `React.FC` 时显式声明 Props 类型，或直接在函数参数中解构并标注类型。

## 表单规范

- 所有表单提交按钮必须做**防抖处理**（使用 `useDebouncedCallback` 或 `lodash.debounce`）。
- 推荐使用 React Hook Form + Zod 做表单验证与类型推断。

## 构建与开发命令

```bash
# 安装依赖（国内镜像）
npm config set registry https://registry.npmmirror.com
npm install

# 本地开发
npm run dev

# 类型检查 + 构建
npm run build

# 代码检查
npm run lint
```

## 相关文档

- 详细 PRD 需求：[docs/](../docs/)
- 后端 API 接口：[docs/backend/README.md](../docs/backend/README.md)
- 前端整体规划：[docs/frontend/README.md](../docs/frontend/README.md)
- 前端执行方案：[specs/004-pet-boarding-frontend/plan.md](../specs/004-pet-boarding-frontend/plan.md)
