import {User} from "./User";
import {MyTarget} from "./MyTarget";
import {MyMethod} from "./MyMethod";
import {History} from "./History";
import {WhoIsIn} from "./WhoIsIn";
import {StartButton} from "./StartButton";
import React, { useReducer, useState } from 'react';

export class WholeStupidAppBecauseICantUsePromise extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            isTagged: null
        }
    }
    
    componentDidMount() {
        let resp = fetch('/amtagged', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                "playerid": User.Get()
            })
        }).then(resp => resp.json()).then(data => this.setState( { isTagged: data.isTagged }));

    }

    render() {
    

        if (this.state.isTagged === null) {
            return (
                <div>TAG LOADING... YOU WILL WAIT FOREVER!</div>
            );
        } else if (this.state.isTagged === true) {
            <span>YOU HAZ DEAD!</span>
        } else {
            return (

                <div className="App">
                    <span>TAGG, G.</span>
                    <MyTarget player={User.Get()}></MyTarget>
                    <MyMethod player={User.Get()}></MyMethod>
                    <History></History>
                    <WhoIsIn></WhoIsIn>
                    <StartButton player={User.Get()}></StartButton>

                </div>
            );
        } 
        
    }
}