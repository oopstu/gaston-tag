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
    
    HideTarget() {
        this.setState( { targetName: null });
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

    TagTarget() {
        // call api or anything
        fetch('/tagtarget', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                "playerid": this.state.playerName
            })
        })
            .then(res => res.json())
            .then((data) => {
                    this.setState({targetName: "Submitting tag, waiting for confirmation."});
                
            })
            .catch(console.log)
    }
    
    render() {
        return (
            <div>
                <a onClick={this.LoadTarget}>Who is my target?</a>
                {
                    (this.state.targetName) && 

                        <div className="card">
                            <img src='./targets/Erik.jpg' alt="{this.state.targetName}" style="width:100%"/>
                                <h1>{this.state.targetName}</h1>
                                <p className="title">CEO & Founder, Example</p>
                                <p>Harvard University</p>
                                <p>
                                    <a onClick={() => {this.TagTarget()}}>TAG</a>
                                    <a onClick={() => {this.HideTarget()}}>Hide</a>
                                </p>
                        </div>
                    
                }
            </div>
        );
    }
}