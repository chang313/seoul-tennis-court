'use client';

import { getCourtInfoList } from '@/api';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CourtInfo, PublicReservationSportResponse } from '@/types';
import { useQuery } from '@tanstack/react-query';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { debounce } from 'lodash';
import { useState } from 'react';
import { columns } from './columns';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const pageSizeOptions = [10, 20, 30, 40, 50];

type TableProps = {
  columns: ColumnDef<CourtInfo>[];
  data: CourtInfo[];
  wishRegion: string;
  liveRegion: string;
  date: Date | undefined;
};

export function DataTable<TData, TValue>({
  columns,
  data,
  wishRegion,
  liveRegion,
  date,
}: TableProps) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      columnFilters,
      sorting,
    },
  });

  const handleChangePageSize = (value: string) => {
    table.setPageSize(Number(value));
  };

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    table.getColumn('SVCNM')?.setFilterValue(event.target.value);
  };

  return (
    <div>
      <div className='flex items-center py-4'>
        <Input
          placeholder='Filter rows...'
          value={(table.getColumn('SVCNM')?.getFilterValue() as string) ?? ''}
          onChange={handleSearchInputChange}
          className='max-w-sm'
        />
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <Select onValueChange={handleChangePageSize} defaultValue={pageSizeOptions[0].toString()}>
          <SelectTrigger>
            <SelectValue placeholder='Page Size' />
          </SelectTrigger>
          <SelectContent>
            {pageSizeOptions.map((option) => (
              <SelectItem key={option} value={option.toString()}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

type Props = {
  wishRegion: string;
  liveRegion: string;
  date: Date | undefined;
};

const CourtInfoTable = ({ wishRegion, liveRegion, date }: Props) => {
  const { data: courtInfoList } = useQuery<PublicReservationSportResponse>({
    queryKey: ['courtInfoList'],
    queryFn: () => getCourtInfoList(),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const filterByRegionAndDate = (row: CourtInfo) => {
    // Region filter
    if (wishRegion && row.AREANM !== wishRegion) return false;
    // Date filter
    if (date) {
      const start = new Date(row.RCPTBGNDT);
      const end = new Date(row.RCPTENDDT);
      // Helper to zero out time
      const toDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
      const selectedDay = toDay(date);
      const startDay = toDay(start);
      const endDay = toDay(end);
      // Only keep if selectedDay is between startDay and endDay (inclusive)
      if (selectedDay < startDay || selectedDay > endDay) return false;
    }
    return true;
  };

  const filteredRows = (courtInfoList?.ListPublicReservationSport.row || []).filter(
    filterByRegionAndDate
  );

  return (
    <div>
      <DataTable
        columns={columns}
        data={filteredRows}
        wishRegion={wishRegion}
        liveRegion={liveRegion}
        date={date}
      />
    </div>
  );
};

export default CourtInfoTable;
