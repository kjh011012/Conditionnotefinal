/**
 * A7. 숙소 관리 + A8. 숙소 배정 (점유 그리드)
 */
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Plus, Edit3, Trash2, Users, ArrowRight, ChevronLeft, AlertTriangle } from 'lucide-react';

interface Room {
  id: string; building: string; floor: string; number: string;
  capacity: number; occupants: string[]; note?: string;
}

const rooms: Room[] = [
  { id: '1', building: '1동', floor: '2층', number: '201', capacity: 2, occupants: ['김영숙', '최미경'] },
  { id: '2', building: '1동', floor: '2층', number: '202', capacity: 2, occupants: ['박순자'] },
  { id: '3', building: '1동', floor: '2층', number: '203', capacity: 2, occupants: ['한순애', '송미란'] },
  { id: '4', building: '2동', floor: '1층', number: '101', capacity: 3, occupants: ['이정호', '정상철'] },
  { id: '5', building: '2동', floor: '1층', number: '102', capacity: 3, occupants: ['오재석'] },
  { id: '6', building: '2동', floor: '1층', number: '103', capacity: 3, occupants: [] },
  { id: '7', building: '3동', floor: '1층', number: '101', capacity: 2, occupants: [] },
];

type View = 'grid' | 'detail';

export function AdminRooms() {
  const [view, setView] = useState<View>('grid');
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [filter, setFilter] = useState<'all' | 'occupied' | 'vacant'>('all');

  const filtered = rooms.filter(r => {
    if (filter === 'occupied') return r.occupants.length > 0;
    if (filter === 'vacant') return r.occupants.length < r.capacity;
    return true;
  });

  const totalCapacity = rooms.reduce((s, r) => s + r.capacity, 0);
  const totalOccupied = rooms.reduce((s, r) => s + r.occupants.length, 0);
  const emptyRooms = rooms.filter(r => r.occupants.length === 0).length;
  const overRooms = rooms.filter(r => r.occupants.length >= r.capacity).length;

  if (view === 'detail' && selectedRoom) {
    const r = selectedRoom;
    return (
      <div className="min-h-screen bg-[#F7F8FA]">
        <div className="flex items-center gap-3 px-4 h-[56px] bg-white border-b border-[#EEF1F4]">
          <button onClick={() => setView('grid')} className="w-9 h-9 flex items-center justify-center">
            <ChevronLeft size={22} className="text-[#374151]" />
          </button>
          <h2 className="text-[16px] text-[#111827]">{r.building} {r.number}호</h2>
        </div>
        <div className="px-4 pt-4 pb-6 flex flex-col gap-4">
          <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[14px] text-[#111827]">방 정보</span>
              <span className="text-[12px] text-[#6B7280]">{r.occupants.length}/{r.capacity}명</span>
            </div>
            {[
              { label: '건물', value: r.building },
              { label: '층', value: r.floor },
              { label: '호', value: r.number + '호' },
              { label: '수용 인원', value: r.capacity + '명' },
            ].map(row => (
              <div key={row.label} className="flex items-center justify-between py-1.5 border-t border-[#F3F4F6] first:border-0">
                <span className="text-[12px] text-[#6B7280]">{row.label}</span>
                <span className="text-[12px] text-[#111827]">{row.value}</span>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
            <span className="text-[14px] text-[#111827] block mb-3">배정 현황</span>
            {r.occupants.length === 0 ? (
              <span className="text-[12px] text-[#9CA3AF]">빈 방</span>
            ) : (
              r.occupants.map(name => (
                <div key={name} className="flex items-center gap-3 py-2 border-t border-[#F3F4F6] first:border-0">
                  <div className="w-8 h-8 rounded-full bg-[#F3E8FF] flex items-center justify-center">
                    <span className="text-[11px] text-[#7C3AED]">{name[0]}</span>
                  </div>
                  <span className="text-[13px] text-[#374151] flex-1">{name}</span>
                  <button className="text-[10px] text-[#0EA5E9]">이동</button>
                  <button className="text-[10px] text-[#DC2626]">퇴실</button>
                </div>
              ))
            )}
            {r.occupants.length < r.capacity && (
              <button className="w-full mt-2 h-[36px] border border-dashed border-[#7C3AED] rounded-[10px] text-[11px] text-[#7C3AED] flex items-center justify-center gap-1">
                <Plus size={12} /> 참가자 배정
              </button>
            )}
          </div>

          <div className="flex gap-2">
            <button className="flex-1 h-[44px] bg-[#7C3AED] text-white rounded-[12px] text-[13px] flex items-center justify-center gap-1.5">
              <Edit3 size={14} /> 수정
            </button>
            <button className="h-[44px] px-4 border border-[#DC2626] rounded-[12px] text-[13px] text-[#DC2626] flex items-center justify-center gap-1">
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <div className="px-4 pt-4 pb-3 bg-white border-b border-[#EEF1F4]">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[18px] text-[#111827]">숙소 관리</h2>
          <button className="h-9 px-3 bg-[#7C3AED] text-white rounded-[8px] text-[12px] flex items-center gap-1">
            <Plus size={14} /> 방 추가
          </button>
        </div>
        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="bg-[#F3E8FF] rounded-[10px] p-2 text-center">
            <span className="text-[16px] text-[#7C3AED] block">{totalOccupied}/{totalCapacity}</span>
            <span className="text-[9px] text-[#7C3AED]">점유율</span>
          </div>
          <div className="bg-[#E8F5EE] rounded-[10px] p-2 text-center">
            <span className="text-[16px] text-[#1B7A4B] block">{emptyRooms}</span>
            <span className="text-[9px] text-[#1B7A4B]">빈 방</span>
          </div>
          <div className={`rounded-[10px] p-2 text-center ${overRooms > 0 ? 'bg-[#FEF2F2]' : 'bg-[#F3F4F6]'}`}>
            <span className={`text-[16px] block ${overRooms > 0 ? 'text-[#DC2626]' : 'text-[#9CA3AF]'}`}>{overRooms}</span>
            <span className={`text-[9px] ${overRooms > 0 ? 'text-[#DC2626]' : 'text-[#9CA3AF]'}`}>만실</span>
          </div>
        </div>
        <div className="flex gap-1.5">
          {([['all', '전체'], ['occupied', '배정됨'], ['vacant', '빈자리']] as const).map(([k, l]) => (
            <button key={k} onClick={() => setFilter(k)}
              className={`flex-1 py-1.5 rounded-full text-[11px] ${filter === k ? 'bg-[#7C3AED] text-white' : 'bg-[#F7F8FA] text-[#6B7280] border border-[#E5E7EB]'}`}>
              {l}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pt-4 pb-6">
        <div className="grid grid-cols-2 gap-2">
          {filtered.map(r => {
            const rate = r.occupants.length / r.capacity;
            const isFull = rate >= 1;
            const isEmpty = r.occupants.length === 0;
            return (
              <button key={r.id} onClick={() => { setSelectedRoom(r); setView('detail'); }}
                className={`bg-white rounded-[14px] p-3 shadow-[0_1px_4px_rgba(0,0,0,0.04)] text-left ${isEmpty ? 'border border-dashed border-[#D1D5DB]' : ''}`}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[13px] text-[#111827]">{r.building} {r.number}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isFull ? 'bg-[#FEF2F2] text-[#DC2626]' : isEmpty ? 'bg-[#F3F4F6] text-[#9CA3AF]' : 'bg-[#E8F5EE] text-[#1B7A4B]'}`}>
                    {r.occupants.length}/{r.capacity}
                  </span>
                </div>
                <div className="flex gap-1 flex-wrap">
                  {r.occupants.map(n => (
                    <span key={n} className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#F3E8FF] text-[#7C3AED]">{n}</span>
                  ))}
                  {isEmpty && <span className="text-[10px] text-[#9CA3AF]">빈 방</span>}
                </div>
                {/* Occupancy bar */}
                <div className="w-full h-1.5 bg-[#F3F4F6] rounded-full mt-2 overflow-hidden">
                  <div className="h-full rounded-full" style={{
                    width: `${rate * 100}%`,
                    backgroundColor: isFull ? '#EF4444' : rate > 0 ? '#7C3AED' : '#D1D5DB'
                  }} />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
