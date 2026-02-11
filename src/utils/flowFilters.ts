import type { Deck, GrammarLesson, FlowCard, LabelBadgeType, FilterState } from '../types';

type FlowSource = Deck | GrammarLesson;

/** Traditional grammar table ordering per label type. */
const GRAMMAR_ORDER: Partial<Record<LabelBadgeType, string[]>> = {
  person: ['ICH', 'DU', 'ER/SIE/ES', 'WIR', 'IHR', 'SIE/SIE'],
  case: ['NOMINATIVE', 'ACCUSATIVE', 'DATIVE', 'GENITIVE'],
  gender: ['MASCULINE', 'FEMININE', 'NEUTER'],
  number: ['SINGULAR', 'PLURAL'],
  tense: ['PRÄSENS', 'PRÄTERITUM', 'KONJUNKTIV II'],
  articleType: ['DEFINITE', 'INDEFINITE', 'WEAK', 'MIXED', 'STRONG'],
};

/** Sort values by grammar convention, falling back to original order for unknowns. */
function grammarSort(type: LabelBadgeType, values: Set<string>): string[] {
  const order = GRAMMAR_ORDER[type];
  if (!order) return [...values].sort();

  const indexed = new Map(order.map((v, i) => [v, i]));
  return [...values].sort((a, b) => {
    const ai = indexed.get(a) ?? order.length;
    const bi = indexed.get(b) ?? order.length;
    return ai - bi;
  });
}

/**
 * Scan all label-to-form cards in sources and return label types
 * that have 2+ distinct values (i.e. worth filtering).
 * Returns a Map of type → array of distinct values in grammar table order.
 */
export function extractFilterableLabels(sources: FlowSource[]): Map<LabelBadgeType, string[]> {
  const valuesByType = new Map<LabelBadgeType, Set<string>>();

  for (const source of sources) {
    if ('type' in source && source.type === 'label-to-form') {
      for (const card of source.cards) {
        for (const label of card.labels) {
          let set = valuesByType.get(label.type);
          if (!set) {
            set = new Set();
            valuesByType.set(label.type, set);
          }
          set.add(label.label);
        }
      }
    }
  }

  const NON_FILTERABLE: Set<LabelBadgeType> = new Set(['meaning']);

  const result = new Map<LabelBadgeType, string[]>();
  for (const [type, values] of valuesByType) {
    if (values.size >= 2 && !NON_FILTERABLE.has(type)) {
      result.set(type, grammarSort(type, values));
    }
  }
  return result;
}

/**
 * Build a FilterState with per-deck defaults applied.
 * Starts with all values ON, then removes values listed in
 * each source's `defaultDisabledFilters`. Ensures ≥1 value per type.
 */
export function buildDefaultFilters(
  filterable: Map<LabelBadgeType, string[]>,
  sources?: FlowSource[],
): FilterState {
  // Collect disabled defaults from all label-to-form sources
  const disabled = new Map<LabelBadgeType, Set<string>>();
  if (sources) {
    for (const s of sources) {
      if (s.type === 'label-to-form' && s.defaultDisabledFilters) {
        for (const [type, values] of Object.entries(s.defaultDisabledFilters)) {
          const key = type as LabelBadgeType;
          let set = disabled.get(key);
          if (!set) { set = new Set(); disabled.set(key, set); }
          for (const v of values) set.add(v);
        }
      }
    }
  }

  const filters: FilterState = new Map();
  for (const [type, values] of filterable) {
    const disabledSet = disabled.get(type);
    if (disabledSet) {
      const enabled = values.filter(v => !disabledSet.has(v));
      // Ensure at least 1 value stays enabled
      filters.set(type, new Set(enabled.length > 0 ? enabled : values));
    } else {
      filters.set(type, new Set(values));
    }
  }
  return filters;
}

/**
 * Check whether all values are still checked (no filtering active).
 */
export function isAllSelected(filters: FilterState, filterable: Map<LabelBadgeType, string[]>): boolean {
  for (const [type, values] of filterable) {
    const selected = filters.get(type);
    if (!selected || selected.size < values.length) return false;
  }
  return true;
}

/**
 * Filter FlowCards based on active filter selections.
 * Only label-to-form cards are filtered; translation and grammar cards pass through.
 * A label-to-form card is included if ALL its label types that are in the filter
 * have at least one matching value selected.
 */
export function filterFlowCards(cards: FlowCard[], filters: FilterState): FlowCard[] {
  if (filters.size === 0) return cards;

  return cards.filter(card => {
    if (card.source !== 'label-to-form') return true;

    for (const label of card.item.labels) {
      const allowed = filters.get(label.type);
      if (allowed && !allowed.has(label.label)) return false;
    }
    return true;
  });
}
