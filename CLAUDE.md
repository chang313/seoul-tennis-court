# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js application that helps users find and make reservations for public tennis courts in Seoul. The app fetches data from Seoul's Open API and provides filtering capabilities by region, date, and user's living area.

## Development Commands

All commands should be run from the `/my-app` directory:

```bash
# Development server with Turbopack
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint
```

## Architecture

### Project Structure
- **Main application**: Located in `/my-app` directory
- **Next.js App Router**: Uses the new app directory structure (`app/`)
- **UI Components**: Uses shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS with custom component variants
- **State Management**: React Query for server state, React hooks for local state
- **API Integration**: Seoul Open API through a Next.js API proxy route

### Key Components
- `CourtInfoTable`: Main data table with filtering, sorting, and pagination
- `DateSelector`: Calendar component for date selection
- `RegionMultiSelect`: Multi-select component for choosing regions
- `LivingRegionSelect`: Single select for user's living region
- **Proxy API Route** (`app/api/proxy/route.ts`): Proxies requests to Seoul Open API

### Data Flow
1. User selects filters (date, regions, living region)
2. `CourtInfoTable` fetches data via React Query from `/api/proxy`
3. Proxy route calls Seoul Open API with environment variable `NEXT_PUBLIC_OPEN_API_KEY`
4. Data is filtered and displayed in a sortable/paginated table

### Technology Stack
- **Framework**: Next.js 15 with App Router
- **UI**: shadcn/ui components, Radix UI, Tailwind CSS
- **Data Fetching**: React Query, Axios
- **Table**: TanStack Table
- **Utilities**: Lodash, date-fns, class-variance-authority

### Path Aliases
```typescript
@components/* → components/*
@lib/* → lib/*
@types/* → types/*
```

### Environment Variables
- `NEXT_PUBLIC_OPEN_API_KEY`: Required for Seoul Open API access

### Code Conventions
- TypeScript strict mode enabled
- ESLint with Next.js and TypeScript configurations
- Custom ESLint rules: `@typescript-eslint/no-unused-vars` disabled, `@typescript-eslint/no-explicit-any` set to warning
- Uses functional components with hooks
- File naming: PascalCase for components, camelCase for utilities