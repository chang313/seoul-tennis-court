import { TableRow, TableCell } from './ui/table';
import Spinner from './ui/Spinner';
import { ColumnDef, flexRender, Table } from '@tanstack/react-table';
import { CourtInfo } from '../types';

type DataTableBodyProps = {
  isLoading: boolean;
  columns: ColumnDef<CourtInfo>[];
  table: Table<CourtInfo>;
};

const DataTableBody = ({ isLoading, columns, table }: DataTableBodyProps) => {
  if (isLoading) {
    return (
      <TableRow>
        <TableCell colSpan={columns.length} className="h-24 text-center">
          <Spinner />
        </TableCell>
      </TableRow>
    );
  }

  if (table.getRowModel().rows?.length) {
    return (
      <>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </>
    );
  }

  return (
    <TableRow>
      <TableCell colSpan={columns.length} className='h-24 text-center'>
        No results.
      </TableCell>
    </TableRow>
  );
};

export default DataTableBody;
