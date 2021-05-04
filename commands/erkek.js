const Discord = require('discord.js');
const db = require("quick.db")
let kayıtayar = require('../kayıt-ayar.json')
exports.run = async (client, message, args) => {
    if(db.fetch(`bakim`)) {
  if(message.author.id !== "KENDİ İD NİZ") {return message.channel.send('Bot Şuanda Bakımda!')}
}

    
  
if(!message.member.roles.cache.has(kayıtayar.kayıtsorumlusuID)) return message.channel.send(`Bu komutu kullanabilmek için yeterli yetkiye sahip olmasın.`)//KAYIT SORUMLUSU ROL ID
  let üye = message.mentions.users.first()
  if (!üye) return message.channel.send('Üye Etiketler misin ?')
  let rol = message.mentions.roles.first()
  let member = message.guild.member(üye)
    const tag = kayıtayar.sunucuTag; 
    const nick = args[1];
   const yas = args[2];
      if(!nick) return message.channel.send("Bir isim girin.")
      if(!yas) return message.channel.send("Bir yaş girin.")
  member.setNickname(`${tag} ${nick} | ${yas}`)
  member.roles.add(kayıtayar.erkekID)
  member.roles.add(kayıtayar.erkekID2)
  member.roles.remove(kayıtayar.kayıtsızID)
  member.roles.remove(kayıtayar.kadınID)
  db.add(`kayıt.puan.erkek.${message.author.id}`, +1)

  
 
  
  let embed = new Discord.MessageEmbed()
  .setColor('BLUE')
  .setDescription(`${üye} Kayıt Ediliyor...`)
  .setFooter(`Komutu kullanan yetkili : ${message.author.username}`) 
  message.react('825026702207352832')

  return message.channel.send(embed).then(editmsg => {
      let embed2 = new Discord.MessageEmbed()
      .setAuthor(`Başarılı! ${message.author.username}`)
      .setColor('ffffff')
      .setDescription(`• **Kayıt Olan Kullanıcı:** ${member} \n  \n • **İsim Yaş:**  ${nick} | ${yas}  \n  \n • **Verilen Rol:** <@&ERKEKROLİD> \n \n • **Alınan Rol:** <@&KAYITSIZROLİD> \n\n• **Kayıt eden:** ${message.author}  \n\n **•  Kayıt Eden Yetkiliye \`1 Puan\` Eklendi.**`)
      .setThumbnail(member.user.avatarURL())
      .setFooter(`Kayıt Puan İçin; .kayıtpuan`)
      .setImage('https://cdn.discordapp.com/attachments/445204038737199105/811259189074198538/giphy.gif')
      editmsg.edit(embed2)
    

let chatlog = kayıtayar.chatID
let kanal = client.channels.cache.get(chatlog)

kanal.send(`<a:oksag:821077100680970251> ${member} **Aramıza Hoşgeldin, Tagımızı Alarak bize destek olabilirsin. Tagımız : TAG ** \`${kayıtayar.sunucuTag}\`<a:oksol:821077100928434187>`)


  })
};

exports.help = {
  name: "e",
  guildOnly: true,
  aliases: ["e"],
};