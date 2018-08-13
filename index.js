
const Discord = require('discord.js');
const client = new Discord.Client();
const snekfetch = require('snekfetch');
const translate = require('google-translate-api');

const prefix = '->';

client.on('ready', () => {
  console.log(`${client.user.username} is Ready!`);
  client.user.setStatus('available')
    client.user.setPresence({
        game: {
            name: 'with MD',
            type: "STREAMING",
            url: "https://www.twitch.tv/#"
        }
    });
});

client.on('message', async message => {

  let args = message.content.slice(prefix.length).trim().split(' ');
  let command = args.shift().toLowerCase();

  if (command === "ping") {
		message.channel.send(`Pong! Time took: ${Date.now() - message.createdTimestamp} ms`);
	} else

  if(command === 'say') {

    let say = args.join(' '); //space
    message.delete(); // deletes the content
    message.channel.send(say);
  }

  if(command === 'delete') {
    if(isNaN(args[0])) return message.channel.send('Please Enter the after after the Command to delete the number of messages!');
    if(args[0] > 100) return message.channel.send('Enter a amount less than 100!');

    message.channel.bulkDelete(args[0])
  }

  if(command === 'avatar') {
    let msg = await message.channel.send("Loading Avatar...");
    msg.delete();
    let user = message.mentions.users.first() || message.author; //mention to get avatar

    //avatar embed
    let embed = new Discord.RichEmbed() //new embed
    .setAuthor(`${user.username}`)
    .setImage(user.displayAvatarURL)
    .setColor('RANDOM') //it will generate ransom colors 
    
    //Finally send the avatar
    message.channel.send(embed)
  }

  if (command === 'cat') {
    let msg = await message.channel.send("Loading Cat...");
    msg.delete();
    let user = message.mentions.users.first() || message.author;
    const { body } = await snekfetch.get('https://aws.random.cat/meow');
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('Meow :cat:')
    .setImage(body.file)
    .setFooter(`Requested By ${user.username}`)

		message.channel.send({embed});
  }

  if (command === 'dog') {
    let msg = await message.channel.send("Loading Dog...");
    msg.delete();
    let user = message.mentions.users.first() || message.author;
    const { body } = await snekfetch.get('https://dog.ceo/api/breeds/image/random');
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('Dog :dog:')
    .setImage(body.image)
    .setImage(body.message)
    .setFooter(`Requested By ${user.username}`)

		message.channel.send({embed});
  }

  if(command === 'slap') {
    let ruser = message.guild.member(message.mentions.users.first() || message.guild.memebers.get(args[0]));
    let user = message.mentions.users.first() || message.author;
    message.channel.send(`${ruser} you have been Slapped By ${message.author}`)
    s1 = "./images/slap1.gif"; s2 = "./images/slap2.gif"; s3 = "./images/slap3.gif"; s4 = "./images/slap4.gif"; s5 = "./images/slap5.gif";
    number = 3;
    var random = Math.floor (Math.random() * (number - 1 + 1)) +1;
    switch (random) {
      case 1: message.channel.send ({ files: [s1] }); break;
      case 2: message.channel.send ({ files: [s2] }); break;
      case 3: message.channel.send ({ files: [s3] }); break;
      case 4: message.channel.send ({ files: [s4] }); break;
      case 5: message.channel.send ({ files: [s5] }); break;
    }
  }

  /*if (command === "announcement") {
    if (message.member.hasPermission("ADMINISTRATOR")) {
      const color = args[0]
       
      const text = args.slice(1).join(" ");
      if (text.length < 1) return message.channel.send("Can not announce nothing");
      //const colour = args.slice(2).join("");
      const embed = new Discord.RichEmbed()
      .setColor("0x" + color)
      .setTitle("Important Announcement:")
      .setDescription(text);
      message.channel.send("@everyone")
      message.channel.send({embed})
    }
  }*/

  const text = args.join(' ');
  if(command === 'translate') {

    await translate(text, {to: "en"}).then(res => {
      const embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setDescription(`**Before:**\n${text}\n\n**After:**\n${res.text}`);
      message.channel.send({embed})

    }).catch(error => { 
    console.error(error);
    });
  }

  if(command === 'report') {
    let ruser = message.guild.member(message.mentions.users.first() || message.guild.memebers.get(args[0]));
    if(!ruser) return message.channel.send("Coudn't find user.");
    let reason = args.join(" ").slice(22);
    let user = message.mentions.users.first() || message.author;

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Reports")
    .setColor("RANDOM")
    .addField("Reported User",`${ruser} with ID: ${ruser.id}`)
    .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
    .addField("Channel", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", reason)
    .setFooter(`Command used by ${user.username}`);


    let reportschannel = message.guild.channels.find(`name`,"reports");
    if(!reportschannel) return message.channel.send("Coudn't find reports channel");

        message.delete().catch(O_o=>{});
        reportschannel.send(reportEmbed);
        
    return;
  }

});


client.login('NDczNDI5NjAzOTc3Nzg5NDUw.Dk7_Vg.mgR4_vH5hDdIhWNhIa7JDJ4TZ_c');
