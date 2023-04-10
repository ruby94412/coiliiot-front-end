import { connect } from 'react-redux';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import ConfigPanel from './components/ConfigPanel';
import Login from './components/Login';
import Navigation from './components/Navigation';
import './App.css';
import withTheme from './hocs/Theme';
import withLocale from './hocs/Locale';

function App({
  userInfo,
  setThemeMode,
  theme,
  setLocale,
  themeMode,
  locale,
}) {
  return (
    <div className="App" style={{ backgroundColor: theme.palette.darker.main }}>
      <BrowserRouter>
        <Navigation
          setThemeMode={setThemeMode}
          setLocale={setLocale}
          locale={locale}
          themeMode={themeMode}
        />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          {userInfo?.isLoggedIn && <Route path="/mainPanel" element={<ConfigPanel />} />}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { userInfo } = state;
  return { userInfo };
};

export default connect(
  mapStateToProps,
  {},
)(
  withLocale(withTheme(App)),
);
