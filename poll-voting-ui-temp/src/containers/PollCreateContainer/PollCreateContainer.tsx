import React, { FormEvent, memo, useContext, useEffect } from 'react';
import { PollOptionType } from '../../utils/vote.types';
import PollTitle from '../../components/PollTitle';
import PollAddOption from '../../components/PollAddOption';
import { VoteContext } from '../../App';
import PollOption from '../../components/PollOption';
import { CREATE_POLL } from '../../utils/voteActions';
import { useNavigate } from 'react-router-dom';

function PollCreatetContainers() {
  const { createPollDispatch, createPollState, socket} = useContext(VoteContext);
  const navigate =  useNavigate();
  useEffect(() => {
    console.log('called once');
    createPollDispatch({ type: 'CREATE_POLL' })
    return () => {
      console.log('cleaner');
      createPollDispatch({ type: 'CLEAR_CREATE_POLL' })
    }
  }, []);

  useEffect(() => {
    socket.on('message' , (data:any) => {
      console.log(data);
      switch (data.type) {
        case 'SUCCESS':
          createPollDispatch({ type: 'CLEAR_CREATE_POLL' })
          navigate('/')
          break;
        case 'ERROR':
          console.log('error');
                    
          break;
      }
      
    });
    console.log('socker chamges');
    
  },[socket]);
  const createPoll = (e: FormEvent) => {
    e.preventDefault();
    socket.emit(CREATE_POLL , {
      ...createPollState , id:socket.id
    });
  };

  const addPollOption = (e: FormEvent) => {
    e.preventDefault();
    const pollOption: PollOptionType = {
      id: Math.floor(Date.now() / 1000),
      title: '',
      number_of_votes: 0
    }
    createPollDispatch({ type: 'ADD_POLL_OPTION', payload: pollOption })
  };
  const deletePollOption = (e: FormEvent, id: string) => {
    e.preventDefault();
    createPollDispatch({ type: 'DELETE_POLL_OPTION', payload: id })
  };

  const updateOption = (title: string, index: number) => {
    console.log(title, index);
    const payload = {
      index,
      title
    };
    createPollDispatch({ type: 'UPDATE_POLL_OPTION', payload })
  };

  const addPollTitle = (title: string) => {
    console.log(title);
    createPollDispatch({ type: 'ADD_POLL_TITLE', payload: title })
  }
  return (
    <div id="intro" className="bg-image shadow-2-strong">
      <div className="mask d-flex align-items-center h-100" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-5 col-md-8">
              <form className="bg-white rounded shadow-5-strong p-5 poll-container-padding">
                <h3 className='text text-center text-capitalize'>Create Poll</h3>
                <PollTitle title={createPollState.title} addPollTitle={addPollTitle} />
                {
                  createPollState && createPollState.options && createPollState.options.map((option: PollOptionType, index: number) => {
                    return <PollOption updateOption={updateOption} key={index} option={option} deletePollOption={deletePollOption} index={index} />;
                  })
                }
                {
                  createPollState && createPollState.options && createPollState.options.length < 4 && <PollAddOption addPollOption={addPollOption} />
                }
                <button onClick={(e) => createPoll(e)} disabled={createPollState.options.length <= 1 } className="btn btn-primary btn-block" data-mdb-ripple-init>Create Poll</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(PollCreatetContainers) ;