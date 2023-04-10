import http from 'httpCommon';

const loginService = {
  login: (data) => http.post('/login', data),
};

export default loginService;
