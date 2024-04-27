import { createContext, useEffect, useReducer, useState } from 'react'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import pollReducer from './reducers/pollReducer';
import initialState from './utils/initialState';
import PollListContainers from './containers/PollListContainer/PollListContainer';
import PollCreatetContainers from './containers/PollCreateContainer/PollCreateContainer';
import createPollReducer from './reducers/createPollReducer';
import PollContainer from './containers/PollContainer/PollContainer';
import { io } from "socket.io-client";
const { REACT_APP_BACKEND_URL } = process.env;
export const VoteContext = createContext<any>({} as any)
function App() {
  const [socket] = useState(io(REACT_APP_BACKEND_URL || 'http://localhost:5000'));
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
  const [createPollState, createPollDispatch] = useReducer(createPollReducer, initialState.createPoll);
  const voteStateDispatch = { pollState, pollDispatch, createPollState, createPollDispatch, socket };
  useEffect(() => {
    if (!socket.connected) {
      console.log('not conneted');
      return;
    }
    console.log('connected');
  }, [socket.connected]);



  return (
    <VoteContext.Provider value={voteStateDispatch}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PollListContainers />} />
          <Route path="create" element={<PollCreatetContainers />} />
          <Route path="poll/:poll_id" element={<PollContainer />} />
        </Routes>
      </BrowserRouter>
    </VoteContext.Provider>
  )
}

export default App
