/* eslint-disable no-underscore-dangle */
import axiosInstance from '../httpCommon';
import { refreshToken } from '../slice/login';

const getLocalAccessToken = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if (!userInfo) return null;
  return userInfo.accessToken;
};

const getLocalRefreshToken = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if (!userInfo) return null;
  return userInfo.refreshToken;
};

const updateLocalAccessToken = (token) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  userInfo.accessToken = token;
  localStorage.setItem('userInfo', JSON.stringify(userInfo));
};

const setup = (store) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const temp = { ...config };
      const token = getLocalAccessToken();
      if (token) {
        temp.headers['x-access-token'] = token;
      }
      return temp;
    },
    (error) => Promise.reject(error),
  );

  const { dispatch } = store;
  axiosInstance.interceptors.response.use(
    (res) => res,
    async (err) => {
      const originalConfig = err.config;
      if (originalConfig.url !== '/login' && err.response) {
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;
          try {
            const rs = await axiosInstance.post('/refreshToken', {
              refreshToken: getLocalRefreshToken(),
            });
            const { accessToken } = rs.data;
            dispatch(refreshToken(accessToken));
            updateLocalAccessToken(accessToken);
            return axiosInstance(originalConfig);
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
      }
      return Promise.reject(err);
    },
  );
};

export default setup;
