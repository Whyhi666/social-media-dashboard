import { InfluencerStats, WorkflowStats, RecruitmentTask, WorkloadDataItem, WorkloadBarConfig } from './types';

// ============================================================
// 个人 & 团队聚合数据
// ============================================================

export const mockInfluencerStatsSelf: InfluencerStats = {
  totalLeads: 12540,
  totalInfluencers: 3420,
  confirmedCooperations: 850,
  newLeadsThisMonth: 342,
  newInfluencersThisMonth: 128,
  emailsSentThisMonth: 850,
  emailsReceivedThisMonth: 320,
  contactsEmailedThisMonth: 420,
  confirmedThisMonth: 45,
};

export const mockInfluencerStatsTeam: InfluencerStats = {
  totalLeads: 45200,
  totalInfluencers: 12400,
  confirmedCooperations: 3200,
  newLeadsThisMonth: 1250,
  newInfluencersThisMonth: 450,
  emailsSentThisMonth: 3200,
  emailsReceivedThisMonth: 1200,
  contactsEmailedThisMonth: 1500,
  confirmedThisMonth: 180,
};

export const mockWorkflowStatsSelf: WorkflowStats = {
  pendingMarketApprovalLeads: 14,
  pendingMarketApprovalInfluencers: 8,
  approvedPendingQuote: 5,
  quotedPendingApproval: 12,
  approvedPendingCooperation: 4,

  confirmedPendingExecutionWaitDraft: 6,
  confirmedPendingExecutionResubmit: 3,
  pendingMyReview: 8,
  pendingOthersReview: 4,
  confirmedPendingExecutionFinalized: 5,
  startedPendingCompletion: 10,
  completed: 45,

  pendingExpenseGeneration: 3,
  pendingMyExpenseReview: 2,
  pendingOthersExpenseReview: 6,
  pendingPayment: 8,
};

export const mockWorkflowStatsTeam: WorkflowStats = {
  pendingMarketApprovalLeads: 45,
  pendingMarketApprovalInfluencers: 18,
  approvedPendingQuote: 25,
  quotedPendingApproval: 12,
  approvedPendingCooperation: 15,

  confirmedPendingExecutionWaitDraft: 42,
  confirmedPendingExecutionResubmit: 12,
  pendingMyReview: 16,
  pendingOthersReview: 24,
  confirmedPendingExecutionFinalized: 18,
  startedPendingCompletion: 38,
  completed: 156,

  pendingExpenseGeneration: 18,
  pendingMyExpenseReview: 5,
  pendingOthersExpenseReview: 14,
  pendingPayment: 22,
};

// ============================================================
// 各成员独立数据（用于个人选择时显示）
// ============================================================

