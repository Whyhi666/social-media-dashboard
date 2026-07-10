import { InfluencerStats, WorkflowStats, RecruitmentTask, WorkloadDataItem, WorkloadBarConfig, ExecutionStats } from './types';

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
  pendingTrafficOwnerApproval: 9,
  pendingCooperationIntention: 6,
  pendingCooperationCommunicating: 7,
  pendingReadyToSubmit: 4,
  pendingMarketApprovalInfluencers: 22,
  approvedPendingQuote: 5,
  quotedPendingApproval: 12,
  pendingTrafficOwnerConfirm: 3,
  approvedPendingCooperation: 4,

  confirmedPendingExecutionWaitDraft: 6,
  confirmedPendingExecutionResubmit: 3,
  pendingMyReview: 8,
  pendingOthersReview: 4,
  confirmedPendingExecutionFinalized: 5,
  startedPendingCompletion: 10,

  pendingMyExpenseReview: 2,
  pendingOthersExpenseReview: 6,
  pendingPayment: 8,
};

export const mockWorkflowStatsTeam: WorkflowStats = {
  pendingTrafficOwnerApproval: 28,
  pendingCooperationIntention: 20,
  pendingCooperationCommunicating: 22,
  pendingReadyToSubmit: 14,
  pendingMarketApprovalInfluencers: 63,
  approvedPendingQuote: 25,
  quotedPendingApproval: 12,
  pendingTrafficOwnerConfirm: 9,
  approvedPendingCooperation: 15,

  confirmedPendingExecutionWaitDraft: 42,
  confirmedPendingExecutionResubmit: 12,
  pendingMyReview: 16,
  pendingOthersReview: 24,
  confirmedPendingExecutionFinalized: 18,
  startedPendingCompletion: 38,

  pendingMyExpenseReview: 5,
  pendingOthersExpenseReview: 14,
  pendingPayment: 22,
};

// ============================================================
// 执行与招募补充指标（StatCard 合作转化/资源池用，按 self/team 区分）
// ============================================================

export const mockExecutionStatsSelf: ExecutionStats = {
  totalExecutions: 820,
  newExecutionsThisMonth: 45,
  newRecruitmentTasksThisMonth: 2,
};

