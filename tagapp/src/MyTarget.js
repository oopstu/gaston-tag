import React, { useReducer, useState } from 'react';
import { User } from './User';

export class MyTarget extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            targetName: null,
            playerName: props.player
        }
        
        this.LoadTarget = this.LoadTarget.bind(this);
    }
    
    LoadTarget() {
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
                console.log('loaded target for you: ' + data.target);
                if (data) {
                    console.log(data);
                    this.setState({targetName: data.target})
                } else {
                    console.log("no target, waiting for game start");
                    this.setState({targetName: "No Target, waiting for game to start."});
                }
            })
            .catch(console.log)
    }
    
    render() {
        return (
            <div>
                <a onClick={this.LoadTarget}>Who is my target?</a>
                <span>{this.state.targetName}</span>
            </div>
        );
    }
}