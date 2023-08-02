import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';


interface ChildProps {
  setTrueOrFalse: (input: boolean) => void
}

const RadioGroupEnd: React.FC<ChildProps> = ({ setTrueOrFalse }) => {
  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-form-control-label-placement"
        name="position"
        defaultValue="close"
      >
        <FormControlLabel value="open" control={<Radio onChange={() => setTrueOrFalse(true)} />} label="開" />
        <FormControlLabel value="close" control={<Radio onChange={() => setTrueOrFalse(false)} />} label="關" />
      </RadioGroup>
    </FormControl>
  );
}


export default RadioGroupEnd
