import {Button} from '@mui/material';
import {useState} from 'react';
import {useNavigate} from "react-router-dom";
import ConfirmDialog from '../../common/ConfirmDialog';
import {logout} from '../../../slice/login';
import {connect} from 'react-redux';
const Navigation = ({
  logout,
}) => {
  const navigate = useNavigate();
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    logout();
    navigate('/login');
  }
  return (
    <>
      <Button
        variant="outlined"
        onClick={() => {setLogoutConfirmOpen(true);}}
        style={{backgroundColor: 'rgb(78 70 212)', color: 'white'}}
      >
        登出
      </Button>
      <ConfirmDialog
        content="请点击确定退出登录"
        isOpen={logoutConfirmOpen}
        onClose={() => {setLogoutConfirmOpen(false);}}
        handleConfirmCb={handleLogout}
      />
    </>
  )
}

const mapStateToProps = state => {
  return {};
};
export default connect(mapStateToProps, {logout})(Navigation);