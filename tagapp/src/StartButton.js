import React, { Link } from 'react';

export class StartButton extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            started: null,
            player: props.player
        }
        
        console.log("start loaded and is heath? " + this.state.player);
        this.startGame = this.startGame.bind(this);
        
    }
    
    componentDidMount() {

            fetch('/isstarted')
                .then(res => res.json())
                .then((data) => {

                    console.log("got result " + data + " and is this dad? " + this.state.player);
                    this.setState({started: data});
                })
                .catch(console.log);


    }
    
    startGame(props) {
    
        fetch('/listplayers')
            .then(res => res.json())
            .then((data) => {
                console.log("got result " + data + " and is this dad? " + this.state.player);
                this.setState({ playerlist: data })
                
            })
            .catch(console.log)
    }
    
    
    render() {
        return (
            <div>
                Status: 
                { this.state.started === true
                    && 
                    <div>
                        You're being hunted.
                    </div>
                }
                {
                    this.state.started === false
                    &&
                    this.state.player === "Heath"
                    &&
                    <a onClick={() => {window.alert('start');}}>Start Game?</a>
                }
                {
                    this.state.started === false
                    &&
                    this.state.player !== "Heath"
                    &&
                    <div>Waiting for the game to start.</div>
                }
            </div>
        );
    }
}