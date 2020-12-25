var unirest = require('unirest')
var {MessageMedia} = require('whatsapp-web.js')
var itb = require('image-to-base64')

module.exports = {
    name: ['f','face'],
    execute(client,msg,args){
        if(args.length == 0 ){
            var req = unirest('GET','https://anime-reactions.uzairashraf.dev/api/categories')
            return req.end(res=>{
                client.sendMessage(msg.to,res.body.join` | `)
            })
        }
        var req = unirest('GET','https://anime-reactions.uzairashraf.dev/api/reactions/random')
        req.query({'category':args[0]})
        req.headers({'useQueryString':true})
        req.end(function(res){
            if(res.err)return client.sendMessage(msg.to,'Please send a valid candy!')
            itb(res.body.reaction).then(ress=>{
                var media = new MessageMedia('image/png',ress)
                client.sendMessage(msg.to,media)
            }).catch(err=>{
                client.sendMessage(msg.to,'Please send a valid candy!')
            })
        })
    }
}