export const mockExecutionStatsTeam: ExecutionStats = {
  totalExecutions: 3200,
  newExecutionsThisMonth: 180,
  newRecruitmentTasksThisMonth: 8,
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
  u1: { pendingTrafficOwnerApproval: 9, pendingCooperationIntention: 6, pendingCooperationCommunicating: 7, pendingReadyToSubmit: 4, pendingMarketApprovalInfluencers: 22, approvedPendingQuote: 5, quotedPendingApproval: 12, pendingTrafficOwnerConfirm: 3, approvedPendingCooperation: 4, confirmedPendingExecutionWaitDraft: 6, confirmedPendingExecutionResubmit: 3, pendingMyReview: 8, pendingOthersReview: 4, confirmedPendingExecutionFinalized: 5, startedPendingCompletion: 10, pendingMyExpenseReview: 2, pendingOthersExpenseReview: 6, pendingPayment: 8 },
  u2: { pendingTrafficOwnerApproval: 12, pendingCooperationIntention: 8, pendingCooperationCommunicating: 9, pendingReadyToSubmit: 5, pendingMarketApprovalInfluencers: 17, approvedPendingQuote: 8, quotedPendingApproval: 3, pendingTrafficOwnerConfirm: 4, approvedPendingCooperation: 4, confirmedPendingExecutionWaitDraft: 15, confirmedPendingExecutionResubmit: 4, pendingMyReview: 5, pendingOthersReview: 6, confirmedPendingExecutionFinalized: 8, startedPendingCompletion: 12, pendingMyExpenseReview: 3, pendingOthersExpenseReview: 4, pendingPayment: 10 },
  u3: { pendingTrafficOwnerApproval: 8, pendingCooperationIntention: 5, pendingCooperationCommunicating: 6, pendingReadyToSubmit: 3, pendingMarketApprovalInfluencers: 12, approvedPendingQuote: 6, quotedPendingApproval: 5, pendingTrafficOwnerConfirm: 2, approvedPendingCooperation: 3, confirmedPendingExecutionWaitDraft: 12, confirmedPendingExecutionResubmit: 2, pendingMyReview: 14, pendingOthersReview: 8, confirmedPendingExecutionFinalized: 6, startedPendingCompletion: 9, pendingMyExpenseReview: 7, pendingOthersExpenseReview: 3, pendingPayment: 8 },
  u4: { pendingTrafficOwnerApproval: 6, pendingCooperationIntention: 4, pendingCooperationCommunicating: 5, pendingReadyToSubmit: 3, pendingMarketApprovalInfluencers: 9, approvedPendingQuote: 4, quotedPendingApproval: 7, pendingTrafficOwnerConfirm: 2, approvedPendingCooperation: 2, confirmedPendingExecutionWaitDraft: 9, confirmedPendingExecutionResubmit: 2, pendingMyReview: 6, pendingOthersReview: 5, confirmedPendingExecutionFinalized: 4, startedPendingCompletion: 11, pendingMyExpenseReview: 1, pendingOthersExpenseReview: 2, pendingPayment: 6 },
  u5: { pendingTrafficOwnerApproval: 10, pendingCooperationIntention: 7, pendingCooperationCommunicating: 8, pendingReadyToSubmit: 4, pendingMarketApprovalInfluencers: 16, approvedPendingQuote: 7, quotedPendingApproval: 4, pendingTrafficOwnerConfirm: 3, approvedPendingCooperation: 5, confirmedPendingExecutionWaitDraft: 18, confirmedPendingExecutionResubmit: 5, pendingMyReview: 11, pendingOthersReview: 7, confirmedPendingExecutionFinalized: 9, startedPendingCompletion: 15, pendingMyExpenseReview: 4, pendingOthersExpenseReview: 6, pendingPayment: 12 },
  u6: { pendingTrafficOwnerApproval: 4, pendingCooperationIntention: 3, pendingCooperationCommunicating: 4, pendingReadyToSubmit: 2, pendingMarketApprovalInfluencers: 6, approvedPendingQuote: 3, quotedPendingApproval: 5, pendingTrafficOwnerConfirm: 1, approvedPendingCooperation: 2, confirmedPendingExecutionWaitDraft: 5, confirmedPendingExecutionResubmit: 1, pendingMyReview: 4, pendingOthersReview: 3, confirmedPendingExecutionFinalized: 3, startedPendingCompletion: 6, pendingMyExpenseReview: 2, pendingOthersExpenseReview: 1, pendingPayment: 4 },
  u7: { pendingTrafficOwnerApproval: 11, pendingCooperationIntention: 6, pendingCooperationCommunicating: 7, pendingReadyToSubmit: 4, pendingMarketApprovalInfluencers: 16, approvedPendingQuote: 9, quotedPendingApproval: 6, pendingTrafficOwnerConfirm: 3, approvedPendingCooperation: 4, confirmedPendingExecutionWaitDraft: 14, confirmedPendingExecutionResubmit: 3, pendingMyReview: 9, pendingOthersReview: 5, confirmedPendingExecutionFinalized: 7, startedPendingCompletion: 12, pendingMyExpenseReview: 5, pendingOthersExpenseReview: 3, pendingPayment: 9 },
  u8: { pendingTrafficOwnerApproval: 7, pendingCooperationIntention: 5, pendingCooperationCommunicating: 5, pendingReadyToSubmit: 3, pendingMarketApprovalInfluencers: 9, approvedPendingQuote: 5, quotedPendingApproval: 3, pendingTrafficOwnerConfirm: 2, approvedPendingCooperation: 3, confirmedPendingExecutionWaitDraft: 7, confirmedPendingExecutionResubmit: 2, pendingMyReview: 3, pendingOthersReview: 6, confirmedPendingExecutionFinalized: 5, startedPendingCompletion: 8, pendingMyExpenseReview: 1, pendingOthersExpenseReview: 2, pendingPayment: 5 },
  u9: { pendingTrafficOwnerApproval: 13, pendingCooperationIntention: 9, pendingCooperationCommunicating: 10, pendingReadyToSubmit: 6, pendingMarketApprovalInfluencers: 22, approvedPendingQuote: 10, quotedPendingApproval: 8, pendingTrafficOwnerConfirm: 4, approvedPendingCooperation: 6, confirmedPendingExecutionWaitDraft: 20, confirmedPendingExecutionResubmit: 6, pendingMyReview: 12, pendingOthersReview: 9, confirmedPendingExecutionFinalized: 10, startedPendingCompletion: 18, pendingMyExpenseReview: 6, pendingOthersExpenseReview: 5, pendingPayment: 15 },
  u10: { pendingTrafficOwnerApproval: 5, pendingCooperationIntention: 3, pendingCooperationCommunicating: 4, pendingReadyToSubmit: 2, pendingMarketApprovalInfluencers: 5, approvedPendingQuote: 2, quotedPendingApproval: 4, pendingTrafficOwnerConfirm: 1, approvedPendingCooperation: 1, confirmedPendingExecutionWaitDraft: 4, confirmedPendingExecutionResubmit: 1, pendingMyReview: 2, pendingOthersReview: 2, confirmedPendingExecutionFinalized: 2, startedPendingCompletion: 5, pendingMyExpenseReview: 2, pendingOthersExpenseReview: 1, pendingPayment: 3 },
};

