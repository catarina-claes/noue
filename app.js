const fs = require('fs')
const {Client} = require('whatsapp-web.js')
const sessionData = require('./session.json')
const commandFiles = fs.readdirSync('./commands').filter(x => x.endsWith('js'))
const client = new Client({session:sessionData,puppeteer:{ args: ['--no-sandbox'] }})
const commands = []

for(file of commandFiles){
    const command = require(`./commands/${file}`)
    commands.push(command)
}
client.once('ready',()=>console.log(`i'm alive`))
client.on('message_create',msg=>{
    if(!msg.body.startsWith('!'))return
    if(!(msg.from == '6285798441009@c.us' || msg.from == '6285711795102@c.us'))return
        const args = msg.body.trim().slice(1).split(/ +/)
        const commandName = args.shift().toLowerCase()
        const command = commands.findIndex(x=>x.name.includes(commandName))
        if(command == -1)return
    try{
        commands[command].execute(client,msg,args)
    }catch(err){
        console.error(err)
    }
})
process.on('unhandledRejection',(reason,p)=>{
    console.error('Unhandled Rejection at : ',p,' reason : ',reason)
    process.exit(1)
})

client.initialize()
