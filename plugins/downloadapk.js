import { download } from "aptoide-scraper";

const handler = async (m, { conn, args }) => {
  const appId = args[0];
  if (!appId) {
    throw `*استخدم الأمر كما يلي:*\n\n.downloadapk <app_id>`;
  }

  try {
    const res = await download(appId);

    // التحقق من حجم الملف
    if (res.size.includes("GB") || parseFloat(res.size.replace(" MB", "")) > 140) {
      return await conn.sendMessage(
        m.chat,
        { text: "The apk file is too large. Maximum download size is 140MB." },
        { quoted: m }
      );
    }

    // إرسال ملف الـ APK
    await conn.sendMessage(
      m.chat,
      {
        document: { url: res.dllink },
        mimetype: "application/vnd.android.package-archive",
        fileName: res.name + ".apk",
        caption: null
      },
      { quoted: m }
    );
  } catch (error) {
    console.error(error);
    throw 'Error: Unable to download the APK. Please try again later.';
  }
};

handler.command = /^(downloadapk)$/i;

export default handler;