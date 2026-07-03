import React, { useState } from 'react';
import { StickyNote, Save, CheckCircle } from 'lucide-react';
import { cn } from '../lib/utils';

export function PersonalMemo() {
  const [memoText, setMemoText] = useState(() => {
    return localStorage.getItem('personalMemo') || '';
  });
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    // 模拟存入数据库
    setTimeout(() => {
      localStorage.setItem('personalMemo', memoText);
      setIsSaving(false);
      setIsSaved(true);
      setHasChanges(false);
      setTimeout(() => setIsSaved(false), 2000);
    }, 600);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMemoText(e.target.value);
    setHasChanges(true);
    setIsSaved(false);
  };

  return (
    <div className="bg-amber-50/50 p-5 rounded-xl border border-amber-200 shadow-sm h-full flex flex-col relative overflow-hidden">
      <div className="absolute top-0 right-0 w-16 h-16 bg-amber-100 rounded-bl-full flex items-start justify-end p-3 opacity-50 pointer-events-none"></div>
      
      <div className="mb-3 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
          <StickyNote className="w-5 h-5 text-amber-600" />
          <h3 className="text-sm font-semibold text-slate-800">工作备忘</h3>
        </div>
        <div className="flex items-center gap-3">
          {isSaved && (
            <span className="text-xs text-emerald-600 flex items-center gap-1 font-medium transition-all duration-300">
              <CheckCircle className="w-3.5 h-3.5" />
              已保存
            </span>
          )}
          <button 
            onClick={handleSave}
            disabled={!hasChanges || isSaving}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all shadow-sm",
              hasChanges 
                ? "bg-amber-600 text-white hover:bg-amber-700 hover:shadow" 
                : "bg-white text-slate-400 cursor-not-allowed border border-slate-200"
            )}
          >
            <Save className="w-3.5 h-3.5" />
            {isSaving ? '保存中...' : '保存'}
          </button>
        </div>
      </div>
      
      <div className="flex-1 relative z-10">
        <textarea
          value={memoText}
          onChange={handleChange}
          placeholder="快速记录关键信息... （请点击右上角保存以存入工作台）"
          className="w-full h-full resize-none bg-white/70 rounded-lg border border-amber-200/60 focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 text-sm text-slate-700 placeholder-amber-900/30 outline-none leading-relaxed p-3 transition-all"
        />
      </div>
    </div>
  );
}
