import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { marketingTrendData, mediaTrendData, TrendDataset } from '../mockData';
import { cn } from '../lib/utils';
import { EmptyState } from './Skeleton';
import { BarChart3 } from 'lucide-react';

interface TrendChartProps {
  role?: 'media' | 'marketing';
  viewMode?: 'self' | 'team';
  loading?: boolean;
}

type TimeRange = '7d' | '14d' | '30d';

const rangeLabels: Record<TimeRange, string> = { '7d': '近7日', '14d': '近14日', '30d': '近30日' };

export function TrendChart({ role = 'media', viewMode = 'self', loading = false }: TrendChartProps) {
  const [range, setRange] = useState<TimeRange>('7d');

  const dataset: TrendDataset = role === 'media' ? mediaTrendData[range] : marketingTrendData[range];
  const { label1, label2, data } = dataset;

  const color1 = role === 'media' ? '#8b5cf6' : '#3b82f6';
  const color2 = role === 'media' ? '#10b981' : '#10b981';

  const gradientId1 = `gradient1-${role}-${range}`;
  const gradientId2 = `gradient2-${role}-${range}`;

  if (loading) {
    return (
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm h-full flex flex-col">
        <div className="mb-4 flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-4 w-28 animate-pulse rounded bg-slate-200" />
            <div className="h-3 w-36 animate-pulse rounded bg-slate-200" />
          </div>
          <div className="flex gap-2">
            {[1, 2, 3].map(i => <div key={i} className="h-6 w-12 animate-pulse rounded bg-slate-200" />)}
          </div>
        </div>
        <div className="flex-1 min-h-[200px] animate-pulse rounded-lg bg-slate-100" />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm h-full">
        <EmptyState
          icon={<BarChart3 className="w-8 h-8" />}
          title="暂无趋势数据"
          description="所选时间范围内没有可展示的指标数据"
        />
      </div>
    );
  }

  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm h-full flex flex-col" key={`trend-${role}`}>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-slate-800">核心指标趋势</h3>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium bg-slate-100 text-slate-500">
              {role === 'media' ? '媒介' : '市场'}视角
            </span>
          </div>
          <p className="text-xs text-slate-500">
            {role === 'media' ? '执行与完结进度对比' : '提报总量与最终合作转化对比'}
            {viewMode === 'team' ? ' · 团队' : ' · 个人'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {(Object.keys(rangeLabels) as TimeRange[]).map(key => (
            <button
              key={key}
              onClick={() => setRange(key)}
              className={cn(
                "px-2.5 py-1 rounded text-xs font-medium transition-all",
                range === key
                  ? "bg-slate-100 text-slate-800 shadow-sm"
                  : "text-slate-400 hover:text-slate-600"
              )}
            >
              {rangeLabels[key]}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-3 flex items-center gap-4 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 rounded-full" style={{ backgroundColor: color1 }}></div>
          <span className="text-slate-600">{label1}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 rounded-full" style={{ backgroundColor: color2 }}></div>
          <span className="text-slate-600">{label2}</span>
        </div>
      </div>

      <div className="flex-1 min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id={gradientId1} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color1} stopOpacity={0.1}/>
                <stop offset="95%" stopColor={color1} stopOpacity={0}/>
              </linearGradient>
              <linearGradient id={gradientId2} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color2} stopOpacity={0.2}/>
                <stop offset="95%" stopColor={color2} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="date" fontSize={10} tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis fontSize={10} tickLine={false} axisLine={false} tickMargin={8} />
            <Tooltip
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
              cursor={{ stroke: '#94a3b8', strokeWidth: 1, strokeDasharray: '4 4' }}
            />
            <Area type="monotone" dataKey="value1" stroke={color1} strokeWidth={2} fillOpacity={1} fill={`url(#${gradientId1})`} name={label1} />
            <Area type="monotone" dataKey="value2" stroke={color2} strokeWidth={2} fillOpacity={1} fill={`url(#${gradientId2})`} name={label2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
