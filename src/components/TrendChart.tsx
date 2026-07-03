import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { date: '10/01', 合作数: 15, 提报数: 40 },
  { date: '10/02', 合作数: 22, 提报数: 35 },
  { date: '10/03', 合作数: 18, 提报数: 50 },
  { date: '10/04', 合作数: 30, 提报数: 65 },
  { date: '10/05', 合作数: 28, 提报数: 55 },
  { date: '10/06', 合作数: 42, 提报数: 80 },
  { date: '10/07', 合作数: 50, 提报数: 95 },
];

export function TrendChart() {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm h-full flex flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-800">核心指标趋势 (近7日)</h3>
          <p className="text-xs text-slate-500">提报总量与最终合作转化对比</p>
        </div>
        <div className="flex items-center gap-3 text-xs">
           <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500"></div>提报数</div>
           <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500"></div>确认合作</div>
        </div>
      </div>
      <div className="flex-1 min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorTiBao" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorHeZuo" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="date" fontSize={10} tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis fontSize={10} tickLine={false} axisLine={false} tickMargin={8} />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
              cursor={{ stroke: '#94a3b8', strokeWidth: 1, strokeDasharray: '4 4' }}
            />
            <Area type="monotone" dataKey="提报数" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorTiBao)" />
            <Area type="monotone" dataKey="合作数" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorHeZuo)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
