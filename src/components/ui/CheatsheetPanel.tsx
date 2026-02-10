import { useMemo } from 'react';
import { Modal } from '@mantine/core';
import type { DeckCheatsheet, LabelBadgeType, FilterState } from '@/types';
import { getConceptColor } from '@/theme';
import './CheatsheetPanel.css';

interface CheatsheetPanelProps {
  cheatsheet: DeckCheatsheet;
  title: string;
  open: boolean;
  onClose: () => void;
  filters?: FilterState;
  filterableLabels?: Map<LabelBadgeType, string[]>;
}

/** Map cheatsheet abbreviations → filter label values (uppercased) */
const HEADER_ALIASES: Record<string, string> = {
  'MASC.': 'MASCULINE',
  'FEM.': 'FEMININE',
  'NEUT.': 'NEUTER',
  'NOM': 'NOMINATIVE',
  'ACC': 'ACCUSATIVE',
  'DAT': 'DATIVE',
  'GEN': 'GENITIVE',
  'KONJ. II': 'KONJUNKTIV II',
};

/** Normalize a cheatsheet header to match filter values */
function normalizeHeader(raw: string): string {
  const upper = raw.toUpperCase().replace(/\|.*/, '');
  return HEADER_ALIASES[upper] ?? upper;
}

/** Build the all/active value sets from filter state + all possible labels */
function buildValueSets(filters: FilterState, allLabels: Map<LabelBadgeType, string[]>) {
  const allValues = new Set<string>();
  const activeValues = new Set<string>();
  for (const [type, possible] of allLabels) {
    const active = filters.get(type);
    for (const v of possible) {
      allValues.add(v.toUpperCase());
      if (active?.has(v)) activeValues.add(v.toUpperCase());
    }
  }
  return { allValues, activeValues };
}

/**
 * Compute which column/row indices to hide based on active filters.
 * Needs both `filters` (active selections) and `allLabels` (all possible values)
 * to distinguish "not selected" from "not filterable".
 */
function getHiddenIndices(
  headers: string[],
  filters: FilterState,
  allLabels: Map<LabelBadgeType, string[]>,
): Set<number> {
  const hidden = new Set<number>();
  const { allValues, activeValues } = buildValueSets(filters, allLabels);

  for (let i = 1; i < headers.length; i++) {
    const normalized = normalizeHeader(headers[i]);
    if (allValues.has(normalized) && !activeValues.has(normalized)) {
      hidden.add(i);
    }
  }

  return hidden;
}

/** Render a cell value, splitting on | to highlight the ending. */
function renderCell(value: string) {
  const pipe = value.indexOf('|');
  if (pipe === -1) return value;

  const stem = value.slice(0, pipe);
  const ending = value.slice(pipe + 1);

  return (
    <>
      <span className="cheatsheet-stem">{stem}</span>
      <span className="cheatsheet-ending">{ending}</span>
    </>
  );
}

export function CheatsheetPanel({ cheatsheet, title, open, onClose, filters, filterableLabels }: CheatsheetPanelProps) {
  // Pre-compute hidden columns and rows per table
  const hiddenPerTable = useMemo(() => {
    return cheatsheet.tables.map(table => {
      if (!table.rows.length || !filters || !filterableLabels || filterableLabels.size === 0) {
        return { cols: new Set<number>(), rows: new Set<number>() };
      }
      return {
        cols: getHiddenIndices(table.rows[0], filters, filterableLabels),
        rows: getHiddenIndices(table.rows.map(r => r[0]), filters, filterableLabels),
      };
    });
  }, [cheatsheet.tables, filters, filterableLabels]);

  return (
    <Modal
      opened={open}
      onClose={onClose}
      title={title}
      centered
      closeOnEscape={false}
      trapFocus={false}
      size="lg"
      classNames={{
        content: 'cheatsheet-modal-content',
        header: 'cheatsheet-modal-header',
        title: 'cheatsheet-modal-title',
        body: 'cheatsheet-modal-body',
        close: 'cheatsheet-modal-close',
        overlay: 'cheatsheet-modal-overlay',
      }}
    >
      <div className="cheatsheet-tables">
        {cheatsheet.tables.map((table, ti) => {
          const titleColor = table.title ? getConceptColor(table.title) : null;
          const { cols: hiddenCols, rows: hiddenRows } = hiddenPerTable[ti];

          return (
            <div key={ti} className="cheatsheet-table-wrap">
              {table.title && (
                <div
                  className="cheatsheet-table-title"
                  style={titleColor ? { color: titleColor } : undefined}
                >
                  {table.title}
                </div>
              )}
              <table className="cheatsheet-table">
                <tbody>
                  {table.rows.map((row, ri) => {
                    if (hiddenRows.has(ri)) return null;
                    const isHeaderRow = ri === 0;

                    return (
                      <tr key={ri} className={isHeaderRow ? 'cheatsheet-header-row' : ''}>
                        {row.map((cell, ci) => {
                          if (hiddenCols.has(ci)) return null;

                          const isRowLabel = ci === 0 && !isHeaderRow;
                          const isColHeader = isHeaderRow && ci > 0;
                          const isCorner = isHeaderRow && ci === 0;

                          const conceptColor = (isColHeader || isRowLabel) ? getConceptColor(cell) : null;
                          const cellStyle = conceptColor ? { color: conceptColor } : undefined;

                          if (isCorner) {
                            return (
                              <td key={ci} className="cheatsheet-cell-corner">
                                {renderCell(cell)}
                              </td>
                            );
                          }
                          if (isColHeader) {
                            return (
                              <th key={ci} scope="col" className="cheatsheet-cell-col-header" style={cellStyle}>
                                {renderCell(cell)}
                              </th>
                            );
                          }
                          if (isRowLabel) {
                            return (
                              <th key={ci} scope="row" className="cheatsheet-cell-row-label" style={cellStyle}>
                                {renderCell(cell)}
                              </th>
                            );
                          }
                          return (
                            <td key={ci} className="cheatsheet-cell-data">
                              {renderCell(cell)}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        })}

        {cheatsheet.notes && cheatsheet.notes.length > 0 && (
          <div className="cheatsheet-notes">
            {cheatsheet.notes.map((note, i) => (
              <div key={i} className="cheatsheet-note">{note}</div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
}
