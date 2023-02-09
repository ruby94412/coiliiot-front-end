import {
  Grid,
  RadioGroup,
  Radio,
  FormControl,
  FormControlLabel,
  FormLabel,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';

export const renderFields = ({
  label,
  handleChange,
  fieldType,
  datatype,
  value,
  name,
  ...other
}) => {
  const layout = other.layout || {xs:12, md: 4};
  const style = other.style || {width: '80%'};
  switch (fieldType) {
    default:
    case 'textField':
      return (
        <Grid item {...layout}>
          <FormControl sx={{display: 'flex'}}>
            <FormLabel>{label}</FormLabel>
            <TextField
              size="small"
              style={style}
              value={value}
              name={name}
              onChange={handleChange}
              type={datatype}
              {...other}
            />
          </FormControl>
        </Grid>
      );
    case 'radioGroup':
      const {radioOptions} = other;
      return (
        <Grid item {...layout}>
          <FormControl sx={{display: 'flex'}}>
            <FormLabel>{label}</FormLabel>
            <RadioGroup
              row
              value={value}
              onChange={handleChange}
              name={name}
            >
              {
                radioOptions.map(option => (
                  <FormControlLabel
                    key={option.value}
                    value={option.value}
                    control={<Radio />}
                    label={option.label}
                  />
                ))
              }
            </RadioGroup>
          </FormControl>     
        </Grid>
      );
    case 'select':
      const {selectOptions} = other;
      return (
        <Grid item {...layout}>
          <FormControl sx={{display: 'flex'}}>
            <FormLabel>{label}</FormLabel>
            <Select
              size="small"
              style={style}
              value={value}
              name={name}
              onChange={handleChange}
            >
              {
                selectOptions.map(option => (
                  <MenuItem key={option.label} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))
              }
            </Select>
          </FormControl>     
        </Grid>
      );

  }
}