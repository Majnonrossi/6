import { search } from "aptoide-scraper";
import { prepareWAMessageMedia } from '@whiskeysockets/baileys';

const handler = async (m, { conn, text, usedPrefix }) => {
  if (!text) {
    throw `*اكتب اسم التطبيق الذي تريد البحث عنه:*`;
  }

  try {
    const searchResults = await search(text);
    if (!searchResults || searchResults.length === 0) {
      throw 'No results found for the specified query.';
    }

    let sections = [
      {
        title: `نتائج البحث عن: ${text}`,
        rows: searchResults.slice(0, 10).map(app => ({
          title: app.name,
          rowId: `${usedPrefix}appdetails ${app.id}`,
          description: `Package: ${app.package} | Size: ${app.size}`
        }))
      }
    ];

    const listMessage = {
      text: `اختر التطبيق الذي تريد تحميله:`,
      footer: 'by majnon._.98',
      title: "نتائج البحث",
      buttonText: "اختر التطبيق",
      sections
    };

    await conn.sendMessage(m.chat, listMessage, { quoted: m });
  } catch (error) {
    console.error(error);
    throw 'Error: Unable to fetch app information. Please try again later.';
  }
};

handler.command = /^(apksearch)$/i;
export default handler;