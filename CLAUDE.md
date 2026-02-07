# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Next.js app for finding and reserving public tennis courts in Seoul. Fetches data from Seoul's Open API and provides filtering by region, date, and user's living area.

## Development Commands

All commands must be run from the `/my-app` directory:

```bash
pnpm dev          # Dev server with Turbopack
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

No test framework is configured.

## Architecture

### Data Flow

```
page.tsx (filter state: date, regions, livingRegion)
  → CourtInfoTable (React Query fetch + client-side filtering)
    → api/index.ts (Axios GET /api/proxy)
      → app/api/proxy/route.ts (proxies to Seoul Open API)
```

- All data is fetched once (up to 365 entries for "테니스장") and filtered client-side
- React Query config: 5min stale time, no refetch on focus/mount
- Three client-side filters applied in `filterByRegionAndDate()`:
  1. **Region**: matches `row.AREANM` against selected districts
  2. **Date**: checks if selected date falls within `RCPTBGNDT`–`RCPTENDDT` range
  3. **Living region**: filters out resident-only courts (구민만 가능, 주민 전용 시설, 주민 대상 예약) that don't match user's district

### Component Structure

- `app/page.tsx` — Client component, owns filter state, wraps app in `QueryClientProvider`
- `components/CourtInfoTable.tsx` — Contains both `CourtInfoTable` (data fetch + filtering) and `DataTable` (TanStack Table with sorting, column filters, pagination, debounced search)
- `components/columns.tsx` — Column definitions for TanStack Table
- `components/DataTableBody.tsx` — Table body with loading state
- `components/DateSelector.tsx`, `RegionMultiSelect.tsx`, `LivingRegionSelect.tsx` — Filter wrapper components
- `components/ui/` — shadcn/ui primitives + custom `MultiSelect.tsx` and `Spinner.tsx`

### Key Files

| File | Purpose |
|------|---------|
| `app/api/proxy/route.ts` | API proxy to Seoul Open API |
| `api/index.ts` | Axios client for proxy endpoint |
| `types/index.ts` | `CourtInfo` and `PublicReservationSportResponse` interfaces |
| `lib/utils.ts` | `cn()` utility for classname merging |

### Tech Stack

- Next.js 15 (App Router), React 19, TypeScript (strict)
- TanStack Table + React Query
- shadcn/ui + Radix UI + Tailwind CSS 4
- Axios, date-fns, lodash

### Path Aliases

```
@components/* → components/*
@lib/*        → lib/*
@types/*      → types/*
```

### Environment Variables

- `NEXT_PUBLIC_OPEN_API_KEY` — Required for Seoul Open API access

### Code Conventions

- ESLint: `@typescript-eslint/no-unused-vars` off, `@typescript-eslint/no-explicit-any` warn
- PascalCase for component files, camelCase for utilities
- UI text is in Korean