// ============================================================
// 团队负载数据（原 TeamWorkloadChart 组件内部硬编码数据）
// ============================================================

export const mediaWorkloadData: WorkloadDataItem[] = [
  { id: "u1", name: "张三", 待审批流量主申请: 9, 待沟通合作意向: 6, 合作意向沟通中: 7, "可合作待提报/自申请": 4, 待报价: 5, 待流量主确认合作: 3, 待确认合作: 4, "待执行(待提稿)": 6, "待执行(待重新提稿)": 3, 待审稿: 8, "待执行(已定稿)": 5, 待我审核支出: 2, 待申请支付: 8 },
  { id: "u2", name: "李四", 待审批流量主申请: 12, 待沟通合作意向: 8, 合作意向沟通中: 9, "可合作待提报/自申请": 5, 待报价: 8, 待流量主确认合作: 4, 待确认合作: 4, "待执行(待提稿)": 15, "待执行(待重新提稿)": 4, 待审稿: 5, "待执行(已定稿)": 8, 待我审核支出: 3, 待申请支付: 10 },
  { id: "u3", name: "王五", 待审批流量主申请: 8, 待沟通合作意向: 5, 合作意向沟通中: 6, "可合作待提报/自申请": 3, 待报价: 6, 待流量主确认合作: 2, 待确认合作: 3, "待执行(待提稿)": 12, "待执行(待重新提稿)": 2, 待审稿: 14, "待执行(已定稿)": 6, 待我审核支出: 7, 待申请支付: 8 },
  { id: "u4", name: "赵六", 待审批流量主申请: 6, 待沟通合作意向: 4, 合作意向沟通中: 5, "可合作待提报/自申请": 3, 待报价: 4, 待流量主确认合作: 2, 待确认合作: 2, "待执行(待提稿)": 9, "待执行(待重新提稿)": 2, 待审稿: 6, "待执行(已定稿)": 4, 待我审核支出: 1, 待申请支付: 6 },
  { id: "u5", name: "孙七", 待审批流量主申请: 10, 待沟通合作意向: 7, 合作意向沟通中: 8, "可合作待提报/自申请": 4, 待报价: 7, 待流量主确认合作: 3, 待确认合作: 5, "待执行(待提稿)": 18, "待执行(待重新提稿)": 5, 待审稿: 11, "待执行(已定稿)": 9, 待我审核支出: 4, 待申请支付: 12 },
  { id: "u6", name: "周八", 待审批流量主申请: 4, 待沟通合作意向: 3, 合作意向沟通中: 4, "可合作待提报/自申请": 2, 待报价: 3, 待流量主确认合作: 1, 待确认合作: 2, "待执行(待提稿)": 5, "待执行(待重新提稿)": 1, 待审稿: 4, "待执行(已定稿)": 3, 待我审核支出: 2, 待申请支付: 4 },
  { id: "u7", name: "吴九", 待审批流量主申请: 11, 待沟通合作意向: 6, 合作意向沟通中: 7, "可合作待提报/自申请": 4, 待报价: 9, 待流量主确认合作: 3, 待确认合作: 4, "待执行(待提稿)": 14, "待执行(待重新提稿)": 3, 待审稿: 9, "待执行(已定稿)": 7, 待我审核支出: 5, 待申请支付: 9 },
  { id: "u8", name: "郑十", 待审批流量主申请: 7, 待沟通合作意向: 5, 合作意向沟通中: 5, "可合作待提报/自申请": 3, 待报价: 5, 待流量主确认合作: 2, 待确认合作: 3, "待执行(待提稿)": 7, "待执行(待重新提稿)": 2, 待审稿: 3, "待执行(已定稿)": 5, 待我审核支出: 1, 待申请支付: 5 },
  { id: "u9", name: "钱一", 待审批流量主申请: 13, 待沟通合作意向: 9, 合作意向沟通中: 10, "可合作待提报/自申请": 6, 待报价: 10, 待流量主确认合作: 4, 待确认合作: 6, "待执行(待提稿)": 20, "待执行(待重新提稿)": 6, 待审稿: 12, "待执行(已定稿)": 10, 待我审核支出: 6, 待申请支付: 15 },
  { id: "u10", name: "陈二", 待审批流量主申请: 5, 待沟通合作意向: 3, 合作意向沟通中: 4, "可合作待提报/自申请": 2, 待报价: 2, 待流量主确认合作: 1, 待确认合作: 1, "待执行(待提稿)": 4, "待执行(待重新提稿)": 1, 待审稿: 2, "待执行(已定稿)": 2, 待我审核支出: 2, 待申请支付: 3 },
];

