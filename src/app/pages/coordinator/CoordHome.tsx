/**
 * C1. 캠프보드 (코디네이터 홈: 전체 상황판)
 */
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Users, AlertTriangle, Activity, BarChart3, Bell, ChevronRight, CheckSquare, Square, Clock, Play, CheckCircle } from 'lucide-react';
import { RoleBadge } from '../../components/ui/RoleBadge';
import { OpsStatusBadge } from '../../components/ui/OpsStatusBadge';

const todaySchedule = [
  { time: '07:30', name: '아침 명상', place: '명상실', capacity: '18/20', status: 'completed' },
  { time: '09:00', name: '숲길 걷기', place: '치유숲', capacity: '22/25', status: 'in_progress' },
  { time: '11:00', name: '치유 요가', place: '다목적실', capacity: '0/15', status: 'scheduled' },
  { time: '14:00', name: '자연식 요리', place: '쿠킹홀', capacity: '0/12', status: 'scheduled' },
  { time: '16:00', name: '숲속 대화', place: '쉼터', capacity: '0/20', status: 'scheduled' },
  { time: '19:00', name: '저녁 명상', place: '명상실', capacity: '0/20', status: 'scheduled' },
];

const priorityList = [
  { name: '김영숙', reason: '수면 3일 연속 하락', badge: 'danger', group: 'A조' },
  { name: '박순자', reason: '스트레스 급등', badge: 'caution', group: 'A조' },
  { name: '이정호', reason: '측정 2일 누락', badge: 'missed', group: 'B조' },
  { name: '오재석', reason: '프로그램 2회 불참', badge: 'caution', group: 'C조' },
];

const initialChecklist = [
  { id: '1', text: '오전 체크리포트 제출', done: true },
  { id: '2', text: '주의 대상자 개별 확인', done: false },
  { id: '3', text: '오늘 세션 준비물 점검', done: false },
  { id: '4', text: '식단 변경사항 확인', done: true },
  { id: '5', text: '저녁 체크리포트 준비', done: false },
];

const topAlerts = [
  { text: '김영숙 수면 점수 55 (관리필요)', type: 'danger' },
  { text: '보호자(이OO) 문의 1건 대기', type: 'pending' },
  { text: '오후 요가 장소 변경 공지 필요', type: 'caution' },
];

