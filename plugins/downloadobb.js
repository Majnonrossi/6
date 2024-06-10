import { download } from "aptoide-scraper";

const handler = async (m, { conn, args }) => {
  const appId = args[0];
  if (!appId) {
    throw `*استخدم الأمر كما يلي:*\n\n.downloadobb <app_id>`;
  }

  try {
    const res = await download(appId);

    // إرسال رابط ملف الـ OBB
    await conn.sendMessage(
      m.chat,
      {
        text: `Download OBB file for ${res.name} from the following link: ${res.obb}`
      },
      { quoted: m }
    );
  } catch (error) {
    console.error(error);
    throw 'Error: Unable to download the OBB file. Please try again later.';
  }
};

handler.command = /^(downloadobb)$/i;

export default handler;