
class TournamentManager{
    constructor(){
        this.players = []
        this.teams = []
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
        
        for (let index = 0; index < this.players.length/5; index++) {
            this.teams.push(this.players.slice(index*5,(index+1)*5))
        }
        var temp = []
        cutPlayers.forEach(player => {
            temp.push(player.name)
        });
        return temp
    }

    formattedTeams(){
        var teamStr = ""
        var index = 0
        this.teams.forEach(team=>{
            if (index !== 0){
                teamStr+="\n"
            }
            index+=1
            teamStr += "Team " + index.toString() + ":\n"
            team.forEach(player => {
                teamStr += player.name + "\n"
            });
        });
        return teamStr
    }
    reset(){
        this.players = []
        this.teams = []
    }
}

module.exports = TournamentManager