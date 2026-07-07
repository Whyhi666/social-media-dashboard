# 专家评估报告 · 达人营销执行看板

> 评估时间：2026-07-06
> 评估者：产品专家 Whyhi、UED 专家 Johnny

---

## 一、产品评估报告（Whyhi）

### 优点
1. **三态驱动信息架构清晰**：`viewMode / role / selectedMemberIds` 干净驱动整页数据形态，`useMemo` 分层派发，对接真实 API 时只需替换数据源。
2. **岗位差异化贴合真实业务**：媒介重执行跟进+邮件触达，市场重提报审批+招募任务；WorkflowPipeline 用 `getWaitingStatus` 按角色判定"我处理/待对方处理"，准确反映分工。
3. **"我处理/待对方处理"标注直击协同痛点**：一线人员一眼看到"卡在我这/卡在对方那"，比数字堆砌有用。
4. **三阶段链路（投放前/中/后）符合业务直觉**：按业务时序切分，比按部门分栏易理解。
5. **MemberSelect 半选 + 权限提示分离**：ref 绕过原生 Checkbox 实现半选，权限提示独立放筛选条右侧。
6. **负载图颜色语义有业务含义**：红=核心阻塞，管理者扫一眼定位瓶颈。
7. **招募任务表筛选覆盖典型场景**：全部/我关注/我的待办/临近截止 + 搜索，对应四种工作模式。

### 问题
**（一）数据联动三处断裂——最严重**
1. TrendChart 不响应视图与成员筛选（App.tsx L87 只依赖 role），team 视图选成员后趋势图不变，数据自相矛盾。
2. TaskProgressTable 完全不联动（L226 永远传全量 mockTasks），team 视图选成员后任务列表和"本组待办"纹丝不动。
3. 市场角色"招募任务总数"恒为 3（L76 `mockTasks.length`），无论 self/team/选谁都显示 3。

**（二）身份模型缺陷**
4. currentUserId 随 role 切换（L37）：用户身份应固定，角色是观察视角。市场用户切"媒介"角色时"我的工作台"变成张三数据，会困惑。

**（三）催办场景未闭环**
5. StageDetailModal 缺 PRD 要求的"达人/金额/停留天数"字段，无停留天数则催办无法按"拖最久的先催"排序。
6. "待对方处理"只提供"去查看"，无"催办"动作，协同断在最后一步。

**（四）self 视图缺个人负载可视化**
7. self 视图用 PersonalMemo 替换 TeamWorkloadChart，但已计算 `workloadData`（L82）却没渲染，一线人员看不到自己各类待办积压分布。

**（五）管理者视角深度不足**
8. TeamWorkloadChart 只能悬浮 Tooltip，不能点击柱子下钻看成员明细。
9. 无跨部门总览，必须来回切 role。
10. 无负载阈值/预警线，缺乏决策支撑。
11. team 视图缺"本组待办"筛选按钮。

**（六）其他**
12. StageDetailModal 明细人员固定写死（张三/李四/王五），不随选中成员变化。
13. PersonalMemo 仅 localStorage 且仅 self 可见。
14. Pipeline 节点未按业务严重度分级着色（待审稿应红、待报价应灰，现统一 amber）。
15. 无顶层"今日待办"汇总。

### 建议
**必做**：① 修复三处数据联动；② StageDetailModal 补停留天数+金额并支持排序；③ "待对方处理"加催办动作；④ 解耦 currentUserId 与 role。
**建议**：⑤ self 视图补个人负载迷你图；⑥ TeamWorkloadChart 支持点击下钻；⑦ team 视图补"本组待办"筛选；⑧ Pipeline 节点按严重度着色；⑨ 顶层加"今日待办"摘要。
**可选**：⑩ 跨部门总览；⑪ 负载阈值线；⑫ 负载历史趋势；⑬ 数据导出；⑭ PersonalMemo 多端同步。

---

## 二、UED 评估报告（Johnny）

