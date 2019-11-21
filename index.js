const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  var startCommand = '!start'
  if (msg.content.startsWith === startCommand && (msg.member.roles.find(r => r.name === "Admin")) || msg.author.id === msg.guild.ownerID) {
    content = ("Welcome to all members of the UOttawa League Club.\n"+
    "This marks the start of the weekly custom game next sunday.\n"+
    "If you would like to join, react with 👍.")
    var args = msg.content.slice(startCommand.length).split(' ').slice(1);
    console.log(args)
    if (args.length===0){
      console.log('No args')
      return 
    }
    msg.channel.send(content).then(sentMessage =>{
      sentMessage.react('👍')
      const filter = (reaction) => reaction.emoji.name === '👍'
      var time = args[args.length-1].split(':')
      args = args.slice(0,3)
      args[1] = parseInt(args[1]-1,10).toString()
      args.push(...time)
      tourneyStart = new Date(...args)
      console.log(tourneyStart)
      console.log(tourneyStart-Date.now())
      sentMessage.awaitReactions(filter, { time: tourneyStart-Date.now() })
        .then(collected => {console.log(`Collected ${collected.size} reactions`)})
        .catch(console.error);
    })
  }
});

client.login("NjQ1MzIyODMyNjMyMzQ4NzAy.XdatxQ.M8cweitqCnKP9KSXGEqKcavliLc");