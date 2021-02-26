const Discord = require('discord.js');//
const client = new Discord.Client();//
const ayarlar = require('./ayarlar.json');//
const chalk = require('chalk');//
const moment = require('moment');//
var Jimp = require('jimp');//
const { Client, Util } = require('discord.js');//
const fs = require('fs');//
const db = require('quick.db');//
const express = require('express');//
require('./util/eventLoader.js')(client);//
const path = require('path');//
const snekfetch = require('snekfetch');//
//

var prefix = ayarlar.prefix;//
//
const log = message => {//
    console.log(`${message}`);//
};

client.commands = new Discord.Collection();//
client.aliases = new Discord.Collection();//
fs.readdir('./komutlar/', (err, files) => {//
    if (err) console.error(err);//
    log(`${files.length} komut yüklenecek.`);//
    files.forEach(f => {//
        let props = require(`./komutlar/${f}`);//
        log(`Yüklenen komut: ${props.help.name}.`);//
        client.commands.set(props.help.name, props);//
        props.conf.aliases.forEach(alias => {//
            client.aliases.set(alias, props.help.name);//
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};



client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }

    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });
client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});
client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(process.env.token);

//-----------------------GİRENE-ROL-VERME----------------------\\     STG

client.on("guildMemberAdd", member => {
  member.roles.add('810792899427827727'); // UNREGİSTER ROLÜNÜN İDSİNİ GİRİN
});

//-----------------------GİRENE-ROL-VERME----------------------\\     STG



//------------------------HOŞGELDİN-EMBEDLİ-----------------------\\     STG

client.on("guildMemberAdd", member => {
    require("moment-duration-format")
      var üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
      var üs = üyesayısı.match(/([0-9])/g)
      üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
      if(üs) {
        üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
          return {
            '0': `<a:0:809444319248252971>`,
            '1': `<a:779046943963611177:809444326782140446>`,
            '2': `<a:779046952205287444:809444335598436400>`,
            '3': `<a:3:809444347715911690>`,
            '4': `<a:779047145201860648:809444357211947078>`,
            '5': `<a:5:809444365327532102>`,
            '6': `<a:hydra:809444374705733714>`,
            '7': `<a:7:809444384479117312>`,
            '8': `<a:8:809444390425985034>`,
            '9': `<a:9:809444399061794846>`}[d];})}
      const kanal = member.guild.channels.cache.find(r => r.id === "789194952037892205");
      let register = ''
    let user = client.users.cache.get(member.id);
    require("moment-duration-format");
      const kurulus = new Date().getTime() - user.createdAt.getTime();  
     const gecen = moment.duration(kurulus).format(` YY **[Yıl,]** DD **[Gün,]** HH **[Saat,]** mm **[Dakika,]** ss **[Saniye]**`) 
    var kontrol;
  if (kurulus < 1296000000) kontrol = 'Hesap Durumu: Güvenilir Değil.'
  if (kurulus > 1296000000) kontrol = 'Hesap Durumu: Güvenilir Gözüküyor.'
    moment.locale("tr");
  const embed = new Discord.MessageEmbed()
  .setAuthor(member.guild.name, member.guild.iconURL({dynamic:true}))
  .setDescription(`
  **<a:hydraalevv:808620322030878750> <@`+member.id+`> Sunucumuza Katıldı ! <a:hydraalevv:808620322030878750>**
  
  **<a:hydratac:789369824249643009> Kayıt edilmek için teyit odasında <@&{register}> yetkililerine teyit vermen yeterli !**
  
  **<a:hydratac:789369824249643009> Seninle birlikte  `+üyesayısı+` kişiye ulaştık !**
  
  **<a:hydratac:789369824249643009> Sunucumuzun kurallarına uymayı unutma, kurallarımızı okumanı tavsiye ederiz.**

  **<a:hydratac:789369824249643009> Sunucumuzun tagını (\`✵\`) alarak bizlere destek olabilirsin**

  **<a:hydratac:789369824249643009> İçeride keyifli vakitler geçirmeni dileriz.**`)
  .setImage(`https://images-ext-1.discordapp.net/external/keOmqfDdQg_q8G6dd2TCx2LJzY8JHcDC5Ivty9RcpYY/https/media.discordapp.net/attachments/789194952688533558/803543295753453568/ezgif-3-6ab7341e25b3.gif?width=238&height=202`)
  kanal.send(embed)
  kanal.send(`<@&${register}>`)
});
//------------------------HOŞGELDİN-EMBEDLİ-----------------------\\     STG


