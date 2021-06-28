var unirest = require('unirest')

module.exports = {
    name: ['fc','forecast'],
    execute(client,msg,args){
        var req = unirest("GET", "https://community-open-weather-map.p.rapidapi.com/forecast");
        var jam = 0;
        if(args[0]/1){
            jam = Math.ceil(args.shift() / 3)-1;
            if((jam<0)||(jam>39))return client.sendMessage(msg.to,'Maaf,tapi gw gk bisa meramal masa lalu :d')
        }
        req.query({"q": args.join` `});
        req.headers({
            "x-rapidapi-key": "3b18b63be3mshf3e29579172b51cp115d39jsn4d40dbf7cc95",
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
            "useQueryString": true
        });
        req.end(function (res) {
            if (res.error) return client.sendMessage(msg.to,'A..')
            client.sendMessage(msg.to,`Weather : ${res.body.list[jam].weather[0].description}\ntemp : ${(res.body.list[jam].main.temp - 273.15).toFixed(2)}\nwind : ${res.body.list[jam].wind.speed}`);
        });
    }

}
