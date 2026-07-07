import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { TrendDataset } from '../mockData';

interface TrendChartProps {
  data: Record<string, TrendDataset>;
  loading?: boolean;
}

type RangeKey = '7d' | '14d' | '30d';

const RANGES: { key: RangeKey; label: string }[] = [
  { key: '7d', label: '近7天' },
  { key: '14d', label: '近14天' },
  { key: '30d', label: '近30天' },
];

const TrendChart: React.FC<TrendChartProps> = ({ data, loading }) => {
  const [range, setRange] = useState<RangeKey>('7d');
  const dataset = data[range];

  if (loading || !dataset) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-6 h-full flex flex-col">
        <div className="h-4 w-24 bg-slate-200 rounded mb-4 animate-pulse" />
        <div className="flex-1 bg-slate-100 rounded-lg animate-pulse" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-slate-800 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-slate-500" />
          执行趋势
        </h3>
        <div className="flex items-center gap-0.5 bg-slate-100 rounded-md p-0.5">
          {RANGES.map((r) => (
            <button
              key={r.key}
              onClick={() => setRange(r.key)}
              className={`px-2 py-1 text-[11px] rounded transition-colors ${
                range === r.key
                  ? 'bg-white text-slate-800 shadow-sm font-medium'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>
      <div className="w-full flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dataset.data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke="#94a3b8" />
            <YAxis tick={{ fontSize: 10 }} stroke="#94a3b8" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255,255,255,0.95)',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '12px',
              }}
              labelFormatter={(label: string) => `日期: ${label}`}
            />
            <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} iconSize={8} />
            <Line
              type="monotone"
              dataKey="value1"
              name={dataset.label1}
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="value2"
              name={dataset.label2}
              stroke="#22c55e"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrendChart;
