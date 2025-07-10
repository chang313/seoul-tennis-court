'use client';

import CourtInfoTable from '../components/CourtInfoTable';
import { Calendar } from '../components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import MultiSelect from '../components/ui/MultiSelect';
import DateSelector from '../components/DateSelector';
import RegionMultiSelect from '../components/RegionMultiSelect';
import LivingRegionSelect from '../components/LivingRegionSelect';

const queryClient = new QueryClient();

const regionOptions = [
  '강남구',
  '강동구',
  '강북구',
  '강서구',
  '관악구',
  '광진구',
  '구로구',
  '금천구',
  '노원구',
  '도봉구',
  '동대문구',
  '동작구',
  '마포구',
  '서대문구',
  '서초구',
  '성동구',
  '성북구',
  '송파구',
  '양천구',
  '영등포구',
  '용산구',
  '은평구',
  '종로구',
  '중구',
  '중랑구',
];

const Home = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [livingRegion, setLivingRegion] = useState<string>('');

  return (
    <QueryClientProvider client={queryClient}>
      <div className="container mx-auto p-4">
        <header className="flex items-center justify-between py-6">
          <div className="flex items-center gap-2">
            <img src="/tennis.svg" alt="logo" className="h-8 w-8" />
            <h1 className="text-2xl font-bold">Seoul Tennis Court</h1>
          </div>
        </header>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="space-y-6 rounded-lg border p-4">
              <DateSelector date={date} onDateChange={setDate} />
              <RegionMultiSelect
                options={regionOptions.map((r) => ({ value: r, label: r }))}
                selectedRegions={selectedRegions}
                onChange={setSelectedRegions}
              />
              <LivingRegionSelect
                options={regionOptions}
                value={livingRegion}
                onChange={setLivingRegion}
              />
            </div>
          </div>
          <div className="lg:col-span-3">
            <CourtInfoTable
              wishRegions={selectedRegions}
              date={date}
              livingRegion={livingRegion}
            />
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default Home;
