import {
  Drawer,
  Box,
  Typography,
  Divider,
  IconButton,
  ButtonGroup,
  Button,
} from '@mui/material';
import {
  HighlightOff,
  LightMode,
  DarkMode,
} from '@mui/icons-material';
const SettingDrawer = ({
  toggleDrawer,
  isDrawerOpen,
  setThemeMode,
  setLocale,
}) => {
  const handleModeChange = mode => e => {
    setThemeMode(mode);
    localStorage.setItem('mode', mode);
  };
  const handleLocaleChange = locale => e => {
    setLocale(locale);
    localStorage.setItem('locale', locale);
  }
  return (
    <Drawer
      anchor="right"
      open={isDrawerOpen}
      onClose={toggleDrawer(false)}
    >
      <Box sx={{width: 300}}>
        <Box sx={{p: 2, display: 'flex', alignItems: 'center'}}>
          <Typography variant="h6">页面设置</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
              size="large"
              color="inherit"
              onClick={toggleDrawer(false)}
            >
            <HighlightOff />
          </IconButton>
        </Box>
        <Divider />
        <Box sx={{p: 2}}>
          <Typography variant="h8">模式</Typography>
          <ButtonGroup variant="outlined" style={{width: '100%', marginTop: '10px'}}>
            <Button
              startIcon={<LightMode />}
              style={{width: '100%'}}
              onClick={handleModeChange('light')}
            >亮屏</Button>
            <Button
              startIcon={<DarkMode />}
              style={{width: '100%'}}
              onClick={handleModeChange('dark')}
            >暗屏</Button>
          </ButtonGroup>
        </Box>
        <Box sx={{p: 2}}>
        <Typography variant="h8">语言</Typography>
        <ButtonGroup variant="outlined" style={{width: '100%', marginTop: '10px'}}>
          <Button style={{width: '100%'}} onClick={handleLocaleChange('zh')}>🇨🇳 中文</Button>
          <Button style={{width: '100%'}}  onClick={handleLocaleChange('en')}>🇺🇸 English</Button>
        </ButtonGroup>
        </Box>
      </Box>
      
    </Drawer>
  );
}

export default SettingDrawer;