export const mockMemberInfluencerStats: Record<string, InfluencerStats> = {
  u1: { totalLeads: 12540, totalInfluencers: 3420, confirmedCooperations: 850, newLeadsThisMonth: 342, newInfluencersThisMonth: 128, emailsSentThisMonth: 850, emailsReceivedThisMonth: 320, contactsEmailedThisMonth: 420, confirmedThisMonth: 45 },
  u2: { totalLeads: 1520, totalInfluencers: 420, confirmedCooperations: 180, newLeadsThisMonth: 120, newInfluencersThisMonth: 45, emailsSentThisMonth: 210, emailsReceivedThisMonth: 80, contactsEmailedThisMonth: 90, confirmedThisMonth: 15 },
  u3: { totalLeads: 850, totalInfluencers: 310, confirmedCooperations: 120, newLeadsThisMonth: 40, newInfluencersThisMonth: 15, emailsSentThisMonth: 150, emailsReceivedThisMonth: 65, contactsEmailedThisMonth: 60, confirmedThisMonth: 8 },
  u4: { totalLeads: 980, totalInfluencers: 290, confirmedCooperations: 95, newLeadsThisMonth: 55, newInfluencersThisMonth: 20, emailsSentThisMonth: 170, emailsReceivedThisMonth: 70, contactsEmailedThisMonth: 80, confirmedThisMonth: 10 },
  u5: { totalLeads: 2100, totalInfluencers: 680, confirmedCooperations: 210, newLeadsThisMonth: 85, newInfluencersThisMonth: 32, emailsSentThisMonth: 280, emailsReceivedThisMonth: 110, contactsEmailedThisMonth: 140, confirmedThisMonth: 22 },
  u6: { totalLeads: 750, totalInfluencers: 240, confirmedCooperations: 75, newLeadsThisMonth: 30, newInfluencersThisMonth: 12, emailsSentThisMonth: 120, emailsReceivedThisMonth: 50, contactsEmailedThisMonth: 55, confirmedThisMonth: 6 },
  u7: { totalLeads: 1650, totalInfluencers: 510, confirmedCooperations: 160, newLeadsThisMonth: 70, newInfluencersThisMonth: 25, emailsSentThisMonth: 200, emailsReceivedThisMonth: 90, contactsEmailedThisMonth: 100, confirmedThisMonth: 14 },
  u8: { totalLeads: 1100, totalInfluencers: 370, confirmedCooperations: 130, newLeadsThisMonth: 48, newInfluencersThisMonth: 18, emailsSentThisMonth: 160, emailsReceivedThisMonth: 60, contactsEmailedThisMonth: 70, confirmedThisMonth: 12 },
  u9: { totalLeads: 1900, totalInfluencers: 580, confirmedCooperations: 190, newLeadsThisMonth: 95, newInfluencersThisMonth: 35, emailsSentThisMonth: 240, emailsReceivedThisMonth: 100, contactsEmailedThisMonth: 120, confirmedThisMonth: 18 },
  u10: { totalLeads: 620, totalInfluencers: 200, confirmedCooperations: 60, newLeadsThisMonth: 25, newInfluencersThisMonth: 10, emailsSentThisMonth: 100, emailsReceivedThisMonth: 40, contactsEmailedThisMonth: 45, confirmedThisMonth: 5 },
};

