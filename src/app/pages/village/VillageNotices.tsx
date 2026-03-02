/**
 * V-P5. 공지 (참가자) + V-P6. 문의/건의
 */
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useVillage } from '../../context/VillageContext';
import { ContextBar } from '../../components/ui/ContextBar';
import { ChevronLeft, Pin, MessageCircle, ChevronRight } from 'lucide-react';

const notices = [
  { id: '1', title: '3월 캠프 오리엔테이션 안내', date: '03.10', pinned: true, commentCount: 3, preview: '참가자 여러분 안녕하세요. 오리엔테이션 일정을 안내드립니다...' },
  { id: '2', title: '3/3(월) 저녁 메뉴 변경 안내', date: '03.02', pinned: false, commentCount: 1, preview: '식단 변경 사항을 공유드립니다.' },
  { id: '3', title: '숲길 걷기 준비물 안내', date: '03.01', pinned: false, commentCount: 0, preview: '편한 운동화 착용을 권장합니다.' },
  { id: '4', title: '숙소 이용 규칙 안내', date: '02.28', pinned: false, commentCount: 2, preview: '쾌적한 환경을 위해 협조 부탁드립니다.' },
];

export function VillageNotices() {
  const navigate = useNavigate();
  const { activeVillage } = useVillage();
  const color = activeVillage?.primaryColor || '#1B7A4B';

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <ContextBar />
      <div className="flex items-center gap-3 px-4 h-[56px] bg-white border-b border-[#EEF1F4]">
        <button onClick={() => navigate('/village')} className="w-10 h-10 flex items-center justify-center rounded-full active:bg-[#F3F4F6]">
          <ChevronLeft size={22} className="text-[#374151]" />
        </button>
        <h2 className="text-[16px] text-[#111827]">공지사항</h2>
      </div>

      <div className="px-4 pt-4 pb-8 flex flex-col gap-2">
        {notices.map(n => (
          <button key={n.id} className="w-full bg-white rounded-[14px] p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)] text-left active:scale-[0.98] transition-transform">
            <div className="flex items-start gap-2 mb-1">
              {n.pinned && <Pin size={12} style={{ color }} className="shrink-0 mt-0.5" />}
              <span className="text-[14px] text-[#111827] flex-1">{n.title}</span>
              <span className="text-[10px] text-[#9CA3AF] shrink-0">{n.date}</span>
            </div>
            <span className="text-[12px] text-[#6B7280] block mb-2 line-clamp-1">{n.preview}</span>
            {n.commentCount > 0 && (
              <div className="flex items-center gap-1 text-[10px] text-[#9CA3AF]">
                <MessageCircle size={10} /> 댓글 {n.commentCount}개
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
