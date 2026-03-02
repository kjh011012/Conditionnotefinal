/**
 * C4. 체크리포트 홈 + C5. 오전 체크 + C6. 저녁 체크 + C7. 일일 요약
 */
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, FileText, Sun, Moon, BarChart3, ChevronRight, Edit3, Send, Clock } from 'lucide-react';
import { OpsStatusBadge } from '../../components/ui/OpsStatusBadge';
import { CheckReportInput, ToggleCheck } from '../../components/ui/CheckReportInput';

type ThreeLevel = 'good' | 'normal' | 'bad' | null;

const reportHistory = [
  { date: '3/11(화)', morning: 'completed', evening: 'completed', daily: 'completed' },
  { date: '3/10(월)', morning: 'completed', evening: 'completed', daily: 'submitted' },
  { date: '3/9(일)', morning: 'completed', evening: 'completed', daily: 'completed' },
];

interface ParticipantCheck {
  id: string; name: string; group: string;
  sleep: ThreeLevel; condition: ThreeLevel; mood: ThreeLevel;
  pain: boolean | null; memo: string;
}

const initialParticipants: ParticipantCheck[] = [
  { id: '1', name: '김영숙', group: 'A조', sleep: null, condition: null, mood: null, pain: null, memo: '' },
  { id: '2', name: '박순자', group: 'A조', sleep: null, condition: null, mood: null, pain: null, memo: '' },
  { id: '3', name: '이정호', group: 'B조', sleep: null, condition: null, mood: null, pain: null, memo: '' },
  { id: '4', name: '최미경', group: 'A조', sleep: null, condition: null, mood: null, pain: null, memo: '' },
  { id: '5', name: '정상철', group: 'B조', sleep: null, condition: null, mood: null, pain: null, memo: '' },
];

type ViewState = 'hub' | 'morning' | 'evening' | 'daily';

