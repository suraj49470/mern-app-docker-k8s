import React, { createContext, useEffect, useReducer, useState } from 'react'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import pollReducer from './reducers/pollReducer';
import initialState from './utils/initialState';
import PollListContainers from './containers/PollListContainer/PollListContainer';
import { io } from "socket.io-client";
import PollResultContainer from './containers/PollResultContainer/PollResultContainer';
const { REACT_APP_BACKEND_URL } = process.env;

export const VoteContext = createContext<any>({} as any)
function App() {
  console.log(process.env);
  const [socket] = useState(io(REACT_APP_BACKEND_URL || 'http://localhost:5001'));
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

  const voteStateDispatch = { pollState, pollDispatch, socket };
  return (
    <VoteContext.Provider value={voteStateDispatch}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PollListContainers />} />
          <Route path="/result/:id" element={<PollResultContainer />} />
        </Routes>
      </BrowserRouter>
    </VoteContext.Provider>
  )
}

export default App
