import React, { useState, useMemo, useCallback } from 'react';
import StatCard from './components/StatCard';
import TrendChart from './components/TrendChart';
import { WorkflowPipeline } from './components/WorkflowPipeline';
import TeamWorkloadChart from './components/TeamWorkloadChart';
import { MemberSelect } from './components/MemberSelect';
import { PersonalMemo } from './components/PersonalMemo';
import { TaskProgressTable } from './components/TaskProgressTable';
import {
  mockMemberInfluencerStats,
  mockMemberWorkflowStats,
  mockInfluencerStatsTeam,
  mockWorkflowStatsTeam,
  getAggregatedInfluencerStats,
  getAggregatedWorkflowStats,
  getWorkloadData,
  getWorkloadBars,
  marketingTrendData,
  mediaTrendData,
  mockTasks,
  mockExecutionStatsSelf,
  mockExecutionStatsTeam,
} from './mockData';
import { ViewMode } from './types';
import { ClipboardList, Info, Users } from 'lucide-react';

type Role = 'media' | 'marketing';

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('self');
  const [role, setRole] = useState<Role>('media');
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [updatedAt, setUpdatedAt] = useState<Date>(() => new Date());

  // mock 当前登录用户：随角色切换到对应部门（媒介→张三, 市场→李四）
  const currentUserId = role === 'media' ? 'u1' : 'u2';

  const handleRefresh = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setUpdatedAt(new Date());
    }, 600);
  }, []);

  // 切换角色时清空成员筛选（避免跨部门脏数据）
  const handleRoleChange = useCallback((r: Role) => {
    setRole(r);
    setSelectedMemberIds([]);
  }, []);

  /* ===== 数据聚合（viewMode / role / selectedMemberIds 联动） ===== */
  const influencerStats = useMemo(() => {
    if (viewMode === 'self') return mockMemberInfluencerStats[currentUserId];
    if (selectedMemberIds.length === 0) return mockInfluencerStatsTeam;
    return getAggregatedInfluencerStats(selectedMemberIds);
  }, [viewMode, currentUserId, selectedMemberIds]);

  const workflowStats = useMemo(() => {
    if (viewMode === 'self') return mockMemberWorkflowStats[currentUserId];
    if (selectedMemberIds.length === 0) return mockWorkflowStatsTeam;
    return getAggregatedWorkflowStats(selectedMemberIds);
  }, [viewMode, currentUserId, selectedMemberIds]);

  // StatCard 补充指标：执行次数/待执行/招募任务数（待执行从 workflowStats 派生）
  const statExtra = useMemo(() => {
    const execStats = viewMode === 'self' ? mockExecutionStatsSelf : mockExecutionStatsTeam;
    return {
      totalExecutions: execStats.totalExecutions,
      newExecutionsThisMonth: execStats.newExecutionsThisMonth,
      pendingExecutions:
        workflowStats.confirmedPendingExecutionWaitDraft +
        workflowStats.confirmedPendingExecutionResubmit +
        workflowStats.confirmedPendingExecutionFinalized,
      recruitmentTaskCount: mockTasks.length,
      newRecruitmentTasksThisMonth: execStats.newRecruitmentTasksThisMonth,
    };
  }, [viewMode, workflowStats]);

  const workloadData = useMemo(
    () => getWorkloadData(viewMode === 'self' ? [currentUserId] : selectedMemberIds, role),
    [viewMode, currentUserId, selectedMemberIds, role]
  );

  const workloadBars = useMemo(() => getWorkloadBars(role), [role]);
  const trendData = useMemo(() => (role === 'media' ? mediaTrendData : marketingTrendData), [role]);

  const updatedAtStr = updatedAt.toLocaleString('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 顶部导航：sticky 吸顶 */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center h-14 gap-3">
            {/* 左：标题 + 刷新 + 更新时间 */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <h1 className="text-base sm:text-lg font-bold text-slate-800 whitespace-nowrap">
                达人营销执行看板
              </h1>
              <button
                onClick={handleRefresh}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
                title="刷新数据"
              >
                <svg
                  className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </button>
              <span className="hidden md:inline text-[11px] text-slate-400 whitespace-nowrap">
                更新于 {updatedAtStr}
              </span>
            </div>

            {/* 中：视图切换（flex-1 居中，右侧组件显隐不影响其位置） */}
            <div className="flex-1 flex justify-center">
              <div className="flex items-center gap-0.5 bg-slate-100 rounded-md p-0.5">
                {(
                  [
                    { key: 'self', label: '我的工作台' },
                    { key: 'team', label: '团队全局' },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setViewMode(tab.key)}
                    className={`px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium rounded transition-colors whitespace-nowrap ${
                      viewMode === tab.key
                        ? 'bg-white text-slate-800 shadow-sm'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 右：角色切换 + 成员筛选（仅 team 视图可交互） */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="flex items-center gap-0.5 bg-slate-100 rounded-md p-0.5">
                {(
                  [
                    { key: 'media', label: '媒介' },
                    { key: 'marketing', label: '市场' },
                  ] as const
                ).map((r) => (
                  <button
                    key={r.key}
                    onClick={() => handleRoleChange(r.key)}
                    className={`px-2.5 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                      role === r.key
                        ? 'bg-white text-slate-800 shadow-sm'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
        {/* 团队视图：成员筛选条（含数据权限提示） */}
        {viewMode === 'team' && (
          <div className="flex items-center justify-between flex-wrap gap-2 px-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-slate-400" />
                成员筛选
              </span>
              <MemberSelect selectedIds={selectedMemberIds} onChange={setSelectedMemberIds} role={role} />
            </div>
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <Info className="w-3.5 h-3.5" />
              数据权限：仅可查看自己及下级成员数据
            </span>
          </div>
        )}

        {/* 资源池与触达数据 */}
        <StatCard stats={influencerStats} role={role} extra={statExtra} loading={loading} />

        {/* 趋势图 + (PersonalMemo / TeamWorkloadChart)：固定高度 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="h-[360px]">
            <TrendChart data={trendData} loading={loading} />
          </div>
          <div className="h-[360px]">
            {viewMode === 'self' ? (
              <PersonalMemo />
            ) : (
              <TeamWorkloadChart data={workloadData} bars={workloadBars} loading={loading} />
            )}
          </div>
        </div>

        {/* 业务流转链路 */}
        <WorkflowPipeline data={workflowStats} personalMode={viewMode === 'self'} role={role} />

        {/* 招募任务进度 */}
        <div>
          <h2 className="text-sm sm:text-base font-semibold text-slate-800 mb-3 px-1 flex items-center gap-2">
            <ClipboardList className="w-4 h-4 text-slate-500" />
            招募任务进度
          </h2>
          <TaskProgressTable tasks={mockTasks} personalMode={viewMode === 'self'} />
        </div>
      </main>
    </div>
  );
};

export default App;
