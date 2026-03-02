/**
 * A1. 운영 대시보드 (관리자 홈)
 */
import { useNavigate } from 'react-router';
import { Users, AlertTriangle, Activity, BarChart3, Bell, ChevronRight, FileText, MessageSquare, Megaphone } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis } from 'recharts';
import { RoleBadge } from '../../components/ui/RoleBadge';
import { OpsStatusBadge } from '../../components/ui/OpsStatusBadge';

const riskDist = [
  { name: '정상', value: 24, color: '#22C55E' },
  { name: '주의', value: 6, color: '#F59E0B' },
  { name: '관리필요', value: 2, color: '#EF4444' },
];

const participation = [
  { d: '명상', rate: 85 }, { d: '걷기', rate: 72 }, { d: '요가', rate: 90 },
  { d: '요리', rate: 65 }, { d: '대화', rate: 78 },
];

export function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <div className="px-4 pt-4 pb-3 bg-white border-b border-[#EEF1F4]">
        <div className="flex items-center justify-between mb-1">
          <RoleBadge role="admin" />
          <button className="relative w-9 h-9 flex items-center justify-center">
            <Bell size={20} className="text-[#374151]" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#EF4444] rounded-full" />
          </button>
        </div>
        <h1 className="text-[20px] text-[#111827]">운영 대시보드</h1>
        <span className="text-[12px] text-[#9CA3AF]">봄맞이 치유캠프 · 3일차 · 2026.03.12(수)</span>
      </div>

      <div className="px-4 pt-4 pb-6 flex flex-col gap-4">
        {/* KPI */}
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: '참가자', value: '32명', icon: Users, color: '#7C3AED', bg: '#F3E8FF' },
            { label: '측정 완료율', value: '91%', icon: Activity, color: '#1B7A4B', bg: '#E8F5EE' },
            { label: '주의/관리필요', value: '8명', icon: AlertTriangle, color: '#DC2626', bg: '#FEF2F2' },
            { label: '프로그램 참여율', value: '82%', icon: BarChart3, color: '#0EA5E9', bg: '#E0F2FE' },
          ].map(k => (
            <div key={k.label} className="bg-white rounded-[14px] p-3.5 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: k.bg }}>
                  <k.icon size={13} style={{ color: k.color }} />
                </div>
                <span className="text-[10px] text-[#9CA3AF]">{k.label}</span>
              </div>
              <span className="text-[22px] text-[#111827]">{k.value}</span>
            </div>
          ))}
        </div>

        {/* Coordinator report status */}
        <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <FileText size={14} className="text-[#7C3AED]" />
              <span className="text-[14px] text-[#111827]">코디네이터 리포트</span>
            </div>
          </div>
          {[
            { name: '이코디', morning: 'completed', evening: 'draft', daily: 'pending' },
            { name: '박코디', morning: 'completed', evening: 'completed', daily: 'submitted' },
            { name: '김코디', morning: 'draft', evening: 'pending', daily: 'pending' },
          ].map(c => (
            <div key={c.name} className="flex items-center gap-2 py-2 border-t border-[#F3F4F6] first:border-0">
              <span className="text-[12px] text-[#374151] w-14">{c.name}</span>
              <OpsStatusBadge status={c.morning} size="sm" />
              <OpsStatusBadge status={c.evening} size="sm" />
              <OpsStatusBadge status={c.daily} size="sm" />
            </div>
          ))}
          {/* Warning */}
          <div className="bg-[#FEF2F2] rounded-[8px] px-3 py-2 mt-2">
            <span className="text-[10px] text-[#DC2626]">⚠ 김코디 오전 체크 미제출</span>
          </div>
        </div>

        {/* Risk distribution */}
        <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
          <span className="text-[14px] text-[#111827] block mb-3">위험도 분포</span>
          <div className="flex items-center gap-4">
            <div className="w-[90px] h-[90px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={riskDist} dataKey="value" cx="50%" cy="50%" innerRadius={22} outerRadius={40} paddingAngle={3}>
                    {riskDist.map(e => <Cell key={e.name} fill={e.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 flex flex-col gap-1.5">
              {riskDist.map(r => (
                <div key={r.name} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: r.color }} />
                  <span className="text-[12px] text-[#374151] flex-1">{r.name}</span>
                  <span className="text-[13px] text-[#111827]">{r.value}명</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Issue/Inquiry status */}
        <div className="grid grid-cols-2 gap-2">
          <button onClick={() => navigate('/admin/more')}
            className="bg-white rounded-[14px] p-3.5 shadow-[0_1px_4px_rgba(0,0,0,0.04)] text-left">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle size={13} className="text-[#DC2626]" />
              <span className="text-[11px] text-[#9CA3AF]">이슈</span>
            </div>
            <span className="text-[18px] text-[#111827] block">3건</span>
            <span className="text-[9px] text-[#DC2626]">2건 미처리</span>
          </button>
          <button onClick={() => navigate('/admin/more')}
            className="bg-white rounded-[14px] p-3.5 shadow-[0_1px_4px_rgba(0,0,0,0.04)] text-left">
            <div className="flex items-center gap-2 mb-1">
              <MessageSquare size={13} className="text-[#F59E0B]" />
              <span className="text-[11px] text-[#9CA3AF]">문의</span>
            </div>
            <span className="text-[18px] text-[#111827] block">5건</span>
            <span className="text-[9px] text-[#EA580C]">1건 대기</span>
          </button>
        </div>

        {/* Program participation */}
        <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[14px] text-[#111827]">프로그램 참여율</span>
            <button onClick={() => navigate('/admin/programs')} className="text-[11px] text-[#7C3AED] flex items-center gap-0.5">상세 <ChevronRight size={10} /></button>
          </div>
          <div className="h-[110px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={participation}>
                <XAxis dataKey="d" tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                <Bar dataKey="rate" fill="#7C3AED" radius={[4, 4, 0, 0]} barSize={26} opacity={0.7} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Today notices */}
        <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
          <div className="flex items-center gap-2 mb-2">
            <Megaphone size={14} className="text-[#7C3AED]" />
            <span className="text-[14px] text-[#111827]">오늘 공지/변경</span>
          </div>
          <div className="py-1.5 text-[12px] text-[#374151]">오후 요가 장소: 다목적실 → 명상실</div>
          <div className="py-1.5 text-[12px] text-[#374151] border-t border-[#F3F4F6]">저녁 메뉴 변경: 된장찌개 → 닭가슴살 샐러드</div>
        </div>
      </div>
    </div>
  );
}
