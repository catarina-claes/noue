var unirest = require("unirest");

module.exports = {
    name: ['sc','spellcheck'],
    execute(client,msg,args){
        var spell = args.join` `
        var req = unirest("POST", "https://jspell-checker.p.rapidapi.com/check");
        req.headers({
            "content-type": "application/json",
            "x-rapidapi-key": "your api's key",
            "x-rapidapi-host": "jspell-checker.p.rapidapi.com",
            "useQueryString": true
        });
        req.type("json");
        req.send({
            "language": "enUS",
            "fieldvalues": spell,
            "config": {
                "forceUpperCase": false,
                "ignoreIrregularCaps": false,
                "ignoreFirstCaps": true,
                "ignoreNumbers": true,
                "ignoreUpper": false,
                "ignoreDouble": false,
                "ignoreWordsWithNumbers": true
            }
        });
        
        req.end(function (res) {
            if (res.error) return client.sendMessage(msg.to,'ko error dong? anda masukin args apa?')
            if (res.body.spellingErrorCount == 0)return client.sendMessage(msg.to,'Masukin spellingnya bang!')
            if(args.length == 1){
                return client.sendMessage(msg.to,'The right one : \n'+res.body.elements[0].errors[0].suggestions.join`,`)
            }
            res.body.elements[0].errors.forEach(x => {
                let wrong = x.word
                let nice = x.suggestions[0]
                let berat = new RegExp(wrong,'g')
                spell = spell.replace(berat,nice)
            });
            client.sendMessage(msg.to,`Spell's wrong : ${res.body.spellingErrorCount}\n${spell}`)
        });
    }
}
