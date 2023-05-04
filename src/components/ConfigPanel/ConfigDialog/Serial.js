import {
  useState, Fragment, useRef, forwardRef, useImperativeHandle,
} from 'react';
import { Grid, Collapse } from '@mui/material';
import SwipeableViews from 'react-swipeable-views';
import TabPanel from 'components/common/TabPanel';
import { FormattedMessage } from 'react-intl';
import messages from 'hocs/Locale/Messages/ConfigPanel/ConfigDialog/Serial';
import { Formik } from 'formik';
import { serialFields } from './constants';
import { renderFields } from './utils';

const Serial = forwardRef(({
  initVals,
}, ref) => {
  const [serialId, setSerialId] = useState(0);

  const serialIdOptions = [
    { label: '1', value: 0 }, { label: '2', value: 1 }, { label: '3', value: 2 },
  ];

  const enableOptions = [
    { label: <FormattedMessage {...messages.statusOptionEnable} />, value: true },
    { label: <FormattedMessage {...messages.statusOptionDisable} />, value: false },
  ];

  const formikRefs = useRef([]);

  const handleSerialIdChange = (event) => {
    setSerialId(Number(event.target.value));
  };

  const handleEnabledChange = (index) => (e) => {
    formikRefs.current[index].setFieldValue('enabled', e.target.value === 'true');
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
        {
          renderFields({
            label: <FormattedMessage {...messages.serialIdLabel} />,
            value: serialId,
            handleChange: handleSerialIdChange,
            fieldType: 'radioGroup',
            radioOptions: serialIdOptions,
            layout: { xs: 12 },
          })
        }
      </Grid>
      <SwipeableViews index={serialId}>
        {
          initVals.map((serialConfig, index) => (
            <TabPanel key={index} index={index} value={serialId} sx={{ px: 0, py: 1 }}>
              <Formik
                innerRef={(el) => { formikRefs.current[index] = el; }}
                initialValues={serialConfig}
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
                    </Grid>
                    <Collapse in={formikProps.values.enabled} timeout={500} exit style={{ marginTop: '10px' }}>
                      <Grid
                        container
                        spacing={2}
                        direction="row"
                      >
                        {serialFields.map((field) => (
                          <Fragment key={field.propertyName}>
                            {renderFields({
                              value: formikProps.values[field.propertyName],
                              name: `${field.propertyName}`,
                              handleChange: formikProps.handleChange,
                              ...field,
                            })}
                          </Fragment>
                        ))}
                      </Grid>
                    </Collapse>
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

export default Serial;
