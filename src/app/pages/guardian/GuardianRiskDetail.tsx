/**
 * G3. 위험 신호 상세
 */
import { useNavigate } from 'react-router';
import { ArrowLeft, AlertTriangle, Phone, MessageSquare, Clock, ChevronRight } from 'lucide-react';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { TimelineItem } from '../../components/ui/TimelineItem';

const riskEvents = [
  { time: '오늘 오전 8:20', title: '수면 회복 점수 55 (3일 연속 하락)', desc: '62→58→55로 지속 하락. 취침 시간이 불규칙해지고 있어요.', type: 'danger' as const },
  { time: '어제 오후 3:10', title: '스트레스 지수 일시 68 도달', desc: '평소 42 수준에서 68까지 급등 후 저녁에 50으로 회복.', type: 'caution' as const },
  { time: '3/8 오전 9:00', title: '프로그램 2회 연속 불참', desc: '명상 프로그램과 걷기 프로그램에 불참했어요.', type: 'caution' as const },
];

export function GuardianRiskDetail() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <div className="flex items-center gap-3 px-4 h-[56px] bg-white border-b border-[#EEF1F4]">
        <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center">
          <ArrowLeft size={22} className="text-[#374151]" />
        </button>
        <h2 className="text-[18px] text-[#111827]">위험 신호 상세</h2>
      </div>

      <div className="px-4 pt-4 pb-6 flex flex-col gap-4">
        {/* Current risk summary */}
        <div className="bg-[#FEF2F2] rounded-[16px] p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={18} className="text-[#DC2626]" />
            <span className="text-[15px] text-[#DC2626]">현재 주요 위험 신호</span>
          </div>
          <p className="text-[13px] text-[#374151]" style={{ lineHeight: 1.6 }}>
            수면 회복 점수가 3일 연속 하락하고 있어요. 생활 리듬 점검이 권장됩니다.
          </p>
        </div>

        {/* Risk timeline */}
        <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
          <span className="text-[14px] text-[#111827] block mb-3">위험 트리거 로그</span>
          {riskEvents.map((e, i) => (
            <TimelineItem
              key={i}
              time={e.time}
              title={e.title}
              desc={e.desc}
              color={e.type === 'danger' ? '#DC2626' : '#F59E0B'}
              isLast={i === riskEvents.length - 1}
              tag={e.type === 'danger' ? '관리필요' : '주의'}
              tagColor={e.type === 'danger' ? '#DC2626' : '#F59E0B'}
            />
          ))}
        </div>

        {/* Recommended actions */}
        <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
          <span className="text-[14px] text-[#111827] block mb-3">권장 조치</span>
          {[
            { icon: Phone, title: '안부 전화', desc: '편안한 톤으로 수면 상태를 여쭤보세요', color: '#1B7A4B' },
            { icon: MessageSquare, title: '코디네이터 상담', desc: '현장에서의 관찰 사항을 공유받으세요', color: '#0EA5E9' },
            { icon: Clock, title: '생활 루틴 점검', desc: '취침/기상 시간, 카페인 섭취를 체크해보세요', color: '#7C3AED' },
          ].map(item => (
            <button key={item.title} onClick={() => item.title === '코디네이터 상담' && navigate('/guardian/inquiry')}
              className="w-full flex items-start gap-3 py-3 border-t border-[#F3F4F6] first:border-0 text-left">
              <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: item.color + '15' }}>
                <item.icon size={16} style={{ color: item.color }} />
              </div>
              <div className="flex-1">
                <span className="text-[13px] text-[#111827] block">{item.title}</span>
                <span className="text-[11px] text-[#6B7280]">{item.desc}</span>
              </div>
              <ChevronRight size={14} className="text-[#9CA3AF] mt-1" />
            </button>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-2">
          <button className="w-full h-[48px] bg-[#1B7A4B] text-white rounded-[14px] text-[14px] flex items-center justify-center gap-2">
            <Phone size={16} /> 안부 전화하기
          </button>
          <button onClick={() => navigate('/guardian/inquiry')} className="w-full h-[48px] border border-[#0EA5E9] text-[#0EA5E9] rounded-[14px] text-[14px] flex items-center justify-center gap-2">
            <MessageSquare size={16} /> 코디네이터에게 전달
          </button>
        </div>
      </div>
    </div>
  );
}
