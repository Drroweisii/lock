import React from 'react';
import Lottie from 'lottie-react';
import { Loader2 } from 'lucide-react';
import { useLottieAnimation } from './useLottieAnimation';

interface AnimationCardProps {
  id: number;
  title: string;
  url: string;
  category: string;
}

export function AnimationCard({ id, title, url, category }: AnimationCardProps) {
  const { animationData, isLoading, error } = useLottieAnimation(url);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="aspect-square relative bg-gray-50 p-4">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
          </div>
        ) : error ? (
          <div className="absolute inset-0 flex items-center justify-center text-red-500 text-sm text-center p-4">
            Failed to load animation
          </div>
        ) : animationData ? (
          <Lottie
            animationData={animationData}
            loop={true}
            className="w-full h-full"
          />
        ) : null}
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-800">#{id}</h3>
            <p className="text-sm text-gray-600">{title}</p>
          </div>
          <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
            {category}
          </span>
        </div>
      </div>
    </div>
  );
}