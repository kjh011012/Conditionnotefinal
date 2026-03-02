import { Clock, MapPin, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

interface ProgramCardProps {
  time: string;
  name: string;
  intensity: '가벼움' | '보통' | '활발';
  location: string;
  checked?: boolean;
}

export function ProgramCard({ time, name, intensity, location, checked = false }: ProgramCardProps) {
  const [isChecked, setIsChecked] = useState(checked);

  const intensityColor = {
    '가벼움': 'bg-[#DCFCE7] text-[#15803D]',
    '보통': 'bg-[#FEF9C3] text-[#A16207]',
    '활발': 'bg-[#FFF1E8] text-[#EA580C]',
  };

  return (
    <div className={`bg-white rounded-[16px] p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)] ${isChecked ? 'border border-[#1B7A4B]' : ''}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Clock size={14} className="text-[#6B7280]" />
            <span className="text-[13px] text-[#6B7280]">{time}</span>
            <span className={`px-2 py-0.5 rounded-full text-[11px] ${intensityColor[intensity]}`}>
              {intensity}
            </span>
          </div>
          <h4 className="text-[15px] text-[#111827] mb-1">{name}</h4>
          <div className="flex items-center gap-1 text-[12px] text-[#6B7280]">
            <MapPin size={12} />
            {location}
          </div>
        </div>
        <button
          onClick={() => setIsChecked(!isChecked)}
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            isChecked ? 'bg-[#1B7A4B] text-white' : 'bg-[#EEF1F4] text-[#6B7280]'
          }`}
        >
          <CheckCircle2 size={20} />
        </button>
      </div>
    </div>
  );
}
