import React, { useState, useEffect } from 'react';
import { ViewMode } from './types';
import { 
  mockOrganization,
  mockInfluencerStatsSelf, 
  mockInfluencerStatsTeam, 
  mockWorkflowStatsSelf, 
  mockWorkflowStatsTeam,
  mockTasks,
  mockTeamMembers,
  mockWorkflowStatsU2,
  mockWorkflowStatsU3,
  mockInfluencerStatsU2,
  mockInfluencerStatsU3
} from './mockData';
import { StatCard } from './components/StatCard';
import { WorkflowPipeline } from './components/WorkflowPipeline';
import { TaskProgressTable } from './components/TaskProgressTable';
import { MemberSelect } from './components/MemberSelect';
import { TeamWorkloadChart } from './components/TeamWorkloadChart';
import { TrendChart } from './components/TrendChart';
import { PersonalMemo } from './components/PersonalMemo';
import { Users, User, Mail, Database, CheckCircle, BarChart3, LayoutDashboard, Target, RefreshCw, Activity } from 'lucide-react';
import { cn } from './lib/utils';

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('self');
  const [role, setRole] = useState<'media' | 'marketing'>('media');
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>(mockOrganization.flatMap(d => d.children.map(c => c.id)));
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  let isPersonalMode = viewMode === 'self';
  let influencerStats = mockInfluencerStatsSelf;
  let workflowStats = mockWorkflowStatsSelf;

  if (viewMode === 'team') {
    if (selectedMemberIds.length === mockOrganization.flatMap(d => d.children.map(c => c.id)).length) {
      influencerStats = mockInfluencerStatsTeam;
      workflowStats = mockWorkflowStatsTeam;
    } else if (selectedMemberIds.length === 1 && selectedMemberIds[0] === 'u1') {
      influencerStats = mockInfluencerStatsSelf;
      workflowStats = mockWorkflowStatsSelf;
    } else if (selectedMemberIds.length === 1 && selectedMemberIds[0] === 'u2') {
      influencerStats = mockInfluencerStatsU2;
      workflowStats = mockWorkflowStatsU2;
    } else if (selectedMemberIds.length === 1 && selectedMemberIds[0] === 'u3') {
      influencerStats = mockInfluencerStatsU3;
      workflowStats = mockWorkflowStatsU3;
    }
  }

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setLastUpdated(new Date());
      setIsRefreshing(false);
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
                onClick={() => { setViewMode('self'); setSelectedMemberIds(mockOrganization.flatMap(d => d.children.map(c => c.id))); }}
                className={cn(
                  "flex items-center gap-2 px-5 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ease-in-out",
                  viewMode === 'self' ? "bg-white shadow text-blue-700" : "text-slate-500 hover:text-slate-800"
                )}
              >
                <User className="w-4 h-4" />
                我的工作台
              </button>
              <button
                onClick={() => { setViewMode('team'); setSelectedMemberIds(mockOrganization.flatMap(d => d.children.map(c => c.id))); }}
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
              <MemberSelect selectedIds={selectedMemberIds} onChange={setSelectedMemberIds} />
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
            />
            <StatCard 
              title="达人总量" 
              value={influencerStats.totalInfluencers.toLocaleString()} 
            />
            <StatCard 
              title="累计合作" 
              value={influencerStats.confirmedCooperations.toLocaleString()} 
            />
            <StatCard 
              title="本月新增合作" 
              value={influencerStats.confirmedThisMonth.toLocaleString()} 
              trend={{ value: 12.5, isPositive: true }}
            />
            <StatCard 
              title="本月新增线索" 
              value={influencerStats.newLeadsThisMonth.toLocaleString()} 
            />
            <StatCard 
              title="本月新增达人" 
              value={influencerStats.newInfluencersThisMonth.toLocaleString()} 
            />
            <StatCard 
              title="本月发送邮件" 
              value={influencerStats.emailsSentThisMonth.toLocaleString()} 
            />
            <StatCard 
              title="本月接收邮件" 
              value={influencerStats.emailsReceivedThisMonth.toLocaleString()} 
            />
            <StatCard 
              title="本月触达邮箱" 
              value={influencerStats.contactsEmailedThisMonth.toLocaleString()} 
            />
          </div>
        </section>

        {/* 图表概览区 */}
        <section className="grid gap-4 min-h-[320px] grid-cols-1 lg:grid-cols-2">
          <TrendChart />
          {!isPersonalMode ? (
            <TeamWorkloadChart role={role} selectedMemberIds={selectedMemberIds} />
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
