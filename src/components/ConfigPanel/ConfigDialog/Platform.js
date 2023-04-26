import {
  useState, Fragment, useRef, forwardRef, useImperativeHandle,
} from 'react';
import { Grid } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { Formik } from 'formik';
import messages from 'hocs/Locale/Messages/ConfigPanel/ConfigDialog/Platform';
import SwipeableViews from 'react-swipeable-views';
import TabPanel from 'components/common/TabPanel';
import { renderFields } from './utils';
import {
  networkIds, networkOptions, aliyunFields, mqttFields, socketFields,
} from './constants';

const Platform = forwardRef(({
  initVals,
}, ref) => {
  const formikRefs = useRef([]);
  const [networkId, setNetworkId] = useState(0);

  const enableOptions = [
    { label: <FormattedMessage {...messages.statusOptionEnable} />, value: true },
    { label: <FormattedMessage {...messages.statusOptionDisable} />, value: false },
  ];
  const handleNetworkIdChange = (event) => {
    setNetworkId(Number(event.target.value));
  };

  const handleEnabledChange = (index) => (e) => {
    formikRefs.current[index].setFieldValue('enabled', e.target.value === 'true');
  };

  const renderNetwork = (formikProps) => {
    const { type } = formikProps.values;
    let fields; let
      typeName;
    switch (type) {
      case 1:
        fields = aliyunFields;
        typeName = 'aliyun';
        break;
      case 2:
        fields = mqttFields;
        typeName = 'mqtt';
        break;
      case 0:
      default:
        fields = socketFields;
        typeName = 'socket';
        break;
    }
    return (
      <>
        {fields.map((field) => (
          <Fragment key={field.propertyName}>
            {renderFields({
              value: formikProps.values[typeName][field.propertyName],
              name: `${typeName}.${field.propertyName}`,
              handleChange: formikProps.handleChange,
              ...field,
            })}
          </Fragment>
        ))}
        {renderFields({
          label: <FormattedMessage {...messages.serialIdLabel} />,
          value: Number(formikProps.values.serialId),
          name: 'serialId',
          handleChange: formikProps.handleChange,
          fieldType: 'radioGroup',
          radioOptions: [{ label: '1', value: 0 }, { label: '2', value: 1 }, { label: '3', value: 2 }],
        })}
      </>
    );
  };

  useImperativeHandle(ref, () => ({
    form: formikRefs,
  }));

  return (
    <>
      <Grid
        container
        spacing={2}
        direction="row"
      >
        <Grid item xs={12}>
          {renderFields({
            label: <FormattedMessage {...messages.networkIdLabel} />,
            value: networkId,
            handleChange: handleNetworkIdChange,
            fieldType: 'radioGroup',
            datatype: 'number',
            radioOptions: networkIds.map((id) => ({ label: id + 1, value: id })),
          })}
        </Grid>
      </Grid>
      <SwipeableViews index={networkId}>
        {
          initVals.map((networkConfig, index) => (
            <TabPanel key={index} index={index} value={networkId} sx={{ px: 0, py: 3 }}>
              <Formik
                innerRef={(el) => { formikRefs.current[index] = el; }}
                initialValues={networkConfig}
              >
                {(formikProps) => (
                  <>
                    <Grid
                      container
                      spacing={2}
                      direction="row"
                    >
                      {
                        renderFields({
                          label: <FormattedMessage {...messages.statusLabel} />,
                          value: formikProps.values.enabled,
                          name: 'enabled',
                          handleChange: handleEnabledChange(index),
                          fieldType: 'radioGroup',
                          radioOptions: enableOptions,
                        })
                      }
                      {
                        formikProps.values.enabled
                          && renderFields({
                            label: <FormattedMessage {...messages.platformTypeLabel} />,
                            value: formikProps.values.type,
                            name: 'type',
                            handleChange: formikProps.handleChange,
                            fieldType: 'select',
                            selectOptions: networkOptions,
                          })
                      }
                    </Grid>
                    {
                      formikProps.values.enabled && (
                        <Grid
                          container
                          spacing={2}
                          direction="row"
                          style={{ marginTop: '10px' }}
                        >
                          {renderNetwork(formikProps)}
                        </Grid>
                      )
                    }
                  </>
                )}
              </Formik>
            </TabPanel>
          ))
        }
      </SwipeableViews>
    </>
  );
});

export default Platform;
