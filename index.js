const express = require('express');
const app = express();
// set the port of our app
// process.env.PORT lets the port be set by Heroku
const port = process.env.PORT || 5000;
//set the view engine to ejs
app.set('view engine','ejs');
//make express look in the 'public' directory for assets
app.use(express.static(__dirname + '/public'));

app.get('/',(request, response) => {
    response.render('index');
});
app.listen(port, () => {
    console.log('our app is running on http://localhost:' + port);
}); 
// pings server every 15 minutes to prevent dynos from sleeping
setInterval(() => {
    http.get('https://discord-bot-wenyue.herokuapp.com/');
  }, 900000);

const fs = require('fs');
const {prefix, token} = require('./config.json');
const Discord = require('discord.js');
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
bot.uniq_commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands');
const uniq_commandsFiles = fs.readdirSync('./uniq_commands');

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}


for(const file of uniq_commandsFiles) {
    const uniq_command = require(`./uniq_commands/${file}`);
    bot.uniq_commands.set(uniq_command.name, uniq_command)
}


bot.on('message', msg => {
    if (!msg.content.startsWith(prefix) && !msg.author.bot) {
        upcase = msg.content.toLowerCase()
        if(upcase.includes('random_nric')) {
            bot.uniq_commands.get('random_nric').execute(msg);
        }
        else if(upcase.includes('p.pokemon')) {
            bot.uniq_commands.get('p.pokemon').execute(msg);
        }
        else if(upcase.includes('legit') && upcase.includes('is')) {
            bot.uniq_commands.get('legit').execute(msg)
        }
        else if(upcase == "info") {
            msg.send("Running on Heroku created by Wenyue\nNode version: v8.9.3\nnpm: v5.5.1");
        }
    };

    if(msg.author.bot) return;

    const args = msg.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();
    
    if (!bot.commands.has(command)) return;

    try {
        bot.commands.get(command).execute(msg, args);
    }
    catch (error) {
        console.error(error);
        msg.reply('there was an error trying to execute that command!');
    }

});


bot.on('ready', () => {
    x = 1
    console.log('Welcome my master...');

    bot.user.setActivity("~Your Mum~");
});

bot.login(`${token}`);

