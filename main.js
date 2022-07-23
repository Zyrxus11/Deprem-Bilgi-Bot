const Discord = require("discord.js")     
const client = new Discord.Client();       
const config = require("./config.js")    
const fs = require("fs");                
require('./util/Loader.js')(client);     

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

client.on("message", msg => {

    	if (!msg.content.startsWith('d!deprem kanal <#')) return;
    
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
                    db.set(`sondeprem_${msg.guild.id}`, ayn.timestamp)

embedcuuu.setDescription(`**${ayn.lokasyon}**\n **Zaman:** <t:${ayn.timestamp}>\n **Büyüklük:** ${ayn.mag}\n **Derinlik:** ${ayn.depth}km`)
      }
                                             const db = require("quick.db")

const kanal = db.fetch(`deprem_${msg.guild.id}`)
db.set(`deprembilgi_${msg.guild.id}`, true)
client.channels.cache.get(kanal).send(embedcuuu)
});
         return;
    
});

client.on("message", msg => {
      const db = require("quick.db")

let i = db.fetch(`deprembilgi_${msg.guild.id}`)
 if (i == true) {

                                               setInterval(async () => {
const fetch = require("node-fetch")


fetch(
    `https://api.orhanaydogdu.com.tr/deprem/live.php?limit=1`
  ).catch(err => console.log(err))
                        .then(res => res.json())
    .then(json => {

      let cikti = json.result;
      var bot = "";
                    const db = require("quick.db")
       const son = db.fetch(`sondeprem_${msg.guild.id}`)
       
             for (const ayn of cikti) {

if(son == ayn.timestamp) {
    
  return console.log('sa')
    
}

     
                          const embed2 = new Discord.MessageEmbed()
        .setAuthor("Deprem")
        .setColor("BLACK")
.setThumbnail(client.user.avatarURL())
  .setFooter('Depremden etkilenen herkese geçmiş olsun...', client.user.avatarURL())
                                     const db = require("quick.db")
db.set(`sondeprem_${msg.guild.id}`, null)

db.set(`sondeprem_${msg.guild.id}`, ayn.timestamp)

                                     
embed2.setDescription(`**${ayn.lokasyon}**\n **Zaman:** <t:${ayn.timestamp}>\n **Büyüklük:** ${ayn.mag}\n **Derinlik:** ${ayn.depth}km`)
      
      
const kanal = db.fetch(`deprem_${msg.guild.id}`)
client.channels.cache.get(kanal).send(embed2)

             }       
});
}, 15000)
 }

    
});
