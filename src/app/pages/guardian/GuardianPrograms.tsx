/**
 * G5. 프로그램 참여 현황
 */
import { useNavigate } from 'react-router';
import { ArrowLeft, CheckCircle, XCircle, Clock, MessageSquare } from 'lucide-react';

const programs = [
  { name: '아침 명상', time: '07:30', status: 'done', satisfaction: '좋음' },
  { name: '숲길 걷기', time: '09:00', status: 'done', satisfaction: '보통' },
  { name: '치유 요가', time: '11:00', status: 'missed', satisfaction: null },
  { name: '자연식 요리', time: '14:00', status: 'upcoming', satisfaction: null },
  { name: '저녁 명상', time: '19:00', status: 'upcoming', satisfaction: null },
];

const weeklyRate = 78;

export function GuardianPrograms() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <div className="flex items-center gap-3 px-4 h-[56px] bg-white border-b border-[#EEF1F4]">
        <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center">
          <ArrowLeft size={22} className="text-[#374151]" />
        </button>
        <h2 className="text-[18px] text-[#111827]">프로그램 참여 현황</h2>
      </div>

      <div className="px-4 pt-4 pb-6 flex flex-col gap-4">
        {/* Rate card */}
        <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)] flex items-center gap-4">
          <div className="w-16 h-16 rounded-full border-4 border-[#1B7A4B] flex items-center justify-center">
            <span className="text-[18px] text-[#1B7A4B]">{weeklyRate}%</span>
          </div>
          <div>
            <span className="text-[14px] text-[#111827] block">이번 주 참여율</span>
            <span className="text-[12px] text-[#6B7280]">10개 중 7개 프로그램 참여</span>
          </div>
        </div>

        {/* Today's programs */}
        <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
          <span className="text-[14px] text-[#111827] block mb-3">오늘 프로그램</span>
          {programs.map(p => (
            <div key={p.name} className="flex items-center gap-3 py-2.5 border-t border-[#F3F4F6] first:border-0">
              {p.status === 'done' && <CheckCircle size={18} className="text-[#22C55E] shrink-0" />}
              {p.status === 'missed' && <XCircle size={18} className="text-[#EF4444] shrink-0" />}
              {p.status === 'upcoming' && <Clock size={18} className="text-[#9CA3AF] shrink-0" />}
              <div className="flex-1">
                <span className={`text-[13px] block ${p.status === 'missed' ? 'text-[#9CA3AF] line-through' : 'text-[#111827]'}`}>{p.name}</span>
                <span className="text-[10px] text-[#9CA3AF]">{p.time}</span>
              </div>
              {p.satisfaction && (
                <span className="text-[10px] text-[#1B7A4B] bg-[#E8F5EE] px-2 py-0.5 rounded-full">{p.satisfaction}</span>
              )}
            </div>
          ))}
        </div>

        {/* Encourage message */}
        <div className="bg-[#E8F5EE] rounded-[14px] p-4">
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare size={14} className="text-[#1B7A4B]" />
            <span className="text-[13px] text-[#1B7A4B]">참여 독려 메시지 예시</span>
          </div>
          <p className="text-[12px] text-[#374151] bg-white rounded-[10px] p-3" style={{ lineHeight: 1.6 }}>
            "어머니, 오늘 아침 명상 잘 하셨네요! 내일 숲길 걷기도 함께하시면 좋을 것 같아요. 편안한 밤 되세요 😊"
          </p>
          <p className="text-[10px] text-[#9CA3AF] mt-2">메시지를 복사하여 직접 전송해주세요.</p>
        </div>
      </div>
    </div>
  );
}
