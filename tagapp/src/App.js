import logo from './logo.svg';
import React, { useReducer, useState } from 'react';
import './App.css';
import './cardstyles.css';
import {User} from './User';
import {Login} from './Login';
import {WholeStupidAppBecauseICantUsePromise} from './WholeStupidAppBecauseICantUsePromise';



import {WhoIsIn} from './WhoIsIn';

function App() {
    
    let u = new User();
    
   if (!u.TestUser()) {
       
       return <Login></Login>; 
   
   } else {
       
       return <WholeStupidAppBecauseICantUsePromise></WholeStupidAppBecauseICantUsePromise>;
   }
}


export default App;
