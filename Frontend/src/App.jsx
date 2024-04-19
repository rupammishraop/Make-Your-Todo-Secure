// App.js

import React from 'react';
import { Footer, Navbar } from "./index"
import { Outlet } from 'react-router-dom';
import Popup from './components/PopUp';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { closePopUP } from './store/userSlice';

const App = () => {

  const { isOpened, message } = useSelector(state => state.PopVisible);
  const dispatch = useDispatch();
  console.log(isOpened, message)
  useEffect(() => {
    if (isOpened) {
      setTimeout(() => {
        dispatch(closePopUP());
      }, 3000);
    }
  }, [isOpened]);
  return (
    <div>
      <Navbar />
      {
        isOpened ? <Popup message={message}/> : null
      }
      
      <Outlet />
      <Footer />
    </div>
  );
};

export default App;
