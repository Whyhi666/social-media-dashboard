import React, { useState, useMemo } from 'react';
import { X, ArrowUpRight, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

interface StageDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  stageTitle: string;
  count: number;
  personalMode: boolean;
  waitingStatus: 'me' | 'others' | 'none';
}

const PAGE_SIZE = 5;

export function StageDetailModal({ isOpen, onClose, stageTitle, count, personalMode, waitingStatus }: StageDetailModalProps) {
  const [page, setPage] = useState(0);

  if (!isOpen) return null;

  // 模拟明细数据（根据 count 生成更多条目以展示分页效果）
  const allMockBreakdown = useMemo(() => {
    const tasks = [
      { taskName: '2023双十一大促 - 抖音生活区', assignee: '张三' },
      { taskName: 'Q4季度新品发布 - 小红书美妆', assignee: '李四' },
      { taskName: '日常种草 - B站科技数码', assignee: '王五' },
      { taskName: '品牌联名企划 - 微博话题营销', assignee: '赵六' },
      { taskName: '跨境电商推广 - TikTok欧美区', assignee: '孙七' },
      { taskName: '双旦限定礼盒 - Instagram种草', assignee: '周八' },
      { taskName: '新锐白牌破圈 - 快手头部达人', assignee: '吴九' },
      { taskName: '私域引流专项 - 公众号+KOC矩阵', assignee: '郑十' },
      { taskName: '海外宠物垂类 - YouTube测评', assignee: '钱一' },
      { taskName: '春季限定联名 - 线下快闪推广', assignee: '陈二' },
    ];

    // 按 count 分配，保证总和 = count
    const totalItems = Math.max(count, tasks.length);
    const perTask = Math.ceil(count / tasks.length);
    return tasks.map((t, i) => ({
      id: i + 1,
      taskName: t.taskName,
      assignee: t.assignee,
      count: i === tasks.length - 1
        ? count - perTask * (tasks.length - 1)
        : perTask,
    })).filter(item => item.count > 0);
  }, [count]);

  const totalPages = Math.ceil(allMockBreakdown.length / PAGE_SIZE);
  const pagedItems = allMockBreakdown.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  // Reset page when modal opens with new data
  React.useEffect(() => { setPage(0); }, [isOpen]);

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

          {allMockBreakdown.length === 0 ? (
            <div className="py-8 text-center text-sm text-slate-400">暂无明细数据</div>
          ) : (
            <>
              <div className="space-y-3">
                {pagedItems.map(item => (
                  <div key={item.id} className="bg-white p-4 rounded-lg border border-slate-200 flex items-center justify-between shadow-sm hover:border-blue-300 transition-colors group">
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-slate-800 text-sm mb-1.5 truncate pr-2">{item.taskName}</div>
                      {!personalMode && (
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded w-fit border border-slate-100">
                          <User className="w-3.5 h-3.5" />
                          负责人: {item.assignee}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-6 shrink-0">
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

              {/* 分页 */}
              {totalPages > 1 && (
                <div className="mt-4 flex items-center justify-center gap-3">
                  <button
                    onClick={() => setPage(p => Math.max(0, p - 1))}
                    disabled={page === 0}
                    className="p-1.5 rounded-md text-slate-500 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-mono text-slate-500">
                    {page + 1} / {totalPages}
                  </span>
                  <button
                    onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                    disabled={page >= totalPages - 1}
                    className="p-1.5 rounded-md text-slate-500 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
