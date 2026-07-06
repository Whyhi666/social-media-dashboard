# 达人营销执行看板 (Influencer Marketing Execution Dashboard)
**—— AI 跨模型开发交接与核心设计约束文档**

> **⚠️ 致接手的 AI 模型：**
> 本文档包含了该项目演进过程中的所有核心设计决策、组件通信逻辑以及为避免常规 UI 缺陷而做的特殊处理。**在修改任何代码前，请务必仔细阅读本文档的第 3、4、5 节，严禁使用通用模板覆盖已有的精细化定制逻辑。**

---

## 1. 项目概览 (Project Overview)
本项目是一个为达人营销团队（涵盖“媒介”与“市场”双重角色）打造的执行看板。旨在解决资源触达不透明、流转节点卡顿、团队负载不均等痛点。项目支持 **个人/团队双视角切换** 与 **媒介/市场双角色切换**。

- **前端技术栈**：React 18 + TypeScript + Vite
- **样式库**：Tailwind CSS (原子化设计，无外部 CSS 文件)
- **图表库**：Recharts
- **图标库**：Lucide React

---

## 2. 核心状态与全局联动逻辑 (Core State & Data Flow)

项目的入口与状态枢纽在 `src/App.tsx`，维护了以下三个决定整个页面数据形态的核心 State：

1. **`viewMode` ('self' | 'team')**：控制当前是“我的工作台”还是“团队全局视图”。
   - 当切换为 `'self'` 时，右侧的“成员筛选”下拉框会被隐藏（透明度渐变 + 指针穿透 `pointer-events-none`）。
   - 图表区的 `TeamWorkloadChart` 会被替换为 `PersonalMemo`。
2. **`role` ('media' | 'marketing')**：控制当前看板的业务视角。
   - 媒介视角和市场视角的业务流转节点完全不同（媒介重执行、催稿、打款；市场重提报、审批、审稿）。这会直接决定下发给底层组件（如图表、漏斗）的 Keys 和 Colors。
3. **`selectedMemberIds` (string[])**：团队成员的多选状态。
   - 这是一个数组，存储了选中的人员 ID。
   - 数据源严格依赖 `mockOrganization`（树状组织架构）。

---

## 3. 关键组件级设计约束（🚨 严禁破坏的设计）

### 3.1 组织架构多选组件 (`src/components/MemberSelect.tsx`)
**设计背景**：原生的 `<select multiple>` 体验极差且不支持树形结构的半选/全选联动。因此我们手写了带 DOM 原生级点击外部关闭 (`click-outside`) 的自定义下拉组件。

**核心约束（Do NOT Break）**：
- **数据结构依赖**：严格依赖 `mockOrganization` 的 `[{ id, name, children: [] }]` 二层树状结构。
- **全选与半选逻辑**：
  - “全部成员”复选框联动：判断 `selectedIds.length === allIds.length`。
  - 部门级复选框联动：实现了 `indeterminate`（半选）状态。利用了 React 的 `ref={input => input.indeterminate = ...}` 绕过原生 Checkbox 的限制。**请勿改写为仅受控的 `checked`，否则会丢失半选 UI。**
- **气泡弹出层**：使用了 `absolute right-0 z-50` 脱离文档流，并绑定了 `mousedown` 的全局事件监听器以实现点击外部关闭，不要把事件监听挂载到 `useEffect` 外部。

### 3.2 团队负载分布图 (`src/components/TeamWorkloadChart.tsx`)
**设计背景**：当团队成员超过 5 人时，柱状图如果强制挤压在一个容器内，柱子会变得极细且文字重叠。另外，媒介和市场的考核节点完全不同。

**核心约束（Do NOT Break）**：
- **横向滚动与动态宽度（关键！）**：
  图表外层包裹了一个 `overflow-x-auto overflow-y-hidden` 的容器。内部的 `div` 宽度使用内联样式动态计算：
  `style={{ width: \`\${Math.max(100, data.length * 60)}px\`, minWidth: "100%" }}`
  **这是为了保证每增加一个成员，图表容器至少增加 60px，从而触发滚动条，保证柱子粗细始终处于极佳的阅读状态。千万不要将其改为单纯的 `width: 100%`。**
- **角色数据源隔离**：组件内部根据传入的 `role` 动态切分 `marketData / marketBars` 与 `mediaData / mediaBars`。
- **人员筛选联动**：组件接收 `selectedMemberIds`，并在内部通过 `baseData.filter(d => selectedMemberIds.includes(d.id))` 实现了图表柱子的动态增减。
- **Tooltip 层级与样式**：Tooltip 注入了自定义背景与阴影 `contentStyle={{ borderRadius: "8px", border: "none", boxShadow: ... }}`，并使用了 `itemSorter` 来保证 Tooltip 里的指标顺序与堆叠柱状图的顺序一致。

### 3.3 顶部导航栏 (`src/App.tsx` Header)
- 采用了 `sticky top-0 z-50 shadow-sm` 保持吸顶。
- 中间的视图切换按钮组固定居中（flex-1 配合 justify-center），确保在右侧“成员筛选”组件动态出现/消失时，中间的按钮**绝对不会发生位移抖动**。

---

## 4. 业务数据字典与颜色规范 (Data & Color Specs)

为保持 UI 的高级感与一致性，图表颜色（Tailwind 色阶）与业务字段强绑定，后续新增节点请遵循此规范：

| 业务节点 (市场) | 业务节点 (媒介) | 颜色取值 (Tailwind) | 视觉意图 |
| --- | --- | --- | --- |
| 待审批提报 | 待报价 | `#cbd5e1` (slate-300) | 初始/较轻量节点 |
| - | 待确认合作 | `#93c5fd` (blue-300) | 合作意向确立 |
| 待审批报价 | 待执行(待提稿) | `#fcd34d` (amber-300) | 需要注意/卡点预警 |
| - | 待执行(待重新提稿) | `#fef08a` (yellow-200) | 返工警告 |
| **待审稿** | **待审稿** | `#f87171` (red-400) | **核心阻塞点（红色高亮）** |
| 待他人审稿 | 待他人审稿 | `#fb923c` (orange-400) | 外部阻塞点 |
| 待完结执行 | 待执行(已定稿) | `#a78bfa` / `#34d399` | 顺利推进/待收尾 |
| 待我审核支出 | 待生成支出 | `#818cf8` / `#38bdf8` | 财务前置节点 |
| 待他人审核支出 | 待付款 | `#a78bfa` / `#60a5fa` | 最终财务节点 |

---

## 5. 后续开发指导与防坑指南 (Next Steps & Pitfalls)

1. **对接真实 API**：
   - 目前数据结构已在 `mockData.ts` 彻底铺平且类型对齐（见 `types.ts` 中的 `WorkflowStats`, `InfluencerStats` 等）。
   - 替换数据时，请保留 `selectedMemberIds` 在前端的联动逻辑，或者将 `selectedMemberIds` 作为 Payload 发给后端，返回精简后的数组供图表直接渲染。
2. **新增图表或指标**：
   - 必须保持无边框风格，依赖卡片本身的 `border-slate-200 shadow-sm rounded-xl`。
3. **保持单页面（SPA）丝滑体验**：
   - 在实现数据刷新 (`handleRefresh`) 时，请继续使用当前保留的 `animate-spin` 与模拟的 loading 态，不要引入全局的霸屏 Loading 遮罩。

---
*文档生成日期：2026-07-05 (AI 归档专属)*
