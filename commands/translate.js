var unirest = require("unirest");

module.exports = {
    name: ['tl','translate','terjemah','terjemahkan'],
    execute(client,msg,args){
        let lang = 'id|en'
        if(args[0] == 's'){
            lang = `${args[1]}|${args[2]}`
            args.splice(0,3)
        }
        if(args[0] == 'r'){
            lang = 'en|id'
            args.shift()
        }
        var req = unirest("GET", "https://translated-mymemory---translation-memory.p.rapidapi.com/api/get");
        req.query({"langpair": lang,"q": args.join` `});
        req.headers({
        	"x-rapidapi-key": "3b18b63be3mshf3e29579172b51cp115d39jsn4d40dbf7cc95",
        	"x-rapidapi-host": "translated-mymemory---translation-memory.p.rapidapi.com",
        	"useQueryString": true
        });
        req.end(function (res) {
        	if (res.error)throw new Error(res.error)
            client.sendMessage(msg.from,res.body.responseData.translatedText)
        });
        
    }
}