export const marketWorkloadData: WorkloadDataItem[] = [
  { id: "u1", name: "张三", 待审批提报: 14, 待审批报价: 12, 待审稿: 4, 待完结执行: 10, 待我审核支出: 2 },
  { id: "u2", name: "李四", 待审批提报: 8, 待审批报价: 3, 待审稿: 7, 待完结执行: 12, 待我审核支出: 3 },
  { id: "u3", name: "王五", 待审批提报: 12, 待审批报价: 5, 待审稿: 2, 待完结执行: 9, 待我审核支出: 7 },
  { id: "u4", name: "赵六", 待审批提报: 5, 待审批报价: 8, 待审稿: 6, 待完结执行: 5, 待我审核支出: 1 },
  { id: "u5", name: "孙七", 待审批提报: 9, 待审批报价: 4, 待审稿: 8, 待完结执行: 15, 待我审核支出: 4 },
  { id: "u6", name: "周八", 待审批提报: 3, 待审批报价: 6, 待审稿: 5, 待完结执行: 8, 待我审核支出: 2 },
  { id: "u7", name: "吴九", 待审批提报: 11, 待审批报价: 9, 待审稿: 3, 待完结执行: 11, 待我审核支出: 5 },
  { id: "u8", name: "郑十", 待审批提报: 6, 待审批报价: 7, 待审稿: 9, 待完结执行: 6, 待我审核支出: 3 },
  { id: "u9", name: "钱一", 待审批提报: 15, 待审批报价: 10, 待审稿: 1, 待完结执行: 14, 待我审核支出: 8 },
  { id: "u10", name: "陈二", 待审批提报: 4, 待审批报价: 2, 待审稿: 12, 待完结执行: 4, 待我审核支出: 1 },
];

// ============================================================
// 负载图 Bar 配置
// ============================================================

export const mediaBars: WorkloadBarConfig[] = [
  { key: "待审批流量主申请", color: "#e2e8f0" },
  { key: "待沟通合作意向", color: "#bfdbfe" },
  { key: "合作意向沟通中", color: "#c7d2fe" },
  { key: "可合作待提报/自申请", color: "#ddd6fe" },
  { key: "待报价", color: "#cbd5e1" },
  { key: "待流量主确认合作", color: "#93c5fd" },
  { key: "待确认合作", color: "#a5b4fc" },
  { key: "待执行(待提稿)", color: "#fcd34d" },
  { key: "待执行(待重新提稿)", color: "#fef08a" },
  { key: "待审稿", color: "#f87171" },
  { key: "待执行(已定稿)", color: "#a78bfa" },
  { key: "待我审核支出", color: "#818cf8" },
  { key: "待申请支付", color: "#60a5fa" },
];