//------------------------ŞÜPHELİ-HESAP-----------------------\\     STG

client.on("guildMemberAdd", member => {
    var moment = require("moment")
    require("moment-duration-format")
    moment.locale("tr")
     var {Permissions} = require('discord.js');
     var x = moment(member.user.createdAt).add(7, 'days').fromNow()
     var user = member.user
     x = x.replace("birkaç saniye önce", " ")
     if(!x.includes("önce") || x.includes("sonra") ||x == " ") {
    const kytsz = member.guild.roles.cache.find(r => r.id === "789194951967375412") 
     var rol = member.guild.roles.cache.get("789194952030683169") // ŞÜPHELİ HESAP ROLÜNÜN İDSİNİ GİRİN
     var kayıtsız = member.guild.roles.cache.get(789194951967375412) // UNREGİSTER ROLÜNÜN İDSİNİ GİRİN
     member.roles.add(rol)
     member.roles.remove(kytsz)

  member.user.send('Selam Dostum Ne Yazık ki Sana Kötü Bir Haberim Var Hesabın 1 Hafta Gibi Kısa Bir Sürede Açıldığı İçin Fake Hesap Katagorisine Giriyorsun Lütfen Bir Yetkiliyle İletişime Geç Onlar Sana Yardımcı Olucaktır.')
  setTimeout(() => {
  
  }, 1000)
  
  
     }
          else {
  
          }
      });

//------------------------ŞÜPHELİ-HESAP-----------------------\\     STG


//-----------------------TAG-ROL----------------------\\     STG

client.on("userUpdate", async (stg, yeni) => {
  var sunucu = client.guilds.cache.get('789194951724498955'); // Buraya Sunucu ID
  var uye = sunucu.members.cache.get(yeni.id);
  var ekipTag = "✵"; // Buraya Ekip Tag
  var ekipRolü = "789194952004337667"; // Buraya Ekip Rolünün ID
  var logKanali = "796688565488189480"; // Loglanacağı Kanalın ID

  if (!sunucu.members.cache.has(yeni.id) || yeni.bot || stg.username === yeni.username) return;
  
  if ((yeni.username).includes(ekipTag) && !uye.roles.cache.has(ekipRolü)) {
    try {
      await uye.roles.add(ekipRolü);
      await uye.send(`Tagımızı aldığın için teşekkürler! Aramıza hoş geldin.`);
      await client.channels.cache.get(logKanali).send(new Discord.MessageEmbed().setColor('RANDOM').setDescription(`${yeni} adlı üye tagımızı alarak aramıza katıldı!`));
    } catch (err) { console.error(err) };
  };
  
  if (!(yeni.username).includes(ekipTag) && uye.roles.cache.has(ekipRolü)) {
    try {
      await uye.roles.remove(uye.roles.cache.filter(rol => rol.position >= sunucu.roles.cache.get(ekipRolü).position));
      await uye.send(`Tagımızı bıraktığın için ekip rolü ve yetkili rollerin alındı! Tagımızı tekrar alıp aramıza katılmak istersen;\nTagımız: **${ekipTag}**`);
      await client.channels.cache.get(logKanali).send(new Discord.MessageEmbed().setColor('RANDOM').setDescription(`${yeni} adlı üye tagımızı bırakarak aramızdan ayrıldı!`));
    } catch(err) { console.error(err) };
  };
});

//----------------------TAG-KONTROL----------------------\\     STG    

client.on("guildMemberAdd", member => {
  let sunucuid = "789194951724498955"; //Buraya sunucunuzun IDsini yazın
  let tag = "✵"; //Buraya tagınızı yazın
  let rol = "789194952004337667"; //Buraya tag alındığı zaman verilecek rolün IDsini yazın
  let channel = client.guilds.cache.get(sunucuid).channels.cache.find(x => x.name == 'tag-log'); //tagrol-log yerine kendi log kanalınızın ismini yazabilirsiniz
if(member.user.username.includes(tag)){
member.roles.add(rol)
  const tagalma = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription(`<@${member.id}> adlı kişi sunucumuza taglı şekilde katıldı, o doğuştan beri bizden !`)
      .setTimestamp()
     client.channels.cache.get('796688565488189480').send(tagalma)
}
})

client.on("ready", () => {
  client.channels.cache.get("789194953048981569").join();
})
//-----------------------TAG-KONTROL----------------------\\     STG    

