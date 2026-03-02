/**
 * C-Report-Checklist-01_IssueReport
 * "리포트 발급 체크리스트" (현장 표준화)
 * 체크: 기준선 완료 / 재측정 완료 / 프로그램 참여 로그 최소 1개 / 최종 리포트 생성·발급
 * 완료하면 "발급 완료" 스탬프
 */
import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  ArrowLeft, Users, Check, AlertCircle,
  FileText, ClipboardCheck, Activity, Award,
  ChevronDown, ChevronUp,
} from 'lucide-react';
import { StatusChip } from '../../components/ui/StatusChip';
import { useToast } from '../../components/ui/AppToast';

interface Participant {
  id: number;
  name: string;
  checklist: {
    baseline: boolean;
    remeasure: boolean;
    programLog: boolean;
    reportGenerated: boolean;
  };
  issued: boolean;
}

const initialParticipants: Participant[] = [
  { id: 1, name: '김영숙', checklist: { baseline: true, remeasure: true, programLog: true, reportGenerated: true }, issued: false },
  { id: 2, name: '박철수', checklist: { baseline: true, remeasure: true, programLog: true, reportGenerated: false }, issued: false },
  { id: 3, name: '이순자', checklist: { baseline: true, remeasure: false, programLog: true, reportGenerated: false }, issued: false },
  { id: 4, name: '정미경', checklist: { baseline: true, remeasure: false, programLog: false, reportGenerated: false }, issued: false },
  { id: 5, name: '최동호', checklist: { baseline: false, remeasure: false, programLog: false, reportGenerated: false }, issued: false },
];

const checklistLabels = [
  { key: 'baseline' as const, label: '기준선 완료', icon: Activity },
  { key: 'remeasure' as const, label: '재측정 완료', icon: Activity },
  { key: 'programLog' as const, label: '프로그램 참여 로그 1개+', icon: ClipboardCheck },
  { key: 'reportGenerated' as const, label: '최종 리포트 생성', icon: FileText },
];

