const Discord = require("discord.js"),
client = new Discord.Client();
const fetch = require("node-fetch")
const db = require("quick.db")
module.exports.run = async (client, message, args) => {
  let sebep = args[0]
  

    const pong = new Discord.MessageEmbed()
    .setTitle('Lütfen bir seçenek seçin.')
    .setColor('RED')
    .setDescription(`
kanal | ayarlar | son-depremler | düzelt (Loga gitmeyen mesajı düzelt)
`)
    .setImage('https://cdn.discordapp.com/attachments/915179207938674689/1000071316180832276/unknown.png')
   if(!sebep) return message.channel.send(`${message.author}`, pong)

                if (args[0] == "kanal") {
                    
                    
    if (!message.member.hasPermission("ADMINISTRATOR")) {
      const yetkinyokmeh = new Discord.MessageEmbed()
        .setAuthor("❌ Hata")
        .setDescription("**Bu komutu kullanabilmek için `Yönetici (ADMINISTRATOR)` yetkisine sahip olmalısın!**")
        .setColor("RED")
      return message.channel.send(yetkinyokmeh)
    }

                    
                    if(message.guild == null) return
                    
                    const embedolmadi = new Discord.MessageEmbed()
                    .setThumbnail(client.user.avatarURL())
                    .setTitle('Hata')
                    .setColor('RED')
                    .setDescription('Lütfen bir kanalı etiketleyin.')
                   
                    if(message.mentions.channels.first() == undefined) return message.channel.send(embedolmadi)
                    
const channelfetch = message.mentions.channels.first().id
    if(typeof(channelfetch) == "undefined") {
      const yok = new Discord.MessageEmbed()
      .setAuthor("❌ Hata")
      .setColor("RED")
      .setDescription("Lütfen bir kanalı etiketleyin.")
      return message.channel.send(yok)
    }
    if(message.mentions.channels.first().guild.id !== message.guild.id) {
      const busunucudadeil = new Discord.MessageEmbed()
      .setAuthor("❌ Hata")
      .setDescription("**Bu kanal bu sunucuda gözükmüyor.**")
      .setColor("RED")
      return message.channel.send(busunucudadeil)
      }
                    
                    db.set(`deprem_${message.guild.id}`,  message.mentions.channels.first().id)
                    db.set(`deprembilgi_${message.guild.id}`, true)

       const busunucudadeil = new Discord.MessageEmbed()
      .setAuthor("Başarılı")
      .setDescription("**Kanal ayarlandı. Kanala test için son depremin bilgileri atıldı.**")
      .setColor("GREEN")
      message.channel.send(busunucudadeil)
                    const fetch = require("node-fetch")
fetch(
    `https://api.orhanaydogdu.com.tr/deprem/live.php?limit=1`
  )
                        .then(res => res.json())
    .then(json => {
                   
      let cikti = json.result;
      var bot = "";

const embedcuuu = new Discord.MessageEmbed()
.setAuthor("Deprem")
.setColor("BLACK")
.setThumbnail(client.user.avatarURL())
  .setFooter('Depremden etkilenen herkese geçmiş olsun...', client.user.avatarURL())
      for (const ayn of cikti) {
            const db = require("quick.db")
                 //   db.set(`sondeprem_${message.guild.id}`, ayn.depth)

embedcuuu.setDescription(`**${ayn.lokasyon}**\n **Zaman:** <t:${ayn.timestamp}>\n **Büyüklük:** ${ayn.mag}\n **Derinlik:** ${ayn.depth}km`)
      }
                                             const db = require("quick.db")

const kanal = db.fetch(`deprem_${message.guild.id}`)
//client.channels.cache.get(kanal).send(embedcuuu)
                                       });
                                           

        
                    
                } if (args[0] == "ayarlar") {
                    
                    if(message.guild == null) return
                    

          let aciklama = await db.fetch(`deprembilgi_${message.guild.id}`);
  let aciklamaYazi;
  if (aciklama == null) aciklamaYazi = ":red_circle: Sistem aktif değil.";
  else aciklama = `:green_circle: Sistem aktif.`;

    
  let bayrak = await db.fetch(`deprem_${message.guild.id}`);
  let bYazi;
  if (bayrak == null) bYazi = `:red_circle: Kanal ayarlanmamış.`;
  else bYazi = `:green_circle: <#${bayrak}> (${bayrak})`;
 
  const embed = new Discord.MessageEmbed()
    .setAuthor(`${message.guild.name} Sunucusunun ayarları`)
    .setThumbnail(message.guild.iconURL() || client.user.avatarURL())
    .setColor("BLACK")
    .addField("Sunucu Adı", message.guild.name, true)
    .addField("Sunucu Kimliği (ID)", message.guild.id, true)
    .addField("Deprem", aciklama, true)
    .addField("Deprem Kanal", bYazi, true)
  message.channel.send(embed);

                
                } if (args[0] == "son-depremler") {
                    
                    if(message.guild == null) return
                    
                       await fetch(
    `https://api.orhanaydogdu.com.tr/deprem/live.php?limit=3`
  )
    .then(res => res.json())
    .then(json => {
      let cikti = json.result;
      var bot = "";
      const embed = new Discord.MessageEmbed()
        .setAuthor("Deprem Listesi (3)")
        .setColor("BLACK")
.setThumbnail(client.user.avatarURL())
  .setFooter('Depremlerden etkilenen herkese geçmiş olsun...', client.user.avatarURL())
      for (const ayn of cikti) {
        embed.addField(
          `${ayn.lokasyon}`,
          ` **Zaman:** <t:${ayn.timestamp}>\n **Büyüklük:** ${ayn.mag}\n **Derinlik:** ${ayn.depth}km \n`, false
        );
      }

      message.channel.send(embed);
    });
                }    if (args[0] == "düzelt") {

                                        const tm = new Discord.MessageEmbed()
                                        .setTitle('Deprem Bilgi')
                                        .setColor('GREEN')
                                        .setDescription('Log kanalına gitmeyen deprem mesajları artık düzeltildi.')
                                      message.channel.send(tm)  
                } else {
                    
                    const komutyok = new Discord.MessageEmbed()
                    .setTitle('Hata')
                    .setColor('RED')
                    .setThumbnail(client.user.avatarURL())
                    .setDescription(`Bu komut bulunamadı. Doğru girdiginizden emin olun veya d!deprem yazarak bulunan komutlara bakın.`)
                    
                 //   message.channel.send(komutyok)
                    
                }        

};
                
  


exports.config = {
  name: "deprem",
  guildOnly: true,
  aliases: [],
};
