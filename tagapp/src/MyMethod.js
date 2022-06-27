import React, { useReducer, useState } from 'react';
import { User } from './User';

export class MyMethod extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            method: null,
            methodOpts: null,
            playerName: props.player
        }

        this.LoadOptions = this.LoadOptions.bind(this);
        this.ShowMethod = this.ShowMethod.bind(this);
        this.SelectMethod = this.SelectMethod.bind(this);
    }
    
    LoadOptions() {
        fetch('/getmethodopts', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                "playerid": this.state.playerName
            })
        })
            .then(res => res.json())
            .then((data) => {
                if (data) {
                    console.log("loading three options" + data);
                    this.setState({methodOpts: data})
                } 

            })
            .catch(console.log)
    }
    
    SelectMethod(methodid) {
        // call api or anything
        console.log('select method clicked and setting it now. ' + methodid);
        fetch('/pickmethod', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                "playerid": this.state.playerName,
                "methodid": methodid
            })
        })
            .then(res => res.json())
            .then((data) => {
                // notify it's cool yo.

            })
            .catch(console.log)
    }
    
    ShowMethod() {
        // call api or anything
        fetch('/getmethod', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                "playerid": this.state.playerName
            })
        })
            .then(res => res.json())
            .then((data) => {
                if (data && data.id && data.text !== "null") {
                    console.log(data.text);
                    this.setState({method: data.text})
                } else {
                    this.LoadOptions();
                }

            })
            .catch(console.log)
    }
    
    render() {
        return (
            <div>
                <a onClick={() => {this.ShowMethod()}}>What is my method?</a>
                <span>{this.state.method}</span>
                <div>
                    <ul>
                        {this.state.methodOpts?.map(y => 
                            <a onClick={() => {this.SelectMethod(y.id)}}><li key={y.id}>{y.text}</li></a>)
                        }
                    </ul>
                </div>
            </div>
        );
    }
}