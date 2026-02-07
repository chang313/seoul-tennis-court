
'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const DayOfWeekSelect = ({ value, onChange }: Props) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">요일 구분</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="요일" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">전체</SelectItem>
          <SelectItem value="weekday">평일</SelectItem>
          <SelectItem value="weekend">주말</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default DayOfWeekSelect;
