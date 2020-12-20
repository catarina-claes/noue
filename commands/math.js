var unirest = require("unirest");

module.exports = {
    name: ['mt','math'],
    execute(client,msg,args){
        var req = unirest('GET',`https://newton.now.sh/api/v2/${args[0]}/${args[1]}`)
        req.end(function(res){
            if(res.error)return client.sendMessage(msg.to,'Ererere')
            client.sendMessage(msg.to,`Result : ${res.body.result}\nOperation : ${res.body.operation}\nExpression : ${res.body.expression}`)
        })
    }
}
