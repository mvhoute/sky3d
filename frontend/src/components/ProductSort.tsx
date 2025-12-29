import { useState } from 'react';

type SortOption = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc' | 'newest';

interface ProductSortProps {
  onSort: (option: SortOption) => void;
}

export const ProductSort = ({ onSort }: ProductSortProps) => {
  const [selected, setSelected] = useState<SortOption>('newest');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as SortOption;
    setSelected(value);
    onSort(value);
  };

  return (
    <div className="relative">
      <select
        value={selected}
        onChange={handleChange}
        className="appearance-none w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 pr-10 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none transition-all cursor-pointer"
      >
        <option value="newest">Nieuwste eerst</option>
        <option value="name-asc">Naam (A-Z)</option>
        <option value="name-desc">Naam (Z-A)</option>
        <option value="price-asc">Prijs (laag-hoog)</option>
        <option value="price-desc">Prijs (hoog-laag)</option>
      </select>
      <svg
        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
};
