const fs = require('fs')
const {Client} = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal')
const sessionData = require('./session.json')
//const commandFiles = fs.readdirSync('./commands').filter(x => x.endsWith('js'))
const client = new Client({session:sessionData})
//const commands = []

//for(file of commandFiles){
//    const command = require(`./commands/${file}`)
//    commands.push(command)
//}
//console.log(commands)
client.once('ready',()=>console.log(`i'm alive`))
client.on('message',msg=>{
    if(!(msg.from == '6285798441009@c.us'))return
    //const args = msg.body.trim().split(/ +/)
    //const commandName = args.shift().toLowerCase()
    //const command = commands.find(x=>x.name.includes(commandName))
    //if(!command)return
    try{
        client.sendMessage(msg.from,'Ohayo Sensei')
    }catch(err){
        console.error(`error: ${err}`)
    }
})

client.initialize()