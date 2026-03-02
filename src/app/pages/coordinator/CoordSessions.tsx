/**
 * C2. 세션진행 (프로그램 운영 타임라인) + C3. 세션 상세/체크인
 */
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Play, Pause, Square, CheckCircle, XCircle, MapPin, Users, Clock, Package, Plus } from 'lucide-react';
import { OpsStatusBadge } from '../../components/ui/OpsStatusBadge';

interface Session {
  id: string; time: string; name: string; place: string; capacity: number; enrolled: number;
  coordinator: string; prep: string; status: 'scheduled' | 'in_progress' | 'completed' | 'delayed';
}

const sessions: Session[] = [
  { id: '1', time: '07:30', name: '아침 명상', place: '명상실', capacity: 20, enrolled: 18, coordinator: '이코디', prep: '매트, 향초', status: 'completed' },
  { id: '2', time: '09:00', name: '숲길 걷기', place: '치유숲', capacity: 25, enrolled: 22, coordinator: '이코디', prep: '편한 신발, 물', status: 'in_progress' },
  { id: '3', time: '11:00', name: '치유 요가', place: '다목적실', capacity: 15, enrolled: 14, coordinator: '박코디', prep: '요가매트', status: 'scheduled' },
  { id: '4', time: '14:00', name: '자연식 요리', place: '쿠킹홀', capacity: 12, enrolled: 10, coordinator: '김코디', prep: '앞치마, 재료', status: 'scheduled' },
  { id: '5', time: '16:00', name: '숲속 대화', place: '쉼터', capacity: 20, enrolled: 16, coordinator: '이코디', prep: '의자 배치', status: 'scheduled' },
];

interface Attendee { id: string; name: string; checked: boolean | null; }

const mockAttendees: Attendee[] = [
  { id: '1', name: '김영숙', checked: null }, { id: '2', name: '박순자', checked: null },
  { id: '3', name: '이정호', checked: null }, { id: '4', name: '최미경', checked: null },
  { id: '5', name: '정상철', checked: null }, { id: '6', name: '한순애', checked: null },
];

