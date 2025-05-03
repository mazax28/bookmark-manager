import React, { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor('title', {
    header: 'Título',
    cell: info => <strong>{info.getValue()}</strong>,
  }),
  columnHelper.accessor('url', {
    header: 'URL',
    cell: info => (
      <a
        href={info.getValue()}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        {info.getValue()}
      </a>
    ),
  }),
  columnHelper.accessor('tags', {
    header: 'Etiquetas',
    enableSorting: false,
    cell: info => (
      <div className="flex flex-wrap gap-1">
        {info.getValue().map((tag, idx) => (
          <span
            key={idx}
            className="badge badge-outline badge-sm text-xs px-2 py-1"
          >
            {tag}
          </span>
        ))}
      </div>
    ),
  }),
  columnHelper.accessor('description', {
    header: 'Descripción',
    enableSorting: false,
    cell: info => (
      <p className="text-sm text-base-content/70">{info.getValue()}</p>
    ),
  }),
];

function BookmarkTable({ bookmarks }) {
  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data: bookmarks,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="overflow-x-auto p-4">
      <table className="table w-full border border-base-300 rounded-box">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} className="bg-base-200">
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className="cursor-pointer select-none p-3 text-base font-semibold"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
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
            <tr key={row.id} className="hover">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="p-3 align-top">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookmarkTable;
