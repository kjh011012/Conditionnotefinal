/**
 * G7. 공유 동의 상태 보기 (읽기 전용)
 */
import { useNavigate } from 'react-router';
import { ArrowLeft, Shield, Eye, EyeOff, Info } from 'lucide-react';

const scopes = [
  { key: 'risk', label: '위험 신호만 공유', desc: '관리필요 수준의 알림만 전달돼요', active: true },
  { key: 'summary', label: '요약 + 7일 추이', desc: '핵심 지표와 주간 변화를 확인할 수 있어요', active: true },
  { key: 'detail', label: '상세 (선택 지표)', desc: '수면/스트레스/활동 등 개별 지표를 볼 수 있어요', active: false },
];

const metricAccess = [
  { label: '수면 회복 점수', shared: true },
  { label: '스트레스 지수', shared: true },
  { label: '생체리듬 안정도', shared: true },
  { label: '피로도', shared: false },
  { label: '혈관 단계', shared: false },
  { label: '기분 체크', shared: false },
  { label: '인지 루틴 달성', shared: false },
];

export function GuardianConsent() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <div className="flex items-center gap-3 px-4 h-[56px] bg-white border-b border-[#EEF1F4]">
        <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center">
          <ArrowLeft size={22} className="text-[#374151]" />
        </button>
        <h2 className="text-[18px] text-[#111827]">공유 동의 상태</h2>
      </div>

      <div className="px-4 pt-4 pb-6 flex flex-col gap-4">
        {/* Info banner */}
        <div className="bg-[#FFF1E8] rounded-[14px] p-4 flex items-start gap-2.5">
          <Shield size={18} className="text-[#EA580C] mt-0.5 shrink-0" />
          <div>
            <span className="text-[13px] text-[#111827] block mb-1">참가자가 설정한 공유 범위</span>
            <p className="text-[11px] text-[#6B7280]" style={{ lineHeight: 1.5 }}>
              이 설정은 참가자(김영숙님)의 앱에서만 변경할 수 있어요.
              보호자는 동의 범위 내에서만 정보를 확인할 수 있습니다.
            </p>
          </div>
        </div>

        {/* Scope cards */}
        <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
          <span className="text-[14px] text-[#111827] block mb-3">공유 범위</span>
          {scopes.map(s => (
            <div key={s.key} className={`flex items-start gap-3 py-3 border-t border-[#F3F4F6] first:border-0 ${!s.active ? 'opacity-50' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${s.active ? 'bg-[#E8F5EE]' : 'bg-[#F3F4F6]'}`}>
                {s.active ? <Eye size={14} className="text-[#1B7A4B]" /> : <EyeOff size={14} className="text-[#9CA3AF]" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] text-[#111827]">{s.label}</span>
                  {s.active && <span className="text-[9px] text-[#1B7A4B] bg-[#E8F5EE] px-1.5 py-0.5 rounded-full">허용됨</span>}
                </div>
                <span className="text-[11px] text-[#6B7280]">{s.desc}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Metric access list */}
        <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
          <span className="text-[14px] text-[#111827] block mb-3">지표별 공유 상태</span>
          {metricAccess.map(m => (
            <div key={m.label} className="flex items-center justify-between py-2 border-t border-[#F3F4F6] first:border-0">
              <span className={`text-[13px] ${m.shared ? 'text-[#374151]' : 'text-[#9CA3AF]'}`}>{m.label}</span>
              {m.shared ? (
                <span className="text-[10px] text-[#1B7A4B] bg-[#E8F5EE] px-2 py-0.5 rounded-full">공유 중</span>
              ) : (
                <span className="text-[10px] text-[#9CA3AF] bg-[#F3F4F6] px-2 py-0.5 rounded-full">비공개</span>
              )}
            </div>
          ))}
        </div>

        <div className="bg-[#F7F8FA] rounded-[14px] p-3 flex items-start gap-2">
          <Info size={14} className="text-[#9CA3AF] mt-0.5 shrink-0" />
          <p className="text-[10px] text-[#9CA3AF]" style={{ lineHeight: 1.5 }}>
            비공개 항목에 대해 "참가자가 공유를 제한했습니다"라고 표시됩니다.
            변경을 원하시면 참가자에게 직접 요청해주세요.
          </p>
        </div>
      </div>
    </div>
  );
}
