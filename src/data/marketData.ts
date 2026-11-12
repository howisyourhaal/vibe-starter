import { TickerData, HeatmapItem, NewsItem, CandlePoint, OrderBookLevel } from '../types/market';

export const MAJOR_INDICES: TickerData[] = [
  {
    symbol: 'SPX',
    name: 'S&P 500',
    category: 'us-stocks',
    price: 5983.25,
    change: 25.10,
    changePercent: 0.42,
    high24h: 5991.40,
    low24h: 5960.10,
    volume: '2.42B',
    volumeRaw: 2420000000,
    marketCap: '$45.8T',
    marketCapRaw: 45800000000000,
    rating: 'Buy',
    badgeNumber: '500',
    badgeColor: '#F23645',
    exchange: 'INDEX',
    description: 'Standard and Poor\'s 500 Index tracks the performance of 500 of the largest companies listed on stock exchanges in the United States.',
    sparkline: [5940, 5948, 5955, 5950, 5962, 5970, 5965, 5978, 5983.25]
  },
  {
    symbol: 'NDX',
    name: 'Nasdaq 100',
    category: 'us-stocks',
    price: 21120.40,
    change: 178.60,
    changePercent: 0.85,
    high24h: 21180.00,
    low24h: 20950.20,
    volume: '4.15B',
    volumeRaw: 4150000000,
    marketCap: '$24.1T',
    marketCapRaw: 24100000000000,
    rating: 'Strong Buy',
    badgeNumber: '100',
    badgeColor: '#0089FF',
    exchange: 'NASDAQ',
    description: 'The Nasdaq-100 includes 100 of the largest non-financial domestic and international companies listed on the Nasdaq based on market capitalization.',
    sparkline: [20890, 20920, 20960, 21010, 21040, 21010, 21080, 21120.4]
  },
  {
    symbol: 'DJI',
    name: 'Dow 30',
    category: 'us-stocks',
    price: 43910.80,
    change: -52.40,
    changePercent: -0.12,
    high24h: 44050.30,
    low24h: 43820.10,
    volume: '340M',
    volumeRaw: 340000000,
    marketCap: '$14.2T',
    marketCapRaw: 14200000000000,
    rating: 'Neutral',
    badgeNumber: '30',
    badgeColor: '#00BCD4',
    exchange: 'INDEX',
    description: 'The Dow Jones Industrial Average is a price-weighted measure of 30 U.S. blue-chip companies, covering all industries except transportation and utilities.',
    sparkline: [44010, 44040, 43990, 43950, 43980, 43920, 43890, 43910.8]
  },
  {
    symbol: 'RUT',
    name: 'Russell 2000',
    category: 'us-stocks',
    price: 2390.15,
    change: 29.50,
    changePercent: 1.25,
    high24h: 2398.40,
    low24h: 2355.20,
    volume: '1.18B',
    volumeRaw: 1180000000,
    marketCap: '$3.4T',
    marketCapRaw: 3400000000000,
    rating: 'Buy',
    badgeNumber: '2000',
    badgeColor: '#8E24AA',
    exchange: 'INDEX',
    description: 'The Russell 2000 Index measures the performance of the small-cap segment of the US equity universe, representing approximately 10% of total market capitalization.',
    sparkline: [2340, 2352, 2360, 2368, 2375, 2382, 2388, 2390.15]
  }
];

