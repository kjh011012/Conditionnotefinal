import { useState } from 'react';
import { Stethoscope, ClipboardCheck, Puzzle, Users, ChevronRight, FileText, MessageSquare } from 'lucide-react';
import { StatusChip } from '../../components/ui/StatusChip';
import { useNavigate } from 'react-router';

const participants = [
  { id: 1, name: '김영숙', status: 'green' as const, tasks: '측정 완료' },
  { id: 2, name: '박철수', status: 'yellow' as const, tasks: '스트레스 대기' },
  { id: 3, name: '이순자', status: 'green' as const, tasks: '모두 완료' },
  { id: 4, name: '정미경', status: 'orange' as const, tasks: '놀이체크 대기' },
  { id: 5, name: '최동호', status: 'yellow' as const, tasks: '출석 미확인' },
];

const todayTasks = [
  { icon: Stethoscope, label: '스트레스 측정', count: '3/5명', color: '#FF8A3D' },
  { icon: ClipboardCheck, label: '프로그램 출석', count: '2/4개', color: '#1B7A4B' },
  { icon: Puzzle, label: '놀이체크 세션', count: '1/5명', color: '#7C3AED' },
];

export function CoordinatorHome() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'stress' | 'attendance' | 'play'>('dashboard');

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <div className="px-4 pt-3 pb-4 bg-white">
        <div className="flex items-center gap-2 mb-2">
          <Users size={16} className="text-[#1B7A4B]" />
          <span className="text-[12px] text-[#1B7A4B]">코디네이터 모드</span>
        </div>
        <h1 className="text-[22px] text-[#111827]">오늘 할 일</h1>
      </div>

      {activeTab === 'dashboard' && (
        <div className="px-4 pt-5">
          {/* Today tasks */}
          <div className="flex flex-col gap-3 mb-6">
            {todayTasks.map(task => (
              <button
                key={task.label}
                onClick={() => {
                  if (task.label.includes('스트레스')) setActiveTab('stress');
                  if (task.label.includes('출석')) setActiveTab('attendance');
                  if (task.label.includes('놀이')) setActiveTab('play');
                }}
                className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)] flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-[12px] bg-[#F7F8FA] flex items-center justify-center">
                  <task.icon size={22} style={{ color: task.color }} />
                </div>
                <div className="flex-1 text-left">
                  <span className="text-[15px] text-[#111827] block">{task.label}</span>
                  <span className="text-[13px] text-[#6B7280]">{task.count} 완료</span>
                </div>
                <ChevronRight size={18} className="text-[#D1D5DB]" />
              </button>
            ))}
          </div>

          {/* Participant list */}
          <h3 className="text-[16px] text-[#111827] mb-3">참가자 현황</h3>
          <div className="bg-white rounded-[16px] overflow-hidden shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
            {participants.map((p, i) => (
              <div
                key={p.id}
                className={`flex items-center gap-3 px-4 py-3 ${
                  i < participants.length - 1 ? 'border-b border-[#EEF1F4]' : ''
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-[#E8F5EE] flex items-center justify-center text-[13px] text-[#1B7A4B]">
                  {p.name[0]}
                </div>
                <span className="text-[14px] text-[#111827] flex-1">{p.name}</span>
                <span className="text-[12px] text-[#6B7280] mr-2">{p.tasks}</span>
                <StatusChip status={p.status} />
              </div>
            ))}
          </div>

          {/* Coordinator tools */}
          <div className="flex flex-col gap-3 mt-5 mb-4">
            <button
              onClick={() => navigate('/coordinator/report-checklist')}
              className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)] flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-[12px] bg-[#FFF1E8] flex items-center justify-center">
                <FileText size={22} className="text-[#FF8A3D]" />
              </div>
              <div className="flex-1 text-left">
                <span className="text-[15px] text-[#111827] block">리포트 발급 체크리스트</span>
                <span className="text-[13px] text-[#6B7280]">참가자별 발급 상태 관리</span>
              </div>
              <ChevronRight size={18} className="text-[#D1D5DB]" />
            </button>

            <button
              onClick={() => navigate('/coordinator/notice-template')}
              className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)] flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-[12px] bg-[#E8F5EE] flex items-center justify-center">
                <MessageSquare size={22} className="text-[#1B7A4B]" />
              </div>
              <div className="flex-1 text-left">
                <span className="text-[15px] text-[#111827] block">안내 문구 템플릿</span>
                <span className="text-[13px] text-[#6B7280]">복사해서 바로 전달</span>
              </div>
              <ChevronRight size={18} className="text-[#D1D5DB]" />
            </button>
          </div>
        </div>
      )}

      {activeTab === 'stress' && (
        <div className="px-4 pt-5">
          <button onClick={() => setActiveTab('dashboard')} className="text-[14px] text-[#1B7A4B] mb-4">
            ← 대시보드로
          </button>
          <h3 className="text-[18px] text-[#111827] mb-4">스트레스 측정 입력</h3>
          {participants.map(p => (
            <div key={p.id} className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)] mb-3">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[15px] text-[#111827]">{p.name}</span>
                <StatusChip status={p.status} />
              </div>
              <button className="w-full h-[40px] border border-[#1B7A4B] text-[#1B7A4B] rounded-[12px] text-[13px]">
                기기 측정값 입력
              </button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'attendance' && (
        <div className="px-4 pt-5">
          <button onClick={() => setActiveTab('dashboard')} className="text-[14px] text-[#1B7A4B] mb-4">
            ← 대시보드로
          </button>
          <h3 className="text-[18px] text-[#111827] mb-4">프로그램 출석 체크</h3>
          {['아침 명상', '숲길 걷기', '미술 활동', '스트레칭'].map(prog => (
            <div key={prog} className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)] mb-3">
              <span className="text-[15px] text-[#111827] block mb-3">{prog}</span>
              <div className="flex flex-wrap gap-2">
                {participants.map(p => (
                  <label key={p.id} className="flex items-center gap-2 bg-[#F7F8FA] rounded-[10px] px-3 py-2">
                    <input type="checkbox" className="w-4 h-4 accent-[#1B7A4B]" />
                    <span className="text-[13px] text-[#374151]">{p.name}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'play' && (
        <div className="px-4 pt-5">
          <button onClick={() => setActiveTab('dashboard')} className="text-[14px] text-[#1B7A4B] mb-4">
            ← 대시보드로
          </button>
          <h3 className="text-[18px] text-[#111827] mb-4">놀이체크 세션</h3>
          <div className="flex flex-col gap-3 mb-4">
            {participants.map(p => (
              <div key={p.id} className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)] flex items-center justify-between">
                <div>
                  <span className="text-[14px] text-[#111827] block">{p.name}</span>
                  <span className="text-[12px] text-[#6B7280]">대기 중</span>
                </div>
                <button className="h-[36px] bg-[#1B7A4B] text-white rounded-[10px] px-4 text-[13px]">
                  세션 시작
                </button>
              </div>
            ))}
          </div>

          <button className="w-full h-[52px] bg-[#1B7A4B] text-white rounded-[14px] text-[16px]">
            새 세션 시작 (QR 스캔)
          </button>
        </div>
      )}
    </div>
  );
}