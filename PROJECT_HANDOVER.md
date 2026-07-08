# 达人营销执行看板 (Influencer Marketing Execution Dashboard)
**—— AI 跨模型开发交接与核心设计约束文档**

> **⚠️ 致接手的 AI 模型：**
> 本文档包含了该项目演进过程中的所有核心设计决策、组件通信逻辑以及为避免常规 UI 缺陷而做的特殊处理。**在修改任何代码前，请务必仔细阅读本文档的第 3、4、5 节，严禁使用通用模板覆盖已有的精细化定制逻辑。**

---

## 1. 项目概览 (Project Overview)
本项目是一个为达人营销团队（涵盖“媒介”与“市场”双重角色）打造的执行看板。旨在解决资源触达不透明、流转节点卡顿、团队负载不均等痛点。项目支持 **个人/团队双视角切换** 与 **媒介/市场双角色切换**。

- **前端技术栈**：React 19 + TypeScript + Vite
- **样式库**：Tailwind CSS (原子化设计，亮色 slate 主题，无 dark: 变体)
- **图表库**：Recharts
- **图标库**：Lucide React（模块标题单个图标标识，不堆砌）

---

## 2. 核心状态与全局联动逻辑 (Core State & Data Flow)

项目的入口与状态枢纽在 `src/App.tsx`，维护了以下三个决定整个页面数据形态的核心 State：

1. **`viewMode` ('self' | 'team')**：控制当前是“我的工作台”还是“团队全局视图”。
   - team 视图时，主内容区顶部显示“成员筛选”条（MemberSelect + 权限提示）；self 视图无筛选条。
   - 图表区的 `TeamWorkloadChart`（team）与 `PersonalMemo`（self）互换。
2. **`role` ('media' | 'marketing')**：控制当前看板的业务视角。
   - 媒介视角和市场视角的业务流转节点完全不同，直接决定下发给底层组件的 Keys 和 Colors。
   - 切换角色时清空 `selectedMemberIds`，MemberSelect 按 role 只显示对应部门。
3. **`selectedMemberIds` (string[])**：团队成员的多选状态。
   - 数据源严格依赖 `mockOrganization`（树状组织架构）。

**数据聚合**（App.tsx useMemo）：
- self 视图：`mockMemberInfluencerStats[currentUserId]` / `mockMemberWorkflowStats[currentUserId]`。
- team 视图空选：`mockInfluencerStatsTeam` / `mockWorkflowStatsTeam`。
- team 视图有选：`getAggregatedInfluencerStats(selectedMemberIds)` / `getAggregatedWorkflowStats(...)`。
- 补充指标：`mockExecutionStatsSelf/Team`（累计执行次数/本月新增执行/本月新增招募任务）+ 招募任务总数 + workflowStats 派生（待执行）。
- **三处数据联动（2026-07-07 修复专家评估 Whyhi 一）**：
  - 趋势图（TrendChart）：`getScaledTrendData(role, ratio)`，`ratio = getViewScopeRatio(influencerStats.confirmedCooperations)`（以当前视图合作转化体量占团队总量比例，钳制 [0.2,1]，同时驱动招募任务待办缩放），随视图/成员筛选联动。
  - 招募任务待办（TaskProgressTable）：`getScaledTasks(ratio)`，仅缩放 `myActionableItems`，项目级目标/已完成进度不变。
  - 招募任务总数：self=当前用户参与的任务数（关注或有待办），team=`mockTasks.length`（招募任务为组织级项目，选成员不改变其范围）。

---

## 3. 关键组件级设计约束（🚨 严禁破坏的设计）

### 3.1 组织架构多选组件 (`src/components/MemberSelect.tsx`)
- **按 role 过滤**：`role` prop 决定只显示对应部门（媒介→dept1，市场→dept2），不再有“我的团队”分组或“无权查看明细”标注。
- **全选与半选逻辑**：实现了 `indeterminate`（半选）状态，利用 `ref={input => input.indeterminate = ...}` 绕过原生 Checkbox 限制。**请勿改写为仅受控的 `checked`，否则会丢失半选 UI。**
- **气泡弹出层**：`absolute right-0 z-50` 脱离文档流，绑定 `mousedown` 全局监听点击外部关闭。
- **权限提示不在下拉内**：数据权限提示“仅可查看自己及下级成员数据”在 App 的筛选条右侧，不在 MemberSelect 下拉里。

### 3.2 团队负载分布图 (`src/components/TeamWorkloadChart.tsx`)
- **横向滚动与动态宽度（关键！）**：外层 `overflow-x-auto overflow-y-hidden`，内层 `style={{ width: ${Math.max(100, data.length * 60)}px, minWidth: '100%' }}`。**千万不要改为单纯 `width: 100%`。**
- **角色数据源隔离**：组件接收已按 role 过滤的 `data`（WorkloadDataItem[]）与 `bars`（WorkloadBarConfig[]），由 App 通过 `getWorkloadData`/`getWorkloadBars` 提供。
- **无底部 Legend**：仅悬浮 Tooltip 展示明细，`itemSorter` 保证 Tooltip 顺序与堆叠顺序一致。
- **点击下钻个人详情（2026-07-07 新增）**：柱子可点击，经 `onMemberClick(memberId)` 回调由 App 调 `window.open` 在**新标签页**打开 `?view=team&role=&member=` 的个人详情视图（团队视角按该成员筛选，**不改当前页主筛选**）。App 启动时读取 URL 参数初始化 viewMode/role/selectedMemberIds。标题下有引导文案“点击成员柱可在新标签页查看其个人详情”。

