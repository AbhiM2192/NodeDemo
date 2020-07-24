'use strict';
const express = require('express');
const app = express();
const {sup,how} = require('./middle');
const cors = require('cors')

app.use(how) //adding middleware function on every call

app.get('/',sup,how,(req,res) =>{
    console.log(`requested url is ${req.url}`);
    console.log(req.url);
    console.log(req.ip);
    console.log(req.hostname);
    console.log(req.method); //get,post
    console.log(req.protocol); //http , https
    console.log(req.path); //just the path part of the url
    console.log(req.query); //querystring
    console.log(req.subdomains); //test.sales.example.com ['test','example]
    console.log(req.params); // /users/72  /products/234234
    //app.get('/users/:id') product('/products/:id')
    //req.params.id
    res.send('<h1>Hello from express server</h1>') //it will also determine the content-type automatically
});

app.get('/old',(req,res) =>{
    res.redirect(301,'/new');
});

app.get('/new',(req,res) =>{
    res.send('<h2>New Url for Old</h2>')
})

app.listen(3000,(error) =>{
    if(error){
        console.log(`problem ....${error}`)
    }

console.log(`listening on port 3000`)
})