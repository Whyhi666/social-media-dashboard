import React from 'react';
import { cn } from '../lib/utils';

interface SkeletonProps {
  className?: string;
  /** 骨架屏变体 */
  variant?: 'text' | 'card' | 'chart' | 'table-row' | 'circle';
  /** 卡片类骨架可指定行数 */
  rows?: number;
}

export function Skeleton({ variant = 'text', rows = 3, className }: SkeletonProps) {
  if (variant === 'card') {
    return (
      <div className={cn('space-y-3', className)}>
        <div className="h-4 w-2/3 animate-pulse rounded-md bg-slate-200" />
        <div className="h-8 w-1/2 animate-pulse rounded-md bg-slate-200" />
        <div className="h-3 w-1/3 animate-pulse rounded-md bg-slate-200" />
      </div>
    );
  }

  if (variant === 'chart') {
    return (
      <div className={cn('flex flex-col gap-3 p-5', className)}>
        <div className="flex items-center justify-between">
          <div className="h-4 w-32 animate-pulse rounded-md bg-slate-200" />
          <div className="h-6 w-24 animate-pulse rounded-md bg-slate-200" />
        </div>
        <div className="h-[200px] w-full animate-pulse rounded-lg bg-slate-100" />
      </div>
    );
  }

  if (variant === 'table-row') {
    return (
      <div className={cn('flex items-center gap-4 px-4 py-3', className)}>
        <div className="h-4 w-1/4 animate-pulse rounded-md bg-slate-200" />
        <div className="h-4 w-16 animate-pulse rounded-md bg-slate-200" />
        <div className="h-4 flex-1 animate-pulse rounded-md bg-slate-200" />
        <div className="h-8 w-16 animate-pulse rounded-md bg-slate-200" />
      </div>
    );
  }

  if (variant === 'circle') {
    return <div className={cn('h-10 w-10 animate-pulse rounded-full bg-slate-200', className)} />;
  }

  // text
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className={cn('h-3 animate-pulse rounded-md bg-slate-200', i === rows - 1 ? 'w-3/5' : 'w-full')}
        />
      ))}
    </div>
  );
}

/** 空状态占位图 */
export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      {icon && <div className="mb-3 text-slate-300">{icon}</div>}
      <p className="text-base font-medium text-slate-600">{title}</p>
      {description && <p className="mt-1 text-xs text-slate-400">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

/** 错误状态占位图 */
export function ErrorState({
  message = '数据加载失败',
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="mb-3 w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
        <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      <p className="text-sm font-medium text-slate-600">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-3 px-4 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
        >
          重新加载
        </button>
      )}
    </div>
  );
}
