import React from 'react';
import { Layout, Image } from 'lucide-react';

interface NavbarProps {
  onShowAnimations: () => void;
}

export function Navbar({ onShowAnimations }: NavbarProps) {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Layout className="h-6 w-6 sm:h-7 sm:w-7 text-indigo-600 flex-shrink-0" />
            <span className="text-lg sm:text-xl font-semibold text-gray-900 hidden sm:block">Mining Game</span>
            <span className="text-lg font-semibold text-gray-900 sm:hidden">MG</span>
          </div>
          
          <button
            onClick={onShowAnimations}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <Image className="w-4 h-4" />
            <span className="hidden sm:inline">Animations</span>
          </button>
        </div>
      </div>
    </nav>
  );
}