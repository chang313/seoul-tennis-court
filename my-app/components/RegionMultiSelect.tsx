import MultiSelect from './ui/MultiSelect';
import { FC } from 'react';

type Option = { value: string; label: string };

type RegionMultiSelectProps = {
  options: Option[];
  selectedRegions: string[];
  onChange: (regions: string[]) => void;
};

const RegionMultiSelect: FC<RegionMultiSelectProps> = ({ options, selectedRegions, onChange }) => (
  <MultiSelect
    options={options}
    value={selectedRegions}
    header="원하는 구"
    placeholder="선택하세요"
    onChange={onChange}
    aria-label="원하는 구 선택"
  />
);

export default RegionMultiSelect;