export const marketBars: WorkloadBarConfig[] = [
  { key: "待审批提报", color: "#cbd5e1" },
  { key: "待审批报价", color: "#fcd34d" },
  { key: "待审稿", color: "#f87171" },
  { key: "待完结执行", color: "#34d399" },
  { key: "待我审核支出", color: "#818cf8" },
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
    return { pendingTrafficOwnerApproval: 0, pendingCooperationIntention: 0, pendingCooperationCommunicating: 0, pendingReadyToSubmit: 0, pendingMarketApprovalInfluencers: 0, approvedPendingQuote: 0, quotedPendingApproval: 0, pendingTrafficOwnerConfirm: 0, approvedPendingCooperation: 0, confirmedPendingExecutionWaitDraft: 0, confirmedPendingExecutionResubmit: 0, pendingMyReview: 0, pendingOthersReview: 0, confirmedPendingExecutionFinalized: 0, startedPendingCompletion: 0, pendingMyExpenseReview: 0, pendingOthersExpenseReview: 0, pendingPayment: 0 };
  }
  if (memberIds.length === 1 && mockMemberWorkflowStats[memberIds[0]]) {
    return mockMemberWorkflowStats[memberIds[0]];
  }
  // 多选 → 聚合
  const keys: (keyof WorkflowStats)[] = ['pendingTrafficOwnerApproval', 'pendingCooperationIntention', 'pendingCooperationCommunicating', 'pendingReadyToSubmit', 'pendingMarketApprovalInfluencers', 'approvedPendingQuote', 'quotedPendingApproval', 'pendingTrafficOwnerConfirm', 'approvedPendingCooperation', 'confirmedPendingExecutionWaitDraft', 'confirmedPendingExecutionResubmit', 'pendingMyReview', 'pendingOthersReview', 'confirmedPendingExecutionFinalized', 'startedPendingCompletion', 'pendingMyExpenseReview', 'pendingOthersExpenseReview', 'pendingPayment'];
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
  value3: number;
}

export interface TrendDataset {
  label1: string;
  label2: string;
  label3: string;
  data: TrendDataPoint[];
}

/** 市场角色趋势数据 */
export const marketingTrendData: Record<string, TrendDataset> = {
  '7d': {
    label1: '提报数',
    label2: '确认合作',
    label3: '执行数',
    data: [
      { date: '06/27', value1: 40, value2: 15, value3: 10 },
      { date: '06/28', value1: 35, value2: 22, value3: 14 },
      { date: '06/29', value1: 50, value2: 18, value3: 12 },
      { date: '06/30', value1: 65, value2: 30, value3: 20 },
      { date: '07/01', value1: 55, value2: 28, value3: 18 },
      { date: '07/02', value1: 80, value2: 42, value3: 28 },
      { date: '07/03', value1: 95, value2: 50, value3: 33 },
    ],
  },
  '14d': {
    label1: '提报数',
    label2: '确认合作',
    label3: '执行数',
    data: [
      { date: '06/20', value1: 35, value2: 12, value3: 8 },
      { date: '06/22', value1: 42, value2: 18, value3: 12 },
      { date: '06/24', value1: 38, value2: 20, value3: 13 },
      { date: '06/26', value1: 50, value2: 25, value3: 16 },
      { date: '06/28', value1: 45, value2: 22, value3: 15 },
      { date: '06/30', value1: 65, value2: 30, value3: 20 },
      { date: '07/02', value1: 80, value2: 42, value3: 28 },
    ],
  },
  '30d': {
    label1: '提报数',
    label2: '确认合作',
    label3: '执行数',
    data: [
      { date: '06/03', value1: 120, value2: 35, value3: 22 },
      { date: '06/07', value1: 145, value2: 42, value3: 28 },
      { date: '06/11', value1: 130, value2: 48, value3: 32 },
      { date: '06/15', value1: 160, value2: 55, value3: 36 },
      { date: '06/19', value1: 150, value2: 50, value3: 33 },
      { date: '06/23', value1: 175, value2: 62, value3: 40 },
      { date: '06/27', value1: 200, value2: 70, value3: 46 },
    ],
  },
};

