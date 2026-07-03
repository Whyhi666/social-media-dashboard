import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface TeamWorkloadChartProps {
  role?: "media" | "marketing";
  selectedMemberIds?: string[];
}

const marketData = [
  { id: "u1", name: "张三",
    待审批提报: 14,
    待审批报价: 12,
    待审稿: 4,
    待他人审稿: 2,
    待完结执行: 10,
    待我审核支出: 2,
    待他人审核支出: 3,
  },
  { id: "u2", name: "李四",
    待审批提报: 8,
    待审批报价: 3,
    待审稿: 7,
    待他人审稿: 5,
    待完结执行: 12,
    待我审核支出: 3,
    待他人审核支出: 1,
  },
  { id: "u3", name: "王五",
    待审批提报: 12,
    待审批报价: 5,
    待审稿: 2,
    待他人审稿: 1,
    待完结执行: 9,
    待我审核支出: 7,
    待他人审核支出: 4,
  },
  { id: "u4", name: "赵六",
    待审批提报: 5,
    待审批报价: 8,
    待审稿: 6,
    待他人审稿: 3,
    待完结执行: 5,
    待我审核支出: 1,
    待他人审核支出: 2,
  },
  { id: "u5", name: "孙七",
    待审批提报: 9,
    待审批报价: 4,
    待审稿: 8,
    待他人审稿: 2,
    待完结执行: 15,
    待我审核支出: 4,
    待他人审核支出: 6,
  },
  { id: "u6", name: "周八",
    待审批提报: 3,
    待审批报价: 6,
    待审稿: 5,
    待他人审稿: 4,
    待完结执行: 8,
    待我审核支出: 2,
    待他人审核支出: 1,
  },
  { id: "u7", name: "吴九",
    待审批提报: 11,
    待审批报价: 9,
    待审稿: 3,
    待他人审稿: 1,
    待完结执行: 11,
    待我审核支出: 5,
    待他人审核支出: 3,
  },
  { id: "u8", name: "郑十",
    待审批提报: 6,
    待审批报价: 7,
    待审稿: 9,
    待他人审稿: 6,
    待完结执行: 6,
    待我审核支出: 3,
    待他人审核支出: 2,
  },
  { id: "u9", name: "钱一",
    待审批提报: 15,
    待审批报价: 10,
    待审稿: 1,
    待他人审稿: 2,
    待完结执行: 14,
    待我审核支出: 8,
    待他人审核支出: 5,
  },
  { id: "u10", name: "陈二",
    待审批提报: 4,
    待审批报价: 2,
    待审稿: 12,
    待他人审稿: 8,
    待完结执行: 4,
    待我审核支出: 1,
    待他人审核支出: 1,
  },
];

