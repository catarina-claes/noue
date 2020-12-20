module.exports = {
    name: ['mtall','mathall'],
    execute(client,msg,args){
        client.sendMessage(msg.to,`Simplify <--> /simplify/2^2+2(2) <--> 8\nFactor <--> /factor/x^2 + 2x <--> x (x + 2)\nDerive <--> /derive/x^2+2x <--> 2 x + 2\nIntegrate <--> /integrate/x^2+2x <--> 1/3 x^3 + x^2 + C\nFind 0's <--> /zeroes/x^2+2x <--> [-2, 0]\nFind Tangent <--> /tangent/2lx^3 <--> 12 x + -16\nArea Under Curve <--> /area/2:4lx^3 <--> 60\nCosine <--> /cos/pi <--> -1\nSine <--> /sin/0 <--> 0\nTangent <--> /tan/0 <--> 0\nInverse Cosine <--> /arccos/1 <--> 0\nInverse Sine <--> /arcsin/0 <--> 0\nInverse Tangent <--> /arctan/0 <--> 0\nAbsolute Value <--> /abs/-1 <--> 1\nLogarithm <--> /log/2l8 <--> 3`)
    }
}
