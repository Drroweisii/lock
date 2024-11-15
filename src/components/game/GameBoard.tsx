import React from 'react';
import { GRID_SIZE } from '../../utils/constants';
import { GridCell as GridCellType, Worker as WorkerType } from '../../types/game';
import { Worker } from './Worker';
import { Lock } from 'lucide-react';

interface GameBoardProps {
  gridState: GridCellType[];
  workers: WorkerType[];
  onCellClick: (position: number) => void;
  onRemoveWorker: (id: string) => void;
  onUnlockSlot: (position: number) => void;
  balance: number;
  selectedWorkerId: string | null;
  canMergeWorkers: (worker1: WorkerType, worker2: WorkerType) => boolean;
  unlockedSlots: number;
}

export function GameBoard({ 
  gridState, 
  workers, 
  onCellClick,
  onRemoveWorker,
  onUnlockSlot,
  balance,
  selectedWorkerId,
  canMergeWorkers,
  unlockedSlots,
}: GameBoardProps) {
  const getSlotCost = (position: number): number => {
    const slotNumber = position + 1;
    const costs = {
      6: 100,
      7: 250,
      8: 500,
      9: 1000,
      10: 2500,
      11: 5000,
      12: 10000,
    };
    return costs[slotNumber as keyof typeof costs] || 0;
  };

  return (
    <div className="h-full flex flex-col bg-[#FFF3E0] p-2 sm:p-3">
      <div className="bg-[#FFB74D] rounded-xl p-2 mb-2 sm:mb-3 shadow-md">
        <div className="flex items-center gap-2">
          <div className="bg-white rounded-full w-6 h-6 flex items-center justify-center text-[#FFB74D] font-bold text-sm">
            {workers.length}
          </div>
          <span className="text-white font-bold text-sm">MINERS</span>
          <span className="text-white/80 text-xs">({unlockedSlots} slots)</span>
        </div>
      </div>

      <div className="flex-1 grid gap-1.5 sm:gap-2 h-full"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE.COLS}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${GRID_SIZE.ROWS}, minmax(0, 1fr))`,
        }}
      >
        {gridState.map((cell, index) => {
          const worker = workers.find(w => w.id === cell.workerId);
          const selectedWorker = workers.find(w => w.id === selectedWorkerId);
          const canMerge = worker && selectedWorker && worker.id !== selectedWorker.id && 
                          canMergeWorkers(worker, selectedWorker);
          const isValidMove = selectedWorker && !worker;
          const isLocked = index >= unlockedSlots;
          const slotCost = getSlotCost(index);
          const canUnlock = balance >= slotCost;

          if (isLocked) {
            return (
              <LockedCell
                key={cell.position}
                cost={slotCost}
                canUnlock={canUnlock}
                onClick={() => canUnlock && onUnlockSlot(index)}
              />
            );
          }

          return (
            <GridCell
              key={cell.position}
              cell={cell}
              worker={worker}
              onClick={() => onCellClick(cell.position)}
              onRemoveWorker={onRemoveWorker}
              balance={balance}
              isSelected={worker?.id === selectedWorkerId}
              canMerge={canMerge}
              isValidMove={isValidMove}
            />
          );
        })}
      </div>
    </div>
  );
}

interface LockedCellProps {
  cost: number;
  canUnlock: boolean;
  onClick: () => void;
}

function LockedCell({ cost, canUnlock, onClick }: LockedCellProps) {
  return (
    <div
      onClick={onClick}
      className={`
        relative w-full aspect-square rounded-lg
        transition-all duration-200
        ${canUnlock 
          ? 'bg-gray-200 hover:bg-gray-300 cursor-pointer' 
          : 'bg-gray-300 cursor-not-allowed'
        }
        border-2 border-gray-400
        shadow-sm hover:shadow
        flex flex-col items-center justify-center gap-1
      `}
    >
      <Lock className={`w-5 h-5 ${canUnlock ? 'text-gray-600' : 'text-gray-500'}`} />
      <div className="text-center">
        <div className={`text-xs font-medium ${canUnlock ? 'text-gray-700' : 'text-gray-500'}`}>
          {cost} EMSX
        </div>
      </div>
    </div>
  );
}

interface GridCellProps {
  cell: GridCellType;
  worker?: WorkerType;
  onClick: () => void;
  onRemoveWorker: (id: string) => void;
  balance: number;
  isSelected?: boolean;
  canMerge?: boolean;
  isValidMove?: boolean;
}

function GridCell({ cell, worker, onClick, onRemoveWorker, balance, isSelected, canMerge, isValidMove }: GridCellProps) {
  return (
    <div
      onClick={onClick}
      className={`
        relative w-full aspect-square rounded-lg
        transition-all duration-200
        ${cell.isOccupied 
          ? 'bg-white' 
          : isValidMove
            ? 'bg-blue-100 hover:bg-blue-200'
            : 'bg-[#FFE0B2] hover:bg-[#FFCC80]'
        }
        cursor-pointer border-2
        ${isSelected ? 'border-[#FFB74D]' : 'border-[#FFE0B2]'}
        ${canMerge ? 'border-[#4CAF50]' : ''}
        ${isValidMove ? 'border-blue-300' : ''}
        shadow-sm hover:shadow
        overflow-hidden
      `}
    >
      {worker ? (
        <Worker 
          worker={worker} 
          onClick={onClick}
          onRemove={onRemoveWorker}
          balance={balance}
          isSelected={isSelected}
          canMerge={canMerge}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-[#FFB74D] font-medium">
          {isValidMove ? '⟶' : '+'}
        </div>
      )}
    </div>
  );
}