export const mockMemberWorkflowStats: Record<string, WorkflowStats> = {
  u1: { pendingMarketApprovalLeads: 14, pendingMarketApprovalInfluencers: 8, approvedPendingQuote: 5, quotedPendingApproval: 12, approvedPendingCooperation: 4, confirmedPendingExecutionWaitDraft: 6, confirmedPendingExecutionResubmit: 3, pendingMyReview: 8, pendingOthersReview: 4, confirmedPendingExecutionFinalized: 5, startedPendingCompletion: 10, completed: 45, pendingExpenseGeneration: 3, pendingMyExpenseReview: 2, pendingOthersExpenseReview: 6, pendingPayment: 8 },
  u2: { pendingMarketApprovalLeads: 12, pendingMarketApprovalInfluencers: 5, approvedPendingQuote: 8, quotedPendingApproval: 3, approvedPendingCooperation: 4, confirmedPendingExecutionWaitDraft: 15, confirmedPendingExecutionResubmit: 4, pendingMyReview: 5, pendingOthersReview: 6, confirmedPendingExecutionFinalized: 8, startedPendingCompletion: 12, completed: 80, pendingExpenseGeneration: 6, pendingMyExpenseReview: 3, pendingOthersExpenseReview: 4, pendingPayment: 10 },
  u3: { pendingMarketApprovalLeads: 8, pendingMarketApprovalInfluencers: 4, approvedPendingQuote: 6, quotedPendingApproval: 5, approvedPendingCooperation: 3, confirmedPendingExecutionWaitDraft: 12, confirmedPendingExecutionResubmit: 2, pendingMyReview: 14, pendingOthersReview: 8, confirmedPendingExecutionFinalized: 6, startedPendingCompletion: 9, completed: 65, pendingExpenseGeneration: 5, pendingMyExpenseReview: 7, pendingOthersExpenseReview: 3, pendingPayment: 8 },
  u4: { pendingMarketApprovalLeads: 6, pendingMarketApprovalInfluencers: 3, approvedPendingQuote: 4, quotedPendingApproval: 7, approvedPendingCooperation: 2, confirmedPendingExecutionWaitDraft: 9, confirmedPendingExecutionResubmit: 2, pendingMyReview: 6, pendingOthersReview: 5, confirmedPendingExecutionFinalized: 4, startedPendingCompletion: 11, completed: 55, pendingExpenseGeneration: 4, pendingMyExpenseReview: 1, pendingOthersExpenseReview: 2, pendingPayment: 6 },
  u5: { pendingMarketApprovalLeads: 10, pendingMarketApprovalInfluencers: 6, approvedPendingQuote: 7, quotedPendingApproval: 4, approvedPendingCooperation: 5, confirmedPendingExecutionWaitDraft: 18, confirmedPendingExecutionResubmit: 5, pendingMyReview: 11, pendingOthersReview: 7, confirmedPendingExecutionFinalized: 9, startedPendingCompletion: 15, completed: 90, pendingExpenseGeneration: 8, pendingMyExpenseReview: 4, pendingOthersExpenseReview: 6, pendingPayment: 12 },
  u6: { pendingMarketApprovalLeads: 4, pendingMarketApprovalInfluencers: 2, approvedPendingQuote: 3, quotedPendingApproval: 5, approvedPendingCooperation: 2, confirmedPendingExecutionWaitDraft: 5, confirmedPendingExecutionResubmit: 1, pendingMyReview: 4, pendingOthersReview: 3, confirmedPendingExecutionFinalized: 3, startedPendingCompletion: 6, completed: 35, pendingExpenseGeneration: 2, pendingMyExpenseReview: 2, pendingOthersExpenseReview: 1, pendingPayment: 4 },
  u7: { pendingMarketApprovalLeads: 11, pendingMarketApprovalInfluencers: 5, approvedPendingQuote: 9, quotedPendingApproval: 6, approvedPendingCooperation: 4, confirmedPendingExecutionWaitDraft: 14, confirmedPendingExecutionResubmit: 3, pendingMyReview: 9, pendingOthersReview: 5, confirmedPendingExecutionFinalized: 7, startedPendingCompletion: 12, completed: 70, pendingExpenseGeneration: 7, pendingMyExpenseReview: 5, pendingOthersExpenseReview: 3, pendingPayment: 9 },
  u8: { pendingMarketApprovalLeads: 5, pendingMarketApprovalInfluencers: 4, approvedPendingQuote: 5, quotedPendingApproval: 3, approvedPendingCooperation: 3, confirmedPendingExecutionWaitDraft: 7, confirmedPendingExecutionResubmit: 2, pendingMyReview: 3, pendingOthersReview: 6, confirmedPendingExecutionFinalized: 5, startedPendingCompletion: 8, completed: 45, pendingExpenseGeneration: 3, pendingMyExpenseReview: 1, pendingOthersExpenseReview: 2, pendingPayment: 5 },
  u9: { pendingMarketApprovalLeads: 15, pendingMarketApprovalInfluencers: 7, approvedPendingQuote: 10, quotedPendingApproval: 8, approvedPendingCooperation: 6, confirmedPendingExecutionWaitDraft: 20, confirmedPendingExecutionResubmit: 6, pendingMyReview: 12, pendingOthersReview: 9, confirmedPendingExecutionFinalized: 10, startedPendingCompletion: 18, completed: 110, pendingExpenseGeneration: 9, pendingMyExpenseReview: 6, pendingOthersExpenseReview: 5, pendingPayment: 15 },
  u10: { pendingMarketApprovalLeads: 3, pendingMarketApprovalInfluencers: 2, approvedPendingQuote: 2, quotedPendingApproval: 4, approvedPendingCooperation: 1, confirmedPendingExecutionWaitDraft: 4, confirmedPendingExecutionResubmit: 1, pendingMyReview: 2, pendingOthersReview: 2, confirmedPendingExecutionFinalized: 2, startedPendingCompletion: 5, completed: 25, pendingExpenseGeneration: 1, pendingMyExpenseReview: 2, pendingOthersExpenseReview: 1, pendingPayment: 3 },
};

// ============================================================
// 团队负载数据（原 TeamWorkloadChart 组件内部硬编码数据）
// ============================================================

