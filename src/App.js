import React,{Fragment} from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import {useNavigate} from "react-router-dom";
import SignUp from './Components/SignUp';
import { useAxiosGet } from './Components/Hook/apiGetHook';

import { mailActions } from './Components/Store/MailSlice';
import ReadMail from './Components/ReadMail';
import MailBox from './Components/MailBox';
import { authActions } from './Components/Store/AuthSlice';
import './App.css';
import ComposeMail from './Components/ComposeMail';

function App() {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  dispatch(authActions.setIsAuth());
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const userId = useSelector((state) => state.auth.userId);
  const { data, fetchError } = useAxiosGet(
    `https://mail-box-client-b834a-default-rtdb.firebaseio.com/mails/${userId}inbox.json`
);

let mailArray = [];
for (let id in data) {
    let mails = data[id];
    // console.log(id);
    mails.id = id;
    mailArray.push(mails);
}
dispatch(mailActions.addMail(mailArray));

fetchError && alert(fetchError);

    
        
  return (
      <Fragment>
          <Routes>
            {/* {!isAuth && <SignUp/>}
            {!isAuth && (
                <Route path='/' element={<MailBox/>}/> 
            )} */}
          {/* <Route path="/" element={<SignUp />} />
            <Route path="/compose-mail" element={isAuth ? <ComposeMail /> : <SignUp />}/>
            <Route path="/mail-box" element={isAuth ? <MailBox/> : <SignUp />}/>
            <Route path="/read-mail" element={isAuth ? <ReadMail/> : <SignUp />}/> */}
            <Route path="/" element={ <SignUp />}/>
            <Route path="/compose-mail" element={ <ComposeMail/>}/>
            <Route path="/mail-box" element={ <MailBox/>}/>
            <Route path="/read-mail" element={ <ReadMail/>}/>
          </Routes>

      </Fragment>
  );
}
export default App;
