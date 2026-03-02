/**
 * A6. 식단 상세 – 특정 날짜의 메뉴 등록/수정/삭제
 */
import { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import {
  ChevronLeft, Plus, Edit3, Trash2, Copy, AlertTriangle,
  Megaphone, Check, X, UtensilsCrossed,
} from 'lucide-react';

/* ── types ── */
interface MenuItem {
  id: string;
  meal: '아침' | '점심' | '저녁' | '간식';
  name: string;
  allergens: string[];
  nutrition: string[];
  memo?: string;
}

const mealColors: Record<string, string> = {
  '아침': '#F59E0B',
  '점심': '#0EA5E9',
  '저녁': '#7C3AED',
  '간식': '#EC4899',
};
const mealOrder = ['아침', '점심', '저녁', '간식'];

/* ── seed data factory ── */
function seedForDate(dateStr: string): MenuItem[] {
  const d = new Date(dateStr);
  const dow = d.getDay(); // 0=Sun
  if (dow === 0) return []; // 일요일 비움
  const bases: Record<number, MenuItem[]> = {
    1: [
      { id: `${dateStr}-1`, meal: '아침', name: '현미밥 · 된장국 · 나물 3종', allergens: ['대두'], nutrition: ['단백질', '섬유질'], memo: '알레르기 해당자 → 두부 대체' },
      { id: `${dateStr}-2`, meal: '점심', name: '닭가슴살 샐러드 · 잡곡밥', allergens: [], nutrition: ['단백질', '저염'] },
      { id: `${dateStr}-3`, meal: '저녁', name: '생선구이 · 미역국 · 계절 과일', allergens: ['생선'], nutrition: ['오메가3', '단백질'] },
    ],
    2: [
      { id: `${dateStr}-1`, meal: '아침', name: '오트밀 · 과일 요거트', allergens: ['유제품'], nutrition: ['식이섬유'] },
      { id: `${dateStr}-2`, meal: '점심', name: '비빔밥 · 두부탕', allergens: ['대두', '계란'], nutrition: ['단백질', '채소'] },
      { id: `${dateStr}-3`, meal: '저녁', name: '두부스테이크 · 잡곡밥 · 무국', allergens: ['대두'], nutrition: ['단백질'] },
    ],
    3: [
      { id: `${dateStr}-1`, meal: '아침', name: '잡곡밥 · 시래기국 · 계란말이', allergens: ['계란'], nutrition: ['단백질'] },
      { id: `${dateStr}-2`, meal: '점심', name: '닭가슴살 카레 · 현미밥', allergens: [], nutrition: ['단백질', '저당'] },
      { id: `${dateStr}-3`, meal: '저녁', name: '연어구이 · 채소볶음 · 과일', allergens: ['생선'], nutrition: ['오메가3'] },
    ],
    4: [
      { id: `${dateStr}-1`, meal: '아침', name: '토스트 · 스크램블 에그 · 샐러드', allergens: ['계란', '밀'], nutrition: ['단백질'] },
      { id: `${dateStr}-2`, meal: '점심', name: '불고기덮밥 · 콩나물국', allergens: ['대두'], nutrition: ['단백질', '철분'] },
      { id: `${dateStr}-3`, meal: '저녁', name: '닭볶음탕 · 현미밥 · 김치', allergens: [], nutrition: ['단백질'] },
    ],
    5: [
      { id: `${dateStr}-1`, meal: '아침', name: '죽 · 반찬 2종', allergens: [], nutrition: ['소화촉진'] },
      { id: `${dateStr}-2`, meal: '점심', name: '잔치국수 · 유부초밥', allergens: ['밀', '대두'], nutrition: ['탄수화물'] },
      { id: `${dateStr}-3`, meal: '저녁', name: '삼겹살구이 · 쌈채소 · 된장찌개', allergens: ['대두'], nutrition: ['단백질'] },
    ],
    6: [
      { id: `${dateStr}-1`, meal: '아침', name: '샌드위치 · 우유 · 과일', allergens: ['밀', '유제품'], nutrition: ['단백질', '칼슘'] },
      { id: `${dateStr}-2`, meal: '점심', name: '해물파전 · 잡곡밥', allergens: ['갑각류'], nutrition: ['단백질'] },
    ],
  };
  return bases[dow] || [];
}

/* ── form default ── */
const emptyForm: Omit<MenuItem, 'id'> = { meal: '아침', name: '', allergens: [], nutrition: [], memo: '' };
const allergenOptions = ['대두', '계란', '밀', '유제품', '생선', '갑각류', '견과류', '땅콩'];
const nutritionOptions = ['단백질', '섬유질', '저염', '저당', '오메가3', '철분', '칼슘', '식이섬유', '소화촉진', '채소', '탄수화물'];

/* ── helpers ── */
function formatKorDate(dateStr: string) {
  const d = new Date(dateStr);
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일 (${dayNames[d.getDay()]})`;
}

export function AdminMenuDetail() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dateStr = searchParams.get('date') || new Date().toISOString().slice(0, 10);

  const [items, setItems] = useState<MenuItem[]>(() => seedForDate(dateStr));
  const [editing, setEditing] = useState<string | null>(null); // item id
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState<Omit<MenuItem, 'id'>>(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [copiedToast, setCopiedToast] = useState(false);

  const grouped = useMemo(() => {
    const map: Record<string, MenuItem[]> = {};
    mealOrder.forEach(m => { map[m] = []; });
    items.forEach(i => {
      if (!map[i.meal]) map[i.meal] = [];
      map[i.meal].push(i);
    });
    return map;
  }, [items]);

  /* ── actions ── */
  function startAdd(meal?: string) {
    setForm({ ...emptyForm, meal: (meal as any) || '아침' });
    setAdding(true);
    setEditing(null);
  }

  function startEdit(item: MenuItem) {
    setForm({ meal: item.meal, name: item.name, allergens: [...item.allergens], nutrition: [...item.nutrition], memo: item.memo || '' });
    setEditing(item.id);
    setAdding(false);
  }

  function saveItem() {
    if (!form.name.trim()) return;
    if (editing) {
      setItems(prev => prev.map(i => i.id === editing ? { ...i, ...form } : i));
      setEditing(null);
    } else {
      const newId = `${dateStr}-${Date.now()}`;
      setItems(prev => [...prev, { id: newId, ...form }]);
      setAdding(false);
    }
    setForm(emptyForm);
  }

  function cancelForm() {
    setEditing(null);
    setAdding(false);
    setForm(emptyForm);
  }

  function deleteItem(id: string) {
    setItems(prev => prev.filter(i => i.id !== id));
    setDeleteConfirm(null);
  }

  function copyMenu() {
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2000);
  }

  const isFormOpen = adding || editing !== null;

  return (
    <div className="min-h-screen bg-[#F7F8FA] pb-24">
      {/* Header */}
      <div className="sticky top-0 z-20 flex items-center gap-3 px-4 h-[56px] bg-white border-b border-[#EEF1F4]">
        <button onClick={() => navigate('/admin/menu')} className="w-10 h-10 flex items-center justify-center rounded-full active:bg-[#F3F4F6] transition-colors">
          <ChevronLeft size={22} className="text-[#374151]" />
        </button>
        <div className="flex-1 min-w-0">
          <h2 className="text-[16px] text-[#111827] truncate">{formatKorDate(dateStr)}</h2>
          <span className="text-[11px] text-[#9CA3AF]">식단 {items.length}건 등록</span>
        </div>
        <button onClick={copyMenu} className="h-8 px-3 border border-[#E5E7EB] rounded-[8px] text-[11px] text-[#374151] flex items-center gap-1 active:bg-[#F3F4F6]">
          <Copy size={12} /> 복사
        </button>
      </div>

      {/* Toast */}
      {copiedToast && (
        <div className="fixed top-[64px] left-1/2 -translate-x-1/2 z-50 bg-[#111827] text-white px-4 py-2 rounded-[12px] text-[12px] shadow-lg animate-[fadeIn_0.2s_ease]">
          메뉴가 클립보드에 복사되었습니다
        </div>
      )}

      {/* Meal sections */}
      <div className="px-4 pt-4 flex flex-col gap-5">
        {mealOrder.map(meal => {
          const mealItems = grouped[meal];
          return (
            <section key={meal}>
              {/* section header */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: mealColors[meal] }} />
                  <span className="text-[14px] text-[#111827]">{meal}</span>
                  <span className="text-[11px] text-[#9CA3AF] ml-1">{mealItems.length}건</span>
                </div>
                <button onClick={() => startAdd(meal)}
                  className="h-7 px-2.5 rounded-[8px] text-[11px] text-[#7C3AED] border border-[#7C3AED]/30 flex items-center gap-1 active:bg-[#7C3AED]/5 transition-colors">
                  <Plus size={12} /> 추가
                </button>
              </div>

              {/* items */}
              {mealItems.length === 0 && !isFormOpen && (
                <div className="bg-white rounded-[14px] p-6 text-center border border-dashed border-[#E5E7EB]">
                  <UtensilsCrossed size={24} className="text-[#D1D5DB] mx-auto mb-2" />
                  <span className="text-[12px] text-[#9CA3AF] block">등록된 메뉴 없음</span>
                  <button onClick={() => startAdd(meal)} className="mt-2 text-[12px] text-[#7C3AED] underline">메뉴 등록하기</button>
                </div>
              )}

              {mealItems.map(item => (
                <div key={item.id} className="mb-2">
                  {editing === item.id ? (
                    /* inline edit form */
                    <MenuForm form={form} setForm={setForm} onSave={saveItem} onCancel={cancelForm} />
                  ) : (
                    <div className="bg-white rounded-[14px] p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0"
                          style={{ backgroundColor: mealColors[item.meal] + '18' }}>
                          <span className="text-[11px]" style={{ color: mealColors[item.meal] }}>{item.meal}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[13px] text-[#111827] block mb-1">{item.name}</span>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {item.allergens.map(a => (
                              <span key={a} className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#FEF2F2] text-[#DC2626]">⚠ {a}</span>
                            ))}
                            {item.nutrition.map(n => (
                              <span key={n} className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#E8F5EE] text-[#1B7A4B]">{n}</span>
                            ))}
                          </div>
                          {item.memo && (
                            <span className="text-[10px] text-[#9CA3AF] mt-1.5 block">💬 {item.memo}</span>
                          )}
                        </div>
                        <div className="flex gap-1 shrink-0">
                          <button onClick={() => startEdit(item)} className="w-8 h-8 rounded-full bg-[#F3F4F6] flex items-center justify-center active:bg-[#E5E7EB]">
                            <Edit3 size={13} className="text-[#6B7280]" />
                          </button>
                          <button onClick={() => setDeleteConfirm(item.id)} className="w-8 h-8 rounded-full bg-[#FEF2F2] flex items-center justify-center active:bg-[#FECACA]">
                            <Trash2 size={13} className="text-[#DC2626]" />
                          </button>
                        </div>
                      </div>

                      {/* Delete confirm */}
                      {deleteConfirm === item.id && (
                        <div className="mt-3 pt-3 border-t border-[#F3F4F6] flex items-center justify-between">
                          <span className="text-[11px] text-[#DC2626]">이 메뉴를 삭제할까요?</span>
                          <div className="flex gap-2">
                            <button onClick={() => setDeleteConfirm(null)} className="h-7 px-3 bg-[#F3F4F6] rounded-[8px] text-[11px] text-[#374151]">취소</button>
                            <button onClick={() => deleteItem(item.id)} className="h-7 px-3 bg-[#DC2626] rounded-[8px] text-[11px] text-white">삭제</button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {/* Inline add form for this meal */}
              {adding && form.meal === meal && (
                <MenuForm form={form} setForm={setForm} onSave={saveItem} onCancel={cancelForm} />
              )}
            </section>
          );
        })}
      </div>

      {/* Bottom actions */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-white border-t border-[#EEF1F4] px-4 py-3 flex gap-2 z-30">
        <button onClick={() => startAdd()} className="flex-1 h-[48px] bg-[#7C3AED] text-white rounded-[12px] text-[14px] flex items-center justify-center gap-2 active:bg-[#6D28D9] transition-colors">
          <Plus size={18} /> 메뉴 등록
        </button>
        <button className="h-[48px] px-4 border border-[#E5E7EB] rounded-[12px] text-[13px] text-[#374151] flex items-center justify-center gap-1.5 active:bg-[#F9FAFB]">
          <Megaphone size={16} /> 공지
        </button>
      </div>
    </div>
  );
}

/* ── Inline form component ── */
function MenuForm({ form, setForm, onSave, onCancel }: {
  form: Omit<MenuItem, 'id'>;
  setForm: React.Dispatch<React.SetStateAction<Omit<MenuItem, 'id'>>>;
  onSave: () => void;
  onCancel: () => void;
}) {
  function toggleTag(list: string[], tag: string, field: 'allergens' | 'nutrition') {
    const next = list.includes(tag) ? list.filter(t => t !== tag) : [...list, tag];
    setForm(f => ({ ...f, [field]: next }));
  }

  return (
    <div className="bg-white rounded-[14px] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-[#7C3AED]/20 mb-2">
      {/* Meal selector */}
      <div className="flex gap-1.5 mb-3">
        {mealOrder.map(m => (
          <button key={m} onClick={() => setForm(f => ({ ...f, meal: m as any }))}
            className={`flex-1 py-1.5 rounded-[8px] text-[11px] transition-all ${form.meal === m ? 'text-white' : 'bg-[#F7F8FA] text-[#6B7280]'}`}
            style={form.meal === m ? { backgroundColor: mealColors[m] } : {}}>
            {m}
          </button>
        ))}
      </div>

      {/* Name */}
      <input
        value={form.name}
        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
        placeholder="메뉴명 (예: 현미밥 · 된장국 · 나물 3종)"
        className="w-full h-[44px] px-3 bg-[#F7F8FA] rounded-[10px] text-[13px] text-[#111827] placeholder:text-[#D1D5DB] outline-none focus:ring-2 focus:ring-[#7C3AED]/30 mb-3"
      />

      {/* Allergens */}
      <div className="mb-3">
        <div className="flex items-center gap-1 mb-1.5">
          <AlertTriangle size={11} className="text-[#DC2626]" />
          <span className="text-[11px] text-[#6B7280]">알레르기 정보</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {allergenOptions.map(a => (
            <button key={a} onClick={() => toggleTag(form.allergens, a, 'allergens')}
              className={`px-2.5 py-1 rounded-full text-[10px] transition-all ${form.allergens.includes(a) ? 'bg-[#DC2626] text-white' : 'bg-[#FEF2F2] text-[#DC2626]'}`}>
              {a}
            </button>
          ))}
        </div>
      </div>

      {/* Nutrition */}
      <div className="mb-3">
        <span className="text-[11px] text-[#6B7280] block mb-1.5">영양 태그</span>
        <div className="flex flex-wrap gap-1.5">
          {nutritionOptions.map(n => (
            <button key={n} onClick={() => toggleTag(form.nutrition, n, 'nutrition')}
              className={`px-2.5 py-1 rounded-full text-[10px] transition-all ${form.nutrition.includes(n) ? 'bg-[#1B7A4B] text-white' : 'bg-[#E8F5EE] text-[#1B7A4B]'}`}>
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Memo */}
      <textarea
        value={form.memo || ''}
        onChange={e => setForm(f => ({ ...f, memo: e.target.value }))}
        placeholder="운영 메모 (선택)"
        rows={2}
        className="w-full px-3 py-2 bg-[#F7F8FA] rounded-[10px] text-[12px] text-[#374151] placeholder:text-[#D1D5DB] outline-none focus:ring-2 focus:ring-[#7C3AED]/30 resize-none mb-3"
      />

      {/* Actions */}
      <div className="flex gap-2">
        <button onClick={onSave} disabled={!form.name.trim()}
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
