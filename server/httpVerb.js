'use strict'
const data = require('./data');
const express = require('express');
const app = express();

app.use(express.json());

app.get('/api/channel',(req,res) =>{
    //returns the list of channels
    res.json(data);
    console.log('get',data.channels)
});

app.get('/api/channel/:id',(req,res) =>{
    //return specific channel
    let obj = data.channels.find(item => item.id ==parseInt(req.params.id));
    res.json(obj);
    console.log('get',obj);
})

app.post('/api/channel',(req,res) =>{
    //add new channel then return new list
    let {name} = req.body;
    console.log(req.body);
    let id = data.channels.reduce((prev,cuurent) =>{
        return prev < cuurent.id ? cuurent.id : prev;
    },0) +1;
    let last_update = Date.now();
    let obj = {id,name,last_update};
    data.channels.push(obj);
    res.status(201).json(obj);
    console.log('POST',data.channels);
})

app.put('/api/channel/:id',(req,res) =>{
    //replace a channel based on id 
    //respond with 200 or 204
    //202 if operation is async and still pending 
    //Basically an update but we could also do an insert if the id is unavailable 
    let id = parseInt(req.params.id);
    let name = req.body.name;
    let last_update = Date.now();
    let idx = data.channels.findIndex(item => item.id == id);
    if(idx >= 0){
        data.channels[idx].name = name;
        data.channels[idx].last_update = last_update;
        res.status(200).json(data.channels[idx]);
        console.log('put data present',data.channels);
    }else{
        let id_new = data.channels.length +1;
        let obj = {id_new,name,last_update}
        data.channels.push(obj);
        res.status(200).json(obj);
        console.log('put added new',data.channels)
    }
});

app.patch("/api/channel/:id", (req, res) => {
    //edit a channel
    // respond with 200 or 204
    // 202 if the operation is async and still pending
    let id = parseInt(req.params.id);
    let name = req.body.name;
    let last_update = Date.now();
    let idx = data.channels.findIndex(item => item.id === id);
    data.channels[idx].name = name;
    data.channels[idx].last_update = last_update;
    res.status(200).json(obj);
    console.log("PATCH", data.channels);
  });

  app.delete("/api/channel/:id", (req, res) => {
    //delete a channel
    //respond with 200 or 204
    // 202 if the operation is async and still pending
    let id = req.params.id;
    data.channels = data.channels.filter(item => item.id !== id);
    res.status(204).end();
    console.log("DELETE", data.channels);
  });

  app.head("/api/channel", (req, res) => {
    //return same headers as get. no content. to check that endpoint is functional
    res.status(200).end();
  });

  app.options("/api/channel", (req, res) => {
    //return headers including ALLOW to say what methods are allowed
    res.status(200);
    res.set("Allow", "GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD");
    res.set("Access-Control-Allow-Origin", "*"); //cors
    res.set("Content-Length", "0");
    res.end();
  });

  app.listen(3000, err => {
    if (err) {
      return console.log(err);
    }
    console.log("listening on port", 3000);
  });