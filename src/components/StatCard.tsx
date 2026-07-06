import React from 'react';
import { cn } from '../lib/utils';
import { LucideIcon } from 'lucide-react';
import { Skeleton } from './Skeleton';

interface StatCardProps {
  title: string;
  value: number | string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  highlight?: boolean;
  className?: string;
  /** 加载态 */
  loading?: boolean;
}

export function StatCard({ title, value, icon: Icon, trend, highlight, className, loading }: StatCardProps) {
  if (loading) {
    return (
      <div className={cn("p-4 rounded-xl border bg-white shadow-sm", className)}>
        <Skeleton variant="card" />
      </div>
    );
  }

  return (
    <div className={cn(
      "p-4 rounded-xl border bg-card text-card-foreground shadow-sm flex flex-col gap-2 transition-all",
      highlight ? "border-blue-500/50 bg-blue-500/5" : "border-border bg-white",
      className
    )}>
      <div className="flex items-center justify-between text-muted-foreground">
        <span className="text-sm font-medium">{title}</span>
        {Icon && <Icon className="w-4 h-4" />}
      </div>
      <div className="flex items-baseline gap-2 mt-1">
        <span className={cn(
          "text-2xl font-bold tracking-tight",
          highlight ? "text-blue-600" : "text-gray-900"
        )}>
          {value}
        </span>
        {trend && (
          <span className={cn(
            "text-xs font-medium",
            trend.isPositive ? "text-emerald-600" : "text-red-600"
          )}>
            {trend.isPositive ? "+" : "-"}{Math.abs(trend.value)}%
          </span>
        )}
      </div>
    </div>
  );
}
