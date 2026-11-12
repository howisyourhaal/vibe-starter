import React from 'react';
import { TickerData } from '../types/market';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface IndexCardsProps {
  indices: TickerData[];
  onSelectIndex: (index: TickerData) => void;
  selectedSymbol?: string;
}

export const IndexCards: React.FC<IndexCardsProps> = ({
  indices,
  onSelectIndex,
  selectedSymbol
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {indices.map((idx) => {
        const isPositive = idx.changePercent >= 0;
        const isSelected = selectedSymbol === idx.symbol;

        // Render mini SVG sparkline
        const minVal = Math.min(...idx.sparkline);
        const maxVal = Math.max(...idx.sparkline);
        const range = maxVal - minVal || 1;
        const width = 120;
        const height = 40;
        
        const points = idx.sparkline
          .map((val, i) => {
            const x = (i / (idx.sparkline.length - 1)) * width;
            const y = height - ((val - minVal) / range) * (height - 8) - 4;
            return `${x.toFixed(1)},${y.toFixed(1)}`;
          })
          .join(' ');

        const strokeColor = isPositive ? '#089981' : '#F23645';
        const fillColor = isPositive ? 'rgba(8, 153, 129, 0.08)' : 'rgba(242, 54, 69, 0.08)';

        // Area path
        const firstX = 0;
        const lastX = width;
        const areaPoints = `${firstX},${height} ${points} ${lastX},${height}`;

        return (
          <div
            key={idx.symbol}
            onClick={() => onSelectIndex(idx)}
            className={`group relative bg-white rounded-xl p-4 border transition-all duration-200 cursor-pointer ${
              isSelected
                ? 'border-[#2962FF] ring-2 ring-[#2962FF]/15 shadow-sm'
                : 'border-[#E0E3EB] hover:border-[#c3c5d8] hover:bg-[#F8F9FD]'
            }`}
          >
            {/* Top row: Badge and Index Name */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                {/* Circular indicator badge (32px diameter) with saturated color fill & white centered bold number */}
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-extrabold text-[12px] tracking-tight shrink-0 shadow-2xs"
                  style={{ backgroundColor: idx.badgeColor || '#2962FF' }}
                >
                  {idx.badgeNumber}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#131722] group-hover:text-[#2962FF] transition-colors leading-tight">
                    {idx.name}
                  </h3>
                  <span className="text-[11px] text-[#787B86] font-medium">
                    {idx.exchange} · {idx.symbol}
                  </span>
                </div>
              </div>

              {/* Pill percentage change */}
              <div
                className={`inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full tabular-nums ${
                  isPositive
                    ? 'text-[#089981] bg-[#089981]/10'
                    : 'text-[#F23645] bg-[#F23645]/10'
                }`}
              >
                {isPositive ? (
                  <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                ) : (
                  <ArrowDownRight className="w-3.5 h-3.5 stroke-[2.5]" />
                )}
                {isPositive ? '+' : ''}
                {idx.changePercent.toFixed(2)}%
              </div>
            </div>

            {/* Bottom row: Live price and Sparkline */}
            <div className="flex items-end justify-between mt-2 pt-1">
              <div>
                <div className="text-xl font-bold text-[#131722] tabular-nums font-mono-numbers tracking-tight">
                  {idx.price.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
                <div className="text-[11px] text-[#787B86] tabular-nums mt-0.5">
                  <span className={isPositive ? 'text-[#089981] font-medium' : 'text-[#F23645] font-medium'}>
                    {isPositive ? '+' : ''}
                    {idx.change.toFixed(2)}
                  </span>{' '}
                  today
                </div>
              </div>

              {/* Sparkline chart SVG */}
              <div className="w-[120px] h-[40px] shrink-0">
                <svg width="120" height="40" className="overflow-visible">
                  <polygon points={areaPoints} fill={fillColor} />
                  <polyline
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={points}
                  />
                </svg>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
