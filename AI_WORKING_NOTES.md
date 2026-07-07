# AI 协作工作注意事项（本项目实战总结）

> 致接手的 AI 模型：本文档总结本项目中 AI 协作常遇到的问题与思考注意事项。**接手时请优先读取本文档 + PROJECT_HANDOVER.md + PRD.md**，避免重蹈覆辙。

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

---
*最后更新：2026-07-06*
