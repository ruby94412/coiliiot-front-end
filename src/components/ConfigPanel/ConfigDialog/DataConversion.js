import {
  useState, Fragment, useEffect, forwardRef, useImperativeHandle, useRef,
} from 'react';
import {
  Grid,
  Typography,
  Collapse,
  Zoom,
} from '@mui/material';
import { TransitionGroup } from 'react-transition-group';
import { FormattedMessage, useIntl } from 'react-intl';
import { Formik } from 'formik';
import platformMessages from 'hocs/Locale/Messages/ConfigPanel/ConfigDialog/Platform';
import messages from 'hocs/Locale/Messages/ConfigPanel/ConfigDialog/DataConversion';
import { convertRawCommands, renderFields } from './utils';
import { DataAccordion, CustomPropsAccordion } from './DataAccordion';

const serialIdOptions = [
  { label: '1', value: 0 }, { label: '2', value: 1 }, { label: '3', value: 2 },
];

const DataConversion = forwardRef(({
  networkForm,
  autoPollForm,
}, ref) => {
  const intl = useIntl();
  const [serialId, setSerialId] = useState(0);
  const [networks, setNetworks] = useState([]);
  const [networkOptions, setNetworkOptions] = useState([]);
  const [networkId, setNetworkId] = useState(null);
  const [autoPolls, setAutoPolls] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [commands, setCommands] = useState([]);
  const [initCustomProps, setInitCustomProps] = useState([]);

  useEffect(() => {
    if (networkForm?.form?.current?.length) {
      const temp = networkForm.form?.current
        .map((formikForm) => ({ ...formikForm.values }));
      console.log('networks', temp);
      setNetworks(temp);
    }
    if (autoPollForm?.form?.current?.length) {
      const temp = autoPollForm.form?.current
        .map((formikForm) => ({ ...formikForm.values }));
      console.log('autoPolls', temp);
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
    console.log('networkOptions', temp);
    if (temp.length) setNetworkId(temp[0].value);
    else setNetworkId(null);
  }, [serialId, networks]);

  useEffect(() => {
    if (autoPolls[serialId]?.commands?.length) {
      const temp = convertRawCommands(autoPolls[serialId]);
      setInitCustomProps(networks[networkId]?.customProps || []);
      const conversionConfigs = networks[networkId]?.conversionConfigs || [];
      const rst = [];
      temp?.forEach((obj) => {
        const conversions = conversionConfigs
          .find((cfg) => (cfg.commandId === obj.id))?.conversions;
        rst.push(conversions ? { ...obj, initConversions: conversions } : obj);
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
    const origin = networks[networkId].conversionConfigs || [];
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

  const setCustomPropsFields = (data) => {
    networkForm.form?.current[networkId]?.setFieldValue('customProps', data);
  };

  const renderAccordions = () => (
    <>
      {commands.map((command, idx) => (
        <DataAccordion
          key={`command${idx}`}
          idx={idx}
          expanded={expanded}
          handleExpandChange={handleExpandChange}
          command={command}
          setExpanded={setExpanded}
          setConversionFields={setConversionFields}
        />
      ))}
      <CustomPropsAccordion
        expanded={expanded}
        handleExpandChange={handleExpandChange}
        setExpanded={setExpanded}
        initCustomProps={initCustomProps}
        setCustomPropsFields={setCustomPropsFields}
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
      {
        networkOptions.length ? (
          <>
            {
              networks.map((network, index) => (
                <Collapse in={index === networkId} key={index} exit timeout={500}>
                  <div>
                    {
                      commands.length
                        ? renderAccordions()
                        : (
                          <Typography>
                            <FormattedMessage {...messages.autoPollDisabledText} />
                          </Typography>
                        )
                    }
                  </div>
                </Collapse>
              ))
            }
          </>
        ) : (<></>)
      }
    </>
  );
});

export default DataConversion;
