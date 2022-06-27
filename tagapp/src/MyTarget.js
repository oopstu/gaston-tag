import React, { assets } from 'react';
import { User } from './User';
// import stu from './targets/stu.jpg';
// import josiah from './targets/josiah.jpg';
const images = require.context('./assets/targets', true);

export class MyTarget extends React.Component {

    
    loadImage(imageName) { return import(`./assets/targets/${imageName.toLowerCase()}.jpg`).then(img => {
        console.log(img);
        this.setState({targetImage:img.default})
    }); }

    constructor(props) {
        super(props);
        
        this.state = {
            targetName: null,
            playerName: props.player,
            targetImage: null,
        }
        
        this.LoadTarget = this.LoadTarget.bind(this);
        this.GetSlogan = this.GetSlogan.bind(this);
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
                    this.loadImage(data.target);
                    this.setState({targetName: data.target})
                } else {
                    console.log("no target, waiting for game start");
                    this.setState({targetName: "No Target, waiting for game to start."});
                }
            })
            .catch(console.log)
    }
    
    GetSlogan(playerName) {
        
        switch (playerName) {
            case "Josiah" : 
                return "He's small, but he's sneaky.";
            case "Ellie" :
                return "She's talented on the guitar, be wary if she asks you to sing!";
            case "Melissa" :
                return "";
            case "Amy" :
                return "";
            case "John" :
                return "";
            case "Lily" :
                return "";
            case "Christian" :
                return "";
            case "Jess" :
                return "";
            case "Stu" :
                return "";
            case "Luke" :
                return "";
            case "Liam" :
                return "";
            case "West" :
                return "";
            case "Erik" :
                return "";

        }
        return "";
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
       
        // Set icon image.
        // let targetImages = [ { "stu" : {stu}  }, { "josiah" : {josiah} }]
     
        return (
            <div>
                <a onClick={this.LoadTarget}>Who is my target?</a>
                {
                    (this.state.targetName) && 

                        <div className="card">
                            <img src={this.state.targetImage} alt="" className="cardicon" />
                                <h1>{this.state.targetName}</h1>
                                <p className="title">{this.GetSlogan(this.state.targetName)}</p>
                                <ul className="buttons">
                                    <a onClick={() => {this.TagTarget()}}><li >TAG</li></a>
                                    <a onClick={() => {this.HideTarget()}}><li >Hide</li></a>
                                </ul>
                        </div>
                    
                }
            </div>
        );
    }
}