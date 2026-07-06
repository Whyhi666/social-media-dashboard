import React, { useState, useRef, useEffect, useMemo } from 'react';

/* ====== 类型定义 ====== */
export interface FilterState {
  search: string;
  platforms: string[];
  statuses: string[];
  assignees: string[];
  dateRange: { start: string; end: string };
}

export const DEFAULT_FILTER: FilterState = {
  search: '',
  platforms: [],
  statuses: [],
  assignees: [],
  dateRange: { start: '', end: '' },
};

/* ====== 常量 ====== */
const PLATFORM_OPTIONS = [
  { value: '抖音', label: '抖音', color: '#000000' },
  { value: '小红书', label: '小红书', color: '#FF2442' },
  { value: 'B站', label: 'B站', color: '#FB7299' },
  { value: '微博', label: '微博', color: '#E6162D' },
  { value: '微信', label: '微信', color: '#07C160' },
];

const STATUS_OPTIONS = [
  { value: '待执行', label: '待执行', dot: 'bg-yellow-400' },
  { value: '执行中', label: '执行中', dot: 'bg-blue-400' },
  { value: '已完成', label: '已完成', dot: 'bg-green-400' },
  { value: '延期', label: '延期', dot: 'bg-red-400' },
];

/* ====== 下拉多选组件 ====== */
interface MultiSelectProps {
  label: string;
  options: { value: string; label: string; color?: string; dot?: string }[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  options,
  selected,
  onChange,
  placeholder = '全部',
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggle = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  const displayText = selected.length === 0 ? placeholder : `${label}(${selected.length})`;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-md border transition-colors whitespace-nowrap ${
          selected.length > 0
            ? 'border-blue-400 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-500'
            : 'border-gray-300 bg-white text-gray-600 hover:border-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300'
        }`}
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        {displayText}
        <svg className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1 w-44 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-50 py-1 max-h-64 overflow-y-auto">
          {options.map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer text-xs text-gray-700 dark:text-gray-200"
            >
              <input
                type="checkbox"
                checked={selected.includes(opt.value)}
                onChange={() => toggle(opt.value)}
                className="rounded border-gray-300 text-blue-500 focus:ring-blue-400"
              />
              {opt.dot && <span className={`w-2 h-2 rounded-full ${opt.dot}`} />}
              {opt.color && (
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: opt.color }} />
              )}
              {opt.label}
            </label>
          ))}
          {options.length === 0 && (
            <div className="px-3 py-2 text-xs text-gray-400">无选项</div>
          )}
        </div>
      )}
    </div>
  );
};

/* ====== 筛选标签 ====== */
interface ActiveTag {
  key: string;
  label: string;
  onRemove: () => void;
}

const FilterTag: React.FC<{ tag: ActiveTag }> = ({ tag }) => (
  <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800">
    {tag.label}
    <button onClick={tag.onRemove} className="hover:text-blue-900 dark:hover:text-blue-100">
      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </span>
);

/* ====== 日期范围选择器内联版 ====== */
interface DateRangeInlineProps {
  start: string;
  end: string;
  onStartChange: (v: string) => void;
  onEndChange: (v: string) => void;
}

const DateRangeInline: React.FC<DateRangeInlineProps> = ({
  start,
  end,
  onStartChange,
  onEndChange,
}) => (
  <div className="flex items-center gap-1.5">
    <input
      type="date"
      value={start}
      onChange={(e) => onStartChange(e.target.value)}
      className="px-2 py-1.5 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
    />
    <span className="text-gray-400">~</span>
    <input
      type="date"
      value={end}
      onChange={(e) => onEndChange(e.target.value)}
      className="px-2 py-1.5 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
    />
  </div>
);

/* ====== FilterBar 主组件 ====== */
interface FilterBarProps {
  filter: FilterState;
  onChange: (filter: FilterState) => void;
  assigneeOptions: { value: string; label: string; avatar?: string }[];
  className?: string;
}

const FilterBar: React.FC<FilterBarProps> = ({
  filter,
  onChange,
  assigneeOptions,
  className = '',
}) => {
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const update = (patch: Partial<FilterState>) => {
    onChange({ ...filter, ...patch });
  };

  const hasAdvancedFilters = useMemo(
    () =>
      filter.platforms.length > 0 ||
      filter.statuses.length > 0 ||
      filter.assignees.length > 0 ||
      filter.dateRange.start !== '' ||
      filter.dateRange.end !== '',
    [filter]
  );

  /* 构建激活的标签列表 */
  const activeTags: ActiveTag[] = useMemo(() => {
    const tags: ActiveTag[] = [];

    filter.platforms.forEach((p) => {
      const opt = PLATFORM_OPTIONS.find((o) => o.value === p);
      tags.push({
        key: `platform:${p}`,
        label: `平台: ${opt?.label || p}`,
        onRemove: () => update({ platforms: filter.platforms.filter((v) => v !== p) }),
      });
    });

    filter.statuses.forEach((s) => {
      tags.push({
        key: `status:${s}`,
        label: `状态: ${s}`,
        onRemove: () => update({ statuses: filter.statuses.filter((v) => v !== s) }),
      });
    });

    filter.assignees.forEach((a) => {
      const opt = assigneeOptions.find((o) => o.value === a);
      tags.push({
        key: `assignee:${a}`,
        label: `负责人: ${opt?.label || a}`,
        onRemove: () => update({ assignees: filter.assignees.filter((v) => v !== a) }),
      });
    });

    if (filter.dateRange.start || filter.dateRange.end) {
      const fmt = (d: string) => (d ? d.replace(/-/g, '/').slice(5) : '');
      tags.push({
        key: 'dateRange',
        label: `日期: ${fmt(filter.dateRange.start) || '…'}~${fmt(filter.dateRange.end) || '…'}`,
        onRemove: () => update({ dateRange: { start: '', end: '' } }),
      });
    }

    return tags;
  }, [filter, assigneeOptions]);

  const clearAll = () => onChange(DEFAULT_FILTER);

  const isFiltered = filter.search !== '' || hasAdvancedFilters;

  return (
    <div className={`space-y-2 ${className}`}>
      {/* 第一行：搜索框 + 高级筛选切换 + 重置 */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* 搜索框 */}
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <svg
            className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            ref={searchInputRef}
            type="text"
            value={filter.search}
            onChange={(e) => update({ search: e.target.value })}
            placeholder="搜索客户/项目/关键词..."
            className="w-full pl-8 pr-8 py-1.5 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-400"
          />
          {filter.search && (
            <button
              onClick={() => update({ search: '' })}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* 高级筛选切换 */}
        <button
          onClick={() => setAdvancedOpen(!advancedOpen)}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-md border transition-colors whitespace-nowrap ${
            hasAdvancedFilters
              ? 'border-blue-400 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
              : 'border-gray-300 bg-white text-gray-600 hover:border-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300'
          }`}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          高级筛选
          {hasAdvancedFilters && (
            <span className="w-4 h-4 rounded-full bg-blue-500 text-white text-[10px] flex items-center justify-center font-medium">
              {activeTags.length}
            </span>
          )}
          <svg
            className={`w-3 h-3 transition-transform ${advancedOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* 重置 */}
        {isFiltered && (
          <button
            onClick={clearAll}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-gray-500 hover:text-red-500 transition-colors whitespace-nowrap"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            重置
          </button>
        )}
      </div>

      {/* 第二行：高级筛选面板 */}
      {advancedOpen && (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
          {/* 筛选项包装 - 小屏横向滚动 */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-thin">
            {/* 平台 */}
            <MultiSelect
              label="平台"
              options={PLATFORM_OPTIONS}
              selected={filter.platforms}
              onChange={(v) => update({ platforms: v })}
              placeholder="全部平台"
            />

            {/* 状态 */}
            <MultiSelect
              label="状态"
              options={STATUS_OPTIONS}
              selected={filter.statuses}
              onChange={(v) => update({ statuses: v })}
              placeholder="全部状态"
            />

            {/* 负责人 */}
            <MultiSelect
              label="负责人"
              options={assigneeOptions}
              selected={filter.assignees}
              onChange={(v) => update({ assignees: v })}
              placeholder="全部负责人"
            />
          </div>

          {/* 日期范围 - 单独一行小屏 */}
          <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <DateRangeInline
              start={filter.dateRange.start}
              end={filter.dateRange.end}
              onStartChange={(v) => update({ dateRange: { ...filter.dateRange, start: v } })}
              onEndChange={(v) => update({ dateRange: { ...filter.dateRange, end: v } })}
            />
          </div>
        </div>
      )}

      {/* 第三行：激活的筛选标签 */}
      {activeTags.length > 0 && (
        <div className="flex items-center gap-1.5 flex-wrap">
          {activeTags.map((tag) => (
            <FilterTag key={tag.key} tag={tag} />
          ))}
          {activeTags.length > 1 && (
            <button
              onClick={clearAll}
              className="text-xs text-gray-400 hover:text-red-500 ml-1"
            >
              清除全部
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export { PLATFORM_OPTIONS, STATUS_OPTIONS };
export default FilterBar;
