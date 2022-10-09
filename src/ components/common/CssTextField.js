import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

const CssTextField = styled(TextField)(() => ({
  '& .MuiInputBase-root': {
    color: 'white',
  },
  '& label.Mui-root': {
    color: 'white',
  },
  '& label.Mui-focused': {
    color: 'white',
  },
  '& .MuiInput-underline:after': {
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
  }
}));

export default CssTextField;