export function CoordCheckReport() {
  const navigate = useNavigate();
  const [view, setView] = useState<ViewState>('hub');
  const [participants, setParticipants] = useState(initialParticipants);
  const [activeP, setActiveP] = useState(0);
  const [dailyText, setDailyText] = useState('오늘 캠프 분위기는 전반적으로 안정적이었습니다. 김영숙님의 수면 하락이 지속되어 주의가 필요합니다. 대부분의 참가자가 오전 프로그램에 적극 참여했으며, 숲길 걷기 만족도가 높았습니다.');
  const [tomorrowSuggest, setTomorrowSuggest] = useState('김영숙님 개별 상담 진행 권장. 오후 프로그램 시간 조정 검토 필요.');

  const updateP = (field: string, val: any) => {
    setParticipants(prev => prev.map((p, i) => i === activeP ? { ...p, [field]: val } : p));
  };

  const p = participants[activeP];

  // === HUB ===
  if (view === 'hub') {
    return (
      <div className="min-h-screen bg-[#F7F8FA]">
        <div className="px-4 pt-4 pb-3 bg-white border-b border-[#EEF1F4]">
          <h2 className="text-[18px] text-[#111827]">체크리포트</h2>
          <span className="text-[12px] text-[#9CA3AF]">오늘의 체크 상태를 확인하세요</span>
        </div>

        <div className="px-4 pt-4 pb-6 flex flex-col gap-4">
          {/* Today's report status */}
          <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
            <span className="text-[14px] text-[#111827] block mb-3">오늘 리포트</span>
            {[
              { icon: Sun, label: '오전 체크', status: 'draft', action: () => setView('morning') },
              { icon: Moon, label: '저녁 체크', status: 'pending', action: () => setView('evening') },
              { icon: BarChart3, label: '일일 요약', status: 'pending', action: () => setView('daily') },
            ].map(r => (
              <button key={r.label} onClick={r.action}
                className="w-full flex items-center gap-3 py-3 border-t border-[#F3F4F6] first:border-0 text-left">
                <div className="w-9 h-9 rounded-full bg-[#E0F2FE] flex items-center justify-center shrink-0">
                  <r.icon size={16} className="text-[#0EA5E9]" />
                </div>
                <div className="flex-1">
                  <span className="text-[13px] text-[#111827] block">{r.label}</span>
                </div>
                <OpsStatusBadge status={r.status} size="sm" />
                <ChevronRight size={14} className="text-[#9CA3AF]" />
              </button>
            ))}
          </div>

          {/* Auto-detect card */}
          <div className="bg-[#FFF1E8] rounded-[14px] p-3">
            <span className="text-[11px] text-[#EA580C] block mb-1">⚠ 주의/관리필요 자동 감지</span>
            <p className="text-[10px] text-[#6B7280]">김영숙(수면 하락 3일), 박순자(스트레스 급등) — 오전 체크 시 우선 확인해주세요.</p>
          </div>

          {/* CTA */}
          <button onClick={() => setView('morning')}
            className="w-full h-[48px] bg-[#0EA5E9] text-white rounded-[14px] text-[14px] flex items-center justify-center gap-2">
            <Edit3 size={16} /> 리포트 작성 시작
          </button>

          {/* History */}
          <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
            <span className="text-[14px] text-[#111827] block mb-3">지난 리포트</span>
            {reportHistory.map(h => (
              <div key={h.date} className="flex items-center gap-3 py-2 border-t border-[#F3F4F6] first:border-0">
                <span className="text-[12px] text-[#374151] flex-1">{h.date}</span>
                <OpsStatusBadge status={h.morning} size="sm" />
                <OpsStatusBadge status={h.evening} size="sm" />
                <OpsStatusBadge status={h.daily} size="sm" />
              </div>
            ))}
          </div>

          <p className="text-[10px] text-[#9CA3AF] text-center">제출 대상: 관리자(운영팀)</p>
        </div>
      </div>
    );
  }

  // === MORNING / EVENING CHECK ===
  if (view === 'morning' || view === 'evening') {
    const isMorning = view === 'morning';
    return (
      <div className="min-h-screen bg-[#F7F8FA]">
        <div className="flex items-center gap-3 px-4 h-[56px] bg-white border-b border-[#EEF1F4]">
          <button onClick={() => setView('hub')} className="w-9 h-9 flex items-center justify-center">
            <ArrowLeft size={22} className="text-[#374151]" />
          </button>
          <h2 className="text-[16px] text-[#111827]">{isMorning ? '오전' : '저녁'} 체크리포트</h2>
          <OpsStatusBadge status="draft" size="sm" />
        </div>

        <div className="px-4 pt-4 pb-6 flex flex-col gap-4">
          {/* Participant selector */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {participants.map((pp, i) => {
              const hasInput = pp.sleep || pp.condition || pp.mood || pp.pain !== null;
              return (
                <button key={pp.id} onClick={() => setActiveP(i)}
                  className={`shrink-0 px-3 py-2 rounded-full text-[11px] transition-all ${i === activeP ? 'bg-[#0EA5E9] text-white' : hasInput ? 'bg-[#E8F5EE] text-[#1B7A4B] border border-[#1B7A4B]/20' : 'bg-white text-[#6B7280] border border-[#E5E7EB]'}`}>
                  {pp.name}
                </button>
              );
            })}
          </div>

          {/* Info card */}
          <div className="bg-[#FFF1E8] rounded-[12px] p-3">
            <span className="text-[10px] text-[#EA580C]">참고: 시스템 감지 — 수면 하락 추세</span>
          </div>

          {/* Check form */}
          <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
            <span className="text-[14px] text-[#111827] block mb-1">{p.name} <span className="text-[11px] text-[#9CA3AF]">{p.group}</span></span>
            <div className="border-t border-[#F3F4F6] mt-2">
              {isMorning ? (
                <>
                  <CheckReportInput label="수면 상태" value={p.sleep} onChange={v => updateP('sleep', v)} />
                  <CheckReportInput label="컨디션" value={p.condition} onChange={v => updateP('condition', v)} />
                  <CheckReportInput label="기분" value={p.mood} onChange={v => updateP('mood', v)} />
                  <ToggleCheck label="통증/어지러움" value={p.pain} onChange={v => updateP('pain', v)} />
                </>
              ) : (
                <>
                  <CheckReportInput label="피로/스트레스" value={p.condition} onChange={v => updateP('condition', v)} />
                  <CheckReportInput label="사회활동 참여" value={p.mood} onChange={v => updateP('mood', v)} />
                  <CheckReportInput label="취침 준비 상태" value={p.sleep} onChange={v => updateP('sleep', v)} />
                </>
              )}
            </div>
            <textarea value={p.memo} onChange={e => updateP('memo', e.target.value)}
              placeholder="특이사항 메모 (선택)" className="w-full h-[56px] mt-2 bg-[#F7F8FA] rounded-[10px] p-3 text-[11px] resize-none outline-none" />
          </div>

          {/* Nav between participants */}
          <div className="flex gap-2">
            {activeP > 0 && (
              <button onClick={() => setActiveP(activeP - 1)} className="flex-1 h-[40px] bg-white border border-[#E5E7EB] rounded-[10px] text-[12px] text-[#374151]">
                ← 이전
              </button>
            )}
            {activeP < participants.length - 1 && (
              <button onClick={() => setActiveP(activeP + 1)} className="flex-1 h-[40px] bg-[#0EA5E9] text-white rounded-[10px] text-[12px]">
                다음 →
              </button>
            )}
          </div>

          {/* Submit */}
          <div className="flex gap-2">
            <button className="flex-1 h-[48px] bg-white border border-[#E5E7EB] rounded-[14px] text-[13px] text-[#374151]">
              초안 저장
            </button>
            <button className="flex-1 h-[48px] bg-[#0EA5E9] text-white rounded-[14px] text-[13px] flex items-center justify-center gap-1.5">
              <Send size={14} /> 제출
            </button>
          </div>
        </div>
      </div>
    );
  }

  // === DAILY SUMMARY ===
  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <div className="flex items-center gap-3 px-4 h-[56px] bg-white border-b border-[#EEF1F4]">
        <button onClick={() => setView('hub')} className="w-9 h-9 flex items-center justify-center">
          <ArrowLeft size={22} className="text-[#374151]" />
        </button>
        <h2 className="text-[16px] text-[#111827]">일일 요약 리포트</h2>
      </div>

      <div className="px-4 pt-4 pb-6 flex flex-col gap-4">
        {/* AI summary */}
        <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 size={14} className="text-[#0EA5E9]" />
            <span className="text-[13px] text-[#111827]">AI 자동 요약</span>
            <span className="text-[9px] text-[#9CA3AF] bg-[#F3F4F6] px-1.5 py-0.5 rounded-full">편집 가능</span>
          </div>
          <textarea value={dailyText} onChange={e => setDailyText(e.target.value)}
            className="w-full h-[100px] bg-[#F7F8FA] rounded-[10px] p-3 text-[12px] text-[#374151] resize-none outline-none" style={{ lineHeight: 1.7 }} />
          <p className="text-[9px] text-[#9CA3AF] mt-1">AI가 생성한 요약입니다. 내용을 수정할 수 있습니다.</p>
        </div>

        {/* Tomorrow suggestion */}
        <div className="bg-[#E0F2FE] rounded-[14px] p-4">
          <span className="text-[12px] text-[#0EA5E9] block mb-1">내일 운영 제안</span>
          <textarea value={tomorrowSuggest} onChange={e => setTomorrowSuggest(e.target.value)}
            className="w-full h-[56px] bg-white rounded-[10px] p-3 text-[11px] text-[#374151] resize-none outline-none" />
        </div>

        {/* Attached issues */}
        <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
          <span className="text-[13px] text-[#111827] block mb-2">첨부 이슈</span>
          {[
            { title: '김영숙 수면 3일 하락', status: 'processing' },
            { title: '오후 요가 장소 변경', status: 'completed' },
          ].map(issue => (
            <div key={issue.title} className="flex items-center gap-2 py-2 border-t border-[#F3F4F6] first:border-0">
              <span className="text-[12px] text-[#374151] flex-1">{issue.title}</span>
              <OpsStatusBadge status={issue.status} size="sm" />
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <button className="flex-1 h-[48px] bg-white border border-[#E5E7EB] rounded-[14px] text-[13px] text-[#374151]">
            초안 저장
          </button>
          <button className="flex-1 h-[48px] bg-[#0EA5E9] text-white rounded-[14px] text-[13px] flex items-center justify-center gap-1.5">
            <Send size={14} /> 관리자에게 제출
          </button>
        </div>
      </div>
    </div>
  );
}