export function ReportChecklist() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [participants, setParticipants] = useState(initialParticipants);
  const [expandedId, setExpandedId] = useState<number | null>(1);

  const isAllChecked = (p: Participant) =>
    Object.values(p.checklist).every(v => v);

  const toggleCheck = (pId: number, key: keyof Participant['checklist']) => {
    setParticipants(prev => prev.map(p => {
      if (p.id !== pId) return p;
      return {
        ...p,
        checklist: { ...p.checklist, [key]: !p.checklist[key] },
      };
    }));
  };

  const issueReport = (pId: number) => {
    setParticipants(prev => prev.map(p =>
      p.id === pId ? { ...p, issued: true } : p
    ));
    const participant = participants.find(p => p.id === pId);
    showToast('success', `${participant?.name}님 리포트 발급 완료`);
  };

  const totalIssued = participants.filter(p => p.issued).length;
  const totalReady = participants.filter(p => isAllChecked(p) && !p.issued).length;

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 h-[56px] bg-white border-b border-[#EEF1F4]">
        <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center">
          <ArrowLeft size={22} className="text-[#374151]" />
        </button>
        <div>
          <h2 className="text-[18px] text-[#111827]">리포트 발급 체크리스트</h2>
          <span className="text-[11px] text-[#9CA3AF]">코디네이터 · 현장 운영</span>
        </div>
      </div>

      <div className="px-4 pt-4 pb-8">
        {/* Summary bar */}
        <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)] mb-5 flex items-center gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Users size={16} className="text-[#6B7280]" />
              <span className="text-[14px] text-[#111827]">전체 {participants.length}명</span>
            </div>
            <div className="flex gap-3 text-[12px]">
              <span className="text-[#22C55E]">발급 {totalIssued}</span>
              <span className="text-[#1B7A4B]">준비 {totalReady}</span>
              <span className="text-[#9CA3AF]">미완 {participants.length - totalIssued - totalReady}</span>
            </div>
          </div>
          <div className="h-[50px] w-[50px] rounded-full border-4 border-[#1B7A4B] flex items-center justify-center">
            <span className="text-[16px] text-[#1B7A4B]">{Math.round((totalIssued / participants.length) * 100)}%</span>
          </div>
        </div>

        {/* Participant list */}
        <div className="flex flex-col gap-3">
          {participants.map(p => {
            const isExpanded = expandedId === p.id;
            const ready = isAllChecked(p);
            const checkCount = Object.values(p.checklist).filter(v => v).length;

            return (
              <div
                key={p.id}
                className={`bg-white rounded-[16px] shadow-[0_1px_6px_rgba(0,0,0,0.04)] overflow-hidden transition-all ${
                  p.issued ? 'border border-[#22C55E]/30' : ''
                }`}
              >
                {/* Collapsed row */}
                <button
                  onClick={() => setExpandedId(isExpanded ? null : p.id)}
                  className="w-full flex items-center gap-3 px-4 py-3.5 text-left"
                >
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-[13px] ${
                    p.issued ? 'bg-[#22C55E] text-white' : 'bg-[#E8F5EE] text-[#1B7A4B]'
                  }`}>
                    {p.issued ? <Check size={18} /> : p.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[15px] text-[#111827]">{p.name}</span>
                      {p.issued ? (
                        <StatusChip status="green" label="발급 완료" />
                      ) : ready ? (
                        <StatusChip status="green" label="발급 가능" />
                      ) : (
                        <StatusChip status="yellow" label={`${checkCount}/4`} />
                      )}
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp size={16} className="text-[#9CA3AF]" />
                  ) : (
                    <ChevronDown size={16} className="text-[#9CA3AF]" />
                  )}
                </button>

                {/* Expanded checklist */}
                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-[#EEF1F4]">
                    <div className="pt-3 flex flex-col gap-2">
                      {checklistLabels.map(cl => {
                        const Icon = cl.icon;
                        const checked = p.checklist[cl.key];
                        return (
                          <button
                            key={cl.key}
                            onClick={() => !p.issued && toggleCheck(p.id, cl.key)}
                            disabled={p.issued}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-[10px] min-h-[44px] transition-all ${
                              checked
                                ? 'bg-[#E8F5EE]'
                                : 'bg-[#F7F8FA] border border-[#E5E7EB]'
                            } ${p.issued ? 'opacity-70 cursor-not-allowed' : ''}`}
                          >
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                              checked ? 'bg-[#22C55E]' : 'border-2 border-[#D1D5DB]'
                            }`}>
                              {checked && <Check size={12} className="text-white" />}
                            </div>
                            <Icon size={14} className={checked ? 'text-[#1B7A4B]' : 'text-[#9CA3AF]'} />
                            <span className={`text-[14px] ${checked ? 'text-[#0E4B2E]' : 'text-[#374151]'}`}>
                              {cl.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Issue button */}
                    {!p.issued && (
                      <button
                        onClick={() => ready && issueReport(p.id)}
                        disabled={!ready}
                        className={`w-full h-[44px] rounded-[12px] text-[14px] flex items-center justify-center gap-1.5 mt-3 transition-all ${
                          ready
                            ? 'bg-[#1B7A4B] text-white'
                            : 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'
                        }`}
                      >
                        {ready ? (
                          <><Award size={15} /> 리포트 발급하기</>
                        ) : (
                          <><AlertCircle size={14} /> 체크리스트를 완료해 주세요</>
                        )}
                      </button>
                    )}

                    {/* Issued stamp */}
                    {p.issued && (
                      <div className="flex items-center justify-center gap-2 mt-3 py-3 bg-[#E8F5EE] rounded-[12px]">
                        <Award size={20} className="text-[#1B7A4B]" />
                        <span className="text-[16px] text-[#1B7A4B]">발급 완료</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Batch issue */}
        {totalReady > 0 && (
          <button
            onClick={() => {
              setParticipants(prev => prev.map(p =>
                isAllChecked(p) ? { ...p, issued: true } : p
              ));
              showToast('success', `${totalReady}명 리포트 일괄 발급 완료`);
            }}
            className="w-full h-[52px] bg-[#1B7A4B] text-white rounded-[14px] text-[16px] flex items-center justify-center gap-2 mt-5 shadow-[0_4px_16px_rgba(27,122,75,0.3)]"
          >
            <Award size={18} /> 준비 완료 {totalReady}명 일괄 발급
          </button>
        )}
      </div>
    </div>
  );
}
