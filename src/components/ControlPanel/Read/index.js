const Read = ({
  wsMessage
}) => {
  const parseWsMessage = s => {
    console.log(s);
    const obj = s && JSON.parse(s);
    return `当前仪表显示温度: ${obj?.temperture}°C`
  }
  return (
    <div style={{margin: '20px'}}>
      <span>{parseWsMessage(wsMessage)}</span>
    </div>
  );
};

export default Read;