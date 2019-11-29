
class TournamentManager{
    constructor(){
        this.players = []
    }
    addPlayers(players){
        this.players.push(...players)
    }
    createTeams(){
        var remainder = this.players.length%5
        var cutPlayers = []
        if (remainder != 0){
            var cutPlayers = this.players.slice(this.players.length-remainder)
            this.players = this.players.slice(0,this.players.length-remainder)
        }
        return cutPlayers
    }
}

module.exports = TournamentManager