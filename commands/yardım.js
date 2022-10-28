const Discord = require("discord.js"),
client = new Discord.Client();
const db = require("quick.db")
module.exports.run = async (client, message, args) => {
    const embed = new Discord.MessageEmbed()
    .setTitle('Deprem Bilgi | Yardım Menüsü')
    .setThumbnail(client.user.avatarURL())
    .setColor("BLACK")
    .setFooter('Copyright © Executable Studio')
    .setAuthor('Deprem Bilgi', client.user.avatarURL())
    .setDescription(`

**d!yardım** \`=\` Yardım menüsünü gösterir.
**d!deprem** \`=\` Deprem Bilgi sistemi komutları.
**d!istatistik** \`=\` Bot istatistigi.
**d!ping** \`=\` Botun gecikme süresini gösterir.

Linkler \`=>\`
[Destek Sunucusu](https://discord.gg/EZ673nyaNj)
[Destekle (Oy ver)](https://top.gg/bot/1000057864980811878/votes)
[Destekle (Botu ekle)](https://discord.com/api/oauth2/authorize?client_id=1000057864980811878&permissions=8&scope=bot)

`)
    
message.channel.send(embed)
};

exports.config = {
  name: "yardım",
  guildOnly: true,
  aliases: [],
};
