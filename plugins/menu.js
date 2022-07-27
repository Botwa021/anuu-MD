let levelling = require('../lib/levelling')
let fs = require('fs')
let path = require('path')
let fetch = require('node-fetch')
let moment = require('moment-timezone')
const defaultMenu = {
  before: `
┌───────═┅═────────⬣
│      *Hai*, %name
└┬──────────────┈ ⳹
   │      「 𝗜𝗡𝗙𝗢 𝗨𝗦𝗘𝗥 」
┌┤• *Tersisa* : %limit Limit
││• *Role* : %role
││• *Level* : %level 
││• *Exp* : %totalexp XP 
││• *Hari* : %week
││• *Tanggal* : %week %weton, %date
││• *Tanggal Islam* : %dateIslamic
││• *Waktu* : %time
│└──────────────┈ ⳹ 
│        「 𝗕𝗢𝗧 𝗜𝗡𝗙𝗢 」
│• *Uptime* : %uptime
│• *Bailyes Version* : 4.2.0
│• *Database* : %rtotalreg dari %totalreg
│• *Memory Used* : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
│• *Instagram* :
│• *https://instagram.com/mursid.st*
├───────────────┈ ⳹
│       「 𝗚𝗥𝗨𝗣 𝗕𝗢𝗧 」
│• *bit.ly/grup-wabot-aq¹*
│• *bit.ly/grup-wabot-aq²*
│• *bit.ly/grup-wabot-aq³*
│• *bit.ly/grup-wabot-aq⁴*
└───────═┅═────────⬣
%readmore`.trim(),
  header: '┌──「 %category 」──⬣',
  body: '│• %cmd %islimit %isPremium',
  footer: '└───═┅═───⬣\n',
  after: `
┌──  *BIG THANKS TO*  ───⬣
│• Allah SWT
│• Nurutomo as wabot-aq
│• Istikmal as BochilGaming
│• Ariffb as stikerin
│• Aguz Familia
│• Syahrul
│• Vanesha Desu
│• Aniq12
│• Amirul Dev
│• Rasell Comel
│• Faudzan
│• Krisna
│• Fatur as Ftwrr
 | • Krizyn_Ofc
│• Ziv San
│• Mursid S
│• Nadia Cans
│• All Creator Bot
└─────═┅═─────⬣

*%npmname@^%version*
${'```%npmdesc```'}
`,
}
let haori = './anuu.mp3' // SCRIPT ORIGINAL BY FAMILY MD
let handler = async (m, { conn, usedPrefix: _p, args, command }) => {

  let tags
  let teks = `${args[0]}`.toLowerCase()
  let arrayMenu = ['all', 'game', 'xp', 'stiker', 'kerangajaib', 'quotes', 'admin', 'grup', 'premium', 'internet', 'anonymous', 'nulis', 'downloader', 'tools', 'fun', 'database', 'quran', 'audio', 'jadibot', 'info', 'tanpakategori', 'owner']
  if (!arrayMenu.includes(teks)) teks = '404'
  if (teks == 'all') tags = {
    'main': 'Utama',
    'game': 'Game',
    'rpg': 'RPG',
    'xp': 'Exp & Limit',
    'sticker': 'Stiker',
    'kerang': 'Kerang Ajaib',
    'quotes': 'Quotes',
    'group': 'Grup',
    'premium': 'Premium',
    'internet': 'Internet',
    'anonymous': 'Anonymous Chat',
    'nulis': 'MagerNulis & Logo',
    'downloader': 'Downloader',
    'tools': 'Tools',
    'fun': 'Fun',
    'database': 'Database',
    'vote': 'Voting',
    'absen': 'Absen',
    'quran': 'Al Qur\'an',
    'audio': 'Pengubah Suara',
    'jadibot': 'Jadi Bot',
    'info': 'Info',
    '': 'Tanpa Kategori',
  }
  if (teks == 'game') tags = {
    'game': 'Game',
    'rpg': 'RPG'
  }
  if (teks == 'xp') tags = {
    'xp': 'Exp & Limit'
  }
  if (teks == 'stiker') tags = {
    'sticker': 'Stiker'
  }
  if (teks == 'kerangajaib') tags = {
    'kerang': 'Kerang Ajaib'
  }
  if (teks == 'quotes') tags = {
    'quotes': 'Quotes'
  }
  if (teks == 'grup') tags = {
    'group': 'Grup'
  }
  if (teks == 'premium') tags = {
    'premium': 'Premium'
  }
  if (teks == 'internet') tags = {
    'internet': 'Internet'
  }
  if (teks == 'anonymous') tags = {
    'anonymous': 'Anonymous Chat'
  }
  if (teks == 'nulis') tags = {
    'nulis': 'MagerNulis & Logo'
  }
  if (teks == 'downloader') tags = {
    'downloader': 'Downloader'
  }
  if (teks == 'tools') tags = {
    'tools': 'Tools'
  }
  if (teks == 'fun') tags = {
    'fun': 'Fun'
  }
  if (teks == 'database') tags = {
    'database': 'Database'
  }
  if (teks == 'vote') tags = {
    'vote': 'Voting',
    'absen': 'Absen'
  }
  if (teks == 'quran') tags = {
    'quran': 'Al Qur\'an'
  }
  if (teks == 'audio') tags = {
    'audio': 'Pengubah Suara'
  }
  if (teks == 'jadibot') tags = {
    'jadibot': 'Jadi Bot'
  }
  if (teks == 'info') tags = {
    'info': 'Info'
  }
  if (teks == 'tanpakategori') tags = {
    '': 'Tanpa Kategori'
  }
  if (teks == 'owner') tags = {
    'owner': 'Owner',
    'host': 'Host',
    'advanced': 'Advanced'
  }



  try {
    let package = JSON.parse(await fs.promises.readFile(path.join(__dirname, '../package.json')).catch(_ => '{}'))
    let { exp, limit, age, money, level, role, registered } = global.db.data.users[m.sender]
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
    let umur = `*${age == '-1' ? 'Belum Daftar*' : age + '* Thn'}`
    let name = registered ? global.db.data.users[m.sender].name : conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    global.jam = time
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.help) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    if (teks == '404') {
      let judul = `${global.ucapan}, ${name}`.trim()
      const sections = [
      {
        title: '𝒍𝒊𝒔𝒕 𝒎𝒆𝒏𝒖 𝒏𝒂𝒅𝒊𝒂 𝒃𝒐𝒕',
        rows: [
          { title: '𝒂𝒍𝒍', rowId: `${_p}? all` },
          { title: '𝒈𝒂𝒎𝒆', rowId: `${_p}? game` },
          { title: '𝒆𝒙𝒑', rowId: `${_p}? xp` },
          { title: '𝒔𝒕𝒊𝒄𝒌𝒆𝒓', rowId: `${_p}? stiker` },
          { title: '𝒌𝒆𝒓𝒂𝒏𝒈 𝒂𝒋𝒂𝒊𝒃', rowId: `${_p}? kerangajaib` },
          { title: '𝒒𝒖𝒐𝒕𝒆𝒔', rowId: `${_p}? quotes` },
          { title: '𝒈𝒓𝒖𝒑', rowId: `${_p}? grup` },
          { title: '𝒑𝒓𝒆𝒎𝒊𝒖𝒎', rowId: `${_p}? premium` },
          { title: '𝒊𝒏𝒕𝒆𝒓𝒏𝒆𝒕', rowId: `${_p}? internet` },
          { title: '𝒂𝒏𝒐𝒏𝒚𝒎𝒐𝒖𝒔', rowId: `${_p}? anonymous` },
          { title: '𝒏𝒖𝒍𝒊𝒔 & 𝒍𝒐𝒈𝒐', rowId: `${_p}? nulis` },
          { title: '𝒅𝒐𝒘𝒏𝒍𝒐𝒂𝒅𝒆𝒓', rowId: `${_p}? downloader` },
          { title: '𝒕𝒐𝒐𝒍𝒔', rowId: `${_p}? tools` },
          { title: '𝒇𝒖𝒏', rowId: `${_p}? fun`},
          { title: '𝒅𝒂𝒕𝒂𝒃𝒂𝒔𝒆', rowId: `${_p}? database` },
          { title: '𝒗𝒐𝒕𝒆 & 𝒂𝒃𝒔𝒆𝒏', rowId: `${_p}? vote` },
          { title: "𝑨𝒍-𝑸𝒖𝒓\'𝒂𝒏", rowId: `${_p}? quran` },
          { title: '𝒑𝒆𝒏𝒈𝒖𝒃𝒂𝒉 𝒔𝒖𝒂𝒓𝒂', rowId: `${_p}? audio` },
          { title: '𝒋𝒂𝒅𝒊 𝒃𝒐𝒕', rowId: `${_p}? jadibot` },
          { title: '𝒊𝒏𝒇𝒐', rowId: `${_p}? info` },
          { title: '𝒕𝒂𝒏𝒑𝒂 𝑲𝒂𝒕𝒆𝒈𝒐𝒓𝒊', rowId: `${_p}? tanpakategori` },
          { title: '𝒐𝒘𝒏𝒆𝒓', rowId: `${_p}? owner` },
        ]
      }
    ]
    const listMessage = {
      text: judul,
      footer: wm,
      mentions: await conn.parseMention(judul),
      title: '',
      buttonText: "Click Here",
      sections
    }
    return conn.sendMessage(m.chat, listMessage, { quoted: m, mentions: await conn.parseMention(judul), contextInfo: { forwardingScore: 99999, isForwarded: true }})
    
    }

    let groups = {}
    for (let tag in tags) {
      groups[tag] = []
      for (let plugin of help)
        if (plugin.tags && plugin.tags.includes(tag))
          if (plugin.help) groups[tag].push(plugin)
    }
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Dipersembahkan oleh https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? '(Ⓛ)' : '')
                .replace(/%isPremium/g, menu.premium ? '(Ⓟ)' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      ucapan: global.ucapan,
      p: _p, uptime, muptime,
      me: conn.user.name,
      npmname: package.name,
      npmdesc: package.description,
      version: package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp <= 0 ? `Siap untuk *${_p}levelup*` : `${max - exp} XP lagi untuk levelup`,
      github: package.homepage ? package.homepage.url || package.homepage : '[unknown github url]',
      level, limit, name, umur, money, age, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    await conn.send3TemplateButtonImg(m.chat, `${global.image}`, text.trim(), wm, `𝑷𝒆𝒎𝒊𝒍𝒊𝒌 𝑩𝒐𝒕`, `${_p}owner`, `𝑻𝒉𝒂𝒏𝒌𝒔 𝑻𝒐𝒐`, `${_p}tqto`, `𝑫𝒐𝒏𝒂𝒔𝒊`, `${_p}donasi`)
 conn.sendFile(m.chat, haori, 'anuu.mp3', null, m, true, {
type: 'audioMessage', // paksa tanpa convert di ffmpeg
ptt: true
     }) 
 } catch (e) {
    conn.reply(m.chat, '𝑴𝒂𝒂𝒇, 𝒎𝒆𝒏𝒖 𝒔𝒆𝒅𝒂𝒏𝒈 𝒆𝒓𝒓𝒐𝒓', m)
    throw e
  }
}
handler.help = ['menu', 'help', '?']
handler.tags = ['main']
handler.command = /^(m(enu)?|help|\?)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 3

module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
function ucapan() {
  const time = moment.tz('Asia/Jakarta').format('HH')
  res = "Selamat dinihari"
  if (time >= 4) {
    res = "Selamat pagi"
  }
  if (time > 10) {
    res = "Selamat siang"
  }
  if (time >= 15) {
    res = "Selamat sore"
  }
  if (time >= 18) {
    res = "Selamat malam"
  }
  return res
}
