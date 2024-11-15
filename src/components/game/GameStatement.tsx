import React from 'react';
import { Coins, DollarSign, Bitcoin } from 'lucide-react';
import { useGameStatement } from '../../hooks/useGameStatement';
import { GameState } from '../../types/game';

interface GameStatementProps {
  gameState: GameState;
}

export function GameStatement({ gameState }: GameStatementProps) {
  const { formattedBalances, formattedRates } = useGameStatement(gameState);

  return (
    <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl p-2 sm:p-3 shadow-lg">
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        <StatCard
          icon={<Coins className="w-4 h-4 sm:w-5 sm:h-5 text-white" />}
          label="EMSX"
          value={formattedBalances.emsx}
          rate={formattedRates.emsx}
        />
        <StatCard
          icon={<DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-white" />}
          label="USDT"
          value={formattedBalances.usdt}
          rate={formattedRates.usdt}
        />
        <StatCard
          icon={<Bitcoin className="w-4 h-4 sm:w-5 sm:h-5 text-white" />}
          label="BTC"
          value={formattedBalances.btc}
          rate={formattedRates.btc}
        />
      </div>
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  rate: string;
}

function StatCard({ icon, label, value, rate }: StatCardProps) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3">
      <div className="flex items-center gap-1.5 sm:gap-2">
        <div className="bg-white/20 p-1.5 sm:p-2 rounded-full flex-shrink-0">
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-white/80 text-[10px] sm:text-xs font-medium truncate">
            {label}
          </p>
          <p className="text-white text-sm sm:text-lg font-bold tracking-tight truncate">
            {value}
          </p>
          <p className="text-white/80 text-[10px] sm:text-xs truncate">
            +{rate}/s
          </p>
        </div>
      </div>
    </div>
  );
}