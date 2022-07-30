let handler  = async (m, { conn, usedPrefix }) => { 
conn.reply(m.chat, `
┌─「 *GRUP BOT* 」──⬣
│ • chat.whatsapp.com/FhSBFvhtzfN5hIVe1GXAfj
│ • chat.whatsapp.com/CrT7Iwpt3RsJtJBEL7cFiJ
│ • chat.whatsapp.com/EYDeu6NwLWf0PAxLyDN6PR
│ • chat.whatsapp.com/L2Fh6QqQEdrEEXvU8Kth73
│ • chat.whatsapp.com/HcPnhIpML5XKqwVEI8LVkS
│ • chat.whatsapp.com/FMbh1lHOaHEKyu1W9CqAmX
└──────────────⬣
`.trim(), m)
}

handler.help = ['grupbot']
handler.tags = ['main', 'utama']
handler.command = /^(grupbot)$/i

handler.exp = 150

module.exports = handler
