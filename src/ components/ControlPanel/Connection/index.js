import {Grid, Button} from "@mui/material";
import {useState} from 'react';

const Connection = ({
  handleWsConnection,
}) => {
  const [connected, setConnected] = useState(false);
  const connectOnClick = () => {
    const open = handleWsConnection(connected);
    setConnected(open);
  }
  return (
    <Grid container spacing={2} style={{margin: '20px'}}>
      <Grid item xs={12} style={{display: 'flex', justifyContent: 'center'}}>
        <span style={{lineHeight: 1.75}}>连接状态: {connected ? '已连接' : '未连接'}</span>
        <Button
          variant="contained"
          onClick={connectOnClick}
          style={{marginLeft: '10px'}}
        >{connected ? '断开' : '连接'}</Button>
      </Grid>
    </Grid>
  );
}

export default Connection;