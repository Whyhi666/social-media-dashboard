import React from 'react';
import { TeamWorkload } from '../types';

interface TeamWorkloadChartProps {
  data: TeamWorkload[];
  onTeamClick?: (team: TeamWorkload) => void;
}

const TeamWorkloadChart: React.FC<TeamWorkloadChartProps> = ({ data, onTeamClick }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">团队负载</h3>
        <div className="flex flex-col items-center justify-center py-12 text-gray-400 dark:text-gray-500">
          <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p className="text-sm">暂无团队数据</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white">团队负载</h3>
        <span className="text-xs text-gray-400 dark:text-gray-500">{data.length} 个团队</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {data.map((team) => (
          <TeamCard key={team.teamId} team={team} onClick={onTeamClick} />
        ))}
      </div>
    </div>
  );
};

interface TeamCardProps {
  team: TeamWorkload;
  onClick?: (team: TeamWorkload) => void;
}

const TeamCard: React.FC<TeamCardProps> = ({ team, onClick }) => {
  const totalTasks = team.members.reduce((sum, m) => sum + m.totalTasks, 0);
  const completedTasks = team.members.reduce((sum, m) => sum + m.completedTasks, 0);
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <button
      onClick={() => onClick?.(team)}
      className="text-left w-full p-3 rounded-lg border border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/30 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:border-gray-200 dark:hover:border-gray-600 transition-all active:scale-[0.98] group"
    >
      {/* 团队名 + 完成率 */}
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
            {team.teamName.charAt(0)}
          </div>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {team.teamName}
          </span>
        </div>
        <span className={`text-xs font-semibold ${
          completionRate >= 80 ? 'text-green-600 dark:text-green-400' :
          completionRate >= 50 ? 'text-blue-600 dark:text-blue-400' :
          'text-yellow-600 dark:text-yellow-400'
        }`}>
          {completionRate}%
        </span>
      </div>

      {/* 进度条 */}
      <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full mb-2.5 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            completionRate >= 80 ? 'bg-green-400' :
            completionRate >= 50 ? 'bg-blue-400' :
            'bg-yellow-400'
          }`}
          style={{ width: `${completionRate}%` }}
        />
      </div>

      {/* 成员头像堆叠 + 统计 */}
      <div className="flex items-center justify-between">
        <div className="flex -space-x-1.5">
          {team.members.slice(0, 5).map((member) => (
            member.avatar ? (
              <img
                key={member.userId}
                src={member.avatar}
                alt={member.name}
                title={member.name}
                className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-800 object-cover"
              />
            ) : (
              <div
                key={member.userId}
                title={member.name}
                className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-800 bg-gradient-to-br from-blue-300 to-blue-500 flex items-center justify-center text-[9px] text-white font-semibold"
              >
                {member.name.charAt(0)}
              </div>
            )
          ))}
          {team.members.length > 5 && (
            <div className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-800 bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-[9px] text-gray-500 dark:text-gray-400 font-medium">
              +{team.members.length - 5}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 text-[11px] text-gray-400 dark:text-gray-500">
          <span>{totalTasks} 任务</span>
          <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
          <span className="text-green-500">{completedTasks} 完成</span>
        </div>
      </div>

      {/* 悬浮提示 */}
      <div className="mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-blue-500 dark:text-blue-400 flex items-center gap-1">
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        点击查看成员详情
      </div>
    </button>
  );
};

export default TeamWorkloadChart;
