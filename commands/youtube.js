var unirest = require("unirest");

module.exports = {
    name: ['yt','youtube'],
    execute(client,msg,args){
        var req1 = unirest("GET", "https://youtube-search-results.p.rapidapi.com/youtube-search/");
        req1.query({"q": args.join` `});
        req1.headers({
        	"x-rapidapi-key": "3b18b63be3mshf3e29579172b51cp115d39jsn4d40dbf7cc95",
        	"x-rapidapi-host": "youtube-search-results.p.rapidapi.com",
        	"useQueryString": true
        });
        req1.end(function (res1) {
            if (res1.error) throw new Error(res1.error);
            res1.body.items.splice(3)
            res1.body.items.forEach(x => {
                if(x.duration == undefined)return;
                var req = unirest("GET", "https://youtube-to-mp32.p.rapidapi.com/yt_to_mp3");
                req.query({"video_id": x.id});
                req.headers({
                	"x-rapidapi-key": "3b18b63be3mshf3e29579172b51cp115d39jsn4d40dbf7cc95",
                	"x-rapidapi-host": "youtube-to-mp32.p.rapidapi.com",
                	"useQueryString": true
                });
                req.end(function (res) {
                	if (res.error) return client.sendMessage(msg.from,'Omoi...')
                    client.sendMessage(msg.from,`ID: ${x.id}\n${x.title} (${x.duration})\n${res.body.Download_url}`)
                });
            });
        });
    }
}