### 3.3 业务流转链路 (`src/components/WorkflowPipeline.tsx` + `StageDetailModal.tsx`)
- **来源**：`ff44ef3`（初始化）原版实现，`114828c` 曾改坏，已取回原版。**不要用客户泳道等错误版本覆盖。**
- **三阶段布局**：投放前 / 投放中 / 投放后，整体包在“业务流转链路”白色模块容器内。
- **me/others 标注**：`getWaitingStatus(waitMarket, waitMedia)` 基于 role 判断节点是「我处理」还是「待对方处理」。
- **可点击查看详情**：点击节点弹 `StageDetailModal` 看积压单据明细（mock），便于跟进。**不要删除此交互。**
- **明细负责人随选中成员（2026-07-07 修复 Whyhi 六-12）**：明细不再写死张三/李四/王五，由 App 传入 `assignees` 驱动——self 视图不展示负责人，team 视图按选中成员（空选则部门全员）轮转；count 均分且总和守恒。
- **弹窗交互**：ESC 键 + 点击遮罩关闭；明细行“去处理/去查看”为 `<button>`（不跳顶），实际跳转待接入真实任务详情。

### 3.4 招募任务进度 (`src/components/TaskProgressTable.tsx`)
- **漏斗数据列**：状态为 提报/报价/确认合作/执行（对应 `task.stages` 四字段）。
- **待办列**：self 视图「我的待办」，team 视图「本组待办」（列名随 `personalMode` 切换）。
- **操作列**：self/team 均为「待办」按钮展开待办明细（不再有“详情”链接）。
- **展开行**：去掉 personalMode 限制，两个视图都支持展开。

### 3.5 资源池与触达数据 (`src/components/StatCard.tsx`)
- **按岗位差异化**：`role` prop 决定显示的组与指标。媒介（资源池+合作转化+邮件触达），市场（资源池+合作转化，无邮件触达）。
- **补充指标**：`extra` prop 提供累计执行次数/本月新增执行/待执行/招募任务总数/本月新增招募任务。

### 3.6 顶部导航栏 (`src/App.tsx` Header)
- `sticky top-0 z-50 shadow-sm` 吸顶。
- 中间视图切换按钮组 `flex-1 + justify-center` 居中，右侧只剩角色切换，切换时中间按钮不抖动。
- 成员筛选在主内容区顶部（team 视图），不在 header。

---

## 4. 业务数据字典与颜色规范 (Data & Color Specs)

图表颜色（Tailwind 色阶）与业务字段强绑定，后续新增节点请遵循此规范：

| 业务节点 (市场) | 业务节点 (媒介) | 颜色取值 (Tailwind) | 视觉意图 |
| --- | --- | --- | --- |
| - | 待审批流量主申请 | `#e2e8f0` (slate-200) | 流量主准入/最初始（投放前最前） |
| - | 待建联合作意向 | `#bfdbfe` (blue-200) | 合作意向萌芽（浅于待确认合作） |
| 待审批提报 | 待报价 | `#cbd5e1` (slate-300) | 初始/较轻量节点 |
| - | 待确认合作 | `#93c5fd` (blue-300) | 合作意向确立 |
| 待审批报价 | 待执行(待提稿) | `#fcd34d` (amber-300) | 需要注意/卡点预警 |
| - | 待执行(待重新提稿) | `#fef08a` (yellow-200) | 返工警告 |
| **待审稿** | **待审稿** | `#f87171` (red-400) | **核心阻塞点（红色高亮）** |
| 待他人审稿 | 待他人审稿 | `#fb923c` (orange-400) | 外部阻塞点 |
| 待完结执行 | 待执行(已定稿) | `#34d399` / `#a78bfa` | 顺利推进/待收尾 |
| 待我审核支出 | 待生成支出 | `#818cf8` / `#38bdf8` | 财务前置节点 |
| 待他人审核支出 | 待付款 | `#a78bfa` / `#60a5fa` | 最终财务节点 |

---

## 5. 后续开发指导与防坑指南 (Next Steps & Pitfalls)

1. **对接真实 API**：
   - 数据结构已在 `mockData.ts` 铺平且类型对齐（见 `types.ts` 的 `WorkflowStats`/`InfluencerStats`/`ExecutionStats` 等）。
   - 替换数据时保留 `selectedMemberIds` 联动逻辑，或将其作为 Payload 发后端，返回精简数组供图表直接渲染。
2. **新增图表或指标**：必须保持无边框风格，依赖卡片本身的 `border-slate-200 shadow-sm rounded-xl`。
3. **保持单页面（SPA）丝滑体验**：刷新 (`handleRefresh`) 用 `animate-spin` + 模拟 loading 态，不要引入全局霸屏 Loading 遮罩。
4. **查 git 历史再下手**：`114828c`(存档) 曾把 App + 多组件改成错误版本（引用不存在的 `Stage` 等），`ff44ef3`(初始化) 的 WorkflowPipeline/StageDetailModal 是正确实现。修改前用 `git log -- <file>` + `git show <commit>:<file>` 查各版本，**不只看 HEAD**。

---
*文档更新日期：2026-07-07*
