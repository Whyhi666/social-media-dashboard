import React, { useState } from 'react';
import { WorkflowStats } from '../types';
import { cn } from '../lib/utils';
import { AlertCircle, Clock, CheckCircle2, ArrowUpRight, Workflow } from 'lucide-react';
import { StageDetailModal } from './StageDetailModal';

interface WorkflowPipelineProps {
  data: WorkflowStats;
  personalMode?: boolean;
  role?: 'media' | 'marketing';
}

interface StageCardProps {
  title: string;
  count: number;
  waitingStatus?: 'me' | 'others' | 'none'; // 代表需要谁处理
  onClick?: () => void;
  personalMode?: boolean;
}

function StageCard({ title, count, waitingStatus = 'none', onClick, personalMode = true }: StageCardProps) {
  const isMe = waitingStatus === 'me';
  const isOthers = waitingStatus === 'others';
  const isClickable = count > 0;
  
  const content = (
    <div 
      className={cn(
        "flex flex-col p-3 rounded-lg border text-sm transition-all relative overflow-hidden group",
        isMe && count > 0
          ? "border-amber-400 bg-amber-50 shadow-sm hover:border-amber-500 hover:bg-amber-100/80 cursor-pointer" 
          : count > 0
            ? "border-gray-200 bg-white hover:border-gray-300 hover:bg-slate-50 cursor-pointer"
            : "border-gray-200 bg-white"
      )}
      onClick={isClickable ? onClick : undefined}
    >
      {isClickable && (
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowUpRight className={cn(
            "w-4 h-4", 
            isMe ? "text-amber-600" : "text-slate-400"
          )} />
        </div>
      )}

      <div className="flex items-center justify-between mb-1 gap-1">
        <span className={cn("font-medium truncate", isMe && count > 0 ? "text-amber-900" : "text-gray-600")} title={title}>
          {title}
        </span>
        {count > 0 && isMe && (
          <span className="shrink-0 text-[10px] px-1.5 py-0.5 rounded bg-amber-200/50 text-amber-800 font-medium">{personalMode ? "待我处理" : "待本组处理"}</span>
        )}
        {count > 0 && isOthers && (
          <span className="shrink-0 text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-medium">待对方处理</span>
        )}
      </div>
      <span className={cn("text-2xl font-bold font-mono tracking-tight", isMe && count > 0 ? "text-amber-700" : "text-gray-900")}>
        {count}
      </span>
    </div>
  );

  if (isClickable) {
    return (
      <button onClick={onClick} className="block w-full text-left outline-none focus:ring-2 focus:ring-blue-500 rounded-lg">
        {content}
      </button>
    );
  }

  return content;
}

