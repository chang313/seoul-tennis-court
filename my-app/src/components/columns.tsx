'use client';

import { CourtInfo } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

export const columns: ColumnDef<CourtInfo>[] = [
  {
    accessorKey: 'SVCNM',
    header: '서비스명',
  },
  {
    accessorKey: 'SVCSTATNM',
    header: '상태',
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
  },
  {
    accessorKey: 'RCPTENDDT',
    header: '접수 종료일시',
  },
];
