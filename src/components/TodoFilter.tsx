import type { TodoFilter } from '../types/todo';

interface TodoFilterProps {
  value: TodoFilter;
  onChange: (filter: TodoFilter) => void;
  counts: { all: number; active: number; completed: number };
}

const filters: { value: TodoFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

export function TodoFilter({ value, onChange, counts }: TodoFilterProps) {
  return (
    <div className="filters" aria-label="Filter tasks">
      {filters.map((filter) => (
        <button
          key={filter.value}
          type="button"
          className={`filter-button${value === filter.value ? ' selected' : ''}`}
          aria-pressed={value === filter.value}
          onClick={() => onChange(filter.value)}
        >
          {filter.label}
          <span className="filter-count">{counts[filter.value]}</span>
        </button>
      ))}
    </div>
  );
}
