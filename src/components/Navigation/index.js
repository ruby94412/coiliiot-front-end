import {useState} from 'react';
import {useNavigate} from "react-router-dom";
import ConfirmDialog from '../common/ConfirmDialog';
import {logout} from '../../slice/login';
import {connect} from 'react-redux';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Container,
  Avatar,
  Button,
  Tooltip,
  Drawer,
} from '@mui/material';
import {
  Settings as SettingsIcon,
  AccountCircle,
  MoreVert as MoreIcon,
} from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import SettingDrawer from './SettingDrawer';

const Navigation = ({
  logout,
  setThemeMode,
  setLocale,
}) => {
  
  const navigate = useNavigate();
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = open => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsDrawerOpen(open);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = () => {
    handleCloseUserMenu();
    localStorage.removeItem('userInfo');
    logout();
    navigate('/login');
  };
  const handleDrawerStateChange = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const settings = [{
    text: '登出',
    onClick: () => {setLogoutConfirmOpen(true);},
  }];
  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map(setting => (
              <MenuItem key={setting.text} onClick={setting.onClick}>
                <Typography textAlign="center">{setting.text}</Typography>
              </MenuItem>
            ))}
          </Menu>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              onClick={toggleDrawer(true)}
            >
              <SettingsIcon />
            </IconButton>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              // aria-controls={mobileMenuId}
              aria-haspopup="true"
              // onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <SettingDrawer
        isDrawerOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
        setThemeMode={setThemeMode}
        setLocale={setLocale}
      />
      
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