import { useState, Fragment } from 'react';
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

  const handleExpandChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleNetworkIdChange = (event) => {
    setNetworkId(Number(event.target.value));
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
        />
      ))}
    </>
  );

  const renderContent = () => {
    const { values } = formik;
    let type;
    let commands = [];
    if (values.networkConfigs[networkId].enabled) {
      const { serialId } = values.networkConfigs[networkId];
      if (values.serialConfigs[serialId].autoPollConfig?.rawCommands?.length) {
        type = 'hasCommands';
        commands = convertRawCommands(values.serialConfigs[serialId].autoPollConfig);
      } else {
        type = 'hasNoCommands';
      }
    } else {
      type = 'networkDisabled';
    }
    switch (type) {
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
