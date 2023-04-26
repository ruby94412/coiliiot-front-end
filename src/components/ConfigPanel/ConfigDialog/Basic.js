import {
  Fragment, forwardRef, useImperativeHandle, useRef,
} from 'react';
import { Grid } from '@mui/material';
import { Formik } from 'formik';
import { basicFields } from './constants';
import { renderFields } from './utils';

const Basic = forwardRef(({
  initVals,
}, ref) => {
  const formikRef = useRef();
  useImperativeHandle(ref, () => ({
    form: formikRef,
  }));

  return (
    <Grid
      container
      spacing={2}
      direction="row"
    >
      <Formik initialValues={initVals} innerRef={formikRef}>
        {(formikProps) => basicFields.map((field) => (
          <Fragment key={field.propertyName}>
            {renderFields({
              value: formikProps.values[field.propertyName],
              name: `${field.propertyName}`,
              handleChange: formikProps.handleChange,
              ...field,
            })}
          </Fragment>
        ))}
      </Formik>
    </Grid>
  );
});

export default Basic;
