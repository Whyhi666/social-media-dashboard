import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { WorkloadDataItem, WorkloadBarConfig } from "../types";
import { EmptyState } from "./Skeleton";
import { Users, Info } from "lucide-react";

interface TeamWorkloadChartProps {
  data: WorkloadDataItem[];
  bars: WorkloadBarConfig[];
  outOfScopeNames?: string[];
  roleLabel?: string;
}

export function TeamWorkloadChart({ data, bars, outOfScopeNames, roleLabel }: TeamWorkloadChartProps) {
  const isAllOutOfScope = outOfScopeNames && outOfScopeNames.length > 0 && data.length === 0;

  if (isAllOutOfScope) {
    return (
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm h-full flex flex-col">
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-slate-800">团队负载分布</h3>
          <p className="text-xs text-slate-500">团队各成员核心节点待办积压情况</p>
        </div>
        <EmptyState
          icon={<Users className="w-8 h-8" />}
          title="当前所选成员不在您的管辖范围内"
          description={'请选择「全部成员」或本部门成员查看负载分布'}
        />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm h-full flex flex-col">
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-slate-800">团队负载分布</h3>
          <p className="text-xs text-slate-500">团队各成员核心节点待办积压情况</p>
        </div>
        <EmptyState
          icon={<Users className="w-8 h-8" />}
          title="请选择成员查看负载"
          description="在顶部成员筛选中勾选需要查看的团队成员"
        />
      </div>
    );
  }

  // 有数据但部分成员越权 → 在图表上方显示提示
  const showPartialWarning = outOfScopeNames && outOfScopeNames.length > 0;

  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm h-full flex flex-col" key={`workload-${roleLabel || 'media'}`}>
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-slate-800">团队负载分布</h3>
          {roleLabel && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium bg-slate-100 text-slate-500">
              {roleLabel}视角
            </span>
          )}
        </div>
        <p className="text-xs text-slate-500">团队各成员核心节点待办积压情况</p>
      </div>

      {showPartialWarning && (
        <div className="mb-3 flex items-start gap-2 px-3 py-2 bg-blue-50 border border-blue-100 rounded-lg text-xs">
          <Info className="w-3.5 h-3.5 text-blue-500 mt-0.5 shrink-0" />
          <span className="text-blue-700">
            {outOfScopeNames!.length} 位非管辖成员（{outOfScopeNames!.join('、')}）未计入上图
          </span>
        </div>
      )}

      <div className="overflow-x-auto overflow-y-hidden pb-2 flex-1">
        <div
          style={{
            width: `${Math.max(100, data.length * 60)}px`,
            minWidth: "100%",
            height: "100%",
            minHeight: "250px",
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="horizontal"
              margin={{ top: 20, right: 0, left: -20, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={true}
                vertical={false}
                stroke="#e2e8f0"
              />
              <XAxis
                dataKey="name"
                type="category"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                type="number"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  backgroundColor: "#ffffff",
                }}
                cursor={{ fill: "#f8fafc" }}
                itemSorter={(item) =>
                  bars.findIndex((b) => b.key === item.dataKey)
                }
              />
              {bars.map((bar, index) => (
                <Bar
                  key={bar.key}
                  dataKey={bar.key}
                  stackId="a"
                  fill={bar.color}
                  maxBarSize={40}
                  radius={
                    index === bars.length - 1
                      ? [4, 4, 0, 0]
                      : [0, 0, 0, 0]
                  }
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
