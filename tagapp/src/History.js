import React, { Link } from 'react';
import Moment from 'moment';

export class History extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            historylist: null
        }

        this.showHistory = this.showHistory.bind(this);
        this.hide = this.hide.bind(this);
    }

    showHistory(props) {

        fetch('/gethistory')
            .then(res => res.json())
            .then((data) => {
                console.log(data);
                this.setState({ historylist: data })

            })
            .catch(console.log)
    }

    hide() {
        this.setState({ historylist: null });
    }

    render() {
        return (
            <div>
                <a onClick={() => {this.showHistory()}}>Show History</a>

                { this.state.historylist
                    &&
                    <div>
                        <ul>
                            { 
                                this.state.historylist.map(r =>
                                    <div className="card">
                                        <p className="title">{Moment(r.stamp).format('d MMM') -  r.playerName}</p>
                                        <br/>
                                        {r.message}
                                    </div>
                                ) 
                            }
                        </ul>
                        <br/>
                        <br/>
                        <a onClick={() => {this.hide()}}>Hide it</a>
                    </div>
                }

            </div>
        );
    }
}