export const mediaWorkloadData: WorkloadDataItem[] = [
  { id: "u1", name: "张三", 待报价: 5, 待确认合作: 4, "待执行(待提稿)": 6, "待执行(待重新提稿)": 3, 待审稿: 8, 待他人审稿: 3, "待执行(已定稿)": 4, 待生成支出: 3, 待付款: 2 },
  { id: "u2", name: "李四", 待报价: 8, 待确认合作: 4, "待执行(待提稿)": 15, "待执行(待重新提稿)": 2, 待审稿: 5, 待他人审稿: 2, "待执行(已定稿)": 6, 待生成支出: 6, 待付款: 4 },
  { id: "u3", name: "王五", 待报价: 6, 待确认合作: 3, "待执行(待提稿)": 12, "待执行(待重新提稿)": 4, 待审稿: 14, 待他人审稿: 4, "待执行(已定稿)": 5, 待生成支出: 5, 待付款: 1 },
  { id: "u4", name: "赵六", 待报价: 12, 待确认合作: 6, "待执行(待提稿)": 8, "待执行(待重新提稿)": 1, 待审稿: 6, 待他人审稿: 5, "待执行(已定稿)": 9, 待生成支出: 4, 待付款: 3 },
  { id: "u5", name: "孙七", 待报价: 3, 待确认合作: 8, "待执行(待提稿)": 4, "待执行(待重新提稿)": 5, 待审稿: 11, 待他人审稿: 1, "待执行(已定稿)": 3, 待生成支出: 8, 待付款: 5 },
  { id: "u6", name: "周八", 待报价: 9, 待确认合作: 2, "待执行(待提稿)": 10, "待执行(待重新提稿)": 2, 待审稿: 4, 待他人审稿: 6, "待执行(已定稿)": 8, 待生成支出: 2, 待付款: 1 },
  { id: "u7", name: "吴九", 待报价: 4, 待确认合作: 9, "待执行(待提稿)": 5, "待执行(待重新提稿)": 6, 待审稿: 9, 待他人审稿: 2, "待执行(已定稿)": 12, 待生成支出: 7, 待付款: 6 },
  { id: "u8", name: "郑十", 待报价: 15, 待确认合作: 1, "待执行(待提稿)": 9, "待执行(待重新提稿)": 3, 待审稿: 3, 待他人审稿: 8, "待执行(已定稿)": 4, 待生成支出: 1, 待付款: 2 },
  { id: "u9", name: "钱一", 待报价: 2, 待确认合作: 12, "待执行(待提稿)": 14, "待执行(待重新提稿)": 1, 待审稿: 12, 待他人审稿: 3, "待执行(已定稿)": 6, 待生成支出: 9, 待付款: 8 },
  { id: "u10", name: "陈二", 待报价: 7, 待确认合作: 5, "待执行(待提稿)": 3, "待执行(待重新提稿)": 8, 待审稿: 2, 待他人审稿: 9, "待执行(已定稿)": 2, 待生成支出: 4, 待付款: 1 },
];

