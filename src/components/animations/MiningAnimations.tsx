import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { AnimationCard } from './AnimationCard';
import { CategoryFilter } from './CategoryFilter';
import { SearchBar } from './SearchBar';

const MINING_ANIMATIONS = [
  {
    id: 1,
    title: "Bitcoin Mining Farm",
    url: "https://assets10.lottiefiles.com/packages/lf20_xtuje6sh.json",
    category: "Infrastructure"
  },
  {
    id: 2,
    title: "Blockchain Network",
    url: "https://assets10.lottiefiles.com/packages/lf20_xyadoh9h.json",
    category: "Network"
  },
  {
    id: 3,
    title: "Mining Rig",
    url: "https://assets10.lottiefiles.com/packages/lf20_q7qjhvqg.json",
    category: "Hardware"
  },
  {
    id: 4,
    title: "Data Processing",
    url: "https://assets10.lottiefiles.com/packages/lf20_uwR49r.json",
    category: "Process"
  },
  {
    id: 5,
    title: "Crypto Analytics",
    url: "https://assets10.lottiefiles.com/packages/lf20_p8bfn5to.json",
    category: "Data"
  }
] as const;

const CATEGORIES = ["All", "Infrastructure", "Network", "Hardware", "Process", "Data"] as const;

type Category = (typeof CATEGORIES)[number];

export function MiningAnimations({ onClose }: { onClose: () => void }) {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAnimations = MINING_ANIMATIONS.filter(animation => {
    const matchesCategory = selectedCategory === "All" || animation.category === selectedCategory;
    const matchesSearch = animation.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 bg-white border-b z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-6 h-6 text-gray-600" />
                </button>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                  Mining Animations
                </h1>
              </div>
              <SearchBar 
                value={searchQuery}
                onChange={setSearchQuery}
              />
            </div>
            <CategoryFilter
              categories={CATEGORIES}
              selectedCategory={selectedCategory}
              onSelectCategory={(category) => setSelectedCategory(category as Category)}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAnimations.map((animation) => (
            <AnimationCard
              key={animation.id}
              id={animation.id}
              title={animation.title}
              url={animation.url}
              category={animation.category}
            />
          ))}
        </div>

        {filteredAnimations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No animations found matching your criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
}