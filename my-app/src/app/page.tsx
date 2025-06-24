'use client';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import CourtInfoTable from '@/components/CourtInfoTable';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const Home = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <QueryClientProvider client={queryClient}>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border shadow-sm"
      />
      <CourtInfoTable />
    </QueryClientProvider>
  );
};

export default Home;
