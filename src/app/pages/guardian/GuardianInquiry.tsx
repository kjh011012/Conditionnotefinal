/**
 * G6. 코디네이터 문의/예약
 */
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Phone, MessageSquare, Calendar, ChevronRight, Send } from 'lucide-react';

const templates = [
  '수면 상태가 걱정됩니다',
  '식사를 잘 하고 계신지 궁금합니다',
  '기분/정서 상태가 어떤지 알고 싶습니다',
  '프로그램 참여 상황을 여쭙고 싶습니다',
  '기타 문의',
];

const timeSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];

export function GuardianInquiry() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'message' | 'call'>('message');
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [memo, setMemo] = useState('');

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <div className="flex items-center gap-3 px-4 h-[56px] bg-white border-b border-[#EEF1F4]">
        <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center">
          <ArrowLeft size={22} className="text-[#374151]" />
        </button>
        <h2 className="text-[18px] text-[#111827]">코디네이터 문의</h2>
      </div>

      <div className="px-4 pt-4 pb-6 flex flex-col gap-4">
        {/* Tab */}
        <div className="flex gap-2 bg-white rounded-[12px] p-1 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
          <button onClick={() => setTab('message')}
            className={`flex-1 h-[40px] rounded-[10px] text-[13px] flex items-center justify-center gap-1.5 transition-all ${tab === 'message' ? 'bg-[#1B7A4B] text-white' : 'text-[#6B7280]'}`}>
            <MessageSquare size={14} /> 메시지 문의
          </button>
          <button onClick={() => setTab('call')}
            className={`flex-1 h-[40px] rounded-[10px] text-[13px] flex items-center justify-center gap-1.5 transition-all ${tab === 'call' ? 'bg-[#1B7A4B] text-white' : 'text-[#6B7280]'}`}>
            <Phone size={14} /> 통화 예약
          </button>
        </div>

        {tab === 'message' ? (
          <>
            {/* Template select */}
            <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
              <span className="text-[14px] text-[#111827] block mb-3">사전 질문 선택</span>
              {templates.map((t, i) => (
                <button key={i} onClick={() => setSelectedTemplate(i)}
                  className={`w-full text-left flex items-center gap-2.5 py-2.5 border-t border-[#F3F4F6] first:border-0 text-[13px] ${selectedTemplate === i ? 'text-[#1B7A4B]' : 'text-[#374151]'}`}>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${selectedTemplate === i ? 'border-[#1B7A4B] bg-[#1B7A4B]' : 'border-[#D1D5DB]'}`}>
                    {selectedTemplate === i && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                  {t}
                </button>
              ))}
            </div>

            {/* Memo */}
            <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
              <span className="text-[13px] text-[#111827] block mb-2">추가 메모 (선택)</span>
              <textarea
                value={memo}
                onChange={e => setMemo(e.target.value)}
                placeholder="궁금한 점을 자유롭게 작성해주세요"
                className="w-full h-[80px] bg-[#F7F8FA] rounded-[12px] p-3 text-[12px] text-[#374151] resize-none border-none outline-none"
              />
            </div>

            <button className="w-full h-[48px] bg-[#1B7A4B] text-white rounded-[14px] text-[14px] flex items-center justify-center gap-2">
              <Send size={16} /> 문의 보내기
            </button>
          </>
        ) : (
          <>
            {/* Date */}
            <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
              <span className="text-[14px] text-[#111827] block mb-2">날짜 선택</span>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {['3/11(화)', '3/12(수)', '3/13(목)', '3/14(금)'].map(d => (
                  <button key={d} className="shrink-0 px-4 py-2 rounded-[10px] bg-[#F7F8FA] text-[12px] text-[#374151] border border-[#E5E7EB]">
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Time slots */}
            <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
              <span className="text-[14px] text-[#111827] block mb-3">시간 선택</span>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map(s => (
                  <button key={s} onClick={() => setSelectedSlot(s)}
                    className={`h-[40px] rounded-[10px] text-[13px] transition-all ${selectedSlot === s ? 'bg-[#1B7A4B] text-white' : 'bg-[#F7F8FA] text-[#374151] border border-[#E5E7EB]'}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <button className="w-full h-[48px] bg-[#1B7A4B] text-white rounded-[14px] text-[14px] flex items-center justify-center gap-2">
              <Calendar size={16} /> 통화 예약하기
            </button>
          </>
        )}

        <p className="text-[10px] text-[#9CA3AF] text-center" style={{ lineHeight: 1.5 }}>
          참가자 동의 범위를 넘는 정보는 코디네이터도 공유하지 않습니다.
        </p>
      </div>
    </div>
  );
}
