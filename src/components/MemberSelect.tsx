import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronDown, Search, Users, Building } from 'lucide-react';
import { mockOrganization } from '../mockData';

export function MemberSelect({
  selectedIds,
  onChange,
  currentUserId,
}: {
  selectedIds: string[];
  onChange: (ids: string[]) => void;
  currentUserId?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const allIds = mockOrganization.flatMap(d => d.children.map(c => c.id));

  // 确定当前用户的部门
  const currentUserDept = useMemo(() => {
    if (!currentUserId) return null;
    return mockOrganization.find(d => d.children.some(c => c.id === currentUserId)) || null;
  }, [currentUserId]);

  const teamMemberIds = currentUserDept?.children.map(c => c.id) || [];

  // 将组织架构分为"我的团队"和"其他部门"
  const groupedOrg = useMemo(() => {
    const myTeam = currentUserDept ? {
      ...currentUserDept,
      label: '我的团队',
      icon: 'team' as const,
    } : null;

    const otherDepts = mockOrganization
      .filter(d => !currentUserDept || d.id !== currentUserDept.id)
      .map(d => ({ ...d, label: d.name, icon: 'other' as const }));

    return { myTeam, otherDepts };
  }, [currentUserDept]);

  // 搜索过滤
  const filteredGroups = useMemo(() => {
    if (!searchQuery) return groupedOrg;
    const q = searchQuery.toLowerCase();

    const filterDept = (dept: typeof mockOrganization[0]) => ({
      ...dept,
      children: dept.children.filter(m => m.name.includes(q)),
    });

    const myTeam = groupedOrg.myTeam
      ? filterDept(groupedOrg.myTeam)
      : null;

    const otherDepts = groupedOrg.otherDepts
      .map(filterDept)
      .filter(d => d.children.length > 0);

    return { myTeam, otherDepts };
  }, [searchQuery, groupedOrg]);

  const handleToggle = (id: string) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter(i => i !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  };

  const handleToggleAll = () => {
    if (selectedIds.length === allIds.length) {
      onChange([]);
    } else {
      onChange(allIds);
    }
  };

  const handleToggleDept = (deptId: string) => {
    const dept = mockOrganization.find(d => d.id === deptId);
    if (!dept) return;
    const deptIds = dept.children.map(c => c.id);
    const isAllDeptSelected = deptIds.every(id => selectedIds.includes(id));

    if (isAllDeptSelected) {
      onChange(selectedIds.filter(id => !deptIds.includes(id)));
    } else {
      const newIds = [...selectedIds];
      deptIds.forEach(id => {
        if (!newIds.includes(id)) newIds.push(id);
      });
      onChange(newIds);
    }
  };

  const isAllSelected = selectedIds.length === allIds.length && allIds.length > 0;

  /** 渲染一个部门组 */
  const renderDeptGroup = (
    dept: typeof mockOrganization[0] & { label: string; icon: 'team' | 'other' },
    showDeptCheckbox: boolean,
  ) => {
    const deptIds = dept.children.map(c => c.id);
    const isDeptSelected = deptIds.length > 0 && deptIds.every(id => selectedIds.includes(id));
    const isDeptIndeterminate = !isDeptSelected && deptIds.some(id => selectedIds.includes(id));

    return (
      <div key={dept.id} className="mb-2">
        {/* 组标题 */}
        <div className="flex items-center gap-1.5 px-2 py-1.5">
          {dept.icon === 'team' ? (
            <Users className="w-3.5 h-3.5 text-blue-500" />
          ) : (
            <Building className="w-3.5 h-3.5 text-slate-400" />
          )}
          <span className={cn(
            "text-xs font-semibold tracking-wide",
            dept.icon === 'team' ? "text-blue-700" : "text-slate-500"
          )}>
            {dept.label}
          </span>
          {dept.icon === 'team' && (
            <span className={cn(
              "text-[10px] px-1.5 py-0.5 rounded-full font-medium",
              isDeptSelected ? "bg-blue-100 text-blue-700" : "bg-blue-50 text-blue-500"
            )}>
              {isDeptSelected ? '全部选中' : `${selectedIds.filter(id => deptIds.includes(id)).length}/${deptIds.length}`}
            </span>
          )}
        </div>

        {showDeptCheckbox && (
          <label className="flex items-center px-2 py-1.5 hover:bg-slate-50 rounded cursor-pointer ml-2">
            <input
              type="checkbox"
              checked={isDeptSelected}
              ref={input => {
                if (input) input.indeterminate = isDeptIndeterminate;
              }}
              onChange={() => handleToggleDept(dept.id)}
              className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm font-medium text-slate-700">本组全选</span>
          </label>
        )}

        <div className={showDeptCheckbox ? 'ml-8 space-y-1' : 'ml-6 space-y-1'}>
          {dept.children.map(member => {
            const isOutOfScope = currentUserId && !teamMemberIds.includes(member.id);
            return (
              <label
                key={member.id}
                className={cn(
                  "flex items-center px-2 py-1.5 rounded cursor-pointer",
                  isOutOfScope ? "hover:bg-slate-50" : "hover:bg-slate-50"
                )}
              >
                <input
                  type="checkbox"
                  checked={selectedIds.includes(member.id)}
                  onChange={() => handleToggle(member.id)}
                  className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                />
                <span className={cn(
                  "ml-2 text-sm flex-1",
                  isOutOfScope ? "text-slate-400" : "text-slate-600"
                )}>
                  {member.name}
                  {isOutOfScope && (
                    <span className="text-[10px] text-slate-400 ml-1">
                      （{mockOrganization.find(d => d.children.some(c => c.id === member.id))?.name}）
                    </span>
                  )}
                </span>
                {isOutOfScope && (
                  <span className="text-[10px] text-slate-300 shrink-0">无权查看明细</span>
                )}
              </label>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-48 text-sm bg-white border border-slate-200 rounded-md py-1.5 pl-3 pr-2 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer text-slate-700 shadow-sm hover:border-slate-300"
      >
        <span className="truncate pr-2">
          {isAllSelected ? '全部成员' : selectedIds.length > 0 ? `已选 ${selectedIds.length} 人` : '请选择成员'}
        </span>
        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-72 bg-white border border-slate-200 rounded-lg shadow-lg z-50 max-h-96 flex flex-col">
          {/* 搜索框 */}
          <div className="p-2 border-b border-slate-100">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索成员..."
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                autoFocus
              />
            </div>
          </div>

          <div className="overflow-y-auto flex-1 p-2">
            {/* 无搜索结果 */}
            {!filteredGroups.myTeam && filteredGroups.otherDepts.length === 0 && (
              <div className="py-6 text-center text-xs text-slate-400">
                未找到匹配的成员
              </div>
            )}

            {/* 全部成员复选框（仅在未搜索时显示） */}
            {!searchQuery && (
              <>
                <label className="flex items-center px-2 py-1.5 hover:bg-slate-50 rounded cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={handleToggleAll}
                    className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm font-medium text-slate-900">全部成员</span>
                </label>
                <div className="my-1 border-t border-slate-100"></div>
              </>
            )}

            {/* 我的团队 */}
            {filteredGroups.myTeam && (
              renderDeptGroup(filteredGroups.myTeam, !searchQuery)
            )}

            {/* 其他部门 */}
            {filteredGroups.otherDepts.map(dept => (
              <div key={dept.id}>
                {filteredGroups.myTeam && !searchQuery && (
                  <div className="my-1 border-t border-slate-100"></div>
                )}
                {renderDeptGroup(dept, !searchQuery)}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/** 小工具：className 合并（避免额外导入 utils） */
function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(' ');
}