const mediaData = [
  { id: "u1", name: "张三",
    待报价: 5,
    待确认合作: 4,
    "待执行(待提稿)": 6,
    "待执行(待重新提稿)": 3,
    待审稿: 8,
    待他人审稿: 3,
    "待执行(已定稿)": 4,
    待生成支出: 3,
    待付款: 2,
  },
  { id: "u2", name: "李四",
    待报价: 8,
    待确认合作: 4,
    "待执行(待提稿)": 15,
    "待执行(待重新提稿)": 2,
    待审稿: 5,
    待他人审稿: 2,
    "待执行(已定稿)": 6,
    待生成支出: 6,
    待付款: 4,
  },
  { id: "u3", name: "王五",
    待报价: 6,
    待确认合作: 3,
    "待执行(待提稿)": 12,
    "待执行(待重新提稿)": 4,
    待审稿: 14,
    待他人审稿: 4,
    "待执行(已定稿)": 5,
    待生成支出: 5,
    待付款: 1,
  },
  { id: "u4", name: "赵六",
    待报价: 12,
    待确认合作: 6,
    "待执行(待提稿)": 8,
    "待执行(待重新提稿)": 1,
    待审稿: 6,
    待他人审稿: 5,
    "待执行(已定稿)": 9,
    待生成支出: 4,
    待付款: 3,
  },
  { id: "u5", name: "孙七",
    待报价: 3,
    待确认合作: 8,
    "待执行(待提稿)": 4,
    "待执行(待重新提稿)": 5,
    待审稿: 11,
    待他人审稿: 1,
    "待执行(已定稿)": 3,
    待生成支出: 8,
    待付款: 5,
  },
  { id: "u6", name: "周八",
    待报价: 9,
    待确认合作: 2,
    "待执行(待提稿)": 10,
    "待执行(待重新提稿)": 2,
    待审稿: 4,
    待他人审稿: 6,
    "待执行(已定稿)": 8,
    待生成支出: 2,
    待付款: 1,
  },
  { id: "u7", name: "吴九",
    待报价: 4,
    待确认合作: 9,
    "待执行(待提稿)": 5,
    "待执行(待重新提稿)": 6,
    待审稿: 9,
    待他人审稿: 2,
    "待执行(已定稿)": 12,
    待生成支出: 7,
    待付款: 6,
  },
  { id: "u8", name: "郑十",
    待报价: 15,
    待确认合作: 1,
    "待执行(待提稿)": 9,
    "待执行(待重新提稿)": 3,
    待审稿: 3,
    待他人审稿: 8,
    "待执行(已定稿)": 4,
    待生成支出: 1,
    待付款: 2,
  },
  { id: "u9", name: "钱一",
    待报价: 2,
    待确认合作: 12,
    "待执行(待提稿)": 14,
    "待执行(待重新提稿)": 1,
    待审稿: 12,
    待他人审稿: 3,
    "待执行(已定稿)": 6,
    待生成支出: 9,
    待付款: 8,
  },
  { id: "u10", name: "陈二",
    待报价: 7,
    待确认合作: 5,
    "待执行(待提稿)": 3,
    "待执行(待重新提稿)": 8,
    待审稿: 2,
    待他人审稿: 9,
    "待执行(已定稿)": 2,
    待生成支出: 4,
    待付款: 1,
  },
];

const marketBars = [
  { key: "待审批提报", color: "#cbd5e1" },
  { key: "待审批报价", color: "#fcd34d" },
  { key: "待审稿", color: "#f87171" },
  { key: "待他人审稿", color: "#fb923c" },
  { key: "待完结执行", color: "#34d399" },
  { key: "待我审核支出", color: "#818cf8" },
  { key: "待他人审核支出", color: "#a78bfa" },
];

const mediaBars = [
  { key: "待报价", color: "#cbd5e1" },
  { key: "待确认合作", color: "#93c5fd" },
  { key: "待执行(待提稿)", color: "#fcd34d" },
  { key: "待执行(待重新提稿)", color: "#fef08a" },
  { key: "待审稿", color: "#f87171" },
  { key: "待他人审稿", color: "#fb923c" },
  { key: "待执行(已定稿)", color: "#a78bfa" },
  { key: "待生成支出", color: "#38bdf8" },
  { key: "待付款", color: "#60a5fa" },
];

export function TeamWorkloadChart({ role = "media", selectedMemberIds }: TeamWorkloadChartProps) {
  const isMedia = role === "media";
  const baseData = isMedia ? mediaData : marketData;
  const data = selectedMemberIds && selectedMemberIds.length > 0 
    ? baseData.filter(d => selectedMemberIds.includes(d.id))
    : baseData;
  const currentBars = isMedia ? mediaBars : marketBars;

  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm h-full flex flex-col">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-slate-800">团队负载分布</h3>
        <p className="text-xs text-slate-500">团队各成员核心节点待办积压情况</p>
      </div>
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
                  currentBars.findIndex((b) => b.key === item.dataKey)
                }
              />
              {currentBars.map((bar, index) => (
                <Bar
                  key={bar.key}
                  dataKey={bar.key}
                  stackId="a"
                  fill={bar.color}
                  maxBarSize={40}
                  radius={
                    index === currentBars.length - 1
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
