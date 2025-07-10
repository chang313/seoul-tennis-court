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
      <div className="flex gap-8">
        <DateSelector date={date} onDateChange={setDate} />
        <div className="flex flex-col">
          <div className="flex gap-2 items-end">
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
      </div>
      <CourtInfoTable wishRegions={selectedRegions} date={date} livingRegion={livingRegion} />
    </QueryClientProvider>
  );
};

export default Home;
