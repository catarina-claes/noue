var unirest = require('unirest')
var {MessageMedia} = require('whatsapp-web.js')
var itb = require('image-to-base64')
module.exports = {
    name: ['anm','anime'],
    execute(client,msg,args){
        let uniq = '/search/anime'
        if(args[0] == 'top'){
            if(args.length>2 && args[2] == 'm')return uniq = `/top/manga/1/${args[1]}`
            uniq = `/top/anime/1/${args[1]}`}
        if(args[0] == 'manga')uniq = '/search/manga'
        if(args[0] == 'char')uniq = '/search/character'
        if(args[0] == 'jadwal'){uniq = `/schedule/${args[1]}`}
        if(args[0] == 'upcoming')uniq = '/season/later'
        var req = unirest("GET",`https://jikan1.p.rapidapi.com/${uniq}`)
        if(/search/.test(uniq)){
            if(!(uniq == '/search/anime'))args.shift()
            req.query({
                "q":args.join` `
            })
        }
        req.headers({
            "x-rapidapi-key": "your api's key",
            "x-rapidapi-host": "jikan1.p.rapidapi.com",
            "useQueryString": true
        });
        req.end(function(res){
            if(res.error)return client.sendMessage(msg.to,'zz...')
            if(/search\/anime/.test(uniq)){
                itb(res.body.results[0].image_url).then(resss=>{
                    var media = new MessageMedia('image/png',resss)
                    client.sendMessage(msg.to,media,{caption:`${res.body.results[0].title}\n(${res.body.results[0].episodes})  (${res.body.results[0].score})  (${res.body.results[0].start_date.match(/..../)})\n${res.body.results[0].synopsis}`})
                }).catch(err=>{
                    console.error(err)
                })
            }
            if(/search\/manga/.test(uniq)){
                itb(res.body.results[0].image_url).then(resss=>{
                    var media = new MessageMedia('image/png',resss)
                    client.sendMessage(msg.to,media,{caption:`${res.body.results[0].title}\n(${res.body.results[0].valomues}.${res.body.results[0].chapters})  (${res.body.results[0].score})  (${res.body.results[0].start_date.match(/..../)})\nSynopsis : ${res.body.results[0].synopsis}`})
                }).catch(err=>{
                    console.error(err)
                })
            }
            if(/search\/character/.test(uniq)){
                let malid = res.body.results[0].mal_id
                var pict = unirest("GET", `https://jikan1.p.rapidapi.com/character/${malid}/pictures`);
                pict.headers({ "x-rapidapi-key": "your api's key",
                    "x-rapidapi-host": "jikan1.p.rapidapi.com",
                    "useQueryString": true});
                pict.end(function (ress) {
                    if (ress.error) return client.sendMessage(msg.to,'Salah nama kali?')
                    itb(ress.body.pictures[Math.floor(Math.random() * ress.body.pictures.length )].small).then(resss=>{
                        var media = new MessageMedia('image/png',resss)
                        client.sendMessage(msg.to,media)
                    }).catch(err=>{
                        console.error(err)
                    })
                    
                });
            }
            var conta = ''
            if(/top/.test(uniq)){
                for(let i = 0; i<10; i++){
                    conta = conta+`${i+1} : ${res.body.top[i].title}\n`
                }client.sendMessage(msg.to,conta)
            }
            if(/schedule/.test(uniq)){
                for(let i = 0,sched = args[1].toLowerCase();i<res.body[sched].length;i++){
                    conta = conta+`${i+1} : ${res.body[sched][i].title}\n`
                }client.sendMessage(msg.to,conta)
            }
            if(/season/.test(uniq)){
                for(let i = 0; i<10; i++){
                    conta = conta+`${i+1} : ${res.body.anime[i].title}\n`
                }client.sendMessage(msg.to,conta)
            }conta = ''
        })
    }
}
//top manga,top anime in airing,completed,upcoming {top,....,....}   =>   /top/anime/1/upcoming
//search anime (image,title,airing,sinopsis,rate,episode) {...}   =>   /search/anime  and  req.query({'q':'....'})
//search manga (image,title,publishing,sinopsis,rate,chapter,volume) {manga ...}  ---||---
//search characters (name,alternative name,anime,image) {char ...}   ---||---
//schedule (nnt masukin hari) {jadwal}   =>    /schedule/monday
//season later (yg bakal rilis nnt) {upcoming}  =>  /season/later
