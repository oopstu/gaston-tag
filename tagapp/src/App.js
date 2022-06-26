import logo from './logo.svg';
import React, { useReducer, useState } from 'react';
import './App.css';
import {MenuItem} from './MenuItem';
import {Target} from './Target';
import {User} from './User';
import {Login} from './Login';
import {History} from './History';
import {StartButton} from './StartButton';

import {WhoIsIn} from './WhoIsIn';

function App() {
    
    let u = new User();
    
   if (!u.TestUser()) {
       
       return <Login></Login>; 
   
   } else {
  
       return (
           <div className="App">
               <span>TAGG, G.</span>
               <MenuItem></MenuItem>
               <Target></Target>
               <History></History>
               <WhoIsIn></WhoIsIn>
               <StartButton player={User.Get()}></StartButton>
               
           </div>
       );
   }
}


export default App;
