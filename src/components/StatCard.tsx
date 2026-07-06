import React from 'react';
import { Database } from 'lucide-react';
import { InfluencerStats } from '../types';

interface StatCardExtra {
  totalExecutions: number;
  newExecutionsThisMonth: number;
  pendingExecutions: number;
  recruitmentTaskCount: number;
  newRecruitmentTasksThisMonth: number;
}

interface StatCardProps {
  stats: InfluencerStats;
  role: 'media' | 'marketing';
  extra: StatCardExtra;
  loading?: boolean;
}

interface MetricItem {
  label: string;
  value: number;
  color: string;
}

interface MetricGroup {
  title: string;
  items: MetricItem[];
}

const StatCard: React.FC<StatCardProps> = ({ stats, role, extra, loading }) => {
  if (loading || !stats) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-6">
        <div className="h-4 w-32 bg-slate-200 rounded mb-4 animate-pulse" />
        <div className="space-y-4">
          {[0, 1, 2].map((g) => (
            <div key={g}>
              <div className="h-3 w-16 bg-slate-200 rounded mb-2 animate-pulse" />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="h-14 bg-slate-100 rounded-lg animate-pulse" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 合作转化组：媒介/市场共用
  const cooperationGroup: MetricGroup = {
    title: '合作转化',
    items: [
      { label: '累计合作次数', value: stats.confirmedCooperations, color: 'text-emerald-600' },
      { label: '本月新增合作', value: stats.confirmedThisMonth, color: 'text-emerald-600' },
      { label: '累计执行次数', value: extra.totalExecutions, color: 'text-blue-600' },
      { label: '本月新增执行', value: extra.newExecutionsThisMonth, color: 'text-blue-600' },
      { label: '待执行', value: extra.pendingExecutions, color: 'text-amber-600' },
    ],
  };

  // 按岗位差异化
  const groups: MetricGroup[] =
    role === 'media'
      ? [
          {
            title: '资源池',
            items: [
              { label: '线索总量', value: stats.totalLeads, color: 'text-blue-600' },
              { label: '本月新增线索', value: stats.newLeadsThisMonth, color: 'text-blue-600' },
              { label: '达人总量', value: stats.totalInfluencers, color: 'text-violet-600' },
              { label: '本月新增达人', value: stats.newInfluencersThisMonth, color: 'text-violet-600' },
            ],
          },
          cooperationGroup,
          {
            title: '邮件触达',
            items: [
              { label: '本月发送邮件', value: stats.emailsSentThisMonth, color: 'text-amber-600' },
              { label: '本月接收邮件', value: stats.emailsReceivedThisMonth, color: 'text-amber-600' },
              { label: '本月触达邮箱', value: stats.contactsEmailedThisMonth, color: 'text-amber-600' },
            ],
          },
        ]
      : [
          {
            title: '资源池',
            items: [
              { label: '招募任务总数', value: extra.recruitmentTaskCount, color: 'text-blue-600' },
              { label: '本月新增招募任务', value: extra.newRecruitmentTasksThisMonth, color: 'text-violet-600' },
            ],
          },
          cooperationGroup,
        ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-6">
      <h3 className="text-base font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <Database className="w-4 h-4 text-slate-500" />
        资源池与触达数据
      </h3>
      <div className="space-y-4">
        {groups.map((group) => (
          <div key={group.title}>
            <div className="flex items-center gap-2 mb-2">
              <h4 className="text-xs font-semibold text-slate-500 tracking-wide flex-shrink-0">
                {group.title}
              </h4>
              <div className="flex-1 h-px bg-slate-100" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
              {group.items.map((item) => (
                <div
                  key={item.label}
                  className="bg-slate-50 rounded-lg border border-slate-100 p-3 hover:bg-slate-100/70 transition-colors"
                >
                  <p className="text-[10px] sm:text-xs text-slate-500 mb-1 truncate">{item.label}</p>
                  <p className={`text-base sm:text-xl font-bold ${item.color} truncate`}>
                    {item.value.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatCard;
