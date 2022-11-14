import {connect} from 'react-redux';
// import ControlPanel from './ components/ControlPanel';
import ConfigPanel from './ components/ConfigPanel';
import Login from './ components/Login';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';

function App({
  userInfo,
}) {
  return (
    <div className="App">
      <BrowserRouter>
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
export default connect(mapStateToProps, {})(App);
