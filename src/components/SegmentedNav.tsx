import React from 'react';
import { MarketCategory, SubCategory } from '../types/market';
import { Flame, TrendingUp, TrendingDown, BarChart2, LayoutGrid, ListFilter } from 'lucide-react';

interface SegmentedNavProps {
  activeCategory: MarketCategory;
  onSelectCategory: (cat: MarketCategory) => void;
  activeSubTab: SubCategory;
  onSelectSubTab: (sub: SubCategory) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const SegmentedNav: React.FC<SegmentedNavProps> = ({
  activeCategory,
  onSelectCategory,
  activeSubTab,
  onSelectSubTab,
  searchQuery,
  setSearchQuery,
}) => {
  const categories: { id: MarketCategory; label: string }[] = [
    { id: 'us-stocks', label: 'US stocks' },
    { id: 'world-stocks', label: 'World stocks' },
    { id: 'crypto', label: 'Crypto' },
    { id: 'futures', label: 'Futures' },
    { id: 'forex', label: 'Forex' },
    { id: 'bonds', label: 'Bonds' },
  ];

  const subTabs: { id: SubCategory; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <ListFilter className="w-3.5 h-3.5" /> },
    { id: 'most-active', label: 'Most active', icon: <Flame className="w-3.5 h-3.5" /> },
    { id: 'gainers', label: 'Top gainers', icon: <TrendingUp className="w-3.5 h-3.5 text-[#089981]" /> },
    { id: 'losers', label: 'Top losers', icon: <TrendingDown className="w-3.5 h-3.5 text-[#F23645]" /> },
    { id: 'high-volume', label: 'High volume', icon: <BarChart2 className="w-3.5 h-3.5" /> },
    { id: 'heatmap', label: 'Sector heatmap', icon: <LayoutGrid className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="space-y-4">
      {/* Primary Category Pill Rail */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Track: Pill-shaped outer container outlined with 1px solid #E0E3EB */}
        <div className="inline-flex p-1 bg-white border border-[#E0E3EB] rounded-full overflow-x-auto no-scrollbar max-w-full">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-4 py-2 text-xs md:text-sm font-semibold rounded-full whitespace-nowrap transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-[#131722] text-white shadow-xs'
                    : 'text-[#787B86] hover:text-[#131722] hover:bg-[#F0F3FA]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Filter input */}
        <div className="relative shrink-0">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Filter ${activeCategory.replace('-', ' ')}...`}
            className="w-full md:w-56 px-3.5 py-1.5 text-xs bg-white border border-[#E0E3EB] focus:border-[#2962FF] rounded-full outline-hidden text-[#131722] placeholder:text-[#787B86] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#787B86] hover:text-[#131722]"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Secondary Sub-tabs for quick views / screeners */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs">
        {subTabs.map((sub) => {
          const isActive = activeSubTab === sub.id;
          return (
            <button
              key={sub.id}
              onClick={() => onSelectSubTab(sub.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-[#131722] text-white shadow-xs'
                  : 'text-[#434656] hover:text-[#131722] hover:bg-[#F0F3FA] bg-transparent'
              }`}
            >
              {sub.icon}
              {sub.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
