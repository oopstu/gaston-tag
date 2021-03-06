import {User} from "./User";
import {MyTarget} from "./MyTarget";
import {MyMethod} from "./MyMethod";
import {History} from "./History";
import {WhoIsIn} from "./WhoIsIn";
import './mainpage.css';
import {StartButton} from "./StartButton";
import React, { useReducer, useState } from 'react';

export class WholeStupidAppBecauseICantUsePromise extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            isTagged: null
        }
        
        this.ConfirmTag = this.ConfirmTag.bind(this);
    }
    
    ConfirmTag() {

        fetch('/confirmtag', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                "playerid": User.Get()
            })
        })
            .then(resp => resp.json())
            .then((data) =>
                this.componentDidMount()
                );
        
    }
    
    componentDidMount() {
        let resp = fetch('/amtagged', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                "playerid": User.Get()
            })
        })
            .then(resp => resp.json())
            .then((data) =>  
                        this.setState( { isTagged: data.istagged, isConfirmed: data.confirmed }
                ));

    }

    render() {
    
        if (this.state.isTagged === null) {
            return (
                <div>TAG LOADING... YOU WILL WAIT FOREVER!</div>
            );
        } else if (this.state.isTagged === true) {
            return (<div className="App dead">YOU HAZ DEAD!<br/>
                {!this.state.isConfirmed &&
                    <a onClick={() => {this.ConfirmTag(User.Get())}}>CONFIRM TAG</a>
                }
            </div>);
        } else {
            return (

                <div className="App">
                    
                    
                    <span className="title">TAGG, BRO</span>
                    
                    <div >
                    
                        <div className="listItems">
                            <MyTarget player={User.Get()}>Who my tagee</MyTarget>
                        </div>
                        
                        <div className="listItems">
                            <MyMethod player={User.Get()}></MyMethod>
                        </div>
                        
                        <div className="listItems">
                            <History></History>
                        </div>
                        
                        <div className="listItems">
                            <WhoIsIn></WhoIsIn>
                        </div>
                    </div>
                    
                    <StartButton player={User.Get()}></StartButton>

                </div>
            );
        } 
        
    }
}