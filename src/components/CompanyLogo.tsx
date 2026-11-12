import React, { useState } from 'react';

interface CompanyLogoProps {
  symbol: string;
  name: string;
  logoUrl?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const COLOR_MAP: Record<string, string> = {
  NVDA: 'bg-[#76B900] text-white',
  AAPL: 'bg-[#18181B] text-white',
  MSFT: 'bg-[#0078D4] text-white',
  AMZN: 'bg-[#FF9900] text-black',
  GOOGL: 'bg-[#4285F4] text-white',
  META: 'bg-[#0064E0] text-white',
  TSLA: 'bg-[#E82127] text-white',
  BTCUSD: 'bg-[#F7931A] text-white',
  ETHUSD: 'bg-[#627EEA] text-white',
  SOLUSD: 'bg-[#14F195] text-black',
  JPM: 'bg-[#0A2F64] text-white',
  LLY: 'bg-[#D62828] text-white',
  SPX: 'bg-[#F23645] text-white',
  NDX: 'bg-[#0089FF] text-white',
  DJI: 'bg-[#00BCD4] text-white',
  RUT: 'bg-[#8E24AA] text-white',
};

export const CompanyLogo: React.FC<CompanyLogoProps> = ({
  symbol,
  name,
  logoUrl,
  size = 'md',
  className = ''
}) => {
  const [hasError, setHasError] = useState(false);

  const sizeClasses = {
    sm: 'w-6 h-6 text-[10px]',
    md: 'w-8 h-8 text-xs',
    lg: 'w-10 h-10 text-sm'
  }[size];

  const cleanSymbol = symbol.replace('USD', '').replace('1!', '');
  const initials = cleanSymbol.slice(0, 2);
  const colorClass = COLOR_MAP[symbol] || 'bg-[#2962FF] text-white';

  if (logoUrl && !hasError) {
    return (
      <div className={`relative shrink-0 rounded-full overflow-hidden bg-white border border-[#E0E3EB] flex items-center justify-center ${sizeClasses} ${className}`}>
        <img
          src={logoUrl}
          alt={`${name} logo`}
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          className="w-full h-full object-contain p-1"
        />
      </div>
    );
  }

  return (
    <div
      className={`shrink-0 rounded-full font-bold flex items-center justify-center uppercase tracking-tight shadow-2xs ${sizeClasses} ${colorClass} ${className}`}
      title={name}
    >
      {initials}
    </div>
  );
};
