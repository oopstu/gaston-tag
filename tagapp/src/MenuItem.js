import React, { useReducer, useState } from 'react';
import { User } from './User';

export class MenuItem extends React.Component {

    componentDidMount() {
        // call api or anything
        fetch('/gettarget', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                "playerid": User.Get()
            })
        });
    }
    
    render() {
        return (
            <div>
                <span>Who is my target?</span>
            </div>
        );
    }
}