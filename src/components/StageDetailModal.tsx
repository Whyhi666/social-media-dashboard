import React, { useState } from 'react';
import { Stage, Deliverable, PerformanceMetrics } from '../types';
import { stageDetails } from '../mockData';

interface StageDetailModalProps {
  stage: Stage;
  onClose: () => void;
}

type TabKey = 'details' | 'performance' | 'deliverables';

const TABS: { key: TabKey; label: string; icon: React.ReactNode }[] = [
  {
    key: 'details',
    label: '执行详情',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    key: 'performance',
    label: '数据表现',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    key: 'deliverables',
    label: '交付物',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
];

const StageDetailModal: React.FC<StageDetailModalProps> = ({ stage, onClose }) => {
  const [activeTab, setActiveTab] = useState<TabKey>('details');
  const details = stageDetails[stage.id];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      {/* 遮罩 */}
      <div
        className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* 弹窗 */}
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col animate-scale-in">
        {/* 头部 */}
        <div className="px-4 sm:px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex-shrink-0">
          <div className="flex items-start justify-between">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white truncate">
                  {stage.clientName}
                </h3>
                <StatusBadge status={stage.status || ''} />
              </div>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
                {stage.projectName}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300 transition-colors flex-shrink-0 ml-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Tab 导航 */}
        <div className="flex border-b border-gray-100 dark:border-gray-700 px-4 sm:px-6 flex-shrink-0 overflow-x-auto scrollbar-thin">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.key
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
              }`}
            >
              {tab.icon}
              {tab.label}
              {tab.key === 'deliverables' && details?.deliverables && (
                <span className="ml-1 w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-[10px] flex items-center justify-center font-medium">
                  {details.deliverables.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* 内容区 */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {activeTab === 'details' && <DetailsTab stage={stage} details={details} />}
          {activeTab === 'performance' && <PerformanceTab performance={details?.performance} />}
          {activeTab === 'deliverables' && <DeliverablesTab deliverables={details?.deliverables} />}
        </div>
      </div>
    </div>
  );
};

/* ====== 状态徽标 ====== */
const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const colors: Record<string, string> = {
    '待执行': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    '执行中': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    '已完成': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    '延期': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
  };
  return (
    <span className={`text-[10px] sm:text-xs px-1.5 py-0.5 rounded-full font-medium ${colors[status] || 'bg-gray-100 text-gray-800'}`}>
      {status}
    </span>
  );
};

/* ====== Tab: 执行详情 ====== */
const DetailsTab: React.FC<{ stage: Stage; details: any }> = ({ stage, details }) => {
  if (!details) {
    return (
      <div className="text-center py-12 text-gray-400 dark:text-gray-500">
        <p className="text-sm">暂无详细信息</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* 基本信息 */}
      <Section title="基本信息">
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <InfoItem label="平台" value={stage.platform || '-'} />
          <InfoItem label="状态" value={stage.status || '-'} />
          <InfoItem label="负责人" value={details.assignee || '-'} />
          <InfoItem label="执行人" value={details.executor || '-'} />
          <InfoItem label="开始日期" value={details.startDate || '-'} />
          <InfoItem label="截止日期" value={details.endDate || details.endDate || '-'} />
        </div>
      </Section>

      {/* 内容清单 */}
      {details.contentItems && details.contentItems.length > 0 && (
        <Section title="内容清单">
          <ul className="space-y-1.5">
            {details.contentItems.map((item: string, idx: number) => (
              <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* 备注 */}
      {details.notes && (
        <Section title="备注">
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            {details.notes}
          </p>
        </Section>
      )}
    </div>
  );
};

/* ====== Tab: 数据表现 ====== */
const PerformanceTab: React.FC<{ performance?: PerformanceMetrics | null }> = ({ performance }) => {
  if (!performance) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-400 dark:text-gray-500">
        <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <p className="text-sm">暂无数据表现</p>
      </div>
    );
  }

  const metrics = [
    { label: '播放量', value: formatNum(performance.views), icon: '▶', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { label: '点赞', value: formatNum(performance.likes), icon: '👍', color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-900/20' },
    { label: '评论', value: formatNum(performance.comments), icon: '💬', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-900/20' },
    { label: '分享', value: formatNum(performance.shares), icon: '🔄', color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-900/20' },
  ];

  return (
    <div className="space-y-5">
      {/* 核心指标卡片 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {metrics.map((m) => (
          <div key={m.label} className={`${m.bg} rounded-xl p-3 sm:p-4`}>
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="text-sm">{m.icon}</span>
              <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">{m.label}</span>
            </div>
            <p className={`text-base sm:text-lg font-bold ${m.color}`}>{m.value}</p>
          </div>
        ))}
      </div>

      {/* 比率指标 */}
      <Section title="效果指标">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <RatioCard label="互动率" value={`${performance.engagementRate}%`} subtitle="赞评转 / 播放" />
          {performance.conversionRate !== undefined && (
            <RatioCard label="转化率" value={`${performance.conversionRate}%`} subtitle="转化 / 播放" />
          )}
          {performance.revenue !== undefined && (
            <RatioCard label="预估收入" value={`¥${formatNum(performance.revenue)}`} subtitle="预估GMV" />
          )}
        </div>
      </Section>
    </div>
  );
};

/* ====== Tab: 交付物 ====== */
const DeliverablesTab: React.FC<{ deliverables?: Deliverable[] | null }> = ({ deliverables }) => {
  if (!deliverables || deliverables.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-400 dark:text-gray-500">
        <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        <p className="text-sm">暂无交付物</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {deliverables.map((del) => (
        <DeliverableCard key={del.id} deliverable={del} />
      ))}
    </div>
  );
};

const DeliverableCard: React.FC<{ deliverable: Deliverable }> = ({ deliverable }) => {
  const statusColors: Record<string, string> = {
    '待提交': 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400',
    '审核中': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
    '已通过': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    '需修改': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  };

  const typeIcons: Record<string, string> = {
    '视频': '🎬',
    '图文': '📝',
    '文案': '✍️',
    '设计稿': '🎨',
    '报告': '📊',
  };

  return (
    <div className="p-3 sm:p-4 rounded-lg border border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/30 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2.5 min-w-0">
          <span className="text-base mt-0.5">{typeIcons[deliverable.type] || '📄'}</span>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                {deliverable.name}
              </span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${statusColors[deliverable.status] || ''}`}>
                {deliverable.status}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1 text-[10px] sm:text-xs text-gray-400 dark:text-gray-500 flex-wrap">
              {deliverable.submitter && <span>提交人: {deliverable.submitter}</span>}
              {deliverable.submittedAt && <span>{deliverable.submittedAt}</span>}
              {deliverable.reviewer && <span>审核: {deliverable.reviewer}</span>}
            </div>
            {deliverable.reviewComment && (
              <div className="mt-1.5 text-[10px] sm:text-xs text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded">
                反馈: {deliverable.reviewComment}
              </div>
            )}
          </div>
        </div>
        {deliverable.url && (
          <a
            href={deliverable.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
};

/* ====== 通用子组件 ====== */

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div>
    <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2.5">
      {title}
    </h4>
    {children}
  </div>
);

const InfoItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div>
    <p className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500 mb-0.5">{label}</p>
    <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white truncate">{value}</p>
  </div>
);

const RatioCard: React.FC<{ label: string; value: string; subtitle: string }> = ({ label, value, subtitle }) => (
  <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-3 sm:p-4 border border-gray-100 dark:border-gray-700">
    <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</p>
    <p className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">{value}</p>
    <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">{subtitle}</p>
  </div>
);

/* 数字格式化 */
function formatNum(num: number): string {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + 'w';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
}

export default StageDetailModal;
