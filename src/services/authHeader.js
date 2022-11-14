export default function authHeader() {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  if (userInfo?.accessToken) {
    return { 'x-access-token': userInfo.accessToken };
  } else {
    return {};
  }
}