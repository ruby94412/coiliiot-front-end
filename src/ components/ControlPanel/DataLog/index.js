import {useEffect, useState} from 'react';
import {Button} from '@mui/material';
import CssTextField from '../../common/CssTextField';
const DataLog = ({
  currentReadingData,
}) => {
  const [dataString, setDataString] = useState('');
  useEffect(() => {
    let temp = dataString;
    temp = `${currentReadingData}${temp.length > 0 ? '\n' : ''}` + temp;
    setDataString(temp);
  }, [currentReadingData]);

  const handleClearOnClick = () => {
    setDataString('');
  }
  return (
    <div style={{marginTop: '20px'}}>
      <CssTextField
        multiline
        style={{width: '400px'}}
        rows={5}
        defaultValue={dataString}
        variant="standard"
        inputProps={{
          style: {
            fontSize: '10px',
            lineHeight: '12px',
          }
        }}
        disabled
      />
      {
        dataString.length > 0 && <Button
          onClick={handleClearOnClick}
          variant="outlined"
          size="small"
          sx={{borderColor: '#d2194a', color: '#d2194a', ":hover": {borderColor: '#d2194a'}}}
        >清除数据</Button>
      }
    </div>
  );
}

export default DataLog;