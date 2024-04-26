import React, { CSSProperties, memo, useContext, useEffect, useState } from 'react';
import PollItem from '../../components/PollItem';
import { VoteContext } from '../../App';
import { Poll } from '../../utils/vote.types';
import Loading from '../../components/Loading';
import { Link } from 'react-router-dom';
function PollListContainers() {
  const { pollState, pollDispatch,socket } = useContext(VoteContext);
  const {
    poll : {
      polls , loading
    }
  } = pollState;
  console.log(polls,loading);
  
  useEffect(() => {
    pollDispatch({type:'POLL_LIST_LOADING' , payload: null})
    socket.emit('FETCH_POLL_LIST_REQUEST');
    socket.on('FETCH_POLL_LIST_RESPONSE' , (data:any) => {
      console.log(data);
      pollDispatch({type:'POLL_DATA_FETCHED' , payload: data})
    })
  },[]);
  return (
    <div className="container-fluid list-container" >
      <div>
        {
          loading
        }
        {
          loading && <Loading />
        }
        {
         polls && polls.length > 0 && polls.map((poll: Poll,index: number) => {
            return <PollItem key={index} poll={poll}/>
          })
        }
        <div className="fab-container">
        <Link to="/create" className="fab">
            <button className="fab">+</button>
        </Link>
        </div>
      </div>
    </div>
  );
}

export default memo(PollListContainers);