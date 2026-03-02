/**
 * A3-b. 프로그램 일정 상세 – 특정 날짜의 세션 등록/수정/삭제
 */
import { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import {
  ChevronLeft, Plus, Edit3, Trash2, Copy, Check, X,
  Clock, MapPin, Users, GripVertical, CalendarPlus,
} from 'lucide-react';

/* ── types ── */
interface Session {
  id: string;
  time: string;
  programName: string;
  coordinator: string;
  place: string;
  capacity: number;
  enrolled: number;
  purpose: string;
  memo?: string;
}

/* ── program templates ── */
const programTemplates = [
  { name: '아침 명상', purpose: '스트레스', duration: '30분', place: '명상실', capacity: 20, coordinator: '이코디' },
  { name: '숲길 걷기', purpose: '리듬', duration: '60분', place: '치유숲', capacity: 25, coordinator: '이코디' },
  { name: '치유 요가', purpose: '수면', duration: '50분', place: '다목적실', capacity: 15, coordinator: '박코디' },
  { name: '자연식 요리', purpose: '사회활동', duration: '90분', place: '쿠킹홀', capacity: 12, coordinator: '김코디' },
  { name: '숲속 대화', purpose: '사회활동', duration: '60분', place: '쉼터', capacity: 20, coordinator: '이코디' },
  { name: '두뇌 활동', purpose: '인지', duration: '40분', place: '교육실', capacity: 15, coordinator: '박코디' },
  { name: '원예 치유', purpose: '스트레스', duration: '60분', place: '정원', capacity: 12, coordinator: '김코디' },
  { name: '음악 감상', purpose: '수면', duration: '45분', place: '문화실', capacity: 20, coordinator: '이코디' },
];

const purposeColors: Record<string, string> = {
  '스트레스': '#7C3AED',
  '리듬': '#0EA5E9',
  '수면': '#6366F1',
  '사회활동': '#F59E0B',
  '인지': '#EC4899',
};

const timeSlots = [
  '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30',
  '10:00', '10:30', '11:00', '11:30', '12:00', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00',
  '19:00', '19:30', '20:00', '20:30',
];

/* ── seed data ── */
function seedForDate(dateStr: string): Session[] {
  const d = new Date(dateStr);
  const dow = d.getDay();
  if (dow === 0) return [];

  const bases: Record<number, Session[]> = {
    1: [
      { id: `${dateStr}-1`, time: '07:30', programName: '아침 명상', coordinator: '이코디', place: '명상실', capacity: 20, enrolled: 14, purpose: '스트레스' },
      { id: `${dateStr}-2`, time: '09:00', programName: '숲길 걷기', coordinator: '이코디', place: '치유숲', capacity: 25, enrolled: 18, purpose: '리듬' },
      { id: `${dateStr}-3`, time: '14:00', programName: '자연식 요리', coordinator: '김코디', place: '쿠킹홀', capacity: 12, enrolled: 10, purpose: '사회활동' },
    ],
    2: [
      { id: `${dateStr}-1`, time: '07:30', programName: '아침 명상', coordinator: '이코디', place: '명상실', capacity: 20, enrolled: 16, purpose: '스트레스' },
      { id: `${dateStr}-2`, time: '11:00', programName: '치유 요가', coordinator: '박코디', place: '다목적실', capacity: 15, enrolled: 12, purpose: '수면' },
    ],
    3: [
      { id: `${dateStr}-1`, time: '07:30', programName: '아침 명상', coordinator: '이코디', place: '명상실', capacity: 20, enrolled: 15, purpose: '스트레스' },
      { id: `${dateStr}-2`, time: '09:00', programName: '숲길 걷기', coordinator: '이코디', place: '치유숲', capacity: 25, enrolled: 20, purpose: '리듬' },
      { id: `${dateStr}-3`, time: '14:00', programName: '자연식 요리', coordinator: '김코디', place: '쿠킹홀', capacity: 12, enrolled: 8, purpose: '사회활동' },
    ],
    4: [
      { id: `${dateStr}-1`, time: '07:30', programName: '아침 명상', coordinator: '이코디', place: '명상실', capacity: 20, enrolled: 13, purpose: '스트레스' },
      { id: `${dateStr}-2`, time: '11:00', programName: '치유 요가', coordinator: '박코디', place: '다목적실', capacity: 15, enrolled: 14, purpose: '수면' },
      { id: `${dateStr}-3`, time: '16:00', programName: '숲속 대화', coordinator: '이코디', place: '쉼터', capacity: 20, enrolled: 11, purpose: '사회활동' },
    ],
    5: [
      { id: `${dateStr}-1`, time: '07:30', programName: '아침 명상', coordinator: '이코디', place: '명상실', capacity: 20, enrolled: 12, purpose: '스트레스' },
      { id: `${dateStr}-2`, time: '09:00', programName: '숲길 걷기', coordinator: '이코디', place: '치유숲', capacity: 25, enrolled: 22, purpose: '리듬' },
      { id: `${dateStr}-3`, time: '14:00', programName: '두뇌 활동', coordinator: '박코디', place: '교육실', capacity: 15, enrolled: 9, purpose: '인지' },
    ],
    6: [
      { id: `${dateStr}-1`, time: '09:00', programName: '숲길 걷기', coordinator: '이코디', place: '치유숲', capacity: 25, enrolled: 19, purpose: '리듬' },
      { id: `${dateStr}-2`, time: '14:00', programName: '원예 치유', coordinator: '김코디', place: '정원', capacity: 12, enrolled: 7, purpose: '스트레스' },
    ],
  };
  return bases[dow] || [];
}

/* ── helpers ── */
function formatKorDate(dateStr: string) {
  const d = new Date(dateStr);
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일 (${dayNames[d.getDay()]})`;
}

type FormData = { time: string; programName: string; coordinator: string; place: string; capacity: number; purpose: string; memo: string };
const emptyForm: FormData = { time: '09:00', programName: '', coordinator: '', place: '', capacity: 20, purpose: '스트레스', memo: '' };

export function AdminProgramDetail() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dateStr = searchParams.get('date') || new Date().toISOString().slice(0, 10);

  const [sessions, setSessions] = useState<Session[]>(() => seedForDate(dateStr));
  const [editing, setEditing] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [showTemplates, setShowTemplates] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);

  const sorted = useMemo(() => [...sessions].sort((a, b) => a.time.localeCompare(b.time)), [sessions]);

  /* actions */
  function startAdd() {
    setForm(emptyForm);
    setAdding(true);
    setEditing(null);
    setShowTemplates(false);
  }

  function startEdit(s: Session) {
    setForm({ time: s.time, programName: s.programName, coordinator: s.coordinator, place: s.place, capacity: s.capacity, purpose: s.purpose, memo: s.memo || '' });
    setEditing(s.id);
    setAdding(false);
  }

  function applyTemplate(t: typeof programTemplates[0]) {
    setForm(f => ({ ...f, programName: t.name, coordinator: t.coordinator, place: t.place, capacity: t.capacity, purpose: t.purpose }));
    setShowTemplates(false);
  }

  function saveSession() {
    if (!form.programName.trim() || !form.time) return;
    if (editing) {
      setSessions(prev => prev.map(s => s.id === editing ? { ...s, ...form } : s));
      setEditing(null);
    } else {
      const newId = `${dateStr}-${Date.now()}`;
      setSessions(prev => [...prev, { id: newId, ...form, enrolled: 0 }]);
      setAdding(false);
    }
    setForm(emptyForm);
  }

  function cancelForm() { setEditing(null); setAdding(false); setForm(emptyForm); }

  function deleteSession(id: string) {
    setSessions(prev => prev.filter(s => s.id !== id));
    setDeleteConfirm(null);
  }

  function copyDaySchedule() {
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2000);
  }

  const isFormOpen = adding || editing !== null;

  return (
    <div className="min-h-screen bg-[#F7F8FA] pb-24">
      {/* Header */}
      <div className="sticky top-0 z-20 flex items-center gap-3 px-4 h-[56px] bg-white border-b border-[#EEF1F4]">
        <button onClick={() => navigate('/admin/programs')} className="w-10 h-10 flex items-center justify-center rounded-full active:bg-[#F3F4F6] transition-colors">
          <ChevronLeft size={22} className="text-[#374151]" />
        </button>
        <div className="flex-1 min-w-0">
          <h2 className="text-[16px] text-[#111827] truncate">{formatKorDate(dateStr)}</h2>
          <span className="text-[11px] text-[#9CA3AF]">세션 {sessions.length}건 등록</span>
        </div>
        <button onClick={copyDaySchedule} className="h-8 px-3 border border-[#E5E7EB] rounded-[8px] text-[11px] text-[#374151] flex items-center gap-1 active:bg-[#F3F4F6]">
          <Copy size={12} /> 복사
        </button>
      </div>

      {/* Toast */}
      {copiedToast && (
        <div className="fixed top-[64px] left-1/2 -translate-x-1/2 z-50 bg-[#111827] text-white px-4 py-2 rounded-[12px] text-[12px] shadow-lg">
          일정이 클립보드에 복사되었습니다
        </div>
      )}

      {/* Timeline */}
      <div className="px-4 pt-4 flex flex-col gap-2">
        {sorted.length === 0 && !isFormOpen && (
          <div className="bg-white rounded-[16px] p-8 text-center border border-dashed border-[#E5E7EB]">
            <CalendarPlus size={28} className="text-[#D1D5DB] mx-auto mb-2" />
            <span className="text-[13px] text-[#9CA3AF] block mb-1">등록된 세션이 없습니다</span>
            <button onClick={startAdd} className="text-[12px] text-[#7C3AED] underline">세션 추가하기</button>
          </div>
        )}

        {sorted.map(s => (
          <div key={s.id}>
            {editing === s.id ? (
              <SessionForm
                form={form} setForm={setForm} onSave={saveSession} onCancel={cancelForm}
                showTemplates={showTemplates} setShowTemplates={setShowTemplates}
                templates={programTemplates} onApplyTemplate={applyTemplate}
              />
            ) : (
              <div className="bg-white rounded-[14px] p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
                <div className="flex items-start gap-3">
                  {/* Time block */}
                  <div className="w-14 shrink-0 text-center">
                    <span className="text-[16px] text-[#111827] block">{s.time}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 border-l-[3px] pl-3 rounded-sm"
                    style={{ borderColor: purposeColors[s.purpose] || '#9CA3AF' }}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[14px] text-[#111827]">{s.programName}</span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full text-white"
                        style={{ backgroundColor: purposeColors[s.purpose] || '#9CA3AF' }}>{s.purpose}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] text-[#6B7280] mb-1">
                      <span className="flex items-center gap-0.5"><MapPin size={9} /> {s.place}</span>
                      <span className="flex items-center gap-0.5"><Users size={9} /> {s.enrolled}/{s.capacity}명</span>
                      <span>담당: {s.coordinator}</span>
                    </div>
                    {/* Enrollment bar */}
                    <div className="w-full h-[4px] bg-[#F3F4F6] rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all"
                        style={{
                          width: `${Math.round((s.enrolled / s.capacity) * 100)}%`,
                          backgroundColor: s.enrolled / s.capacity > 0.9 ? '#DC2626' : purposeColors[s.purpose] || '#9CA3AF',
                        }} />
                    </div>
                    {s.memo && (
                      <span className="text-[10px] text-[#9CA3AF] mt-1.5 block">💬 {s.memo}</span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-1 shrink-0">
                    <button onClick={() => startEdit(s)} className="w-8 h-8 rounded-full bg-[#F3F4F6] flex items-center justify-center active:bg-[#E5E7EB]">
                      <Edit3 size={13} className="text-[#6B7280]" />
                    </button>
                    <button onClick={() => setDeleteConfirm(s.id)} className="w-8 h-8 rounded-full bg-[#FEF2F2] flex items-center justify-center active:bg-[#FECACA]">
                      <Trash2 size={13} className="text-[#DC2626]" />
                    </button>
                  </div>
                </div>

                {/* Delete confirm */}
                {deleteConfirm === s.id && (
                  <div className="mt-3 pt-3 border-t border-[#F3F4F6] flex items-center justify-between">
                    <span className="text-[11px] text-[#DC2626]">이 세션을 삭제할까요?</span>
                    <div className="flex gap-2">
                      <button onClick={() => setDeleteConfirm(null)} className="h-7 px-3 bg-[#F3F4F6] rounded-[8px] text-[11px] text-[#374151]">취소</button>
                      <button onClick={() => deleteSession(s.id)} className="h-7 px-3 bg-[#DC2626] rounded-[8px] text-[11px] text-white">삭제</button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Add form */}
        {adding && (
          <SessionForm
            form={form} setForm={setForm} onSave={saveSession} onCancel={cancelForm}
            showTemplates={showTemplates} setShowTemplates={setShowTemplates}
            templates={programTemplates} onApplyTemplate={applyTemplate}
          />
        )}
      </div>

      {/* Bottom actions */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-white border-t border-[#EEF1F4] px-4 py-3 flex gap-2 z-30">
        <button onClick={startAdd} className="flex-1 h-[48px] bg-[#7C3AED] text-white rounded-[12px] text-[14px] flex items-center justify-center gap-2 active:bg-[#6D28D9] transition-colors shadow-[0_2px_8px_rgba(124,58,237,0.25)]">
          <Plus size={18} /> 세션 추가
        </button>
        <button onClick={() => { setShowTemplates(true); startAdd(); }}
          className="h-[48px] px-4 border border-[#E5E7EB] rounded-[12px] text-[13px] text-[#374151] flex items-center justify-center gap-1.5 active:bg-[#F9FAFB]">
          <CalendarPlus size={16} /> 템플릿
        </button>
      </div>
    </div>
  );
}

/* ── Session form ── */
function SessionForm({ form, setForm, onSave, onCancel, showTemplates, setShowTemplates, templates, onApplyTemplate }: {
  form: FormData;
  setForm: React.Dispatch<React.SetStateAction<FormData>>;
  onSave: () => void;
  onCancel: () => void;
  showTemplates: boolean;
  setShowTemplates: (v: boolean) => void;
  templates: typeof programTemplates;
  onApplyTemplate: (t: typeof programTemplates[0]) => void;
}) {
  return (
    <div className="bg-white rounded-[14px] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-[#7C3AED]/20">
      {/* Template picker */}
      {showTemplates && (
        <div className="mb-3 pb-3 border-b border-[#F3F4F6]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[12px] text-[#111827]">프로그램 템플릿 선택</span>
            <button onClick={() => setShowTemplates(false)} className="text-[10px] text-[#9CA3AF]">직접 입력</button>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {templates.map(t => (
              <button key={t.name} onClick={() => onApplyTemplate(t)}
                className="p-2.5 rounded-[10px] bg-[#F7F8FA] text-left active:bg-[#F3E8FF] transition-colors">
                <span className="text-[12px] text-[#111827] block">{t.name}</span>
                <span className="text-[9px] text-[#9CA3AF]">{t.duration} · {t.place}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Time */}
      <div className="flex items-center gap-2 mb-3">
        <Clock size={14} className="text-[#9CA3AF]" />
        <select value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))}
          className="flex-1 h-[38px] px-3 bg-[#F7F8FA] rounded-[10px] text-[13px] text-[#111827] outline-none">
          {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      {/* Program name */}
      <input
        value={form.programName}
        onChange={e => setForm(f => ({ ...f, programName: e.target.value }))}
        placeholder="프로그램명 (예: 아침 명상)"
        className="w-full h-[44px] px-3 bg-[#F7F8FA] rounded-[10px] text-[13px] text-[#111827] placeholder:text-[#D1D5DB] outline-none focus:ring-2 focus:ring-[#7C3AED]/30 mb-3"
      />

      {/* Purpose tags */}
      <div className="mb-3">
        <span className="text-[11px] text-[#6B7280] block mb-1.5">목적 태그</span>
        <div className="flex flex-wrap gap-1.5">
          {Object.entries(purposeColors).map(([p, c]) => (
            <button key={p} onClick={() => setForm(f => ({ ...f, purpose: p }))}
              className={`px-2.5 py-1 rounded-full text-[10px] transition-all ${form.purpose === p ? 'text-white' : 'bg-opacity-15'}`}
              style={form.purpose === p ? { backgroundColor: c } : { backgroundColor: c + '20', color: c }}>
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Place + Coordinator */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div>
          <span className="text-[10px] text-[#6B7280] block mb-1"><MapPin size={9} className="inline" /> 장소</span>
          <input value={form.place} onChange={e => setForm(f => ({ ...f, place: e.target.value }))}
            placeholder="장소" className="w-full h-[38px] px-3 bg-[#F7F8FA] rounded-[10px] text-[12px] text-[#111827] placeholder:text-[#D1D5DB] outline-none" />
        </div>
        <div>
          <span className="text-[10px] text-[#6B7280] block mb-1"><Users size={9} className="inline" /> 담당</span>
          <input value={form.coordinator} onChange={e => setForm(f => ({ ...f, coordinator: e.target.value }))}
            placeholder="코디네이터" className="w-full h-[38px] px-3 bg-[#F7F8FA] rounded-[10px] text-[12px] text-[#111827] placeholder:text-[#D1D5DB] outline-none" />
        </div>
      </div>

      {/* Capacity */}
      <div className="mb-3">
        <span className="text-[10px] text-[#6B7280] block mb-1">정원</span>
        <input type="number" value={form.capacity} onChange={e => setForm(f => ({ ...f, capacity: Number(e.target.value) || 1 }))}
          className="w-24 h-[38px] px-3 bg-[#F7F8FA] rounded-[10px] text-[12px] text-[#111827] outline-none" />
      </div>

      {/* Memo */}
      <textarea
        value={form.memo}
        onChange={e => setForm(f => ({ ...f, memo: e.target.value }))}
        placeholder="운영 메모 (선택)"
        rows={2}
        className="w-full px-3 py-2 bg-[#F7F8FA] rounded-[10px] text-[12px] text-[#374151] placeholder:text-[#D1D5DB] outline-none focus:ring-2 focus:ring-[#7C3AED]/30 resize-none mb-3"
      />

      {/* Actions */}
      <div className="flex gap-2">
        <button onClick={onSave} disabled={!form.programName.trim()}
          className="flex-1 h-[40px] bg-[#7C3AED] text-white rounded-[10px] text-[13px] flex items-center justify-center gap-1.5 disabled:opacity-40 active:bg-[#6D28D9] transition-colors">
          <Check size={14} /> 저장
        </button>
        <button onClick={onCancel}
          className="h-[40px] px-4 border border-[#E5E7EB] rounded-[10px] text-[13px] text-[#6B7280] flex items-center justify-center gap-1 active:bg-[#F9FAFB]">
          <X size={14} /> 취소
        </button>
      </div>
    </div>
  );
}
