const puppeteer = require('puppeteer');
const { WAConnection, MessageType } = require('@adiwajshing/baileys');

async function searchAndDownloadPDF(query) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('https://www.google.com');

    await page.type('input[name=q]', `${query} book filetype:pdf`);
    await page.keyboard.press('Enter');
    await page.waitForSelector('h3');

    const pdfLinks = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a'));
        return links.map(link => link.href).filter(href => href.endsWith('.pdf'));
    });

    if (pdfLinks.length > 0) {
        const response = await page.goto(pdfLinks[0]);
        const buffer = await response.buffer();
        await browser.close();
        return buffer;
    }

    await browser.close();
    throw new Error('No PDF found');
}

let handler = async (m, { conn, usedPrefix, command }) => {
    if (!m.quoted) return m.reply(`✳️ Use the command like this: *${usedPrefix + command}* book name`);
    let query = m.quoted.text;
    if (!query) return m.reply(`✳️ Please provide a valid book name`);

    try {
        const pdfBuffer = await searchAndDownloadPDF(query);
        await conn.sendMessage(m.key.remoteJid, pdfBuffer, MessageType.document, {
            mimetype: 'application/pdf',
            fileName: `${query}.pdf`
        });
        m.reply(`✅ Book downloaded and sent successfully`);
    } catch (err) {
        m.reply(`Error: ${err.message}`);
    }
};

handler.help = ['getbook']
handler.tags = ['tools']
handler.command = ['getbook']

module.exports = handler;

// Setup WhatsApp connection and initialize the handler
const startBot = async () => {
    const conn = new WAConnection();
    conn.on('open', () => {
        console.log('Connected');
    });

    conn.on('chat-update', async (chat) => {
        if (!chat.hasNewMessage) return;
        const m = chat.messages.all()[0];
        if (!m.message) return;
        
        const messageContent = m.message.conversation || m.message.extendedTextMessage?.text;
        if (messageContent && messageContent.startsWith('!getbook')) {
            await handler(m, { conn, usedPrefix: '!', command: 'getbook' });
        }
    });

    await conn.connect();
};

startBot();