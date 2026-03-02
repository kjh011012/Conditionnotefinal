/**
 * 09_Copy_Library (Prompt 3 마이크로카피 라이브러리)
 * AppCopy 컴포넌트 시스템을 활용한 전체 카피 레퍼런스 페이지
 *
 * 섹션:
 * 1. 앱 고정 문구        — ID-xx
 * 2. 톤 가이드           — TONE-xx
 * 3. 외부 링크 표기      — EXT-xx
 * 4. 데이터/동의 신뢰    — DATA-xx
 * 5. 측정 품질 안내      — QA-xx
 * 6. 연계 안내 톤        — REF-xx
 * 7. 디스클레이머        — DIS-xx
 * 8. 상태 문구           — ST-xx
 * 9. 금지 표현           — FBD
 * 10. 토스트/피드백      — TST-xx
 * 11. 빈값/오류          — EMP-xx
 */
import { ArrowLeft, AlertTriangle, Copy, Check } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useState, useCallback } from 'react';
import {
  CopyTitle, CopyBody, CopyCaption, CopyDisclaimer,
  CopyTone, CopyCard, CopyForbiddenRow, CopyBadge,
  APP_COPY,
} from '../../components/ui/AppCopy';

type SectionKey =
  | 'fixed' | 'tone' | 'external' | 'data'
  | 'quality' | 'referral' | 'disclaimer'
  | 'status' | 'forbidden' | 'toast' | 'empty';

const sectionTabs: { key: SectionKey; label: string }[] = [
  { key: 'fixed', label: '앱 고정 문구' },
  { key: 'tone', label: '톤 가이드' },
  { key: 'external', label: '외부 링크' },
  { key: 'data', label: '데이터/동의' },
  { key: 'quality', label: '측정 품질' },
  { key: 'referral', label: '연계 안내' },
  { key: 'disclaimer', label: '디스클레이머' },
  { key: 'status', label: '상태 문구' },
  { key: 'forbidden', label: '금지 표현' },
  { key: 'toast', label: '토스트' },
  { key: 'empty', label: '빈값/오류' },
];

