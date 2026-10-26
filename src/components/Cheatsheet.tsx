import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import type { Cheatsheet as CheatsheetData } from '@/types'

interface CheatsheetProps {
  cheatsheet: CheatsheetData
  onClose: () => void
}

export function Cheatsheet({ cheatsheet, onClose }: CheatsheetProps) {
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null

    // Taking focus keeps typed keys out of the answer input while the sheet is up
    panelRef.current?.focus()

    // Capture phase: swallow keys before the drill's own window listeners see them
    const handleKeyDown = (e: KeyboardEvent) => {
      e.stopPropagation()
      if (e.key === 'Tab' || e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown, true)
    return () => {
      window.removeEventListener('keydown', handleKeyDown, true)
      previouslyFocused?.focus()
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-grey-950/85 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={`${cheatsheet.title} cheatsheet`}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border-2 border-grey-700 bg-grey-900 shadow-2xl outline-none"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-grey-800 px-8 py-5">
          <h2 className="text-lg font-semibold text-grey-100">{cheatsheet.title}</h2>
          <button
            onClick={onClose}
            aria-label="Close cheatsheet"
            className="rounded-lg p-1.5 text-grey-500 transition-colors hover:bg-grey-800 hover:text-grey-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tables */}
        <div className="space-y-8 px-8 py-6">
          {cheatsheet.tables.map((table, tableIndex) => (
            <div key={tableIndex}>
              {table.caption && (
                <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-grey-500">
                  {table.caption}
                </p>
              )}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr>
                      <th className="pb-3" />
                      {table.columns.map((column) => (
                        <th
                          key={column}
                          className="pb-3 pl-4 text-xs font-semibold uppercase tracking-widest text-success-300"
                        >
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {table.rows.map((row, rowIndex) => (
                      <tr key={rowIndex} className="border-t border-grey-800">
                        <th scope="row" className="py-2.5 pr-4 font-medium whitespace-nowrap">
                          <span className="text-grey-300">{row.label}</span>
                          {row.hint && (
                            <span className="ml-2 text-xs font-normal text-grey-600">{row.hint}</span>
                          )}
                        </th>
                        {row.cells.map((cell, cellIndex) => (
                          <td
                            key={cellIndex}
                            className="py-2.5 pl-4 text-lg font-semibold text-grey-50"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}

          {/* Notes */}
          {cheatsheet.notes && cheatsheet.notes.length > 0 && (
            <ul className="space-y-2 border-t border-grey-800 pt-5 text-sm text-grey-400">
              {cheatsheet.notes.map((note, noteIndex) => (
                <li key={noteIndex} className="flex gap-2">
                  <span className="text-grey-600">-</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-grey-800 bg-grey-800/40 px-8 py-4">
          <p className="text-center text-sm text-grey-500">
            Press{' '}
            <kbd className="mx-1 rounded-md border border-grey-600 bg-grey-700 px-2.5 py-1 font-mono text-xs font-medium text-grey-300 shadow-sm">
              Tab
            </kbd>
            {' '}or{' '}
            <kbd className="mx-1 rounded-md border border-grey-600 bg-grey-700 px-2.5 py-1 font-mono text-xs font-medium text-grey-300 shadow-sm">
              Esc
            </kbd>
            {' '}to close
          </p>
        </div>
      </div>
    </div>
  )
}
