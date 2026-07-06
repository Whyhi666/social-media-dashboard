import React, { useState } from 'react';
import { Stage } from '../types';
import StageDetailModal from './StageDetailModal';

interface WorkflowPipelineProps {
  stages: Stage[];
}

const STAGE_ORDER = ['待执行', '执行中', '已完成', '延期'];

const WorkflowPipeline: React.FC<WorkflowPipelineProps> = ({ stages }) => {
  const [selectedStage, setSelectedStage] = useState<Stage | null>(null);

  /* 分组 */
  const grouped = STAGE_ORDER.map((status) => ({
    status,
    stages: stages.filter((s) => s.status === status),
  }));

  if (!stages || stages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-400 dark:text-gray-500">
        <svg className="w-14 h-14 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        <p className="text-sm">暂无执行阶段</p>
      </div>
    );
  }

  return (
    <>
      {/* 移动端：水平滚动泳道；桌面端：网格布局 */}
      <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0 scrollbar-thin">
        <div className="flex sm:grid sm:grid-cols-4 gap-3 sm:gap-4 min-w-[640px] sm:min-w-0 pb-2 sm:pb-0">
          {grouped.map(({ status, stages: groupStages }) => (
            <div key={status} className="flex-1 sm:flex-none min-w-[150px] sm:min-w-0">
              {/* 列标题 */}
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <StatusDot status={status} />
                  <h3 className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                    {status}
                  </h3>
                </div>
                <span className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded-full">
                  {groupStages.length}
                </span>
              </div>

              {/* 卡片列表 */}
              <div className="space-y-2 sm:space-y-3">
                {groupStages.length === 0 ? (
                  <div className="text-center py-6 sm:py-8 text-gray-300 dark:text-gray-600">
                    <svg className="w-8 h-8 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    <p className="text-[10px] sm:text-xs">暂无</p>
                  </div>
                ) : (
                  groupStages.map((stage) => (
                    <StageCard
                      key={stage.id}
                      stage={stage}
                      onClick={() => setSelectedStage(stage)}
                    />
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 详情弹窗 */}
      {selectedStage && (
        <StageDetailModal
          stage={selectedStage}
          onClose={() => setSelectedStage(null)}
        />
      )}
    </>
  );
};

/* 状态圆点 */
const StatusDot: React.FC<{ status: string }> = ({ status }) => {
  const colors: Record<string, string> = {
    '待执行': 'bg-yellow-400',
    '执行中': 'bg-blue-400',
    '已完成': 'bg-green-400',
    '延期': 'bg-red-400',
  };
  return (
    <span className={`w-2 h-2 rounded-full ${colors[status] || 'bg-gray-400'}`} />
  );
};

/* 阶段卡片 */
const StageCard: React.FC<{ stage: Stage; onClick: () => void }> = ({ stage, onClick }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-white dark:bg-gray-800/80 rounded-lg sm:rounded-xl border border-gray-200 dark:border-gray-700 p-2.5 sm:p-4 hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600 transition-all active:scale-[0.98] group"
    >
      {/* 客户信息 */}
      <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-[9px] sm:text-xs font-bold flex-shrink-0">
          {stage.clientName?.charAt(0) || '?'}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] sm:text-sm font-medium text-gray-900 dark:text-white truncate leading-tight">
            {stage.clientName}
          </p>
          <p className="text-[9px] sm:text-xs text-gray-400 dark:text-gray-500 truncate leading-tight">
            {stage.projectName}
          </p>
        </div>
      </div>

      {/* 平台标签 + 负责人 */}
      <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap mb-1.5 sm:mb-2">
        {stage.platform && (
          <span className="text-[9px] sm:text-xs px-1.5 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 truncate max-w-[60px] sm:max-w-none">
            {stage.platform}
          </span>
        )}
        {stage.assignee && (
          <span className="flex items-center gap-1 text-[9px] sm:text-xs text-gray-400 dark:text-gray-500">
            <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="truncate max-w-[50px] sm:max-w-none">{stage.assignee}</span>
          </span>
        )}
      </div>

      {/* 任务预览 */}
      {stage.tasks && stage.tasks.length > 0 && (
        <div className="space-y-0.5 sm:space-y-1 mb-1.5 sm:mb-2">
          {stage.tasks.slice(0, 2).map((task) => (
            <div key={task.id} className="flex items-start gap-1 sm:gap-1.5">
              <span className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full mt-1 flex-shrink-0 ${
                task.status === '已完成' ? 'bg-green-400' :
                task.status === '执行中' ? 'bg-blue-400' :
                'bg-gray-300 dark:bg-gray-600'
              }`} />
              <span className="text-[9px] sm:text-xs text-gray-500 dark:text-gray-400 truncate leading-tight">
                {task.title}
              </span>
            </div>
          ))}
          {stage.tasks.length > 2 && (
            <p className="text-[9px] sm:text-xs text-gray-400 dark:text-gray-500 pl-2 sm:pl-2.5">
              +{stage.tasks.length - 2} 项更多
            </p>
          )}
        </div>
      )}

      {/* 底部：截止时间 */}
      {(stage.deadline || stage.endDate) && (
        <div className="flex items-center gap-1 text-[9px] sm:text-xs text-gray-400 dark:text-gray-500 pt-1 sm:pt-1.5 border-t border-gray-100 dark:border-gray-700">
          <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{(stage.deadline || stage.endDate)?.replace(/-/g, '/')}</span>
        </div>
      )}
    </button>
  );
};

export default WorkflowPipeline;
