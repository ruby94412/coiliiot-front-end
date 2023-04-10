import { useState } from 'react';
import { Button, Drawer } from '@mui/material';

function ThemeSwitch() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleDrawSwitchOnClick = () => {
    setDrawerOpen(true);
  };
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
  return (
    <>
      <Button onClick={handleDrawSwitchOnClick}>setting</Button>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerClose}
      >
        drawer
      </Drawer>
    </>

  );
}

export default ThemeSwitch;
