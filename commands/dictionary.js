var unirest = require("unirest");

module.exports = {
    name: ['dic','dictionary','kamus','jisho','arti','definisi'],
    execute(client,msg,args){
        let nn = 0;
        if(args[0]/1){nn = args[0] - 1;args.shift()}
        var req = unirest("GET", "https://mashape-community-urban-dictionary.p.rapidapi.com/define");
        req.query({"term": args.join` `});
        req.headers({
	        "x-rapidapi-key": "your api's key",
	        "x-rapidapi-host": "mashape-community-urban-dictionary.p.rapidapi.com",
	        "useQueryString": true
        });
        req.end(res=>{
		if(res.body.list == undefined)return
            if((nn > res.body.list.length) || (nn < 0)) nn = 0;
            if(res.error)return client.sendMessage(msg.to,'errorlah pak')
            if(res.body.list[0] == undefined)return client.sendMessage(msg.to,`That word doesn't exist in this world`)
            client.sendMessage(msg.to,`The Definition of ${args.join(' ').toUpperCase()} :\n`+res.body.list[nn].definition+`\n\nExample in Sentence :\n`+res.body.list[nn].example)});
    }
}
