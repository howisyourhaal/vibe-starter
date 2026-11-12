import React from 'react';
import { TickerData } from '../types/market';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface TickerMarqueeProps {
  tickers: TickerData[];
  onSelectTicker: (ticker: TickerData) => void;
}

export const TickerMarquee: React.FC<TickerMarqueeProps> = ({ tickers, onSelectTicker }) => {
  // Use a curated set of prominent global benchmarks
  const marqueeSymbols = ['SPX', 'NDX', 'DJI', 'BTCUSD', 'ETHUSD', 'EURUSD', 'GC1!', 'US10Y', 'CL1!'];
  const marqueeTickers = marqueeSymbols
    .map((sym) => tickers.find((t) => t.symbol === sym))
    .filter(Boolean) as TickerData[];

  return (
    <div className="bg-white border-b border-[#E0E3EB] overflow-hidden py-2 text-xs">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar scroll-smooth">
          <div className="flex items-center gap-2 text-[#787B86] shrink-0 font-medium text-[11px] uppercase tracking-wider pr-2 border-r border-[#E0E3EB]">
            <span className="w-2 h-2 rounded-full bg-[#089981] animate-pulse" />
            Live Market
          </div>

          <div className="flex items-center gap-4 shrink-0">
            {marqueeTickers.map((t) => {
              const isPositive = t.changePercent >= 0;
              return (
                <button
                  key={t.symbol}
                  onClick={() => onSelectTicker(t)}
                  className="flex items-center gap-2 py-1 px-2.5 rounded hover:bg-[#F0F3FA] transition-colors cursor-pointer group shrink-0"
                >
                  <span className="font-semibold text-[#131722] group-hover:text-[#2962FF] transition-colors">
                    {t.symbol}
                  </span>
                  <span className="text-[#131722] tabular-nums font-mono-numbers">
                    {t.price > 1000
                      ? t.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                      : t.price.toFixed(t.price < 2 ? 4 : 2)}
                  </span>
                  <span
                    className={`flex items-center text-[11px] font-semibold tabular-nums ${
                      isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                    }`}
                  >
                    {isPositive ? (
                      <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3 stroke-[2.5]" />
                    )}
                    {isPositive ? '+' : ''}
                    {t.changePercent.toFixed(2)}%
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
