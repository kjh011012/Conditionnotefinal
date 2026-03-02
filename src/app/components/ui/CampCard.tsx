import { Calendar, Utensils, Activity, FileText, Star, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface CampCardProps {
  name: string;
  duration: string;
  location: string;
  imageUrl: string;
  price: string;
  rating: number;
  reviewCount: number;
  includes: string[];
  onDetail?: () => void;
}

export function CampCard({ name, duration, location, imageUrl, price, rating, reviewCount, includes, onDetail }: CampCardProps) {
  return (
    <div className="bg-white rounded-[16px] overflow-hidden shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
      <div className="h-[160px] relative overflow-hidden">
        <ImageWithFallback src={imageUrl} alt={name} className="w-full h-full object-cover" />
        <div className="absolute top-3 right-3 bg-white/90 px-2.5 py-1 rounded-full text-[13px] text-[#111827]">
          {price}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-[16px] text-[#111827] mb-1">{name}</h3>
        <div className="flex items-center gap-2 text-[13px] text-[#6B7280] mb-3">
          <Calendar size={13} /> {duration}
          <span>·</span>
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-1 mb-3">
          <Star size={14} className="text-[#F59E0B] fill-[#F59E0B]" />
          <span className="text-[13px] text-[#374151]">{rating}</span>
          <span className="text-[12px] text-[#9CA3AF]">({reviewCount}개 후기)</span>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {includes.map((item, i) => (
            <span key={i} className="bg-[#F7F8FA] text-[#6B7280] px-2 py-0.5 rounded-full text-[11px]">
              {item}
            </span>
          ))}
        </div>
        <button
          onClick={onDetail}
          className="w-full h-[44px] bg-[#1B7A4B] text-white rounded-[14px] text-[14px] flex items-center justify-center gap-1"
        >
          상세 보기 <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
