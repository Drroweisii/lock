import React from 'react';

interface CategoryFilterProps {
  categories: readonly string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function CategoryFilter({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}: CategoryFilterProps) {
  return (
    <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`
            px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap
            ${selectedCategory === category
              ? 'bg-indigo-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }
            transition-colors duration-200
          `}
        >
          {category}
        </button>
      ))}
    </div>
  );
}