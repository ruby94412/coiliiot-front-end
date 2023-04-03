import {connect} from 'react-redux';
import ConfigPanel from './components/ConfigPanel';
import Login from './components/Login';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
const theme = createTheme({
  palette: {
    mode: 'dark',
  }
});
const App = ({
  userInfo,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            {userInfo?.isLoggedIn && <Route path="/mainPanel" element={<ConfigPanel />} />}
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

const mapStateToProps = state => {
  const {userInfo} = state;
  return {userInfo};
};
export default connect(mapStateToProps, {})(App);
