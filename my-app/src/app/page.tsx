'use client';

import CourtInfoTable from '@/components/CourtInfoTable';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

const queryClient = new QueryClient();

const Home = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <QueryClientProvider client={queryClient}>
      <Calendar
        mode='single'
        selected={date}
        onSelect={setDate}
        className='rounded-md border shadow-sm'
      />
      <CourtInfoTable />
    </QueryClientProvider>
  );
};

export default Home;
