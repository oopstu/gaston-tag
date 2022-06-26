import React, { useReducer, useState } from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export class User extends React.Component {

    constructor(props) {
        super();

        this.state = 
        {
            username: cookies.get('taguser')
        }
    }
    
    TestUser(props) {
        if (this.state.username) {
            console.log("user found, returning.");
            return this.state.username;
        
        } else {
        console.log('no user');
       return false;
     }
    }
    
    IsHeath(props) {
        return this.state.username === "Heath";
    }
    
    static Get(props) {
        return cookies.get('taguser');
    }
    
    StoreUser(props) {
        console.log('saving user name.' + props);
        cookies.set('taguser', props);
        fetch('/addplayer', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                "playerid": props
            })
        });
    }
    
    render() {
        return (
            <div>
                <span>Your target is WHATEVER</span>
            </div>
        );
    }
}