const config = require('../config.js');
const Discord = require("discord.js")
const client = new Discord.Client()
require("../yanıt.js")
module.exports = message => {
  let client = message.client;
  if (message.author.bot) return;
  if (!message.content.startsWith(config.prefix)) return;
  let command = message.content.split(' ')[0].slice(config.prefix.length);
  let params = message.content.split(' ').slice(1);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  };
  if (cmd) {
    if(!message.guild) {
      if(cmd.config.guildOnly === true) {
        return;
      };
    };

    var mongo = require("mongoose")

    if(mongo.connection.readyState != 1) {
      console.log("[BOT] MongoDB ile bağlı olmadan komutlar kullanılamaz. Bağlantıyı kontrol edin.")
      const embed = new Discord.MessageEmbed()
      .setAuthor(client.user.username,client.user.avatarURL())
      .setThumbnail(client.user.avatarURL())
      .setColor("#2f3136")
      .setDescription(`**Sistem Database'e bağlı değil.\n Lütfen bir kaç dakika içinde tekrar deneyin.\n ERROR: Database Status is ${mongo.connection.readyState}**`)
      return message.weasleyYanıt2({embed:embed})
    }
    cmd.run(client, message, params);
};
};
