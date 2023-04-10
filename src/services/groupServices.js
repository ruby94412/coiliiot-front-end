import http from 'httpCommon';
import authHeader from './authHeader';

const groupServices = {
  getGroupList: (data) => http.post('/group/getGroupList', data, { headers: authHeader() }),
  addGroup: (data) => http.post('/group/add', data, { headers: authHeader() }),
  updateGroup: (data) => http.post('/group/update', data, { headers: authHeader() }),
  deleteGroup: (data) => http.post('/group/delete', data, { headers: authHeader() }),
};

export default groupServices;
