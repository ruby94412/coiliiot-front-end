import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';

const CssSelectField = styled(Select)(() => ({
  '& .MuiSelect-select': {
    color: 'white',
  },
  '& .MuiSelect-icon': {
    color: 'white',
  },
  '& label.Mui-focused': {
    color: 'white',
  },
  '& .MuiSelect-outlined': {
    borderBottomColor: 'white',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white',
    },
    '&:hover fieldset': {
      borderColor: 'white',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'white',
    },
  },
  '& .MuiInputBase-input.MuiInput-input.Mui-disabled': {
    WebkitTextFillColor: 'white',
  },
  '& .MuiFormLabel-root': {
    color: 'white',
  },
  '& .MuiInputBase-root-MuiInput-root.Mui-disabled:before': {
    borderBottomColor: 'white',
  },
}));

export default CssSelectField;
