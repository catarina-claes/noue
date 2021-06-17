var unirest = require("unirest");

module.exports = {
    name: ['yt','youtube'],
    execute(client,msg,args){
        var req = unirest("GET", "https://youtube-search-results.p.rapidapi.com/youtube-search/");
        req.query({"q": args.join` `});
        req.headers({
        	"x-rapidapi-key": "your api's key",
        	"x-rapidapi-host": "youtube-search-results.p.rapidapi.com",
        	"useQueryString": true
        });
        req.end(function (res) {
            if (res.error) return client.sendMessage(msg.to,'Anda tidak diridhoi :v')
            if (res.body.items.length == 0)return client.sendMessage(msg.to,'masukin apake')
            if(res.body.items[0].type == 'search-refinements')res.body.items.shift()
            res.body.items.splice(3)
            res.body.items.forEach(x => {
                if(x.duration == undefined)return
                client.sendMessage(msg.to,`${x.title} (${x.duration})\n${x.id}`)
            });
        });
    }
}