export const ALL_TICKERS: TickerData[] = [
  ...MAJOR_INDICES,
  // US Stocks
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    category: 'us-stocks',
    sector: 'Technology',
    price: 148.88,
    change: 4.38,
    changePercent: 3.03,
    high24h: 149.75,
    low24h: 144.20,
    volume: '62.4M',
    volumeRaw: 62400000,
    marketCap: '$3.65T',
    marketCapRaw: 3650000000000,
    peRatio: 58.4,
    dividendYield: 0.03,
    beta: 1.68,
    eps: 2.55,
    high52w: 153.15,
    low52w: 75.60,
    rating: 'Strong Buy',
    logoUrl: 'https://s3-symbol-logo.tradingview.com/nvidia--big.svg',
    exchange: 'NASDAQ',
    description: 'NVIDIA Corporation designs graphics processing units (GPUs) for the gaming and professional markets, as well as system on a chip units (SoCs) for the mobile computing and automotive market, powering global AI compute.',
    sparkline: [142.5, 144.1, 145.8, 145.2, 147.0, 146.5, 148.2, 148.88]
  },
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    category: 'us-stocks',
    sector: 'Technology',
    price: 228.45,
    change: 1.95,
    changePercent: 0.86,
    high24h: 229.80,
    low24h: 226.30,
    volume: '48.1M',
    volumeRaw: 48100000,
    marketCap: '$3.45T',
    marketCapRaw: 3450000000000,
    peRatio: 36.2,
    dividendYield: 0.44,
    beta: 1.05,
    eps: 6.31,
    high52w: 237.23,
    low52w: 164.08,
    rating: 'Buy',
    logoUrl: 'https://s3-symbol-logo.tradingview.com/apple--big.svg',
    exchange: 'NASDAQ',
    description: 'Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories, and sells a variety of related services.',
    sparkline: [225.8, 226.4, 227.1, 226.9, 227.5, 228.0, 228.1, 228.45]
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    category: 'us-stocks',
    sector: 'Technology',
    price: 422.90,
    change: 3.10,
    changePercent: 0.74,
    high24h: 424.50,
    low24h: 419.80,
    volume: '22.8M',
    volumeRaw: 22800000,
    marketCap: '$3.14T',
    marketCapRaw: 3140000000000,
    peRatio: 35.1,
    dividendYield: 0.78,
    beta: 0.89,
    eps: 12.05,
    high52w: 468.35,
    low52w: 366.50,
    rating: 'Buy',
    logoUrl: 'https://s3-symbol-logo.tradingview.com/microsoft--big.svg',
    exchange: 'NASDAQ',
    description: 'Microsoft Corporation develops and supports software, services, devices and solutions. Its segments include Productivity and Business Processes, Intelligent Cloud and More Personal Computing.',
    sparkline: [418.5, 419.2, 421.0, 420.5, 421.8, 422.3, 422.0, 422.9]
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    category: 'us-stocks',
    sector: 'Consumer Cyclical',
    price: 211.50,
    change: 2.80,
    changePercent: 1.34,
    high24h: 212.80,
    low24h: 208.10,
    volume: '38.6M',
    volumeRaw: 38600000,
    marketCap: '$2.22T',
    marketCapRaw: 2220000000000,
    peRatio: 44.2,
    dividendYield: 0.0,
    beta: 1.15,
    eps: 4.78,
    high52w: 215.90,
    low52w: 140.20,
    rating: 'Strong Buy',
    logoUrl: 'https://s3-symbol-logo.tradingview.com/amazon--big.svg',
    exchange: 'NASDAQ',
    description: 'Amazon.com, Inc. focuses on retail sale of consumer products, subscriptions, and cloud computing infrastructure through Amazon Web Services (AWS).',
    sparkline: [207.5, 208.3, 209.6, 209.0, 210.4, 211.0, 210.8, 211.5]
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    category: 'us-stocks',
    sector: 'Communication',
    price: 181.25,
    change: -1.15,
    changePercent: -0.63,
    high24h: 183.40,
    low24h: 180.20,
    volume: '24.9M',
    volumeRaw: 24900000,
    marketCap: '$2.25T',
    marketCapRaw: 2250000000000,
    peRatio: 23.8,
    dividendYield: 0.44,
    beta: 1.08,
    eps: 7.61,
    high52w: 191.75,
    low52w: 129.40,
    rating: 'Buy',
    logoUrl: 'https://s3-symbol-logo.tradingview.com/alphabet--big.svg',
    exchange: 'NASDAQ',
    description: 'Alphabet Inc. is a holding company with Google as its largest subsidiary. Google provides web-based search, ads, maps, YouTube, cloud solutions and mobile operating software.',
    sparkline: [183.0, 183.4, 182.2, 181.8, 181.5, 182.0, 181.4, 181.25]
  },
  {
    symbol: 'META',
    name: 'Meta Platforms Inc.',
    category: 'us-stocks',
    sector: 'Communication',
    price: 592.30,
    change: 8.60,
    changePercent: 1.47,
    high24h: 595.00,
    low24h: 581.50,
    volume: '16.5M',
    volumeRaw: 16500000,
    marketCap: '$1.49T',
    marketCapRaw: 1490000000000,
    peRatio: 27.6,
    dividendYield: 0.34,
    beta: 1.22,
    eps: 21.46,
    high52w: 602.95,
    low52w: 313.66,
    rating: 'Strong Buy',
    logoUrl: 'https://s3-symbol-logo.tradingview.com/meta--big.svg',
    exchange: 'NASDAQ',
    description: 'Meta Platforms builds technologies that help people connect, find communities, and grow businesses across Facebook, Instagram, Messenger, and WhatsApp.',
    sparkline: [580.0, 584.2, 587.5, 585.0, 589.4, 591.0, 590.2, 592.3]
  },
  {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    category: 'us-stocks',
    sector: 'Consumer Cyclical',
    price: 345.80,
    change: 14.20,
    changePercent: 4.28,
    high24h: 349.50,
    low24h: 328.00,
    volume: '88.3M',
    volumeRaw: 88300000,
    marketCap: '$1.11T',
    marketCapRaw: 1110000000000,
    peRatio: 89.5,
    dividendYield: 0.0,
    beta: 2.34,
    eps: 3.86,
    high52w: 358.64,
    low52w: 138.80,
    rating: 'Strong Buy',
    logoUrl: 'https://s3-symbol-logo.tradingview.com/tesla--big.svg',
    exchange: 'NASDAQ',
    description: 'Tesla designs, develops, manufactures, sells, and leases electric vehicles, energy storage systems, solar panels, and solar roof tiles.',
    sparkline: [328.0, 332.5, 336.0, 334.2, 340.5, 343.0, 342.1, 345.8]
  },
  {
    symbol: 'BRK.B',
    name: 'Berkshire Hathaway Inc.',
    category: 'us-stocks',
    sector: 'Financials',
    price: 468.20,
    change: -1.30,
    changePercent: -0.28,
    high24h: 471.00,
    low24h: 466.80,
    volume: '3.4M',
    volumeRaw: 3400000,
    marketCap: '$1.01T',
    marketCapRaw: 1010000000000,
    peRatio: 21.4,
    dividendYield: 0.0,
    beta: 0.65,
    eps: 21.88,
    high52w: 484.80,
    low52w: 350.20,
    rating: 'Neutral',
    logoUrl: 'https://s3-symbol-logo.tradingview.com/berkshire-hathaway--big.svg',
    exchange: 'NYSE',
    description: 'Berkshire Hathaway Inc. is an American multinational conglomerate holding company headquartered in Omaha, Nebraska, managed by Warren Buffett.',
    sparkline: [469.5, 470.2, 468.9, 467.5, 468.4, 467.9, 468.0, 468.2]
  },
  {
    symbol: 'LLY',
    name: 'Eli Lilly and Company',
    category: 'us-stocks',
    sector: 'Healthcare',
    price: 792.40,
    change: 11.20,
    changePercent: 1.43,
    high24h: 798.50,
    low24h: 780.00,
    volume: '4.2M',
    volumeRaw: 4200000,
    marketCap: '$752B',
    marketCapRaw: 752000000000,
    peRatio: 84.2,
    dividendYield: 0.66,
    beta: 0.42,
    eps: 9.41,
    high52w: 972.53,
    low52w: 565.00,
    rating: 'Buy',
    logoUrl: 'https://s3-symbol-logo.tradingview.com/eli-lilly-and-company--big.svg',
    exchange: 'NYSE',
    description: 'Eli Lilly and Company discovers, develops, and markets pharmaceuticals products worldwide, leading in diabetes and weight-management treatments.',
    sparkline: [778.0, 782.5, 786.0, 784.0, 789.5, 793.0, 790.8, 792.4]
  },
  {
    symbol: 'JPM',
    name: 'JPMorgan Chase & Co.',
    category: 'us-stocks',
    sector: 'Financials',
    price: 242.60,
    change: 3.40,
    changePercent: 1.42,
    high24h: 244.10,
    low24h: 239.50,
    volume: '11.8M',
    volumeRaw: 11800000,
    marketCap: '$692B',
    marketCapRaw: 692000000000,
    peRatio: 12.8,
    dividendYield: 1.90,
    beta: 1.10,
    eps: 18.95,
    high52w: 248.50,
    low52w: 147.20,
    rating: 'Strong Buy',
    logoUrl: 'https://s3-symbol-logo.tradingview.com/jpmorgan-chase--big.svg',
    exchange: 'NYSE',
    description: 'JPMorgan Chase & Co. is a financial services holding company engaged in investment banking, financial services for consumers and small business, and commercial banking.',
    sparkline: [238.5, 239.8, 241.0, 240.2, 242.0, 243.1, 241.9, 242.6]
  },
  {
    symbol: 'AVGO',
    name: 'Broadcom Inc.',
    category: 'us-stocks',
    sector: 'Technology',
    price: 168.40,
    change: -2.30,
    changePercent: -1.35,
    high24h: 172.00,
    low24h: 167.10,
    volume: '18.9M',
    volumeRaw: 18900000,
    marketCap: '$786B',
    marketCapRaw: 786000000000,
    peRatio: 48.0,
    dividendYield: 1.25,
    beta: 1.28,
    eps: 3.51,
    high52w: 185.16,
    low52w: 94.20,
    rating: 'Buy',
    logoUrl: 'https://s3-symbol-logo.tradingview.com/broadcom--big.svg',
    exchange: 'NASDAQ',
    description: 'Broadcom Inc. designs, develops, and supplies various semiconductor and infrastructure software solutions worldwide.',
    sparkline: [171.0, 172.2, 170.8, 169.5, 170.1, 169.0, 168.2, 168.4]
  },
  {
    symbol: 'PLTR',
    name: 'Palantir Technologies',
    category: 'us-stocks',
    sector: 'Technology',
    price: 63.80,
    change: 3.90,
    changePercent: 6.51,
    high24h: 64.90,
    low24h: 59.80,
    volume: '94.2M',
    volumeRaw: 94200000,
    marketCap: '$144B',
    marketCapRaw: 144000000000,
    peRatio: 112.4,
    dividendYield: 0.0,
    beta: 2.75,
    eps: 0.57,
    high52w: 66.00,
    low52w: 16.50,
    rating: 'Strong Buy',
    logoUrl: 'https://s3-symbol-logo.tradingview.com/palantir-technologies--big.svg',
    exchange: 'NASDAQ',
    description: 'Palantir Technologies builds software and artificial intelligence platforms that empower organizations to effectively integrate their data, decisions, and operations.',
    sparkline: [59.5, 60.8, 62.1, 61.5, 63.0, 64.2, 63.5, 63.8]
  },

  // World Stocks
  {
    symbol: 'N225',
    name: 'Nikkei 225 (Japan)',
    category: 'world-stocks',
    price: 38720.50,
    change: 410.20,
    changePercent: 1.07,
    high24h: 38950.00,
    low24h: 38450.00,
    volume: '1.45B',
    volumeRaw: 1450000000,
    marketCap: '$4.9T',
    marketCapRaw: 4900000000000,
    rating: 'Buy',
    exchange: 'TSE',
    description: 'The Nikkei 225 Stock Average is the leading and most-respected index of Japanese stocks. It is a price-weighted index comprised of Japan\'s top 225 blue-chip companies.',
    sparkline: [38200, 38350, 38500, 38420, 38600, 38750, 38690, 38720.5]
  },
  {
    symbol: 'FTSE',
    name: 'FTSE 100 (UK)',
    category: 'world-stocks',
    price: 8140.20,
    change: 32.10,
    changePercent: 0.40,
    high24h: 8165.00,
    low24h: 8105.00,
    volume: '820M',
    volumeRaw: 820000000,
    marketCap: '$2.6T',
    marketCapRaw: 2600000000000,
    rating: 'Neutral',
    exchange: 'LSE',
    description: 'The Financial Times Stock Exchange 100 Index comprises the 100 largest qualifying UK-domiciled companies by full market value on the London Stock Exchange.',
    sparkline: [8100, 8115, 8128, 8120, 8135, 8145, 8138, 8140.2]
  },
  {
    symbol: 'DAX',
    name: 'DAX 40 (Germany)',
    category: 'world-stocks',
    price: 19480.30,
    change: 145.80,
    changePercent: 0.75,
    high24h: 19520.00,
    low24h: 19320.00,
    volume: '650M',
    volumeRaw: 650000000,
    marketCap: '$2.1T',
    marketCapRaw: 2100000000000,
    rating: 'Buy',
    exchange: 'XETRA',
    description: 'The DAX is a blue chip stock market index consisting of 40 major German companies trading on the Frankfurt Stock Exchange.',
    sparkline: [19310, 19360, 19410, 19390, 19450, 19490, 19470, 19480.3]
  },
  {
    symbol: 'HSI',
    name: 'Hang Seng (Hong Kong)',
    category: 'world-stocks',
    price: 19825.60,
    change: -210.40,
    changePercent: -1.05,
    high24h: 20110.00,
    low24h: 19780.00,
    volume: '2.10B',
    volumeRaw: 2100000000,
    marketCap: '$3.8T',
    marketCapRaw: 3800000000000,
    rating: 'Sell',
    exchange: 'HKEX',
    description: 'The Hang Seng Index is a freefloat-adjusted market-capitalization-weighted stock-market index in Hong Kong used to record and monitor daily changes of the largest companies.',
    sparkline: [20050, 20100, 19980, 19910, 19880, 19850, 19810, 19825.6]
  },
  {
    symbol: 'TSM',
    name: 'Taiwan Semiconductor',
    category: 'world-stocks',
    sector: 'Technology',
    price: 192.40,
    change: 4.80,
    changePercent: 2.56,
    high24h: 194.20,
    low24h: 188.50,
    volume: '26.4M',
    volumeRaw: 26400000,
    marketCap: '$998B',
    marketCapRaw: 998000000000,
    peRatio: 31.2,
    dividendYield: 1.18,
    beta: 1.25,
    eps: 6.17,
    rating: 'Strong Buy',
    logoUrl: 'https://s3-symbol-logo.tradingview.com/taiwan-semiconductor-manufacturing--big.svg',
    exchange: 'NYSE',
    description: 'TSMC is the world\'s most valuable semiconductor company and largest dedicated independent pure-play foundry, manufacturing chips for Apple, Nvidia, and AMD.',
    sparkline: [187.0, 189.2, 190.5, 189.8, 191.6, 193.0, 192.1, 192.4]
  },
  {
    symbol: 'ASML',
    name: 'ASML Holding N.V.',
    category: 'world-stocks',
    sector: 'Technology',
    price: 685.10,
    change: 12.40,
    changePercent: 1.84,
    high24h: 691.00,
    low24h: 674.00,
    volume: '2.8M',
    volumeRaw: 2800000,
    marketCap: '$274B',
    marketCapRaw: 274000000000,
    peRatio: 37.8,
    dividendYield: 0.95,
    beta: 1.34,
    eps: 18.12,
    rating: 'Buy',
    logoUrl: 'https://s3-symbol-logo.tradingview.com/asml-holding--big.svg',
    exchange: 'NASDAQ',
    description: 'ASML is a Dutch multinational corporation and the largest supplier for the semiconductor industry, sole manufacturer of extreme ultraviolet lithography (EUV) machines.',
    sparkline: [671.0, 676.0, 680.5, 679.0, 683.2, 686.5, 684.0, 685.1]
  },

  // Crypto
  {
    symbol: 'BTCUSD',
    name: 'Bitcoin / US Dollar',
    category: 'crypto',
    price: 91420.50,
    change: 2480.00,
    changePercent: 2.79,
    high24h: 92850.00,
    low24h: 88600.00,
    volume: '$48.5B',
    volumeRaw: 48500000000,
    marketCap: '$1.80T',
    marketCapRaw: 1800000000000,
    rating: 'Strong Buy',
    logoUrl: 'https://s3-symbol-logo.tradingview.com/crypto/XTVCBTC--big.svg',
    exchange: 'CRYPTO',
    description: 'Bitcoin is the first decentralized digital currency enabling peer-to-peer transfers across the globe secured by cryptographic proof-of-work consensus.',
    sparkline: [88400, 89100, 90200, 89800, 90900, 91800, 91200, 91420.5]
  },
  {
    symbol: 'ETHUSD',
    name: 'Ethereum / US Dollar',
    category: 'crypto',
    price: 3342.10,
    change: 62.40,
    changePercent: 1.90,
    high24h: 3390.00,
    low24h: 3260.00,
    volume: '$24.2B',
    volumeRaw: 24200000000,
    marketCap: '$402B',
    marketCapRaw: 402000000000,
    rating: 'Buy',
    logoUrl: 'https://s3-symbol-logo.tradingview.com/crypto/XTVCETH--big.svg',
    exchange: 'CRYPTO',
    description: 'Ethereum is a decentralized, open-source blockchain with smart contract functionality, serving as the foundational platform for DeFi and Web3 tokens.',
    sparkline: [3250, 3280, 3310, 3295, 3330, 3360, 3335, 3342.1]
  },
  {
    symbol: 'SOLUSD',
    name: 'Solana / US Dollar',
    category: 'crypto',
    price: 218.65,
    change: 9.85,
    changePercent: 4.72,
    high24h: 222.40,
    low24h: 206.50,
    volume: '$8.9B',
    volumeRaw: 8900000000,
    marketCap: '$103B',
    marketCapRaw: 103000000000,
    rating: 'Strong Buy',
    logoUrl: 'https://s3-symbol-logo.tradingview.com/crypto/XTVCSOL--big.svg',
    exchange: 'CRYPTO',
    description: 'Solana is a high-performance blockchain supporting builders around the world creating crypto apps that scale today, utilizing proof-of-history consensus.',
    sparkline: [205.0, 209.5, 214.0, 212.8, 217.2, 221.0, 217.9, 218.65]
  },
  {
    symbol: 'BNBUSD',
    name: 'BNB / US Dollar',
    category: 'crypto',
    price: 645.20,
    change: 5.40,
    changePercent: 0.84,
    high24h: 652.00,
    low24h: 636.00,
    volume: '$1.8B',
    volumeRaw: 1800000000,
    marketCap: '$94B',
    marketCapRaw: 94000000000,
    rating: 'Neutral',
    logoUrl: 'https://s3-symbol-logo.tradingview.com/crypto/XTVCBNB--big.svg',
    exchange: 'CRYPTO',
    description: 'BNB fuels the BNB Chain ecosystem, powering transactions on BNB Smart Chain and offering fee discounts across the Binance exchange ecosystem.',
    sparkline: [638, 640, 644, 642, 647, 649, 644, 645.2]
  },
  {
    symbol: 'XRPUSD',
    name: 'XRP / US Dollar',
    category: 'crypto',
    price: 1.142,
    change: 0.084,
    changePercent: 7.94,
    high24h: 1.185,
    low24h: 1.045,
    volume: '$7.4B',
    volumeRaw: 7400000000,
    marketCap: '$65B',
    marketCapRaw: 65000000000,
    rating: 'Strong Buy',
    logoUrl: 'https://s3-symbol-logo.tradingview.com/crypto/XTVCXRP--big.svg',
    exchange: 'CRYPTO',
    description: 'XRP is the native token of the XRP Ledger, an open-source, public blockchain designed to facilitate faster and cheaper payments globally.',
    sparkline: [1.04, 1.07, 1.10, 1.09, 1.13, 1.16, 1.135, 1.142]
  },

  // Futures
  {
    symbol: 'ES1!',
    name: 'S&P 500 E-mini Futures',
    category: 'futures',
    price: 5994.50,
    change: 26.25,
    changePercent: 0.44,
    high24h: 6002.75,
    low24h: 5971.25,
    volume: '1.24M',
    volumeRaw: 1240000,
    marketCap: '$1.8T Open Int',
    marketCapRaw: 1800000000000,
    rating: 'Buy',
    exchange: 'CME',
    description: 'E-mini S&P 500 futures are electronically traded futures contracts representing a fraction of the value of standard S&P 500 futures contracts.',
    sparkline: [5965, 5972, 5980, 5976, 5989, 5998, 5992, 5994.5]
  },
  {
    symbol: 'NQ1!',
    name: 'Nasdaq 100 E-mini Futures',
    category: 'futures',
    price: 21155.00,
    change: 182.50,
    changePercent: 0.87,
    high24h: 21210.00,
    low24h: 20980.00,
    volume: '850K',
    volumeRaw: 850000,
    marketCap: '$980B Open Int',
    marketCapRaw: 980000000000,
    rating: 'Strong Buy',
    exchange: 'CME',
    description: 'Nasdaq-100 Index futures provide exposure to the 100 largest non-financial companies listed on the Nasdaq Stock Market.',
    sparkline: [20950, 20990, 21040, 21010, 21090, 21170, 21140, 21155]
  },
  {
    symbol: 'GC1!',
    name: 'Gold Futures',
    category: 'futures',
    price: 2684.50,
    change: 16.20,
    changePercent: 0.61,
    high24h: 2692.80,
    low24h: 2665.10,
    volume: '240K',
    volumeRaw: 240000,
    marketCap: '$17.2T Phys Equiv',
    marketCapRaw: 17200000000000,
    rating: 'Buy',
    exchange: 'COMEX',
    description: 'Gold futures are standard agreements to trade a set amount of gold (100 troy ounces) at a specific future date and price.',
    sparkline: [2664, 2670, 2675, 2672, 2680, 2688, 2682, 2684.5]
  },
  {
    symbol: 'CL1!',
    name: 'Crude Oil WTI Futures',
    category: 'futures',
    price: 68.90,
    change: -1.25,
    changePercent: -1.78,
    high24h: 70.45,
    low24h: 68.30,
    volume: '410K',
    volumeRaw: 410000,
    marketCap: '$450B Open Int',
    marketCapRaw: 450000000000,
    rating: 'Sell',
    exchange: 'NYMEX',
    description: 'Light Sweet Crude Oil (WTI) futures are the world\'s most liquid energy contract, serving as the international pricing benchmark for crude oil.',
    sparkline: [70.2, 70.4, 69.8, 69.3, 69.6, 68.8, 68.7, 68.9]
  },
  {
    symbol: 'SI1!',
    name: 'Silver Futures',
    category: 'futures',
    price: 31.45,
    change: 0.52,
    changePercent: 1.68,
    high24h: 31.80,
    low24h: 30.85,
    volume: '95K',
    volumeRaw: 95000,
    marketCap: '$1.4T Phys Equiv',
    marketCapRaw: 1400000000000,
    rating: 'Buy',
    exchange: 'COMEX',
    description: 'Silver futures contract representing 5,000 troy ounces of silver, widely traded for industrial demand and precious metal safe-haven hedging.',
    sparkline: [30.8, 31.0, 31.2, 31.1, 31.3, 31.6, 31.4, 31.45]
  },

  // Forex
  {
    symbol: 'EURUSD',
    name: 'Euro / US Dollar',
    category: 'forex',
    price: 1.0542,
    change: 0.0016,
    changePercent: 0.15,
    high24h: 1.0575,
    low24h: 1.0515,
    volume: '$420B',
    volumeRaw: 420000000000,
    marketCap: 'Fx Liquidity Tier 1',
    marketCapRaw: 5000000000000,
    rating: 'Neutral',
    exchange: 'FX',
    description: 'EUR/USD represents the relative value of the euro against the US dollar, being the most actively traded currency pair in the foreign exchange market.',
    sparkline: [1.052, 1.053, 1.054, 1.0535, 1.055, 1.056, 1.0538, 1.0542]
  },
  {
    symbol: 'USDJPY',
    name: 'US Dollar / Japanese Yen',
    category: 'forex',
    price: 154.65,
    change: 0.45,
    changePercent: 0.29,
    high24h: 155.10,
    low24h: 153.90,
    volume: '$280B',
    volumeRaw: 280000000000,
    marketCap: 'Fx Liquidity Tier 1',
    marketCapRaw: 4000000000000,
    rating: 'Buy',
    exchange: 'FX',
    description: 'USD/JPY expresses how many Japanese yen are needed to purchase one US dollar, a primary gauge for Asian macroeconomic sentiment and carry trade dynamics.',
    sparkline: [154.0, 154.2, 154.5, 154.3, 154.8, 155.0, 154.5, 154.65]
  },
  {
    symbol: 'GBPUSD',
    name: 'British Pound / US Dollar',
    category: 'forex',
    price: 1.2640,
    change: -0.0025,
    changePercent: -0.20,
    high24h: 1.2685,
    low24h: 1.2610,
    volume: '$190B',
    volumeRaw: 190000000000,
    marketCap: 'Fx Liquidity Tier 1',
    marketCapRaw: 3000000000000,
    rating: 'Neutral',
    exchange: 'FX',
    description: 'Often referred to as \'Cable\', GBP/USD is one of the oldest and most widely traded currency pairs, sensitive to Bank of England and Federal Reserve monetary policy.',
    sparkline: [1.267, 1.268, 1.265, 1.263, 1.266, 1.264, 1.2635, 1.264]
  },
  {
    symbol: 'DXY',
    name: 'US Dollar Index',
    category: 'forex',
    price: 106.45,
    change: 0.28,
    changePercent: 0.26,
    high24h: 106.80,
    low24h: 106.10,
    volume: '$120B',
    volumeRaw: 120000000000,
    marketCap: 'Benchmark Index',
    marketCapRaw: 2000000000000,
    rating: 'Buy',
    exchange: 'ICE',
    description: 'The U.S. Dollar Index measures the value of the United States dollar relative to a basket of foreign currencies (EUR, JPY, GBP, CAD, SEK, CHF).',
    sparkline: [106.1, 106.25, 106.4, 106.3, 106.55, 106.7, 106.4, 106.45]
  },

  // Bonds
  {
    symbol: 'US10Y',
    name: 'US 10-Year Treasury Yield',
    category: 'bonds',
    price: 4.442,
    change: 0.038,
    changePercent: 0.86,
    high24h: 4.480,
    low24h: 4.395,
    volume: '$650B',
    volumeRaw: 650000000000,
    marketCap: 'Sovereign Debt Benchmark',
    marketCapRaw: 28000000000000,
    rating: 'Neutral',
    exchange: 'BOND',
    description: 'The 10-year Treasury note yield serves as the global benchmark for borrowing costs, mortgage rates, and equity risk premium calculations.',
    sparkline: [4.39, 4.41, 4.43, 4.42, 4.45, 4.47, 4.435, 4.442]
  },
  {
    symbol: 'US02Y',
    name: 'US 2-Year Treasury Yield',
    category: 'bonds',
    price: 4.285,
    change: -0.012,
    changePercent: -0.28,
    high24h: 4.310,
    low24h: 4.260,
    volume: '$480B',
    volumeRaw: 480000000000,
    marketCap: 'Short-Duration Sovereign',
    marketCapRaw: 12000000000000,
    rating: 'Neutral',
    exchange: 'BOND',
    description: 'The 2-year yield is closely aligned with near-term Federal Reserve interest rate policy expectations and central bank terminal rate pricing.',
    sparkline: [4.30, 4.31, 4.29, 4.28, 4.29, 4.28, 4.275, 4.285]
  }
];

