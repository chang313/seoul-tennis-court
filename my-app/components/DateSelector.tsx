import { Calendar } from './ui/calendar';
import { FC } from 'react';

type DateSelectorProps = {
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
};

const DateSelector: FC<DateSelectorProps> = ({ date, onDateChange }) => (
  <div className="flex flex-col">
    <h2 className="mb-2 text-lg font-semibold">원하는 예약일</h2>
    <Calendar
      mode="single"
      selected={date}
      onSelect={onDateChange}
      className="rounded-md border shadow-sm"
      captionLayout="dropdown"
      aria-label="예약일 선택"
    />
  </div>
);

export default DateSelector; 