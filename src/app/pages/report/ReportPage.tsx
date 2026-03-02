import { useState } from 'react';
import { useNavigate } from 'react-router';
import { FileText, TrendingUp, ArrowUpRight, ArrowDownRight, Download, Share2, Building2, CalendarDays, BarChart3, ChevronRight } from 'lucide-react';
import { StatusChip } from '../../components/ui/StatusChip';
import { CampCTABanner } from '../../components/ui/CampCTABanner';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';

type TopSegment = 'camp' | 'weekly' | 'monthly';
type View = 'home' | 'final' | 'referral';

const compareData = [
  { label: '수면', before: 5.8, after: 6.9, unit: '시간', improved: true },
  { label: '스트레스', before: 72, after: 58, unit: '점', improved: true },
  { label: '활동', before: 3200, after: 5400, unit: '걸음', improved: true },
  { label: '마음 에너지', before: 4, after: 7, unit: '/10', improved: true },
  { label: '두뇌 컨디션', before: 55, after: 68, unit: '/100', improved: true },
];

const weeklyData = [
  { day: '월', sleep: 6.8, steps: 4200, stress: 55 },
  { day: '화', sleep: 7.1, steps: 5100, stress: 48 },
  { day: '수', sleep: 5.9, steps: 3800, stress: 62 },
  { day: '목', sleep: 6.5, steps: 4500, stress: 52 },
  { day: '금', sleep: 7.0, steps: 5800, stress: 45 },
  { day: '토', sleep: 7.5, steps: 6200, stress: 40 },
  { day: '��', sleep: 6.2, steps: 3500, stress: 58 },
];

const monthlyData = [
  { week: '1주', rhythm: 55 },
  { week: '2주', rhythm: 62 },
  { week: '3주', rhythm: 58 },
  { week: '4주', rhythm: 68 },
];

