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
  const [wishRegion, setWishRegion] = useState<string>(''); // 원하는 지역구

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex gap-8">
        <div className="flex flex-col">
          <h2>원하는 예약일</h2>
          <Calendar
            mode='single'
            selected={date}
            onSelect={setDate}
            className='rounded-md border shadow-sm'
            captionLayout='dropdown'
            
          />
        </div>
        <div className="flex flex-col">
          <h2>원하는 구</h2>
          <Select onValueChange={setWishRegion} defaultValue={wishRegion}>
            <SelectTrigger>
              <SelectValue placeholder='선택하세요' />
            </SelectTrigger>
            <SelectContent>
              {regionOptions.map((option: string) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <CourtInfoTable wishRegion={wishRegion} date={date} />
    </QueryClientProvider>
  );
};

export default Home;
