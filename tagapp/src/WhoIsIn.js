import React, { Link } from 'react';

export class WhoIsIn extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            playerlist: null
        }
        
        this.showPlayers = this.showPlayers.bind(this);
        this.hide = this.hide.bind(this);
    }
    
    showPlayers(props) {
    
        fetch('/listplayers')
            .then(res => res.json())
            .then((data) => {
                console.log(data);
                this.setState({ playerlist: data })
                
            })
            .catch(console.log)
    }
    
    hide() {
        this.setState({ playerlist: null });
    }
    
    render() {
        return (
            <div>
                <a onClick={this.showPlayers}>List Players</a>

                { this.state.playerlist 
                    && 
                    <div>
                        <ul>
                        { this.state.playerlist.map(r => <li key={r}>{r}</li>) }
                        </ul>
                            <a onClick={this.hide}>Hide 'em</a>
                    </div>
                }
                
            </div>
        );
    }
}