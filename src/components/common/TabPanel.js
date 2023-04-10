// import PropTypes from 'prop-types';
import { Box } from '@mui/material';

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;
  return (
    <Box sx={{ p: 3 }} {...other}>
      {children}
    </Box>
  );
}

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

export default TabPanel;
