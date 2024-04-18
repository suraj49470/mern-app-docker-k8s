import React, { FormEvent, useContext, useEffect } from 'react';
import { PollOptionType } from '../../utils/vote.types';
import PollTitle from '../../components/PollTitle';
import PollAddOption from '../../components/PollAddOption';
import { VoteContext } from '../../App';
import PollOption from '../../components/PollOption';
import { v4 as uuidv4 } from 'uuid';
function PollCreatetContainers() {
  const { createPollDispatch, createPollState } = useContext(VoteContext);
  useEffect(() => {
    console.log('called once');
    createPollDispatch({type: 'CREATE_POLL'})
    return () => {
      console.log('cleaner');
      createPollDispatch({type: 'CLEAR_CREATE_POLL'})
    }
  }, []);
  const createPoll = (e: FormEvent) => {
    e.preventDefault();
    console.log(createPollState);
    
  };

  const addPollOption = (e: FormEvent) => {
    e.preventDefault();
    const pollOption: PollOptionType = {
      id: uuidv4(),
      title: '',
      option_id: ''
    }
    createPollDispatch({type: 'ADD_POLL_OPTION' , payload : pollOption})
  };
  const deletePollOption = (e: FormEvent, id: string) => {
    e.preventDefault();
    createPollDispatch({type: 'DELETE_POLL_OPTION' , payload : id})
  };

  const updateOption = (title:string , index:number) => {
    console.log(title,index);
    const payload = {
      index,
      title
    };
    createPollDispatch({type: 'UPDATE_POLL_OPTION' , payload})
  };

  const addPollTitle = (title: string) => {
    console.log(title);
    createPollDispatch({type: 'ADD_POLL_TITLE' , payload: title})
  }
  return (
    <div id="intro" className="bg-image shadow-2-strong">
      <div className="mask d-flex align-items-center h-100" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-5 col-md-8">
              <form className="bg-white rounded shadow-5-strong p-5 poll-container-padding">
                <h3 className='text text-center text-capitalize'>Create Poll</h3>
                <PollTitle addPollTitle={addPollTitle}/>
                {
                  createPollState && createPollState.options && createPollState.options.map((option: PollOptionType,index:number) => {
                    return <PollOption updateOption={updateOption} key={index} option={option} deletePollOption={deletePollOption} index={index} />; 
                  })
                }
                {
                  createPollState && createPollState.options && createPollState.options.length < 4 && <PollAddOption addPollOption={addPollOption} />
                }
                
                <button onClick={(e) => createPoll(e)} className="btn btn-primary btn-block" data-mdb-ripple-init>Create Poll</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PollCreatetContainers;