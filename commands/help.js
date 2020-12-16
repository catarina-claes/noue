module.exports = {
    name: ['help','onegai','tolong'],
    execute(client,msg,args){
        if(args[0] == 'dic')return client.sendMessage(msg.from,'arg 1 --> pilihan definisi(defaultnya ada 10 definisi setiap kata)')
        if(args[0] == 'cv')return client.sendMessage(msg.from,'arg 1 --> from...\narg 2 --> to...\narg3 --> amount')
        if(args[0] == 'tl')return client.sendMessage(msg.from,'default lang id|en\n(arg 1 == s) --> ngeset lang jadi arg2|arg3\n(arg 1 == r) --> ngeset lang jadi en|id')
        if(args[0] == 'yt')return client.sendMessage(msg.from,'semua argumen digabungin ngesearch youtube')
        if(args[0] == 'mt')return client.sendMessage(msg.from,'arg 1 --> operation\narg 2 --> expression')
        client.sendMessage(msg.from,`dic <--> dictionary\ncv <--> currency converter\ntl <--> translate\nyt <--> youtube\nmt <--> math solver\nmtall <--> math solver list`)
    }
}