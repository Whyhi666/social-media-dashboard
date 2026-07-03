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

export interface WorkflowStats {
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
