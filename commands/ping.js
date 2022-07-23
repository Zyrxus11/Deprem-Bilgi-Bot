const Discord = require("discord.js"),
client = new Discord.Client();

module.exports.run = async (client, message, args) => {
    const embed = new Discord.MessageEmbed()
    .setTitle('Pong 🏓')
    .setThumbnail(client.user.avatarURL())
    .setAuthor('Deprem Bilgi', client.user.avatarURL())
    .setDescription(`Ping : ${client.ws.ping}`)
    
message.channel.send(embed)
};

exports.config = {
  name: "ping",
  guildOnly: true,
  aliases: [],
};
