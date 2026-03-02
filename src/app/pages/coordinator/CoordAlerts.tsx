/**
 * C7. 알림 센터 (이상 패턴)
 */
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, AlertTriangle, Moon, Heart, Zap, CheckCircle, Clock, ChevronRight } from 'lucide-react';

type AlertStatus = 'pending' | 'in_progress' | 'done';

interface Alert {
  id: string; icon: typeof Moon; title: string; participant: string;
  severity: 'high' | 'medium' | 'low'; time: string; status: AlertStatus;
}

const alertsList: Alert[] = [
  { id: '1', icon: Moon, title: '수면 점수 3일 연속 하락', participant: '김영숙', severity: 'high', time: '오전 8:20', status: 'pending' },
  { id: '2', icon: Heart, title: '스트레스 지수 68 급등', participant: '박순자', severity: 'high', time: '어제 오후', status: 'pending' },
  { id: '3', icon: Zap, title: '피로도 급상승', participant: '오재석', severity: 'medium', time: '어제', status: 'in_progress' },
  { id: '4', icon: AlertTriangle, title: '측정 2일 누락', participant: '이정호', severity: 'medium', time: '2일 전', status: 'pending' },
  { id: '5', icon: Moon, title: '수면 패턴 불규칙', participant: '한순애', severity: 'low', time: '3일 전', status: 'done' },
];

const sevMeta = {
  high: { label: '긴급', bg: '#FEF2F2', text: '#DC2626' },
  medium: { label: '주의', bg: '#FFF1E8', text: '#EA580C' },
  low: { label: '정보', bg: '#E0F2FE', text: '#0EA5E9' },
};

const statusMeta = {
  pending: { label: '미확인', bg: '#FEF2F2', text: '#DC2626' },
  in_progress: { label: '진행 중', bg: '#FFF1E8', text: '#EA580C' },
  done: { label: '완료', bg: '#E8F5EE', text: '#1B7A4B' },
};

export function CoordAlerts() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'all' | 'pending' | 'done'>('all');
  const [items, setItems] = useState(alertsList);

  const filtered = tab === 'all' ? items : items.filter(i => tab === 'pending' ? i.status !== 'done' : i.status === 'done');

  const markDone = (id: string) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, status: 'done' as AlertStatus } : i));
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <div className="flex items-center gap-3 px-4 h-[56px] bg-white border-b border-[#EEF1F4]">
        <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center">
          <ArrowLeft size={22} className="text-[#374151]" />
        </button>
        <h2 className="text-[18px] text-[#111827]">알림 센터</h2>
        <span className="ml-auto text-[11px] text-[#DC2626] bg-[#FEF2F2] px-2 py-0.5 rounded-full">
          {items.filter(i => i.status === 'pending').length}건 미확인
        </span>
      </div>

      <div className="px-4 pt-3 pb-1 bg-white border-b border-[#EEF1F4]">
        <div className="flex gap-2">
          {(['all', 'pending', 'done'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-3 py-1.5 rounded-full text-[12px] transition-all ${tab === t ? 'bg-[#0EA5E9] text-white' : 'text-[#6B7280]'}`}>
              {t === 'all' ? '전체' : t === 'pending' ? '미처리' : '완료'}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pt-3 pb-6 flex flex-col gap-2">
        {filtered.map(a => {
          const sev = sevMeta[a.severity];
          const st = statusMeta[a.status];
          return (
            <div key={a.id} className="bg-white rounded-[14px] p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: sev.bg }}>
                  <a.icon size={16} style={{ color: sev.text }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[13px] text-[#111827]">{a.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-[#6B7280]">{a.participant}</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full" style={{ backgroundColor: sev.bg, color: sev.text }}>{sev.label}</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full" style={{ backgroundColor: st.bg, color: st.text }}>{st.label}</span>
                  </div>
                  <span className="text-[10px] text-[#9CA3AF] block mt-1">{a.time}</span>
                </div>
              </div>
              {a.status !== 'done' && (
                <div className="flex gap-2 mt-3">
                  <button onClick={() => markDone(a.id)}
                    className="flex-1 h-[36px] bg-[#E8F5EE] text-[#1B7A4B] rounded-[10px] text-[12px] flex items-center justify-center gap-1">
                    <CheckCircle size={12} /> 확인 완료
                  </button>
                  <button className="flex-1 h-[36px] bg-[#FEF2F2] text-[#DC2626] rounded-[10px] text-[12px] flex items-center justify-center gap-1">
                    관리자 에스컬레이션
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
