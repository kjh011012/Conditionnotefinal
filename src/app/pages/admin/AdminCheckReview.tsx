/**
 * A16. 체크리포트 검토/반려/완료 (Closed Loop)
 */
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ChevronLeft, FileText, CheckCircle2, XCircle, Clock, Eye, Send, RotateCcw } from 'lucide-react';

type ReportStatus = 'draft' | 'submitted' | 'rejected' | 'completed';

interface CheckReport {
  id: string;
  type: '오전' | '저녁' | '일일요약';
  date: string;
  coordinator: string;
  status: ReportStatus;
  summary: string;
  issueCount: number;
  rejectReason?: string;
}

const statusConfig: Record<ReportStatus, { label: string; color: string; bg: string; Icon: any }> = {
  draft: { label: '초안', color: '#9CA3AF', bg: '#F3F4F6', Icon: FileText },
  submitted: { label: '제출됨', color: '#0EA5E9', bg: '#E0F2FE', Icon: Send },
  rejected: { label: '반려', color: '#DC2626', bg: '#FEF2F2', Icon: XCircle },
  completed: { label: '완료', color: '#1B7A4B', bg: '#E8F5EE', Icon: CheckCircle2 },
};

const reports: CheckReport[] = [
  { id: 'r1', type: '오전', date: '03.02', coordinator: '이코디', status: 'submitted', summary: '전원 건강 양호. 김영숙님 수면 점수 다소 낮음. 특이사항 없음.', issueCount: 1 },
  { id: 'r2', type: '저녁', date: '03.01', coordinator: '이코디', status: 'submitted', summary: '프로그램 참여율 92%. 박순자님 경미한 두통 호소. 이정희님 프로그램 불참(개인사유).', issueCount: 2 },
  { id: 'r3', type: '일일요약', date: '03.01', coordinator: '이코디', status: 'completed', summary: '전반적 안정. 수면 평균 6.2시간. 스트레스 지수 평균 보통. 프로그램 참여율 88%.', issueCount: 0 },
  { id: 'r4', type: '오전', date: '03.01', coordinator: '박코디', status: 'completed', summary: 'C조 전원 정상. 측정 완료율 100%.', issueCount: 0 },
  { id: 'r5', type: '저녁', date: '02.28', coordinator: '이코디', status: 'rejected', summary: '오늘 특이사항 없음.', issueCount: 0, rejectReason: '참가자별 상태 기록이 누락되었습니다. 보완 후 재제출해주세요.' },
  { id: 'r6', type: '일일요약', date: '02.28', coordinator: '이코디', status: 'completed', summary: '전반적 안정 유지. 주의대상 0명.', issueCount: 0 },
];

