const Discord = require("discord.js");
const client = new Discord.Client(); //
const ayarlar = require("./ayarlar.json");
const fs = require("fs");
let prefix = ayarlar.prefix;
const moment = require("moment");
const token = process.env.token
const db = require("quick.db")

client.on("ready", () => {
  client.user.setActivity(`LECRAİN BERKAN`, { type: "WATCHING" });
  console.log("BOT AKTİF!");
});
client.commands = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let cmd = require(`./commands/${file}`);
    let cmdFileName = file.split(".")[0];
    console.log(`Komut Yüklem e Çalışıyor: ${cmdFileName}`);
    client.commands.set(cmd.help.name, cmd);
  });
});



 client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'sa') {
    msg.reply('Aleyküm Selam Nasılsın?');
  }
});


client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'tag') {
    msg.reply('İşte O Haşmetli Tagımız : ');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'tag') {
    msg.reply('İşte O Haşmetli Tagımız :');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'iyiyim teşekkür ederim') {
    msg.reply('Asıl Ben Teşekkür  Ederim.!');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'iyiyim sen nasılsın ?') {
    msg.reply('Allaha Şükür Geçinioz Ekmek Parası Nabalım işde');
  }
});


// Main Dosyanız.
//EVENTS Yükleyici_______________________________________________________________


  
////////
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    console.log(`Etkinlik Yükleme Çalışıyor: ${eventName}`);
    client.on(eventName, event.bind(null, client));
  });
});
client.on("guildMemberAdd", async member => {
  let user = member.user;

  
  
  ///// EMOJİLER //////

  
  require("moment-duration-format");
  let channel = member.guild.channels.cache.get("708480164442669186");
  channel.send(`${member} <@&807668313110478918>`);
  moment.locale("tr");
  let embed = new Discord.MessageEmbed()
    .setThumbnail(member.user.avatarURL())
    .setImage('https://cdn.discordapp.com/attachments/514676147720683522/822208123825553449/giphy.gif')
    .setAuthor(
      `${member.guild.name} Hoşgeldin`,
      member.guild.iconURL({ dynamic: true })
    )
    .setDescription(`<a:oksag:821077100680970251> Merhaba Hoşgeldin Dostum,

<a:oksag:821077100680970251> Seninle beraber \`${
    member.guild.memberCount
  }\` kişi olduk!

<a:oksag:821077100680970251> \`${ayarlar.sunucuTag}\`** Tagımızı alarak ekibimize katılabilirsin.**

<a:oksag:821077100680970251> Hesabın kuruluş zamanı **${moment(
    user.createdAt
  ).format("D MMMM YYYY HH:mm:ss")}**`);
  channel.send(embed);
});



//////////////////SESE SOKMA/////////////////////////////


//////////////////FAKE KATIL & AYRIL/////////////////////
client.on("message", async message => {
  if (message.content === prefix + "fakekatıl") {

    client.emit(
      "guildMemberAdd",
      message.member || (await message.guild.fetchMember(message.author))
    );
  }
});
client.on("message", async message => {
  if (message.content === prefix + "fakeayrıl") {
    
    client.emit(
      "guildMemberRemove",
      message.member || (await message.guild.fetchMember(message.author))
    );
  }
});


////////////OTO TAG///////////
client.on('userUpdate', async user => {
  let sunucuid = " "; //Buraya sunucunuzun IDsini yazın
  let tag = ""; //Buraya tagınızı yazın
  let rol = ""; //Buraya tag alındığı zaman verilecek rolün IDsini yazın
  let channel = client.guilds.get(sunucuid).channels.find(x => x.name == ''); //tagrol-log yerine kendi log kanalınızın ismini yazabilirsiniz
  if (!tag) return;
  if (!rol) return;
  if (!channel) return;
  let member = client.guilds.get(sunucuid).members.get(user.id);
  if (!member) return;
  if (!member.roles.has(rol)) {
    if (member.user.username.includes(tag)) {
      member.addRole(rol)
      const tagalma = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setDescription(`<@${user.id}> adlı kişi, ${tag} tagını aldığından dolayı <@&${rol}> rolünü kazandı.`)
      .setTimestamp()
      channel.send(tagalma)
    }
  }else{
    if (!member.user.username.includes(tag)) {
      member.removeRole(rol)
      const tagsilme = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setDescription(`<@${user.id}> adlı kişi, ${tag} tagını sildiğinden dolayı <@&${rol}> rolünü kaybetti.`)
      .setTimestamp()
      channel.send(tagsilme)
    }
  }
});

///////////////////////////////// OTOROL *////////////////////////

client.on('guildMemberAdd', async (member) => {
  if(db.has(`${member.guild.id}_otorol`)) {
    var rolID = db.fetch(`${member.guild.id}_otorol`)
    member.addRole(rolID)
  } else {
    return;
  }
  if(db.has(`${member.guild.id}_otokanal`)) {
    var kanal = client.channels.get(db.fetch(`${member.guild.id}_otokanal`))
    const embed = new Discord.RichEmbed()
    .setDescription(`Yeni katılan ${member} kullanıcısına <@&${rolID}> rolü verildi`)
    .setTimestamp()
    kanal.send(embed)
  } else {
    return;
  }
})

////////////////////// OTOROL ////////////////
client.login(token);
