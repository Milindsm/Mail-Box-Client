import React,{Fragment} from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import {useNavigate} from "react-router-dom";
import SignUp from './Components/SignUp';
import Welcome from './Components/Welcome';
import { authActions } from './Components/Store/AuthSlice';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  dispatch(authActions.setIsAuth());
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  return (
      <Fragment>
          {/* {!isAuth && <SignUp />}
          {!isAuth && (
              <Route path="/welcome">
                  <Navigate to="/" />
              </Route>
          )}
          {isAuth && <Navigate to="/welcome" />}

          <Route path="/welcome">
              <Welcome />
          </Route> */}
          <Routes>
          <Route path="/" element={<SignUp />} />
            <Route
                path="/welcome"
                // element={loggedIn ? <Profile /> : <SignUp />}
                element={isAuth ? <Welcome /> : <SignUp />}
            />
          </Routes>

      </Fragment>
  );
}
export default App;
