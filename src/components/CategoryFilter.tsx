interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
}

export function CategoryFilter({ categories, selectedCategory, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
      <button
        onClick={() => onSelect('Todos')}
        className={`px-4 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
          selectedCategory === 'Todos' 
          ? 'bg-[#7cb151] text-white shadow-md' 
          : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
        }`}
      >
        Todos
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-4 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
            selectedCategory === cat 
            ? 'bg-[#7cb151] text-white shadow-md' 
            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}