import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  // Container,
  Avatar,
  // Button,
  Tooltip,
  // Drawer,
} from '@mui/material';
import {
  Settings as SettingsIcon,
  AccountCircle,
  MoreVert as MoreIcon,
} from '@mui/icons-material';
// import MenuIcon from '@mui/icons-material/Menu';
// import AdbIcon from '@mui/icons-material/Adb';
import { FormattedMessage } from 'react-intl';

import { logout } from 'slice/login';
import ConfirmDialog from 'components/common/ConfirmDialog';
import messages from 'hocs/Locale/Messages/Navigation';
import SettingDrawer from './SettingDrawer';

function Navigation({
  logout,
  setThemeMode,
  setLocale,
  locale,
  themeMode,
}) {
  const navigate = useNavigate();
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  // const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsDrawerOpen(open);
  };

  // const handleOpenNavMenu = (event) => {
  //   setAnchorElNav(event.currentTarget);
  // };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  // const handleCloseNavMenu = () => {
  //   setAnchorElNav(null);
  // };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = () => {
    handleCloseUserMenu();
    localStorage.removeItem('userInfo');
    logout();
    navigate('/login');
  };
  // const handleDrawerStateChange = () => {
  //   setIsDrawerOpen(!isDrawerOpen);
  // };
  const settings = [{
    text: <FormattedMessage {...messages.logoutLabel} />,
    onClick: () => { setLogoutConfirmOpen(true); },
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
            {settings.map((setting) => (
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
        locale={locale}
        themeMode={themeMode}
      />
      <ConfirmDialog
        content={<FormattedMessage {...messages.logoutConfirmation} />}
        isOpen={logoutConfirmOpen}
        onClose={() => { setLogoutConfirmOpen(false); }}
        handleConfirmCb={handleLogout}
      />
    </>
  );
}

const mapStateToProps = () => ({});
export default connect(mapStateToProps, { logout })(Navigation);
