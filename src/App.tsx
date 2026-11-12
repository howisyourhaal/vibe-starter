import React, { useState, useEffect, useMemo } from 'react';
import { MarketCategory, SubCategory, TickerData } from './types/market';
import { ALL_TICKERS, MAJOR_INDICES, HEATMAP_DATA, NEWS_STORIES } from './data/marketData';
import { Header } from './components/Header';
import { TickerMarquee } from './components/TickerMarquee';
import { IndexCards } from './components/IndexCards';
import { SegmentedNav } from './components/SegmentedNav';
import { MarketTable } from './components/MarketTable';
import { MarketHeatmap } from './components/MarketHeatmap';
import { MarketBreadth } from './components/MarketBreadth';
import { NewsSection } from './components/NewsSection';
import { InteractiveChartModal } from './components/InteractiveChartModal';
import { SearchModal } from './components/SearchModal';
import { WatchlistDrawer } from './components/WatchlistDrawer';
import { GetStartedModal } from './components/GetStartedModal';
import { CheckCircle2, TrendingUp, Sparkles, Filter, Globe2 } from 'lucide-react';

export default function App() {
  const [tickers, setTickers] = useState<TickerData[]>(ALL_TICKERS);
  const [activeCategory, setActiveCategory] = useState<MarketCategory>('us-stocks');
  const [activeSubTab, setActiveSubTab] = useState<SubCategory>('overview');
  const [activeNavTab, setActiveNavTab] = useState<string>('markets');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Selected ticker for interactive chart
  const [selectedTicker, setSelectedTicker] = useState<TickerData | null>(null);

  // Modals & Panels
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isWatchlistOpen, setIsWatchlistOpen] = useState<boolean>(false);
  const [isGetStartedOpen, setIsGetStartedOpen] = useState<boolean>(false);

  // Notifications Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Watchlist persisted in localStorage
  const [watchlistSymbols, setWatchlistSymbols] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('tv_markets_watchlist');
      if (saved) return new Set(JSON.parse(saved));
    } catch (e) {
      // fallback
    }
    return new Set(['NVDA', 'AAPL', 'BTCUSD', 'SPX', 'TSLA']);
  });

  const saveWatchlist = (newSet: Set<string>) => {
    setWatchlistSymbols(newSet);
    try {
      localStorage.setItem('tv_markets_watchlist', JSON.stringify(Array.from(newSet)));
    } catch (e) {
      // ignore
    }
  };

  const handleToggleWatchlist = (symbol: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const next = new Set(watchlistSymbols);
    if (next.has(symbol)) {
      next.delete(symbol);
      showToast(`Removed ${symbol} from watchlist`);
    } else {
      next.add(symbol);
      showToast(`Added ${symbol} to watchlist`);
    }
    saveWatchlist(next);
  };

  const handleRemoveFromWatchlist = (symbol: string) => {
    const next = new Set(watchlistSymbols);
    next.delete(symbol);
    saveWatchlist(next);
    showToast(`Removed ${symbol} from watchlist`);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 3000);
  };

  // Keyboard shortcut Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Periodic subtle realistic tick updates to simulate live market data
  useEffect(() => {
    const interval = setInterval(() => {
      setTickers((prevTickers) => {
        return prevTickers.map((t) => {
          // 40% chance of a micro-tick per instrument
          if (Math.random() > 0.4) return t;
          const deltaFactor = (Math.random() - 0.49) * 0.002;
          const newPrice = Number((t.price * (1 + deltaFactor)).toFixed(t.price < 2 ? 4 : 2));
          const priceDiff = Number((newPrice - (t.price - t.change)).toFixed(2));
          const newPct = Number(((priceDiff / (t.price - t.change)) * 100).toFixed(2));

          return {
            ...t,
            price: newPrice,
            change: priceDiff,
            changePercent: newPct,
            sparkline: [...t.sparkline.slice(1), newPrice],
          };
        });
      });
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  // Derived indices for the top index cards
  const indicesList = useMemo(() => {
    return tickers.filter((t) => ['SPX', 'NDX', 'DJI', 'RUT'].includes(t.symbol));
  }, [tickers]);

  // Filtered tickers based on activeCategory, activeSubTab, and searchQuery
  const categoryTickers = useMemo(() => {
    let result = tickers.filter((t) => t.category === activeCategory);

    // Apply subTab sorting or filtering
    if (activeSubTab === 'most-active') {
      result = [...result].sort((a, b) => b.volumeRaw - a.volumeRaw);
    } else if (activeSubTab === 'gainers') {
      result = [...result].sort((a, b) => b.changePercent - a.changePercent);
    } else if (activeSubTab === 'losers') {
      result = [...result].sort((a, b) => a.changePercent - b.changePercent);
    } else if (activeSubTab === 'high-volume') {
      result = [...result].sort((a, b) => b.volumeRaw - a.volumeRaw);
    }

    // Apply search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.symbol.toLowerCase().includes(q) ||
          t.name.toLowerCase().includes(q) ||
          (t.sector && t.sector.toLowerCase().includes(q))
      );
    }

    return result;
  }, [tickers, activeCategory, activeSubTab, searchQuery]);

  return (
    <div className="min-h-screen bg-[#FAF9FF] text-[#181b24] flex flex-col antialiased">
      {/* Top Header Navigation */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenWatchlist={() => setIsWatchlistOpen(true)}
        watchlistCount={watchlistSymbols.size}
        activeNavTab={activeNavTab}
        setActiveNavTab={(tab) => {
          setActiveNavTab(tab);
          if (tab === 'heatmaps') {
            setActiveSubTab('heatmap');
          } else if (tab === 'screeners') {
            setActiveSubTab('most-active');
          } else if (tab === 'news') {
            const el = document.getElementById('news-section');
            el?.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        onOpenGetStarted={() => setIsGetStartedOpen(true)}
      />

      {/* Global Benchmark Ticker Marquee */}
      <TickerMarquee
        tickers={tickers}
        onSelectTicker={(t) => setSelectedTicker(t)}
      />

      {/* Main Viewport Container (1400px fluid centered grid) */}
      <main className="max-w-[1400px] w-full mx-auto px-4 md:px-8 py-6 space-y-8 flex-1">
        
        {/* Hero Section Title & Category Summary */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#131722] tracking-tight">
              Markets Overview
            </h1>
            <p className="text-xs md:text-sm text-[#787B86] mt-0.5">
              Live global benchmark quotes, stock indices, cryptocurrency pairs, and financial screeners.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#787B86]">
            <span className="w-2 h-2 rounded-full bg-[#089981]" />
            <span className="font-medium text-[#131722]">US Markets Open</span>
            <span>·</span>
            <span>Eastern Time (ET)</span>
          </div>
        </div>

        {/* Hero Index Cards with Ticker Badges & Sparklines */}
        <section aria-label="Major Indices">
          <IndexCards
            indices={indicesList}
            onSelectIndex={(idx) => setSelectedTicker(idx)}
            selectedSymbol={selectedTicker?.symbol}
          />
        </section>

        {/* Market Breadth & Sentiment Indicators */}
        <section aria-label="Market Breadth">
          <MarketBreadth />
        </section>

        {/* Segmented Category Pill Navigation */}
        <section className="space-y-4" aria-label="Market Navigation">
          <SegmentedNav
            activeCategory={activeCategory}
            onSelectCategory={(cat) => {
              setActiveCategory(cat);
              if (activeSubTab === 'heatmap' && cat !== 'us-stocks') {
                setActiveSubTab('overview');
              }
            }}
            activeSubTab={activeSubTab}
            onSelectSubTab={(sub) => setActiveSubTab(sub)}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </section>

        {/* Content View: Heatmap OR Market Data Table */}
        {activeSubTab === 'heatmap' ? (
          <section aria-label="Sector Heatmap">
            <MarketHeatmap
              heatmapData={HEATMAP_DATA}
              allTickers={tickers}
              onSelectTicker={(t) => setSelectedTicker(t)}
            />
          </section>
        ) : (
          <section aria-label="Market Data Table">
            <MarketTable
              tickers={categoryTickers}
              onSelectTicker={(t) => setSelectedTicker(t)}
              watchlistSymbols={watchlistSymbols}
              onToggleWatchlist={handleToggleWatchlist}
              onQuickTrade={(t) => setSelectedTicker(t)}
            />
          </section>
        )}

        {/* Curated Market News Stream */}
        <section id="news-section" aria-label="Financial News">
          <NewsSection
            news={NEWS_STORIES}
            allTickers={tickers}
            onSelectTicker={(t) => setSelectedTicker(t)}
          />
        </section>
      </main>

      {/* Interactive TradingView Chart Modal / Drawer */}
      {selectedTicker && (
        <InteractiveChartModal
          ticker={selectedTicker}
          onClose={() => setSelectedTicker(null)}
          isWatchlisted={watchlistSymbols.has(selectedTicker.symbol)}
          onToggleWatchlist={handleToggleWatchlist}
          onTradeExecuted={(msg) => showToast(msg)}
        />
      )}

      {/* Global Search Dialog (Ctrl+K) */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        tickers={tickers}
        onSelectTicker={(t) => setSelectedTicker(t)}
      />

      {/* Slide-out Watchlist Drawer */}
      <WatchlistDrawer
        isOpen={isWatchlistOpen}
        onClose={() => setIsWatchlistOpen(false)}
        watchlistSymbols={watchlistSymbols}
        allTickers={tickers}
        onSelectTicker={(t) => setSelectedTicker(t)}
        onRemoveFromWatchlist={handleRemoveFromWatchlist}
      />

      {/* Get Started Onboarding Dialog */}
      <GetStartedModal
        isOpen={isGetStartedOpen}
        onClose={() => setIsGetStartedOpen(false)}
        onExploreMarkets={() => {
          setIsGetStartedOpen(false);
          setActiveSubTab('overview');
        }}
      />

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#131722] text-white px-4 py-2.5 rounded-xl shadow-lg border border-[#434656] text-xs font-medium flex items-center gap-2 animate-bounce-subtle">
          <CheckCircle2 className="w-4 h-4 text-[#089981]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Clean Institutional Footer */}
      <footer className="border-t border-[#E0E3EB] bg-white py-6 mt-12 text-xs text-[#787B86]">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-[#2962FF] flex items-center justify-center text-white font-bold text-xs">
              TV
            </div>
            <span>TradingView Markets Intelligence Terminal</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsGetStartedOpen(true)}
              className="hover:text-[#131722] transition-colors cursor-pointer"
            >
              Paper Trading Simulator
            </button>
            <button
              onClick={() => {
                setActiveSubTab('heatmap');
                window.scrollTo({ top: 350, behavior: 'smooth' });
              }}
              className="hover:text-[#131722] transition-colors cursor-pointer"
            >
              Sector Heatmaps
            </button>
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hover:text-[#131722] transition-colors cursor-pointer"
            >
              Fast Search (Ctrl+K)
            </button>
          </div>

          <div>
            Quotes delayed by 15 mins for non-subscribers · Data for educational & analytical purposes
          </div>
        </div>
      </footer>
    </div>
  );
}
