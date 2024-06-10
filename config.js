import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk' 
import { fileURLToPath } from 'url' 

global.owner = [
  ['+212 696-262219', 'majnon', true],
  ['']
] //Numeros de owner 

global.mods = [''] 
global.prems = ['', '']
global.APIs = { // API Prefix
  // name: 'https://website' 
  nrtm: 'https://fg-nrtm.ddns.net',
  fgmods: 'https://api.fgmods.xyz'
}
global.APIKeys = { // APIKey Here
  // 'https://website': 'apikey'
  'https://api.fgmods.xyz': 'm2XBbNvz' //-- 100 de límite diario --- Regístrese en https://api.fgmods.xyz/
}

// Sticker WM
global.packname = 'Jeen-md' 
global.author = 'majnon' 

//--info FG
global.botName = 'Jenn'
global.fgig = 'https://instagram.com/majnon._.98' 
global.fgsc = 'https://github.com/' 
global.fgyt = ''
global.fgpyp = ''
global.fglog = 'https://i.ibb.co/1zdz2j3/logo.jpgs' 

//--- Grupos WA
global.id_canal = '120363177092661333@newsletter' //-ID de canal de WhatsApp
global.fgcanal = 'https://whatsapp.com/channel/0029Vae5S5aBVJl6vQR65f2r'
global.bgp = 'https://chat.whatsapp.com/FbHtK7u1Vft8ib0P6CxGHe'
global.bgp2 = 'https://chat.whatsapp.com/FbHtK7u1Vft8ib0P6CxGHe'
global.bgp3 = 'https://chat.whatsapp.com/FbHtK7u1Vft8ib0P6CxGHe' //--GP NSFW

global.wait = '⌛ please waitt..._\n*▬▬▬▭*'
global.rwait = '⌛'
global.dmoji = '🤭'
global.done = '✅'
global.error = '❌' 
global.xmoji = '🔥' 

global.multiplier = 69 
global.maxwarn = '2' // máxima advertencias

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})
