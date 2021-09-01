import { Select } from '@chakra-ui/react';
import { useStore } from 'effector-react';
import { ChangeEvent, FC } from 'react';
import { app } from '../Store';

interface IndicatorGroupProps {
  value: string | number | string[];
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const IndicatorGroup: FC<IndicatorGroupProps> = ({ value, onChange }) => {
  const store = useStore(app);
  return (
    <Select style={{ width: "100%" }} value={value} onChange={onChange}>
      {store.indicatorGroups.map((option: any) => <option key={option.id} value={option.code}>{option.name}</option>)}
    </Select>
  )
}

export default IndicatorGroup
