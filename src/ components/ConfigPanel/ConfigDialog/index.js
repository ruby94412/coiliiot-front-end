import {Dialog} from '@mui/material';
import {useState, useEffect, useRef} from 'react';
import DialogContent from './DialogContent';
import {getInitialValues} from './constants';
const dialogStyle = {
  backgroundColor: '#424141',
  color: 'white',
  minWidth: '70%',
}

const ConfigDialog = ({
  groupRow,
  onClose,
  updateConfig,
}) => {
  const [initialValues, setInitialValues] = useState();
  const ref = useRef();

  useEffect(() => {
    if (!!groupRow) {
      setInitialValues(getInitialValues(groupRow.config));
    }
  }, [groupRow]);

  return (
    <Dialog
      maxWidth="xs"
      open={!!groupRow}
      onClose={() => {onClose(ref.current.dirty);}}
      PaperProps={{style: dialogStyle}}
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