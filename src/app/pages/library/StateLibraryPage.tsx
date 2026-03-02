/**
 * 10_State_Library
 * Empty / Error / Offline / PermissionDenied / Skeleton 상태 화면 모음
 * 모든 상태는 고령친화 톤 + 해결 방법 CTA 포함
 */
import { ArrowLeft, WifiOff, AlertCircle, Watch, ShieldOff, RefreshCw, Settings, Wifi, Database, Moon, Activity, Heart } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useState } from 'react';

type StateSection = 'empty' | 'error' | 'offline' | 'permission' | 'skeleton' | 'sync';

const sections: { key: StateSection; label: string }[] = [
  { key: 'empty', label: 'Empty' },
  { key: 'error', label: 'Error' },
  { key: 'offline', label: 'Offline' },
  { key: 'permission', label: 'Permission' },
  { key: 'skeleton', label: 'Skeleton' },
  { key: 'sync', label: 'Sync 실패' },
];

export function StateLibraryPage() {
  const navigate = useNavigate();
  const [active, setActive] = useState<StateSection>('empty');

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <div className="flex items-center gap-3 px-4 h-[56px] bg-white border-b border-[#EEF1F4]">
        <button onClick={() => navigate('/more')} className="w-9 h-9 flex items-center justify-center">
          <ArrowLeft size={22} className="text-[#374151]" />
        </button>
        <h2 className="text-[18px] text-[#111827]">10 · 상태 라이브러리</h2>
      </div>

      <div className="px-4 pt-3 pb-2 bg-white overflow-x-auto">
        <div className="flex gap-2 pb-1 scrollbar-hide">
          {sections.map(s => (
            <button
              key={s.key}
              onClick={() => setActive(s.key)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-[12px] transition-all ${
                active === s.key ? 'bg-[#1B7A4B] text-white' : 'bg-[#F7F8FA] text-[#6B7280] border border-[#E5E7EB]'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pt-5 pb-8">
        {/* ── Empty States ── */}
        {active === 'empty' && (
          <div className="flex flex-col gap-5">
            <SectionLabel text="워치 미연결" />
            <StateScreen
              icon={<Watch size={36} className="text-[#D1D5DB]" />}
              title="워치 연결이 필요해요"
              description="수면과 활동 데이터를 기반으로 리듬 점수를 계산해요."
              subdesc="워치 없이도 마음 체크, 두뇌 놀이는 가능해요."
              primaryCta="워치 연결하기"
              secondaryCta="워치 없이 체크하기"
            />

            <SectionLabel text="데이터 없음 (수면)" />
            <StateScreen
              icon={<Moon size={36} className="text-[#D1D5DB]" />}
              title="아직 수면 기록이 없어요"
              description="오늘 밤 수면을 측정하면 내일 확인할 수 있어요."
              primaryCta="수면 측정 시작"
            />

            <SectionLabel text="오늘 계획 없음" />
            <StateScreen
              icon={<Database size={36} className="text-[#D1D5DB]" />}
              title="아직 계획이 없어요"
              description="추천에서 오늘 계획에 넣어보세요."
              primaryCta="추천 보러 가기"
            />

            <SectionLabel text="캠프 미참여" />
            <StateScreen
              icon={<Watch size={36} className="text-[#D1D5DB]" />}
              title="참여 중인 캠프가 없어요"
              description="나에게 맞는 캠프를 찾아보세요."
              primaryCta="캠프 둘러보기"
            />

            <SectionLabel text="YouTube 검색 결과 없음" />
            <StateScreen
              icon={<WifiOff size={36} className="text-[#D1D5DB]" />}
              title="검색 결과가 없어요"
              description="다른 검색어를 시도해 보세요."
              primaryCta="다시 검색"
            />
          </div>
        )}

        {/* ── Error States ── */}
        {active === 'error' && (
          <div className="flex flex-col gap-5">
            <SectionLabel text="일반 오류" />
            <StateScreen
              icon={<AlertCircle size={36} className="text-[#F97316]" />}
              title="문제가 생겼어요"
              description="잠시 후 다시 시도해 주세요. 계속 문제가 있으면 더보기 > 문의하기를 이용해 주세요."
              primaryCta="다시 시도"
              variant="error"
            />

            <SectionLabel text="데이터 로드 실패" />
            <StateScreen
              icon={<Database size={36} className="text-[#F97316]" />}
              title="데이터를 불러올 수 없어요"
              description="인터넷 연결을 확인하거나 잠시 후 다시 시도해 주세요."
              subdesc="기록은 안전하게 보관되고 있어요."
              primaryCta="다시 시도"
              variant="error"
            />

            <SectionLabel text="서버 점검 중" />
            <StateScreen
              icon={<Settings size={36} className="text-[#6B7280]" />}
              title="서버 점검 중이에요"
              description="곧 정상으로 돌아올 거예요. 잠시만 기다려 주세요."
              subdesc="오프라인으로 저장된 기록은 나중에 자동 전송돼요."
              variant="error"
            />
          </div>
        )}

        {/* ── Offline States ── */}
        {active === 'offline' && (
          <div className="flex flex-col gap-5">
            <SectionLabel text="오프라인 배너" />
            <div className="bg-[#374151] rounded-[14px] px-4 py-3 flex items-center gap-3">
              <WifiOff size={18} className="text-white/70 shrink-0" />
              <div className="flex-1">
                <p className="text-[14px] text-white">오프라인이에요</p>
                <p className="text-[12px] text-white/60">기록은 저장 중이에요. 연결되면 자동으로 보내드릴게요.</p>
              </div>
            </div>

            <SectionLabel text="오프라인 전체 화면" />
            <StateScreen
              icon={<WifiOff size={36} className="text-[#9CA3AF]" />}
              title="인터넷이 연결되지 않았어요"
              description="기록과 체크는 계속 할 수 있어요. 연결되면 자동으로 동기화할게요."
              subdesc="Wi-Fi 또는 모바일 데이터를 확인해 보세요."
              primaryCta="다시 확인"
              variant="offline"
            />

            <SectionLabel text="YouTube 오프라인" />
            <StateScreen
              icon={<Wifi size={36} className="text-[#9CA3AF]" />}
              title="인터넷이 약해요"
              description="연결되면 추천을 불러올게요."
              subdesc="체크와 기록은 오프라인에서도 가능해요."
              variant="offline"
            />
          </div>
        )}

        {/* ── Permission Denied ── */}
        {active === 'permission' && (
          <div className="flex flex-col gap-5">
            <SectionLabel text="알림 권한 거부" />
            <StateScreen
              icon={<ShieldOff size={36} className="text-[#F59E0B]" />}
              title="알림 권한이 꺼져 있어요"
              description="취침 루틴 알림이나 체크 리마인드를 받으려면 알림을 허용해 주세요."
              subdesc="알림 없이도 앱은 정상적으로 사용할 수 있어요."
              primaryCta="설정에서 허용하기"
              secondaryCta="나중에"
              variant="warning"
            />

            <SectionLabel text="건강 데이터 권한 거부" />
            <StateScreen
              icon={<ShieldOff size={36} className="text-[#F59E0B]" />}
              title="건강 데이터 접근이 필요해요"
              description="워치의 수면/활동 데이터를 가져오려면 건강 앱 권한이 필요해요."
              subdesc="권한 없이도 마음 체크와 두뇌 놀이는 가능해요."
              primaryCta="권한 설정 열기"
              secondaryCta="워치 없이 사용"
              variant="warning"
            />

            <SectionLabel text="위치 권한 거부 (산책 코스)" />
            <StateScreen
              icon={<ShieldOff size={36} className="text-[#F59E0B]" />}
              title="위치 권한이 필요해요"
              description="산책 코스 안내를 위해 위치 접근이 필요해요."
              subdesc="위치를 허용하지 않아도 거리/시간 정보는 확인할 수 있어요."
              primaryCta="위치 허용하기"
              secondaryCta="코스 정보만 보기"
              variant="warning"
            />
          </div>
        )}

        {/* ── Skeleton ── */}
        {active === 'skeleton' && (
          <div className="flex flex-col gap-5">
            <SectionLabel text="카드 스켈레톤" />
            <div className="bg-white rounded-[16px] p-5 shadow-[0_1px_6px_rgba(0,0,0,0.04)] animate-pulse">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#EEF1F4]" />
                <div className="flex-1">
                  <div className="h-4 w-20 bg-[#EEF1F4] rounded mb-2" />
                  <div className="h-3 w-32 bg-[#EEF1F4] rounded" />
                </div>
              </div>
              <div className="h-8 w-24 bg-[#EEF1F4] rounded mb-3" />
              <div className="h-5 w-16 bg-[#EEF1F4] rounded-full mb-3" />
              <div className="h-3 w-full bg-[#EEF1F4] rounded mb-2" />
              <div className="h-3 w-3/4 bg-[#EEF1F4] rounded mb-4" />
              <div className="flex gap-2">
                <div className="flex-1 h-[40px] bg-[#EEF1F4] rounded-[14px]" />
                <div className="flex-1 h-[40px] bg-[#EEF1F4] rounded-[14px]" />
              </div>
            </div>

            <SectionLabel text="리스트 스켈레톤" />
            <div className="flex flex-col gap-3 animate-pulse">
              {[0, 1, 2].map(i => (
                <div key={i} className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)] flex items-center gap-3">
                  <div className="w-12 h-12 rounded-[14px] bg-[#EEF1F4]" />
                  <div className="flex-1">
                    <div className="h-4 w-28 bg-[#EEF1F4] rounded mb-2" />
                    <div className="h-3 w-40 bg-[#EEF1F4] rounded" />
                  </div>
                  <div className="w-5 h-5 bg-[#EEF1F4] rounded" />
                </div>
              ))}
            </div>

            <SectionLabel text="게이지 스켈레톤" />
            <div className="bg-white rounded-[16px] p-5 shadow-[0_1px_6px_rgba(0,0,0,0.04)] animate-pulse">
              <div className="flex items-center justify-between mb-3">
                <div className="h-4 w-28 bg-[#EEF1F4] rounded" />
                <div className="h-5 w-14 bg-[#EEF1F4] rounded-full" />
              </div>
              <div className="h-3 bg-[#EEF1F4] rounded-full mb-3" />
              <div className="h-10 w-20 bg-[#EEF1F4] rounded mb-2" />
              <div className="h-3 w-full bg-[#EEF1F4] rounded mb-4" />
              <div className="h-[48px] bg-[#EEF1F4] rounded-[14px]" />
            </div>

            <SectionLabel text="차트 스켈레톤" />
            <div className="bg-white rounded-[16px] p-5 shadow-[0_1px_6px_rgba(0,0,0,0.04)] animate-pulse">
              <div className="h-4 w-24 bg-[#EEF1F4] rounded mb-4" />
              <div className="h-[120px] bg-[#EEF1F4] rounded-[12px] mb-3" />
              <div className="h-3 w-40 bg-[#EEF1F4] rounded" />
            </div>
          </div>
        )}

        {/* ── Sync Failure ── */}
        {active === 'sync' && (
          <div className="flex flex-col gap-5">
            <SectionLabel text="동기화 실패" />
            <StateScreen
              icon={<RefreshCw size={36} className="text-[#DC2626]" />}
              title="동기화에 실패했어요"
              description="서버와 연결이 끊어졌어요. 인터넷 상태를 확인한 뒤 다시 시도해 보세요."
              subdesc="기록은 안전하게 보관되고 있어요."
              primaryCta="다시 동기화"
              variant="error"
            />

            <SectionLabel text="워치 연결 끊김" />
            <StateScreen
              icon={<Watch size={36} className="text-[#F97316]" />}
              title="워치 연결이 끊어졌어요"
              description="워치를 가까이 두고 블루투스가 켜져 있는지 확인해 주세요."
              subdesc="연결이 되면 자동으로 데이터를 가져와요."
              primaryCta="다시 연결"
              secondaryCta="나중에"
              variant="warning"
            />

            <SectionLabel text="데이터 충돌" />
            <StateScreen
              icon={<Database size={36} className="text-[#F59E0B]" />}
              title="데이터가 일치하지 않아요"
              description="기기와 서버의 기록이 다릅니다. 최신 기록을 선택해 주세요."
              primaryCta="최신 기록 사용"
              secondaryCta="자세히"
              variant="warning"
            />
          </div>
        )}
      </div>
    </div>
  );
}

// ── Helper components ──

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="bg-[#111827] text-white px-3 py-2 rounded-[10px] text-[13px]">
      {text}
    </div>
  );
}

