import { useState, Fragment, useEffect } from 'react';
import {
  Grid,
  Typography,
} from '@mui/material';
import SwipeableViews from 'react-swipeable-views';
import TabPanel from 'components/common/TabPanel';
import { FormattedMessage, useIntl } from 'react-intl';
import platformMessages from 'hocs/Locale/Messages/ConfigPanel/ConfigDialog/Platform';
import messages from 'hocs/Locale/Messages/ConfigPanel/ConfigDialog/DataConversion';
import {
  networkIds,
} from './constants';
import { convertRawCommands, renderFields } from './utils';
import DataAccordion from './DataAccordion';

function DataConversion({
  formik,
}) {
  const intl = useIntl();
  const [networkId, setNetworkId] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [commands, setCommands] = useState([]);
  const [contentType, setContentType] = useState('hasCommands');

  useEffect(() => {
    const { values } = formik;
    if (values.networkConfigs[networkId].enabled) {
      const { serialId } = values.networkConfigs[networkId];
      if (values.serialConfigs[serialId].autoPollConfig?.rawCommands?.length) {
        setContentType('hasCommands');
        const temp = convertRawCommands(values.serialConfigs[serialId].autoPollConfig);
        const conversionConfigs = values.networkConfigs[networkId].conversionConfigs || [];
        const rst = [];
        temp?.forEach((obj) => {
          const conversions = conversionConfigs
            .find((cfg) => (cfg.commandId === obj.id))?.conversions;
          rst.push(conversions ? { ...obj, initConversions: conversions } : obj);
        });
        setCommands(rst);
      } else {
        setContentType('hasNoCommands');
        setCommands([]);
      }
    } else {
      setContentType('networkDisabled');
      setCommands([]);
    }
  }, [networkId]);

  const handleExpandChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleNetworkIdChange = (event) => {
    setNetworkId(Number(event.target.value));
  };

  const setFields = (data) => {
    const origin = formik.values.networkConfigs[networkId].conversionConfigs || [];
    const temp = [];
    let flag = false;
    origin.forEach((conversion) => {
      if (conversion.commandId === data.commandId) {
        temp.push(data);
        flag = true;
      } else {
        temp.push(conversion);
      }
    });
    if (!flag) temp.push(data);
    formik.setFieldValue(`networkConfigs[${networkId}].conversionConfigs`, temp);
  };

  const renderAccordions = (commands) => (
    <>
      {commands.map((command, idx) => (
        <DataAccordion
          key={`command${idx}`}
          idx={idx}
          expanded={expanded}
          handleExpandChange={handleExpandChange}
          command={command}
          setExpanded={setExpanded}
          setFields={setFields}
        />
      ))}
    </>
  );

  const renderContent = () => {
    switch (contentType) {
      case 'hasCommands':
        return renderAccordions(commands);
      case 'networkDisabled':
        return (<Typography><FormattedMessage {...messages.networkDisabledText} /></Typography>);
      case 'hasNoCommands':
      default:
        return (<Typography><FormattedMessage {...messages.autoPollDisabledText} /></Typography>);
    }
  };

  const networkIdField = {
    fieldType: 'radioGroup',
    label: intl.formatMessage(platformMessages.networkIdLabel),
    handleChange: handleNetworkIdChange,
    value: networkId,
    dataType: 'number',
    radioOptions: networkIds.map((id) => ({ value: id, label: id + 1 })),
    layout: { xs: 12 },
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        direction="row"
      >
        {renderFields(networkIdField)}
      </Grid>
      <SwipeableViews index={networkId}>
        {
          formik.values.networkConfigs.map((networkConfig, index) => (
            <TabPanel key={index} index={index} value={networkId} sx={{ px: 0, py: 3 }}>
              {renderContent()}
            </TabPanel>
          ))
        }
      </SwipeableViews>
    </>
  );
}

export default DataConversion;
