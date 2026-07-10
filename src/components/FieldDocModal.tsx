import { useEffect } from 'react';
import { X, BookOpen } from 'lucide-react';
import { fieldDocSections } from '../fieldDoc';

interface FieldDocModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FieldDocModal({ isOpen, onClose }: FieldDocModalProps) {
  // ESC 关闭
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-slate-500" />
            <h3 className="text-lg font-semibold text-slate-800">字段说明</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1.5 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto bg-slate-50 flex-1 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-slate-300/70 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
          <div className="space-y-6">
            {fieldDocSections.map((section) => (
              <section key={section.title}>
                <h4 className="text-sm font-semibold text-slate-800 mb-2 pb-1 border-b border-slate-200">
                  {section.title}
                </h4>
                {section.desc && (
                  <p className="text-xs text-slate-500 mb-3 leading-relaxed">{section.desc}</p>
                )}
                {section.items.length > 0 && (
                  <dl className="space-y-2">
                    {section.items.map((item) => (
                      <div key={item.name} className="flex flex-col sm:flex-row sm:gap-3">
                        <dt className="sm:w-40 shrink-0 text-xs font-medium text-slate-700 sm:text-right">
                          {item.name}
                        </dt>
                        <dd className="text-xs text-slate-500 leading-relaxed flex-1">
                          {item.desc}
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
