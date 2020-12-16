//for the first,please rewrite the session.json
const fs = require('fs')
const {Client} = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal')
const session_path = './session.json'

const client = new Client({})

client.on('qr',qr=>{
    qrcode.generate(qr,{small:true})
})

client.on('authenticated',session=>{
    fs.writeFile(session_path, JSON.stringify(session),function(err){
        if(err)console.error(err)
    })
})


client.initialize()