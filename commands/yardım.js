const Discord = require("discord.js"),
client = new Discord.Client();

module.exports.run = async (client, message, args) => {
    const embed = new Discord.MessageEmbed()
    .setTitle('Deprem Bilgi | Yardım Menüsü')
    .setThumbnail(client.user.avatarURL())
    .setAuthor('Deprem Bilgi', client.user.avatarURL())
    .setDescription(`

\`d!yardım\` **=** Deprem Bilgi botunun yardım menüsünü gösterir.
\`d!deprem\` **=** Deprem Bilgi ayarlarını yaparsınız.
\`d!istatistik\` **=** Botun istatistiklerini gösterir.
\`d!ping\` **=** Gecikme süresini gösterir.
`)
    
message.channel.send(embed)
};

exports.config = {
  name: "yardım",
  guildOnly: true,
  aliases: [],
};
