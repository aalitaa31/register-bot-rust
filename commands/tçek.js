const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const db = require("quick.db")

exports.run = async (client ,message ,args) => {
  if(db.fetch(`bakim`)) {
  if(message.author.id !== "İD NİZ") {return message.channel.send('Şuanda Bakım Modu Açıktır.')}
}
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.sendEmbed(new Discord.RichEmbed().addField(`Bilgi` , `Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`).setColor("2e0101").setFooter(message.author.tag ,message.author.avatarURL).setTimestamp());
 
const id = args[0]
if (!id)
return message.reply("Üyelerin Çekileceği Bir Sesli Kanal Id Si Gir")
message.guild.members.filter(a => a.voiceChannel).forEach(x => x.setVoiceChannel(id))
message.channel.send(`Bütün Sesli Kanaldaki Üyeler <#${id}> İsimli Odaya Taşındı!`) 
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0 
};

exports.help = {
  name: "toplutaşı",
  kategori:'sahip'
};
