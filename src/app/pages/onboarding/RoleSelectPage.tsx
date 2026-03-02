/**
 * 역할 선택 페이지 — 참가자 / 보호자 / 코디네이터 / 관리자
 * + 마을 참가 모드 진입 지원
 */
import { useNavigate } from 'react-router';
import { User, Heart, ClipboardList, Shield, TreePine } from 'lucide-react';

const roles = [
  { key: 'participant', path: '/', label: '참가자', desc: '내 건강 상태를 점검하고 맞춤 루틴을 받아요', Icon: User, color: '#1B7A4B', bg: '#E8F5EE' },
  { key: 'village', path: '/village', label: '마을 참가 모드', desc: '현재 참여 중인 치유마을에 입장해요', Icon: TreePine, color: '#059669', bg: '#D1FAE5' },
  { key: 'guardian', path: '/guardian', label: '보호자', desc: '가족의 건강 변화를 안심하며 확인해요', Icon: Heart, color: '#EA580C', bg: '#FFF1E8' },
  { key: 'coordinator', path: '/coord', label: '코디네이터', desc: '현장 운영과 참가자 케이스를 관리해요', Icon: ClipboardList, color: '#0EA5E9', bg: '#E0F2FE' },
  { key: 'admin', path: '/admin', label: '관리자', desc: '치유마을 전체 운영을 총괄해요', Icon: Shield, color: '#7C3AED', bg: '#F3E8FF' },
] as const;

export function RoleSelectPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex flex-col">
      <div className="max-w-[430px] mx-auto w-full flex-1 flex flex-col px-5 pt-14 pb-8">
        {/* Header */}
        <div className="mb-8">
          <div className="w-12 h-12 bg-[#1B7A4B] rounded-[14px] flex items-center justify-center mb-4">
            <span className="text-white text-[20px]">CN</span>
          </div>
          <h1 className="text-[24px] text-[#111827] mb-2">컨디션노트</h1>
          <p className="text-[14px] text-[#6B7280]" style={{ lineHeight: 1.6 }}>
            어떤 역할로 시작하시겠어요?
          </p>
        </div>

        {/* Role cards */}
        <div className="flex flex-col gap-3 flex-1">
          {roles.map(({ key, path, label, desc, Icon, color, bg }) => (
            <button
              key={key}
              onClick={() => navigate(path)}
              className="w-full bg-white rounded-[16px] p-5 shadow-[0_1px_6px_rgba(0,0,0,0.04)] text-left flex items-center gap-4 min-h-[72px] active:scale-[0.98] transition-transform"
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: bg }}>
                <Icon size={22} style={{ color }} />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[16px] text-[#111827] block mb-0.5">{label}</span>
                <span className="text-[12px] text-[#6B7280]">{desc}</span>
              </div>
            </button>
          ))}
        </div>

        <p className="text-[11px] text-[#9CA3AF] text-center mt-6" style={{ lineHeight: 1.5 }}>
          역할은 앱 내 설정에서 언제든 변경할 수 있습니다.<br />
          의료 진단·처방 기능은 포함되어 있지 않습니다.
        </p>
      </div>
    </div>
  );
}
