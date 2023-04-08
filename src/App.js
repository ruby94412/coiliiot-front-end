import {connect} from 'react-redux';
import ConfigPanel from './components/ConfigPanel';
import Login from './components/Login';
import Navigation from './components/Navigation';
import {FormattedMessage} from 'react-intl';
import messages from './components/hocs/Locale/messages';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import withTheme from './components/hocs/Theme';
import withLocale from './components/hocs/Locale';
const App = ({
  userInfo,
  setThemeMode,
  theme,
  setLocale,
}) => {
  return (
    <div className="App" style={{backgroundColor: theme.palette.darker.main}}>
      <FormattedMessage {...messages.projectHeader} />
      <BrowserRouter>
        <Navigation setThemeMode={setThemeMode} setLocale={setLocale} />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          {userInfo?.isLoggedIn && <Route path="/mainPanel" element={<ConfigPanel />} />}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = state => {
  const {userInfo} = state;
  return {userInfo};
};

export default connect(
  mapStateToProps,
  {}
)(
  withLocale(withTheme(App))
);
