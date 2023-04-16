import { DataGrid } from '@mui/x-data-grid';
import {
  useEffect, useState, useCallback,
} from 'react';
import { Snackbar, Alert } from '@mui/material';
import { connect } from 'react-redux';
import { getGroupList, deleteGroup, updateGroup } from 'slice/group';
import ConfirmDialog from 'components/common/ConfirmDialog';
import { FormattedMessage, useIntl } from 'react-intl';
import messages from 'hocs/Locale/Messages/ConfigPanel/GroupTable';
import TableToolBar from 'components/common/TableToolBar';
import NoRowsOverlay from 'components/common/NoRowsOverlay';
import getColumns from './columns';
import AddGroup from '../AddGroup';
import DeviceTable from '../DeviceTable';
import ConfigDialog from '../ConfigDialog';

function GroupTable({
  getGroupList,
  updateGroup,
  deleteGroup,
  userInfo,
}) {
  const intl = useIntl();
  const [rows, setRows] = useState([]);
  const [addGroupOpen, setAddGroupOpen] = useState(false);
  const [isConfigClosing, setIsConfigClosing] = useState(false);
  const [editParams, setEditParams] = useState(null);
  const [deleteParams, setDeleteParams] = useState(null);
  const [deviceTableParams, setDeviceTableParams] = useState(null);
  const [configParams, setConfigParams] = useState(null);
  const [snackbar, setSnackbar] = useState(null);

  // table data operations
  const reloadTable = () => {
    getGroupList({ username: userInfo.username }).then((res) => {
      setRows(res.payload?.data || []);
    });
  };

  useEffect(() => {
    if (!addGroupOpen || !deviceTableParams || !configParams) {
      reloadTable();
    }
  }, [addGroupOpen, deviceTableParams, configParams]);

  // edit and delete rows
  const processRowUpdate = useCallback((newRow, oldRow) => new Promise((resolve, reject) => {
    const isMutated = newRow.groupName !== oldRow.groupName;
    if (isMutated) {
      setEditParams({
        resolve, reject, newRow, oldRow,
      });
    } else {
      resolve(oldRow);
    }
  }), []);

  const updateRow = async (newRow) => updateGroup({ ...newRow, username: userInfo.username });

  const deleteRow = async (params) => deleteGroup({ data: { groupId: params.id } });

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

  const deviceTableOnClose = () => {
    setDeviceTableParams(null);
  };

  const configModalOnClose = (dirty) => {
    if (dirty) {
      setIsConfigClosing(true);
    } else {
      setConfigParams(null);
    }
  };

  const columnsProps = {
    setDeviceTableParams, setDeleteParams, setConfigParams, intl,
  };
  const columns = getColumns(columnsProps);
  const handleCloseSnackbar = () => setSnackbar(null);
  const renderToolBar = () => (
    <TableToolBar
      setModalOpen={setAddGroupOpen}
      text={<FormattedMessage {...messages.toolBarAddGroupButton} />}
    />
  );

  return (
    <div style={{ height: '500px', width: '95%', paddingTop: '20px' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        components={{ Toolbar: renderToolBar, NoRowsOverlay }}
        processRowUpdate={processRowUpdate}
        experimentalFeatures={{ newEditingApi: true }}
        pageSize={20}
        rowsPerPageOptions={[20]}
        hideFooterSelectedRowCount
        sx={{
          boxShadow: 2,
          border: 2,
          borderColor: 'primary.dark',
        }}
      />
      <AddGroup addGroupOpen={addGroupOpen} setAddGroupOpen={setAddGroupOpen} />
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
      <ConfirmDialog
        isOpen={isConfigClosing}
        onClose={() => { setIsConfigClosing(false); }}
        handleConfirmCb={() => {
          setIsConfigClosing(false);
          setConfigParams(null);
        }}
        content={<FormattedMessage {...messages.unsavedConfirm} />}
      />
      {!!snackbar && (
        <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={6000}>
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
      <DeviceTable
        groupRow={deviceTableParams}
        onClose={deviceTableOnClose}
      />
      <ConfigDialog
        groupRow={configParams}
        updateConfig={updateRow}
        onClose={configModalOnClose}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  const { userInfo } = state;
  return { userInfo };
};
export default connect(mapStateToProps, {
  getGroupList,
  deleteGroup,
  updateGroup,
})(GroupTable);