export function AdminCheckReview() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | ReportStatus>('all');
  const [selectedReport, setSelectedReport] = useState<CheckReport | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectForm, setShowRejectForm] = useState(false);

  const filtered = reports.filter(r => filter === 'all' || r.status === filter);
  const pendingCount = reports.filter(r => r.status === 'submitted').length;

  if (selectedReport) {
    const st = statusConfig[selectedReport.status];
    return (
      <div className="min-h-screen bg-[#F7F8FA]">
        <div className="flex items-center gap-3 px-4 h-[56px] bg-white border-b border-[#EEF1F4]">
          <button onClick={() => { setSelectedReport(null); setShowRejectForm(false); }} className="w-10 h-10 flex items-center justify-center rounded-full active:bg-[#F3F4F6]">
            <ChevronLeft size={22} className="text-[#374151]" />
          </button>
          <h2 className="text-[16px] text-[#111827] flex-1">리포트 상세</h2>
          <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ backgroundColor: st.bg, color: st.color }}>{st.label}</span>
        </div>

        <div className="px-4 pt-4 pb-8 flex flex-col gap-4">
          <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
            {[
              { label: '유형', value: `${selectedReport.type} 체크` },
              { label: '날짜', value: selectedReport.date },
              { label: '제출자', value: selectedReport.coordinator },
              { label: '이슈', value: `${selectedReport.issueCount}건` },
            ].map(r => (
              <div key={r.label} className="flex items-center justify-between py-2 border-t border-[#F3F4F6] first:border-0">
                <span className="text-[12px] text-[#6B7280]">{r.label}</span>
                <span className="text-[12px] text-[#111827]">{r.value}</span>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
            <span className="text-[13px] text-[#111827] block mb-2">요약 내용</span>
            <p className="text-[12px] text-[#374151]" style={{ lineHeight: 1.7 }}>
              {selectedReport.summary}
            </p>
          </div>

          {selectedReport.rejectReason && (
            <div className="bg-[#FEF2F2] rounded-[14px] p-4">
              <div className="flex items-center gap-2 mb-2">
                <XCircle size={14} className="text-[#DC2626]" />
                <span className="text-[12px] text-[#DC2626]">반려 사유</span>
              </div>
              <p className="text-[11px] text-[#991B1B]" style={{ lineHeight: 1.6 }}>
                {selectedReport.rejectReason}
              </p>
            </div>
          )}

          {showRejectForm && (
            <div className="bg-white rounded-[16px] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-[#DC2626]/20">
              <span className="text-[13px] text-[#111827] block mb-2">반려 사유</span>
              <textarea value={rejectReason} onChange={e => setRejectReason(e.target.value)}
                placeholder="반려 사유를 작성해주세요 (코디네이터에게 전달됩니다)"
                rows={3} className="w-full px-3 py-2 bg-[#F7F8FA] rounded-[10px] text-[12px] outline-none resize-none mb-3" />
              <div className="flex gap-2">
                <button className="flex-1 h-[40px] bg-[#DC2626] text-white rounded-[10px] text-[12px] flex items-center justify-center gap-1">
                  <XCircle size={14} /> 반려 확정
                </button>
                <button onClick={() => setShowRejectForm(false)}
                  className="h-[40px] px-4 border border-[#E5E7EB] rounded-[10px] text-[12px] text-[#6B7280]">취소</button>
              </div>
            </div>
          )}

          {selectedReport.status === 'submitted' && !showRejectForm && (
            <div className="flex gap-2">
              <button className="flex-1 h-[48px] bg-[#1B7A4B] text-white rounded-[12px] text-[13px] flex items-center justify-center gap-2">
                <CheckCircle2 size={16} /> 완료 처리
              </button>
              <button onClick={() => setShowRejectForm(true)}
                className="flex-1 h-[48px] border border-[#DC2626] text-[#DC2626] rounded-[12px] text-[13px] flex items-center justify-center gap-2">
                <RotateCcw size={16} /> 반려
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <div className="flex items-center gap-3 px-4 h-[56px] bg-white border-b border-[#EEF1F4]">
        <button onClick={() => navigate('/admin/more')} className="w-10 h-10 flex items-center justify-center rounded-full active:bg-[#F3F4F6]">
          <ChevronLeft size={22} className="text-[#374151]" />
        </button>
        <h2 className="text-[16px] text-[#111827]">체크리포트 검토</h2>
        {pendingCount > 0 && (
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FEF2F2] text-[#DC2626]">{pendingCount}건 대기</span>
        )}
      </div>

      <div className="px-4 pt-3 pb-2">
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
          {[
            { key: 'all', label: '전체' },
            { key: 'submitted', label: `대기 (${pendingCount})` },
            { key: 'rejected', label: '반려' },
            { key: 'completed', label: '완료' },
          ].map(t => (
            <button key={t.key} onClick={() => setFilter(t.key as any)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-[10px] ${filter === t.key ? 'bg-[#7C3AED] text-white' : 'bg-white text-[#6B7280] border border-[#E5E7EB]'}`}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pb-8 flex flex-col gap-2">
        {filtered.map(r => {
          const st = statusConfig[r.status];
          return (
            <button key={r.id} onClick={() => setSelectedReport(r)}
              className="w-full bg-white rounded-[14px] p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)] text-left active:scale-[0.98] transition-transform">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <st.Icon size={14} style={{ color: st.color }} />
                  <span className="text-[13px] text-[#111827]">{r.date} · {r.type} 체크</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ backgroundColor: st.bg, color: st.color }}>
                  {st.label}
                </span>
              </div>
              <p className="text-[11px] text-[#6B7280] line-clamp-2 mb-1">{r.summary}</p>
              <div className="flex items-center justify-between text-[10px] text-[#9CA3AF]">
                <span>제출: {r.coordinator}</span>
                {r.issueCount > 0 && <span className="text-[#F59E0B]">이슈 {r.issueCount}건</span>}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
