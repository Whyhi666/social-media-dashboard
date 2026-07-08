export type ViewMode = 'self' | 'team';

export interface InfluencerStats {
  totalLeads: number;
  totalInfluencers: number;
  confirmedCooperations: number;
  newLeadsThisMonth: number;
  newInfluencersThisMonth: number;
  emailsSentThisMonth: number;
  emailsReceivedThisMonth: number;
  contactsEmailedThisMonth: number;
  confirmedThisMonth: number;
}

/** 执行与招募补充指标（StatCard 合作转化/资源池用，按 self/team 区分） */
export interface ExecutionStats {
  totalExecutions: number; // 累计执行次数
  newExecutionsThisMonth: number; // 本月新增执行
  newRecruitmentTasksThisMonth: number; // 本月新增招募任务
}

export interface WorkflowStats {
  // 流量主申请与建联（投放前最前，媒介处理）
  pendingTrafficOwnerApproval: number;
  pendingCooperationIntention: number;

  // 提报与报价
  pendingMarketApprovalLeads: number;
  pendingMarketApprovalInfluencers: number;
  approvedPendingQuote: number;
  quotedPendingApproval: number;
  approvedPendingCooperation: number;
  
  // 执行与审稿
  confirmedPendingExecutionWaitDraft: number;
  confirmedPendingExecutionResubmit: number;
  pendingMyReview: number;
  pendingOthersReview: number;
  confirmedPendingExecutionFinalized: number;
  startedPendingCompletion: number;
  completed: number;
  
  // 结算
  pendingExpenseGeneration: number;
  pendingMyExpenseReview: number;
  pendingOthersExpenseReview: number;
  pendingPayment: number;
}

export interface RecruitmentTask {
  id: string;
  name: string;
  isFollowed?: boolean;
  deadline: string;
  daysRemaining: number;
  targetCount: number;
  currentCount: number;
  missingCount: number;
  stages: {
    pendingSubmitApproval: number;
    pendingQuoteApproval: number;
    pendingConfirmCooperation: number;
    pendingStartExecution: number;
    completed: number;
  };
  myActionableItems: {
    total: number;
    pendingMyReview: number;
    pendingMyExpenseReview: number;
  };
}

/** 团队成员负载数据条目（用于 TeamWorkloadChart 水平堆叠柱状图） */
export interface WorkloadDataItem {
  id: string;
  name: string;
  [key: string]: string | number;
}

/** 负载图的柱配置（key + 颜色） */
export interface WorkloadBarConfig {
  key: string;
  color: string;
}

/** 成员维度数据，包含个人的所有统计数据 */
export interface MemberData {
  influencerStats: InfluencerStats;
  workflowStats: WorkflowStats;
  workloadData: {
    media: WorkloadDataItem;
    marketing: WorkloadDataItem;
  };
}
