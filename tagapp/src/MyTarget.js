import React, { useReducer, useState } from 'react';
import { User } from './User';

export class MyTarget extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            targetName: null,
            playerName: props.player
        }
    }
    
    componentDidMount() {
        // call api or anything
        fetch('/gettarget', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                "playerid": this.state.playerName
            })
        })
            .then(res => res.json())
            .then((data) => {
                console.log(data);
                this.setState({ targetName: data })

            })
            .catch(console.log)
    }
    
    render() {
        return (
            <div>
                <span>Who is my target?</span>
                <span>{this.state.targetName}</span>
            </div>
        );
    }
}