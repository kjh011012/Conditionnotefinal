import { ExternalLink, ShoppingCart, Leaf } from 'lucide-react';

interface MealIdeaCardProps {
  type: '아침' | '점심' | '저녁';
  title: string;
  point: string;
  ingredients?: string[];
  hasYoutubeRecipe?: boolean;
}

export function MealIdeaCard({ type, title, point, ingredients, hasYoutubeRecipe }: MealIdeaCardProps) {
  const timeEmoji = { '아침': '🌅', '점심': '☀️', '저녁': '🌙' };

  return (
    <div className="bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[18px]">{timeEmoji[type]}</span>
        <span className="text-[15px] text-[#111827]">{type}</span>
      </div>
      <h4 className="text-[14px] text-[#374151] mb-2">{title}</h4>
      <div className="flex items-center gap-1.5 bg-[#E8F5EE] rounded-[10px] px-3 py-2 mb-3">
        <Leaf size={13} className="text-[#1B7A4B]" />
        <span className="text-[12px] text-[#1B7A4B]">{point}</span>
      </div>

      {ingredients && ingredients.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {ingredients.map((item, i) => (
            <span key={i} className="bg-[#F7F8FA] text-[#6B7280] px-2 py-0.5 rounded-full text-[11px]">
              {item}
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        {hasYoutubeRecipe && (
          <button className="flex-1 h-[38px] border border-[#EF4444] text-[#EF4444] rounded-[10px] text-[12px] flex items-center justify-center gap-1">
            레시피 영상 <ExternalLink size={12} />
          </button>
        )}
        {ingredients && (
          <button className="flex-1 h-[38px] border border-[#E5E7EB] text-[#6B7280] rounded-[10px] text-[12px] flex items-center justify-center gap-1">
            <ShoppingCart size={12} /> 장보기 메모
          </button>
        )}
      </div>
    </div>
  );
}
