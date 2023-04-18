import { useState, Fragment } from 'react';
import {
  Grid,
  RadioGroup,
  Radio,
  FormControl,
  FormControlLabel,
  FormLabel,
  Typography,
} from '@mui/material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from 'components/common/StyledAccordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SwipeableViews from 'react-swipeable-views';
import TabPanel from 'components/common/TabPanel';
import { FormattedMessage } from 'react-intl';
import platformMessages from 'hocs/Locale/Messages/ConfigPanel/ConfigDialog/Platform';
import messages from 'hocs/Locale/Messages/ConfigPanel/ConfigDialog/DataConversion';
import {
  networkIds,
} from './constants';
import { convertRawCommands } from './utils';
import CommandDetail from './CommandDetail';

function DataConversion({
  formik,
}) {
  const [networkId, setNetworkId] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleNetworkIdChange = (event) => {
    setNetworkId(Number(event.target.value));
  };

  const renderAccordion = (commands) => (
    <>
      {commands.map((command, idx) => (
        <Accordion
          key={`command${idx}`}
          expanded={expanded === `command${idx}`}
          onChange={handleChange(`command${idx}`)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: '20%', flexShrink: 0 }}>
              {`Command ${idx + 1}`}
            </Typography>
            <Typography sx={{ fontFamily: 'Courier' }}>{command.detail.hex.join(' ')}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid
              container
              spacing={2}
              direction="row"
            >
              <Grid item xs={12} md={6}><CommandDetail command={command.detail} /></Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
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
        return renderAccordion(commands);
      case 'networkDisabled':
        return (<Typography><FormattedMessage {...messages.networkDisabledText} /></Typography>);
      case 'hasNoCommands':
      default:
        return (<Typography><FormattedMessage {...messages.autoPollDisabledText} /></Typography>);
    }
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        direction="row"
      >
        <Grid item xs={12}>
          <FormControl>
            <FormLabel><FormattedMessage {...platformMessages.networkIdLabel} /></FormLabel>
            <RadioGroup
              row
              onChange={handleNetworkIdChange}
              value={networkId}
            >
              {
                networkIds.map((id) => (
                  <FormControlLabel key={id} value={id} control={<Radio />} label={id + 1} />
                ))
              }
            </RadioGroup>
          </FormControl>
        </Grid>
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
