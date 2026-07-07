import React from 'react';
import { Users } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { WorkloadDataItem, WorkloadBarConfig } from '../types';

interface TeamWorkloadChartProps {
  data: WorkloadDataItem[];
  bars: WorkloadBarConfig[];
  loading?: boolean;
  /** 点击成员柱回调（由 App 打开新标签页查看该成员个人详情） */
  onMemberClick?: (memberId: string) => void;
}

const TeamWorkloadChart: React.FC<TeamWorkloadChartProps> = ({ data, bars, loading, onMemberClick }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-6">
        <div className="h-4 w-28 bg-slate-200 rounded mb-4 animate-pulse" />
        <div className="h-[280px] w-full bg-slate-100 rounded-lg animate-pulse" />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-6 h-full flex flex-col">
        <h3 className="text-base font-semibold text-slate-800 mb-4">团队负载分布</h3>
        <div className="flex-1 flex flex-col items-center justify-center py-12 text-slate-400">
          <p className="text-sm">暂无负载数据</p>
          <p className="text-xs mt-1">请在上方选择成员查看</p>
        </div>
      </div>
    );
  }

  // 动态宽度：每增加一个成员，图表至少增加 60px，触发横向滚动
  const chartWidth = Math.max(100, data.length * 60);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-6 h-full flex flex-col">
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-slate-800 flex items-center gap-2">
            <Users className="w-4 h-4 text-slate-500" />
            团队负载分布
          </h3>
          <span className="text-xs text-slate-400">{data.length} 人</span>
        </div>
        <p className="text-[11px] text-slate-400 mt-1">点击成员柱可在新标签页查看其个人详情</p>
      </div>
      {/* 横向滚动容器 + 动态宽度内层 */}
      <div className="overflow-x-auto overflow-y-hidden flex-1 min-h-0 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:bg-slate-300/70 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb:hover]:bg-slate-400">
        <div
          className={onMemberClick ? 'cursor-pointer' : ''}
          style={{ width: `${chartWidth}px`, minWidth: '100%', height: '100%' }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 10 }} stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255,255,255,0.95)',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  fontSize: '12px',
                }}
                cursor={{ fill: 'rgba(148,163,184,0.1)' }}
                // 保证 Tooltip 指标顺序与堆叠柱状图顺序一致
                itemSorter={(item: any) => {
                  const idx = bars.findIndex((b) => b.key === item.dataKey);
                  return idx === -1 ? 999 : idx;
                }}
              />
              {bars.map((bar) => (
                <Bar
                  key={bar.key}
                  dataKey={bar.key}
                  stackId="a"
                  fill={bar.color}
                  onClick={(payload: any) => {
                    const id = payload?.payload?.id ?? payload?.id;
                    if (id && onMemberClick) onMemberClick(id);
                  }}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default TeamWorkloadChart;
