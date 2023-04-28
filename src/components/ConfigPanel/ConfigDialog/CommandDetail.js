import { useIntl } from 'react-intl';
import messages from 'hocs/Locale/Messages/ConfigPanel/ConfigDialog/constants';
import { styled } from '@mui/material/styles';

const CommandDetailWithStyle = styled('pre')(({ theme }) => ({
  border: '1px dashed',
  borderColor: theme.palette.primary.main,
  borderRadius: '5px',
  color: theme.palette.primary.main,
  margin: 0,
}));

function CommandDetail({
  command,
}) {
  const intl = useIntl();
  const slaveIdLabel = intl.formatMessage(messages.slaveId);
  const functionCodeLabel = intl.formatMessage(messages.functionCode);
  const registerOffestLabel = intl.formatMessage(messages.registerOffset);
  const numberOfRegistersLabel = intl.formatMessage(messages.numberOfRegisters);
  const requestLabel = intl.formatMessage(messages.request);
  const decimalLabel = intl.formatMessage(messages.decimal);
  const hexLabel = intl.formatMessage(messages.hexadecimal);
  const crcLabel = intl.formatMessage(messages.crc);
  const maxLen = Math.max(
    slaveIdLabel.length,
    functionCodeLabel.length,
    registerOffestLabel.length,
    numberOfRegistersLabel.length,
  );
  const getFlexSpaces = (label, len) => {
    let rst = '';
    while (rst.length + label.length < len) rst = `${rst} `;
    return rst;
  };
  const getSameLen = (label, len) => {
    let rst = label.toString();
    while (rst.length < len) rst = ` ${rst}`;
    return rst;
  };
  const startAddress = [0, 0, 10001, 40001, 30001];
  return (
    <CommandDetailWithStyle>
      {`
  ${slaveIdLabel}:${getFlexSpaces(slaveIdLabel, maxLen)} ${getSameLen(command.slaveId.dec, 6)} (${decimalLabel}) |    ${command.slaveId.hex} (${hexLabel})  
  ${functionCodeLabel}:${getFlexSpaces(functionCodeLabel, maxLen)} ${getSameLen(command.functionCode.dec, 6)} (${decimalLabel}) |    ${command.functionCode.hex} (${hexLabel})  
  ${registerOffestLabel}:${getFlexSpaces(registerOffestLabel, maxLen)} ${getSameLen(command.registerOffset.dec, 6)} (${decimalLabel}) |  ${command.registerOffset.hex} (${hexLabel})  
  ${numberOfRegistersLabel}:${getFlexSpaces(numberOfRegistersLabel, maxLen)} ${getSameLen(command.numberOfRegisters.dec, 6)} (${decimalLabel}) |  ${command.numberOfRegisters.hex} (${hexLabel})  

  ${crcLabel}:${getFlexSpaces(crcLabel, maxLen)} ${getSameLen(command.crc.dec, 6)} (${decimalLabel}) |  ${command.crc.hex} (${hexLabel})  

  ${requestLabel}: [${command.slaveId.hex}] [${command.functionCode.hex}] [${command.registerOffset.hex}] [${command.numberOfRegisters.hex}] [${command.crc.hex}]  
           |    |    |      |      |-> ${crcLabel} (${command.crc.dec})  
           |    |    |      |-> ${numberOfRegistersLabel} (${command.numberOfRegisters.dec})    
           |    |    |-> ${registerOffestLabel} (${command.registerOffset.dec} = ${Number(command.registerOffset.dec) + startAddress[command.functionCode.dec]})    
           |    |-> ${functionCodeLabel} (${command.functionCode.dec})  
           |-> ${slaveIdLabel} (${command.slaveId.dec})  
           
`}
    </CommandDetailWithStyle>
  );
}

export default CommandDetail;
