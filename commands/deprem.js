const Discord = require("discord.js"),
client = new Discord.Client();
const fetch = require("node-fetch")
const db = require("../db/model/deprem.js")
require("../yanıt.js")
const { MessageButton, MessageActionRow } = require('discord-buttons');
module.exports.run = async (client, message, args) => {

   let deprembilgibyweasley = args[0]
    const deprembilgi = new Discord.MessageEmbed()
    .setTitle('❌Lütfen bir seçenek seçin.')
    .setColor('BLACK')
    .setDescription(`
kanal | ayarlar | son-depremler | sıfırla | aç | kapat | otomatik-kurulum
`)
    .setImage('https://cdn.discordapp.com/attachments/915179207938674689/1000071316180832276/unknown.png')
   if(!deprembilgibyweasley) return message.weasleyYanıt2({embed:deprembilgi})

  if(args[0] == "otomatik-kur") {

    if(message.guild == null) return message.channel.send({content:'Bu komut sadece sunucularda kullanılabilir.'})
    if (!message.member.hasPermission("ADMINISTRATOR")) {
        const yetkinyokmeh = new Discord.MessageEmbed()
          .setAuthor("❌ Hata")
          .setDescription("**Bu komutu kullanabilmek için `Yönetici (ADMINISTRATOR)` yetkisine sahip olmalısın!**")
          .setColor("RED")
        return message.channel.send({embed:yetkinyokmeh})
      }


    try {
    let a = await db.findOne({ sunucu: message.guild.id })

    if(a.status) return message.channel.send({content: "Deprem Bilgi sistemi zaten kurulmuş."})
    } catch {}
    

    let onaylıyorum = new MessageButton()
    .setStyle("green")
    .setLabel("✅")
    .setID(`onay${message.author.id}`);

  const embed = new Discord.MessageEmbed()
    .setAuthor(client.user.username,client.user.avatarURL())
    .setThumbnail(client.user.avatarURL())
    .setColor("#2f3136")
    .setTitle("Otomatik Kurulum")
    .setFooter(message.author.username,message.author.avatarURL())
    .setDescription(`
    
    **Deprem Bilgi sistemini otomatik kurmak istermisiniz?**

    **Bu işlemi onaylıyorsanız aşagıdaki butona basın.**
    **30 saniye içinde butona basılmazsa işlemi reddetmiş olursunuz.**
    **İşlemin düzgün ayarlanabilmesi için bota gerekli yetkileri verin.**    
    
    `)
    message.channel.send({embed:embed, buttons:[onaylıyorum]}).then(async msg => {
      const filter = (button) => button.clicker.user.id === message.author.id;
      const collector = await msg.createButtonCollector(filter, { time: 60000 });
      setTimeout(() => {

                let deaktif = new MessageButton()
      .setStyle('red')
      .setLabel(`Mesaj aktif değil`)
                .setDisabled(true)
      .setID(`maalesefmesaj`);
          
    
    msg.edit({ content:"🔴 Mesaj deaktif.", buttons: [deaktif]})
    
}, 60000)        

  collector.on("collect", async b => {
    if(b.clicker.user.id != message.author.id) return

    if(b.id === `onay${message.author.id}`) {
      let kanalad = "deprem-bilgi"
      message.guild.channels.create(kanalad,{
        permissionOverwrites: [
        {
          id: message.guild.roles.everyone, 
          allow: ['VIEW_CHANNEL'],
          deny: ["SEND_MESSAGES"]
        }
     ]}).then(kanal => {

      new db({ kanal:kanal.id, sunucu:message.guild.id, status:true, channel:true }).save()
      let deaktif2 = new MessageButton()
      .setStyle('green')
      .setLabel(`Otomatik Kurulum Gerçekleşti.`)
                .setDisabled(true)
      .setID(`tmoldu`);

      msg.edit({content: "Otomatik kurulum başarılı bir şekilde gerçekleştirildi!", buttons:[deaktif2]})

      kanal.send({content:"Bu kanal deprem bilgi kanalı olarak ayarlandı. (Otomatik Kurulum)"})
     })

    }
  })

    })
  }


  const weasley = new Discord.MessageEmbed()
.setAuthor(client.user.username,client.user.avatarURL())
.setColor("#2f3136")


if(args[0] == "kanal") {
    if(message.guild == null) return message.channel.send({content:'Bu komut sadece sunucularda kullanılabilir.'})
    if (!message.member.hasPermission("ADMINISTRATOR")) {
        const yetkinyokmeh = new Discord.MessageEmbed()
          .setAuthor("❌ Hata")
          .setDescription("**Bu komutu kullanabilmek için `Yönetici (ADMINISTRATOR)` yetkisine sahip olmalısın!**")
          .setColor("RED")
        return message.channel.send({embed:yetkinyokmeh})
      }

                          
                    
      const channelfetch = message.mentions.channels.first().id
     
      if(message.mentions.channels.first() == undefined) return message.channel.send({embed:weasley.setDescription(`❌ **Lütfen bir kanal etiketleyin**`)})
      if(typeof(channelfetch) == "undefined") return message.channel.send({embed:weasley.setDescription(`❌ **Lütfen düzgün bir kanal etiketleyin**`)})
      if(message.mentions.channels.first().guild.id !== message.guild.id) return message.channel.send({embed:weasley.setDescription(`❌ **Bu kanal bu sunucuda gözükmüyor!**`)})
try {
        let a = await db.findOne({ sunucu:message.guild.id })
        if(message.mentions.channels.first().id === a.kanal || "YOK") {
          const embed = new Discord.MessageEmbed()
          .setAuthor(client.user.username,client.user.avatarURL())
          .setColor('BLACK')
          .setDescription(`**Zaten bu kanal deprem bilgi kanalı olarak ayarlı.** Bunun bir hata oldugunu düşünüyorsan [destek sunucusuna](https://discord.gg/EZ673nyaNj) katılarak bize ulaşabilirsin.`)
          return message.channel.send({embed:embed})

        }
      } catch(err) {
        console.log(err)
      }
      
    
        await db.findOneAndDelete({ sunucu:message.guild.id })

    client.channels.cache.get(message.mentions.channels.first().id).send({content: "Bu kanal deprem bilgi kanalı olarak ayarlandı"})

        new db({ kanal:message.mentions.channels.first().id, sunucu:message.guild.id, status:true, channel:true }).save()

        const busunucudadeil = new Discord.MessageEmbed()
        .setAuthor("Başarılı")
        .setDescription("**Kanal ayarlandı.**")
        .setColor("GREEN")
        message.channel.send({embed:busunucudadeil})
}


if(args[0] == "kapat") {
  if(message.guild == null) return message.channel.send({content:'Bu komut sadece sunucularda kullanılabilir.'})
  if (!message.member.hasPermission("ADMINISTRATOR")) {
        const yetkinyokmeh = new Discord.MessageEmbed()
          .setAuthor("❌ Hata")
          .setDescription("**Bu komutu kullanabilmek için `Yönetici (ADMINISTRATOR)` yetkisine sahip olmalısın!**")
          .setColor("RED")
        return message.channel.send({embed:yetkinyokmeh})

    }
 try {
    let a = await db.findOne({ sunucu: message.guild.id })

    if(a.status === false) return message.channel.send({content: "Deprem Bilgi sistemi zaten kapalı."})

    await db.findOneAndUpdate({ sunucu: message.guild.id, status:false })
 } catch(err) {
  console.log(err)
  return message.channel.send({embed:
  
    new Discord.MessageEmbed()
    .setAuthor(client.user.username,client.user.avatarURL())
    .setColor("#2f3136")
    .setDescription(`**${message.guild.name} sunucusunun Deprem Bilgi sistemi kapatılamadı.**`)
  
  })

 }
    message.channel.send({embed:weasley.setDescription(`**✅ Deprem Bilgi sistemi ${message.guild.name} sunucusunda kapatıldı.**`)})

}

if(args[0] == "aç") {
  if(message.guild == null) return message.channel.send({content:'Bu komut sadece sunucularda kullanılabilir.'})
  if (!message.member.hasPermission("ADMINISTRATOR")) {
        const yetkinyokmeh = new Discord.MessageEmbed()
          .setAuthor("❌ Hata")
          .setDescription("**Bu komutu kullanabilmek için `Yönetici (ADMINISTRATOR)` yetkisine sahip olmalısın!**")
          .setColor("RED")
        return message.channel.send({embed:yetkinyokmeh})

    }
    try {

    let a = await db.findOne({ sunucu: message.guild.id })

    if(a.status === true) return message.channel.send({content: "Deprem Bilgi sistemi zaten aktif."})

    await db.findOneAndUpdate({ sunucu: message.guild.id, status:true })
    } catch(err) {
      console.log(err)
      return message.channel.send({embed:
  
        new Discord.MessageEmbed()
        .setAuthor(client.user.username,client.user.avatarURL())
        .setColor("#2f3136")
        .setDescription(`**${message.guild.name} sunucusunun Deprem Bilgi sistemi aktif edilemedi.**`)
      
      })
    
    }
    message.channel.send({embed:weasley.setDescription(`**✅ Deprem Bilgi sistemi ${message.guild.name} sunucusunda aktif edildi.**`)})

}

if(args[0] === "sıfırla") {
  if (!message.member.hasPermission("ADMINISTRATOR")) {
    const yetkinyokmeh = new Discord.MessageEmbed()
      .setAuthor("❌ Hata")
      .setDescription("**Bu komutu kullanabilmek için `Yönetici (ADMINISTRATOR)` yetkisine sahip olmalısın!**")
      .setColor("RED")
    return message.channel.send({embed:yetkinyokmeh})

}
 
let db = require("../db/model/deprem.js")
try {
  eval(await db.deleteOne({ sunucu:message.guild.id }))
} catch(err) {
  console.log(err)
  return message.channel.send({embed:
  
    new Discord.MessageEmbed()
    .setAuthor(client.user.username,client.user.avatarURL())
    .setColor("#2f3136")
    .setDescription(`**${message.guild.name} sunucusunun Deprem Bilgi sistemi sıfırlanamadı.**`)
  
  })

}
  message.channel.send({embed:
  
    new Discord.MessageEmbed()
    .setAuthor(client.user.username,client.user.avatarURL())
    .setColor("#2f3136")
    .setDescription(`**${message.guild.name} sunucusunun Deprem Bilgi sistemi başarıyla sıfırlandı.**`)
  
  })

}





if(args[0] == "ayarlar") {
    if(message.guild == null) return message.channel.send({content:'Bu komut sadece sunucularda kullanılabilir.'})
                    
let x = await db.findOne({ sunucu: message.guild.id });

let weasleykanal;
if (x == null) weasleykanal = "**🔴 Kanal ayarlanmamış.**";
else weasleykanal = `✅ **Kanal ayarlı.** (<#${x.kanal}>)`;

let weasleydurum;
if (x == null || x.status == "false") weasleydurum = "**🔴 Sistem aktif değil.**";
else weasleydurum = `✅ **Sistem aktif.**`;


const embed = new Discord.MessageEmbed()
.setAuthor(`${message.guild.name} | Deprem Bilgi Sistemi`)
.setThumbnail(message.guild.iconURL() || client.user.avatarURL())
.setColor("#2f3136")
.addField("📖 Sunucu Adı", message.guild.name, false)
.addField("🎟 Sunucu Kimliği (ID)", message.guild.id, false)
.addField("🔨 Deprem Sistemi Durumu", weasleydurum, true)
.addField("🍁 Deprem Kanal", weasleykanal, true)
.setFooter("Made by Weasley#0571", client.user.avatarURL())
message.channel.send({embed:embed});

}

if(args[0] == "son-depremler") {
  let kac = args[1] || 3
  if(kac > 21) return message.channel.send(":x: **| En fazla 20 tane deprem görüntüleyebilirsiniz.**")
    try {               
    await fetch(
`https://api.orhanaydogdu.com.tr/deprem/live.php?limit=${kac}`
)
.then(res => res.json())
.then(json => {
let cikti = json.result;
var bot = "";
const embed = new Discord.MessageEmbed()
.setAuthor(`Deprem Listesi (${kac})`)
.setColor("BLACK")
.setThumbnail(client.user.avatarURL())
.setFooter('Depremlerden etkilenen herkese geçmiş olsun...', client.user.avatarURL())
for (const ayn of cikti) {
embed.addField(
`${ayn.lokasyon}`,
` **Zaman:** <t:${ayn.timestamp}> (<t:${ayn.timestamp}:R>)\n **Büyüklük:** ${ayn.mag}\n **Derinlik:** ${ayn.depth}km \n`, false
);
}

message.channel.send({embed:embed});

});
} catch(err) {
    console.log(err)
    return message.channe.send('Hata oluştu.')
}


}

if(args[0] === "minimum" || args[0] === "min") {

  let sayı = args[1]
  if(!sayı) return

// bitmedi.
  
}
}



exports.config = {
  name: "deprem",
  guildOnly: true,
  aliases: [],
};
