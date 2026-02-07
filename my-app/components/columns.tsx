'use client';

import { CourtInfo } from '../types';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export const columns: ColumnDef<CourtInfo>[] = [
  {
    accessorKey: 'SVCNM',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          서비스명
          <ArrowUpDown />
        </Button>
      );
    },
  },
  {
    accessorKey: 'SVCSTATNM',
    header: '상태',
    cell: ({ row }) => {
      const status = row.getValue('SVCSTATNM') as string;
      const variant = status === '접수중' ? 'default' : 'destructive';
      return <Badge variant={variant}>{status}</Badge>;
    },
  },
  {
    accessorKey: 'AREANM',
    header: '지역',
  },
  {
    accessorKey: 'PLACENM',
    header: '장소',
  },
  {
    accessorKey: 'SVCURL',
    header: 'URL',
    cell: ({ row }) => {
      const url = row.getValue('SVCURL') as string;
      return (
        <Link href={url} target='_blank'>
          바로가기
        </Link>
      );
    },
  },

  {
    accessorKey: 'RCPTBGNDT',
    header: '접수 시작일시',
    cell: ({ row }) => {
      const value = row.getValue('RCPTBGNDT') as string;
      return <span className="whitespace-nowrap">{value?.replace(/\.0$/, '')}</span>;
    },
  },
  {
    accessorKey: 'RCPTENDDT',
    header: '접수 종료일시',
    cell: ({ row }) => {
      const value = row.getValue('RCPTENDDT') as string;
      return <span className="whitespace-nowrap">{value?.replace(/\.0$/, '')}</span>;
    },
  },
];
