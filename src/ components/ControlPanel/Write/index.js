import {useState} from 'react';
import {Button} from '@mui/material';
import CssTextField from '../../common/CssTextField';

const Write = ({
  wsMessage,
  wsClient,
}) => {
  const [local, setLocal] = useState(0);
  const parseWsMessage = s => {
    const obj = s && JSON.parse(s);
    return obj?.sv;
  }
  const handleSVLocalInputChange = e => {
    setLocal(e.target.value);
  }
  const sendSVData = () => {
    wsClient?.send(JSON.stringify({
      type: 'POST',
      data: local,
    }))
  }
  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <span style={{lineHeight: 1.75}}>SV值: {parseWsMessage(wsMessage)} </span>
      <CssTextField
        label="设定SV值"
        style={{marginLeft: '10px', marginRight: '10px', width: '100px'}}
        size="small"
        type="number"
        defaultValue={1}
        InputProps={{
          inputProps: { 
            max: 500, min: 0
          }
        }}
        onChange={handleSVLocalInputChange}
      />
      <Button
        onClick={sendSVData}
        variant="contained"
        style={{marginLeft: '10px'}}
      >发送</Button>
    </div>
  );
}

export default Write;