export const HEATMAP_DATA: HeatmapItem[] = [
  // Technology
  { symbol: 'NVDA', name: 'NVIDIA', sector: 'Technology', marketCapRaw: 3650, changePercent: 3.03, price: 148.88 },
  { symbol: 'AAPL', name: 'Apple', sector: 'Technology', marketCapRaw: 3450, changePercent: 0.86, price: 228.45 },
  { symbol: 'MSFT', name: 'Microsoft', sector: 'Technology', marketCapRaw: 3140, changePercent: 0.74, price: 422.90 },
  { symbol: 'AVGO', name: 'Broadcom', sector: 'Technology', marketCapRaw: 786, changePercent: -1.35, price: 168.40 },
  { symbol: 'ORCL', name: 'Oracle', sector: 'Technology', marketCapRaw: 512, changePercent: 1.12, price: 188.50 },
  { symbol: 'AMD', name: 'AMD', sector: 'Technology', marketCapRaw: 224, changePercent: 2.15, price: 138.20 },
  { symbol: 'PLTR', name: 'Palantir', sector: 'Technology', marketCapRaw: 144, changePercent: 6.51, price: 63.80 },

  // Communication Services
  { symbol: 'GOOGL', name: 'Alphabet', sector: 'Communication', marketCapRaw: 2250, changePercent: -0.63, price: 181.25 },
  { symbol: 'META', name: 'Meta Platforms', sector: 'Communication', marketCapRaw: 1490, changePercent: 1.47, price: 592.30 },
  { symbol: 'NFLX', name: 'Netflix', sector: 'Communication', marketCapRaw: 362, changePercent: 1.82, price: 840.10 },
  { symbol: 'DIS', name: 'Walt Disney', sector: 'Communication', marketCapRaw: 210, changePercent: -0.45, price: 114.60 },

  // Consumer Cyclical
  { symbol: 'AMZN', name: 'Amazon', sector: 'Consumer Cyclical', marketCapRaw: 2220, changePercent: 1.34, price: 211.50 },
  { symbol: 'TSLA', name: 'Tesla', sector: 'Consumer Cyclical', marketCapRaw: 1110, changePercent: 4.28, price: 345.80 },
  { symbol: 'HD', name: 'Home Depot', sector: 'Consumer Cyclical', marketCapRaw: 405, changePercent: -0.32, price: 408.20 },
  { symbol: 'MCD', name: 'McDonald\'s', sector: 'Consumer Cyclical', marketCapRaw: 212, changePercent: 0.24, price: 295.40 },

  // Financials
  { symbol: 'BRK.B', name: 'Berkshire', sector: 'Financials', marketCapRaw: 1010, changePercent: -0.28, price: 468.20 },
  { symbol: 'JPM', name: 'JPMorgan Chase', sector: 'Financials', marketCapRaw: 692, changePercent: 1.42, price: 242.60 },
  { symbol: 'V', name: 'Visa', sector: 'Financials', marketCapRaw: 585, changePercent: 0.58, price: 308.10 },
  { symbol: 'MA', name: 'Mastercard', sector: 'Financials', marketCapRaw: 478, changePercent: 0.65, price: 518.40 },
  { symbol: 'BAC', name: 'Bank of America', sector: 'Financials', marketCapRaw: 362, changePercent: 1.05, price: 46.80 },
  { symbol: 'GS', name: 'Goldman Sachs', sector: 'Financials', marketCapRaw: 195, changePercent: 2.10, price: 584.20 },

  // Healthcare
  { symbol: 'LLY', name: 'Eli Lilly', sector: 'Healthcare', marketCapRaw: 752, changePercent: 1.43, price: 792.40 },
  { symbol: 'UNH', name: 'UnitedHealth', sector: 'Healthcare', marketCapRaw: 545, changePercent: -0.85, price: 590.20 },
  { symbol: 'JNJ', name: 'Johnson & Johnson', sector: 'Healthcare', marketCapRaw: 382, changePercent: 0.15, price: 158.40 },
  { symbol: 'ABBV', name: 'AbbVie', sector: 'Healthcare', marketCapRaw: 320, changePercent: -1.10, price: 178.60 },

  // Energy & Industrials
  { symbol: 'XOM', name: 'Exxon Mobil', sector: 'Energy', marketCapRaw: 495, changePercent: -1.20, price: 119.50 },
  { symbol: 'CVX', name: 'Chevron', sector: 'Energy', marketCapRaw: 290, changePercent: -0.92, price: 158.20 },
  { symbol: 'GE', name: 'GE Aerospace', sector: 'Industrials', marketCapRaw: 198, changePercent: 1.75, price: 184.20 },
  { symbol: 'CAT', name: 'Caterpillar', sector: 'Industrials', marketCapRaw: 192, changePercent: 0.82, price: 395.10 }
];

