import React, { createContext, useReducer } from 'react'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import pollReducer from './reducers/pollReducer';
import initialState from './utils/initialState';
import PollListContainers from './containers/PollListContainer/PollListContainer';
import PollCreatetContainers from './containers/PollCreateContainer/PollCreateContainer';
import createPollReducer from './reducers/createPollReducer';
import PollContainer from './containers/PollContainer/PollContainer';

export const VoteContext = createContext<any>({} as any)
function App() {
  const [pollState, pollDispatch] = useReducer(pollReducer, {
    poll: initialState.poll,
    currentPoll: initialState.currentPoll
  });
  const [createPollState, createPollDispatch] = useReducer(createPollReducer, initialState.createPoll);
  const voteStateDispatch = { pollState, pollDispatch,createPollState,createPollDispatch };
    return (
        <VoteContext.Provider value={voteStateDispatch}>
          <BrowserRouter>
            <Routes>
                <Route path="/" element={<PollListContainers />} />
                <Route path="create" element={<PollCreatetContainers />} />
                <Route path="poll" element={<PollContainer />} />
            </Routes>
          </BrowserRouter>
      </VoteContext.Provider>
    )
}

export default App
