let handler = async(m, { conn, text, command }) => {
  if (command == 'dm') {
    // الرسالة التي سنرسلها
    let message = 'اشترك في قناة البوت: https://whatsapp.com/channel/0029Vae5S5aBVJl6vQR65f2r';
    
    // الحصول على قائمة جميع مستخدمي البوت
    let users = await conn.contacts.all();
    
    // إرسال الرسالة إلى كل مستخدم
    for (let user of users) {
      if (user.jid.endsWith('@s.whatsapp.net')) {
        await conn.sendMessage(user.jid, { text: message });
      }
    }
    
    m.reply('تم إرسال الرسالة بنجاح إلى جميع مستخدمي البوت');
  }
}

handler.command = handler.help = ['dm'];
handler.tags = ['tools'];
handler.premium = true;
export default handler;