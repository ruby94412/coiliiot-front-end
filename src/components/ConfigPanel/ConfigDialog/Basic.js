import { Fragment } from 'react';
import { Grid } from '@mui/material';
import { basicFields } from './constants';
import { renderFields } from './utils';

function Basic({
  formik,
}) {
  return (
    <Grid
      container
      spacing={2}
      direction="row"
    >
      {basicFields.map((field) => (
        <Fragment key={field.propertyName}>
          {renderFields({
            value: formik.values.basicConfigs[field.propertyName],
            name: `basicConfigs.${field.propertyName}`,
            handleChange: formik.handleChange,
            ...field,
          })}
        </Fragment>
      ))}
    </Grid>
  );
}

export default Basic;
