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
  // Avatar,
  // Button,
  // Tooltip,
  // Drawer,
} from '@mui/material';
import {
  Settings as SettingsIcon,
  AccountCircle,
  MoreVert as MoreIcon,
} from '@mui/icons-material';
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
  const [anchorElMobile, setAnchorElMobile] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [anchorElDrawer, setAnchorElDrawer] = useState('right');

  const toggleDrawer = (open, anchor = '') => (event) => {
    if (anchor) setAnchorElDrawer(anchor);
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsDrawerOpen(open);
  };

  const handleOpenMobileMenu = (event) => {
    setAnchorElMobile(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseMobileMenu = () => {
    setAnchorElMobile(null);
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
  // const handleDrawerStateChange = () => {
  //   setIsDrawerOpen(!isDrawerOpen);
  // };
  const userActions = [{
    text: <FormattedMessage {...messages.logoutLabel} />,
    onClick: () => { setLogoutConfirmOpen(true); },
  }];
  const renderMobileMenu = () => (
    <Menu
      anchorEl={anchorElMobile}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(anchorElMobile)}
      onClose={handleCloseMobileMenu}
    >
      <MenuItem onClick={toggleDrawer(true, 'bottom')}>
        <IconButton
          size="large"
          color="inherit"
        >
          <SettingsIcon />
        </IconButton>
        <p>Settings</p>
      </MenuItem>
      <MenuItem onClick={handleOpenUserMenu}>
        <IconButton size="large" color="inherit">
          <AccountCircle />
        </IconButton>
        <p>User Actions</p>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} />
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
            {userActions.map((setting) => (
              <MenuItem key={setting.text} onClick={setting.onClick}>
                <Typography textAlign="center">{setting.text}</Typography>
              </MenuItem>
            ))}
          </Menu>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              color="inherit"
              onClick={toggleDrawer(true, 'right')}
            >
              <SettingsIcon />
            </IconButton>
            <IconButton
              size="large"
              color="inherit"
              onClick={handleOpenUserMenu}
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              // aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleOpenMobileMenu}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
          {renderMobileMenu()}
          <SettingDrawer
            anchor={anchorElDrawer}
            isDrawerOpen={isDrawerOpen}
            toggleDrawer={toggleDrawer}
            setThemeMode={setThemeMode}
            setLocale={setLocale}
            locale={locale}
            themeMode={themeMode}
          />
        </Toolbar>
      </AppBar>
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
