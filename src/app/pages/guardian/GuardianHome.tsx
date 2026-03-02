/**
 * G1. 보호자 홈 (요약 대시보드)
 * 안심 + 변화 + 액션 + 동의/권한
 */
import { useNavigate } from 'react-router';
import { Moon, Activity, Heart, TrendingUp, TrendingDown, Minus, Bell, FileText, Phone, MessageSquare, Shield, ChevronRight, Clock } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { RoleBadge } from '../../components/ui/RoleBadge';

const spark7 = [
  { d: 1, sleep: 68, stress: 42, rhythm: 72 },
  { d: 2, sleep: 72, stress: 38, rhythm: 75 },
  { d: 3, sleep: 60, stress: 55, rhythm: 65 },
  { d: 4, sleep: 65, stress: 50, rhythm: 68 },
  { d: 5, sleep: 70, stress: 45, rhythm: 70 },
  { d: 6, sleep: 75, stress: 40, rhythm: 76 },
  { d: 7, sleep: 62, stress: 52, rhythm: 64 },
];

const alerts = [
  { id: 1, type: 'danger' as const, title: '수면 점수 3일 연속 하락', time: '2시간 전', read: false },
  { id: 2, type: 'caution' as const, title: '스트레스 지수 일시 상승', time: '어제', read: false },
  { id: 3, type: 'normal' as const, title: '오늘 프로그램 참여 완료', time: '오늘 오후', read: true },
];