export function CopyLibraryPage() {
  const navigate = useNavigate();
  const [active, setActive] = useState<SectionKey>('fixed');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyText = useCallback((id: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 h-[56px] bg-white border-b border-[#EEF1F4]">
        <button onClick={() => navigate('/more')} className="w-9 h-9 flex items-center justify-center">
          <ArrowLeft size={22} className="text-[#374151]" />
        </button>
        <h2 className="text-[18px] text-[#111827]">09 · 카피 라이브러리</h2>
      </div>

      {/* Section Tabs */}
      <div className="px-4 pt-3 pb-2 bg-white overflow-x-auto border-b border-[#EEF1F4]">
        <div className="flex gap-2 pb-1" style={{ WebkitOverflowScrolling: 'touch' }}>
          {sectionTabs.map(s => (
            <button
              key={s.key}
              onClick={() => setActive(s.key)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-[12px] transition-all ${
                active === s.key
                  ? 'bg-[#1B7A4B] text-white'
                  : 'bg-[#F7F8FA] text-[#6B7280] border border-[#E5E7EB]'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Component usage guide */}
      <div className="px-4 pt-4 pb-1">
        <div className="bg-[#E8F5EE] rounded-[12px] px-3 py-2 flex items-center gap-2">
          <Copy size={13} className="text-[#1B7A4B] shrink-0" />
          <CopyCaption className="text-[#1B7A4B]">
            카드를 탭하면 문구가 복사돼요 · AppCopy 컴포넌트로 재사용 가능
          </CopyCaption>
        </div>
      </div>

      <div className="px-4 pt-4 pb-8">

        {/* ═══ 1. 앱 고정 문구 ═══ */}
        {active === 'fixed' && (
          <div className="flex flex-col gap-4">
            <SectionHeader
              title="앱 고정 문구"
              desc="앱의 정체성과 목적을 명시하는 핵심 카피. 항상 같은 위치에 노출됩니다."
            />

            <CopyCardInteractive
              id="ID-01"
              category="정체성"
              where="홈 상단 고정 서브카피"
              copy={APP_COPY.IDENTITY_TAGLINE}
              note="모든 홈(참가자/보호자) 상단에 노출"
              variant="highlight"
              onCopy={copyText}
              copied={copiedId === 'ID-01'}
            />
            <CopyCardInteractive
              id="ID-02"
              category="리포트"
              where="리포트 상단 고정 문구"
              copy={APP_COPY.IDENTITY_REPORT}
              note="캠프/주간/월간 리포트 모든 화면 상단"
              variant="highlight"
              onCopy={copyText}
              copied={copiedId === 'ID-02'}
            />
            <CopyCardInteractive
              id="ID-03"
              category="연계"
              where="연계 화면 상단 고정 문구"
              copy={APP_COPY.IDENTITY_REFERRAL}
              note="Referral 화면 + 위기 모달"
              variant="highlight"
              onCopy={copyText}
              copied={copiedId === 'ID-03'}
            />

            {/* Preview: 실제 렌더링 예시 */}
            <div className="mt-2">
              <CopyCaption className="text-[#9CA3AF] mb-2 px-1">▼ 실제 렌더링 미리보기</CopyCaption>
              <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)] space-y-3">
                <CopyTitle>컨디션노트</CopyTitle>
                <CopyBody>{APP_COPY.IDENTITY_TAGLINE}</CopyBody>
                <CopyDisclaimer>{APP_COPY.IDENTITY_REPORT}</CopyDisclaimer>
                <CopyDisclaimer variant="info">{APP_COPY.IDENTITY_REFERRAL}</CopyDisclaimer>
              </div>
            </div>
          </div>
        )}

        {/* ═══ 2. 톤 가이드 ═══ */}
        {active === 'tone' && (
          <div className="flex flex-col gap-4">
            <SectionHeader
              title="톤 가이드 (권고는 단정 금지)"
              desc="모든 권고·안내 문구에 아래 패턴을 사용합니다. 확언·단정은 금지예요."
            />

            <div className="bg-white rounded-[16px] p-5 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
              <CopyTitle className="mb-4">허용 패턴</CopyTitle>
              <div className="flex flex-col gap-3">
                {APP_COPY.TONE_PATTERNS.map((t, i) => (
                  <CopyTone key={i} pattern={t.pattern} example={t.example} />
                ))}
              </div>
            </div>

            <div className="bg-[#FEE2E2] rounded-[16px] p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle size={14} className="text-[#DC2626]" />
                <CopyTitle className="text-[#991B1B] text-[14px]">금지 패턴</CopyTitle>
              </div>
              <div className="space-y-1.5">
                {['~해야 합니다', '~입니다 (확언)', '확실히 ~됩니다', '반드시 ~하세요'].map(p => (
                  <div key={p} className="flex items-center gap-2">
                    <span className="text-[#DC2626] text-[12px]">✕</span>
                    <CopyCaption className="text-[#7F1D1D]">{p}</CopyCaption>
                  </div>
                ))}
              </div>
            </div>

            {/* Preview */}
            <div className="mt-2">
              <CopyCaption className="text-[#9CA3AF] mb-2 px-1">▼ 실제 렌더링 비교</CopyCaption>
              <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)] space-y-3">
                <div className="bg-[#E8F5EE] rounded-[10px] p-3">
                  <CopyCaption className="text-[#1B7A4B] mb-1">✓ 올바른 예</CopyCaption>
                  <CopyBody>규칙적인 취침이 수면의 질에 도움이 될 수 있어요.</CopyBody>
                </div>
                <div className="bg-[#FEE2E2] rounded-[10px] p-3">
                  <CopyCaption className="text-[#DC2626] mb-1">✕ 잘못된 예</CopyCaption>
                  <CopyBody className="text-[#991B1B] line-through">규칙적으로 취침해야 합니다.</CopyBody>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══ 3. 외부 링크 표기 ═══ */}
        {active === 'external' && (
          <div className="flex flex-col gap-4">
            <SectionHeader
              title="외부 링크 표기"
              desc="앱 밖으로 이동하는 링크에는 반드시 이탈 안내를 표시합니다."
            />

            <CopyCardInteractive
              id="EXT-01"
              category="YouTube"
              where="YouTube 카드/CTA 하단"
              copy={APP_COPY.EXTERNAL_YOUTUBE}
              note="모든 YouTube 관련 CTA 하단에 고정 노출"
              onCopy={copyText}
              copied={copiedId === 'EXT-01'}
            />

            <div className="mt-2">
              <CopyCaption className="text-[#9CA3AF] mb-2 px-1">▼ 실제 적용 예시</CopyCaption>
              <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
                <div className="bg-[#F7F8FA] rounded-[12px] p-3 mb-2">
                  <CopyBody className="text-[#111827] mb-1">🧘 5분 명상 | 마음 호흡</CopyBody>
                  <CopyCaption>YouTube · 7:32</CopyCaption>
                </div>
                <button className="w-full h-[44px] bg-[#FF0000] text-white rounded-[12px] text-[14px] mb-1.5">
                  YouTube에서 보기
                </button>
                <CopyCaption className="text-center text-[#9CA3AF]">
                  {APP_COPY.EXTERNAL_YOUTUBE}
                </CopyCaption>
              </div>
            </div>
          </div>
        )}

        {/* ═══ 4. 데이터/동의 신뢰 카피 ═══ */}
        {active === 'data' && (
          <div className="flex flex-col gap-4">
            <SectionHeader
              title="데이터/동의 신뢰 카피"
              desc="사용자가 데이터 수집·공유에 안심할 수 있도록 하는 신뢰 문구입니다."
            />

            <CopyCardInteractive
              id="DATA-01"
              category="익명화"
              where="익명 통계 동의 설명"
              copy={APP_COPY.DATA_ANONYMOUS}
              note="ConsentToggleCard 본문에 사용"
              onCopy={copyText}
              copied={copiedId === 'DATA-01'}
            />
            <CopyCardInteractive
              id="DATA-02"
              category="옵트아웃"
              where="동의 토글 하단 캡션"
              copy={APP_COPY.DATA_OPT_OUT}
              note="모든 동의 토글 하단"
              onCopy={copyText}
              copied={copiedId === 'DATA-02'}
            />
            <CopyCardInteractive
              id="DATA-03"
              category="공유 범위"
              where="보호자 공유 설정 내"
              copy={APP_COPY.DATA_CONSENT_SCOPE}
              note="공유 설정 화면 상단"
              onCopy={copyText}
              copied={copiedId === 'DATA-03'}
            />

            <div className="mt-2">
              <CopyCaption className="text-[#9CA3AF] mb-2 px-1">▼ 실제 렌더링 예시</CopyCaption>
              <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)] space-y-3">
                <div className="flex items-center justify-between">
                  <CopyBody>익명 통계 제공</CopyBody>
                  <div className="w-10 h-6 rounded-full bg-[#1B7A4B] relative">
                    <div className="w-4 h-4 rounded-full bg-white absolute top-1 right-1" />
                  </div>
                </div>
                <CopyCaption>{APP_COPY.DATA_ANONYMOUS}</CopyCaption>
                <CopyCaption className="text-[#1B7A4B]">{APP_COPY.DATA_OPT_OUT}</CopyCaption>
                <CopyDisclaimer>{APP_COPY.DATA_CONSENT_SCOPE}</CopyDisclaimer>
              </div>
            </div>
          </div>
        )}

        {/* ═══ 5. 측정 품질 안내 ═══ */}
        {active === 'quality' && (
          <div className="flex flex-col gap-4">
            <SectionHeader
              title="측정 품질 안내"
              desc="측정 결과에 대한 과신을 방지하고, 변화 추세를 강조하는 문구입니다."
            />

            <CopyCardInteractive
              id="QA-01"
              category="컨디션 영향"
              where="스트레스/두뇌 측정 전후"
              copy={APP_COPY.MEASURE_CONDITION}
              note="측정 시작 화면, 결과 화면 하단"
              variant="warning"
              onCopy={copyText}
              copied={copiedId === 'QA-01'}
            />
            <CopyCardInteractive
              id="QA-02"
              category="추세 강조"
              where="결과 비교 영역"
              copy={APP_COPY.MEASURE_TREND}
              note="7일 평균 대비 카드, 리포트 추이 그래프 옆"
              variant="warning"
              onCopy={copyText}
              copied={copiedId === 'QA-02'}
            />

            <div className="mt-2">
              <CopyCaption className="text-[#9CA3AF] mb-2 px-1">▼ 실제 적용 예시 (신뢰도 배지 + 캡션)</CopyCaption>
              <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)] space-y-3">
                <div className="flex items-center gap-2">
                  <div className="px-2 py-1 rounded-full bg-[#FEF9C3] text-[11px] text-[#A16207]">신뢰도: 보통</div>
                  <CopyCaption>{APP_COPY.MEASURE_CONDITION}</CopyCaption>
                </div>
                <CopyDisclaimer variant="warning">{APP_COPY.MEASURE_TREND}</CopyDisclaimer>
              </div>
            </div>
          </div>
        )}

        {/* ═══ 6. 연계 안내 톤 ═══ */}
        {active === 'referral' && (
          <div className="flex flex-col gap-4">
            <SectionHeader
              title="연계 안내 톤"
              desc="위기 감지·연계 시 사용하는 톤. 진단/치료가 아닌 '경로 안내'임을 명확히 합니다."
            />

            <CopyCardInteractive
              id="REF-01"
              category="위기 감지"
              where="마음 체크 위기 감지 시"
              copy={APP_COPY.REFERRAL_SAFE}
              note="빨간 배경 박스 또는 SafetyConfirmDialog"
              variant="warning"
              onCopy={copyText}
              copied={copiedId === 'REF-01'}
            />
            <CopyCardInteractive
              id="REF-02"
              category="경로 안내"
              where="모든 연계 화면 상단/하단"
              copy={APP_COPY.REFERRAL_GUIDE}
              note="ReferralCategoryList, FollowUp, HelpPage"
              onCopy={copyText}
              copied={copiedId === 'REF-02'}
            />

            <CopyCard
              id="REF-03"
              category="안전 확인"
              where="SafetyConfirmDialog 제목"
              copy="지금 연결할까요?"
              note="referral/emergency 공통"
            />
            <CopyCard
              id="REF-04"
              category="referral"
              where="안전 확인 referral 설명"
              copy="가까운 기관으로 연결을 도와드릴게요. 준비되셨을 때 눌러주세요."
            />
            <CopyCard
              id="REF-05"
              category="emergency"
              where="안전 확인 emergency 설명"
              copy="지금 바로 도움을 받을 수 있는 곳으로 연결해 드릴게요. 걱정하지 마세요."
            />
            <CopyCard
              id="REF-06"
              category="긴급번호"
              where="긴급 전화 라벨"
              copy="자살예방상담 109 / 정신건강상담 1577-0199 / 치매상담콜 1899-9988"
              note="항상 3개 동시 노출, 2단계 확인 모달 필수"
            />

            <div className="mt-2">
              <CopyCaption className="text-[#9CA3AF] mb-2 px-1">▼ 실제 렌더링 예시</CopyCaption>
              <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)] space-y-3">
                <div className="bg-[#FEF2F2] rounded-[12px] p-3">
                  <CopyBody className="text-[#991B1B]">{APP_COPY.REFERRAL_SAFE}</CopyBody>
                </div>
                <CopyDisclaimer>{APP_COPY.REFERRAL_GUIDE}</CopyDisclaimer>
              </div>
            </div>
          </div>
        )}

        {/* ═══ 7. 디스클레이머 ═══ */}
        {active === 'disclaimer' && (
          <div className="flex flex-col gap-4">
            <SectionHeader
              title="디스클레이머"
              desc="의료 오해를 방지하기 위한 세부 면책 문구들입니다."
            />

            <CopyCard
              id="DIS-01"
              category="리듬"
              where="RhythmScoreCard description"
              copy="수면 규칙성과 활동량을 기반으로 한 생활 리듬 점수예요. 의학적 지표가 아닌 생활 습관 점수입니다."
            />
            <CopyCard
              id="DIS-02"
              category="MetricCard"
              where="MetricCard expanded 내"
              copy="이 수치는 의학적 검사가 아닌 생활 리듬 점검 결과예요. 지속적으로 변화를 관찰하면 도움이 될 수 있어요."
            />
            <CopyCard
              id="DIS-03"
              category="YouTube"
              where="YouTube 카드 하단"
              copy={APP_COPY.EXTERNAL_YOUTUBE}
            />
            <CopyCard
              id="DIS-04"
              category="놀이체크"
              where="PlayCheck 결과 하단"
              copy="이 결과는 진행자가 관찰한 반응 기반의 선별 점검이며, 의료 진단이 아닙니다."
            />
            <CopyCard
              id="DIS-05"
              category="데이터"
              where="데이터 설정 설명"
              copy={`${APP_COPY.DATA_ANONYMOUS} ${APP_COPY.DATA_OPT_OUT}`}
              note="익명 통계 동의 설명"
            />

            <div className="mt-2">
              <CopyCaption className="text-[#9CA3AF] mb-2 px-1">▼ CopyDisclaimer 3가지 variant</CopyCaption>
              <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)] space-y-3">
                <CopyCaption className="text-[#9CA3AF] mb-1">default</CopyCaption>
                <CopyDisclaimer>이 앱은 진단이 아니라, 다음 경로 안내를 돕습니다.</CopyDisclaimer>
                <CopyCaption className="text-[#9CA3AF] mb-1">warning</CopyCaption>
                <CopyDisclaimer variant="warning">오늘 컨디션에 따라 측정값이 달라질 수 있어요.</CopyDisclaimer>
                <CopyCaption className="text-[#9CA3AF] mb-1">info</CopyCaption>
                <CopyDisclaimer variant="info">필요 시 가까운 공공기관으로 연결을 도와드립니다.</CopyDisclaimer>
              </div>
            </div>
          </div>
        )}

        {/* ═══ 8. 상태 문구 ═══ */}
        {active === 'status' && (
          <div className="flex flex-col gap-4">
            <SectionHeader
              title="상태 문구"
              desc="StatusChip, SyncStatusPill 등에 사용되는 상태별 라벨입니다."
            />

            {[
              { id: 'ST-01', cat: 'StatusChip', where: 'green', copy: '✔ 정상 범위', note: '양호한 상태' },
              { id: 'ST-02', cat: 'StatusChip', where: 'yellow', copy: '⚠ 주의 필요', note: '관찰 필요 상태' },
              { id: 'ST-03', cat: 'StatusChip', where: 'orange', copy: '➜ 연계 권장', note: '전문 기관 연계 안내' },
              { id: 'ST-04', cat: 'StatusChip', where: 'red', copy: '‼ 즉시 도움 권장', note: '위기 감지 시' },
              { id: 'ST-05', cat: 'SyncPill', where: 'synced', copy: '동기화됨 (방금)', note: '' },
              { id: 'ST-06', cat: 'SyncPill', where: 'needsSync', copy: '동기화 필요', note: '' },
              { id: 'ST-07', cat: 'SyncPill', where: 'failed', copy: '동기화 실패', note: '해결 방법 바텀시트 연결' },
              { id: 'ST-08', cat: 'SyncPill', where: 'offline', copy: '오프라인 저장 중', note: '기록은 안전하게 보관됩니다' },
            ].map(item => (
              <CopyCard key={item.id} id={item.id} category={item.cat} where={item.where} copy={item.copy} note={item.note} />
            ))}
          </div>
        )}

        {/* ═══ 9. 금지 표현 ═══ */}
        {active === 'forbidden' && (
          <div className="flex flex-col gap-4">
            <SectionHeader
              title="금지 표현"
              desc="의료 오해를 유발할 수 있는 표현과 대체어 목록입니다."
            />

            <div className="bg-[#FEE2E2] rounded-[16px] p-5">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle size={16} className="text-[#DC2626]" />
                <CopyTitle className="text-[#991B1B]">금지 → 대체 표현</CopyTitle>
              </div>
              <div className="flex flex-col gap-2">
                {APP_COPY.FORBIDDEN.map((item, i) => (
                  <CopyForbiddenRow key={i} forbidden={item.forbidden} replace={item.replace} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ═══ 10. 토스트/피드백 ═══ */}
        {active === 'toast' && (
          <div className="flex flex-col gap-4">
            <SectionHeader
              title="토스트/피드백 메시지"
              desc="사용자 행동에 대한 즉각 피드백 문구입니다."
            />

            {[
              { id: 'TST-01', where: '체크 완료 시', copy: '저장했어요', note: 'success 토스트' },
              { id: 'TST-02', where: '추천 → 오늘 계획 추가', copy: '오늘 계획에 추가했어요', note: 'success 토스트' },
              { id: 'TST-03', where: '오프라인 저장', copy: '오프라인으로 저장 중이에요. 연결되면 자동으로 보내드릴게요.', note: 'offline 토스트' },
              { id: 'TST-04', where: '동기화 완료', copy: '동기화가 완료됐어요', note: 'success 토스트' },
              { id: 'TST-05', where: '일일 기록 완료', copy: '오늘 기록을 남겼어요. 내일도 함께해요!', note: 'success 토스트' },
              { id: 'TST-06', where: '캠프 예약 완료', copy: '예약이 완료됐어요! 캠프 준비 체크리스트를 확인해 보세요.', note: 'success 토스트' },
            ].map(item => (
              <CopyCard key={item.id} id={item.id} category="토스트" where={item.where} copy={item.copy} note={item.note} />
            ))}
          </div>
        )}

        {/* ═══ 11. 빈값/오류 ═══ */}
        {active === 'empty' && (
          <div className="flex flex-col gap-4">
            <SectionHeader
              title="빈값/오류 메시지"
              desc="데이터가 없거나 오류 시 표시되는 안내 문구입니다."
            />

            {[
              { id: 'EMP-01', where: '워치 미연결 / 수면 empty', copy: '워치 연결이 필요해요', note: '+ "워치 없이도 마음 체크, 두뇌 놀이는 가능해요"' },
              { id: 'EMP-02', where: 'Metric empty', copy: '아직 기록된 데이터가 없어요', note: '+ [기록 시작하기] CTA' },
              { id: 'EMP-03', where: '오늘 계획 empty', copy: '아직 계획이 없어요', note: '+ "추천에서 오늘 계획에 넣어보세요"' },
              { id: 'EMP-04', where: 'YouTube 검색 결과 없음', copy: '검색 결과가 없어요', note: '+ "다른 검색어를 시도해 보세요"' },
              { id: 'EMP-05', where: '네트워크 오류', copy: '데이터를 불러올 수 없어요', note: '+ "인터넷 연결을 확인하거나 잠시 후 다시 시도해 주세요"' },
              { id: 'EMP-06', where: 'YouTube 오프라인', copy: '인터넷이 약해요. 연결되면 추천을 불러올게요.', note: 'offline 상태' },
              { id: 'EMP-07', where: '동기화 실패 설명', copy: '서버와 연결이 끊어졌어요', note: '+ "기록은 안전하게 보관되고 있어요"' },
            ].map(item => (
              <CopyCard key={item.id} id={item.id} category="empty" where={item.where} copy={item.copy} note={item.note} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── 내부 헬퍼 컴포넌트 ─── */

function SectionHeader({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="mb-1">
      <CopyTitle className="mb-1">{title}</CopyTitle>
      <CopyCaption>{desc}</CopyCaption>
    </div>
  );
}

function CopyCardInteractive({
  id, category, where, copy, note, variant = 'default', onCopy, copied,
}: {
  id: string;
  category?: string;
  where: string;
  copy: string;
  note?: string;
  variant?: 'default' | 'highlight' | 'warning';
  onCopy: (id: string, text: string) => void;
  copied: boolean;
}) {
  const accentColors = {
    default: 'border-l-[#1B7A4B]',
    highlight: 'border-l-[#0EA5E9]',
    warning: 'border-l-[#FF8A3D]',
  };

  return (
    <button
      onClick={() => onCopy(id, copy)}
      className={`w-full bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)] border-l-[3px] ${accentColors[variant]} text-left transition-all active:scale-[0.98]`}
    >
      <div className="flex items-center justify-between mb-1.5">
        <CopyBadge id={id} category={category} />
        {copied ? (
          <span className="flex items-center gap-1 text-[11px] text-[#1B7A4B]">
            <Check size={12} /> 복사됨
          </span>
        ) : (
          <Copy size={13} className="text-[#D1D5DB]" />
        )}
      </div>
      <CopyCaption className="mb-2 text-[#9CA3AF]">{where}</CopyCaption>
      <div className="bg-[#F7F8FA] rounded-[10px] px-3 py-2.5 mb-2">
        <CopyBody className="text-[#111827]">"{copy}"</CopyBody>
      </div>
      {note && <CopyCaption className="text-[#9CA3AF]">{note}</CopyCaption>}
    </button>
  );
}