export const NEWS_STORIES: NewsItem[] = [
  {
    id: 'n1',
    title: 'NVIDIA Expands Blackwell Enterprise AI Architecture as Hyperscaler Cloud Demand Hits All-Time Record',
    source: 'TradingView News',
    timeAgo: '14m ago',
    url: '#',
    tickers: ['NVDA', 'MSFT', 'AMZN'],
    sentiment: 'positive'
  },
  {
    id: 'n2',
    title: 'S&P 500 Breaches New Intraday Benchmark Driven by Resilient Tech Rally and Favorable Bond Yields',
    source: 'Reuters Financial',
    timeAgo: '32m ago',
    url: '#',
    tickers: ['SPX', 'NDX', 'US10Y'],
    sentiment: 'positive'
  },
  {
    id: 'n3',
    title: 'Bitcoin Consolidates Above $91,000 as Institutional Spot ETF Daily Inflows Top $800 Million',
    source: 'Bloomberg Crypto',
    timeAgo: '1h ago',
    url: '#',
    tickers: ['BTCUSD', 'ETHUSD', 'SOLUSD'],
    sentiment: 'positive'
  },
  {
    id: 'n4',
    title: 'Federal Reserve Monetary Policy Committee Signals Measured Approach to Future Benchmark Rate Adjustments',
    source: 'Financial Times',
    timeAgo: '2h ago',
    url: '#',
    tickers: ['DXY', 'US10Y', 'EURUSD'],
    sentiment: 'neutral'
  },
  {
    id: 'n5',
    title: 'Crude Oil Pressured by Elevated Global Inventory Data Amid Shifting Energy Sector Projections',
    source: 'Wall Street Journal',
    timeAgo: '3h ago',
    url: '#',
    tickers: ['CL1!', 'XOM', 'CVX'],
    sentiment: 'negative'
  }
];

