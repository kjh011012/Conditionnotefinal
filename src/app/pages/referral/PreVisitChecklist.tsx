/**
 * P-Referral-03_PreVisitChecklist
 * "방문 전 준비물" 체크리스트
 * - 신분증 / 리포트 PDF / 복용약 메모(선택) 등
 * - "이 앱은 진단이 아니라 연결을 돕습니다" 고정 문구
 */
import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  ArrowLeft, Check, ClipboardCheck, FileText,
  CreditCard, Pill, Shield, Download, Share2, Info,
} from 'lucide-react';

interface CheckItem {
  id: string;
  icon: any;
  label: string;
  desc: string;
  required: boolean;
}

const checklistItems: CheckItem[] = [
  {
    id: 'id-card',
    icon: CreditCard,
    label: '신분증',
    desc: '주민등록증, 운전면허증, 여권 중 하나',
    required: true,
  },
  {
    id: 'report-pdf',
    icon: FileText,
    label: '컨디션노트 리포트 (PDF)',
    desc: '앱에서 저장한 리포트를 보여주시면 상담에 도움이 돼요',
    required: true,
  },
  {
    id: 'medication',
    icon: Pill,
    label: '복용 중인 약 메모',
    desc: '현재 드시는 약이 있다면 이름·용량 메모',
    required: false,
  },
  {
    id: 'questions',
    icon: ClipboardCheck,
    label: '궁금한 점 메모',
    desc: '상담 시 물어보고 싶은 것을 미리 적어두면 편해요',
    required: false,
  },
];

export function PreVisitChecklist() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setChecked(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const requiredCount = checklistItems.filter(i => i.required).length;
  const requiredChecked = checklistItems.filter(i => i.required && checked.has(i.id)).length;
  const allRequiredDone = requiredChecked === requiredCount;

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 h-[56px] bg-white">
        <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center">
          <ArrowLeft size={22} className="text-[#374151]" />
        </button>
        <h2 className="text-[18px] text-[#111827]">방문 전 준비</h2>
      </div>

      <div className="px-4 pt-5 pb-8">
        {/* Progress */}
        <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)] mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[14px] text-[#111827]">준비물 체크</span>
            <span className="text-[13px] text-[#6B7280]">
              {checked.size}/{checklistItems.length} 완료
            </span>
          </div>
          <div className="h-2 bg-[#EEF1F4] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#1B7A4B] rounded-full transition-all duration-300"
              style={{ width: `${(checked.size / checklistItems.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Checklist */}
        <div className="flex flex-col gap-3 mb-5">
          {checklistItems.map(item => {
            const Icon = item.icon;
            const isDone = checked.has(item.id);
            return (
              <button
                key={item.id}
                onClick={() => toggle(item.id)}
                className={`w-full bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)] flex items-start gap-3 text-left transition-all ${
                  isDone ? 'ring-1 ring-[#1B7A4B]' : ''
                }`}
              >
                {/* Checkbox */}
                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                  isDone ? 'bg-[#1B7A4B]' : 'border-2 border-[#D1D5DB]'
                }`}>
                  {isDone && <Check size={14} className="text-white" />}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <Icon size={16} className={isDone ? 'text-[#1B7A4B]' : 'text-[#6B7280]'} />
                    <span className={`text-[15px] ${isDone ? 'text-[#1B7A4B]' : 'text-[#111827]'}`}>
                      {item.label}
                    </span>
                    {!item.required && (
                      <span className="text-[10px] text-[#9CA3AF] bg-[#F7F8FA] px-1.5 py-0.5 rounded-full">선택</span>
                    )}
                  </div>
                  <p className={`text-[12px] ${isDone ? 'text-[#6B7280]' : 'text-[#9CA3AF]'}`}>
                    {item.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Report PDF action */}
        <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)] mb-4">
          <div className="flex items-center gap-2 mb-3">
            <FileText size={16} className="text-[#1B7A4B]" />
            <span className="text-[14px] text-[#111827]">리포트 PDF 준비</span>
          </div>
          <p className="text-[12px] text-[#6B7280] mb-3">
            리포트를 미리 저장하거나 공유해 두면 방문 시 편해요.
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => navigate('/camp/report-export')}
              className="flex-1 h-[44px] bg-[#E8F5EE] text-[#1B7A4B] rounded-[12px] text-[13px] flex items-center justify-center gap-1.5"
            >
              <Download size={14} /> PDF 저장
            </button>
            <button className="flex-1 h-[44px] bg-[#E8F5EE] text-[#1B7A4B] rounded-[12px] text-[13px] flex items-center justify-center gap-1.5">
              <Share2 size={14} /> 공유하기
            </button>
          </div>
        </div>

        {/* Visit tips */}
        <div className="bg-[#FFF1E8] rounded-[16px] p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Info size={14} className="text-[#FF8A3D]" />
            <span className="text-[13px] text-[#EA580C]">방문 시 참고</span>
          </div>
          <ul className="text-[12px] text-[#374151] space-y-1.5">
            <li className="flex items-start gap-1.5">
              <span className="text-[#FF8A3D] mt-0.5">•</span>
              <span>예약 없이 방문 가능한 곳이 많아요. 전화로 확인하면 더 편해요.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-[#FF8A3D] mt-0.5">•</span>
              <span>리포트를 보여주시면 상담이 더 빠르게 진행될 수 있어요.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-[#FF8A3D] mt-0.5">•</span>
              <span>보호자와 함께 방문하시면 안심이 돼요.</span>
            </li>
          </ul>
        </div>

        {/* Fixed disclaimer */}
        <div className="bg-[#F7F8FA] rounded-[14px] p-3 mb-4">
          <div className="flex items-start gap-2">
            <Shield size={14} className="text-[#9CA3AF] mt-0.5 shrink-0" />
            <p className="text-[12px] text-[#6B7280]">
              이 앱은 진단이 아니라 연결을 돕습니다.
              컨디션노트 결과는 생활 점검용이며, 방문 시 전문가의 판단이 우선합니다.
            </p>
          </div>
        </div>

        {/* Done CTA */}
        <button
          onClick={() => navigate(-1)}
          className={`w-full h-[52px] rounded-[14px] text-[16px] transition-all ${
            allRequiredDone
              ? 'bg-[#1B7A4B] text-white'
              : 'bg-[#E5E7EB] text-[#9CA3AF]'
          }`}
        >
          {allRequiredDone ? '준비 완료 ✓' : '필수 항목을 체크해 주세요'}
        </button>
      </div>
    </div>
  );
}
