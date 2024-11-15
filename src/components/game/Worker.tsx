import React from 'react';
import { Worker as WorkerType } from '../../types/game';
import { 
  Pickaxe, 
  DollarSign, 
  Bitcoin,
  Cpu,
  Gem,
  Rocket,
  Zap,
  Crown,
  Diamond,
  Award,
  Trash2
} from 'lucide-react';
import { calculateUpgradeCost } from '../../utils/calculations';
import { ANIMATIONS } from '../../utils/constants';

const MinerIcons = {
  emsx: Pickaxe,
  usdt: DollarSign,
  btc: Bitcoin,
};

const getLevelIcon = (level: number): React.ElementType => {
  if (level >= 50) return Crown;
  if (level >= 40) return Diamond;
  if (level >= 30) return Award;
  if (level >= 20) return Rocket;
  if (level >= 15) return Gem;
  if (level >= 10) return Zap;
  if (level >= 5) return Cpu;
  return MinerIcons.emsx;
};

const getLevelAnimation = (level: number): string => {
  if (level >= 50) return 'animate-pulse';
  if (level >= 40) return 'animate-bounce';
  if (level >= 30) return 'animate-spin-slow';
  if (level >= 20) return 'animate-pulse';
  if (level >= 15) return 'animate-bounce';
  if (level >= 10) return 'animate-pulse';
  if (level >= 5) return 'animate-bounce';
  return '';
};

const LEVEL_COLORS = {
  1: { bg: 'bg-amber-600', border: 'border-amber-700', text: 'text-amber-50' },
  2: { bg: 'bg-amber-600', border: 'border-amber-700', text: 'text-amber-50' },
  3: { bg: 'bg-amber-600', border: 'border-amber-700', text: 'text-amber-50' },
  4: { bg: 'bg-amber-600', border: 'border-amber-700', text: 'text-amber-50' },
  5: { bg: 'bg-slate-400', border: 'border-slate-500', text: 'text-slate-50' },
  6: { bg: 'bg-slate-400', border: 'border-slate-500', text: 'text-slate-50' },
  7: { bg: 'bg-slate-400', border: 'border-slate-500', text: 'text-slate-50' },
  8: { bg: 'bg-slate-400', border: 'border-slate-500', text: 'text-slate-50' },
  9: { bg: 'bg-slate-400', border: 'border-slate-500', text: 'text-slate-50' },
  10: { bg: 'bg-yellow-500', border: 'border-yellow-600', text: 'text-yellow-50' },
  11: { bg: 'bg-yellow-500', border: 'border-yellow-600', text: 'text-yellow-50' },
  12: { bg: 'bg-yellow-500', border: 'border-yellow-600', text: 'text-yellow-50' },
  13: { bg: 'bg-yellow-500', border: 'border-yellow-600', text: 'text-yellow-50' },
  14: { bg: 'bg-yellow-500', border: 'border-yellow-600', text: 'text-yellow-50' },
  15: { bg: 'bg-cyan-500', border: 'border-cyan-600', text: 'text-cyan-50' },
  16: { bg: 'bg-cyan-500', border: 'border-cyan-600', text: 'text-cyan-50' },
  17: { bg: 'bg-cyan-500', border: 'border-cyan-600', text: 'text-cyan-50' },
  18: { bg: 'bg-cyan-500', border: 'border-cyan-600', text: 'text-cyan-50' },
  19: { bg: 'bg-cyan-500', border: 'border-cyan-600', text: 'text-cyan-50' },
  20: { bg: 'bg-emerald-500', border: 'border-emerald-600', text: 'text-emerald-50' },
  30: { bg: 'bg-violet-500', border: 'border-violet-600', text: 'text-violet-50' },
  40: { bg: 'bg-rose-500', border: 'border-rose-600', text: 'text-rose-50' },
  50: { bg: 'bg-blue-500', border: 'border-blue-600', text: 'text-blue-50' },
};

const getLevelColor = (level: number) => {
  if (level >= 50) return LEVEL_COLORS[50];
  if (level >= 40) return LEVEL_COLORS[40];
  if (level >= 30) return LEVEL_COLORS[30];
  if (level >= 20) return LEVEL_COLORS[20];
  if (level >= 15) return LEVEL_COLORS[15];
  if (level >= 10) return LEVEL_COLORS[10];
  if (level >= 5) return LEVEL_COLORS[5];
  return LEVEL_COLORS[1];
};

interface WorkerProps {
  worker: WorkerType;
  onClick: () => void;
  onRemove: (id: string) => void;
  balance: number;
  isSelected?: boolean;
  canMerge?: boolean;
}

export function Worker({ worker, onClick, onRemove, balance, isSelected, canMerge }: WorkerProps) {
  const upgradeCost = calculateUpgradeCost(worker.level);
  const canUpgrade = balance >= upgradeCost;
  const Icon = getLevelIcon(worker.level);
  const levelColors = getLevelColor(worker.level);
  const animation = getLevelAnimation(worker.level);

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove(worker.id);
  };

  return (
    <div
      onClick={onClick}
      className={`
        relative w-full h-full flex items-center justify-center
        transition-all duration-200 p-1 sm:p-2
        ${canUpgrade ? 'cursor-pointer' : 'cursor-not-allowed'}
        ${isSelected ? 'scale-95' : ''}
        touch-manipulation
        group
      `}
      style={{
        animationDuration: `${ANIMATIONS.MINING_PULSE}ms`,
      }}
    >
      <div className={`
        relative aspect-square w-full max-w-[80%] rounded-lg sm:rounded-xl
        flex items-center justify-center border-2
        ${isSelected ? `${levelColors.bg} opacity-80` : levelColors.bg}
        ${canMerge ? 'bg-green-500 border-green-600' : levelColors.border}
        transition-colors duration-200 shadow-md
        overflow-hidden
      `}>
        {worker.level >= 30 && (
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full animate-particle"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                />
              ))}
            </div>
          </div>
        )}

        <Icon className={`
          w-1/2 h-1/2 transition-colors duration-200
          ${isSelected ? 'text-white' : 'text-white'}
          ${canMerge ? 'text-white animate-bounce' : animation}
        `} />
        
        <button
          onClick={handleRemove}
          className="absolute -top-1 -left-1 bg-red-500 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
        >
          <Trash2 className="w-3 h-3 text-white" />
        </button>

        <div className={`
          absolute -bottom-1 left-1/2 transform -translate-x-1/2 
          ${levelColors.bg} ${levelColors.text} px-1.5 sm:px-2 py-0.5 
          rounded-full text-[10px] sm:text-xs font-bold shadow-md
          whitespace-nowrap min-w-[2rem] sm:min-w-[2.5rem] text-center
          border ${levelColors.border}
        `}>
          Lvl {worker.level}
        </div>
        
        {canUpgrade && !isSelected && !canMerge && (
          <div className="absolute -top-1 -right-1 
                        bg-green-500 text-white px-1 sm:px-1.5 py-0.5 
                        rounded-full text-[8px] sm:text-[10px] font-bold shadow-md
                        whitespace-nowrap border border-green-600">
            +{upgradeCost}
          </div>
        )}
      </div>
    </div>
  );
}