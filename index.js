const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const util = require('util');
const formidable = require('formidable');

const server = http.createServer(function(req,resp){
    //req.method.toLowerCase() //GET POST 
    //console.log(http.STATUS_CODES) //http.METHODS
    //console.log(req.headers);
    //console.log(req.url);
    let path = url.parse(req.url,true);
    //path.pathname, path.search, path.query - path ,Query string, query string object 
    //path.port, path.protocol, path.origin - all nulls
    resp.setHeader('Content-Type','application/json');
    resp.setHeader('Access-Control-Allow-Origin',"*");
    resp.writeHead(200,'OK'); //status code HTTP 200 OK/
    resp.write('The Response');


    //let dataObj = {"id":123,"name":"Abh","email":"email@email.com"};
    //let data = JSON.stringify(dataObj);
    //resp.end(data)
    resp.end('end of message')
});


server.listen(4000,function(){
    console.log('listening on port 4000')
})
