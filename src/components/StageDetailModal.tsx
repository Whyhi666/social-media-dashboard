import React, { useEffect } from 'react';
import { X, ArrowUpRight, User } from 'lucide-react';
import { cn } from '../lib/utils';

interface StageDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  stageTitle: string;
  count: number;
  personalMode: boolean;
  waitingStatus: 'me' | 'others' | 'none';
  /** 明细负责人候选：self 视图传空（不展示负责人），team 视图传选中成员或部门全员 */
  assignees?: string[];
}

// 明细项目名池（项目级数据，与人员无关）
const TASK_NAME_POOL = [
  '2023双十一大促 - 抖音生活区',
  'Q4季度新品发布 - 小红书美妆',
  '日常种草 - B站科技数码',
];

export function StageDetailModal({
  isOpen,
  onClose,
  stageTitle,
  count,
  personalMode,
  waitingStatus,
  assignees = [],
}: StageDetailModalProps) {
  // ESC 关闭弹窗
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // 明细行：count 均分到 min(count, 3) 行，总和守恒；负责人按 assignees 轮转（self 不展示）
  const numItems = Math.max(1, Math.min(TASK_NAME_POOL.length, count));
  const base = Math.floor(count / numItems);
  let remainder = count % numItems;
  const mockBreakdown = Array.from({ length: numItems }, (_, i) => {
    const itemCount = base + (remainder > 0 ? 1 : 0);
    if (remainder > 0) remainder--;
    return {
      id: i + 1,
      taskName: TASK_NAME_POOL[i],
      assignee: personalMode ? '' : assignees.length > 0 ? assignees[i % assignees.length] : '—',
      count: itemCount,
    };
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={(e) => {
        // 点击遮罩关闭（点击弹窗内容不关闭）
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-slate-800">{stageTitle}</h3>
            <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs font-mono font-medium">共 {count} 项</span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1.5 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto bg-slate-50 flex-1">
          {waitingStatus === 'me' ? (
            <p className="text-sm text-slate-500 mb-4">以下是需要您处理的任务明细，点击去处理可跳转至原任务详情：</p>
          ) : waitingStatus === 'others' ? (
            <p className="text-sm text-slate-500 mb-4">以下是待对方处理的任务明细，可点击查看详情：</p>
          ) : (
            <p className="text-sm text-slate-500 mb-4">以下是该节点下的任务明细，请及时关注并协调资源：</p>
          )}

          <div className="space-y-3">
            {mockBreakdown.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-lg border border-slate-200 flex items-center justify-between shadow-sm hover:border-blue-300 transition-colors group">
                <div>
                  <div className="font-medium text-slate-800 text-sm mb-1.5">{item.taskName}</div>
                  {!personalMode && (
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded w-fit border border-slate-100">
                      <User className="w-3.5 h-3.5" />
                      负责人: {item.assignee}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-xs text-slate-400 mb-0.5">待处理</div>
                    <div className="font-mono font-bold text-slate-700 text-base">{item.count}</div>
                  </div>
                  <button
                    type="button"
                    title="跳转至原任务详情"
                    className={cn(
                      'px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1',
                      waitingStatus === 'me'
                        ? 'bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200'
                        : 'bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200'
                    )}
                  >
                    {waitingStatus === 'me' ? '去处理' : '去查看'}
                    <ArrowUpRight className={cn('w-3 h-3', waitingStatus === 'me' ? 'text-amber-500' : 'text-blue-500')} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
