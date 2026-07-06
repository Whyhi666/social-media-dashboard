import React from 'react';
import { TeamWorkload, MemberWorkload } from '../types';

interface TeamWorkloadModalProps {
  team: TeamWorkload;
  onClose: () => void;
}

const TeamWorkloadModal: React.FC<TeamWorkloadModalProps> = ({ team, onClose }) => {
  const totalTasks = team.members.reduce((sum, m) => sum + m.totalTasks, 0);
  const completedTasks = team.members.reduce((sum, m) => sum + m.completedTasks, 0);
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 遮罩 */}
      <div
        className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* 弹窗 */}
      <div className="relative w-full max-w-lg mx-2 sm:mx-0 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-scale-in max-h-[90vh] flex flex-col">
        {/* 头部 */}
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                {team.teamName.charAt(0)}
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                  {team.teamName}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {team.members.length} 名成员 · 共 {totalTasks} 个任务
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* 完成率总览 */}
          <div className="mt-3 flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-gray-500 dark:text-gray-400">完成率</span>
              <span className={`font-semibold ${
                completionRate >= 80 ? 'text-green-600 dark:text-green-400' :
                completionRate >= 50 ? 'text-blue-600 dark:text-blue-400' :
                'text-yellow-600 dark:text-yellow-400'
              }`}>
                {completionRate}%
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-gray-500 dark:text-gray-400">已完成</span>
              <span className="font-semibold text-gray-700 dark:text-gray-200">{completedTasks}/{totalTasks}</span>
            </div>
            <div className="flex-1 h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden max-w-[120px]">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  completionRate >= 80 ? 'bg-green-400' :
                  completionRate >= 50 ? 'bg-blue-400' :
                  'bg-yellow-400'
                }`}
                style={{ width: `${completionRate}%` }}
              />
            </div>
          </div>
        </div>

        {/* 成员列表 */}
        <div className="px-4 sm:px-6 py-3 overflow-y-auto flex-1">
          <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            成员工作量
          </h4>
          <div className="space-y-2">
            {team.members.map((member) => (
              <MemberRow key={member.userId} member={member} />
            ))}
          </div>
        </div>

        {/* 底部 */}
        <div className="px-4 sm:px-6 py-3 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-gray-600 bg-white dark:bg-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  );
};

/* 成员行组件 */
const MemberRow: React.FC<{ member: MemberWorkload }> = ({ member }) => {
  const loadRate = member.totalTasks > 0
    ? Math.round((member.inProgressTasks / member.totalTasks) * 100)
    : 0;

  return (
    <div className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
      {/* 头像 */}
      <div className="relative flex-shrink-0">
        {member.avatar ? (
          <img
            src={member.avatar}
            alt={member.name}
            className="w-9 h-9 rounded-full object-cover"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-300 to-blue-500 flex items-center justify-center text-white text-xs font-semibold">
            {member.name.charAt(0)}
          </div>
        )}
        {/* 在线状态指示器 */}
        <span
          className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${
            member.isOnline ? 'bg-green-400' : 'bg-gray-300 dark:bg-gray-500'
          }`}
        />
      </div>

      {/* 信息 */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-900 dark:text-white truncate">
            {member.name}
          </span>
          {member.role && (
            <span className="text-[10px] text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded-full truncate max-w-[80px]">
              {member.role}
            </span>
          )}
        </div>

        {/* 进度条 + 数字 */}
        <div className="mt-1.5 flex items-center gap-2">
          <div className="flex-1 h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden max-w-[140px]">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                loadRate >= 80 ? 'bg-red-400' :
                loadRate >= 50 ? 'bg-yellow-400' :
                'bg-blue-400'
              }`}
              style={{ width: `${loadRate}%` }}
            />
          </div>
          <div className="flex items-center gap-2 text-[11px] text-gray-500 dark:text-gray-400">
            <span className="text-yellow-600 dark:text-yellow-400 font-medium">
              {member.inProgressTasks} 进行中
            </span>
            <span className="text-green-600 dark:text-green-400 font-medium">
              {member.completedTasks} 已完成
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamWorkloadModal;
