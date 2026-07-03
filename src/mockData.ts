import { InfluencerStats, WorkflowStats, RecruitmentTask } from './types';

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

export const mockTeamMembers = [
  { id: 'all', name: '全部成员' },
  { id: 'u1', name: '张三' },
  { id: 'u2', name: '李四' },
  { id: 'u3', name: '王五' },
];

export const mockWorkflowStatsU2: WorkflowStats = {
  pendingMarketApprovalLeads: 12,
  pendingMarketApprovalInfluencers: 5,
  approvedPendingQuote: 8,
  quotedPendingApproval: 3,
  approvedPendingCooperation: 4,
  confirmedPendingExecutionWaitDraft: 15,
  confirmedPendingExecutionResubmit: 4,
  pendingMyReview: 5,
  pendingOthersReview: 6,
  confirmedPendingExecutionFinalized: 8,
  startedPendingCompletion: 12,
  completed: 80,
  pendingExpenseGeneration: 6,
  pendingMyExpenseReview: 3,
  pendingOthersExpenseReview: 4,
  pendingPayment: 10,
};

export const mockWorkflowStatsU3: WorkflowStats = {
  pendingMarketApprovalLeads: 8,
  pendingMarketApprovalInfluencers: 4,
  approvedPendingQuote: 6,
  quotedPendingApproval: 5,
  approvedPendingCooperation: 3,
  confirmedPendingExecutionWaitDraft: 12,
  confirmedPendingExecutionResubmit: 2,
  pendingMyReview: 14,
  pendingOthersReview: 8,
  confirmedPendingExecutionFinalized: 6,
  startedPendingCompletion: 9,
  completed: 65,
  pendingExpenseGeneration: 5,
  pendingMyExpenseReview: 7,
  pendingOthersExpenseReview: 3,
  pendingPayment: 8,
};

export const mockInfluencerStatsU2: InfluencerStats = {
  totalLeads: 1520, totalInfluencers: 420, confirmedCooperations: 180,
  newLeadsThisMonth: 120, newInfluencersThisMonth: 45, emailsSentThisMonth: 210, emailsReceivedThisMonth: 80, contactsEmailedThisMonth: 90, confirmedThisMonth: 15
};

export const mockInfluencerStatsU3: InfluencerStats = {
  totalLeads: 850, totalInfluencers: 310, confirmedCooperations: 120,
  newLeadsThisMonth: 40, newInfluencersThisMonth: 15, emailsSentThisMonth: 150, emailsReceivedThisMonth: 65, contactsEmailedThisMonth: 60, confirmedThisMonth: 8
};

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
