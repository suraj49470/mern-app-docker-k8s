const db  = require("./connectDB");
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const mongoose = require('mongoose');
const { CREATE_POLL } = require("./actions");
const vote = require('./models/vote');
const crud = require('./utility/crud')
const app = express();
const clientsConnectedToPoll = {

};
app.get('/healthcheck' , (req,res) => {
    res.status(200).end('service healthy')
});
const httpServer = createServer(app);
const io = new Server(httpServer, { 
    cors:{
        origin:"*"
    }
});
io.on("connection", (socket) => {
  console.log(socket.id);
  
  socket.on(CREATE_POLL ,  async (data) => {
    const payload = {
        ...data,
        total_votes:0
    }
    try {
        const response = await crud.CREATE_POLL(payload);
        if(response){
            socket.emit('message', {type:'SUCCESS', data: response}); 
            const polls = await crud.GET_ALL_POLLS(); 
            console.log(polls);
            if(polls){
                socket.broadcast.emit('FETCH_POLL_LIST_RESPONSE',polls);
            }
            socket.broadcast.emit('SERVICE_TO_SERVICE_SYNC' , {
                type: 'CREATE',
                payload: null
            });  
        }
    } catch (e) {
            console.log(e.message);
            socket.emit('message', {type:'ERROR', data: e.message});
    }
        
    });

    socket.on('FETCH_POLL_LIST_REQUEST' , async () => {
        try {
            console.log('FETCH_POLL_LIST_REQUEST recieved');
            const response = await crud.GET_ALL_POLLS(); 
            if(response){
                socket.emit('FETCH_POLL_LIST_RESPONSE', response);    
            }   
        } catch (e) {
            console.log(e.message);
            socket.emit('message', {type:'ERROR', data: e.message});
        }
        
    });

    socket.on('FETCH_CURRENT_POLL_REQUEST' , async (id) => {
        try {
            console.log('FETCH_CURRENT_POLL_REQUEST recieved');
            const response = await crud.GET_POLL_BY_ID(id);  
            if(response){
                socket.emit('FETCH_CURRENT_POLL_RESPONSE', response);    
            } 
        } catch (e) {
            console.log(e.message);
            socket.emit('message', {type:'ERROR', data: e.message});
        }
    });

    socket.on('UPDATE_POLL_BY_ID_REQUEST' , async (payload) => {
        try {
            console.log('UPDATE_POLL_BY_ID_REQUEST recieved');
            const response = await crud.UPDATE_POLL_BY_ID(payload); 
            if(response && response.acknowledged && response.modifiedCount > 0 && response.matchedCount > 0){
                const polls = await crud.GET_ALL_POLLS(); 
                console.log(polls);
                if(polls){
                    socket.broadcast.emit('FETCH_POLL_LIST_RESPONSE',polls);
                }
                socket.emit('UPDATE_POLL_BY_ID_RESPONSE', {type:'SUCCESS' , data: 'Vote success'});  
                socket.broadcast.emit('SERVICE_TO_SERVICE_SYNC' , {
                    type: 'UPDATE',
                    payload: payload._id
                });  
                socket.broadcast.emit('SERVICE_TO_SERVICE_SYNC' , {
                    type: 'FETCH',
                    payload: null
                });  
            }  
        } catch (e) {
            console.log(e.message);
            socket.emit('message', {type:'ERROR', data: e.message});
        }
    });
  
    socket.on('disconnect' , () => {
        console.log('disconnected' , socket.id);
    })
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT , (err) => {
    if(err){
        console.log(err);
        return;
    }
    console.log(`server running on ${PORT}`);
});