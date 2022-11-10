import {DataGrid} from '@mui/x-data-grid';
import {useEffect, useState, useMemo, useCallback} from 'react';
import {Snackbar, Alert} from '@mui/material';
import {connect} from 'react-redux';
import {getGroupList, deleteGroup, updateGroup} from '../../../slice/group';
import ConfirmDialog from '../../common/ConfirmDialog';
import TableToolBar from '../TableToolBar';
import getColumns from './columns';
import AddGroup from "../AddGroup";
import DeviceTable from '../DeviceTable';
import ConfigDialog from '../ConfigDialog';

const styleProperty = {
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

const GroupTable = ({
  getGroupList,
  updateGroup,
  deleteGroup,
  userInfo,
}) => {
  const [rows, setRows] = useState([]);
  const [addGroupOpen, setAddGroupOpen] = useState(false);
  const [editParams, setEditParams] = useState(null);
  const [deleteParams, setDeleteParams] = useState(null);
  const [deviceTableParams, setDeviceTableParams] = useState(null);
  const [configParams, setConfigParams] = useState(null);
  const [snackbar, setSnackbar] = useState(null);

  // table data operations
  // eslint-disable-next-line
  const reloadTable = () => {
    getGroupList({username: userInfo.username}).then(res => {
      setRows(res.payload?.data || []);
    });
  }

  useEffect(() => {
    if (!addGroupOpen || !deviceTableParams || !configParams) {
      reloadTable();
    }
  // eslint-disable-next-line
  }, [addGroupOpen, deviceTableParams, configParams]);

  // edit and delete rows
  const processRowUpdate = useCallback((newRow, oldRow) => {
    return new Promise((resolve, reject) => {
      const isMutated = newRow.groupName !== oldRow.groupName;
      if (isMutated) {
        setEditParams({resolve, reject, newRow, oldRow});
      } else {
        resolve(oldRow);
      }
    });
  },[]);

  const updateRow = async newRow => {
    return updateGroup({...newRow, username: userInfo.username});
  }

  const deleteRow = async params => {
    return deleteGroup({data: {groupId: params.id}});
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

  const deviceTableOnClose = () => {
    setDeviceTableParams(null);
  }

  const configModalOnClose = () => {
    setConfigParams(null);
  }

  const columnsProps = {setDeviceTableParams, setDeleteParams, setConfigParams}
  // eslint-disable-next-line
  const columns = useMemo(() => getColumns(columnsProps), []);
  const handleCloseSnackbar = () => setSnackbar(null);
  const renderToolBar = () => (
    <TableToolBar setModalOpen={setAddGroupOpen} text="+添加分组"/>
  );

  return (
    <div style={{ height: 400, width: '90%', paddingTop: '20px'}}>
      <DataGrid
        rows={rows}
        columns={columns}
        components={{Toolbar: renderToolBar}}
        processRowUpdate={processRowUpdate}
        experimentalFeatures={{newEditingApi: true}}
        pageSize={20}
        rowsPerPageOptions={[20]}
        hideFooterSelectedRowCount
        sx={styleProperty}
      />
      <AddGroup addGroupOpen={addGroupOpen} setAddGroupOpen={setAddGroupOpen}/>
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

const mapStateToProps = state => {
  const {userInfo} = state;
  return {userInfo};
}
export default connect(mapStateToProps, {
  getGroupList,
  deleteGroup,
  updateGroup,
})(GroupTable);