import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { FC } from 'react';

type LivingRegionSelectProps = {
  options: string[];
  value: string;
  onChange: (region: string) => void;
};

const LivingRegionSelect: FC<LivingRegionSelectProps> = ({ options, value, onChange }) => (
  <div className="flex flex-col">
    <label htmlFor="living-region-select" className="mb-1 text-sm font-medium">거주하는 지역구</label>
    <Select
      value={value}
      onValueChange={onChange}
      aria-label="거주 구 선택"
    >
      <SelectTrigger id="living-region-select" tabIndex={0} className="min-w-[120px]" aria-label="거주 구 선택">
        <SelectValue placeholder="거주 구" />
      </SelectTrigger>
      <SelectContent>
        {options.map((region) => (
          <SelectItem key={region} value={region} aria-label={region}>
            {region}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

export default LivingRegionSelect; 