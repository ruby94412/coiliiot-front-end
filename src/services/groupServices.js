import http from '../httpCommon';

const groupServices = {
  getGroupList: data => http.post('/group/getGroupList', data),
  addGroup: data => http.post('/group/add', data),
  updateGroup: data => http.post('/group/update', data),
  deleteGroup: data => http.delete('/group/delete', data),
}

export default groupServices;