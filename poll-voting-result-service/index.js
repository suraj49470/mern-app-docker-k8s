const db  = require("./connectDB");
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const mongoose = require('mongoose');
const { CREATE_POLL } = require("./actions");
const vote = require('./models/vote');
const crud = require('./utility/crud')
const app = express();
const sc = require('socket.io-client');
const myClientList = {};

const httpServer = createServer(app);
const socket_client = sc.io(process.env.POLL_VOTING_SERVICE);
const io = new Server(httpServer, { 
    cors:{
        origin:"*"
    }
});
app.get('/healthcheck' , (req,res) => {
    res.status(200).end('service healthy')
});
io.on("connection", (socket) => {
  console.log(socket.id);
  //myClientList[socket.id] = socket;   
  socket.on('FETCH_POLL_LIST_REQUEST' , async () => {
        try {
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
            const response = await crud.GET_POLL_BY_ID(id);    
            if(response){
                socket.emit('FETCH_CURRENT_POLL_RESPONSE', response);    
            }
        } catch (e) {
            console.log(e.message);
            socket.emit('message', {type:'ERROR', data: e.message});
        }
        
    });

    socket.on('join_result_room' , (id) => {
        socket.join(id)
    });

    socket.on('leave_result_room' , (id) => {
        socket.leave(id)
    });
    
    socket.on('disconnect' , () => {
        console.log('disconnected' , socket.id);
        //delete myClientList[socket.id];
    })
});

socket_client.on('connect', () => {
    console.log(socket_client.id);
}).on('disconnect' , () => {
    console.log('disconnected' , socket_client.id);
});

socket_client.on('SERVICE_TO_SERVICE_SYNC' , async (action) => {
    console.log(action);
    switch (action.type) {
        case 'CREATE': 
        case 'FETCH':
            // io.emit('FETCH_POLL_LIST_REQUEST');
            // console.log('poll created');
            console.log('in FETCH CREATE');
            try{
                const result = await crud.GET_ALL_POLLS();
                console.log(result);
                if(result){
                    io.emit('FETCH_POLL_LIST_RESPONSE' , result);
                }
            }catch(e){
                console.log(e.message);
                socket.emit('message', {type:'ERROR', data: e.message});
            }
            break;
        case 'UPDATE':
            console.log('in UPDATE');
            // const connectedIds = Object.keys(myClientList);
            // console.log(myClientList[connectedIds[0]])
            // myClientList[connectedIds[0]].emit('FETCH_CURRENT_POLL_RESPONSE' , 'sadfghfdf')
            try{
                const result = await crud.GET_POLL_BY_ID(action.payload);
                if(result){
                    io.to(action.payload).emit('FETCH_CURRENT_POLL_RESPONSE' , result)
                }
            }catch(e) {
                    io.to(action.payload).emit('message', {type:'ERROR', data: e.message});
            }
            break;
    }
});


const PORT = process.env.PORT || 5001;
httpServer.listen(PORT , (err) => {
    if(err){
        console.log(err);
        return;
    }
    console.log(`server running on ${PORT}`);
});