### 优点
1. **卡片规范执行到位**：各主模块统一 `bg-white rounded-xl border-slate-200 shadow-sm p-4 sm:p-6`。
2. **配色规范零偏差**：14 个业务节点颜色与 HANDOVER 第4节完全对齐。
3. **模块标题图标统一克制**：Lucide `w-4 h-4 text-slate-500`。
4. **数据颜色语义清晰**：蓝=资源/执行、紫=达人、琥珀=本月、翠绿=合作、红=阻塞。
5. **三态联动顺畅**：useMemo 串联，切换瞬时无闪烁；`handleRoleChange` 自动清空成员筛选。
6. **header 视图切换不抖动**：`flex-1 + justify-center` 居中。
7. **MemberSelect 半选完整**：`ref.indeterminate` 绕过原生限制。
8. **加载态非霸屏**：定制骨架屏 + 刷新按钮 `animate-spin`。
9. **StatCard 三级层级清晰**：模块标题 > 组标题+分隔线 > 指标卡。
10. **WorkflowPipeline 阶段编号语义化**：1/2/3 用 blue/indigo/emerald 圆圈。
11. **TaskProgressTable 进度可视化**：进度条+缺口标签+漏斗彩色 chip。
12. **响应式断点合理**：sm/md/lg 三档降级。

### 问题
**视觉一致性**
1. WorkflowPipeline StageCard 混用 gray 系列（应 slate），色温细微断裂。
2. PersonalMemo 图标 `w-5 h-5` 破例（其他 `w-4 h-4`），标题行不齐。
3. WorkflowPipeline 三层卡片嵌套过重，阴影叠加。
4. StatCard 不足 4 项的组（市场资源池2项/媒介邮件触达3项）grid-cols-4 留白突兀。
5. 文档与实现不一致：HANDOVER 3.3 写"蓝色高亮"，实际 amber。

**交互流畅性**
6. `<a href="#">` 导致页面跳顶（StageDetailModal 去处理/去查看、TaskProgressTable 去审稿/去审核），破坏 SPA。
7. StageDetailModal 缺 ESC/遮罩关闭。
8. TaskProgressTable 空状态双重渲染 bug（两个空 tr）。
9. 展开行 colSpan=8 但表格实际 6 列。
10. `scrollbar-thin` 类无效（Tailwind v4 无插件），滚动条为浏览器默认粗样式。
11. TeamWorkloadChart 空状态文案"请在右侧选择成员"，但 MemberSelect 实际在左侧。
12. TaskProgressTable 切换视图未重置 expandedId。
13. StageCard count=0 不可键盘聚焦，无障碍差。
14. StageDetailModal mock 数据硬编码。

**信息层级**
15. TrendChart YAxis `margin left:-20` 裁切风险。
16. 关注星标缺失（PRD 要求星标，实现是"已关注"文字）。
17. StatCard 数值 `truncate` 截断丢信息。

**响应式**
18. header 极窄屏拥挤。
19. WorkflowPipeline 连接线硬编码 `left-9` 响应式可能错位。
20. StageDetailModal 明细项窄屏无降级。

### 建议
**必做**：① 修空状态双重渲染；② 修 `<a href="#">` 跳顶；③ 修 colSpan 8→6；④ 删 scrollbar-thin + 加自定义滚动条样式；⑤ StageDetailModal 加 ESC+遮罩关闭；⑥ StageCard gray→slate 统一。
**建议**：⑦ StatCard 不足4项 flex 自适应；⑧ PersonalMemo 图标 w-4；⑨ 空状态文案修正；⑩ expandedId 切换重置；⑪ StageCard 无障碍属性；⑫ 减少嵌套层级；⑬ TrendChart YAxis 边距；⑭ 关注星标 Star 图标；⑮ 更新 HANDOVER 文档。
**可选**：⑯ StatCard 防截断；⑰ StageDetailModal 接真实数据；⑱ header 极窄屏降级；⑲ 明细窄屏堆叠；⑳ 连接线 SVG。

---

## 三、总体判断

**两位共识**：原型的信息架构（三态驱动）、岗位差异化、我/对方标注是经过思考的亮点，视觉规范执行到位。

**核心硬伤**：
- 产品层：**三处数据联动断裂**（TrendChart/TaskProgressTable/招募任务数在 team 视图下不自洽）+ 催办闭环未合（缺停留天数+催办动作）。
- UED 层：**3 个 bug**（空状态双重渲染、`<a href="#">` 跳顶、scrollbar-thin 无效）+ StageCard 主题不一致。

