import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { mockOrganization } from '../mockData';

export function MemberSelect({
  selectedIds,
  onChange
}: {
  selectedIds: string[];
  onChange: (ids: string[]) => void;
}) {
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

  const handleToggle = (id: string) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter(i => i !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  };

  const allIds = mockOrganization.flatMap(d => d.children.map(c => c.id));
  
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

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-48 text-sm bg-white border border-slate-200 rounded-md py-1.5 pl-3 pr-2 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer text-slate-700 shadow-sm hover:border-slate-300"
      >
        <span className="truncate pr-2">
          {isAllSelected ? '全部成员' : selectedIds.length > 0 ? `已选 ${selectedIds.length} 人` : '请选择成员'}
        </span>
        <ChevronDown className="w-4 h-4 text-slate-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-56 bg-white border border-slate-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
          <div className="p-2">
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

            {mockOrganization.map(dept => {
              const deptIds = dept.children.map(c => c.id);
              const isDeptSelected = deptIds.length > 0 && deptIds.every(id => selectedIds.includes(id));
              const isDeptIndeterminate = !isDeptSelected && deptIds.some(id => selectedIds.includes(id));

              return (
                <div key={dept.id} className="mb-2">
                  <label className="flex items-center px-2 py-1.5 hover:bg-slate-50 rounded cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isDeptSelected}
                      ref={input => {
                        if (input) input.indeterminate = isDeptIndeterminate;
                      }}
                      onChange={() => handleToggleDept(dept.id)}
                      className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm font-medium text-slate-700">{dept.name}</span>
                  </label>
                  
                  <div className="ml-6 space-y-1 mt-1">
                    {dept.children.map(member => (
                      <label key={member.id} className="flex items-center px-2 py-1.5 hover:bg-slate-50 rounded cursor-pointer">
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
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