export const marketWorkloadData: WorkloadDataItem[] = [
  { id: "u1", name: "张三", 待审批提报: 14, 待审批报价: 12, 待审稿: 4, 待他人审稿: 2, 待完结执行: 10, 待我审核支出: 2, 待他人审核支出: 3 },
  { id: "u2", name: "李四", 待审批提报: 8, 待审批报价: 3, 待审稿: 7, 待他人审稿: 5, 待完结执行: 12, 待我审核支出: 3, 待他人审核支出: 1 },
  { id: "u3", name: "王五", 待审批提报: 12, 待审批报价: 5, 待审稿: 2, 待他人审稿: 1, 待完结执行: 9, 待我审核支出: 7, 待他人审核支出: 4 },
  { id: "u4", name: "赵六", 待审批提报: 5, 待审批报价: 8, 待审稿: 6, 待他人审稿: 3, 待完结执行: 5, 待我审核支出: 1, 待他人审核支出: 2 },
  { id: "u5", name: "孙七", 待审批提报: 9, 待审批报价: 4, 待审稿: 8, 待他人审稿: 2, 待完结执行: 15, 待我审核支出: 4, 待他人审核支出: 6 },
  { id: "u6", name: "周八", 待审批提报: 3, 待审批报价: 6, 待审稿: 5, 待他人审稿: 4, 待完结执行: 8, 待我审核支出: 2, 待他人审核支出: 1 },
  { id: "u7", name: "吴九", 待审批提报: 11, 待审批报价: 9, 待审稿: 3, 待他人审稿: 1, 待完结执行: 11, 待我审核支出: 5, 待他人审核支出: 3 },
  { id: "u8", name: "郑十", 待审批提报: 6, 待审批报价: 7, 待审稿: 9, 待他人审稿: 6, 待完结执行: 6, 待我审核支出: 3, 待他人审核支出: 2 },
  { id: "u9", name: "钱一", 待审批提报: 15, 待审批报价: 10, 待审稿: 1, 待他人审稿: 2, 待完结执行: 14, 待我审核支出: 8, 待他人审核支出: 5 },
  { id: "u10", name: "陈二", 待审批提报: 4, 待审批报价: 2, 待审稿: 12, 待他人审稿: 8, 待完结执行: 4, 待我审核支出: 1, 待他人审核支出: 1 },
];

// ============================================================
// 负载图 Bar 配置
// ============================================================

export const mediaBars: WorkloadBarConfig[] = [
  { key: "待报价", color: "#cbd5e1" },
  { key: "待确认合作", color: "#93c5fd" },
  { key: "待执行(待提稿)", color: "#fcd34d" },
  { key: "待执行(待重新提稿)", color: "#fef08a" },
  { key: "待审稿", color: "#f87171" },
  { key: "待他人审稿", color: "#fb923c" },
  { key: "待执行(已定稿)", color: "#a78bfa" },
  { key: "待生成支出", color: "#38bdf8" },
  { key: "待付款", color: "#60a5fa" },
];

export const marketBars: WorkloadBarConfig[] = [
  { key: "待审批提报", color: "#cbd5e1" },
  { key: "待审批报价", color: "#fcd34d" },
  { key: "待审稿", color: "#f87171" },
  { key: "待他人审稿", color: "#fb923c" },
  { key: "待完结执行", color: "#34d399" },
  { key: "待我审核支出", color: "#818cf8" },
  { key: "待他人审核支出", color: "#a78bfa" },
];

// ============================================================
// 聚合计算函数
// ============================================================

/** 根据选中成员 IDs 计算聚合的 InfluencerStats */
export function getAggregatedInfluencerStats(memberIds: string[]): InfluencerStats {
  if (memberIds.length === 0) {
    return { totalLeads: 0, totalInfluencers: 0, confirmedCooperations: 0, newLeadsThisMonth: 0, newInfluencersThisMonth: 0, emailsSentThisMonth: 0, emailsReceivedThisMonth: 0, contactsEmailedThisMonth: 0, confirmedThisMonth: 0 };
  }
  if (memberIds.length === 1 && mockMemberInfluencerStats[memberIds[0]]) {
    return mockMemberInfluencerStats[memberIds[0]];
  }
  // 多选 → 聚合所有选中成员的数据求和
  const keys: (keyof InfluencerStats)[] = ['totalLeads', 'totalInfluencers', 'confirmedCooperations', 'newLeadsThisMonth', 'newInfluencersThisMonth', 'emailsSentThisMonth', 'emailsReceivedThisMonth', 'contactsEmailedThisMonth', 'confirmedThisMonth'];
  const result = { ...mockMemberInfluencerStats[memberIds[0]] || mockInfluencerStatsSelf };
  for (const key of keys) {
    result[key] = memberIds.reduce((sum, id) => sum + ((mockMemberInfluencerStats[id]?.[key]) || 0), 0);
  }
  return result;
}

