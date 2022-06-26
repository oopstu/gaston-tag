import React, { useState } from 'react';
import {User} from './User';

export class Login extends React.Component {


    constructor(props) {
        super();

        this.state = { newusername: '' }

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleChange(event) {
        console.log('state username is being set?');
       this.state.newusername = event.target.value;
    }
   
    handleClick() {
        console.log('handleClick 👉️ ', this.state.newusername);
        // Redirect back to app.
        new User().StoreUser(this.state.newusername);
        window.location.reload();
    };


    render () {
        return (
            <div>
                you gotta put stuff here.
                <input 
                    type="text" 
                    id="username" 
                    defaultValue={this.state.newusername}
                    onChange={this.handleChange}
               ></input>
                <button onClick={this.handleClick}>Do me.</button>
            </div>
        );
    }
}
