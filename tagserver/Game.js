'use strict';

const fs = require('fs');

class GameData {
    
    constructor() {
        // attempt to load from fs.
        console.log(`attemptng to load from file.`);
        try {
            
            let rawdata = fs.readFileSync('gamedata.json');
            let allData = JSON.parse(rawdata);
            this.players = allData.players;
            this.history = allData.history;
            this.started = false;
            console.log('loaded ' + this.players.length + ' players' );
            
        } catch {
            console.error('game data failed to load, creating it.');
            this.players = [];
            this.history = [];
            this.started = false;
            this.Save();
        }
    }
    
    AddPlayer(playerName) {
        if (this.players.find(x => x.playerName === playerName)) {
            console.error('you cannot be someone you are not');        
        } else {
            this.players.push({playerName: playerName, target: null, method: null});
            this.history.push({playerName: playerName, message: "Joined Game", stamp: new Date()});
            this.Save();
        }
    }
    
    SetTarget(player, newTarget) {
        let fellow = this.players.find(x => x.playerName === player);
        fellow.target = newTarget;
        this.history.push({playerName: player, message: "Got a New Target", stamp: new Date()});
        this.Save();
    }
    
    GetHistory() {
        return this.history;
    }
    
    ListPlayers() {
        let x = [];
        this.players.forEach(z => x.push(z.playerName));
        return x;
    }
    
    StartGame() {
        this.started = true;
        this.history.push({playerName: 'Heath', message: "Started the Game", stamp: new Date()});
        this.Save();
    }
    
    Save() {
        console.log('saving all game data');
        let data = JSON.stringify(this);
        fs.writeFileSync('gamedata.json', data);
    }
}
module.exports = GameData;