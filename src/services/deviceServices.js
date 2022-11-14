import http from '../httpCommon';
import authHeader from './authHeader';

const deviceServices = {
  getDeviceList: data => http.post('/device/getDeviceList', data, {headers: authHeader()}),
  addDevice: data => http.post('/device/add', data, {headers: authHeader()}),
  updateDevice: data => http.post('/device/update', data, {headers: authHeader()}),
  deleteDevice: data => http.delete('/device/delete', data, {headers: authHeader()}),
}

export default deviceServices;