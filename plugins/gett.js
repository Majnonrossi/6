const handler = async (m, { conn, command, text }) => {
  const sender = m.sender;

  // Check if the message contains a token
  const receivedToken = text.trim();

  if (receivedToken) {
    const tokenData = tokensDB[receivedToken];
    if (!tokenData) {
      await conn.sendMessage(m.chat, { text: `التوكن غير صالح.` }, { quoted: m });
      return;
    }

    if (tokenData.used) {
      await conn.sendMessage(m.chat, { text: `تم استخدام التوكن مسبقًا ولا يمكن استخدامه مرة أخرى.` }, { quoted: m });
      return;
    }

    try {
      tokenData.used = true;
      global.db.data.users[sender].limit += tokenData.gems;
      await conn.sendMessage(m.chat, { text: `تم قبول التوكن. لقد تلقيت ${tokenData.gems} جوهرة.` }, { quoted: m });
    } catch (error) {
      await conn.sendMessage(m.chat, { text: `خطأ: ${error}` }, { quoted: m });
    }
  }
};

// Remove the command restriction to listen for any message
handler.command = /^(?!.*(?:gett|addt)).*$/i;