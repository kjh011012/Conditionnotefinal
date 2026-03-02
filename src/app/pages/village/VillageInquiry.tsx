/**
 * V-P6. 문의/건의 (참가자)
 */
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useVillage } from '../../context/VillageContext';
import { ContextBar } from '../../components/ui/ContextBar';
import { ChevronLeft, Plus, Clock, CheckCircle2, MessageCircle, Send, Info } from 'lucide-react';

const inquiries = [
  { id: '1', type: '건강', title: '측정기 데이터가 동기화되지 않습니다', date: '03.02', status: 'pending' },
  { id: '2', type: '일정', title: '오후 프로그램 시간 확인 요청', date: '03.01', status: 'answered' },
  { id: '3', type: '숙소', title: '온수 관련 문의', date: '02.28', status: 'completed' },
];

const statusMap: Record<string, { label: string; color: string; bg: string; Icon: any }> = {
  pending: { label: '대기', color: '#F59E0B', bg: '#FEF3C7', Icon: Clock },
  answered: { label: '답변완료', color: '#0EA5E9', bg: '#E0F2FE', Icon: MessageCircle },
  completed: { label: '처리완료', color: '#1B7A4B', bg: '#E8F5EE', Icon: CheckCircle2 },
};

const inquiryTypes = ['건강', '일정', '숙소', '식단', '기타'];

export function VillageInquiry() {
  const navigate = useNavigate();
  const { activeVillage } = useVillage();
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState('건강');
  const [formTitle, setFormTitle] = useState('');
  const [formContent, setFormContent] = useState('');
  const color = activeVillage?.primaryColor || '#1B7A4B';

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <ContextBar />
      <div className="flex items-center gap-3 px-4 h-[56px] bg-white border-b border-[#EEF1F4]">
        <button onClick={() => navigate('/village')} className="w-10 h-10 flex items-center justify-center rounded-full active:bg-[#F3F4F6]">
          <ChevronLeft size={22} className="text-[#374151]" />
        </button>
        <h2 className="text-[16px] text-[#111827] flex-1">문의/건의</h2>
        <button onClick={() => setShowForm(!showForm)} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: color + '15' }}>
          <Plus size={18} style={{ color }} />
        </button>
      </div>

      <div className="px-4 pt-4 pb-8 flex flex-col gap-3">
        {/* Privacy note */}
        <div className="flex items-start gap-2 bg-[#F0F9FF] rounded-[10px] px-3 py-2">
          <Info size={13} className="text-[#0EA5E9] shrink-0 mt-0.5" />
          <span className="text-[10px] text-[#0369A1]" style={{ lineHeight: 1.5 }}>
            문의 내용은 담당 코디네이터와 관리자에게만 전달됩니다. 주민등록번호 등 민감 정보는 기재하지 마세요.
          </span>
        </div>

        {/* New inquiry form */}
        {showForm && (
          <div className="bg-white rounded-[16px] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.08)] border" style={{ borderColor: color + '30' }}>
            <span className="text-[14px] text-[#111827] block mb-3">새 문의 작성</span>

            <div className="flex gap-1.5 mb-3">
              {inquiryTypes.map(t => (
                <button key={t} onClick={() => setFormType(t)}
                  className={`px-3 py-1.5 rounded-full text-[10px] ${formType === t ? 'text-white' : 'bg-[#F3F4F6] text-[#6B7280]'}`}
                  style={formType === t ? { backgroundColor: color } : {}}>
                  {t}
                </button>
              ))}
            </div>

            <input value={formTitle} onChange={e => setFormTitle(e.target.value)}
              placeholder="제목" className="w-full h-[42px] px-3 bg-[#F7F8FA] rounded-[10px] text-[13px] outline-none mb-2" />
            <textarea value={formContent} onChange={e => setFormContent(e.target.value)}
              placeholder="문의 내용을 작성해주세요" rows={3}
              className="w-full px-3 py-2 bg-[#F7F8FA] rounded-[10px] text-[12px] outline-none resize-none mb-3" />

            <button className="w-full h-[44px] text-white rounded-[12px] text-[13px] flex items-center justify-center gap-2 active:opacity-90"
              style={{ backgroundColor: color }}>
              <Send size={14} /> 문의 등록
            </button>
          </div>
        )}

        {/* Inquiry list */}
        {inquiries.map(inq => {
          const st = statusMap[inq.status];
          return (
            <div key={inq.id} className="bg-white rounded-[14px] p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
              <div className="flex items-start justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] px-2 py-0.5 rounded-full" style={{ backgroundColor: color + '15', color }}>
                    {inq.type}
                  </span>
                  <span className="text-[13px] text-[#111827]">{inq.title}</span>
                </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-[10px] text-[#9CA3AF]">{inq.date}</span>
                <div className="flex items-center gap-1">
                  <st.Icon size={10} style={{ color: st.color }} />
                  <span className="text-[10px]" style={{ color: st.color }}>{st.label}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
