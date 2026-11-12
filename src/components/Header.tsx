import React from 'react';
import { Search, Bookmark, TrendingUp } from 'lucide-react';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenWatchlist: () => void;
  watchlistCount: number;
  activeNavTab: string;
  setActiveNavTab: (tab: string) => void;
  onOpenGetStarted: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenWatchlist,
  watchlistCount,
  activeNavTab,
  setActiveNavTab,
  onOpenGetStarted
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E0E3EB]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 h-16 flex items-center justify-between gap-4 md:gap-8">
        
        {/* Zone 1: Single element brand wordmark */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-[#2962FF] flex items-center justify-center text-white shadow-sm">
            <TrendingUp className="w-5 h-5 stroke-[2.4]" />
          </div>
          <span className="text-xl font-bold tracking-tight text-[#131722] whitespace-nowrap">
            TradingView
          </span>
          <span className="hidden sm:inline-block text-xs font-semibold px-2 py-0.5 rounded bg-[#F0F3FA] text-[#787B86] border border-[#E0E3EB]">
            Markets
          </span>
        </div>

        {/* Zone 2: 4-5 clean single-line navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-[14px] font-medium text-[#787B86]">
          {[
            { id: 'markets', label: 'Markets' },
            { id: 'screeners', label: 'Screeners' },
            { id: 'heatmaps', label: 'Heatmaps' },
            { id: 'community', label: 'Community' },
            { id: 'news', label: 'News' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveNavTab(item.id)}
              className={`transition-colors py-1 relative whitespace-nowrap shrink-0 hover:text-[#131722] cursor-pointer ${
                activeNavTab === item.id ? 'text-[#131722] font-semibold' : ''
              }`}
            >
              {item.label}
              {activeNavTab === item.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2962FF] rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Zone 3: Global Search, Watchlist, and 1 Primary CTA */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Global Search Input Trigger */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2.5 px-3.5 py-1.5 bg-[#F0F3FA] hover:bg-[#ebedfa] border border-transparent focus:border-[#2962FF] rounded-full text-xs font-normal text-[#787B86] transition-all cursor-pointer group"
            title="Search tickers, stocks, crypto (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 text-[#787B86] group-hover:text-[#131722] transition-colors" />
            <span className="hidden sm:inline text-[#787B86] group-hover:text-[#131722]">
              Search
            </span>
            <kbd className="hidden sm:inline-flex items-center text-[10px] bg-white border border-[#E0E3EB] rounded px-1.5 py-0.5 text-[#787B86] font-mono shadow-2xs">
              Ctrl+K
            </kbd>
          </button>

          {/* Watchlist Toggle Button */}
          <button
            onClick={onOpenWatchlist}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#131722] hover:bg-[#F0F3FA] transition-colors cursor-pointer relative border border-[#E0E3EB]"
            title="Open Watchlist"
          >
            <Bookmark className="w-3.5 h-3.5 text-[#2962FF] fill-[#2962FF]/10" />
            <span className="hidden md:inline">Watchlist</span>
            {watchlistCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#2962FF] text-white text-[10px] font-bold flex items-center justify-center">
                {watchlistCount}
              </span>
            )}
          </button>

          {/* Primary Action Button */}
          <button
            onClick={onOpenGetStarted}
            className="px-4 md:px-5 py-2 text-xs md:text-sm font-semibold text-white bg-[#131722] hover:bg-black rounded-full transition-all active:scale-95 shadow-sm whitespace-nowrap cursor-pointer"
          >
            Get started
          </button>
        </div>

      </div>
    </header>
  );
};