/** 媒介角色趋势数据 */
export const mediaTrendData: Record<string, TrendDataset> = {
  '7d': {
    label1: '提报数',
    label2: '确认合作',
    label3: '执行数',
    data: [
      { date: '06/27', value1: 30, value2: 12, value3: 20 },
      { date: '06/28', value1: 35, value2: 15, value3: 22 },
      { date: '06/29', value1: 28, value2: 10, value3: 18 },
      { date: '06/30', value1: 40, value2: 18, value3: 26 },
      { date: '07/01', value1: 36, value2: 14, value3: 24 },
      { date: '07/02', value1: 48, value2: 22, value3: 32 },
      { date: '07/03', value1: 52, value2: 25, value3: 35 },
    ],
  },
  '14d': {
    label1: '提报数',
    label2: '确认合作',
    label3: '执行数',
    data: [
      { date: '06/20', value1: 26, value2: 10, value3: 18 },
      { date: '06/22', value1: 32, value2: 14, value3: 22 },
      { date: '06/24', value1: 30, value2: 12, value3: 20 },
      { date: '06/26', value1: 38, value2: 18, value3: 25 },
      { date: '06/28', value1: 35, value2: 15, value3: 23 },
      { date: '06/30', value1: 40, value2: 20, value3: 28 },
      { date: '07/02', value1: 48, value2: 22, value3: 32 },
    ],
  },
  '30d': {
    label1: '提报数',
    label2: '确认合作',
    label3: '执行数',
    data: [
      { date: '06/03', value1: 80, value2: 30, value3: 55 },
      { date: '06/07', value1: 95, value2: 38, value3: 62 },
      { date: '06/11', value1: 88, value2: 35, value3: 58 },
      { date: '06/15', value1: 110, value2: 45, value3: 72 },
      { date: '06/19', value1: 100, value2: 40, value3: 68 },
      { date: '06/23', value1: 120, value2: 50, value3: 80 },
      { date: '06/27', value1: 135, value2: 58, value3: 90 },
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

// ============================================================
// 视图/成员筛选联动派生函数（修复专家评估 Whyhi 指出的三处数据联动断裂）
// ============================================================

/**
 * 视图作用域缩放比例：以“当前视图的合作转化体量”占“团队总量”的比例，
 * 同时驱动趋势图（getScaledTrendData）与招募任务待办（getScaledTasks）随视图/成员筛选联动。
 * - self 视图 → 个人占比（小于 1，趋势/待办随个人缩放）
 * - team 空选 → 1（团队全量基准）
 * - team 有选 → 选中成员聚合占比
 * 比例钳制到 [0.2, 1]，避免个人视图数值过小或为 0 导致图表失真。
 */
export function getViewScopeRatio(confirmedCooperations: number): number {
  const teamTotal = mockInfluencerStatsTeam.confirmedCooperations;
  if (teamTotal <= 0) return 1;
  const ratio = confirmedCooperations / teamTotal;
  return Math.min(1, Math.max(0.2, ratio));
}

/** 按 role + 缩放比例生成趋势数据集（深拷贝，保证引用变化触发重渲染） */
export function getScaledTrendData(
  role: 'media' | 'marketing',
  ratio: number
): Record<string, TrendDataset> {
  const base = role === 'media' ? mediaTrendData : marketingTrendData;
  const scaled: Record<string, TrendDataset> = {};
  (Object.keys(base) as (keyof typeof base)[]).forEach((key) => {
    const ds = base[key];
    scaled[key] = {
      label1: ds.label1,
      label2: ds.label2,
      label3: ds.label3,
      data: ds.data.map((p) => ({
        date: p.date,
        value1: Math.max(0, Math.round(p.value1 * ratio)),
        value2: Math.max(0, Math.round(p.value2 * ratio)),
        value3: Math.max(0, Math.round(p.value3 * ratio)),
      })),
    };
  });
  return scaled;
}

/**
 * 按缩放比例生成招募任务列表：仅缩放“待办数（myActionableItems）”，
 * 使 self/team/选中成员下“我的待办/本组待办”随之联动；
 * 目标/已完成等项目级进度数据保持不变（项目目标是组织级，不随人变）。
 * total = round(review*ratio) + round(expense*ratio)，保证行内守恒。
 */
export function getScaledTasks(ratio: number): RecruitmentTask[] {
  return mockTasks.map((t) => {
    const pendingMyReview = Math.round(t.myActionableItems.pendingMyReview * ratio);
    const pendingMyExpenseReview = Math.round(t.myActionableItems.pendingMyExpenseReview * ratio);
    return {
      ...t,
      myActionableItems: {
        total: pendingMyReview + pendingMyExpenseReview,
        pendingMyReview,
        pendingMyExpenseReview,
      },
    };
  });
}

// ============================================================
// 成员名 / 部门成员（供 StageDetailModal 明细负责人渲染）
// ============================================================

/** 根据 id 查成员姓名 */
export function getMemberName(id: string): string {
  for (const dept of mockOrganization) {
    const m = dept.children.find((c) => c.id === id);
    if (m) return m.name;
  }
  return id;
}

/** 取当前角色对应部门的全部成员 */
export function getDeptMembers(role: 'media' | 'marketing'): { id: string; name: string }[] {
  const deptId = role === 'media' ? 'dept1' : 'dept2';
  return mockOrganization.find((d) => d.id === deptId)?.children ?? [];
}
