// local test address to be changed when deployed
const url = 'ws://47.100.26.104:8080/websockets';
export const initWsClient = props => {
  const client = new WebSocket(url);
  client.onclose = () => {
    props?.setWsClient(null);
    console.log('closing')
  }
  client.onmessage = msg => {
    props?.setWsMessage(msg.data);
  };
  props?.setWsClient(client);
  client.onerror = error => {
    props.setIsErrorModalOpen(true);
  }
  return client.OPEN ? true : false;
} 