import React from 'react';
import { NewsItem, TickerData } from '../types/market';
import { Newspaper, ExternalLink } from 'lucide-react';

interface NewsSectionProps {
  news: NewsItem[];
  allTickers: TickerData[];
  onSelectTicker: (ticker: TickerData) => void;
}

export const NewsSection: React.FC<NewsSectionProps> = ({
  news,
  allTickers,
  onSelectTicker,
}) => {
  return (
    <div className="bg-white rounded-xl border border-[#E0E3EB] p-5 shadow-2xs space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Newspaper className="w-5 h-5 text-[#2962FF]" />
          <div>
            <h3 className="text-base font-bold text-[#131722]">
              Market News & Top Stories
            </h3>
            <p className="text-xs text-[#787B86]">
              Real-time headlines and macro commentary shaping global assets
            </p>
          </div>
        </div>
      </div>

      <div className="divide-y divide-[#E0E3EB]">
        {news.map((item) => (
          <div key={item.id} className="py-3.5 first:pt-0 last:pb-0 space-y-2">
            <div className="flex items-start justify-between gap-4">
              <h4 className="text-xs sm:text-sm font-semibold text-[#131722] hover:text-[#2962FF] transition-colors cursor-pointer leading-snug">
                {item.title}
              </h4>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#787B86]">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#434656]">{item.source}</span>
                <span>·</span>
                <span>{item.timeAgo}</span>
              </div>

              {/* Ticker pills */}
              <div className="flex items-center gap-1.5">
                {item.tickers.map((sym) => {
                  const tickerObj = allTickers.find((t) => t.symbol === sym);
                  return (
                    <button
                      key={sym}
                      onClick={() => {
                        if (tickerObj) onSelectTicker(tickerObj);
                      }}
                      className="px-2 py-0.5 bg-[#F0F3FA] hover:bg-[#2962FF]/10 text-[#2962FF] font-bold rounded text-[10px] transition-colors cursor-pointer font-mono-numbers"
                    >
                      ${sym}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