/** 根据选中成员 IDs 计算聚合的 WorkflowStats */
export function getAggregatedWorkflowStats(memberIds: string[]): WorkflowStats {
  if (memberIds.length === 0) {
    return { pendingMarketApprovalLeads: 0, pendingMarketApprovalInfluencers: 0, approvedPendingQuote: 0, quotedPendingApproval: 0, approvedPendingCooperation: 0, confirmedPendingExecutionWaitDraft: 0, confirmedPendingExecutionResubmit: 0, pendingMyReview: 0, pendingOthersReview: 0, confirmedPendingExecutionFinalized: 0, startedPendingCompletion: 0, completed: 0, pendingExpenseGeneration: 0, pendingMyExpenseReview: 0, pendingOthersExpenseReview: 0, pendingPayment: 0 };
  }
  if (memberIds.length === 1 && mockMemberWorkflowStats[memberIds[0]]) {
    return mockMemberWorkflowStats[memberIds[0]];
  }
  // 多选 → 聚合
  const keys: (keyof WorkflowStats)[] = ['pendingMarketApprovalLeads', 'pendingMarketApprovalInfluencers', 'approvedPendingQuote', 'quotedPendingApproval', 'approvedPendingCooperation', 'confirmedPendingExecutionWaitDraft', 'confirmedPendingExecutionResubmit', 'pendingMyReview', 'pendingOthersReview', 'confirmedPendingExecutionFinalized', 'startedPendingCompletion', 'completed', 'pendingExpenseGeneration', 'pendingMyExpenseReview', 'pendingOthersExpenseReview', 'pendingPayment'];
  const result = { ...(mockMemberWorkflowStats[memberIds[0]] || mockWorkflowStatsSelf) };
  for (const key of keys) {
    result[key] = memberIds.reduce((sum, id) => sum + ((mockMemberWorkflowStats[id]?.[key]) || 0), 0);
  }
  return result;
}

/** 获取负载图数据（按选中成员过滤） */
export function getWorkloadData(memberIds: string[], role: 'media' | 'marketing'): WorkloadDataItem[] {
  const pool = role === 'media' ? mediaWorkloadData : marketWorkloadData;
  return memberIds.length > 0
    ? pool.filter(d => memberIds.includes(d.id))
    : pool;
}

/** 获取负载图 Bar 配置 */
export function getWorkloadBars(role: 'media' | 'marketing'): WorkloadBarConfig[] {
  return role === 'media' ? mediaBars : marketBars;
}

// ============================================================
// 招募任务（不变）
// ============================================================

export const mockTasks: RecruitmentTask[] = [
  {
    id: 'T-2023-11-01',
    name: 'Q4美妆类目头部达人招募',
    isFollowed: true,
    deadline: '2023-12-15',
    daysRemaining: 12,
    targetCount: 50,
    currentCount: 35,
    missingCount: 15,
    stages: { pendingSubmitApproval: 120, pendingQuoteApproval: 80, pendingConfirmCooperation: 25, pendingStartExecution: 10, completed: 35 },
    myActionableItems: { total: 5, pendingMyReview: 3, pendingMyExpenseReview: 2 }
  },
  {
    id: 'T-2023-11-02',
    name: '双旦数码3C评测铺量',
    deadline: '2023-12-20',
    daysRemaining: 17,
    targetCount: 100,
    currentCount: 42,
    missingCount: 58,
    stages: { pendingSubmitApproval: 300, pendingQuoteApproval: 150, pendingConfirmCooperation: 60, pendingStartExecution: 30, completed: 42 },
    myActionableItems: { total: 0, pendingMyReview: 0, pendingMyExpenseReview: 0 }
  },
  {
    id: 'T-2023-11-03',
    name: '海外站宠物垂类新渠道拓展',
    isFollowed: true,
    deadline: '2023-12-30',
    daysRemaining: 27,
    targetCount: 30,
    currentCount: 5,
    missingCount: 25,
    stages: { pendingSubmitApproval: 80, pendingQuoteApproval: 45, pendingConfirmCooperation: 12, pendingStartExecution: 2, completed: 5 },
    myActionableItems: { total: 2, pendingMyReview: 2, pendingMyExpenseReview: 0 }
  }
];

// ============================================================
// 趋势图数据
// ============================================================

export interface TrendDataPoint {
  date: string;
  value1: number;
  value2: number;
}

export interface TrendDataset {
  label1: string;
  label2: string;
  data: TrendDataPoint[];
}

