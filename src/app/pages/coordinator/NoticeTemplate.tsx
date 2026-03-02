/**
 * C-Camp-Comm-01_NoticeTemplate
 * 참가자에게 안내할 문구 템플릿(복사 버튼)
 * 채팅/커뮤니티 기능 없이 "안내 텍스트 템플릿" 수준으로만
 */
import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  ArrowLeft, Copy, Check, MessageSquare,
  Clock, Activity, Utensils, TreePine,
  Moon, Brain, Heart, FileText, Search,
} from 'lucide-react';
import { useToast } from '../../components/ui/AppToast';

interface Template {
  id: string;
  category: string;
  categoryIcon: any;
  categoryColor: string;
  title: string;
  message: string;
  timing?: string;
}

const templates: Template[] = [
  {
    id: 't1',
    category: '측정',
    categoryIcon: Activity,
    categoryColor: '#FF8A3D',
    title: '스트레스 측정 안내',
    message: '지금 스트레스 측정하실 차례예요. QR 화면을 보여주세요. 측정은 약 2분 정도 걸려요.',
    timing: '측정 시작 5분 전',
  },
  {
    id: 't2',
    category: '측정',
    categoryIcon: Heart,
    categoryColor: '#FF8A3D',
    title: '마음 체크 안내',
    message: '마음 체크 시간이에요. 앱에서 "체크" 탭을 눌러 주세요. 어렵지 않아요, 느낌대로 골라주시면 돼요.',
    timing: '체크 시작 시',
  },
  {
    id: 't3',
    category: '측정',
    categoryIcon: Brain,
    categoryColor: '#FF8A3D',
    title: '두뇌 놀이 안내',
    message: '두뇌 놀이 시간이에요. 간단한 게임이니 편하게 해주세요. 점수가 중요한 게 아니라, 변화를 보기 위한 거예요.',
    timing: '놀이체크 시작 시',
  },
  {
    id: 't4',
    category: '일정',
    categoryIcon: Clock,
    categoryColor: '#1B7A4B',
    title: '프로그램 시작 안내',
    message: '잠시 후 [프로그램명]이 시작됩니다. [장소]로 이동해 주세요. 편한 옷과 신발을 준비해 주세요.',
    timing: '시작 10분 전',
  },
  {
    id: 't5',
    category: '일정',
    categoryIcon: TreePine,
    categoryColor: '#1B7A4B',
    title: '산책 프로그램 안내',
    message: '숲길 산책 시간이에요. 오늘은 [코스명]을 걸어요. 중간에 쉼터가 있으니 무리하지 마세요. 물병을 가져오세요.',
    timing: '산책 시작 전',
  },
  {
    id: 't6',
    category: '식사',
    categoryIcon: Utensils,
    categoryColor: '#22C55E',
    title: '식사 안내',
    message: '[아침/점심/저녁] 식사 시간이에요. 식당으로 이동해 주세요. 오늘 식단은 [메뉴]입니다.',
    timing: '식사 30분 전',
  },
  {
    id: 't7',
    category: '기상/취침',
    categoryIcon: Moon,
    categoryColor: '#7C3AED',
    title: '취침 안내',
    message: '오늘 하루 수고하셨어요. 내일을 위해 편히 주무세요. 워치를 착용한 채 주무시면 수면이 기록돼요.',
    timing: '취침 30분 전',
  },
  {
    id: 't8',
    category: '리포트',
    categoryIcon: FileText,
    categoryColor: '#FF8A3D',
    title: '재측정 안내 (마지막 날)',
    message: '오늘이 마지막 날이에요. 최종 리포트를 위해 3가지 재측정이 필요해요. 시간은 약 15분 정도 걸려요.',
    timing: '마지막 날 오전',
  },
  {
    id: 't9',
    category: '리포트',
    categoryIcon: FileText,
    categoryColor: '#FF8A3D',
    title: '리포트 발급 안내',
    message: '캠프 리포트가 준비되었어요. 앱 "리포트" 탭에서 확인할 수 있어요. PDF로 저장하거나 보호자에게 공유할 수 있어요.',
    timing: '리포트 생성 후',
  },
];

