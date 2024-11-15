import React, { useState, useEffect } from 'react';
import { GameBoard } from './GameBoard';
import { GameStatement } from './GameStatement';
import { HireButton } from './HireButton';
import { WorkerTypeSelector } from './WorkerTypeSelector';
import { useGameState } from '../../hooks/useGameState';
import { WorkerType } from '../../types/workers';
import { WORKER_TYPES } from '../../utils/workerTypes';
import { GameState } from '../../types/game';

interface GameLayoutProps {
  gameState: GameState;
}

export function GameLayout({ gameState }: GameLayoutProps) {
  const [selectedWorkerType, setSelectedWorkerType] = useState<WorkerType>('emsx');
  
  const { 
    hireWorker, 
    handleWorkerClick,
    removeWorker,
    unlockSlot,
    canHireWorker,
    selectedWorkerId,
    canMergeWorkers,
  } = useGameState();

  useEffect(() => {
    const affordableTypes = Object.entries(WORKER_TYPES)
      .filter(([_, config]) => gameState.balances.emsx >= config.cost)
      .sort((a, b) => b[1].cost - a[1].cost);

    const currentConfig = WORKER_TYPES[selectedWorkerType];
    if (!currentConfig || gameState.balances.emsx < currentConfig.cost) {
      if (affordableTypes.length > 0) {
        setSelectedWorkerType(affordableTypes[0][0] as WorkerType);
      }
    }
  }, [gameState.balances.emsx, selectedWorkerType]);

  const handleHire = () => {
    if (hireWorker(selectedWorkerType)) {
      const currentConfig = WORKER_TYPES[selectedWorkerType];
      if (gameState.balances.emsx < currentConfig.cost) {
        const affordableType = Object.entries(WORKER_TYPES)
          .filter(([_, config]) => gameState.balances.emsx >= config.cost)
          .sort((a, b) => b[1].cost - a[1].cost)[0];
          
        if (affordableType) {
          setSelectedWorkerType(affordableType[0] as WorkerType);
        }
      }
    }
  };

  const handleCellClick = (position: number) => {
    const worker = gameState.workers.find(w => w.position === position);
    handleWorkerClick(worker?.id || '', position);
  };

  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-4 h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] flex flex-col">
      <div className="flex-1 min-h-0 grid grid-rows-[auto_1fr_auto_auto] gap-2 sm:gap-3 py-2 sm:py-4">
        <GameStatement gameState={gameState} />
        
        <div className="min-h-0 bg-white rounded-lg shadow-md overflow-hidden">
          <GameBoard
            gridState={gameState.gridState}
            workers={gameState.workers}
            onCellClick={handleCellClick}
            onRemoveWorker={removeWorker}
            onUnlockSlot={unlockSlot}
            balance={gameState.balances.emsx}
            selectedWorkerId={selectedWorkerId}
            canMergeWorkers={canMergeWorkers}
            unlockedSlots={gameState.unlockedSlots}
          />
        </div>

        <div className="flex flex-col gap-2 sm:gap-3">
          <WorkerTypeSelector
            selectedType={selectedWorkerType}
            onSelect={setSelectedWorkerType}
            gameState={gameState}
          />

          <HireButton
            onHire={handleHire}
            disabled={!canHireWorker(selectedWorkerType)}
            workerType={WORKER_TYPES[selectedWorkerType]}
          />
        </div>
      </div>
    </div>
  );
}