// Generate authentic multi-timeframe candle data for the interactive chart engine
export function generateCandleData(ticker: TickerData, timeframe: string): CandlePoint[] {
  const pointsCount = timeframe === '1D' ? 78 : timeframe === '5D' ? 90 : timeframe === '1M' ? 60 : 120;
  const candles: CandlePoint[] = [];
  const basePrice = ticker.price;
  const volatility = ticker.category === 'crypto' ? 0.022 : ticker.symbol === 'NVDA' || ticker.symbol === 'TSLA' ? 0.015 : 0.007;

  let currentPrice = basePrice * (1 - (ticker.changePercent / 100) * 0.7);
  const now = Date.now();
  const stepMs = timeframe === '1D' ? 5 * 60 * 1000 : timeframe === '5D' ? 30 * 60 * 1000 : timeframe === '1M' ? 4 * 3600 * 1000 : 24 * 3600 * 1000;

  for (let i = pointsCount - 1; i >= 0; i--) {
    const timestamp = now - i * stepMs;
    const dateObj = new Date(timestamp);
    const timeStr = timeframe === '1D'
      ? dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      : `${dateObj.getMonth() + 1}/${dateObj.getDate()} ${timeStrOrEmpty(timeframe, dateObj)}`;

    // Drift slightly towards the target live price at the end
    const progress = (pointsCount - i) / pointsCount;
    const targetTendency = (basePrice - currentPrice) * 0.12;
    const randomDelta = (Math.sin(i * 0.45) * 0.6 + (Math.random() - 0.48) * 1.8) * (currentPrice * volatility);
    
    const open = currentPrice;
    let close = i === 0 ? basePrice : currentPrice + targetTendency + randomDelta;
    if (close < 0.01) close = 0.01;

    const high = Math.max(open, close) + Math.random() * (currentPrice * volatility * 0.8);
    const low = Math.min(open, close) - Math.random() * (currentPrice * volatility * 0.8);
    const volume = Math.floor((Math.random() * 0.7 + 0.6) * (ticker.volumeRaw / (pointsCount * 1.5)));

    candles.push({
      time: timeStr,
      timestamp,
      open: Number(open.toFixed(2)),
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2)),
      close: Number(close.toFixed(2)),
      volume: Math.max(1000, volume)
    });

    currentPrice = close;
  }

  return candles;
}

function timeStrOrEmpty(timeframe: string, d: Date): string {
  if (timeframe === '5D' || timeframe === '1M') {
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  return '';
}

// Generate realistic dynamic order book ladder
export function generateOrderBook(basePrice: number): { bids: OrderBookLevel[]; asks: OrderBookLevel[] } {
  const bids: OrderBookLevel[] = [];
  const asks: OrderBookLevel[] = [];
  const tick = basePrice > 1000 ? 0.25 : basePrice > 50 ? 0.05 : 0.01;

  let bidTotal = 0;
  for (let i = 1; i <= 6; i++) {
    const price = Number((basePrice - i * tick).toFixed(2));
    const size = Math.floor(100 + Math.random() * 850);
    bidTotal += size;
    bids.push({ price, size, total: bidTotal });
  }

  let askTotal = 0;
  for (let i = 1; i <= 6; i++) {
    const price = Number((basePrice + i * tick).toFixed(2));
    const size = Math.floor(100 + Math.random() * 850);
    askTotal += size;
    asks.push({ price, size, total: askTotal });
  }

  return { bids, asks };
}
