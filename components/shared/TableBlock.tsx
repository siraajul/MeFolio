interface TableRow {
  cells: string[];
}

interface TableBlockProps {
  caption?: string;
  hasHeader?: boolean;
  rows: TableRow[];
}

export function TableBlock({ caption, hasHeader = true, rows }: TableBlockProps) {
  if (!rows || rows.length === 0) return null;

  const headerRow = hasHeader ? rows[0] : null;
  const bodyRows = hasHeader ? rows.slice(1) : rows;

  return (
    <div className="my-8 not-prose">
      <div className="rounded-xl border border-neutral-800 overflow-hidden shadow-lg">
        {caption && (
          <div className="px-4 py-3 bg-neutral-900/80 border-b border-neutral-800">
            <p className="text-sm font-medium text-neutral-400">{caption}</p>
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            {headerRow && (
              <thead>
                <tr className="bg-neutral-900/60">
                  {headerRow.cells.map((cell, i) => (
                    <th
                      key={i}
                      className="px-4 py-3 text-left font-semibold text-neutral-300 uppercase tracking-wider text-xs border-b border-neutral-800"
                    >
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {bodyRows.map((row, rowIdx) => (
                <tr
                  key={rowIdx}
                  className="border-b border-neutral-800/50 last:border-0 hover:bg-white/[0.02] transition-colors"
                >
                  {row.cells.map((cell, cellIdx) => (
                    <td
                      key={cellIdx}
                      className="px-4 py-3 text-neutral-300"
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
    </div>
  );
}
