# 达人营销执行看板 (Influencer Marketing Execution Dashboard)

一个专为达人营销团队（媒介/市场）打造的现代化执行数据看板。该项目旨在解决资源触达不透明、流转节点卡顿、团队负载不均等痛点，提供实时的业务漏斗视图与数据追踪。

## 🌟 核心特性
- **双视角无缝切换**：支持“我的工作台”（个人聚焦）和“团队全局视图”（管理统筹）。
- **双角色适配**：支持“媒介”与“市场”业务流转节点的动态适配，StatCard 按岗位差异化展示。
- **组织架构筛选**：按角色显示对应部门成员，支持全选/半选，权限提示独立展示。
- **响应式负载图表**：自适应横向滚动的堆叠柱状图，清晰呈现团队工作流瓶颈。
- **业务流转链路**：三阶段（投放前/中/后）链路，区分我处理/待对方，点击节点查看积压明细。
- **执行趋势**：提报数/执行数/确认合作三条线，支持 7d/14d/30d 切换。
- **招募任务进度**：漏斗数据（提报/报价/确认合作/执行）+ 我的待办/本组待办展开。
- **字段说明入口**：顶部导航一键查看各模块指标含义与统计口径。

## 🛠 技术栈
- **核心框架**: React 19 + Vite
- **开发语言**: TypeScript
- **CSS 框架**: Tailwind CSS (原子化设计，亮色 slate 主题)
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

### 构建与检查
```bash
npm run build    # 生产构建
npm run lint     # TypeScript 类型检查
```

## 📁 目录结构说明
- `/src/components` - 核心业务组件
  - `StatCard` 资源池与触达数据（按岗位差异化）
  - `TrendChart` 执行趋势（7d/14d/30d）
  - `TeamWorkloadChart` 团队负载堆叠柱状图
  - `WorkflowPipeline` + `StageDetailModal` 业务流转链路 + 节点明细
  - `TaskProgressTable` 招募任务进度
  - `MemberSelect` 组织架构成员筛选
  - `PersonalMemo` 工作备忘
  - `FieldDocModal` 字段说明模态框
  - `Skeleton` 骨架屏/空状态/错误状态
- `/src/fieldDoc.ts` - 字段说明文档数据（各模块指标含义与口径）
- `/src/mockData.ts` - Mock 数据与聚合函数
- `/src/types.ts` - TypeScript 类型定义
- `/src/App.tsx` - 主应用入口（viewMode/role/selectedMemberIds 三态驱动）
- `/PRD.md` - 产品需求说明文档
- `/PROJECT_HANDOVER.md` - 项目核心设计与组件开发约束文档（接手必读）
- `/AI_WORKING_NOTES.md` - AI 协作注意事项与防坑经验（接手必读）
- `/EXPERT_REVIEW.md` - 专家评估报告与处理决议

## ⚠️ 贡献与开发须知
如果您（或 AI 大模型）准备继续开发本项目，**请务必优先阅读 [`PROJECT_HANDOVER.md`](./PROJECT_HANDOVER.md) 与 [`AI_WORKING_NOTES.md`](./AI_WORKING_NOTES.md)**：前者包含项目核心架构约束与防坑指南（`MemberSelect` 多选逻辑、`TeamWorkloadChart` 自适应滚动、`WorkflowPipeline` 三阶段链路等组件的特定实现约束），后者总结 AI 协作易错点（查 git 历史而非只看 HEAD、不编造数据迁就错误代码、验证而非推断、提交卫生等）。
