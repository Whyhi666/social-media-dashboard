import React, { useState, useMemo } from 'react';
import { RecruitmentTask } from '../types';
import { Clock, Target, AlertTriangle, ChevronDown, ChevronUp, AlertCircle, Filter, ArrowUpRight, Search } from 'lucide-react';

interface TaskProgressTableProps {
  tasks: RecruitmentTask[];
  personalMode?: boolean;
}

export function TaskProgressTable({ tasks, personalMode = true }: TaskProgressTableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filterState, setFilterState] = useState<'all' | 'actionable' | 'urgent' | 'followed'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  React.useEffect(() => {
    if (!personalMode && filterState === 'actionable') {
      setFilterState('all');
    }
  }, [personalMode, filterState]);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchSearch = task.name.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchSearch) return false;
      
      if (personalMode && filterState === 'actionable') return task.myActionableItems.total > 0;
      if (filterState === 'urgent') return task.daysRemaining < 15;
      if (filterState === 'followed') return !!task.isFollowed;
      return true;
    });
  }, [tasks, filterState, personalMode, searchQuery]);

  return (
    <div className="bg-white border rounded-xl shadow-sm overflow-hidden text-sm flex flex-col">
      <div className="border-b bg-slate-50/50 px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2 text-slate-600 font-medium">
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">任务筛选</span>
          </div>
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="搜索任务名称..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-3 py-1.5 w-full text-xs rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white rounded-md border p-1 shadow-sm w-full sm:w-auto overflow-x-auto">
          <button 
            onClick={() => setFilterState('all')}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors whitespace-nowrap ${filterState === 'all' ? 'bg-slate-100 text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
          >
            全部任务
          </button>
          <button 
            onClick={() => setFilterState('followed')}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors whitespace-nowrap ${filterState === 'followed' ? 'bg-blue-100 text-blue-800' : 'text-slate-500 hover:text-slate-700'}`}
          >
            我关注的
          </button>
          {personalMode && (
            <button 
              onClick={() => setFilterState('actionable')}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors whitespace-nowrap ${filterState === 'actionable' ? 'bg-amber-100 text-amber-800' : 'text-slate-500 hover:text-slate-700'}`}
            >
              我的待办
            </button>
          )}
          <button 
            onClick={() => setFilterState('urgent')}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors whitespace-nowrap ${filterState === 'urgent' ? 'bg-red-100 text-red-800' : 'text-slate-500 hover:text-slate-700'}`}
          >
            临近截止
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white border-b text-slate-600 font-medium">
              <th className="p-4 py-3">项目名称</th>
              <th className="p-4 py-3 text-center">距截止日期</th>
              <th className="p-4 py-3 min-w-[200px]">执行进度 (完成 / 目标)</th>
              <th className="p-4 py-3 hidden md:table-cell">漏斗数据 (提报/报价/确认合作/执行)</th>
              <th className="p-4 py-3 text-center">{personalMode ? '我的待办' : '本组待办'}</th>
              <th className="p-4 py-3 w-[100px] text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredTasks.length === 0 && (
              <tr>
                <td colSpan={8} className="p-8 text-center text-slate-500">
                  没有符合条件的任务数据
                </td>
              </tr>
            )}
            {filteredTasks.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-8 text-center text-slate-500">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Target className="w-8 h-8 text-slate-300 mb-2" />
                    <p className="text-base font-medium text-slate-600">暂无匹配的任务</p>
                    <p className="text-xs text-slate-400">请尝试调整筛选条件或搜索关键词</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredTasks.map((task) => (
              <React.Fragment key={task.id}>
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4">
                  <div className="font-medium text-slate-900">{task.name}</div>
                  <div className="text-xs text-slate-500 mt-1">截止日期: {task.deadline}</div>
                  {task.isFollowed && (
                    <div className="mt-1.5">
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-blue-50 text-blue-600 border border-blue-100 leading-tight">
                        已关注
                      </span>
                    </div>
                  )}
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-center gap-1.5 font-mono">
                    <Clock className={`w-3.5 h-3.5 ${task.daysRemaining < 15 ? 'text-red-500' : 'text-slate-400'}`} />
                    <span className={task.daysRemaining < 15 ? 'text-red-600 font-bold' : 'text-slate-700'}>
                      {task.daysRemaining} 天
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex flex-col gap-1.5 w-full max-w-[180px]">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="font-medium text-emerald-600">{task.currentCount} <span className="text-slate-400 font-normal">/ {task.targetCount}</span></span>
                      {task.missingCount > 0 ? (
                         <span className="inline-flex items-center gap-1 text-[10px] text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-100">
                           <AlertTriangle className="w-2.5 h-2.5" />
                           缺 {task.missingCount}
                         </span>
                      ) : (
                         <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                           已达标
                         </span>
                      )}
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500 rounded-full transition-all" 
                        style={{ width: `${Math.min(100, (task.currentCount / task.targetCount) * 100)}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="p-4 hidden md:table-cell">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                    <span className="px-1.5 py-0.5 bg-slate-100 rounded" title="提报">{task.stages.pendingSubmitApproval}</span>
                    <span className="text-slate-300">/</span>
                    <span className="px-1.5 py-0.5 bg-slate-100 rounded" title="报价">{task.stages.pendingQuoteApproval}</span>
                    <span className="text-slate-300">/</span>
                    <span className="px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded" title="确认合作">{task.stages.pendingConfirmCooperation}</span>
                    <span className="text-slate-300">/</span>
                    <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-700 rounded" title="执行">{task.stages.pendingStartExecution}</span>
                  </div>
                </td>
                <td className="p-4 text-center">
                  {task.myActionableItems.total > 0 ? (
                    <div className="inline-flex items-center justify-center min-w-[24px] h-6 px-2 rounded-full bg-red-100 text-red-700 font-bold font-mono text-xs">
                      {task.myActionableItems.total}
                    </div>
                  ) : (
                    <span className="text-slate-400 font-mono text-xs">-</span>
                  )}
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => toggleExpand(task.id)}
                    className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors flex items-center justify-center gap-1 ml-auto"
                  >
                    {expandedId === task.id ? '收起' : '待办'}
                    {expandedId === task.id ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  </button>
                </td>
              </tr>
              {/* Expanded Actionable Items Row */}
              {expandedId === task.id && (
                <tr className="bg-slate-50/80 shadow-inner">
                  <td colSpan={8} className="p-0 border-b border-slate-200">
                    <div className="px-6 py-5 ml-4 border-l-2 border-amber-400 bg-white shadow-sm my-3 mr-4 rounded-r-md">
                      <div className="flex items-center gap-6 text-sm">
                         <div className="flex items-center gap-2 text-amber-800 font-semibold">
                           <AlertCircle className="w-4 h-4" />
                           {personalMode ? '该任务下需您处理：' : '该任务下本组待处理：'}
                         </div>
                         {task.myActionableItems.total > 0 ? (
                           <div className="flex gap-4">
                              {task.myActionableItems.pendingMyReview > 0 && (
                                  <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-md border border-amber-200 shadow-sm transition-all hover:shadow hover:border-amber-300">
                                     <span className="text-slate-600 text-xs font-medium">{personalMode ? '待我审稿' : '本组待审稿'}</span>
                                     <span className="font-mono font-bold text-amber-700 text-base">{task.myActionableItems.pendingMyReview}</span>
                                     <a href="#" target="_blank" rel="noopener noreferrer" className="ml-2 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 rounded text-xs font-medium transition-colors flex items-center gap-1 group">
                                       去审稿 <ArrowUpRight className="w-3 h-3 text-amber-500 group-hover:text-amber-700" />
                                     </a>
                                  </div>
                              )}
                              {task.myActionableItems.pendingMyExpenseReview > 0 && (
                                  <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-md border border-amber-200 shadow-sm transition-all hover:shadow hover:border-amber-300">
                                     <span className="text-slate-600 text-xs font-medium">待审核支出</span>
                                     <span className="font-mono font-bold text-amber-700 text-base">{task.myActionableItems.pendingMyExpenseReview}</span>
                                     <a href="#" target="_blank" rel="noopener noreferrer" className="ml-2 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 rounded text-xs font-medium transition-colors flex items-center gap-1 group">
                                       去审核 <ArrowUpRight className="w-3 h-3 text-amber-500 group-hover:text-amber-700" />
                                     </a>
                                  </div>
                              )}
                           </div>
                         ) : (
                           <span className="text-slate-500 text-xs bg-slate-100 px-3 py-1.5 rounded-md">{personalMode ? '暂无需要您处理的节点事项' : '暂无本组待处理事项'}</span>
                         )}
                      </div>
                    </div>
                  </td>
                </tr>
              )}
              </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
