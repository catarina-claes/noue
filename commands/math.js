var unirest = require("unirest");

module.exports = {
    name: ['mt','math'],
    execute(client,msg,args){
        var req = unirest('GET',`https://newton.now.sh/api/v2/${args[0]}/${args[1]}`)
        req.end(function(res){
            if(res.error)return client.sendMessage(msg.from,'Salah operasi nya!')
            client.sendMessage(msg.from,`Result : ${res.body.result}\nOperation : ${res.body.operation}\nExpression : ${res.body.expression}`)
        })
    }
}