const TournamentManager = require('./src/TournamentManager')
const {User} = require('./src/Models')
createTestUsers = (n)=>{
    var users = []
    for (let index = 0; index < n; index++) {
        users.push(new User('123', index.toString(), '123'))
    }
    return users
}
testAddingPlayers = ()=>{
    var tm = new TournamentManager()
    tm.addPlayers(createTestUsers(10))
    var ret = tm.createTeams()
    console.log(ret)
    return ret.length==0
}

testAddingPlayersCut = ()=>{
    var tm = new TournamentManager()
    tm.addPlayers(createTestUsers(13))
    var ret = tm.createTeams()
    console.log(ret)
    return ret.length==3 && ret[0].name === '10' && ret[1].name === '11' && ret[2].name === '12'
}

tests = [[testAddingPlayers,'testAddingPlayers'],[testAddingPlayersCut, 'testAddingPlayersCut']]
passed = 0
failed = 0
for (const test of tests) {
    console.log(`---------${test[1]} started---------`)
    res = test[0]()
    if (res){
        console.log(`!--------${test[1]} passed--------!\n`)
        passed+=1
    }
    else{
        console.log(`!--------${test[1]} failed--------!\n`)
        failed+=1
    }
}

console.log(`${passed} passed. ${failed} failed.`)