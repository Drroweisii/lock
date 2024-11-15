import React, { useState } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { Dashboard } from './components/Dashboard';
import { Navbar } from './components/layout/Navbar';
import { MiningAnimations } from './components/animations/MiningAnimations';
import { useGameState } from './hooks/useGameState';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showAnimations, setShowAnimations] = useState(false);
  const { gameState } = useGameState();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (showAnimations) {
    return <MiningAnimations onClose={() => setShowAnimations(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onShowAnimations={() => setShowAnimations(true)} />
      <Dashboard gameState={gameState} />
    </div>
  );
}