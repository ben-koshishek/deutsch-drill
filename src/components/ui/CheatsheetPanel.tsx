import { Modal } from '@mantine/core';
import type { DeckCheatsheet } from '@/types';
import { getConceptColor } from '@/theme';
import './CheatsheetPanel.css';

interface CheatsheetPanelProps {
  cheatsheet: DeckCheatsheet;
  title: string;
  open: boolean;
  onClose: () => void;
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

export function CheatsheetPanel({ cheatsheet, title, open, onClose }: CheatsheetPanelProps) {
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
                    const isHeaderRow = ri === 0;

                    return (
                      <tr key={ri} className={isHeaderRow ? 'cheatsheet-header-row' : ''}>
                        {row.map((cell, ci) => {
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
