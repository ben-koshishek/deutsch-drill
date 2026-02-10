import type { LabelBadgeType, FilterState } from '../../types';
import './FlowFilters.css';

const TYPE_LABELS: Record<LabelBadgeType, string> = {
  tense: 'Tense',
  case: 'Case',
  gender: 'Gender',
  number: 'Number',
  person: 'Person',
  articleType: 'Type',
  formality: 'Form',
};

interface FlowFiltersProps {
  filterableLabels: Map<LabelBadgeType, string[]>;
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export function FlowFilters({ filterableLabels, filters, onFilterChange }: FlowFiltersProps) {
  const handleToggle = (type: LabelBadgeType, value: string) => {
    const current = filters.get(type);
    if (!current) return;

    const isChecked = current.has(value);

    // Prevent unchecking the last value
    if (isChecked && current.size <= 1) return;

    const next = new Map(filters);
    const nextSet = new Set(current);
    if (isChecked) {
      nextSet.delete(value);
    } else {
      nextSet.add(value);
    }
    next.set(type, nextSet);
    onFilterChange(next);
  };

  return (
    <div className="flow-filters">
      {[...filterableLabels.entries()].map(([type, values]) => (
        <div key={type} className="flow-filter-group">
          <span className="flow-filter-label">{TYPE_LABELS[type]}</span>
          <div className="flow-filter-chips">
            {values.map(value => {
              const active = filters.get(type)?.has(value) ?? true;
              return (
                <button
                  key={value}
                  type="button"
                  className="flow-filter-chip"
                  data-active={active || undefined}
                  onClick={() => handleToggle(type, value)}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
