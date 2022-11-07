import {DataGrid} from '@mui/x-data-grid';
import {useEffect, useState, useMemo, useCallback} from 'react';
import {Snackbar, Alert, Modal, Box} from '@mui/material';
import ConfirmDialog from '../../common/ConfirmDialog';
import TableToolBar from '../TableToolBar';
import getColumns from './columns';
import axios from 'axios';
import AddDevice from "../AddDevice";

// constants declaration
const REQUESTURL = 'http://47.99.92.183:8080/device/getDeviceList';
const UPDATEURL = 'http://47.99.92.183:8080/device/update';
const DELETEURL = 'http://47.99.92.183:8080/device/delete'
const tableStyle = {
  "& .MuiDataGrid-cell": {
    color: "white"
  },
  "& .MuiDataGrid-columnHeadersInner": {
    color: "white"
  },
  "& .MuiDataGrid-footerCell": {
    color: "white"
  },
  "& .MuiDataGrid-menuIconButton": {
    color: "white"
  },
  "& .MuiDataGrid-sortIcon": {
    color: "white"
  },
  "& .MuiTablePagination-root": {
    color: "white !important"
  }
};
const boxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  bgcolor: '#555555',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  color: 'white',
  height: '400px',
};
const DeviceTable = ({
  groupRow,
  onClose,
}) => {
  const [rows, setRows] = useState([]);
  const [addDeviceOpen, setAddDeviceOpen] = useState(false);
  const [editParams, setEditParams] = useState(null);
  const [deleteParams, setDeleteParams] = useState(null);
  const [snackbar, setSnackbar] = useState(null);

  // table data operations
  // eslint-disable-next-line
  const reloadTable = () => {
    axios.post(REQUESTURL, {groupId: groupRow?.id})
      .then(res => {
        setRows(res.data?.data || []);
      });
  }

  useEffect(() => {
    if (!!groupRow || !addDeviceOpen) {
      reloadTable();
    }
  // eslint-disable-next-line
  }, [groupRow, addDeviceOpen]);

  // edit and delete rows
  const processRowUpdate = useCallback((newRow, oldRow) => {
    return new Promise((resolve, reject) => {
      const isMutated = newRow.deviceComment !== oldRow.deviceComment;
      if (isMutated) {
        setEditParams({resolve, reject, newRow, oldRow});
      } else {
        resolve(oldRow);
      }
    });
  },[]);

  const updateRow = async newRow => {
    return axios.post(UPDATEURL, {...newRow, groupId: groupRow.id});
  }

  const deleteRow = async params => {
    return axios.delete(DELETEURL, {data: {deviceId: params.id}});
  }

  const handleEditConfirm = async () => {
    const {newRow, oldRow, reject, resolve} = editParams;
    try {
      const response = await updateRow(newRow);
      setSnackbar({children: '数据已更新', severity: 'success'});
      resolve(response);
      setEditParams(null);
      reloadTable();
    } catch (error) {
      setSnackbar({children: "分组名称不能为空", severity: 'error'});
      reject(oldRow);
      setEditParams(null);
    }
  }

  const handleDeleteConfirm = async () => {
    try {
      await deleteRow(deleteParams);
      setSnackbar({children: '数据已更新', severity: 'success'});
      setDeleteParams(null);
      reloadTable();
    } catch (error) {
      setSnackbar({children: "删除失败", severity: 'error'});
      setDeleteParams(null);
    }
  }

  const handleEditClose = () => {
    const {oldRow, resolve} = editParams;
    resolve(oldRow);
    setEditParams(null);
  }

  // eslint-disable-next-line
  const columns = useMemo(() => getColumns({setDeleteParams}), []);
  const handleCloseSnackbar = () => setSnackbar(null);
  const renderToolBar = () => (
    <TableToolBar setModalOpen={setAddDeviceOpen} text="+添加设备"/>
  );

  return (
    <Modal
      open={!!groupRow}
      onClose={onClose}
    >
      <Box sx={boxStyle}>
        <DataGrid
          rows={rows}
          columns={columns}
          components={{Toolbar: renderToolBar}}
          processRowUpdate={processRowUpdate}
          experimentalFeatures={{newEditingApi: true}}
          pageSize={20}
          rowsPerPageOptions={[20]}
          hideFooterSelectedRowCount
          sx={tableStyle}
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
          content="确认修改该条记录吗?"
        />
        <ConfirmDialog
          isOpen={!!deleteParams}
          onClose={() => {setDeleteParams(null);}}
          handleConfirmCb={handleDeleteConfirm}
          content="确认删除该条记录吗?"
        />
        {!!snackbar && (
          <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={6000}>
            <Alert {...snackbar} onClose={handleCloseSnackbar} />
          </Snackbar>
        )}
      </Box>
    </Modal>
  );
}

export default DeviceTable;