export function WorkflowPipeline({ data, personalMode = false, role = 'media' }: WorkflowPipelineProps) {
  const [selectedStage, setSelectedStage] = useState<{title: string, count: number, waitingStatus: 'me' | 'others' | 'none'} | null>(null);

  const handleStageClick = (title: string, count: number, waitingStatus: 'me' | 'others' | 'none') => {
    setSelectedStage({ title, count, waitingStatus });
  };

  const isMedia = role === 'media';
  
  // 简化的文案
  const labels = {
    pendingApproval: "待审批提报",
    pendingQuote: "待报价",
    quotedPendingApproval: "待审批报价",
    pendingCooperation: "待确认合作",
      
    pendingExecWaitDraft: "待执行(待提稿)",
    pendingExecResubmit: "待执行(待重新提稿)",
    pendingReview: "待审稿",
    pendingOthersReview: "待他人审稿",
    pendingExecFinalized: "待执行(已定稿)",
    pendingCompletion: "待完结执行",
      
    pendingExpense: "待生成支出",
    pendingMyExpenseReview: "待我审核支出",
    pendingOthersExpenseReview: "待他人审核支出",
    pendingPayment: "待付款",
  };

  const getWaitingStatus = (waitMarket: boolean, waitMedia: boolean) => {
    if (waitMarket && !isMedia) return 'me';
    if (waitMarket && isMedia) return 'others';
    if (waitMedia && isMedia) return 'me';
    if (waitMedia && !isMedia) return 'others';
    return 'none';
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-6">
      <h3 className="text-base font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <Workflow className="w-4 h-4 text-slate-500" />
        业务流转链路
      </h3>
      <div className="space-y-6">
      <StageDetailModal 
        isOpen={!!selectedStage}
        onClose={() => setSelectedStage(null)}
        stageTitle={selectedStage?.title || ''}
        count={selectedStage?.count || 0}
        personalMode={personalMode}
        waitingStatus={selectedStage?.waitingStatus || 'none'}
      />
      {/* 阶段 1: 投放前 */}
      <div className="relative bg-slate-50/50 rounded-xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-bold shadow-sm border border-blue-200">1</div>
          <h3 className="font-semibold text-slate-800 text-base">投放前</h3>
          <div className="h-px bg-slate-200 flex-1 ml-4"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StageCard title={labels.pendingApproval} count={data.pendingMarketApprovalLeads + data.pendingMarketApprovalInfluencers} waitingStatus={getWaitingStatus(true, false)} onClick={() => handleStageClick(labels.pendingApproval, data.pendingMarketApprovalLeads + data.pendingMarketApprovalInfluencers, getWaitingStatus(true, false))} personalMode={personalMode} />
          <StageCard title={labels.pendingQuote} count={data.approvedPendingQuote} waitingStatus={getWaitingStatus(false, true)} onClick={() => handleStageClick(labels.pendingQuote, data.approvedPendingQuote, getWaitingStatus(false, true))} personalMode={personalMode} />
          <StageCard title={labels.quotedPendingApproval} count={data.quotedPendingApproval} waitingStatus={getWaitingStatus(true, false)} onClick={() => handleStageClick(labels.quotedPendingApproval, data.quotedPendingApproval, getWaitingStatus(true, false))} personalMode={personalMode} />
          <StageCard title={labels.pendingCooperation} count={data.approvedPendingCooperation} waitingStatus={getWaitingStatus(false, true)} onClick={() => handleStageClick(labels.pendingCooperation, data.approvedPendingCooperation, getWaitingStatus(false, true))} personalMode={personalMode} />
        </div>
      </div>

      {/* 阶段 2: 投放中 */}
      <div className="relative bg-slate-50/50 rounded-xl p-6 border border-slate-200 shadow-sm">
        <div className="absolute -top-6 left-9 w-px h-6 bg-slate-300 border-l border-dashed border-slate-400"></div>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm font-bold shadow-sm border border-indigo-200">2</div>
          <h3 className="font-semibold text-slate-800 text-base">投放中</h3>
          <div className="h-px bg-slate-200 flex-1 ml-4"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <StageCard title={labels.pendingExecWaitDraft} count={data.confirmedPendingExecutionWaitDraft} waitingStatus={getWaitingStatus(false, true)} onClick={() => handleStageClick(labels.pendingExecWaitDraft, data.confirmedPendingExecutionWaitDraft, getWaitingStatus(false, true))} personalMode={personalMode} />
          <StageCard title={labels.pendingExecResubmit} count={data.confirmedPendingExecutionResubmit} waitingStatus={getWaitingStatus(false, true)} onClick={() => handleStageClick(labels.pendingExecResubmit, data.confirmedPendingExecutionResubmit, getWaitingStatus(false, true))} personalMode={personalMode} />
          <StageCard title={labels.pendingReview} count={data.pendingMyReview} waitingStatus="me" onClick={() => handleStageClick(labels.pendingReview, data.pendingMyReview, "me")} personalMode={personalMode} />
          <StageCard title={labels.pendingOthersReview} count={data.pendingOthersReview} waitingStatus="others" onClick={() => handleStageClick(labels.pendingOthersReview, data.pendingOthersReview, "others")} personalMode={personalMode} />
          <StageCard title={labels.pendingExecFinalized} count={data.confirmedPendingExecutionFinalized} waitingStatus={getWaitingStatus(false, true)} onClick={() => handleStageClick(labels.pendingExecFinalized, data.confirmedPendingExecutionFinalized, getWaitingStatus(false, true))} personalMode={personalMode} />
          <StageCard title={labels.pendingCompletion} count={data.startedPendingCompletion} waitingStatus={getWaitingStatus(true, false)} onClick={() => handleStageClick(labels.pendingCompletion, data.startedPendingCompletion, getWaitingStatus(true, false))} personalMode={personalMode} />
        </div>
      </div>

      {/* 阶段 3: 投放后 */}
      <div className="relative bg-slate-50/50 rounded-xl p-6 border border-slate-200 shadow-sm">
        <div className="absolute -top-6 left-9 w-px h-6 bg-slate-300 border-l border-dashed border-slate-400"></div>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-sm font-bold shadow-sm border border-emerald-200">3</div>
          <h3 className="font-semibold text-slate-800 text-base">投放后</h3>
          <div className="h-px bg-slate-200 flex-1 ml-4"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StageCard title={labels.pendingExpense} count={data.pendingExpenseGeneration} waitingStatus={getWaitingStatus(false, true)} onClick={() => handleStageClick(labels.pendingExpense, data.pendingExpenseGeneration, getWaitingStatus(false, true))} personalMode={personalMode} />
          <StageCard title={labels.pendingMyExpenseReview} count={data.pendingMyExpenseReview} waitingStatus="me" onClick={() => handleStageClick(labels.pendingMyExpenseReview, data.pendingMyExpenseReview, "me")} personalMode={personalMode} />
          <StageCard title={labels.pendingOthersExpenseReview} count={data.pendingOthersExpenseReview} waitingStatus="others" onClick={() => handleStageClick(labels.pendingOthersExpenseReview, data.pendingOthersExpenseReview, "others")} personalMode={personalMode} />
          <StageCard title={labels.pendingPayment} count={data.pendingPayment} waitingStatus={getWaitingStatus(false, true)} onClick={() => handleStageClick(labels.pendingPayment, data.pendingPayment, getWaitingStatus(false, true))} personalMode={personalMode} />
        </div>
      </div>
    </div>
    </div>
  );
}