export function GuardianHome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      {/* Village context banner */}
      <div className="bg-[#FFF1E8] px-4 py-2 flex items-center gap-2 border-b border-[#EA580C]/10">
        <span className="text-[14px]">🏔️</span>
        <div className="flex-1 min-w-0">
          <span className="text-[11px] text-[#EA580C] truncate block">고라데이 치유마을 · 3월 치유캠프</span>
          <span className="text-[9px] text-[#9CA3AF]">접근 기간: 03.10~03.17 · D-15</span>
        </div>
        <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#EA580C]/10 text-[#EA580C]">기간 내 접근</span>
      </div>
      {/* Header */}
      <div className="px-4 pt-4 pb-3 bg-white border-b border-[#EEF1F4]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <RoleBadge role="guardian" />
            <span className="text-[11px] text-[#9CA3AF]">읽기 전용</span>
          </div>
          <button onClick={() => navigate('/guardian/alerts')} className="relative w-9 h-9 flex items-center justify-center">
            <Bell size={20} className="text-[#374151]" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#EF4444] rounded-full" />
          </button>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#E8F5EE] flex items-center justify-center">
            <span className="text-[15px] text-[#1B7A4B]">김</span>
          </div>
          <div>
            <h1 className="text-[18px] text-[#111827]">김영숙님의 오늘</h1>
            <div className="flex items-center gap-2 text-[11px] text-[#9CA3AF]">
              <span>캠프 3일차</span>
              <span>·</span>
              <span className="flex items-center gap-0.5"><Clock size={10} /> 2:30 PM 동기화</span>
            </div>
          </div>
        </div>
        {/* Share scope badge */}
        <div className="mt-2 flex items-center gap-1.5 bg-[#FFF1E8] rounded-[8px] px-3 py-1.5">
          <Shield size={12} className="text-[#EA580C]" />
          <span className="text-[11px] text-[#EA580C]">공유 범위: 요약 + 7일 추이</span>
        </div>
      </div>

      <div className="px-4 pt-4 pb-6 flex flex-col gap-4">
        {/* Card 1: 오늘 상태 */}
        <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[14px] text-[#111827]">오늘 상태</span>
            <StatusBadge status="caution" />
          </div>
          <p className="text-[13px] text-[#374151] mb-3" style={{ lineHeight: 1.6 }}>
            수면 점수가 다소 낮고, 스트레스가 약간 높아요. 전반적으로 주의가 필요한 날이에요.
          </p>
          <div className="flex gap-2">
            {[
              { Icon: Moon, label: '수면', value: '62', status: 'caution' as const },
              { Icon: Heart, label: '스트레스', value: '52', status: 'caution' as const },
              { Icon: Activity, label: '활동', value: '양호', status: 'normal' as const },
            ].map(item => (
              <div key={item.label} className="flex-1 bg-[#F7F8FA] rounded-[12px] p-3 text-center">
                <item.Icon size={16} className="mx-auto mb-1" style={{ color: item.status === 'caution' ? '#EA580C' : '#1B7A4B' }} />
                <span className="text-[10px] text-[#9CA3AF] block">{item.label}</span>
                <span className="text-[16px] text-[#111827]">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card 2: 최근 7일 변화 */}
        <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[14px] text-[#111827]">최근 7일 변화</span>
            <div className="flex items-center gap-1">
              <TrendingDown size={14} className="text-[#EF4444]" />
              <span className="text-[12px] text-[#EF4444]">수면 하락</span>
            </div>
          </div>
          <div className="h-[80px] mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={spark7}>
                <Line type="monotone" dataKey="sleep" stroke="#0EA5E9" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="stress" stroke="#F59E0B" strokeWidth={1.5} dot={false} strokeDasharray="4 2" />
                <Line type="monotone" dataKey="rhythm" stroke="#1B7A4B" strokeWidth={1.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-1">
            {[{ c: '#0EA5E9', l: '수면' }, { c: '#F59E0B', l: '스트레스' }, { c: '#1B7A4B', l: '리듬' }].map(i => (
              <div key={i.l} className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: i.c }} />
                <span className="text-[10px] text-[#9CA3AF]">{i.l}</span>
              </div>
            ))}
          </div>
          <button onClick={() => navigate('/guardian/trends')} className="w-full mt-3 text-[12px] text-[#1B7A4B] flex items-center justify-center gap-1">
            추이 상세 보기 <ChevronRight size={12} />
          </button>
        </div>

        {/* Card 3: 권장 액션 */}
        <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
          <span className="text-[14px] text-[#111827] block mb-3">권장 액션</span>
          <div className="bg-[#FFF1E8] rounded-[12px] p-3 mb-3">
            <div className="flex items-center gap-2 mb-1">
              <Phone size={14} className="text-[#EA580C]" />
              <span className="text-[13px] text-[#111827]">안부 전화 권장</span>
            </div>
            <p className="text-[11px] text-[#6B7280]" style={{ lineHeight: 1.5 }}>
              수면 점수가 3일째 하락 중이에요. 편안한 안부 전화가 도움이 될 수 있어요.
            </p>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 h-[44px] bg-[#1B7A4B] text-white rounded-[12px] text-[13px] flex items-center justify-center gap-1.5">
              <Phone size={14} /> 안부 전화
            </button>
            <button onClick={() => navigate('/guardian/inquiry')} className="flex-1 h-[44px] border border-[#E5E7EB] rounded-[12px] text-[13px] text-[#374151] flex items-center justify-center gap-1.5">
              <MessageSquare size={14} /> 코디네이터 문의
            </button>
          </div>
        </div>

        {/* Alerts preview */}
        <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[14px] text-[#111827]">알림</span>
            <span className="text-[11px] text-[#9CA3AF]">{alerts.filter(a => !a.read).length}개 미확인</span>
          </div>
          {alerts.slice(0, 3).map(a => (
            <div key={a.id} className={`flex items-start gap-2.5 py-2.5 ${a.id > 1 ? 'border-t border-[#F3F4F6]' : ''}`}>
              <StatusBadge status={a.type} size="sm" />
              <div className="flex-1 min-w-0">
                <span className={`text-[12px] ${a.read ? 'text-[#9CA3AF]' : 'text-[#111827]'} block truncate`}>{a.title}</span>
                <span className="text-[10px] text-[#9CA3AF]">{a.time}</span>
              </div>
              {!a.read && <div className="w-2 h-2 rounded-full bg-[#EF4444] mt-1 shrink-0" />}
            </div>
          ))}
        </div>

        {/* Bottom CTAs */}
        <div className="flex gap-2">
          <button onClick={() => navigate('/guardian/report')} className="flex-1 h-[48px] bg-white border border-[#E5E7EB] rounded-[14px] text-[13px] text-[#374151] flex items-center justify-center gap-1.5">
            <FileText size={14} /> 주간 리포트
          </button>
          <button onClick={() => navigate('/guardian/programs')} className="flex-1 h-[48px] bg-white border border-[#E5E7EB] rounded-[14px] text-[13px] text-[#374151] flex items-center justify-center gap-1.5">
            <Activity size={14} /> 참여 현황
          </button>
        </div>
      </div>
    </div>
  );
}