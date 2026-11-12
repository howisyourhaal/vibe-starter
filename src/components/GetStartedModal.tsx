import React from 'react';
import { X, Check, ShieldCheck, Zap, LineChart, TrendingUp } from 'lucide-react';

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExploreMarkets: () => void;
}

export const GetStartedModal: React.FC<GetStartedModalProps> = ({
  isOpen,
  onClose,
  onExploreMarkets,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl border border-[#E0E3EB] shadow-2xl w-full max-w-lg overflow-hidden animate-fadeIn">
        <div className="p-6 border-b border-[#E0E3EB] flex items-center justify-between bg-gradient-to-br from-[#131722] to-[#1e2538] text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#2962FF] flex items-center justify-center text-white">
              <TrendingUp className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Welcome to TradingView Markets</h3>
              <p className="text-xs text-white/70">Institutional-grade market intelligence</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-white/70 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 text-xs text-[#434656]">
          <p className="text-sm text-[#131722] font-semibold leading-relaxed">
            Experience comprehensive global financial analytics with real-time streaming quotes, sector heatmaps, and simulated paper execution.
          </p>

          <div className="space-y-3">
            {[
              {
                icon: <Zap className="w-4 h-4 text-[#2962FF]" />,
                title: 'Real-Time Global Feeds',
                desc: 'Tick-level pricing across US Equities, World Indices, Crypto, Futures, and Forex.'
              },
              {
                icon: <LineChart className="w-4 h-4 text-[#089981]" />,
                title: 'Interactive TradingView Charts',
                desc: 'Candlestick and area engines with technical moving averages, RSI, and depth ladders.'
              },
              {
                icon: <ShieldCheck className="w-4 h-4 text-[#FF9900]" />,
                title: '$100,000 Paper Trading Simulator',
                desc: 'Test your investment strategies risk-free with live order book execution.'
              }
            ].map((f, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-[#FAF9FF] border border-[#E0E3EB]">
                <div className="mt-0.5">{f.icon}</div>
                <div>
                  <div className="font-bold text-[#131722] text-xs">{f.title}</div>
                  <div className="text-[#787B86] mt-0.5">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onExploreMarkets();
              }}
              className="flex-1 py-3 bg-[#131722] hover:bg-black text-white font-bold rounded-full transition-all text-xs cursor-pointer shadow-sm active:scale-98"
            >
              Start Exploring Markets
            </button>
            <button
              onClick={onClose}
              className="px-5 py-3 border border-[#E0E3EB] hover:bg-[#F0F3FA] text-[#131722] font-semibold rounded-full transition-colors text-xs cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
