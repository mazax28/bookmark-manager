import React, { useMemo } from 'react'
import { 
  useReactTable, 
  getCoreRowModel, 
  flexRender, 
  getSortedRowModel
} from '@tanstack/react-table'

function TopBookmarksTable() {
  // Datos de ejemplo para los bookmarks más utilizados
  const data = useMemo(() => [
    {
      id: 1,
      title: 'React Documentation',
      folder: 'Development',
      views: 42,
      lastViewed: '2025-05-06T14:30:00',
    },
    {
      id: 2,
      title: 'Design System Guidelines',
      folder: 'Design',
      views: 38,
      lastViewed: '2025-05-07T09:15:00',
    },
    {
      id: 3,
      title: 'TanStack Table Documentation',
      folder: 'Development',
      views: 27,
      lastViewed: '2025-05-05T16:45:00',
    },
    {
      id: 4,
      title: 'Color Palette Inspiration',
      folder: 'Design',
      views: 24,
      lastViewed: '2025-05-03T11:20:00',
    },
    {
      id: 5,
      title: 'JavaScript Best Practices',
      folder: 'Development',
      views: 22,
      lastViewed: '2025-05-04T13:10:00',
    },
  ], []);

  // Definición de columnas
  const columns = useMemo(() => [
    {
      header: 'Título',
      accessorKey: 'title',
      cell: info => <span className="font-medium">{info.getValue()}</span>
    },
    {
      header: 'Carpeta',
      accessorKey: 'folder',
      cell: info => (
        <span className="px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800">
          {info.getValue()}
        </span>
      )
    },
    {
      header: 'Vistas',
      accessorKey: 'views',
      cell: info => <span className="font-medium">{info.getValue()}</span>
    },
    {
      header: 'Última Vista',
      accessorKey: 'lastViewed',
      cell: info => {
        const date = new Date(info.getValue());
        return <span>{date.toLocaleDateString()}</span>
      }
    },
  ], []);

  // Configuración de la tabla
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="bg-base-100 p-4 rounded shadow">
      <h3 className="font-bold text-lg mb-4">Bookmarks Más Utilizados</h3>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th 
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="cursor-pointer hover:bg-base-200"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{
                      asc: ' 🔼',
                      desc: ' 🔽',
                    }[header.column.getIsSorted()] ?? null}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="hover:bg-base-200">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TopBookmarksTable