export function CoordHome() {
  const navigate = useNavigate();
  const [checklist, setChecklist] = useState(initialChecklist);

  const toggleCheck = (id: string) => {
    setChecklist(prev => prev.map(c => c.id === id ? { ...c, done: !c.done } : c));
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 bg-white border-b border-[#EEF1F4]">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <RoleBadge role="coordinator" />
            <button onClick={() => navigate('/coord/camp-select')} className="text-[11px] text-[#0EA5E9] underline">캠프 전환</button>
          </div>
          <button onClick={() => navigate('/coord/issues')} className="relative w-9 h-9 flex items-center justify-center">
            <Bell size={20} className="text-[#374151]" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#EF4444] rounded-full" />
          </button>
        </div>
        <h1 className="text-[20px] text-[#111827]">캠프보드</h1>
        <span className="text-[12px] text-[#9CA3AF]">봄맞이 치유캠프 · 3일차 · 2026.03.12(수)</span>
      </div>

      <div className="px-4 pt-4 pb-6 flex flex-col gap-4">
        {/* Top alerts */}
        <div className="flex flex-col gap-1.5">
          {topAlerts.map((a, i) => (
            <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-[10px]"
              style={{ backgroundColor: a.type === 'danger' ? '#FEF2F2' : a.type === 'pending' ? '#FFF1E8' : '#FFF1E8' }}>
              <AlertTriangle size={12} style={{ color: a.type === 'danger' ? '#DC2626' : '#EA580C' }} />
              <span className="text-[11px] flex-1" style={{ color: a.type === 'danger' ? '#DC2626' : '#EA580C' }}>{a.text}</span>
            </div>
          ))}
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: '참가자', value: '32명', icon: Users, color: '#0EA5E9', bg: '#E0F2FE' },
            { label: '측정 완료율', value: '91%', icon: Activity, color: '#1B7A4B', bg: '#E8F5EE' },
            { label: '주의/관리필요', value: '4명', icon: AlertTriangle, color: '#DC2626', bg: '#FEF2F2' },
            { label: '프로그램 참여율', value: '85%', icon: BarChart3, color: '#7C3AED', bg: '#F3E8FF' },
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

        {/* Today schedule timeline */}
        <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[14px] text-[#111827]">오늘 일정</span>
            <button onClick={() => navigate('/coord/sessions')} className="text-[11px] text-[#0EA5E9] flex items-center gap-0.5">
              세션 관리 <ChevronRight size={10} />
            </button>
          </div>
          {todaySchedule.map((s, i) => (
            <div key={i} className="flex items-center gap-3 py-2 border-t border-[#F3F4F6] first:border-0">
              <span className="text-[11px] text-[#9CA3AF] w-10 shrink-0">{s.time}</span>
              <div className="flex-1 min-w-0">
                <span className="text-[12px] text-[#111827] block truncate">{s.name}</span>
                <span className="text-[9px] text-[#9CA3AF]">{s.place} · {s.capacity}</span>
              </div>
              <OpsStatusBadge status={s.status} size="sm" />
            </div>
          ))}
        </div>

        {/* Priority targets */}
        <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle size={14} className="text-[#DC2626]" />
              <span className="text-[14px] text-[#111827]">우선 확인 대상</span>
            </div>
            <button onClick={() => navigate('/coord/participants')} className="text-[11px] text-[#0EA5E9]">전체</button>
          </div>
          {priorityList.map(p => (
            <button key={p.name} onClick={() => navigate('/coord/participant-detail')}
              className="w-full flex items-center gap-3 py-2.5 border-t border-[#F3F4F6] first:border-0 text-left">
              <div className="w-8 h-8 rounded-full bg-[#F7F8FA] flex items-center justify-center shrink-0">
                <span className="text-[11px] text-[#374151]">{p.name[0]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[12px] text-[#111827]">{p.name}</span>
                  <span className="text-[9px] text-[#9CA3AF]">{p.group}</span>
                </div>
                <span className="text-[10px] text-[#6B7280] truncate block">{p.reason}</span>
              </div>
              <OpsStatusBadge status={p.badge} size="sm" />
            </button>
          ))}
        </div>

        {/* Operation checklist */}
        <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[14px] text-[#111827]">오늘 운영 체크리스트</span>
            <span className="text-[11px] text-[#9CA3AF]">{checklist.filter(c => c.done).length}/{checklist.length}</span>
          </div>
          {checklist.map(c => (
            <button key={c.id} onClick={() => toggleCheck(c.id)}
              className="w-full flex items-center gap-3 py-2 border-t border-[#F3F4F6] first:border-0 text-left">
              {c.done ? <CheckSquare size={18} className="text-[#0EA5E9] shrink-0" /> : <Square size={18} className="text-[#D1D5DB] shrink-0" />}
              <span className={`text-[12px] ${c.done ? 'text-[#9CA3AF] line-through' : 'text-[#374151]'}`}>{c.text}</span>
            </button>
          ))}
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: '체크인 시작', icon: CheckCircle, path: '/coord/sessions', color: '#1B7A4B' },
            { label: '기록 작성', icon: Play, path: '/coord/check-report', color: '#0EA5E9' },
            { label: '이슈 등록', icon: AlertTriangle, path: '/coord/issues/create', color: '#DC2626' },
          ].map(a => (
            <button key={a.label} onClick={() => navigate(a.path)}
              className="bg-white rounded-[14px] p-3 flex flex-col items-center gap-2 shadow-[0_1px_4px_rgba(0,0,0,0.04)] min-h-[72px]">
              <a.icon size={20} style={{ color: a.color }} />
              <span className="text-[10px] text-[#374151]">{a.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