建议优先修"数据联动 + 3 bug"，这两块补齐后产品才具备上线条件。

---

## 四、处理决议（2026-07-07，业主反馈后）

> 业主逐条裁决如下。✅=已处理，⛔=否决（含理由），📝=修正文档。

### Whyhi 产品评估
- **（一）数据联动三处断裂** 1/2/3 ✅
  - 1 TrendChart：新增 `getViewScopeRatio`/`getScaledTrendData`，按当前视图合作转化体量占比缩放，随视图/成员筛选联动。
  - 2 TaskProgressTable：新增 `getScaledTasks`，仅缩放 `myActionableItems`（我的/本组待办），项目级进度不变。
  - 3 招募任务总数：self=参与任务数（关注或有待办），team=组织级全部任务（选成员不改变项目范围）。
- **（二）4 身份模型** ⛔ 原型阶段需切换视角预览，故 currentUserId 随角色切换；上线后以真实登录身份固定并按角色权限显示选项，且同一人可兼具媒介/市场角色。
- **（三）5 停留天数字段** 🛠️ 看板详情弹窗为概览形式，各执行项停留天数仅在实际操作页可见，无法在此汇总；做这个看板的原则即"有就处理、不应久等"，故不作展示。**已修正 PRD**（去掉"达人/金额/停留天数"，改为"项目/负责人/待处理数/去处理或去查看"）。
- **（三）6 一键催办** ⛔ 不在看板详情内一键催办，需进入实际详情按情况指定催办。PRD 同步去除"催办"措辞。
- **（四）7 个人负载图** ⛔ 个人负载无需单独可视化（负载图供全局统筹）；个人待办数量看下方执行链路即可。
- **（五）8 负载柱下钻** ✅（按业主指定方案）悬浮已可见待办数；点击柱子**不改主筛选**，而是新标签页打开 `?view=team&role=&member=` 的个人详情视图（按该成员筛选），并加引导文案"点击成员柱可在新标签页查看其个人详情"。
- **（五）9 跨部门总览** ⛔ 禁止跨部门，按角色隔离即可。
- **（五）10 负载阈值线** ⛔ 各部门/个人阈值不一、难以定义也无必要；图中已有总数，一眼可知。
- **（五）11 本组待办筛选按钮** ⛔ 不加，用户自行调整成员筛选项即可，不复杂化。
- **（六）12 明细人员写死** ✅ StageDetailModal 明细负责人由 `assignees` 驱动：self 不展示，team 按选中成员/部门全员轮转。
- **（六）13 PersonalMemo 多端** ✅（确认现状）PersonalMemo 为个人工作台备忘，各自看自己，保持 localStorage/self 可见，不做多端同步。
- **（六）14 节点严重度着色** ⛔ 均为待办，无严重度之分；统一琥珀色更清晰，不花哨。
- **（六）15 今日待办汇总** ⛔ 无"今日待办"场景，凡待己处理皆需处理；亦无指定几天后处理的场景。

### Johnny UED 评估
> 业主指示：UED 界面展示问题"不是很在意，自行评估优化，别影响底层功能"。已修复以下不影响底层逻辑的缺陷：
- ✅ 空状态双重渲染（TaskProgressTable 删除重复 tr）
- ✅ `<a href="#">` 跳顶（去处理/去查看/去审稿/去审核改 `<button>`）
- ✅ colSpan 8→6（与 6 列表头对齐）
- ✅ 删 `scrollbar-thin`（Tailwind v4 无插件）改自定义 webkit 滚动条
- ✅ StageDetailModal 加 ESC + 遮罩关闭
- ✅ StageCard gray→slate 统一
- ✅ TrendChart YAxis margin -20→-10（降裁切风险）
- ✅ PersonalMemo 图标 w-5→w-4（与其他模块标题对齐）
- ✅ TeamWorkloadChart 空状态文案"右侧"→"上方"
- ✅ TaskProgressTable 视图切换重置 expandedId
- ⏸️ 其余视觉建议（StatCard 不足4项自适应、关注星标图标、StageCard 无障碍、减少嵌套等）暂缓，待后续视觉打磨阶段再议。
