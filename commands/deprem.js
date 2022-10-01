const Discord = require("discord.js"),
client = new Discord.Client();
const fetch = require("node-fetch")
const db = require("quick.db")
module.exports.run = async (client, message, args) => {
     const DBL = require('dblapi.js')
 const dbl = new DBL('dbltoken', client)
  dbl.hasVoted(message.author.id).then(async voted => {
    if(voted) {

   let deprembilgibyweasley = args[0]
    const pong = new Discord.MessageEmbed()
    .setTitle('❌Lütfen bir seçenek seçin.')
    .setColor('BLACK')
    .setDescription(`
kanal | ayarlar | son-depremler | aç | kapat
`)
    .setImage('https://cdn.discordapp.com/attachments/915179207938674689/1000071316180832276/unknown.png')
   if(!deprembilgibyweasley) return message.channel.send({embed:pong, content: message.author})

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
if(args[0] == "kanal") {
    if(message.guild == null) return message.channel.send({content:'Bu komut sadece sunucularda kullanılabilir.'})
    if (!message.member.hasPermission("ADMINISTRATOR")) {
        const yetkinyokmeh = new Discord.MessageEmbed()
          .setAuthor("❌ Hata")
          .setDescription("**Bu komutu kullanabilmek için `Yönetici (ADMINISTRATOR)` yetkisine sahip olmalısın!**")
          .setColor("RED")
        return message.channel.send({embed:yetkinyokmeh})
      }

                          
                    
      const embedolmadi = new Discord.MessageEmbed()
      .setThumbnail(client.user.avatarURL())
      .setTitle('Hata')
      .setColor('BLACK')
      .setDescription('Lütfen bir kanalı etiketleyin.')
     
      if(message.mentions.channels.first() == undefined) return message.channel.send({embed:embedolmadi})
      
      const channelfetch = message.mentions.channels.first().id
      if(typeof(channelfetch) == "undefined") {
        const yok = new Discord.MessageEmbed()
        .setAuthor("❌ Hata")
        .setColor("BLACK")
        .setDescription("Lütfen düzgün bir kanalı etiketleyin.")
        return message.channel.send({embed:yok})
      }
      if(message.mentions.channels.first().guild.id !== message.guild.id) {
        const busunucudadeil = new Discord.MessageEmbed()
        .setAuthor("❌ Hata")
        .setDescription("**Bu kanal bu sunucuda gözükmüyor.**")
        .setColor("BLACK")
        return message.channel.send({embed:busunucudadeil})
        }
        if(message.mentions.channels.first().id === db.fetch(`depremkanal_${message.guild.id}`)) {
          const embed = new Discord.MessageEmbed()
          .setTitle('❌ Hata')
          .setColor('BLACK')
          .setDescription(`**Zaten bu kanal deprem bilgi kanalı olarak ayarlı.** Bunun bir hata oldugunu düşünüyorsan [destek sunucusuna](https://discord.gg/EZ673nyaNj) katılarak bize ulaşabilirsin.`)
          return message.channel.send({embed:embed})

        }
            const depremsistemi = db.fetch(`deprem`);

    let ex = [];
depremsistemi.forEach(yannne => {
if(yannne.sunucu === message.guild.id) return;
ex.push(yannne)
db.set(`deprem`, ex)
})

    
    client.channels.cache.get(message.mentions.channels.first().id).send({content: "Bu kanal deprem bilgi kanalı olarak ayarlandı"})
        db.push(`deprem`,{ kanal: message.mentions.channels.first().id, sunucu: message.guild.id })
        db.set(`deprembilgi_${message.guild.id}`, true)
        db.set(`depremkanal_${message.guild.id}`, message.mentions.channels.first().id) 

        const busunucudadeil = new Discord.MessageEmbed()
        .setAuthor("Başarılı")
        .setDescription("**Kanal ayarlandı.**")
        .setColor("GREEN")
        message.channel.send({embed:busunucudadeil})
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

      if(db.fetch(`deprembilgi_${message.guild.id}`) === true) {
        return message.channel.send({content:`Sanırım deprem bilgi sistemi zaten açık 😀`})
      }

      db.set(`deprembilgi_${message.guild.id}`, true) 

      message.channel.send({content: `✅ Deprem bilgi sistemi aktifleştirildi`})
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


    if(db.fetch(`deprembilgi_${message.guild.id}`) === null) {
        return message.channel.send({content:`Sanırım deprem bilgi sistemi zaten kapalı 😀`})
      }

      db.set(`deprembilgi_${message.guild.id}`, null) 

      message.channel.send({content: `✅ Deprem bilgi sistemi de-aktifleştirildi`})

}



if(args[0] == "ayarlar") {
    if(message.guild == null) return message.channel.send({content:'Bu komut sadece sunucularda kullanılabilir.'})
                    
    if(message.guild == null) return
                    

    let aciklama = await db.fetch(`deprembilgi_${message.guild.id}`);
let aciklamaYazi;
if (aciklama == null) aciklamaYazi = ":red_circle: Sistem aktif değil.";
else aciklama = `:green_circle: Sistem aktif.`;


let weasleybyweasley = await db.fetch(`depremkanal_${message.guild.id}`);
let bYazi;
if (weasleybyweasley == null) bYazi = `:red_circle: Kanal ayarlanmamış.`;
else bYazi = `:green_circle: <#${weasleybyweasley}> (${weasleybyweasley})`;

const embed = new Discord.MessageEmbed()
.setAuthor(`${message.guild.name} Sunucusunun ayarları`)
.setThumbnail(message.guild.iconURL() || client.user.avatarURL())
.setColor("BLACK")
.addField("Sunucu Adı", message.guild.name, true)
.addField("Sunucu Kimliği (ID)", message.guild.id, true)
.addField("Deprem Sistemi Durumu", aciklama, true)
.addField("Deprem Kanal", bYazi, true)
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
` **Zaman:** <t:${ayn.timestamp}>\n **Büyüklük:** ${ayn.mag}\n **Derinlik:** ${ayn.depth}km \n`, false
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
            } else {


const oyver = new Discord.MessageEmbed()
.setColor('BLACK')
.setTitle("Oy vermemişsiniz! ⚫")
  .setThumbnail(client.user.avatarURL())
.setAuthor(`Deprem Bilgi`, client.user.avatarURL())
.setDescription(`
Bu komutu kullanabilmek için bota [top.gg](https://top.gg/bot/1000057864980811878/vote) üzerinden oy vermelisiniz. Oy vererek botumuzun büyümesine katkıda bulunursunuz.😀 
`)
message.channel.send(oyver)
}
        })
}
}


exports.config = {
  name: "deprem",
  guildOnly: true,
  aliases: [],
};
