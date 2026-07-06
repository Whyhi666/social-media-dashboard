import React from 'react';
import { X, ArrowUpRight, User } from 'lucide-react';
import { cn } from '../lib/utils';

interface StageDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  stageTitle: string;
  count: number;
  personalMode: boolean;
  waitingStatus: 'me' | 'others' | 'none';
}

export function StageDetailModal({ isOpen, onClose, stageTitle, count, personalMode, waitingStatus }: StageDetailModalProps) {
  if (!isOpen) return null;

  // 模拟明细数据
  const mockBreakdown = [
    { id: 1, taskName: '2023双十一大促 - 抖音生活区', assignee: '张三', count: Math.ceil(count * 0.5) },
    { id: 2, taskName: 'Q4季度新品发布 - 小红书美妆', assignee: '李四', count: Math.ceil(count * 0.3) },
    { id: 3, taskName: '日常种草 - B站科技数码', assignee: '王五', count: count - Math.ceil(count * 0.5) - Math.ceil(count * 0.3) },
  ].filter(item => item.count > 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
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
            {mockBreakdown.map(item => (
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
                  <a 
                    href="#" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={cn(
                      "px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1",
                      waitingStatus === 'me' 
                        ? "bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200" 
                        : "bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200"
                    )}
                  >
                    {waitingStatus === 'me' ? '去处理' : '去查看'} 
                    <ArrowUpRight className={cn("w-3 h-3", waitingStatus === 'me' ? "text-amber-500" : "text-blue-500")} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
