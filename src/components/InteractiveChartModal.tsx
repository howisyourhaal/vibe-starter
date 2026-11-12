import React, { useState, useEffect, useMemo, useRef } from 'react';
import { TickerData, CandlePoint, ChartType, Timeframe } from '../types/market';
import { generateCandleData, generateOrderBook } from '../data/marketData';
import { CompanyLogo } from './CompanyLogo';
import {
  X,
  Maximize2,
  Minimize2,
  TrendingUp,
  Star,
  Activity,
  BarChart2,
  DollarSign,
  Info,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
} from 'lucide-react';

interface InteractiveChartModalProps {
  ticker: TickerData | null;
  onClose: () => void;
  isWatchlisted: boolean;
  onToggleWatchlist: (symbol: string) => void;
  onTradeExecuted?: (message: string) => void;
}

export const InteractiveChartModal: React.FC<InteractiveChartModalProps> = ({
  ticker,
  onClose,
  isWatchlisted,
  onToggleWatchlist,
  onTradeExecuted,
}) => {
  if (!ticker) return null;

  const [timeframe, setTimeframe] = useState<Timeframe>('1D');
  const [chartType, setChartType] = useState<ChartType>('candlestick');
  const [showMA20, setShowMA20] = useState<boolean>(true);
  const [showMA50, setShowMA50] = useState<boolean>(false);
  const [showVolume, setShowVolume] = useState<boolean>(true);
  const [showRSI, setShowRSI] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'chart' | 'orderbook' | 'financials'>('chart');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Trading panel state
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [sharesCount, setSharesCount] = useState<number>(10);
  const [showTradeSuccess, setShowTradeSuccess] = useState<boolean>(false);

  // Hover crosshair state
  const [hoveredCandle, setHoveredCandle] = useState<CandlePoint | null>(null);
  const [crosshairPos, setCrosshairPos] = useState<{ x: number; y: number } | null>(null);
  const chartContainerRef = useRef<HTMLDivElement>(null);

  // Candles data generated for this timeframe
  const candles = useMemo(() => {
    return generateCandleData(ticker, timeframe);
  }, [ticker.symbol, timeframe]);

  // Order book data
  const orderBook = useMemo(() => {
    return generateOrderBook(ticker.price);
  }, [ticker.price]);

  // Calculate Moving Averages
  const ma20 = useMemo(() => {
    return candles.map((_, idx, arr) => {
      if (idx < 19) return null;
      const slice = arr.slice(idx - 19, idx + 1);
      const sum = slice.reduce((acc, c) => acc + c.close, 0);
      return sum / 20;
    });
  }, [candles]);

  const ma50 = useMemo(() => {
    return candles.map((_, idx, arr) => {
      if (idx < 49) return null;
      const slice = arr.slice(idx - 49, idx + 1);
      const sum = slice.reduce((acc, c) => acc + c.close, 0);
      return sum / 50;
    });
  }, [candles]);

  // Calculate RSI (14)
  const rsiValues = useMemo(() => {
    const rsi: (number | null)[] = [];
    let gains = 0;
    let losses = 0;

    for (let i = 0; i < candles.length; i++) {
      if (i < 14) {
        rsi.push(null);
        continue;
      }
      if (i === 14) {
        for (let j = 1; j <= 14; j++) {
          const diff = candles[j].close - candles[j - 1].close;
          if (diff >= 0) gains += diff;
          else losses += Math.abs(diff);
        }
        gains /= 14;
        losses /= 14;
      } else {
        const diff = candles[i].close - candles[i - 1].close;
        const currentGain = diff >= 0 ? diff : 0;
        const currentLoss = diff < 0 ? Math.abs(diff) : 0;
        gains = (gains * 13 + currentGain) / 14;
        losses = (losses * 13 + currentLoss) / 14;
      }

      if (losses === 0) {
        rsi.push(100);
      } else {
        const rs = gains / losses;
        rsi.push(100 - 100 / (1 + rs));
      }
    }
    return rsi;
  }, [candles]);

  // Chart dimension bounds
  const minPrice = Math.min(...candles.map((c) => c.low));
  const maxPrice = Math.max(...candles.map((c) => c.high));
  const priceRange = maxPrice - minPrice || 1;
  const maxVolume = Math.max(...candles.map((c) => c.volume)) || 1;

  // Chart coordinates
  const svgWidth = 840;
  const svgHeight = 400;
  const paddingLeft = 10;
  const paddingRight = 60;
  const paddingTop = 20;
  const paddingBottom = showVolume ? 90 : 30;
  const plotWidth = svgWidth - paddingLeft - paddingRight;
  const plotHeight = svgHeight - paddingTop - paddingBottom;

  const candleWidth = Math.max(2, (plotWidth / candles.length) * 0.7);
  const candleGap = plotWidth / candles.length;

  // Coordinate mappers
  const getY = (price: number) => {
    return paddingTop + plotHeight - ((price - minPrice) / priceRange) * plotHeight;
  };

  const getX = (index: number) => {
    return paddingLeft + index * candleGap + candleGap / 2;
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const scaleX = svgWidth / rect.width;
    const scaleY = svgHeight / rect.height;
    const virtualX = x * scaleX;
    const virtualY = y * scaleY;

    setCrosshairPos({ x: virtualX, y: virtualY });

    // Determine nearest candle
    const index = Math.round((virtualX - paddingLeft - candleGap / 2) / candleGap);
    if (index >= 0 && index < candles.length) {
      setHoveredCandle(candles[index]);
    } else {
      setHoveredCandle(null);
    }
  };

  const handleMouseLeave = () => {
    setCrosshairPos(null);
    setHoveredCandle(null);
  };

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const activeCandle = hoveredCandle || candles[candles.length - 1];
  const isPositive = ticker.changePercent >= 0;

  // Execute Simulated Trade
  const handleExecuteTrade = (e: React.FormEvent) => {
    e.preventDefault();
    setShowTradeSuccess(true);
    const msg = `Executed ${tradeType.toUpperCase()} of ${sharesCount} shares of ${ticker.symbol} at $${ticker.price.toFixed(2)}`;
    if (onTradeExecuted) onTradeExecuted(msg);
    setTimeout(() => {
      setShowTradeSuccess(false);
    }, 3000);
  };

  // Area chart path generator
  const areaPoints = useMemo(() => {
    const pts = candles.map((c, i) => `${getX(i).toFixed(1)},${getY(c.close).toFixed(1)}`);
    const firstX = getX(0);
    const lastX = getX(candles.length - 1);
    const bottomY = paddingTop + plotHeight;
    return `${firstX},${bottomY} ${pts.join(' ')} ${lastX},${bottomY}`;
  }, [candles]);

  const linePoints = useMemo(() => {
    return candles.map((c, i) => `${getX(i).toFixed(1)},${getY(c.close).toFixed(1)}`).join(' ');
  }, [candles]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-2 sm:p-4 overflow-y-auto">
      <div
        className={`bg-white rounded-2xl border border-[#E0E3EB] shadow-2xl flex flex-col overflow-hidden transition-all duration-200 ${
          isFullscreen
            ? 'w-full h-full rounded-none'
            : 'w-full max-w-6xl max-h-[92vh]'
        }`}
      >
        {/* Header Bar */}
        <div className="px-5 py-3.5 border-b border-[#E0E3EB] flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
            <CompanyLogo
              symbol={ticker.symbol}
              name={ticker.name}
              logoUrl={ticker.logoUrl}
              size="lg"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-[#131722]">{ticker.symbol}</h2>
                <span className="text-xs text-[#787B86] bg-[#F0F3FA] px-2 py-0.5 rounded font-medium">
                  {ticker.exchange}
                </span>
                <button
                  onClick={() => onToggleWatchlist(ticker.symbol)}
                  className="p-1 rounded hover:bg-[#F0F3FA] text-[#787B86] hover:text-[#2962FF] transition-colors cursor-pointer"
                  title="Toggle Watchlist"
                >
                  <Star
                    className={`w-4 h-4 ${
                      isWatchlisted
                        ? 'text-[#2962FF] fill-[#2962FF]'
                        : 'text-[#787B86]'
                    }`}
                  />
                </button>
              </div>
              <div className="text-xs text-[#787B86]">{ticker.name}</div>
            </div>
          </div>

          {/* Real-time price quote in header */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-xl font-extrabold text-[#131722] font-mono-numbers">
                ${ticker.price > 1000 ? ticker.price.toLocaleString() : ticker.price.toFixed(ticker.price < 2 ? 4 : 2)}
              </div>
              <div
                className={`text-xs font-semibold flex items-center justify-end gap-0.5 ${
                  isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                }`}
              >
                {isPositive ? (
                  <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                ) : (
                  <ArrowDownRight className="w-3.5 h-3.5 stroke-[2.5]" />
                )}
                {isPositive ? '+' : ''}
                {ticker.change.toFixed(2)} ({isPositive ? '+' : ''}
                {ticker.changePercent.toFixed(2)}%)
              </div>
            </div>

            {/* Window controls */}
            <div className="flex items-center gap-1 pl-2 border-l border-[#E0E3EB]">
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-1.5 rounded-lg hover:bg-[#F0F3FA] text-[#787B86] hover:text-[#131722] cursor-pointer"
                title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-[#F0F3FA] text-[#787B86] hover:text-[#131722] cursor-pointer"
                title="Close (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Sub-toolbar: Timeframes, Chart Styles, and Indicators */}
        <div className="px-5 py-2 border-b border-[#E0E3EB] bg-[#FAF9FF] flex flex-wrap items-center justify-between gap-3 shrink-0 text-xs">
          {/* Timeframe Buttons */}
          <div className="flex items-center gap-1 bg-white border border-[#E0E3EB] p-0.5 rounded-lg">
            {(['1D', '5D', '1M', '3M', '6M', '1Y', '5Y', 'ALL'] as Timeframe[]).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-2.5 py-1 rounded font-semibold transition-colors cursor-pointer ${
                  timeframe === tf
                    ? 'bg-[#131722] text-white shadow-2xs'
                    : 'text-[#787B86] hover:text-[#131722] hover:bg-[#F0F3FA]'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          {/* Chart Type Toggle */}
          <div className="flex items-center gap-1 bg-white border border-[#E0E3EB] p-0.5 rounded-lg">
            <button
              onClick={() => setChartType('candlestick')}
              className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                chartType === 'candlestick' ? 'bg-[#131722] text-white' : 'text-[#787B86] hover:bg-[#F0F3FA]'
              }`}
            >
              Candles
            </button>
            <button
              onClick={() => setChartType('area')}
              className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                chartType === 'area' ? 'bg-[#131722] text-white' : 'text-[#787B86] hover:bg-[#F0F3FA]'
              }`}
            >
              Area
            </button>
            <button
              onClick={() => setChartType('line')}
              className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                chartType === 'line' ? 'bg-[#131722] text-white' : 'text-[#787B86] hover:bg-[#F0F3FA]'
              }`}
            >
              Line
            </button>
          </div>

          {/* Indicators Toggles */}
          <div className="flex items-center gap-2 text-[11px] font-semibold text-[#434656]">
            <button
              onClick={() => setShowMA20(!showMA20)}
              className={`px-2 py-1 rounded border transition-colors cursor-pointer ${
                showMA20
                  ? 'border-[#2962FF] text-[#2962FF] bg-[#2962FF]/8 font-bold'
                  : 'border-[#E0E3EB] bg-white text-[#787B86]'
              }`}
            >
              MA (20)
            </button>
            <button
              onClick={() => setShowMA50(!showMA50)}
              className={`px-2 py-1 rounded border transition-colors cursor-pointer ${
                showMA50
                  ? 'border-[#FF9900] text-[#FF9900] bg-[#FF9900]/8 font-bold'
                  : 'border-[#E0E3EB] bg-white text-[#787B86]'
              }`}
            >
              MA (50)
            </button>
            <button
              onClick={() => setShowVolume(!showVolume)}
              className={`px-2 py-1 rounded border transition-colors cursor-pointer ${
                showVolume
                  ? 'border-[#089981] text-[#089981] bg-[#089981]/8 font-bold'
                  : 'border-[#E0E3EB] bg-white text-[#787B86]'
              }`}
            >
              Volume
            </button>
            <button
              onClick={() => setShowRSI(!showRSI)}
              className={`px-2 py-1 rounded border transition-colors cursor-pointer ${
                showRSI
                  ? 'border-[#8E24AA] text-[#8E24AA] bg-[#8E24AA]/8 font-bold'
                  : 'border-[#E0E3EB] bg-white text-[#787B86]'
              }`}
            >
              RSI (14)
            </button>
          </div>
        </div>

        {/* Live HUD (Open, High, Low, Close, Vol) */}
        {activeCandle && (
          <div className="px-5 py-1.5 border-b border-[#E0E3EB] bg-white flex flex-wrap items-center gap-4 text-xs font-mono-numbers text-[#434656]">
            <span className="text-[#787B86]">{activeCandle.time}</span>
            <span>
              O: <strong className="text-[#131722]">{activeCandle.open.toFixed(2)}</strong>
            </span>
            <span>
              H: <strong className="text-[#131722]">{activeCandle.high.toFixed(2)}</strong>
            </span>
            <span>
              L: <strong className="text-[#131722]">{activeCandle.low.toFixed(2)}</strong>
            </span>
            <span>
              C:{' '}
              <strong
                className={activeCandle.close >= activeCandle.open ? 'text-[#089981]' : 'text-[#F23645]'}
              >
                {activeCandle.close.toFixed(2)}
              </strong>
            </span>
            <span>
              Vol: <strong className="text-[#131722]">{activeCandle.volume.toLocaleString()}</strong>
            </span>
            {showMA20 && ma20[candles.length - 1] && (
              <span className="text-[#2962FF]">
                MA20: {ma20[candles.length - 1]?.toFixed(2)}
              </span>
            )}
            {showMA50 && ma50[candles.length - 1] && (
              <span className="text-[#FF9900]">
                MA50: {ma50[candles.length - 1]?.toFixed(2)}
              </span>
            )}
          </div>
        )}

        {/* Main Content: Chart Canvas on Left, Side Details & Trade on Right */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 overflow-hidden min-h-[460px]">
          {/* Chart Viewport (3 cols on large screens) */}
          <div
            ref={chartContainerRef}
            className="lg:col-span-3 border-r border-[#E0E3EB] p-2 relative bg-white flex flex-col select-none overflow-hidden"
          >
            <div className="relative w-full h-full min-h-[380px] flex items-center justify-center">
              <svg
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                className="w-full h-full cursor-crosshair overflow-visible"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                {/* Horizontal Price Grid Lines */}
                {[0.2, 0.4, 0.6, 0.8].map((ratio) => {
                  const y = paddingTop + plotHeight * ratio;
                  const priceAtY = maxPrice - ratio * priceRange;
                  return (
                    <g key={ratio}>
                      <line
                        x1={paddingLeft}
                        y1={y}
                        x2={svgWidth - paddingRight}
                        y2={y}
                        stroke="#F0F3FA"
                        strokeDasharray="3 3"
                        strokeWidth="1"
                      />
                      <text
                        x={svgWidth - paddingRight + 6}
                        y={y + 3}
                        fontSize="10"
                        fill="#787B86"
                        className="font-mono-numbers"
                      >
                        {priceAtY.toFixed(ticker.price < 2 ? 4 : 2)}
                      </text>
                    </g>
                  );
                })}

                {/* Bottom Volume Separator */}
                {showVolume && (
                  <line
                    x1={paddingLeft}
                    y1={paddingTop + plotHeight}
                    x2={svgWidth - paddingRight}
                    y2={paddingTop + plotHeight}
                    stroke="#E0E3EB"
                    strokeWidth="1"
                  />
                )}

                {/* Area Chart Fill */}
                {chartType === 'area' && (
                  <>
                    <defs>
                      <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2962FF" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#2962FF" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <polygon points={areaPoints} fill="url(#areaGradient)" />
                    <polyline
                      fill="none"
                      stroke="#2962FF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points={linePoints}
                    />
                  </>
                )}

                {/* Pure Line Chart */}
                {chartType === 'line' && (
                  <polyline
                    fill="none"
                    stroke="#2962FF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={linePoints}
                  />
                )}

                {/* Candlesticks */}
                {chartType === 'candlestick' &&
                  candles.map((c, i) => {
                    const isBull = c.close >= c.open;
                    const x = getX(i);
                    const openY = getY(c.open);
                    const closeY = getY(c.close);
                    const highY = getY(c.high);
                    const lowY = getY(c.low);
                    const bodyTop = Math.min(openY, closeY);
                    const bodyHeight = Math.max(1.5, Math.abs(openY - closeY));
                    const color = isBull ? '#089981' : '#F23645';

                    return (
                      <g key={i}>
                        {/* High-Low Wick */}
                        <line
                          x1={x}
                          y1={highY}
                          x2={x}
                          y2={lowY}
                          stroke={color}
                          strokeWidth="1"
                        />
                        {/* Real Candle Body */}
                        <rect
                          x={x - candleWidth / 2}
                          y={bodyTop}
                          width={candleWidth}
                          height={bodyHeight}
                          fill={isBull ? '#089981' : '#F23645'}
                          stroke={color}
                          strokeWidth="0.8"
                          rx="0.5"
                        />
                      </g>
                    );
                  })}

                {/* Volume Histogram Bars */}
                {showVolume &&
                  candles.map((c, i) => {
                    const isBull = c.close >= c.open;
                    const x = getX(i);
                    const barHeight = (c.volume / maxVolume) * (paddingBottom - 25);
                    const y = svgHeight - 20 - barHeight;
                    return (
                      <rect
                        key={`vol-${i}`}
                        x={x - candleWidth / 2}
                        y={y}
                        width={candleWidth}
                        height={barHeight}
                        fill={isBull ? 'rgba(8, 153, 129, 0.35)' : 'rgba(242, 54, 69, 0.35)'}
                      />
                    );
                  })}

                {/* Moving Average 20 Line */}
                {showMA20 && (
                  <polyline
                    fill="none"
                    stroke="#2962FF"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    points={candles
                      .map((_, i) => (ma20[i] ? `${getX(i).toFixed(1)},${getY(ma20[i]!).toFixed(1)}` : ''))
                      .filter(Boolean)
                      .join(' ')}
                  />
                )}

                {/* Moving Average 50 Line */}
                {showMA50 && (
                  <polyline
                    fill="none"
                    stroke="#FF9900"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    points={candles
                      .map((_, i) => (ma50[i] ? `${getX(i).toFixed(1)},${getY(ma50[i]!).toFixed(1)}` : ''))
                      .filter(Boolean)
                      .join(' ')}
                  />
                )}

                {/* Interactive Crosshair Tracking */}
                {crosshairPos && (
                  <g pointerEvents="none">
                    {/* Horizontal Line */}
                    <line
                      x1={paddingLeft}
                      y1={crosshairPos.y}
                      x2={svgWidth - paddingRight}
                      y2={crosshairPos.y}
                      stroke="#787B86"
                      strokeDasharray="2 2"
                      strokeWidth="1"
                    />
                    {/* Vertical Line */}
                    <line
                      x1={crosshairPos.x}
                      y1={paddingTop}
                      x2={crosshairPos.x}
                      y2={svgHeight - 15}
                      stroke="#787B86"
                      strokeDasharray="2 2"
                      strokeWidth="1"
                    />
                  </g>
                )}
              </svg>
            </div>

            {/* Optional RSI (14) Sub-chart */}
            {showRSI && (
              <div className="h-20 border-t border-[#E0E3EB] pt-1 px-3 bg-[#FAF9FF] relative flex flex-col justify-between">
                <div className="flex items-center justify-between text-[10px] text-[#787B86]">
                  <span className="font-bold text-[#8E24AA]">RSI (14): {rsiValues[rsiValues.length - 1]?.toFixed(1) || '54.2'}</span>
                  <span>70 (Overbought) / 30 (Oversold)</span>
                </div>
                <div className="h-12 w-full relative">
                  <div className="absolute top-[30%] left-0 right-0 border-b border-dashed border-[#F23645]/40" />
                  <div className="absolute top-[70%] left-0 right-0 border-b border-dashed border-[#089981]/40" />
                  <svg className="w-full h-full">
                    <polyline
                      fill="none"
                      stroke="#8E24AA"
                      strokeWidth="1.5"
                      points={candles
                        .map((_, i) => {
                          const r = rsiValues[i];
                          if (r === null) return '';
                          const x = (i / (candles.length - 1)) * 750;
                          const y = 48 - (r / 100) * 48;
                          return `${x},${y}`;
                        })
                        .filter(Boolean)
                        .join(' ')}
                    />
                  </svg>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar: Tabs for Paper Trade, Order Book, Key Stats */}
          <div className="lg:col-span-1 flex flex-col bg-[#FAF9FF] overflow-y-auto">
            {/* Tab switchers */}
            <div className="flex border-b border-[#E0E3EB] bg-white text-xs font-semibold">
              <button
                onClick={() => setActiveTab('chart')}
                className={`flex-1 py-2.5 text-center transition-colors cursor-pointer border-b-2 ${
                  activeTab === 'chart'
                    ? 'border-[#2962FF] text-[#2962FF]'
                    : 'border-transparent text-[#787B86] hover:text-[#131722]'
                }`}
              >
                Trade
              </button>
              <button
                onClick={() => setActiveTab('orderbook')}
                className={`flex-1 py-2.5 text-center transition-colors cursor-pointer border-b-2 ${
                  activeTab === 'orderbook'
                    ? 'border-[#2962FF] text-[#2962FF]'
                    : 'border-transparent text-[#787B86] hover:text-[#131722]'
                }`}
              >
                Order Book
              </button>
              <button
                onClick={() => setActiveTab('financials')}
                className={`flex-1 py-2.5 text-center transition-colors cursor-pointer border-b-2 ${
                  activeTab === 'financials'
                    ? 'border-[#2962FF] text-[#2962FF]'
                    : 'border-transparent text-[#787B86] hover:text-[#131722]'
                }`}
              >
                Key Stats
              </button>
            </div>

            <div className="p-4 flex-1 space-y-4">
              {/* TAB 1: Simulated Trading Panel */}
              {activeTab === 'chart' && (
                <div className="space-y-4">
                  {/* Buy / Sell Segmented switch */}
                  <div className="grid grid-cols-2 p-1 bg-white border border-[#E0E3EB] rounded-lg">
                    <button
                      onClick={() => setTradeType('buy')}
                      className={`py-2 text-xs font-bold rounded-md transition-all cursor-pointer ${
                        tradeType === 'buy'
                          ? 'bg-[#089981] text-white shadow-xs'
                          : 'text-[#787B86] hover:text-[#089981]'
                      }`}
                    >
                      Buy {ticker.symbol}
                    </button>
                    <button
                      onClick={() => setTradeType('sell')}
                      className={`py-2 text-xs font-bold rounded-md transition-all cursor-pointer ${
                        tradeType === 'sell'
                          ? 'bg-[#F23645] text-white shadow-xs'
                          : 'text-[#787B86] hover:text-[#F23645]'
                      }`}
                    >
                      Sell {ticker.symbol}
                    </button>
                  </div>

                  <form onSubmit={handleExecuteTrade} className="space-y-3 text-xs">
                    <div>
                      <label className="block text-[#787B86] font-medium mb-1">
                        Execution Type
                      </label>
                      <select className="w-full bg-white border border-[#E0E3EB] rounded-lg px-3 py-2 text-[#131722] font-medium outline-hidden focus:border-[#2962FF]">
                        <option>Market Order (Instant)</option>
                        <option>Limit Order</option>
                        <option>Stop Loss Order</option>
                      </select>
                    </div>

                    <div>
                      <div className="flex justify-between text-[#787B86] font-medium mb-1">
                        <span>Quantity (Shares)</span>
                        <span>Est: ${(sharesCount * ticker.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      </div>
                      <input
                        type="number"
                        min="1"
                        max="10000"
                        value={sharesCount}
                        onChange={(e) => setSharesCount(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-full bg-white border border-[#E0E3EB] rounded-lg px-3 py-2 text-[#131722] font-mono-numbers outline-hidden focus:border-[#2962FF]"
                      />
                    </div>

                    {/* Quick quantity chips */}
                    <div className="flex gap-1.5">
                      {[5, 10, 25, 50, 100].map((qty) => (
                        <button
                          key={qty}
                          type="button"
                          onClick={() => setSharesCount(qty)}
                          className="flex-1 py-1 text-[11px] bg-white border border-[#E0E3EB] rounded font-semibold text-[#434656] hover:bg-[#F0F3FA] cursor-pointer"
                        >
                          {qty}
                        </button>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-[#E0E3EB] space-y-1.5 text-[11px] text-[#787B86]">
                      <div className="flex justify-between">
                        <span>Paper Balance</span>
                        <span className="font-bold text-[#131722] font-mono-numbers">$100,000.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Estimated Fee</span>
                        <span className="text-[#089981] font-semibold">$0.00 (Commission-free)</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className={`w-full py-2.5 rounded-lg text-white font-bold text-xs shadow-sm transition-all cursor-pointer active:scale-98 ${
                        tradeType === 'buy' ? 'bg-[#089981] hover:bg-[#078570]' : 'bg-[#F23645] hover:bg-[#d92c3a]'
                      }`}
                    >
                      Place Simulated {tradeType.toUpperCase()} Order
                    </button>
                  </form>

                  {/* Confirmation Toast */}
                  {showTradeSuccess && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Order filled: {sharesCount} {ticker.symbol} at ${ticker.price.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="text-[11px] text-[#787B86] bg-white p-3 rounded-lg border border-[#E0E3EB] leading-relaxed">
                    💡 Simulated paper trading allows you to test trading strategies in real-time market conditions without capital risk.
                  </div>
                </div>
              )}

              {/* TAB 2: Order Book Depth Ladder */}
              {activeTab === 'orderbook' && (
                <div className="space-y-3">
                  <div className="flex justify-between text-[11px] font-bold text-[#787B86]">
                    <span>Price</span>
                    <span>Size</span>
                    <span>Total</span>
                  </div>

                  {/* Asks (Sell orders - red) */}
                  <div className="space-y-1">
                    {orderBook.asks.slice().reverse().map((ask, i) => (
                      <div
                        key={`ask-${i}`}
                        className="flex justify-between text-xs font-mono-numbers relative py-0.5 px-1 rounded"
                      >
                        <div
                          className="absolute right-0 top-0 bottom-0 bg-[#F23645]/10 rounded"
                          style={{ width: `${Math.min(100, (ask.total / 3000) * 100)}%` }}
                        />
                        <span className="text-[#F23645] font-bold relative z-10">{ask.price.toFixed(2)}</span>
                        <span className="text-[#434656] relative z-10">{ask.size}</span>
                        <span className="text-[#787B86] relative z-10">{ask.total}</span>
                      </div>
                    ))}
                  </div>

                  {/* Spread indicator */}
                  <div className="py-1 px-2 bg-white border border-[#E0E3EB] rounded text-center text-[11px] font-semibold text-[#131722] flex items-center justify-between">
                    <span>Spread: $0.05</span>
                    <span className="text-[#089981] font-mono-numbers">${ticker.price.toFixed(2)}</span>
                  </div>

                  {/* Bids (Buy orders - green) */}
                  <div className="space-y-1">
                    {orderBook.bids.map((bid, i) => (
                      <div
                        key={`bid-${i}`}
                        className="flex justify-between text-xs font-mono-numbers relative py-0.5 px-1 rounded"
                      >
                        <div
                          className="absolute right-0 top-0 bottom-0 bg-[#089981]/10 rounded"
                          style={{ width: `${Math.min(100, (bid.total / 3000) * 100)}%` }}
                        />
                        <span className="text-[#089981] font-bold relative z-10">{bid.price.toFixed(2)}</span>
                        <span className="text-[#434656] relative z-10">{bid.size}</span>
                        <span className="text-[#787B86] relative z-10">{bid.total}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: Key Financial Statistics */}
              {activeTab === 'financials' && (
                <div className="space-y-3 text-xs">
                  <div className="bg-white p-3 rounded-lg border border-[#E0E3EB] space-y-2">
                    <h4 className="font-bold text-[#131722]">Valuation & Overview</h4>
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div>
                        <div className="text-[#787B86]">Market Cap</div>
                        <div className="font-bold text-[#131722] font-mono-numbers">{ticker.marketCap}</div>
                      </div>
                      <div>
                        <div className="text-[#787B86]">P/E Ratio</div>
                        <div className="font-bold text-[#131722] font-mono-numbers">{ticker.peRatio || 'N/A'}</div>
                      </div>
                      <div>
                        <div className="text-[#787B86]">EPS (TTM)</div>
                        <div className="font-bold text-[#131722] font-mono-numbers">${ticker.eps || 'N/A'}</div>
                      </div>
                      <div>
                        <div className="text-[#787B86]">Beta (1Y)</div>
                        <div className="font-bold text-[#131722] font-mono-numbers">{ticker.beta || '1.00'}</div>
                      </div>
                      <div>
                        <div className="text-[#787B86]">Dividend Yield</div>
                        <div className="font-bold text-[#131722] font-mono-numbers">{ticker.dividendYield ? `${ticker.dividendYield}%` : '0.00%'}</div>
                      </div>
                      <div>
                        <div className="text-[#787B86]">Avg Volume</div>
                        <div className="font-bold text-[#131722] font-mono-numbers">{ticker.volume}</div>
                      </div>
                    </div>
                  </div>

                  {ticker.high52w && ticker.low52w && (
                    <div className="bg-white p-3 rounded-lg border border-[#E0E3EB] space-y-1.5">
                      <div className="flex justify-between text-[11px] text-[#787B86]">
                        <span>52-Wk Low: ${ticker.low52w}</span>
                        <span>52-Wk High: ${ticker.high52w}</span>
                      </div>
                      <div className="h-2 rounded-full bg-[#E0E3EB] relative">
                        <div
                          className="absolute top-0 bottom-0 bg-[#2962FF] rounded-full"
                          style={{
                            left: `${Math.max(0, ((ticker.price - ticker.low52w) / (ticker.high52w - ticker.low52w)) * 100 - 3)}%`,
                            width: '6px'
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {ticker.description && (
                    <div className="bg-white p-3 rounded-lg border border-[#E0E3EB]">
                      <h4 className="font-bold text-[#131722] mb-1">Company Profile</h4>
                      <p className="text-[11px] text-[#434656] leading-relaxed">
                        {ticker.description}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
