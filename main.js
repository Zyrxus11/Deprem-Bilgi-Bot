const Discord = require("discord.js")     
const client = new Discord.Client();       
const config = require("./config.js")    
const fs = require("fs");                
require('./util/Loader.js')(client);     
const db = require("quick.db")
    const fetch = require("node-fetch")

// DB //
require("./db/login.js")(client)
// DB //


const datas = require("./db/model/deprem.js")


setInterval(async() => {
  let mongo = require("mongoose")
  if(mongo.connection.readyState != 1) return

let x = await datas.find()
if(x.length <= 0) return
try {
  await fetch(
        `https://api.orhanaydogdu.com.tr/deprem/live.php?limit=1`
      )                            .then(res => res.json())
      .then(json => {

x.forEach(async a => {



  let cikti = json.result;
const embed = new Discord.MessageEmbed()
  .setAuthor("Deprem")
  .setColor("BLACK")
  .setThumbnail(client.user.avatarURL())
  .setFooter('Depremden etkilenen herkese geçmiş olsun...', client.user.avatarURL())
      for (const ayn of cikti) {
  embed.setDescription(`**${ayn.lokasyon}**\n **Zaman:** <t:${ayn.timestamp}> (<t:${ayn.timestamp}:R>)\n **Büyüklük:** ${ayn.mag}\n **Derinlik:** ${ayn.depth}km`)


if(db.fetch(`sondeprem`) === ayn.timestamp) {
  return
}
  db.set(`sondeprem`, ayn.timestamp)

  if(a.status == "false") {
    return
  }
  client.channels.cache.get(a.kanal).send({embed:embed}).catch(err => {
    console.log(err)
  })

      }
})
      })
} catch(err) {
console.log(err)
}
}, 20000);


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

client.on("guildDelete", guild => {
  try {
  datas.deleteOne({ sunucu:guild.id })
  } catch(err) {
    return console.log(err)
  }
  console.log(`[BOT] ${guild.name} sunucusunun verileri silindi.`)
})