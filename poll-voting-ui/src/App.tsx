import React, { createContext, useReducer } from 'react'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import voteReducer from './reducers/voteReducer';
import initialState from './utils/initialState';
import PollListContainers from './containers/PollListContainer';
import PollCreatetContainers from './containers/PollCreateContainer';

export const VoteContext = createContext({});
function App() {
const [voteState, voteDispatch] = useReducer(voteReducer, initialState);
const voteStateDispatch = { voteState, voteDispatch };
  return (
      <VoteContext.Provider value={voteStateDispatch}>
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<PollListContainers />} />
              <Route path="create" element={<PollCreatetContainers />} />
          </Routes>
        </BrowserRouter>
    </VoteContext.Provider>
  )
}

export default App