/** 市场角色趋势数据 */
export const marketingTrendData: Record<string, TrendDataset> = {
  '7d': {
    label1: '提报数',
    label2: '确认合作',
    data: [
      { date: '06/27', value1: 40, value2: 15 },
      { date: '06/28', value1: 35, value2: 22 },
      { date: '06/29', value1: 50, value2: 18 },
      { date: '06/30', value1: 65, value2: 30 },
      { date: '07/01', value1: 55, value2: 28 },
      { date: '07/02', value1: 80, value2: 42 },
      { date: '07/03', value1: 95, value2: 50 },
    ],
  },
  '14d': {
    label1: '提报数',
    label2: '确认合作',
    data: [
      { date: '06/20', value1: 35, value2: 12 },
      { date: '06/22', value1: 42, value2: 18 },
      { date: '06/24', value1: 38, value2: 20 },
      { date: '06/26', value1: 50, value2: 25 },
      { date: '06/28', value1: 45, value2: 22 },
      { date: '06/30', value1: 65, value2: 30 },
      { date: '07/02', value1: 80, value2: 42 },
    ],
  },
  '30d': {
    label1: '提报数',
    label2: '确认合作',
    data: [
      { date: '06/03', value1: 120, value2: 35 },
      { date: '06/07', value1: 145, value2: 42 },
      { date: '06/11', value1: 130, value2: 48 },
      { date: '06/15', value1: 160, value2: 55 },
      { date: '06/19', value1: 150, value2: 50 },
      { date: '06/23', value1: 175, value2: 62 },
      { date: '06/27', value1: 200, value2: 70 },
    ],
  },
};

/** 媒介角色趋势数据 */
export const mediaTrendData: Record<string, TrendDataset> = {
  '7d': {
    label1: '执行中',
    label2: '已完成',
    data: [
      { date: '06/27', value1: 28, value2: 8 },
      { date: '06/28', value1: 32, value2: 12 },
      { date: '06/29', value1: 30, value2: 15 },
      { date: '06/30', value1: 26, value2: 18 },
      { date: '07/01', value1: 35, value2: 22 },
      { date: '07/02', value1: 40, value2: 28 },
      { date: '07/03', value1: 38, value2: 35 },
    ],
  },
  '14d': {
    label1: '执行中',
    label2: '已完成',
    data: [
      { date: '06/20', value1: 25, value2: 10 },
      { date: '06/22', value1: 30, value2: 14 },
      { date: '06/24', value1: 28, value2: 16 },
      { date: '06/26', value1: 32, value2: 20 },
      { date: '06/28', value1: 30, value2: 22 },
      { date: '06/30', value1: 26, value2: 28 },
      { date: '07/02', value1: 40, value2: 30 },
    ],
  },
  '30d': {
    label1: '执行中',
    label2: '已完成',
    data: [
      { date: '06/03', value1: 45, value2: 22 },
      { date: '06/07', value1: 50, value2: 28 },
      { date: '06/11', value1: 48, value2: 30 },
      { date: '06/15', value1: 55, value2: 38 },
      { date: '06/19', value1: 52, value2: 42 },
      { date: '06/23', value1: 48, value2: 48 },
      { date: '06/27', value1: 60, value2: 55 },
    ],
  },
};

// ============================================================
// 组织架构
// ============================================================

export const mockOrganization = [
  {
    id: 'dept1',
    name: '媒介部',
    children: [
      { id: 'u1', name: '张三' },
      { id: 'u3', name: '王五' },
      { id: 'u4', name: '赵六' },
      { id: 'u5', name: '孙七' },
      { id: 'u6', name: '周八' },
    ]
  },
  {
    id: 'dept2',
    name: '市场部',
    children: [
      { id: 'u2', name: '李四' },
      { id: 'u7', name: '吴九' },
      { id: 'u8', name: '郑十' },
      { id: 'u9', name: '钱一' },
      { id: 'u10', name: '陈二' },
    ]
  }
];

/** 所有成员 ID 列表 */
export const allMemberIds = mockOrganization.flatMap(d => d.children.map(c => c.id));
