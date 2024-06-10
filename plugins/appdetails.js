import { download } from "aptoide-scraper";
import pkg from '@whiskeysockets/baileys';
const { prepareWAMessageMedia, generateWAMessageFromContent, proto } = pkg;

const appInfoHandler = async (m, { conn, args, usedPrefix, command }) => {
  const appId = args[0];
  if (!appId) throw 'No application ID provided.';

  try {
    const appInfo = await download(appId);

    const appInfoMessage = `*Name:* ${appInfo.name}\n*Package:* ${appInfo.package}\n*Last Update:* ${appInfo.lastup}\n*Size:* ${appInfo.size}`;

    const buttons = [
      { buttonId: `${usedPrefix}downloadapk ${appId}`, buttonText: { displayText: "Download APK" }, type: 1 },
      { buttonId: `${usedPrefix}downloadobb ${appId}`, buttonText: { displayText: "Download OBB" }, type: 1 }
    ];

    const buttonMessage = {
      text: appInfoMessage,
      footer: 'Click the buttons below to download',
      buttons: buttons,
      headerType: 1
    };

    await conn.sendMessage(m.chat, buttonMessage, { quoted: m });

  } catch (error) {
    console.error(error);
    throw 'Error: Unable to fetch detailed app information. Please try again later.';
  }
};

appInfoHandler.command = /^(appinfo|appdetails)$/i;
appInfoHandler.help = ['appinfo <معرف التطبيق>', 'appdetails <معرف التطبيق>'];
appInfoHandler.tags = ['downloader'];

export default appInfoHandler;