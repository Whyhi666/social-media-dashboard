# AI 协作工作注意事项（本项目实战总结）

> 致接手的 AI 模型：本文档总结本项目中 AI 协作常遇到的问题与思考注意事项。**接手时请优先读取本文档 + PROJECT_HANDOVER.md + PRD.md**，避免重蹈覆辙。
>
> 📌 **项目状态（2026-07-07）**：暂告一段落。专家评估（EXPERT_REVIEW.md）已闭环，数据联动 / 负载下钻 / 明细负责人 / PRD / 命名清理均已修复并上线。续作前先看本文档 + PROJECT_HANDOVER.md。

---

## 一、动手前必读需求文档
1. 先读 **PRD.md**（产品需求）+ **PROJECT_HANDOVER.md**（设计约束）+ **README.md**。
2. 不读需求就动手 → 必然曲解业务。本项目教训：曾把"达人营销执行看板"做成"社媒执行阶段泳道（客户/项目/平台）"，完全偏离 PRD 的"双视角/双角色/业务流转漏斗"设计，被用户纠正"完全曲解"。

## 二、查 git 要看历史各版本，不只 HEAD
1. `git log --oneline -- <file>` 查文件历史，`git show <commit>:<file>` 看各版本内容。
2. **HEAD 可能是某次错误提交后的状态**，正确实现可能在历史 commit 里。
3. 本项目教训：`114828c`(存档) 把 WorkflowPipeline 改成引用不存在 `Stage` 的错版，而 `ff44ef3`(初始化) 才是正确实现。只看 HEAD 误判"需重写"，实际有现成好代码——用户**两次**提醒"看 git"才去查历史。
4. 取回历史版本：`git show <commit>:<path> > <path>`。

## 三、不要编造数据迁就错误代码
1. 遇到组件引用不存在的符号，先判断是**组件错**还是**数据缺**——本项目 types.ts/mockData.ts 是正确的，错的是 App + 部分组件。
2. 教训：曾编造一整套 `mockStages`（雅诗兰黛/小米客户泳道）迁就错版 App，方向完全错。
3. 正确做法：以正确数据层为准，重写错误组件去对接现有数据。

## 四、验证而非推断
1. 不凭推断下结论。教训：曾断言"线上白屏"，实际 GitHub Pages 部署失败时**保留旧版**（不白屏）。
2. 改完跑 `npm run lint`（tsc --noEmit）确认类型，`npm run build` 确认打包，`npm run dev` 确认运行时。
3. 用 git/工具证据说话，不靠猜。recharts 等第三方类型不匹配时，参数用 `any` 绕过（如 itemSorter）。

## 五、用户偏好（本项目中确认的）
1. **图标**：模块标题前可加**单个**简洁 lucide 图标标识（Database/TrendingUp/Users/Workflow/ClipboardList/StickyNote），用户认可；但禁止一个区域堆砌多个花哨图标（曾因"眼花缭乱"被要求去掉）。
2. **视觉简洁**：看板忌花哨，亮色 slate 主题，无 dark: 变体。
3. **文案准确**：指标名要语义明确（"累计合作"→"累计合作次数"；漏斗状态"待提报/待报价/待确认/待执行"→"提报/报价/确认合作/执行"）。
4. **模块包裹**：相关数据要包在模块容器里（如"资源池与触达数据"白色卡片），不要零散。

## 六、数据模型尊重
1. types.ts/mockData.ts 是正确完备的，不要改（除非用户明确要新指标）。
2. 新指标优先用现有字段派生（如"待执行"从 WorkflowStats 执行字段求和），或扩展但不破坏现有（如新增 ExecutionStats 补充执行/招募指标）。

## 七、提交卫生
1. `git add -A` 会带入 `.claude/` 等本地配置，提交前看 `git status` 确认范围。
2. `.gitignore` 应含 `.claude/`、`node_modules/`、`dist/` 等。
3. commit message 用中文 feat/docs 前缀，多行用多个 `-m`，结尾 `Co-Authored-By: Claude <noreply@anthropic.com>`。

