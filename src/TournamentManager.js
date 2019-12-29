
class TournamentManager{
    constructor(){
        this.players = []
        this.teams = []
        this.waitlist = []
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

    removePlayer(playerToR){
        for (let index = 0; index < this.players.length; index++) {
            if (this.players[index].user===playerToR){
                this.players.splice(index,1)
                break
            }
        }
        var teamNum = 0
        var flag = false
        this.teams.forEach(team => {
            if (flag === false){
                for (let index = 0; index < team.length; index++) {
                    if (team[index].user===playerToR){
                        team.splice(index,1)
                        flag = true
                        break
                    }
                }
                teamNum+=1
            }
        });
        return teamNum
    }
    reset(){
        this.players = []
        this.teams = []
        this.waitlist = []
    }
}

module.exports = TournamentManager