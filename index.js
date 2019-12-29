const {User} = require('./src/Models')
const Discord = require('discord.js');
const client = new Discord.Client();
const TournamentManager = require('./src/TournamentManager')
const token = require('./token')

const tm = new TournamentManager()
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
const createTestUsers = (n)=>{
  var users = []
  for (let index = 0; index < n; index++) {
      users.push(new User("ID"+index.toString(), "Name"+index.toString(), '123'))
  }
  return users
}
const startCommand = (args, msg)=>{
  var content = ("Welcome to all members of the UOttawa League Club.\n"+
  "This marks the start of the weekly custom game next sunday.\n"+
  "If you would like to join, react with 👍.")
  
  var userArr = []
  msg.channel.send(content).then(sentMessage =>{
    sentMessage.react('👍')
    const filter = (reaction) => reaction.emoji.name === '👍'
    //CHANGE FOR PRODUCTION
    // var time = args[args.length-1].split(':')
    // var tempArgs = args
    // tempArgs = tempArgs.slice(0,3)
    // tempArgs[1] = parseInt(tempArgs[1]-1,10).toString()
    // tempArgs.push(...time)
    // tourneyStart = new Date(...tempArgs)
    // console.log(tourneyStart)
    // console.log(tourneyStart-Date.now())
    var tourneyStart = Date.now()+5000
    sentMessage.awaitReactions(filter, { time: tourneyStart-Date.now() })
      .then(collected => {
        console.log(`Collected ${collected.size} reactions`)
        var temp = collected.get('👍')
        // console.log(temp.users)
        for (const user of temp.users){
          if (user[0] == client.user.id){
            continue
          }
          var temp = new User(user[1].id, user[1].username, user[1].discriminator, user[1])
          userArr.push(temp)
        }
        console.log(userArr)
        tm.addPlayers(userArr)
        tm.addPlayers(createTestUsers(12)) //CHANGE FOR PRODUCTION
        var cutPlayers = tm.createTeams()
        msg.channel.send("Tournament entry is now closed.\n"+
        `Sorry ${cutPlayers}, there weren't enough people to make another team.\n`+
        "Here are the teams:")
        msg.channel.send(tm.formattedTeams())
        var server = msg.guild;
        var index = 1
        tm.teams.slice(0,1).forEach(team=>{//CHANGE FOR PRODUCTION
          var teamName = "Team " + index.toString()

          server.createRole({
            name: teamName,
          }).then(role=>{
            server.createChannel(teamName, "voice").then(newChannel=>{
              newChannel.overwritePermissions(server.roles.find('name', '@everyone'),{
                'CREATE_INSTANT_INVITE' : false,
                'VIEW_CHANNEL': false,
                'CONNECT': false,
                'SPEAK': false
              });
              newChannel.overwritePermissions(role,{
                'VIEW_CHANNEL': true,
                'CONNECT': true,
                'SPEAK': true
              });
            });
  
            server.createChannel(teamName, "text").then(newChannel=>{
              newChannel.overwritePermissions(server.roles.find('name', '@everyone'),{
                'CREATE_INSTANT_INVITE' : false,
                'VIEW_CHANNEL': false,
                'SEND_MESSAGES': false
              });
              newChannel.overwritePermissions(role,{
                'VIEW_CHANNEL': true,
                'SEND_MESSAGES': true
              });
            });
            team.slice(0,1).forEach(player => {//CHANGE FOR PRODUCTION
              server.fetchMember(player.user).then(member =>{
                member.addRole(role)
              })
            });
          })
        })
    })
      .catch(console.error);
  })
}

const tournamentStartCommand = (args, msg) => {
  var time = args[args.length-1].split(':')
  var tempArgs = args
  tempArgs = tempArgs.slice(0,3)
  tempArgs[1] = parseInt(tempArgs[1]-1,10).toString()
  tempArgs.push(...time)
  tourneyStart = new Date(...tempArgs)
  console.log(tourneyStart)
  console.log(tourneyStart-Date.now())
  var content = (`The tournament will start on ${tourneyStart}.\n`)
  msg.channel.send(content)
}

const tournamentEndCommand = (args, msg) => {
  var content = ("The tournament has ended!")
  msg.channel.send(content)
  var server = msg.guild
  for (let index = 1; index < 1+1; index++) {
    server.channels.find(r => r.name === `Team ${index}`).delete().catch(console.error)
    server.channels.find(r => r.name === `team-${index}`).delete().catch(console.error)
    server.roles.find(r => r.name == `Team ${index}`).delete().catch(console.error)
  }
  tm.reset()
}

const quitCommand = (args,msg) => {
  var team = tm.removePlayer(msg.author)
  var content = `${msg.author.username} has quit team ${team}.`
  msg.channel.send(content)
  msg.member.removeRole("Team"+team.toString())
}

client.on('message', msg => {
  var commands = []
  commands.push(['!start', startCommand])
  commands.push(['!startTournament', tournamentStartCommand])
  commands.push(['!endTournament', tournamentEndCommand])
  commands.push(['!quit', quitCommand])
  commands.forEach(command => {
    var commandStr = command[0]
    var commandFunc = command[1]
    if (msg.content.slice(0, commandStr.length) === commandStr && (msg.member.roles.find(r => r.name === "Admin") || msg.author.id === msg.guild.ownerID)) {
      var args = msg.content.slice(commandStr.length).split(' ').slice(1);
      console.log(args)
      if (args.length===0){
        console.log('No args')
        //return
      }
      commandFunc(args,msg)
    }
  });
});

client.login(token);