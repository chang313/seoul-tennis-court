'use client';

import { getCourtInfoList } from '../api';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { CourtInfo, PublicReservationSportResponse } from '../types';
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
import { useState, useMemo, useCallback } from 'react';
import { columns } from './columns';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import DataTableBody from './DataTableBody';
import { debounce } from 'lodash';


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const pageSizeOptions = [10, 20, 30, 40, 50];

type TableProps = {
  columns: ColumnDef<CourtInfo>[];
  data: CourtInfo[];
  wishRegion: string;
  date: Date | undefined;
  isLoading: boolean;
};

const AVAILABLE_STATUS = '접수중';

export function DataTable<TData, TValue>({
  columns,
  data,
  wishRegion,
  date,
  isLoading,
}: TableProps) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([
    { id: 'SVCSTATNM', value: AVAILABLE_STATUS },
  ]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [searchInput, setSearchInput] = useState('');

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

  // Debounced filter updater (no useEffect)
  const debouncedSetFilter = useMemo(() =>
    debounce((value: string) => {
      table.getColumn('SVCNM')?.setFilterValue(value);
    }, 300)
  , [table]);

  const handleSearchInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchInput(value);
    debouncedSetFilter(value);
  }, [debouncedSetFilter]);

  const handleChangeIsOnlyAvailable = (value: boolean) => {
    table.getColumn('SVCSTATNM')?.setFilterValue(value ? AVAILABLE_STATUS : '');
  };

  return (
    <div>
      <div className='flex items-center justify-between'>
        <div className='flex items-center py-4'>
          <Input
            placeholder='검색어를 입력하세요'
            value={searchInput}
            onChange={handleSearchInputChange}
            className='max-w-sm'
          />
        </div>
        <div className='flex items-center space-x-2'>
          <Switch
            id='only-available'
            defaultChecked={true}
            onCheckedChange={handleChangeIsOnlyAvailable}
          />
          <Label htmlFor='only-available'>접수 중인 코트만 보기</Label>
        </div>
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
            <DataTableBody isLoading={isLoading} columns={columns} table={table} />
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-between'>
        <div className='text-muted-foreground flex-1 text-sm'>
          총 {table.getFilteredRowModel().rows.length} 행
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
            이전
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            다음
          </Button>
        </div>
      </div>
    </div>
  );
}

type Props = {
  wishRegions: string[];
  date: Date | undefined;
  livingRegion: string;
};

const CourtInfoTable = ({ wishRegions, date, livingRegion }: Props) => {
  const { data: courtInfoList, isLoading } = useQuery<PublicReservationSportResponse>({
    queryKey: ['courtInfoList'],
    queryFn: () => getCourtInfoList(),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const filterByRegionAndDate = (row: CourtInfo) => {
    // Region filter
    if (wishRegions && wishRegions.length > 0 && !wishRegions.includes(row.AREANM)) return false;
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
    // Living region filter
    if (
      livingRegion &&
      (
        row.SVCNM.includes('구민만 가능') ||
        row.SVCNM.includes('주민 전용 시설') ||
        row.SVCNM.includes('주민 대상 예약')
      ) &&
      !row.SVCNM.includes(livingRegion)
    ) {
      return false;
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
        wishRegion={wishRegions.join(', ')}
        date={date}
        isLoading={isLoading}
      />
    </div>
  );
};

export default CourtInfoTable;
