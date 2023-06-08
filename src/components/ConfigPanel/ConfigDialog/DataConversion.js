import { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  Collapse,
} from '@mui/material';
import { FormattedMessage, useIntl } from 'react-intl';
import platformMessages from 'hocs/Locale/Messages/ConfigPanel/ConfigDialog/Platform';
import messages from 'hocs/Locale/Messages/ConfigPanel/ConfigDialog/DataConversion';
import { convertRawCommands, renderFields } from './utils';
import DataAccordion from './DataAccordion';
import CustomizeJson from './CustomizeJson';

const serialIdOptions = [
  { label: '1', value: 0 }, { label: '2', value: 1 }, { label: '3', value: 2 },
];

function DataConversion({
  networkForm,
  autoPollForm,
}) {
  const intl = useIntl();
  const [serialId, setSerialId] = useState(0);
  const [networks, setNetworks] = useState([]);
  const [networkOptions, setNetworkOptions] = useState([]);
  const [networkId, setNetworkId] = useState(null);
  const [autoPolls, setAutoPolls] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [commands, setCommands] = useState([]);
  const [mappingRows, setMappingRows] = useState([]);
  const [initCustomizedJson, setInitCustomizedJson] = useState([]);

  useEffect(() => {
    if (networkForm?.form?.current?.length) {
      const temp = networkForm.form?.current
        .map((formikForm) => ({ ...formikForm.values }));
      setNetworks(temp);
    }
    if (autoPollForm?.form?.current?.length) {
      const temp = autoPollForm.form?.current
        .map((formikForm) => ({ ...formikForm.values }));
      setAutoPolls(temp);
    }
  }, [networkForm, autoPollForm]);

  useEffect(() => {
    const temp = [];
    networks.forEach((network) => {
      if (network.enabled && network.serialId === serialId) {
        temp.push({ label: network.networkId + 1, value: network.networkId });
      }
    });
    setNetworkOptions(temp);
    if (temp.length) setNetworkId(temp[0].value);
    else setNetworkId(null);
  }, [serialId, networks]);

  useEffect(() => {
    if (autoPolls[serialId]?.commands?.length) {
      const temp = convertRawCommands(autoPolls[serialId]);
      setInitCustomizedJson(networks[networkId]?.customizedJson);
      const conversionConfigs = networks[networkId]?.conversionConfigs || [];
      temp?.forEach((obj, idx) => {
        const conversions = conversionConfigs
          .find((cfg) => (cfg.commandId === obj.id))?.conversions;
        temp[idx] = conversions ? { ...obj, initConversions: conversions } : obj;
      });
      setCommands(temp);
    } else {
      setCommands([]);
    }
  }, [serialId, autoPolls, networkId]);

  const handleSerialIdChange = (event) => {
    setSerialId(Number(event.target.value));
  };

  const handleNetworkIdChange = (event) => {
    setNetworkId(Number(event.target.value));
  };

  const handleExpandChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const setConversionFields = (data) => {
    let origin = networks[networkId].conversionConfigs || [];
    origin = origin.filter(
      (conversion) => (commands.findIndex((command) => (command.id === conversion.commandId)) > -1),
    );
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
    networkForm.form?.current[networkId]?.setFieldValue('conversionConfigs', temp);
  };

  const setCustomizedJsonField = (data) => {
    networkForm.form?.current[networkId]?.setFieldValue('customizedJson', data);
  };

  const renderAccordions = () => (
    <>
      {commands.map((command, idx) => (
        <DataAccordion
          key={`command${idx}`}
          idx={idx}
          command={command}
          expanded={expanded}
          rows={mappingRows}
          setRows={setMappingRows}
          setExpanded={setExpanded}
          setConversionFields={setConversionFields}
          handleExpandChange={handleExpandChange}
        />
      ))}
      <CustomizeJson
        expanded={expanded}
        handleExpandChange={handleExpandChange}
        initCustomizedJson={initCustomizedJson}
        setCustomizedJsonField={setCustomizedJsonField}
        mappingRows={mappingRows}
      />
    </>
  );

  return (
    <>
      <Grid
        container
        spacing={2}
        direction="row"
      >
        {
          renderFields({
            label: intl.formatMessage(platformMessages.serialIdLabel),
            value: serialId,
            handleChange: handleSerialIdChange,
            fieldType: 'radioGroup',
            radioOptions: serialIdOptions,
            layout: { xs: 12, md: 4 },
          })
        }
        <Grid item xs={12} md={8}>
          <Collapse in={networkOptions.length > 0} timeout={500} exit>
            {
              renderFields({
                fieldType: 'radioGroup',
                label: intl.formatMessage(platformMessages.networkIdLabel),
                handleChange: handleNetworkIdChange,
                value: networkId,
                dataType: 'number',
                radioOptions: networkOptions,
                layout: { xs: 12 },
              })
            }
          </Collapse>
          <Collapse in={networkOptions.length === 0} timeout={500} exit>
            <Typography style={{ lineHeight: 3 }}>
              <FormattedMessage {...messages.noNetworkConfigedText} />
            </Typography>
          </Collapse>
        </Grid>
      </Grid>
      <Collapse
        in={commands.length > 0 && networkOptions.length > 0}
        exit
        timeout={500}
        style={{ marginTop: '10px' }}
      >
        {
          commands.length
            ? renderAccordions()
            : (
              <Typography>
                <FormattedMessage {...messages.autoPollDisabledText} />
              </Typography>
            )
        }
      </Collapse>
    </>
  );
}

export default DataConversion;
