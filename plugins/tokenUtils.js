// tokenUtils.js

const generateToken = () => {
  const prefix = 'jeen';
  const suffix = Math.random().toString(36).substr(2, 9);
  const token = `${prefix}-${suffix}`;
  return token;
};

const tokensDB = {}; // قاعدة بيانات مؤقتة للتوكنات

const handler = async (m, { conn, command, text }) => {
  const sender = m.sender;

  // Check if the received message is a token
  const receivedToken = text.trim(); // Remove any leading/trailing spaces

  if (receivedToken.startsWith('jeen-')) {
    const tokenData = tokensDB[receivedToken];
    if (!tokenData) {
      throw `التوكن غير صالح.`;
    }

    if (tokenData.used) {
      throw `تم استخدام التوكن مسبقًا ولا يمكن استخدامه مرة أخرى.`;
    }

    try {
      tokenData.used = true;

      // تحديث حساب المستخدم بالجواهر هنا
      global.db.data.users[sender].limit += tokenData.gems;

      await conn.sendMessage(m.chat, { text: `تم قبول التوكن. لقد تلقيت ${tokenData.gems} جوهرة.` }, { quoted: m });
    } catch (error) {
      throw `خطأ: ${error}`;
    }
  }
};

// Export the handler
export default handler;