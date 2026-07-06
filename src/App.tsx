import React, { useState, useMemo, useCallback } from 'react';
import StatCard from './components/StatCard';
import TrendChart from './components/TrendChart';
import WorkflowPipeline from './components/WorkflowPipeline';
import TeamWorkloadChart from './components/TeamWorkloadChart';
import TeamWorkloadModal from './components/TeamWorkloadModal';
import FilterBar, { FilterState, DEFAULT_FILTER } from './components/FilterBar';
import { mockStages, mockStats, mockTrendData, mockTeamWorkload } from './mockData';
import { Stage, TeamWorkload } from './types';

const App: React.FC = () => {
  const [filter, setFilter] = useState<FilterState>(DEFAULT_FILTER);
  const [selectedTeam, setSelectedTeam] = useState<TeamWorkload | null>(null);

  /* 负责人选项（从 mockData 动态提取） */
  const assigneeOptions = useMemo(() => {
    const names = new Set<string>();
    mockStages.forEach((s) => {
      if (s.assignee) names.add(s.assignee);
      s.tasks?.forEach((t) => {
        if (t.assignee) names.add(t.assignee);
      });
    });
    return Array.from(names).map((name) => ({ value: name, label: name }));
  }, []);

  /* 筛选逻辑 */
  const filterStage = useCallback(
    (stage: Stage): boolean => {
      // 搜索：客户名 / 项目名 / 关键词
      if (filter.search) {
        const kw = filter.search.toLowerCase();
        const inClient = stage.clientName?.toLowerCase().includes(kw);
        const inProject = stage.projectName?.toLowerCase().includes(kw);
        const inTasks = stage.tasks?.some(
          (t) =>
            t.title?.toLowerCase().includes(kw) ||
            t.content?.toLowerCase().includes(kw)
        );
        if (!inClient && !inProject && !inTasks) return false;
      }

      // 平台筛选
      if (filter.platforms.length > 0) {
        if (!stage.platform || !filter.platforms.includes(stage.platform)) return false;
      }

      // 状态筛选
      if (filter.statuses.length > 0) {
        if (!stage.status || !filter.statuses.includes(stage.status)) return false;
      }

      // 负责人筛选（阶段负责人或阶段内任一任务的负责人匹配即可）
      if (filter.assignees.length > 0) {
        const assigneeMatch =
          (stage.assignee && filter.assignees.includes(stage.assignee)) ||
          stage.tasks?.some((t) => t.assignee && filter.assignees.includes(t.assignee));
        if (!assigneeMatch) return false;
      }

      // 日期范围筛选
      if (filter.dateRange.start || filter.dateRange.end) {
        const stageStart = stage.startDate || stage.createdAt;
        const stageEnd = stage.endDate || stage.deadline;
        if (filter.dateRange.start && stageStart && stageStart < filter.dateRange.start) return false;
        if (filter.dateRange.end && stageEnd && stageEnd > filter.dateRange.end) return false;
      }

      return true;
    },
    [filter]
  );

  /* 筛选后的数据 */
  const filteredStages = useMemo(
    () => mockStages.filter(filterStage),
    [filterStage]
  );

  /* 筛选后的统计卡片数据 */
  const filteredStats = useMemo(() => {
    const total = filteredStages.length;
    const executing = filteredStages.filter((s) => s.status === '执行中').length;
    const completed = filteredStages.filter((s) => s.status === '已完成').length;
    const pending = filteredStages.filter((s) => s.status === '待执行' || s.status === '延期').length;

    return {
      ...mockStats,
      totalProjects: total || mockStats.totalProjects,
      executingProjects: executing || mockStats.executingProjects,
      completedProjects: completed || mockStats.completedProjects,
      pendingReviews: pending || mockStats.pendingReviews,
    };
  }, [filteredStages]);

  /* 筛选是否激活 */
  const isFiltered =
    filter.search !== '' ||
    filter.platforms.length > 0 ||
    filter.statuses.length > 0 ||
    filter.assignees.length > 0 ||
    filter.dateRange.start !== '' ||
    filter.dateRange.end !== '';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 顶部导航 */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                社媒营销执行看板
              </h1>
              {isFiltered && (
                <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  筛选模式
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="hidden sm:inline">更新于: {new Date().toLocaleString('zh-CN')}</span>
              <span className="w-2 h-2 rounded-full bg-green-400" title="数据正常" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
        {/* 筛选栏 */}
        <FilterBar
          filter={filter}
          onChange={setFilter}
          assigneeOptions={assigneeOptions}
        />

        {/* 统计卡片 */}
        <StatCard stats={filteredStats} />

        {/* 趋势图 + 团队负载 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TrendChart data={mockTrendData} />
          <TeamWorkloadChart
            data={mockTeamWorkload}
            onTeamClick={setSelectedTeam}
          />
        </div>

        {/* Pipeline 泳道图 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-3 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
              执行流水线
            </h2>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {filteredStages.length} 个阶段
              {isFiltered && `（过滤自 ${mockStages.length} 个）`}
            </span>
          </div>
          <WorkflowPipeline stages={filteredStages} />
        </div>
      </main>

      {/* 团队负载弹窗 */}
      {selectedTeam && (
        <TeamWorkloadModal
          team={selectedTeam}
          onClose={() => setSelectedTeam(null)}
        />
      )}
    </div>
  );
};

export default App;
