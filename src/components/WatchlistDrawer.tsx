import React from 'react';
import { TickerData } from '../types/market';
import { CompanyLogo } from './CompanyLogo';
import { X, Bookmark, ArrowUpRight, ArrowDownRight, Trash2 } from 'lucide-react';

interface WatchlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  watchlistSymbols: Set<string>;
  allTickers: TickerData[];
  onSelectTicker: (ticker: TickerData) => void;
  onRemoveFromWatchlist: (symbol: string) => void;
}

export const WatchlistDrawer: React.FC<WatchlistDrawerProps> = ({
  isOpen,
  onClose,
  watchlistSymbols,
  allTickers,
  onSelectTicker,
  onRemoveFromWatchlist,
}) => {
  if (!isOpen) return null;

  const watchedTickers = allTickers.filter((t) => watchlistSymbols.has(t.symbol));

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs">
      <div className="w-full max-w-sm bg-white h-full shadow-2xl flex flex-col border-l border-[#E0E3EB] animate-slideInRight">
        {/* Header */}
        <div className="p-4 border-b border-[#E0E3EB] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-[#2962FF] fill-[#2962FF]/10" />
            <h3 className="text-base font-bold text-[#131722]">Watchlist</h3>
            <span className="text-xs bg-[#F0F3FA] text-[#787B86] font-semibold px-2 py-0.5 rounded-full">
              {watchedTickers.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[#F0F3FA] text-[#787B86] hover:text-[#131722] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List of Watchlist items */}
        <div className="flex-1 overflow-y-auto divide-y divide-[#E0E3EB]">
          {watchedTickers.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#787B86] space-y-2">
              <Bookmark className="w-8 h-8 text-[#c3c5d8] mx-auto" />
              <div className="font-semibold text-[#131722]">Your watchlist is empty</div>
              <p>Click the star icon next to any stock, crypto, or index to pin it here for instant monitoring.</p>
            </div>
          ) : (
            watchedTickers.map((t) => {
              const isPositive = t.changePercent >= 0;
              return (
                <div
                  key={t.symbol}
                  onClick={() => {
                    onSelectTicker(t);
                    onClose();
                  }}
                  className="p-3.5 flex items-center justify-between hover:bg-[#F8F9FD] cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <CompanyLogo
                      symbol={t.symbol}
                      name={t.name}
                      logoUrl={t.logoUrl}
                      size="md"
                    />
                    <div>
                      <div className="font-bold text-xs text-[#131722] group-hover:text-[#2962FF] transition-colors">
                        {t.symbol}
                      </div>
                      <div className="text-[11px] text-[#787B86] truncate max-w-[120px]">
                        {t.name}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="text-right font-mono-numbers">
                      <div className="text-xs font-bold text-[#131722]">
                        ${t.price > 1000 ? t.price.toLocaleString() : t.price.toFixed(t.price < 2 ? 4 : 2)}
                      </div>
                      <div
                        className={`text-[10px] font-semibold flex items-center justify-end ${
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
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveFromWatchlist(t.symbol);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1.5 rounded hover:bg-red-50 text-[#787B86] hover:text-[#F23645] transition-all cursor-pointer"
                      title="Remove from Watchlist"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-[#E0E3EB] bg-[#FAF9FF] text-center text-xs text-[#787B86]">
          Real-time watchlist sync enabled
        </div>
      </div>
    </div>
  );
};
