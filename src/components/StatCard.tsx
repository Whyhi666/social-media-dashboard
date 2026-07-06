import React from 'react';

interface Stats {
  totalProjects: number;
  executingProjects: number;
  completedProjects: number;
  pendingReviews: number;
  totalRevenue?: string;
}

interface StatCardProps {
  stats: Stats;
}

const StatCard: React.FC<StatCardProps> = ({ stats }) => {
  if (!stats) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-5 animate-pulse">
            <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded mb-3" />
            <div className="h-7 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
            <div className="h-2 w-24 bg-gray-100 dark:bg-gray-700 rounded" />
          </div>
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: '总项目数',
      value: stats.totalProjects,
      subtitle: '全部执行中项目',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      title: '执行中',
      value: stats.executingProjects,
      subtitle: '正在进行',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: 'text-yellow-600 dark:text-yellow-400',
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
    },
    {
      title: '已完成',
      value: stats.completedProjects,
      subtitle: '已交付',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'text-green-600 dark:text-green-400',
      bg: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      title: '待处理',
      value: stats.pendingReviews,
      subtitle: '待审核/延期',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-50 dark:bg-purple-900/20',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-5 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
              {card.title}
            </span>
            <div className={`${card.bg} p-1.5 sm:p-2 rounded-lg flex-shrink-0`}>
              <div className={card.color}>{card.icon}</div>
            </div>
          </div>
          <div className={`text-xl sm:text-2xl lg:text-3xl font-bold ${card.color} mb-1 truncate`}>
            {typeof card.value === 'number' ? card.value.toLocaleString() : card.value}
          </div>
          <div className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500 truncate">
            {card.subtitle}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatCard;
