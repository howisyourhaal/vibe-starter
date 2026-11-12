import React from 'react';
import { Gauge, ArrowUp, ArrowDown, Activity, BarChart3 } from 'lucide-react';

export const MarketBreadth: React.FC = () => {
  const advancing = 338;
  const declining = 156;
  const unchanged = 12;
  const total = advancing + declining + unchanged;
  const advancePercent = Math.round((advancing / total) * 100);
  const declinePercent = Math.round((declining / total) * 100);

  const fearGreedValue = 68; // Greed
  const fearGreedLabel = 'Greed';

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Advance / Decline Ratio */}
      <div className="bg-white rounded-xl border border-[#E0E3EB] p-4 shadow-2xs">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#2962FF]" />
            <h4 className="text-xs font-bold text-[#131722] uppercase tracking-wider">
              Market Breadth (S&P 500)
            </h4>
          </div>
          <span className="text-[11px] font-semibold text-[#089981]">
            +{advancing - declining} Net Advancers
          </span>
        </div>

        <div className="flex items-baseline justify-between text-xs font-mono-numbers mb-1.5">
          <span className="text-[#089981] font-bold flex items-center gap-1">
            <ArrowUp className="w-3.5 h-3.5" /> {advancing} Advancing ({advancePercent}%)
          </span>
          <span className="text-[#F23645] font-bold flex items-center gap-1">
            <ArrowDown className="w-3.5 h-3.5" /> {declining} Declining ({declinePercent}%)
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 rounded-full overflow-hidden flex bg-[#E0E3EB]">
          <div
            className="h-full bg-[#089981] transition-all duration-500"
            style={{ width: `${advancePercent}%` }}
          />
          <div
            className="h-full bg-[#F23645] transition-all duration-500"
            style={{ width: `${declinePercent}%` }}
          />
        </div>
      </div>

      {/* Fear & Greed Index */}
      <div className="bg-white rounded-xl border border-[#E0E3EB] p-4 shadow-2xs">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Gauge className="w-4 h-4 text-[#2962FF]" />
            <h4 className="text-xs font-bold text-[#131722] uppercase tracking-wider">
              Fear & Greed Index
            </h4>
          </div>
          <span className="text-[11px] font-bold text-[#089981] bg-[#089981]/10 px-2 py-0.5 rounded-full">
            {fearGreedLabel}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-black text-[#131722] font-mono-numbers">
              {fearGreedValue}
              <span className="text-xs font-normal text-[#787B86] ml-1">/ 100</span>
            </div>
            <div className="text-[11px] text-[#787B86]">Previous Close: 65</div>
          </div>

          <div className="w-28 space-y-1">
            <div className="flex justify-between text-[10px] text-[#787B86]">
              <span>Extreme Fear</span>
              <span>Extreme Greed</span>
            </div>
            <div className="h-2 rounded-full bg-gradient-to-r from-[#F23645] via-amber-400 to-[#089981] relative">
              <div
                className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white border-2 border-[#131722] shadow-xs"
                style={{ left: `calc(${fearGreedValue}% - 7px)` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 52-Week Range & Volume Overview */}
      <div className="bg-white rounded-xl border border-[#E0E3EB] p-4 shadow-2xs">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-[#2962FF]" />
            <h4 className="text-xs font-bold text-[#131722] uppercase tracking-wider">
              NYSE & NASDAQ Volume
            </h4>
          </div>
          <span className="text-[11px] text-[#787B86]">Today vs 30D Avg</span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <div className="text-[11px] text-[#787B86]">Total Composite Vol</div>
            <div className="font-bold text-[#131722] font-mono-numbers text-base">11.42B</div>
            <div className="text-[10px] text-[#089981] font-semibold">+8.4% above avg</div>
          </div>
          <div>
            <div className="text-[11px] text-[#787B86]">52-Wk Highs / Lows</div>
            <div className="font-bold text-[#131722] font-mono-numbers text-base">
              <span className="text-[#089981]">142</span> / <span className="text-[#F23645]">19</span>
            </div>
            <div className="text-[10px] text-[#787B86]">Broad expansion</div>
          </div>
        </div>
      </div>
    </div>
  );
};