const categories = ['전체', '측정', '일정', '식사', '기상/취침', '리포트'];

export function NoticeTemplate() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [activeCategory, setActiveCategory] = useState('전체');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTemplates = templates.filter(t => {
    const matchesCategory = activeCategory === '전체' || t.category === activeCategory;
    const matchesSearch = searchQuery === '' ||
      t.title.includes(searchQuery) ||
      t.message.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  const copyMessage = (template: Template) => {
    navigator.clipboard?.writeText(template.message).catch(() => {});
    setCopiedId(template.id);
    showToast('success', '안내 문구를 복사했어요');
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 h-[56px] bg-white border-b border-[#EEF1F4]">
        <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center">
          <ArrowLeft size={22} className="text-[#374151]" />
        </button>
        <div>
          <h2 className="text-[18px] text-[#111827]">안내 문구 템플릿</h2>
          <span className="text-[11px] text-[#9CA3AF]">코디네이터 · 현장 운영</span>
        </div>
      </div>

      {/* Search */}
      <div className="px-4 pt-3 pb-2 bg-white border-b border-[#EEF1F4]">
        <div className="flex items-center gap-2 bg-[#F7F8FA] rounded-[10px] px-3 h-[40px]">
          <Search size={14} className="text-[#9CA3AF]" />
          <input
            type="text"
            placeholder="안내 문구 검색"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none text-[14px] text-[#374151] placeholder:text-[#9CA3AF]"
          />
        </div>
      </div>

      {/* Category chips */}
      <div className="px-4 py-2 bg-white border-b border-[#EEF1F4] overflow-x-auto">
        <div className="flex gap-2 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-[12px] transition-all ${
                activeCategory === cat
                  ? 'bg-[#1B7A4B] text-white'
                  : 'bg-[#F7F8FA] text-[#6B7280] border border-[#E5E7EB]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pt-4 pb-8">
        {/* Info */}
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare size={14} className="text-[#6B7280]" />
          <span className="text-[13px] text-[#6B7280]">
            복사 후 메신저/방송으로 전달하세요
          </span>
        </div>

        {/* Template list */}
        <div className="flex flex-col gap-3">
          {filteredTemplates.map(template => {
            const CategoryIcon = template.categoryIcon;
            const isCopied = copiedId === template.id;

            return (
              <div
                key={template.id}
                className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)]"
              >
                {/* Category + title */}
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${template.categoryColor}15` }}
                  >
                    <CategoryIcon size={12} style={{ color: template.categoryColor }} />
                  </div>
                  <span className="text-[11px] text-[#9CA3AF]">{template.category}</span>
                  {template.timing && (
                    <span className="text-[10px] text-[#9CA3AF] bg-[#F7F8FA] px-1.5 py-0.5 rounded ml-auto">
                      {template.timing}
                    </span>
                  )}
                </div>

                <h4 className="text-[15px] text-[#111827] mb-2">{template.title}</h4>

                {/* Message */}
                <div className="bg-[#F7F8FA] rounded-[10px] p-3 mb-3">
                  <p className="text-[14px] text-[#374151] leading-[20px]">
                    {template.message}
                  </p>
                </div>

                {/* Copy button */}
                <button
                  onClick={() => copyMessage(template)}
                  className={`w-full h-[40px] rounded-[10px] text-[13px] flex items-center justify-center gap-1.5 transition-all ${
                    isCopied
                      ? 'bg-[#E8F5EE] text-[#1B7A4B]'
                      : 'border border-[#E5E7EB] text-[#374151]'
                  }`}
                >
                  {isCopied ? (
                    <><Check size={14} /> 복사 완료</>
                  ) : (
                    <><Copy size={14} /> 문구 복사</>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare size={32} className="text-[#D1D5DB] mx-auto mb-3" />
            <p className="text-[14px] text-[#6B7280]">검색 결과가 없어요</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('전체'); }}
              className="text-[13px] text-[#1B7A4B] mt-2"
            >
              전체 보기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
