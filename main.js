const Discord = require("discord.js")     
const client = new Discord.Client();       
const config = require("./config.js")    
const fs = require("fs");                
require('./util/Loader.js')(client);     
const db = require("quick.db")
    const fetch = require("node-fetch")

setInterval(async () => {
    const anasistemdeprem = db.get(`deprem`)

  if(!anasistemdeprem) return; // ayarlı sunucu yoksa bir şey yapmıyor

  anasistemdeprem.forEach(async weasley => {
  try {
  await fetch(
        `https://api.orhanaydogdu.com.tr/deprem/live.php?limit=1`
      )
                            .then(res => res.json())
        .then(json => {
                       
          let cikti = json.result;
          var bot = "";
    console.log('=============================')
    console.log(`Deprem Bilgi v2`)
    console.log(`https://github.com/Zyrxus11/Deprem-Bilgi-Bot`)
    console.log('=============================')

    const embedcuuu = new Discord.MessageEmbed()
    .setAuthor("Deprem")
    .setColor("BLACK")
    .setThumbnail(client.user.avatarURL())
      .setFooter('Depremden etkilenen herkese geçmiş olsun...', client.user.avatarURL())
          for (const ayn of cikti) {
                const db = require("quick.db")
    embedcuuu.setDescription(`**${ayn.lokasyon}**\n **Zaman:** <t:${ayn.timestamp}>\n **Büyüklük:** ${ayn.mag}\n **Derinlik:** ${ayn.depth}km`)
                                               if(ayn.timestamp === db.fetch(`sondeprem`)) {
    return console.log('Aynı deprem :bruh:')
  } else {


  

                                               
      
if(db.fetch(`deprembilgi_${weasley.sunucu}`) === null)  {
  return
} else {
        try {
    client.channels.cache.get(weasley.kanal).send(embedcuuu)
            setTimeout(async () => {
                              db.set(`sondeprem`, ayn.timestamp)
            db.set(`sondeprem2`, ayn.lokasyon)
  }, 10000) 
} catch(err) {
      console.log(`[BOT] 🔴 Deprem Sistemi (HATALI [Kanal silindi, Kanala mesaj yazma yetkisi yok]) : ${weasley.sunucu} - ${weasley.kanal}`)
}
    }
    console.log(`🟢 Deprem Sistemi : ${weasley.sunucu} - ${weasley.kanal}`)
  }

  }
// sistem kapalıysa mesaj atmıyo işte .d
})
  } catch(err) {
      console.log(err)
  }
  
  
  
  
  
  
      
  })
  }, 15000) 

client.commands = new Discord.Collection(); 
client.aliases = new Discord.Collection();  
fs.readdir('./commands/', (err, files) => { 
  if (err) console.error(err);               
  console.log(`${files.length} komut yüklenecek.`); 
  files.forEach(f => {                       
    let props = require(`./commands/${f}`);   
    console.log(`${props.config.name} komutu yüklendi.`);  
    client.commands.set(props.config.name, props); 
    props.config.aliases.forEach(alias => {          
      client.aliases.set(alias, props.config.name);  
    });
  });
})

client.login(config.token)

