import React, { useState } from 'react';
import { HeatmapItem, TickerData } from '../types/market';
import { ArrowUpRight, ArrowDownRight, Layers } from 'lucide-react';

interface MarketHeatmapProps {
  heatmapData: HeatmapItem[];
  allTickers: TickerData[];
  onSelectTicker: (ticker: TickerData) => void;
}

export const MarketHeatmap: React.FC<MarketHeatmapProps> = ({
  heatmapData,
  allTickers,
  onSelectTicker,
}) => {
  const [selectedSector, setSelectedSector] = useState<string>('All');
  const [hoveredItem, setHoveredItem] = useState<HeatmapItem | null>(null);

  const sectors = ['All', ...Array.from(new Set(heatmapData.map((d) => d.sector)))];

  const filteredData =
    selectedSector === 'All'
      ? heatmapData
      : heatmapData.filter((d) => d.sector === selectedSector);

  // Group items by sector
  const sectorGroups = sectors
    .filter((s) => s !== 'All' && (selectedSector === 'All' || s === selectedSector))
    .map((sectorName) => {
      const items = filteredData.filter((d) => d.sector === sectorName);
      const totalCap = items.reduce((acc, curr) => acc + curr.marketCapRaw, 0);
      return { sectorName, items, totalCap };
    })
    .sort((a, b) => b.totalCap - a.totalCap);

  // Helper to get color style based on percent change
  const getColorClasses = (pct: number) => {
    if (pct >= 3.0) return 'bg-[#089981] text-white';
    if (pct >= 1.5) return 'bg-[#10b981] text-white';
    if (pct > 0) return 'bg-[#34d399] text-[#064e3b]';
    if (pct === 0) return 'bg-[#94a3b8] text-white';
    if (pct > -1.5) return 'bg-[#f87171] text-[#450a0a]';
    if (pct > -3.0) return 'bg-[#ef4444] text-white';
    return 'bg-[#dc2626] text-white';
  };

  const handleTileClick = (item: HeatmapItem) => {
    const fullTicker = allTickers.find((t) => t.symbol === item.symbol) || {
      symbol: item.symbol,
      name: item.name,
      category: 'us-stocks',
      sector: item.sector,
      price: item.price,
      change: Number(((item.price * item.changePercent) / 100).toFixed(2)),
      changePercent: item.changePercent,
      high24h: Number((item.price * 1.02).toFixed(2)),
      low24h: Number((item.price * 0.98).toFixed(2)),
      volume: '35M',
      volumeRaw: 35000000,
      marketCap: `$${item.marketCapRaw}B`,
      marketCapRaw: item.marketCapRaw * 1000000000,
      rating: item.changePercent > 0 ? 'Buy' : 'Neutral',
      exchange: 'NASDAQ',
      description: `${item.name} is a leading company in the ${item.sector} sector.`,
      sparkline: [item.price * 0.97, item.price * 0.98, item.price * 0.99, item.price]
    };
    onSelectTicker(fullTicker as TickerData);
  };

  return (
    <div className="bg-white rounded-xl border border-[#E0E3EB] p-5 shadow-2xs space-y-4">
      {/* Header and Sector Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#2962FF]" />
          <div>
            <h3 className="text-base font-bold text-[#131722]">
              S&P 500 Market Heatmap
            </h3>
            <p className="text-xs text-[#787B86]">
              Performance by sector and relative market capitalization weight
            </p>
          </div>
        </div>

        {/* Sector Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {sectors.map((sec) => (
            <button
              key={sec}
              onClick={() => setSelectedSector(sec)}
              className={`px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap transition-colors cursor-pointer ${
                selectedSector === sec
                  ? 'bg-[#131722] text-white'
                  : 'text-[#787B86] hover:bg-[#F0F3FA] hover:text-[#131722]'
              }`}
            >
              {sec}
            </button>
          ))}
        </div>
      </div>

      {/* Heatmap Legend */}
      <div className="flex items-center justify-between text-[11px] text-[#787B86] pt-1 border-t border-[#E0E3EB]">
        <span>Size = Market Cap</span>
        <div className="flex items-center gap-1 font-semibold">
          <span className="text-[#F23645]">-3%</span>
          <div className="flex items-center h-2.5 rounded-full overflow-hidden w-28">
            <div className="w-1/6 h-full bg-[#dc2626]" />
            <div className="w-1/6 h-full bg-[#ef4444]" />
            <div className="w-1/6 h-full bg-[#f87171]" />
            <div className="w-1/6 h-full bg-[#34d399]" />
            <div className="w-1/6 h-full bg-[#10b981]" />
            <div className="w-1/6 h-full bg-[#089981]" />
          </div>
          <span className="text-[#089981]">+3%</span>
        </div>
      </div>

      {/* Heatmap Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {sectorGroups.map((group) => (
          <div
            key={group.sectorName}
            className="border border-[#E0E3EB] rounded-lg p-2.5 bg-[#FAF9FF] flex flex-col"
          >
            <div className="flex items-center justify-between text-[11px] font-bold text-[#434656] mb-2 px-1">
              <span>{group.sectorName}</span>
              <span className="text-[#787B86] font-normal font-mono-numbers">
                ${group.totalCap > 1000 ? `${(group.totalCap / 1000).toFixed(1)}T` : `${group.totalCap}B`}
              </span>
            </div>

            {/* Sector Tiles Container */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 flex-1 min-h-[140px]">
              {group.items.map((item) => {
                const colorClass = getColorClasses(item.changePercent);
                const isLarge = item.marketCapRaw > 1000;
                return (
                  <button
                    key={item.symbol}
                    onClick={() => handleTileClick(item)}
                    onMouseEnter={() => setHoveredItem(item)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={`${colorClass} ${
                      isLarge ? 'col-span-2 row-span-1' : 'col-span-1'
                    } rounded-md p-2 flex flex-col justify-between hover:scale-[1.02] hover:shadow-md transition-all duration-150 cursor-pointer text-left relative overflow-hidden`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-xs tracking-tight">
                        {item.symbol}
                      </span>
                      <span className="text-[10px] font-medium opacity-90 truncate max-w-[65px]">
                        {item.name}
                      </span>
                    </div>

                    <div className="mt-2 flex items-baseline justify-between font-mono-numbers">
                      <span className="text-xs font-bold tabular-nums">
                        {item.changePercent > 0 ? '+' : ''}
                        {item.changePercent.toFixed(2)}%
                      </span>
                      <span className="text-[10px] opacity-80 tabular-nums">
                        ${item.price.toFixed(1)}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Floating Info Banner when tile hovered */}
      {hoveredItem && (
        <div className="p-2.5 rounded-lg bg-[#131722] text-white text-xs flex items-center justify-between transition-all animate-fadeIn">
          <div className="flex items-center gap-3">
            <span className="font-bold text-sm text-[#0089FF]">{hoveredItem.symbol}</span>
            <span className="text-white/80">{hoveredItem.name}</span>
            <span className="text-xs text-white/50">· {hoveredItem.sector}</span>
          </div>
          <div className="flex items-center gap-4 font-mono-numbers">
            <span>Price: ${hoveredItem.price.toFixed(2)}</span>
            <span>Market Cap: ${hoveredItem.marketCapRaw}B</span>
            <span
              className={`font-bold flex items-center ${
                hoveredItem.changePercent >= 0 ? 'text-[#089981]' : 'text-[#F23645]'
              }`}
            >
              {hoveredItem.changePercent >= 0 ? (
                <ArrowUpRight className="w-3.5 h-3.5" />
              ) : (
                <ArrowDownRight className="w-3.5 h-3.5" />
              )}
              {hoveredItem.changePercent >= 0 ? '+' : ''}
              {hoveredItem.changePercent.toFixed(2)}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