interface StateScreenProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  subdesc?: string;
  primaryCta?: string;
  secondaryCta?: string;
  variant?: 'default' | 'error' | 'offline' | 'warning';
}

function StateScreen({
  icon,
  title,
  description,
  subdesc,
  primaryCta,
  secondaryCta,
  variant = 'default',
}: StateScreenProps) {
  const borderColor = {
    default: 'border-[#E5E7EB]',
    error: 'border-[#FEE2E2]',
    offline: 'border-[#E5E7EB]',
    warning: 'border-[#FEF9C3]',
  }[variant];

  const ctaBg = {
    default: 'bg-[#1B7A4B]',
    error: 'bg-[#1B7A4B]',
    offline: 'bg-[#374151]',
    warning: 'bg-[#1B7A4B]',
  }[variant];

  return (
    <div className={`bg-white rounded-[16px] p-6 border ${borderColor} shadow-[0_1px_6px_rgba(0,0,0,0.04)]`}>
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-[#F7F8FA] flex items-center justify-center mb-4">
          {icon}
        </div>
        <h3 className="text-[16px] text-[#111827] mb-2">{title}</h3>
        <p className="text-[14px] text-[#6B7280] mb-1">{description}</p>
        {subdesc && <p className="text-[12px] text-[#9CA3AF] mb-4">{subdesc}</p>}
        {!subdesc && <div className="mb-4" />}

        {primaryCta && (
          <button className={`w-full h-[48px] ${ctaBg} text-white rounded-[14px] text-[15px] flex items-center justify-center gap-1.5`}>
            <RefreshCw size={16} />
            {primaryCta}
          </button>
        )}
        {secondaryCta && (
          <button className="w-full h-[40px] text-[#6B7280] text-[14px] mt-1">
            {secondaryCta}
          </button>
        )}
      </div>
    </div>
  );
}
