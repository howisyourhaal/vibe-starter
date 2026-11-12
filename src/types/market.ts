export type MarketCategory = 'us-stocks' | 'world-stocks' | 'crypto' | 'futures' | 'forex' | 'bonds';

export type SubCategory = 'overview' | 'most-active' | 'gainers' | 'losers' | 'high-volume' | 'heatmap';

export type ChartType = 'candlestick' | 'area' | 'line';

export type Timeframe = '1D' | '5D' | '1M' | '3M' | '6M' | '1Y' | '5Y' | 'ALL';

export type TechnicalRating = 'Strong Buy' | 'Buy' | 'Neutral' | 'Sell' | 'Strong Sell';

export interface CandlePoint {
  time: string;
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface TickerData {
  symbol: string;
  name: string;
  category: MarketCategory;
  sector?: string;
  price: number;
  change: number;
  changePercent: number;
  high24h: number;
  low24h: number;
  volume: string;
  volumeRaw: number;
  marketCap: string;
  marketCapRaw: number;
  peRatio?: number;
  dividendYield?: number;
  beta?: number;
  eps?: number;
  high52w?: number;
  low52w?: number;
  rating: TechnicalRating;
  logoUrl?: string;
  badgeNumber?: string;
  badgeColor?: string;
  sparkline: number[];
  description?: string;
  exchange: string;
}

export interface HeatmapItem {
  symbol: string;
  name: string;
  sector: string;
  marketCapRaw: number;
  changePercent: number;
  price: number;
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  timeAgo: string;
  url: string;
  tickers: string[];
  imageUrl?: string;
  sentiment: 'positive' | 'negative' | 'neutral';
}

export interface OrderBookLevel {
  price: number;
  size: number;
  total: number;
}

export interface TradeOrder {
  id: string;
  symbol: string;
  type: 'buy' | 'sell';
  orderType: 'market' | 'limit';
  price: number;
  shares: number;
  total: number;
  status: 'filled' | 'pending';
  timestamp: number;
}
