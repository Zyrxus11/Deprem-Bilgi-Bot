const Discord = require("discord.js"),
client = new Discord.Client();
const fetch = require("node-fetch")
const db = require("../db/model/deprem.js")
require("../yanıt.js")
module.exports.run = async (client, message, args) => {

   let deprembilgibyweasley = args[0]
    const deprembilgi = new Discord.MessageEmbed()
    .setTitle('❌Lütfen bir seçenek seçin.')
    .setColor('BLACK')
    .setDescription(`
kanal | ayarlar | son-depremler | sıfırla | aç | kapat
`)
    .setImage('https://cdn.discordapp.com/attachments/915179207938674689/1000071316180832276/unknown.png')
   if(!deprembilgibyweasley) return message.weasleyYanıt2({embed:deprembilgi})

  /*if(args[0] == "otomatik-kur") {
    if(message.guild == null) return message.channel.send({content:'Bu komut sadece sunucularda kullanılabilir.'})
    if (!message.member.hasPermission("ADMINISTRATOR")) {
        const yetkinyokmeh = new Discord.MessageEmbed()
          .setAuthor("❌ Hata")
          .setDescription("**Bu komutu kullanabilmek için `Yönetici (ADMINISTRATOR)` yetkisine sahip olmalısın!**")
          .setColor("RED")
        return message.channel.send({embed:yetkinyokmeh})
    }
    const depremsistemi = await db.fetch(`deprem`);
    if(!depremsistemi.find(a => a.sunucu === message.guild.id)) {

      const embed = new Discord.MessageEmbed()
      .setTitle('Emin misin?')
      .setDescription(`
Otomatik kurulum komutunun sunucuda yapabileceği değişiklikler => 
\`=>\` **Kanal Oluşturma**
\`=>\` **Kategori Oluşturma**
\`=>\` **Kanalları Yönetme**
Bu bilgilere göre bota yetki vermeyi unutmayınız. Aksi taktirde otomatik kurulum tamamen gerçekleştirilemeyebilir.
**Kabul ediyorsanız ✅ butonuna tıklayın.**
      `)

      let buton = new MessageButton()
      .setStyle('green')
      .setLabel('✅')
      .setID(`kabul${message.author.id}${message.guild.id}`);
      let buton2 = new MessageButton()
      .setStyle('green')
      .setLabel('✅')
      .setID(`disabledkabul${message.author.id}${message.guild.id}`)
      .setDisabled(true);
message.channel.send({ embed:embed , buttons: [ buton ] }).then(async msg => {
  setTimeout(() => {
    msg.edit({content:'❌ Artık butonlara tıklanamaz.', buttons: [ buton2 ]})
  }, 20000);
  const filter = (button) => button.clicker.user.id === message.author.id;
      const collector = await msg.createButtonCollector(filter, { time: 60000 });
      collector.on('collect', async b => {
    if(b.id === `kabul${message.author.id}${message.guild.id}`) {

      msg.edit({embed:embed,content:"Kurulum gerçekleştiriliyor.",buttons:[buton2]})
try {
      message.guild.channels.create(`deprem-bilgi`,{
        permissionOverwrites: [
          {
          id: message.guild.roles.everyone,  
          deny: ['SEND_MESSAGES']
          }        
        ]}).then(channel => {

          channel.send({content: "⚫ Bu kanal deprem bilgi kanalı olarak ayarlandı."})

          db.push(`deprem`,{ kanal: channel.id, sunucu: message.guild.id })
          db.set(`deprembilgi_${message.guild.id}`, true)
          db.set(`depremkanal_${message.guild.id}`,channel.id) 

          msg.edit({embed:new Discord.MessageEmbed().setColor('GREEN').setTitle('✅ Kurulum tamamlandı.').setDescription(`Kurulum tamamlandı!
          Deprem Bilgi kanalı : ${channel}`),content:"Kurulum tamamlandı."})

        })

      } catch(err) {
        console.log(err)
        return msg.edit({content: "Kurulum başarısız.",embed: new Discord.MessageEmbed().setColor('RED').setDescription(`Kurulum yapılırken bir hata oluştu.`).setTitle('❌ Kurulum başarısız.')})
      }
    };
        
    });
  })

    } else {
      message.channel.send({embed:new Discord.MessageEmbed().setTitle("❌ Hata").setColor('RED').setDescription(`Bu sunucu üzerinde önceden bir ayarlama yapılmış gibi gözüküyor. Bu yüzden bu sunucu üzerinde otomatik kurulum kullanılamaz.`)})
    }


  }*/
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
.setFooter("Made by LOX | Weasley#2429", client.user.avatarURL())
message.channel.send({embed:embed});

}

if(args[0] == "son-depremler") {
    try {               
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
