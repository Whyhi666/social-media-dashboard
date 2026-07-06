# 达人营销执行看板 (Influencer Marketing Execution Dashboard)

一个专为达人营销团队（媒介/市场）打造的现代化执行数据看板。该项目旨在解决资源触达不透明、流转节点卡顿、团队负载不均等痛点，提供实时的业务漏斗视图与数据追踪。

## 🌟 核心特性
- **双视角无缝切换**：支持“我的工作台”（个人聚焦）和“团队全局视图”（管理统筹）。
- **双角色适配**：支持“媒介”与“市场”业务流转节点的动态适配。
- **自定义组织架构筛选**：原生级别的多层级人员筛选下拉组件，支持部门全选、半选。
- **响应式负载图表**：自适应的横向滚动堆叠柱状图，清晰呈现团队工作流瓶颈。
- **动态业务漏斗**：实时监控从线索提报到财务打款的每一环转化率。

## 🛠 技术栈
- **核心框架**: React 18 + Vite
- **开发语言**: TypeScript
- **CSS 框架**: Tailwind CSS (原子化设计)
- **图表库**: Recharts
- **图标库**: Lucide React

## 🚀 快速开始

### 环境依赖
- Node.js >= 18
- npm / yarn / pnpm

### 安装与运行
```bash
# 克隆项目
git clone <repository-url>
cd <project-directory>

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 构建生产版本
```bash
npm run build
```

## 📁 目录结构说明
- `/src/components` - 核心业务与 UI 组件 (如 `TeamWorkloadChart`, `MemberSelect`, `WorkflowPipeline`)
- `/src/mockData.ts` - 包含组织架构与统计数据的 Mock 结构
- `/src/types.ts` - TypeScript 类型定义文件
- `/src/App.tsx` - 主应用入口与全局状态管理 (`viewMode`, `role`, `selectedMemberIds`)
- `/PRD.md` - 产品需求说明文档
- `/PROJECT_HANDOVER.md` - 项目核心设计与组件开发约束文档（接手必读）

## ⚠️ 贡献与开发须知
如果您（或 AI 大模型）准备继续开发本项目，**请务必优先阅读 [`PROJECT_HANDOVER.md`](./PROJECT_HANDOVER.md)**，其中包含了项目核心架构的约束与防坑指南，特别是关于 `MemberSelect` 多选逻辑和图表自适应滚动的特定实现。