## 八、本项目特定架构（详见 PROJECT_HANDOVER.md）
- 三核心 state：`viewMode`('self'|'team') + `role`('media'|'marketing') + `selectedMemberIds`
- 数据聚合：self→`mockMember*`，team 空选→`mock*Team`，team 有选→`getAggregated*`
- 组件：StatCard(岗位差异化) / TrendChart(7d/14d/30d) / TeamWorkloadChart(堆叠柱状图横向滚动) / WorkflowPipeline+StageDetailModal(三阶段+me/others+点击详情) / TaskProgressTable(我的/本组待办) / MemberSelect(按role过滤) / PersonalMemo(self备忘)

## 九、2026-07-07 新增坑与经验（专家评估修复轮）
1. **Tailwind v4 无 `scrollbar-thin` 插件**：`scrollbar-thin` 类无效，自定义滚动条用任意值变体 `[&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:bg-slate-300/70 ...`。
2. **recharts v3 `Bar` onClick**：回调首参是 `BarRectangleItem`，原始数据在 `data.payload`（取成员 id 用 `data.payload.id`），不是 `data.id`。
3. **写死像素高度 + `overflow-hidden` 会裁切**：加一行引导文案后头部变高，`height:280` 的图表被外层裁掉 X 轴人名。容器用 `flex-1 min-h-0` + 子元素 `height:100%` 自适应，别写死高度。
4. **`<a href="#">` 占位会跳顶**：占位跳转动作用 `<button type="button">`。
5. **命名要覆盖全部用途**：缩放函数同时驱动趋势图+招募待办时，别只命名一个用途（`getTrendScaleRatio` 误导，已改 `getViewScopeRatio`）。
6. **规整时查死代码**：`tsc` 不开 `noUnusedLocals` 时不报未用导入/导出，需主动 grep 排查（本次清掉 `allMemberIds` / `Legend` / 未用图标导入）。
7. **跨项目经验已沉淀到全局** `~/.claude/CLAUDE.md`（通用原则+用户偏好+技术坑），本文件保留项目专属内容。

## 十、2026-07-08 新增经验（数据模型重构 + 字段说明入口）
1. **数据模型重构要全链路同步**：改 `WorkflowStats` 字段（删/加/改名）时，必须同步 `types.ts` + `mockData.ts`（self/team/10 成员/聚合零值/keys 数组/负载 workload/bars）+ `WorkflowPipeline.tsx`（labels + StageCard）+ 趋势数据。漏改聚合 `keys` 数组会导致多选聚合时新字段取 `undefined`->`NaN`。改完跑 `npm run lint`（tsc）能抓出大部分遗漏引用。
2. **recharts Tooltip 顺序不跟随 Line**：三条线的 Tooltip 顺序不保证按 `<Line>` JSX 顺序，须用 `<Tooltip itemSorter={item => order.indexOf(item.dataKey)}>` 强制；Legend 顺序才跟随 `<Line>` 顺序。
3. **dev 残留进程占端口**：多次启停 dev 会留下残留 node 进程占用端口（3000-3005 被占），导致新 dev 用高端口且 HMR 可能断裂。用 `netstat -ano | grep LISTENING | grep ":<port> "` 找 PID + `taskkill /F /PID` 清理。
4. **字段说明用结构化数据文件**：避免每个字段旁加图标（花里胡哨），改为一个入口（header 按钮）+ 模态框。内容放 `src/fieldDoc.ts`（`{title, desc, items}` 结构），组件只渲染，便于非开发人员改文案。
5. **负载图只放 me 节点**：业务规则--负载图只堆叠本角色需处理的节点，待他人处理节点（待他人审稿/待他人审核支出）不计入。流转链路仍展示全部节点（me/others 标注）。

---
*最后更新：2026-07-08*
