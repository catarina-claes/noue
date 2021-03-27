module.exports = {
    name: ['help','onegai','tolong'],
    execute(client,msg,args){
        if(args[0] == 'dic')return client.sendMessage(msg.to,'kamus maybe...')
        if(args[0] == 'cv')return client.sendMessage(msg.to,'currency converting  arg 1 --> from...\narg 2 --> to...\narg3 --> amount')
        if(args[0] == 'tl')return client.sendMessage(msg.to,'untuk translate  default lang id|en\n(arg 1 == s) --> ngeset lang jadi arg2|arg3\n(arg 1 == r) --> ngeset lang jadi en|id')
        if(args[0] == 'yt')return client.sendMessage(msg.to,'nyari apake di youtube  semua argumen digabungin ngesearch youtube')
        if(args[0] == 'mt')return client.sendMessage(msg.to,'matematika... arg 1 --> operation\narg 2 --> expression')
        if(args[0] == 'anm')return client.sendMessage(msg.to,'nyari info ttg anime')
        if(args[0] == 'char')return client.sendMessage(msg.to,'nyari info ttg character anime')
        if(args[0] == 'fc')return client.sendMessage(msg.to,'untuk tau ramalan hujan,lupa cara pakenya gimana dah.. paling males tuh buat command help...')
        if(args[0] == 'sc')return client.sendMessage(msg.to,'untuk ngecheck spelling')
        if(args[0] == 'f')return client.sendMessage(msg.to,'ngasih reaksi anime. dh lupa bisa ngasih reaksi apa aja dah -_-')
        client.sendMessage(msg.to,`dic <--> dictionary\ncv <--> currency converter\ntl <--> translate\nyt <--> youtube\nmt <--> math solver\nmtall <--> math solver list`)
    }
}
