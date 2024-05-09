import React, { createContext, useEffect, useReducer, useState } from 'react'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import pollReducer from './reducers/pollReducer';
import initialState from './utils/initialState';
import PollListContainers from './containers/PollListContainer/PollListContainer';
import { io } from "socket.io-client";
import PollResultContainer from './containers/PollResultContainer/PollResultContainer';
import Health from './components/Health';
const { REACT_APP_BACKEND_URL, REACT_APP_HOSTNAME } = process.env;

export const VoteContext = createContext<any>({} as any)
function App() {
  console.log(process.env);
  const [clientHostname] = useState(REACT_APP_HOSTNAME);
  const [hostname, setHostname] = useState('');
  const [socket] = useState(io(REACT_APP_BACKEND_URL || 'http://localhost:5001',{ transports: ['websocket'],upgrade: false } ));
  socket.on("connect", () => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
  });

  socket.on("disconnect", () => {
    console.log('disconnected', socket.id); // undefined
  });
  const [pollState, pollDispatch] = useReducer(pollReducer, {
    poll: initialState.poll,
    currentPoll: initialState.currentPoll
  });

  useEffect(() => {
    if (!socket.connected) {
      console.log('not conneted');
      return;
    }
    console.log('connected');
  }, [socket.connected]);
  
  const fetchHostname = async () => {
    const response = await fetch(`${REACT_APP_BACKEND_URL}/hostname`);
    const hostname = await response.text();
    setHostname(hostname);
    console.log(hostname);
  }

  useEffect(() => {
    fetchHostname();  
    return () => {
      socket.close();
    }
  },[]);
  const voteStateDispatch = { pollState, pollDispatch, socket };
  return (
    <VoteContext.Provider value={voteStateDispatch}>
      <BrowserRouter>
      <p className='server-details'>
          <p className='client-details'>
            <strong>Client Server: </strong> {clientHostname}
          </p>
          <p className='serv-details'>
          <strong>Backend Server: </strong>{hostname}
          </p>
        </p>
        <Routes>
          <Route path="/" element={<PollListContainers />} />
          <Route path="/result/:id" element={<PollResultContainer />} />
          <Route path="healthcheck" element={<Health />} />
        </Routes>
      </BrowserRouter>
    </VoteContext.Provider>
  )
}

export default App
