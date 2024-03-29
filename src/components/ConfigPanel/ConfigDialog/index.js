import { Dialog } from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import DialogContent from './DialogContent';
import { getInitialValues } from './utils';

const dialogStyle = {
  backgroundColor: 'secondary.main',
  minWidth: '70%',
};

function ConfigDialog({
  groupRow,
  onClose,
  updateConfig,
}) {
  const [initialValues, setInitialValues] = useState();
  const ref = useRef();

  useEffect(() => {
    if (groupRow) {
      setInitialValues(getInitialValues(groupRow.config));
      // setInitialFormValues(groupRow.config);
    }
  }, [groupRow]);

  return (
    <Dialog
      maxWidth="xs"
      open={!!groupRow}
      onClose={() => { onClose(ref.current.dirty); }}
      PaperProps={{ style: dialogStyle }}
    >
      <DialogContent
        ref={ref}
        groupRow={groupRow}
        updateConfig={updateConfig}
        onClose={onClose}
        initialValues={initialValues}
      />
    </Dialog>
  );
}

export default ConfigDialog;
