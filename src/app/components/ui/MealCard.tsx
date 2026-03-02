import { Utensils, Heart } from 'lucide-react';

interface MealCardProps {
  type: '아침' | '점심' | '저녁';
  menu: string[];
  healingPoint: string;
  imageUrl?: string;
}

export function MealCard({ type, menu, healingPoint, imageUrl }: MealCardProps) {
  const timeEmoji = { '아침': '🌅', '점심': '☀️', '저녁': '🌙' };

  return (
    <div className="bg-white rounded-[16px] overflow-hidden shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
      {imageUrl && (
        <div className="h-[120px] overflow-hidden">
          <img src={imageUrl} alt={type} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[16px]">{timeEmoji[type]}</span>
          <span className="text-[15px] text-[#111827]">{type}</span>
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
          {menu.map((item, i) => (
            <span key={i} className="text-[13px] text-[#374151]">
              {item}{i < menu.length - 1 ? ' · ' : ''}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-1.5 bg-[#E8F5EE] rounded-[10px] px-3 py-2">
          <Heart size={14} className="text-[#1B7A4B]" />
          <span className="text-[12px] text-[#1B7A4B]">{healingPoint}</span>
        </div>
      </div>
    </div>
  );
}
