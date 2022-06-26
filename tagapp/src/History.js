import React, { useReducer, useState } from 'react';

export class History extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            historydata: null
        }
    }
    
    showHistory() {
    
        fetch('/gethistory')
            .then(res => res.json())
            .then((data) => {
                this.setState({ historydata: data })
            })
            .catch(console.log)
    }
    
    render() {
        return (
            <div>
                <span>Show History</span>
            </div>
        );
    }
}