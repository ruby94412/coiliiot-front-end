import {useState, createContext} from 'react';
import Login from './ components/Login';
// import ControlPanel from './ components/ControlPanel';
import ConfigPanel from './ components/ConfigPanel';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';

export const UserContext = createContext();
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  return (
    <div className="App">
        {
          !isLoggedIn
            && <Login
                  setIsLoggedIn={setIsLoggedIn}
                  setUserInfo={setUserInfo}
                />}
        {
          isLoggedIn
            && (
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={
                      <UserContext.Provider value={userInfo}>
                        <ConfigPanel />
                      </UserContext.Provider>
                    }
                  />
                </Routes>
              </BrowserRouter>
          )
        }
    </div>
  );
}

export default App;
