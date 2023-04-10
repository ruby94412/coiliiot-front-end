import { DataGrid } from '@mui/x-data-grid';
import {
  useEffect, useState, useCallback,
} from 'react';
import {
  Snackbar, Alert, Dialog, DialogContent,
} from '@mui/material';
import { connect } from 'react-redux';
import { getDeviceList, deleteDevice, updateDevice } from 'slice/device';
import { FormattedMessage, useIntl } from 'react-intl';
import messages from 'hocs/Locale/Messages/ConfigPanel/DeviceTable';
import ConfirmDialog from 'components/common/ConfirmDialog';
import TableToolBar from '../TableToolBar';
import getColumns from './columns';
import AddDevice from '../AddDevice';

const dialogStyle = {
  minWidth: '70%',
  height: '50%',
};

function DeviceTable({
  groupRow,
  onClose,
  getDeviceList,
  deleteDevice,
  updateDevice,
}) {
  const intl = useIntl();
  const [rows, setRows] = useState([]);
  const [addDeviceOpen, setAddDeviceOpen] = useState(false);
  const [editParams, setEditParams] = useState(null);
  const [deleteParams, setDeleteParams] = useState(null);
  const [snackbar, setSnackbar] = useState(null);

  // table data operations
  const reloadTable = () => {
    getDeviceList({ groupId: groupRow?.id })
      .then((res) => {
        setRows(res.payload?.data || []);
      });
  };

  useEffect(() => {
    // console.log(groupRow);
    if (!!groupRow || !addDeviceOpen) {
      reloadTable();
    }
  }, [groupRow, addDeviceOpen]);

  // edit and delete rows
  const processRowUpdate = useCallback((newRow, oldRow) => new Promise((resolve, reject) => {
    const isMutated = newRow.deviceComment !== oldRow.deviceComment;
    if (isMutated) {
      setEditParams({
        resolve, reject, newRow, oldRow,
      });
    } else {
      resolve(oldRow);
    }
  }), []);

  const updateRow = async (newRow) => updateDevice({ ...newRow, groupId: groupRow.id });

  const deleteRow = async (params) => deleteDevice({ data: { deviceId: params.id } });

  const handleEditConfirm = async () => {
    const {
      newRow, oldRow, reject, resolve,
    } = editParams;
    try {
      const response = await updateRow(newRow);
      setSnackbar({ children: <FormattedMessage {...messages.snackBarSuccess} />, severity: 'success' });
      resolve(response);
      setEditParams(null);
      reloadTable();
    } catch (error) {
      setSnackbar({ children: <FormattedMessage {...messages.snackBarEditError} />, severity: 'error' });
      reject(oldRow);
      setEditParams(null);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteRow(deleteParams);
      setSnackbar({ children: <FormattedMessage {...messages.snackBarSuccess} />, severity: 'success' });
      setDeleteParams(null);
      reloadTable();
    } catch (error) {
      setSnackbar({ children: <FormattedMessage {...messages.snackBarDeleteError} />, severity: 'error' });
      setDeleteParams(null);
    }
  };

  const handleEditClose = () => {
    const { oldRow, resolve } = editParams;
    resolve(oldRow);
    setEditParams(null);
  };

  const columns = getColumns({ setDeleteParams, intl });
  const handleCloseSnackbar = () => setSnackbar(null);
  const renderToolBar = () => (
    <TableToolBar
      setModalOpen={setAddDeviceOpen}
      text={<FormattedMessage {...messages.toolBarAddDeviceButton} />}
    />
  );

  return (
    <Dialog
      maxWidth="xs"
      open={!!groupRow}
      onClose={onClose}
      PaperProps={{ style: dialogStyle }}
    >
      <DialogContent>
        <DataGrid
          sx={{
            boxShadow: 2,
            border: 2,
            borderColor: 'primary.dark',
          }}
          rows={rows}
          columns={columns}
          components={{ Toolbar: renderToolBar }}
          processRowUpdate={processRowUpdate}
          experimentalFeatures={{ newEditingApi: true }}
          pageSize={20}
          rowsPerPageOptions={[20]}
          hideFooterSelectedRowCount
        />
        <AddDevice
          addDeviceOpen={addDeviceOpen}
          setAddDeviceOpen={setAddDeviceOpen}
          groupId={groupRow?.id}
        />
        <ConfirmDialog
          isOpen={!!editParams}
          onClose={handleEditClose}
          handleConfirmCb={handleEditConfirm}
          content={<FormattedMessage {...messages.editConfirm} />}
        />
        <ConfirmDialog
          isOpen={!!deleteParams}
          onClose={() => { setDeleteParams(null); }}
          handleConfirmCb={handleDeleteConfirm}
          content={<FormattedMessage {...messages.deleteConfirm} />}
        />
        {!!snackbar && (
          <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={6000}>
            <Alert {...snackbar} onClose={handleCloseSnackbar} />
          </Snackbar>
        )}
      </DialogContent>
    </Dialog>
  );
}

const mapStateToProps = (state) => {
  const { userInfo } = state;
  return { userInfo };
};
export default connect(mapStateToProps, {
  getDeviceList,
  deleteDevice,
  updateDevice,
})(DeviceTable);
