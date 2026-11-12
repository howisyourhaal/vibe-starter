import React, { useState, useEffect, useRef } from 'react';
import { TickerData } from '../types/market';
import { CompanyLogo } from './CompanyLogo';
import { Search, X, ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  tickers: TickerData[];
  onSelectTicker: (ticker: TickerData) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  tickers,
  onSelectTicker,
}) => {
  const [query, setQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  const filteredTickers = tickers.filter((t) => {
    const matchesCategory = filterCategory === 'all' || t.category === filterCategory;
    const q = query.toLowerCase();
    const matchesQuery =
      t.symbol.toLowerCase().includes(q) ||
      t.name.toLowerCase().includes(q) ||
      (t.sector && t.sector.toLowerCase().includes(q));
    return matchesCategory && matchesQuery;
  });

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < filteredTickers.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
      } else if (e.key === 'Enter' && filteredTickers[selectedIndex]) {
        e.preventDefault();
        onSelectTicker(filteredTickers[selectedIndex]);
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredTickers, selectedIndex, onSelectTicker, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl border border-[#E0E3EB] shadow-2xl w-full max-w-xl overflow-hidden animate-fadeIn">
        {/* Search Input Bar */}
        <div className="p-3.5 border-b border-[#E0E3EB] flex items-center gap-3 bg-white">
          <Search className="w-5 h-5 text-[#787B86] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search symbol, company, crypto, or forex (e.g., NVDA, BTC, S&P)..."
            className="w-full text-sm font-medium text-[#131722] placeholder:text-[#787B86] outline-hidden bg-transparent"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-[#787B86] hover:text-[#131722] p-1"
            >
              ✕
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded text-[#787B86] hover:text-[#131722]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="px-4 py-2 bg-[#FAF9FF] border-b border-[#E0E3EB] flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
          {[
            { id: 'all', label: 'All' },
            { id: 'us-stocks', label: 'US Stocks' },
            { id: 'world-stocks', label: 'World' },
            { id: 'crypto', label: 'Crypto' },
            { id: 'futures', label: 'Futures' },
            { id: 'forex', label: 'Forex' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setFilterCategory(cat.id);
                setSelectedIndex(0);
              }}
              className={`px-2.5 py-1 rounded-full font-medium transition-colors cursor-pointer whitespace-nowrap ${
                filterCategory === cat.id
                  ? 'bg-[#131722] text-white shadow-2xs'
                  : 'text-[#787B86] hover:bg-[#F0F3FA] hover:text-[#131722]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto divide-y divide-[#E0E3EB]">
          {filteredTickers.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#787B86]">
              No instruments match "{query}". Try searching for popular tickers like NVDA, AAPL, SPX, BTC.
            </div>
          ) : (
            filteredTickers.map((t, idx) => {
              const isSelected = idx === selectedIndex;
              const isPositive = t.changePercent >= 0;

              return (
                <div
                  key={t.symbol}
                  onClick={() => {
                    onSelectTicker(t);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`p-3 flex items-center justify-between cursor-pointer transition-colors ${
                    isSelected ? 'bg-[#F0F3FA]' : 'hover:bg-[#FAF9FF]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CompanyLogo
                      symbol={t.symbol}
                      name={t.name}
                      logoUrl={t.logoUrl}
                      size="md"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#131722] text-xs">{t.symbol}</span>
                        <span className="text-[10px] bg-[#E0E3EB]/70 text-[#434656] px-1.5 py-0.2 rounded font-medium">
                          {t.exchange}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#787B86] truncate max-w-xs">
                        {t.name}
                      </div>
                    </div>
                  </div>

                  <div className="text-right font-mono-numbers">
                    <div className="text-xs font-bold text-[#131722]">
                      ${t.price > 1000 ? t.price.toLocaleString() : t.price.toFixed(t.price < 2 ? 4 : 2)}
                    </div>
                    <div
                      className={`text-[11px] font-semibold flex items-center justify-end gap-0.5 ${
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
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-2.5 bg-[#FAF9FF] border-t border-[#E0E3EB] flex items-center justify-between text-[11px] text-[#787B86]">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>Esc Close</span>
          </div>
          <span>TradingView Fast Search</span>
        </div>
      </div>
    </div>
  );
};
