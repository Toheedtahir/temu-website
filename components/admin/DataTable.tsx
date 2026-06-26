interface Column<T> {
  key: keyof T | string
  label: string
  render?: (row: T) => React.ReactNode
}

interface Props<T> {
  data: T[]
  columns: Column<T>[]
  actions?: (row: T) => React.ReactNode
}

export default function DataTable<T extends { id: string }>({ data, columns, actions }: Props<T>) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)} className="text-left px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">
                {col.label}
              </th>
            ))}
            {actions && (
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (actions ? 1 : 0)}
                className="text-center py-12 text-gray-400"
              >
                No records found
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                {columns.map((col) => (
                  <td key={String(col.key)} className="px-4 py-3">
                    {col.render
                      ? col.render(row)
                      : String((row as Record<string, unknown>)[col.key as string] ?? '—')}
                  </td>
                ))}
                {actions && (
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">{actions(row)}</div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
