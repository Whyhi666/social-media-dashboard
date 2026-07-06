import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronDown, Building } from 'lucide-react';
import { mockOrganization } from '../mockData';

interface MemberSelectProps {
  selectedIds: string[];
  onChange: (ids: string[]) => void;
  role: 'media' | 'marketing';
}

export function MemberSelect({ selectedIds, onChange, role }: MemberSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 按 role 过滤对应部门（媒介→媒介部，市场→市场部）
  const dept = useMemo(
    () => mockOrganization.find((d) => (role === 'media' ? d.id === 'dept1' : d.id === 'dept2'))!,
    [role]
  );

  const deptIds = dept.children.map((c) => c.id);
  const isAllSelected = deptIds.length > 0 && deptIds.every((id) => selectedIds.includes(id));
  const isIndeterminate = !isAllSelected && deptIds.some((id) => selectedIds.includes(id));

  const handleToggle = (id: string) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((i) => i !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  };

  const handleToggleAll = () => {
    if (isAllSelected) {
      onChange(selectedIds.filter((id) => !deptIds.includes(id)));
    } else {
      onChange(Array.from(new Set([...selectedIds, ...deptIds])));
    }
  };

  const displayText = isAllSelected
    ? `全部${dept.name}`
    : selectedIds.length > 0
    ? `已选 ${selectedIds.length} 人`
    : '请选择成员';

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-48 text-sm bg-white border border-slate-200 rounded-md py-1.5 pl-3 pr-2 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer text-slate-700 shadow-sm hover:border-slate-300"
      >
        <span className="truncate pr-2">{displayText}</span>
        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-60 bg-white border border-slate-200 rounded-lg shadow-lg z-50 max-h-96 flex flex-col">
          {/* 部门标题 + 权限规则提示 */}
          <div className="px-3 py-2 border-b border-slate-100">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
              <Building className="w-3.5 h-3.5 text-slate-400" />
              {dept.name}
            </span>
          </div>

          <div className="overflow-y-auto flex-1 p-2">
            {/* 本部门全选（含半选 indeterminate） */}
            <label className="flex items-center px-2 py-1.5 hover:bg-slate-50 rounded cursor-pointer">
              <input
                type="checkbox"
                checked={isAllSelected}
                ref={(input) => {
                  if (input) input.indeterminate = isIndeterminate;
                }}
                onChange={handleToggleAll}
                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm font-medium text-slate-900">全选</span>
            </label>
            <div className="my-1 border-t border-slate-100" />

            {/* 成员列表 */}
            {dept.children.map((member) => (
              <label
                key={member.id}
                className="flex items-center px-2 py-1.5 hover:bg-slate-50 rounded cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedIds.includes(member.id)}
                  onChange={() => handleToggle(member.id)}
                  className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-slate-600">{member.name}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
