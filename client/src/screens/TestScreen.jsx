import { useState } from 'react';
import SelectInput from '../components/utils/SelectInput';

export default function TestScreen() {
  const [testVal, setTestVal] = useState(null);

  return (
    <SelectInput
      // options={myData}
      initialVal={testVal}
      setter={setTestVal}
      path={'a'}
    >
      Label
    </SelectInput>
  );
}
