const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong');
  }
});

client.login("NjQ1MzIyODMyNjMyMzQ4NzAy.XdIpAw.SjfJE6GY7qnb0Gw6lKhB0T8Sp4I");