const Discord = require("discord.js");
const db = require("quick.db"); 
    module.exports.run = async (client, message, args) => {
      if(db.fetch(`bakim`)) {
  if(message.author.id !== "İD NİZ") {return message.channel.send('Şuanda Bakım Modu Açıktır.')}
}

  message.channel.send(new Discord.MessageEmbed()
 .setColor('RANDOM').setDescription(`<a:tac:821004549837815848>  **Yardım Menüsü** <a:tac:821004549837815848> 

**\` Kayıt Komutları \`**

 <a:oksag:821077100680970251> **.e**  :  ** Erkek Bir Kullanıcıyı Kayıt Edersiniz **

 <a:oksag:821077100680970251> **.k** :  ** Kadın Bir Kullanıcıyı Kayıt Edersiniz **

<a:oksag:821077100680970251> **.kayıtpuan**   :  ** Kayıt Puanınızı Görüntülersiniz **

 <a:oksag:821077100680970251> **.say**   :  ** Sunucunun Kaç Kişi Oldugunu Görebilirsiniz. **

 <a:oksag:821077100680970251> **.tçek**  :  ** Sesde Bulunan Tüm Üyeleri Belirtilen Kanala Çeker **

  `).setThumbnail(message.author.avatarURL() ? message.author.avatarURL({dynamic: true}) : '')
   .setImage('GİF İD'))

  
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases:['help', 'bilgi'],
    permlevel: 0
};

exports.help = {
    name: "yardım"
}
