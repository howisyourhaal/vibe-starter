import React, { useState } from 'react';
import { TickerData } from '../types/market';
import { CompanyLogo } from './CompanyLogo';
import { ArrowUpRight, ArrowDownRight, Star, ArrowUpDown, TrendingUp } from 'lucide-react';

interface MarketTableProps {
  tickers: TickerData[];
  onSelectTicker: (ticker: TickerData) => void;
  watchlistSymbols: Set<string>;
  onToggleWatchlist: (symbol: string, e: React.MouseEvent) => void;
  onQuickTrade: (ticker: TickerData, e: React.MouseEvent) => void;
}

type SortField = 'symbol' | 'price' | 'changePercent' | 'volumeRaw' | 'marketCapRaw';
type SortOrder = 'asc' | 'desc';

export const MarketTable: React.FC<MarketTableProps> = ({
  tickers,
  onSelectTicker,
  watchlistSymbols,
  onToggleWatchlist,
  onQuickTrade,
}) => {
  const [sortField, setSortField] = useState<SortField>('marketCapRaw');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const sortedTickers = [...tickers].sort((a, b) => {
    let aVal = a[sortField] ?? 0;
    let bVal = b[sortField] ?? 0;
    if (typeof aVal === 'string') aVal = aVal.toLowerCase();
    if (typeof bVal === 'string') bVal = bVal.toLowerCase();

    if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const getRatingBadge = (rating: string) => {
    switch (rating) {
      case 'Strong Buy':
        return 'text-[#089981] bg-[#089981]/10 font-bold';
      case 'Buy':
        return 'text-[#089981] bg-[#089981]/8 font-medium';
      case 'Strong Sell':
        return 'text-[#F23645] bg-[#F23645]/10 font-bold';
      case 'Sell':
        return 'text-[#F23645] bg-[#F23645]/8 font-medium';
      default:
        return 'text-[#787B86] bg-[#787B86]/10 font-medium';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-[#E0E3EB] overflow-hidden shadow-2xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          {/* Header: Sticky table header with #787B86 medium-weight micro-labels, hairline border-bottom */}
          <thead>
            <tr className="bg-[#FAF9FF] border-b border-[#E0E3EB] text-[#787B86] font-semibold select-none">
              <th className="py-3 px-4 w-10 text-center"></th>
              <th className="py-3 px-4 min-w-[200px]">
                <button
                  onClick={() => handleSort('symbol')}
                  className="flex items-center gap-1 hover:text-[#131722] cursor-pointer"
                >
                  Ticker & Name
                  <ArrowUpDown className="w-3 h-3 opacity-60" />
                </button>
              </th>
              <th className="py-3 px-4 text-right min-w-[110px]">
                <button
                  onClick={() => handleSort('price')}
                  className="inline-flex items-center gap-1 hover:text-[#131722] ml-auto cursor-pointer"
                >
                  Last Price
                  <ArrowUpDown className="w-3 h-3 opacity-60" />
                </button>
              </th>
              <th className="py-3 px-4 text-right min-w-[100px]">Change $</th>
              <th className="py-3 px-4 text-right min-w-[110px]">
                <button
                  onClick={() => handleSort('changePercent')}
                  className="inline-flex items-center gap-1 hover:text-[#131722] ml-auto cursor-pointer"
                >
                  Change %
                  <ArrowUpDown className="w-3 h-3 opacity-60" />
                </button>
              </th>
              <th className="py-3 px-4 text-right hidden sm:table-cell min-w-[90px]">24h High</th>
              <th className="py-3 px-4 text-right hidden sm:table-cell min-w-[90px]">24h Low</th>
              <th className="py-3 px-4 text-right hidden md:table-cell min-w-[100px]">
                <button
                  onClick={() => handleSort('volumeRaw')}
                  className="inline-flex items-center gap-1 hover:text-[#131722] ml-auto cursor-pointer"
                >
                  Volume
                  <ArrowUpDown className="w-3 h-3 opacity-60" />
                </button>
              </th>
              <th className="py-3 px-4 text-right hidden lg:table-cell min-w-[120px]">
                <button
                  onClick={() => handleSort('marketCapRaw')}
                  className="inline-flex items-center gap-1 hover:text-[#131722] ml-auto cursor-pointer"
                >
                  Market Cap
                  <ArrowUpDown className="w-3 h-3 opacity-60" />
                </button>
              </th>
              <th className="py-3 px-4 text-center hidden xl:table-cell min-w-[110px]">Technical</th>
              <th className="py-3 px-4 text-center hidden lg:table-cell min-w-[110px]">7D Trend</th>
              <th className="py-3 px-4 text-right min-w-[90px]">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#E0E3EB]">
            {sortedTickers.length === 0 ? (
              <tr>
                <td colSpan={12} className="py-12 text-center text-[#787B86]">
                  No matching market instruments found.
                </td>
              </tr>
            ) : (
              sortedTickers.map((ticker) => {
                const isPositive = ticker.changePercent >= 0;
                const isWatchlisted = watchlistSymbols.has(ticker.symbol);

                // Render micro sparkline for the row
                const min = Math.min(...ticker.sparkline);
                const max = Math.max(...ticker.sparkline);
                const r = max - min || 1;
                const w = 70;
                const h = 24;
                const sparkPoints = ticker.sparkline
                  .map((val, i) => {
                    const x = (i / (ticker.sparkline.length - 1)) * w;
                    const y = h - ((val - min) / r) * (h - 4) - 2;
                    return `${x.toFixed(1)},${y.toFixed(1)}`;
                  })
                  .join(' ');
                const stroke = isPositive ? '#089981' : '#F23645';

                return (
                  <tr
                    key={ticker.symbol}
                    onClick={() => onSelectTicker(ticker)}
                    className="min-h-[48px] hover:bg-[#F8F9FD] transition-colors cursor-pointer group"
                  >
                    {/* Star Watchlist */}
                    <td className="py-3 px-3 text-center" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={(e) => onToggleWatchlist(ticker.symbol, e)}
                        className="p-1 rounded hover:bg-[#F0F3FA] text-[#787B86] hover:text-[#2962FF] transition-colors cursor-pointer"
                        title={isWatchlisted ? 'Remove from Watchlist' : 'Add to Watchlist'}
                      >
                        <Star
                          className={`w-3.5 h-3.5 ${
                            isWatchlisted
                              ? 'text-[#2962FF] fill-[#2962FF]'
                              : 'opacity-40 group-hover:opacity-100'
                          }`}
                        />
                      </button>
                    </td>

                    {/* Symbol & Company Name */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <CompanyLogo
                          symbol={ticker.symbol}
                          name={ticker.name}
                          logoUrl={ticker.logoUrl}
                          size="md"
                        />
                        <div>
                          <div className="font-bold text-[#131722] group-hover:text-[#2962FF] transition-colors flex items-center gap-1.5">
                            {ticker.symbol}
                            <span className="text-[10px] font-medium text-[#787B86] bg-[#F0F3FA] px-1.5 py-0.2 rounded">
                              {ticker.exchange}
                            </span>
                          </div>
                          <div className="text-[11px] text-[#787B86] truncate max-w-[150px] md:max-w-[200px]">
                            {ticker.name}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Last Price */}
                    <td className="py-3 px-4 text-right font-bold text-[#131722] tabular-nums font-mono-numbers">
                      {ticker.price > 1000
                        ? ticker.price.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })
                        : ticker.price.toFixed(ticker.price < 2 ? 4 : 2)}
                    </td>

                    {/* Change $ */}
                    <td
                      className={`py-3 px-4 text-right tabular-nums font-medium ${
                        isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                      }`}
                    >
                      {isPositive ? '+' : ''}
                      {ticker.change.toFixed(ticker.price < 2 ? 4 : 2)}
                    </td>

                    {/* Change % (Pill) */}
                    <td className="py-3 px-4 text-right">
                      <span
                        className={`inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full tabular-nums ${
                          isPositive
                            ? 'text-[#089981] bg-[#089981]/10'
                            : 'text-[#F23645] bg-[#F23645]/10'
                        }`}
                      >
                        {isPositive ? (
                          <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
                        ) : (
                          <ArrowDownRight className="w-3 h-3 stroke-[2.5]" />
                        )}
                        {isPositive ? '+' : ''}
                        {ticker.changePercent.toFixed(2)}%
                      </span>
                    </td>

                    {/* 24h High */}
                    <td className="py-3 px-4 text-right text-[#434656] tabular-nums hidden sm:table-cell">
                      {ticker.high24h.toFixed(ticker.price < 2 ? 4 : 2)}
                    </td>

                    {/* 24h Low */}
                    <td className="py-3 px-4 text-right text-[#434656] tabular-nums hidden sm:table-cell">
                      {ticker.low24h.toFixed(ticker.price < 2 ? 4 : 2)}
                    </td>

                    {/* Volume */}
                    <td className="py-3 px-4 text-right text-[#131722] font-medium tabular-nums hidden md:table-cell">
                      {ticker.volume}
                    </td>

                    {/* Market Cap */}
                    <td className="py-3 px-4 text-right text-[#434656] tabular-nums hidden lg:table-cell">
                      {ticker.marketCap}
                    </td>

                    {/* Technical Rating */}
                    <td className="py-3 px-4 text-center hidden xl:table-cell">
                      <span
                        className={`inline-block text-[11px] px-2 py-0.5 rounded ${getRatingBadge(
                          ticker.rating
                        )}`}
                      >
                        {ticker.rating}
                      </span>
                    </td>

                    {/* 7D Trend Sparkline */}
                    <td className="py-3 px-4 text-center hidden lg:table-cell">
                      <div className="w-[70px] h-[24px] mx-auto">
                        <svg width="70" height="24">
                          <polyline
                            fill="none"
                            stroke={stroke}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            points={sparkPoints}
                          />
                        </svg>
                      </div>
                    </td>

                    {/* Action Button */}
                    <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={(e) => onQuickTrade(ticker, e)}
                        className="px-2.5 py-1 text-[11px] font-semibold text-[#2962FF] hover:text-white bg-[#2962FF]/8 hover:bg-[#2962FF] rounded-md transition-colors cursor-pointer whitespace-nowrap"
                      >
                        Trade
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