export function CoordSessions() {
  const navigate = useNavigate();
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [sessionList, setSessionList] = useState(sessions);
  const [attendees, setAttendees] = useState(mockAttendees);
  const [memo, setMemo] = useState('');
  const [memoTag, setMemoTag] = useState('');

  const toggleStatus = (id: string, newStatus: Session['status']) => {
    setSessionList(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
  };

  const toggleAttendee = (id: string, val: boolean) => {
    setAttendees(prev => prev.map(a => a.id === id ? { ...a, checked: val } : a));
  };

  if (selectedSession) {
    const checked = attendees.filter(a => a.checked === true).length;
    const absent = attendees.filter(a => a.checked === false).length;
    return (
      <div className="min-h-screen bg-[#F7F8FA]">
        <div className="flex items-center gap-3 px-4 h-[56px] bg-white border-b border-[#EEF1F4]">
          <button onClick={() => setSelectedSession(null)} className="w-9 h-9 flex items-center justify-center">
            <ArrowLeft size={22} className="text-[#374151]" />
          </button>
          <h2 className="text-[16px] text-[#111827]">{selectedSession.name}</h2>
          <OpsStatusBadge status={selectedSession.status} size="sm" />
        </div>

        <div className="px-4 pt-4 pb-6 flex flex-col gap-4">
          {/* Session info */}
          <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
            <div className="grid grid-cols-2 gap-2 text-[11px] text-[#6B7280]">
              <span className="flex items-center gap-1"><Clock size={11} /> {selectedSession.time}</span>
              <span className="flex items-center gap-1"><MapPin size={11} /> {selectedSession.place}</span>
              <span className="flex items-center gap-1"><Users size={11} /> {selectedSession.enrolled}/{selectedSession.capacity}명</span>
              <span className="flex items-center gap-1"><Package size={11} /> {selectedSession.prep}</span>
            </div>
            <div className="flex gap-2 mt-3">
              <button onClick={() => toggleStatus(selectedSession.id, 'in_progress')}
                className="flex-1 h-[40px] bg-[#1B7A4B] text-white rounded-[10px] text-[12px] flex items-center justify-center gap-1">
                <Play size={14} /> 시작
              </button>
              <button onClick={() => toggleStatus(selectedSession.id, 'scheduled')}
                className="flex-1 h-[40px] bg-[#FFF1E8] text-[#EA580C] rounded-[10px] text-[12px] flex items-center justify-center gap-1">
                <Pause size={14} /> 일시중지
              </button>
              <button onClick={() => toggleStatus(selectedSession.id, 'completed')}
                className="flex-1 h-[40px] bg-[#E0F2FE] text-[#0EA5E9] rounded-[10px] text-[12px] flex items-center justify-center gap-1">
                <Square size={14} /> 종료
              </button>
            </div>
          </div>

          {/* Check-in */}
          <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[14px] text-[#111827]">체크인</span>
              <div className="flex gap-2 text-[10px]">
                <span className="text-[#1B7A4B]">출석 {checked}</span>
                <span className="text-[#DC2626]">불참 {absent}</span>
              </div>
            </div>
            {attendees.map(a => (
              <div key={a.id} className="flex items-center gap-3 py-2.5 border-t border-[#F3F4F6] first:border-0">
                <span className="text-[12px] text-[#111827] flex-1">{a.name}</span>
                <div className="flex gap-2">
                  <button onClick={() => toggleAttendee(a.id, true)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center ${a.checked === true ? 'bg-[#1B7A4B]' : 'bg-[#F7F8FA] border border-[#E5E7EB]'}`}>
                    <CheckCircle size={14} className={a.checked === true ? 'text-white' : 'text-[#9CA3AF]'} />
                  </button>
                  <button onClick={() => toggleAttendee(a.id, false)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center ${a.checked === false ? 'bg-[#EF4444]' : 'bg-[#F7F8FA] border border-[#E5E7EB]'}`}>
                    <XCircle size={14} className={a.checked === false ? 'text-white' : 'text-[#9CA3AF]'} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Session memo */}
          <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
            <span className="text-[13px] text-[#111827] block mb-2">세션 특이사항</span>
            <div className="flex gap-1.5 mb-2 flex-wrap">
              {['분위기 좋음', '참여 저조', '컨디션 체크 필요', '장비 문제', '일정 변경'].map(tag => (
                <button key={tag} onClick={() => setMemoTag(tag)}
                  className={`px-2.5 py-1 rounded-full text-[10px] ${memoTag === tag ? 'bg-[#0EA5E9] text-white' : 'bg-[#F3F4F6] text-[#6B7280]'}`}>
                  {tag}
                </button>
              ))}
            </div>
            <textarea value={memo} onChange={e => setMemo(e.target.value)}
              placeholder="특이사항 메모..." className="w-full h-[60px] bg-[#F7F8FA] rounded-[10px] p-3 text-[12px] resize-none outline-none" />
          </div>

          <button className="w-full h-[48px] bg-[#0EA5E9] text-white rounded-[14px] text-[14px] flex items-center justify-center gap-2">
            세션 종료 · 요약 저장
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <div className="px-4 pt-4 pb-3 bg-white border-b border-[#EEF1F4]">
        <h2 className="text-[18px] text-[#111827]">세션 진행</h2>
        <span className="text-[12px] text-[#9CA3AF]">오늘 {sessionList.length}개 세션</span>
      </div>

      <div className="px-4 pt-4 pb-6 flex flex-col gap-3">
        {sessionList.map(s => (
          <button key={s.id} onClick={() => setSelectedSession(s)}
            className="w-full bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)] text-left active:scale-[0.98] transition-transform">
            <div className="flex items-start justify-between mb-2">
              <div>
                <span className="text-[14px] text-[#111827] block">{s.name}</span>
                <span className="text-[11px] text-[#9CA3AF]">{s.time} · {s.place}</span>
              </div>
              <OpsStatusBadge status={s.status} />
            </div>
            <div className="flex items-center gap-3 text-[10px] text-[#6B7280]">
              <span><Users size={10} className="inline" /> {s.enrolled}/{s.capacity}</span>
              <span>담당: {s.coordinator}</span>
              <span><Package size={10} className="inline" /> {s.prep}</span>
            </div>
            {s.status === 'scheduled' && (
              <div className="mt-2">
                <button className="px-3 py-1.5 bg-[#1B7A4B] text-white rounded-[8px] text-[11px]">
                  체크인 시작
                </button>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
