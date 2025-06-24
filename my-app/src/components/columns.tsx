"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CourtInfo } from "@/types"
import { Button } from "./ui/button"
import Link from "next/link"

export const columns: ColumnDef<CourtInfo>[] = [
  {
    accessorKey: "SVCID",
    header: "서비스 ID",
  },
  {
    accessorKey: "SVCSTATNM",
    header: "상태",
  },
  {
    accessorKey: "SVCNM",
    header: "서비스명",
  },
  {
    accessorKey: "PLACENM",
    header: "장소",
  },
  {
    accessorKey: "SVCURL",
    header: "URL",
    cell: ({ row }) => {
      const url = row.getValue("SVCURL") as string;
      return (

          <Link href={url} target="_blank">
            바로가기
          </Link>

      );
    }
  },
  {
    accessorKey: "AREANM",
    header: "지역",
  },
  {
    accessorKey: "SVCOPNBGNDT",
    header: "예약 시작일",
  },
  {
    accessorKey: "SVCOPNENDDT",
    header: "예약 종료일",
  },
]