import fetch from 'node-fetch';
import JavaScriptObfuscator from 'javascript-obfuscator';

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
    if (!text) throw `Usage: ${usedPrefix}${command} <JavaScript code>`;
    try {
        conn.sendPresenceUpdate('composing', m.chat);
        
        // تكوين خيارات التشفير
        const obfuscationOptions = {
            compact: true,
            controlFlowFlattening: true,
            controlFlowFlatteningThreshold: 0.75,
            numbersToExpressions: true,
            simplify: true,
            stringArray: true,
            stringArrayEncoding: ['base64', 'rc4'],
            stringArrayThreshold: 0.75,
            unicodeEscapeSequence: true,
            splitStrings: true,
            splitStringsChunkLength: 10,
        };
        
        // تشفير النص باستخدام مكتبة javascript-obfuscator للمرة الأولى
        let firstObfuscation = JavaScriptObfuscator.obfuscate(text, obfuscationOptions).getObfuscatedCode();
        
        // تشفير النص المشفر للمرة الثانية
        let secondObfuscation = JavaScriptObfuscator.obfuscate(firstObfuscation, obfuscationOptions).getObfuscatedCode();
        
        // إرسال النص المشفر كإجابة
        await m.reply(secondObfuscation);
        
    } catch (error) {
        console.error(error);
        m.reply('An error occurred while processing the request.');
    }
};

handler.command = /^(js)$/i;
export default handler;