import React, { useState, useEffect, useMemo } from 'react';
import { ViewMode } from './types';
import {
  allMemberIds,
  mockOrganization,
  mockInfluencerStatsSelf,
  mockInfluencerStatsTeam,
  mockWorkflowStatsSelf,
  mockWorkflowStatsTeam,
  mockTasks,
  getAggregatedInfluencerStats,
  getAggregatedWorkflowStats,
  getWorkloadData,
  getWorkloadBars,
} from './mockData';
import { StatCard } from './components/StatCard';
import { WorkflowPipeline } from './components/WorkflowPipeline';
import { TaskProgressTable } from './components/TaskProgressTable';
import { MemberSelect } from './components/MemberSelect';
import { TeamWorkloadChart } from './components/TeamWorkloadChart';
import { TrendChart } from './components/TrendChart';
import { PersonalMemo } from './components/PersonalMemo';
import { Users, User, Mail, Database, CheckCircle, BarChart3, LayoutDashboard, Target, RefreshCw, Activity, UserPlus, Send, Inbox, TrendingUp, Handshake, Search, X } from 'lucide-react';
import { cn } from './lib/utils';

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('self');
  const [role, setRole] = useState<'media' | 'marketing'>('media');
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([...allMemberIds]);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [refreshFeedback, setRefreshFeedback] = useState(false);

  // 模拟当前登录用户（张三，媒介部）
  const currentUserId = 'u1';
  const currentUserDept = mockOrganization.find(d => d.children.some(c => c.id === currentUserId));
  const teamMemberIds = currentUserDept?.children.map(c => c.id) || [];

  // 计算选中成员中非管辖范围的成员
  const outOfScopeInfo = useMemo(() => {
    const outOfScopeIds = selectedMemberIds.filter(id => !teamMemberIds.includes(id));
    const names = outOfScopeIds.map(id => {
      for (const dept of mockOrganization) {
        const m = dept.children.find(c => c.id === id);
        if (m) return `${m.name}（${dept.name}）`;
      }
      return '';
    }).filter(Boolean);
    return { ids: outOfScopeIds, names, count: outOfScopeIds.length };
  }, [selectedMemberIds, teamMemberIds]);

  // 模拟首次加载
  useEffect(() => {
    const timer = setTimeout(() => setIsInitialLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const isPersonalMode = viewMode === 'self';

  // 根据当前视图和选中成员计算数据
  const influencerStats = isPersonalMode
    ? mockInfluencerStatsSelf
    : (selectedMemberIds.length === allMemberIds.length && allMemberIds.every(id => selectedMemberIds.includes(id)))
      ? mockInfluencerStatsTeam
      : getAggregatedInfluencerStats(selectedMemberIds);

  const workflowStats = isPersonalMode
    ? mockWorkflowStatsSelf
    : (selectedMemberIds.length === allMemberIds.length && allMemberIds.every(id => selectedMemberIds.includes(id)))
      ? mockWorkflowStatsTeam
      : getAggregatedWorkflowStats(selectedMemberIds);

  // 团队负载图数据
  const workloadData = isPersonalMode ? [] : getWorkloadData(selectedMemberIds, role);
  const workloadBars = getWorkloadBars(role);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setLastUpdated(new Date());
      setIsRefreshing(false);
      setRefreshFeedback(true);
      setTimeout(() => setRefreshFeedback(false), 2000);
    }, 800);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <div className="min-h-screen pb-12">
      {/* 顶部导航 */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* 左侧：Logo、标题与刷新时间 */}
          <div className="flex items-center gap-3 flex-1">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">执行看板</h1>
            <div className="ml-2 flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100 shadow-inner">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-mono">{formatTime(lastUpdated)}</span>
              {refreshFeedback && (
                <span className="text-emerald-600 font-medium animate-in fade-in slide-in-from-left-1 duration-300">
                  已刷新
                </span>
              )}
              <button
                onClick={handleRefresh}
                className="ml-1 text-slate-400 hover:text-slate-800 transition-colors p-0.5 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                title="刷新数据"
              >
                <RefreshCw className={cn("w-3 h-3", isRefreshing && "animate-spin")} />
              </button>
            </div>
          </div>
          
          {/* 中间：视图切换器 (固定居中，不随右侧内容变化而抖动) */}
          <div className="flex justify-center flex-1">
            <div className="flex bg-slate-100/80 p-1 rounded-lg border border-slate-200 shadow-inner">
              <button
                onClick={() => { setViewMode('self'); setSelectedMemberIds([...allMemberIds]); }}
                className={cn(
                  "flex items-center gap-2 px-5 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ease-in-out",
                  viewMode === 'self' ? "bg-white shadow text-blue-700" : "text-slate-500 hover:text-slate-800"
                )}
              >
                <User className="w-4 h-4" />
                我的工作台
              </button>
              <button
                onClick={() => { setViewMode('team'); setSelectedMemberIds([...allMemberIds]); }}
                className={cn(
                  "flex items-center gap-2 px-5 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ease-in-out",
                  viewMode === 'team' ? "bg-white shadow text-blue-700" : "text-slate-500 hover:text-slate-800"
                )}
              >
                <Users className="w-4 h-4" />
                团队全局视图
              </button>
            </div>
          </div>

          {/* 右侧：筛选与操作 */}
          <div className="flex items-center justify-end flex-1 gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500 font-medium">角色:</span>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as 'media' | 'marketing')}
                className="text-sm bg-white border border-slate-200 rounded-md py-1.5 pl-3 pr-8 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer text-slate-700 shadow-sm hover:border-slate-300"
              >
                <option value="media">媒介</option>
                <option value="marketing">市场</option>
              </select>
            </div>
            
            <div className={cn(
              "flex items-center gap-2 transition-all duration-300 ease-in-out",
              viewMode === 'team' ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"
            )}>
              <span className="text-sm text-slate-500 font-medium">成员筛选:</span>
              <MemberSelect selectedIds={selectedMemberIds} onChange={setSelectedMemberIds} currentUserId={currentUserId} />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        
        {/* 模块一：达人库情况 */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Database className="w-5 h-5 text-slate-500" />
            <h2 className="text-lg font-semibold">资源池与触达数据</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <StatCard
              title="线索总量"
              value={influencerStats.totalLeads.toLocaleString()}
              icon={Database}
              loading={isInitialLoading}
            />
            <StatCard
              title="达人总量"
              value={influencerStats.totalInfluencers.toLocaleString()}
              icon={Users}
              loading={isInitialLoading}
            />
            <StatCard
              title="累计合作"
              value={influencerStats.confirmedCooperations.toLocaleString()}
              icon={Handshake}
              loading={isInitialLoading}
            />
            <StatCard
              title="本月新增合作"
              value={influencerStats.confirmedThisMonth.toLocaleString()}
              icon={TrendingUp}
              trend={{ value: 12.5, isPositive: true }}
              loading={isInitialLoading}
            />
            <StatCard
              title="本月新增线索"
              value={influencerStats.newLeadsThisMonth.toLocaleString()}
              icon={Activity}
              trend={{ value: 8.3, isPositive: true }}
              loading={isInitialLoading}
            />
            <StatCard
              title="本月新增达人"
              value={influencerStats.newInfluencersThisMonth.toLocaleString()}
              icon={UserPlus}
              trend={{ value: 2.1, isPositive: false }}
              loading={isInitialLoading}
            />
            <StatCard
              title="本月发送邮件"
              value={influencerStats.emailsSentThisMonth.toLocaleString()}
              icon={Send}
              trend={{ value: 15.7, isPositive: true }}
              loading={isInitialLoading}
            />
            <StatCard
              title="本月接收邮件"
              value={influencerStats.emailsReceivedThisMonth.toLocaleString()}
              icon={Inbox}
              loading={isInitialLoading}
            />
            <StatCard
              title="本月触达邮箱"
              value={influencerStats.contactsEmailedThisMonth.toLocaleString()}
              icon={Mail}
              loading={isInitialLoading}
            />
          </div>
        </section>

        {/* 图表概览区 */}
        {!isPersonalMode && outOfScopeInfo.count > 0 && (
          <div className="flex items-start gap-2.5 px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg text-sm shadow-sm">
            <div className="w-5 h-5 rounded-full bg-blue-200 text-blue-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">i</div>
            <div className="text-blue-800">
              <span className="font-medium">筛选提示：</span>
              当前选中了 {outOfScopeInfo.count} 位非本部门成员（{outOfScopeInfo.names.join('、')}），
              其数据不在您的管辖范围内，部分图表可能显示为空。
            </div>
          </div>
        )}
        <section className="grid gap-4 min-h-[320px] grid-cols-1 lg:grid-cols-2">
          <TrendChart role={role} viewMode={viewMode} loading={isInitialLoading} />
          {!isPersonalMode ? (
            <TeamWorkloadChart
              data={workloadData}
              bars={workloadBars}
              roleLabel={role === 'media' ? '媒介' : '市场'}
              outOfScopeNames={outOfScopeInfo.count > 0 ? outOfScopeInfo.names : undefined}
            />
          ) : (
            <PersonalMemo />
          )}
        </section>

        {/* 模块二：审批与执行流转（漏斗待办） */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-slate-500" />
            <h2 className="text-lg font-semibold">核心业务流转链路 (漏斗视图)</h2>
          </div>
          <div className="bg-white p-1 rounded-2xl shadow-sm border border-slate-200">
            <WorkflowPipeline data={workflowStats} personalMode={isPersonalMode} role={role} />
          </div>
        </section>

        {/* 模块三：招募任务进度追踪 */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-slate-500" />
            <h2 className="text-lg font-semibold">招募任务进度追踪</h2>
          </div>
          <TaskProgressTable tasks={mockTasks} personalMode={isPersonalMode} />
        </section>

      </main>
    </div>
  );
}