export function ReportPage() {
  const navigate = useNavigate();
  const [topSegment, setTopSegment] = useState<TopSegment>('camp');
  const [view, setView] = useState<View>('home');

  // Referral view
  if (view === 'referral') {
    return (
      <div className="min-h-screen bg-[#F7F8FA]">
        <div className="px-4 pt-3 pb-4 bg-white"><h1 className="text-[22px] text-[#111827]">연계 기관 안내</h1></div>
        <div className="px-4 pt-3">
          <div className="bg-[#E8F5EE] rounded-[16px] p-4 mb-4">
            <p className="text-[13px] text-[#0E4B2E]">필요 시 가까운 공공기관/상담기관으로 연결을 도와드립니다.</p>
          </div>
          {[
            { name: '보건소 · 정신건강복지센터', why: '마음 건강 상담, 스트레스 관리 프로그램 연계', phone: '1577-0199', prep: ['신분증', '건강보험증'] },
            { name: '치매안심센터', why: '두뇌 컨디션이 지속 하락할 경우 정밀 선별(CIST) 안내', phone: '1899-9988', prep: ['신분증', '보호자 연락처'] },
            { name: '상담기관', why: '정서 건강 전문 상담이 필요할 경우 연결', phone: '109', prep: ['별도 준비물 없음'] },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-[16px] p-5 shadow-[0_1px_6px_rgba(0,0,0,0.04)] mb-3">
              <div className="flex items-center gap-2 mb-2"><Building2 size={18} className="text-[#1B7A4B]" /><span className="text-[16px] text-[#111827]">{item.name}</span></div>
              <p className="text-[13px] text-[#6B7280] mb-3">{item.why}</p>
              <div className="mb-3">
                <span className="text-[12px] text-[#9CA3AF] block mb-1">준비물</span>
                <div className="flex gap-2">{item.prep.map((p, j) => (<span key={j} className="bg-[#F7F8FA] text-[#374151] px-2 py-1 rounded-full text-[12px]">{p}</span>))}</div>
              </div>
              <a href={`tel:${item.phone}`} className="w-full h-[44px] bg-[#E8F5EE] text-[#1B7A4B] rounded-[14px] text-[14px] flex items-center justify-center">전화하기 {item.phone}</a>
            </div>
          ))}
          <div className="bg-[#FEF2F2] rounded-[16px] p-4 mt-4">
            <span className="text-[14px] text-[#991B1B] block mb-2">긴급 도움</span>
            <div className="flex flex-col gap-2">
              <a href="tel:109" className="text-[14px] text-[#DC2626]">자살예방상담 109</a>
              <a href="tel:15770199" className="text-[14px] text-[#DC2626]">정신건강상담 1577-0199</a>
              <a href="tel:18999988" className="text-[14px] text-[#DC2626]">치매상담콜 1899-9988</a>
            </div>
          </div>
          <button onClick={() => setView('home')} className="w-full h-[44px] border border-[#1B7A4B] text-[#1B7A4B] rounded-[14px] text-[14px] mt-4">리포트로 돌아가기</button>
        </div>
      </div>
    );
  }

  // Final report view
  if (view === 'final') {
    return (
      <div className="min-h-screen bg-[#F7F8FA]">
        <div className="px-4 pt-3 pb-4 bg-white"><h1 className="text-[22px] text-[#111827]">최종 리포트</h1></div>
        <div className="px-4 pt-3">
          <div className="bg-[#FFF1E8] rounded-[12px] p-3 mb-4">
            <p className="text-[12px] text-[#EA580C]">이 리포트는 의료 진단이 아니라, 캠프 기간 동안의 생활 지표 변화와 권장 루틴을 안내합니다.</p>
          </div>
          <div className="bg-white rounded-[16px] p-5 shadow-[0_1px_6px_rgba(0,0,0,0.04)] mb-4">
            <h3 className="text-[16px] text-[#111827] mb-2">총평</h3>
            <p className="text-[14px] text-[#374151]">3박 4일 캠프 동안 수면과 활동 지표가 개선되었어요. 스트레스는 줄었고, 마음 에너지가 올라갔어요. 꾸준히 유지하면 더 큰 변화를 느낄 수 있어요.</p>
          </div>
          <div className="flex flex-col gap-3 mb-4">
            {compareData.map(item => (
              <div key={item.label} className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[14px] text-[#111827]">{item.label}</span>
                  <div className="flex items-center gap-1">
                    {item.improved ? <ArrowUpRight size={14} className="text-[#22C55E]" /> : <ArrowDownRight size={14} className="text-[#F97316]" />}
                    <span className={`text-[12px] ${item.improved ? 'text-[#22C55E]' : 'text-[#F97316]'}`}>개선</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="h-[30px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={[{ before: item.before, after: item.after }]} layout="vertical">
                          <XAxis type="number" hide /><YAxis type="category" hide dataKey="name" />
                          <Bar dataKey="before" fill="#EEF1F4" barSize={8} radius={4} />
                          <Bar dataKey="after" fill="#1B7A4B" barSize={8} radius={4} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[12px] text-[#9CA3AF] block">전: {item.before}{item.unit}</span>
                    <span className="text-[14px] text-[#111827] block">후: {item.after}{item.unit}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-[16px] p-5 shadow-[0_1px_6px_rgba(0,0,0,0.04)] mb-4">
            <div className="flex items-center gap-2 mb-2"><span className="text-[15px] text-[#111827]">현재 분기</span><StatusChip status="yellow" /></div>
            <p className="text-[13px] text-[#6B7280]">지금은 생활 루틴을 조금 더 다듬어보면 좋아요.</p>
          </div>
          <div className="bg-white rounded-[16px] p-5 shadow-[0_1px_6px_rgba(0,0,0,0.04)] mb-4">
            <h3 className="text-[15px] text-[#111827] mb-3">다음 2주 추천 루틴</h3>
            {[{ time: '아침', activity: '10분 스트레칭 + 산책' }, { time: '낮', activity: '두뇌 놀이 5분 + 공동체 활동' }, { time: '저녁', activity: '명상 10분 + 감사일기' }].map(r => (
              <div key={r.time} className="flex items-center gap-3 py-2 border-b border-[#EEF1F4] last:border-0">
                <span className="w-8 text-[13px] text-[#6B7280]">{r.time}</span>
                <span className="text-[14px] text-[#374151]">{r.activity}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2 pb-4">
            <button className="w-full h-[44px] bg-[#1B7A4B] text-white rounded-[14px] text-[14px] flex items-center justify-center gap-2"><Download size={16} /> PDF로 저장</button>
            <button className="w-full h-[44px] border border-[#1B7A4B] text-[#1B7A4B] rounded-[14px] text-[14px] flex items-center justify-center gap-2"><Share2 size={16} /> 보호자에게 공유</button>
            <button onClick={() => setView('referral')} className="w-full h-[44px] bg-[#FFF1E8] text-[#FF8A3D] rounded-[14px] text-[14px]">연계 기관 안내</button>
            <button onClick={() => setView('home')} className="w-full h-[44px] text-[#6B7280] text-[14px]">목록으로</button>
          </div>
        </div>
      </div>
    );
  }

  // Main report home
  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <div className="px-4 pt-3 pb-0 bg-white">
        <h1 className="text-[22px] text-[#111827] mb-1">리포트</h1>
        <p className="text-[11px] text-[#9CA3AF] mb-3">이 리포트는 의료 진단이 아니라, 생활 지표 변화와 권장 루틴을 안내합니다.</p>

        {/* Top Segment */}
        <div className="flex bg-[#EEF1F4] rounded-[12px] p-1">
          {[
            { key: 'camp' as TopSegment, label: '캠프 리포트' },
            { key: 'weekly' as TopSegment, label: '주간 리듬' },
            { key: 'monthly' as TopSegment, label: '월간 리듬' },
          ].map(seg => (
            <button
              key={seg.key}
              onClick={() => setTopSegment(seg.key)}
              className={`flex-1 py-2 rounded-[10px] text-[13px] transition-all ${
                topSegment === seg.key ? 'bg-white text-[#1B7A4B] shadow-sm' : 'text-[#6B7280]'
              }`}
            >
              {seg.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pt-5">
        {/* ===== CAMP REPORTS ===== */}
        {topSegment === 'camp' && (
          <div className="flex flex-col gap-4">
            <button className="bg-white rounded-[16px] p-5 shadow-[0_1px_6px_rgba(0,0,0,0.04)] text-left">
              <div className="flex items-center gap-2 mb-2">
                <FileText size={20} className="text-[#FF8A3D]" />
                <span className="text-[16px] text-[#111827]">중간 리포트</span>
                <StatusChip status="yellow" label="작성 중" />
              </div>
              <p className="text-[13px] text-[#6B7280]">Day 2까지의 변화를 요약하고 있어요.</p>
            </button>
            <button onClick={() => setView('final')} className="bg-white rounded-[16px] p-5 shadow-[0_1px_6px_rgba(0,0,0,0.04)] text-left">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={20} className="text-[#1B7A4B]" />
                <span className="text-[16px] text-[#111827]">최종 리포트</span>
                <StatusChip status="green" label="완성됨" />
              </div>
              <p className="text-[13px] text-[#6B7280]">3박 4일 전후 비교와 다음 추천 루틴이 포함되어 있어요.</p>
            </button>
          </div>
        )}

        {/* ===== WEEKLY RHYTHM ===== */}
        {topSegment === 'weekly' && (
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-[16px] p-5 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
              <h3 className="text-[16px] text-[#111827] mb-1">이번 주 리듬 요약</h3>
              <p className="text-[13px] text-[#6B7280] mb-4">2월 22일 ~ 2월 28일</p>

              {/* Sleep regularity */}
              <div className="mb-4">
                <span className="text-[14px] text-[#374151] block mb-2">수면 규칙성</span>
                <div className="h-[100px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#EEF1F4" />
                      <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} />
                      <YAxis domain={[4, 8]} tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} />
                      <Line type="monotone" dataKey="sleep" stroke="#1B7A4B" strokeWidth={2} dot={{ fill: '#1B7A4B', r: 3 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Activity */}
              <div className="mb-4">
                <span className="text-[14px] text-[#374151] block mb-2">활동량 (걸음)</span>
                <div className="h-[100px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyData}>
                      <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} />
                      <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} />
                      <Bar dataKey="steps" fill="#E8F5EE" radius={4} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Stress */}
              <div>
                <span className="text-[14px] text-[#374151] block mb-2">스트레스/피로 추세</span>
                <div className="h-[100px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#EEF1F4" />
                      <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} />
                      <YAxis domain={[30, 70]} tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} />
                      <Line type="monotone" dataKey="stress" stroke="#F59E0B" strokeWidth={2} dot={{ fill: '#F59E0B', r: 3 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Best activity */}
            <div className="bg-white rounded-[16px] p-5 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
              <h3 className="text-[15px] text-[#111827] mb-2">이번 주 가장 도움이 된 활동</h3>
              <div className="flex flex-col gap-2">
                {['가벼운 산책 20분 (3회 완료)', '호흡 명상 10분 (5회 완료)', '스트레칭 8분 (4회 완료)'].map((a, i) => (
                  <div key={i} className="flex items-center gap-2 text-[13px] text-[#374151]">
                    <span className="w-5 h-5 bg-[#E8F5EE] rounded-full flex items-center justify-center text-[11px] text-[#1B7A4B]">{i + 1}</span>
                    {a}
                  </div>
                ))}
              </div>
            </div>

            {/* Next week goal */}
            <div className="bg-white rounded-[16px] p-5 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
              <h3 className="text-[15px] text-[#111827] mb-2">다음 주 한 가지 목표</h3>
              <button className="w-full h-[48px] bg-[#1B7A4B] text-white rounded-[14px] text-[15px]">
                수면 규칙성 유지 (11시 전 취침)
              </button>
            </div>

            {/* Weekly detail insight link */}
            <button
              onClick={() => navigate('/daily/weekly-insight')}
              className="w-full h-[44px] border border-[#1B7A4B] text-[#1B7A4B] rounded-[14px] text-[14px] flex items-center justify-center gap-1"
            >
              주간 인사이트 자세히 보기 <ChevronRight size={14} />
            </button>

            {/* Camp CTA */}
            <CampCTABanner />
          </div>
        )}

        {/* ===== MONTHLY RHYTHM ===== */}
        {topSegment === 'monthly' && (
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-[16px] p-5 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
              <h3 className="text-[16px] text-[#111827] mb-1">2월 리듬 요약</h3>
              <p className="text-[13px] text-[#6B7280] mb-4">월간 추세</p>

              <div className="h-[140px] mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <XAxis dataKey="week" tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} />
                    <Bar dataKey="rhythm" fill="#1B7A4B" radius={6} barSize={32} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-[#E8F5EE] rounded-[12px] p-3 text-[13px] text-[#0E4B2E]">
                리듬 안정도가 55에서 68로 개선되었어요. 수면 규칙성과 걷기 습관이 가장 큰 기여를 했어요.
              </div>
            </div>

            <div className="bg-white rounded-[16px] p-5 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
              <h3 className="text-[15px] text-[#111827] mb-3">좋아진 점</h3>
              <ul className="text-[13px] text-[#374151] space-y-1 mb-4">
                <li>✔ 수면 규칙성이 향상되었어요</li>
                <li>✔ 주간 활동량이 꾸준히 유지되고 있어요</li>
                <li>✔ 스트레스 지수가 전반적으로 낮아졌어요</li>
              </ul>
              <h3 className="text-[15px] text-[#111827] mb-3">유지할 점</h3>
              <ul className="text-[13px] text-[#374151] space-y-1">
                <li>· 아침 산책 습관을 이어가 보세요</li>
                <li>· 저녁 명상을 꾸준히 하면 도움이 될 수 있어요</li>
              </ul>
            </div>

            <div className="bg-white rounded-[16px] p-5 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
              <h3 className="text-[15px] text-[#111827] mb-3">다음 달 추천 루틴</h3>
              {[{ time: '아침', activity: '스트레칭 10분 + 산책 15분' }, { time: '낮', activity: '두뇌 놀이 5분' }, { time: '저녁', activity: '호흡 명상 10분' }].map(r => (
                <div key={r.time} className="flex items-center gap-3 py-2 border-b border-[#EEF1F4] last:border-0">
                  <span className="w-8 text-[13px] text-[#6B7280]">{r.time}</span>
                  <span className="text-[14px] text-[#374151]">{r.activity}</span>
                </div>
              ))}
            </div>

            <button className="w-full h-[44px] border border-[#1B7A4B] text-[#1B7A4B] rounded-[14px] text-[14px] flex items-center justify-center gap-2">
              <Share2 size={16} /> PDF로 공유
            </button>

            <CampCTABanner />
          </div>
        )}
      </div>
    </div>
  );
}