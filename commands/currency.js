var unirest = require("unirest");

module.exports = {
    name: ['cv','convert'],
    execute(client,msg,args){
        var req = unirest("GET", "https://currency-converter13.p.rapidapi.com/convert");
        req.query({
            "from": args[0],
            "to": args[1],
            "amount": args[2]
        });
        req.headers({
            "x-rapidapi-key": "3b18b63be3mshf3e29579172b51cp115d39jsn4d40dbf7cc95",
            "x-rapidapi-host": "currency-converter13.p.rapidapi.com",
            "useQueryString": true
        });
        req.end(function (res) {
            if (res.error)return client.sendMessage(msg.from,'Mata uangnya salah pak')
            client.sendMessage(msg.from,`${res.body.amount.toFixed(2)} ${res.body.to}`)
        });}
}
