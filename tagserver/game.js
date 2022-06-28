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
            this.players.push({playerName: playerName, target: null, method: null, isTagged: false, confirmed: false});
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
        console.log("sending back " + this.history.length + " history elements.");
        return this.history;
    }
    
    ListPlayers() {
        let x = [];
        this.players.forEach(z => x.push(z.playerName));
        return x;
    }

    LoadMethods() {
        let rawdata = fs.readFileSync('method.json');
        return JSON.parse(rawdata);
    }
    
    GetMethodFor(player) {
        console.log("Looking up Method for: " + player);
        let m = this.players.find(x => x.playerName === player).method;
        
        let allMethods = this.LoadMethods();
        
        let result = allMethods.find(x => x.id === m);
        console.log("found method: " + result);
        
        if (result) {
            return result;
        }
        // Otherwise null.
        return null;
    }
    
    GetTargetFor(player) {
        console.log("Looking up Target for: " + player);
        console.log("player count: " + this.players.length + " fist is: " + this.players[0].playerName);
        let t = this.players.find(x => x.playerName === player).target;
        console.log("Found target named: " + t);
        return { target: t };
    }
    
    TagTarget(player) {
        // Set your target as tagged so they get the confirm page.
        let pp = this.players.find(s => s.playerName === player);
        console.log("Found player sending tag: " + pp.playerName);
        // who is pp target?
        let target = this.players.find(s => s.playerName === pp.target);
        console.log("Found player getting tagged: " + pp.target);
        
        this.history.push({playerName: player, message: player + " has tagged " + pp.target, stamp: new Date()});
        
        // this is the first step in a tag.
        target.isTagged = true;
   
        // save game.
        this.Save();
        
        return { result: "ok" };
    }
    
    ConfirmTag(player) {
        
        // Confirm tag,
        // Set your target as tagged so they get the confirm page.
        let taggedPlayer = this.players.find(s => s.playerName === player);
        console.log("Found player confirming tag: " + taggedPlayer.playerName);
        // finding the tagger
        let tagger = this.players.find(s => s.target === taggedPlayer.playerName);
        console.log("Found player tagging!: " + tagger.playerName);

        this.history.push({playerName: taggedPlayer.playerName, message: player + " has confirmed they have been tagged", stamp: new Date()});

        // this is the first step in a tag.
        taggedPlayer.confirmed = true;
        
        tagger.target = taggedPlayer.target;
        tagger.method = taggedPlayer.method;
        
        // Let's just check and make sure that you're not targeting yourself.
        if (tagger.target === tagger.playerName) {
            console.log("Oh no, tagger has his/her self as target, reshuffle!");

            console.log("Shrinking the universe of players.");
            let liveplayers = [];
            // Each player should be the next players target.
            for (let i = 0; i < this.players.length; i++) {
                if (!this.players[i].isTagged 
                    && !this.players[i].confirmed) {
                    liveplayers.push(this.players[i]);
                }
            }
            
            
            console.log('Setting targets');
            // Each player should be the next players target.
            for (let i = 0; i < liveplayers; i++) {
                if (i + 1 === liveplayers.length) {
                    liveplayers[i].target = liveplayers[0].playerName;
                } else {
                    liveplayers[i].target = liveplayers[i+1].playerName;
                }
            }
            console.log('all targets set.');
            
        }

        // save game.
        this.Save();

        return { result: "ok" };
       
    }
    
    GetMethodOptions(player) {
        
        // Now pair everyone with a target and load all the 
        // methods!
        let methods = this.LoadMethods();
        let min = 0;
        let max = methods.length;
        let picked = [];
        
        while (picked.length !== 3) {
            let index = Math.floor(Math.random() * (max - min + 1) + min);
            let thisone = methods[index];
            if (!picked.find(x => x === thisone)) {
                picked.push(thisone);
            }
        }
        return picked;
    }
    
    SetMethod(player, methodId) {
        
        this.history.push({playerName: player, message: "Picked their method", stamp: new Date()});

        this.players.find(x => x.playerName === player).method = methodId;

        this.Save();
        
        return { result: "ok"};
    }
    
    StartGame() {
        this.started = true;
        this.history.push({playerName: 'Heath', message: "Started the Game", stamp: new Date()});
        
        console.log('Setting targets');
        // Each player should be the next players target.
        for (let i = 0; i < this.players.length; i++) {
            if (i + 1 === this.players.length) {
                this.players[i].target = this.players[0].playerName;   
            } else {
                this.players[i].target = this.players[i+1].playerName;
            }
        }
        console.log('all targets set.');
        
        this.Save();
    }
    
    AmTagged(player) {
        let p = this.players.find(x => x.playerName === player);
        return {
            istagged: p.isTagged,
            confirmed: p.confirmed 
        };
    }
   
    
    Save() {
        console.log('saving all game data');
        let data = JSON.stringify(this);
        fs.writeFileSync('gamedata.json', data);
    }
}
module.exports = GameData;