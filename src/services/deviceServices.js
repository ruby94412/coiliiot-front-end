import http from '../httpCommon';

const deviceServices = {
  getDeviceList: data => http.post('/device/getDeviceList', data),
  addDevice: data => http.post('/device/add', data),
  updateDevice: data => http.post('/device/update', data),
  deleteDevice: data => http.delete('/device/delete', data),
}

export default deviceServices;