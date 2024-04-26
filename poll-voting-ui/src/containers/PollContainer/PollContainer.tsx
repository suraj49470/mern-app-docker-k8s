import React, { memo, useContext, useEffect, useState } from 'react';
import { VoteContext } from '../../App';
import { useParams } from 'react-router-dom';

function PollContainer() {
    const { pollState, pollDispatch, socket } = useContext(VoteContext);
    const { poll_id } = useParams();
    const [payload , setPayload] = useState<any>(null);
    const {
        currentPoll : {
            poll , loading
        }
    } = pollState;
    const selectedOption = (id:string) => {
        setPayload({
            _id: poll._id ,
            id
        });
    }
    const vote = () => {
        socket.emit('UPDATE_POLL_BY_ID_REQUEST' , payload);
        socket.on('UPDATE_POLL_BY_ID_RESPONSE', (data: any) => {
            console.log(data);
            setPayload(null);
            //pollDispatch({ type: 'CURRENT_POLL_LIST_LOADING_FINISH', payload: data })
        });
    }
    useEffect(() => {
        pollDispatch({ type: 'CURRENT_POLL_LIST_LOADING', payload: null })
        socket.emit('FETCH_CURRENT_POLL_REQUEST' , poll_id);
        socket.on('FETCH_CURRENT_POLL_RESPONSE', (data: any) => {
            pollDispatch({ type: 'CURRENT_POLL_LIST_LOADING_FINISH', payload: data })
        });
    }, []);

    return (
        <div className="poll-container">
            <div className="poll">
                <h3 className="text text-capitalize">{poll && poll.title}</h3>
                <ul>
                    {
                        poll && poll.options.map((poll: any,index: number) => {
                           return <li className="text text-capitalize" key={index}>
                                        <input onChange={() => selectedOption(poll.id)} name="poll_value" type="radio" value={poll.title} />
                                        {poll.title}
                                  </li>
                        })
                    }
                </ul>
                <button disabled={!payload} value="Submit" onClick={() => vote()}>
                    Vote
                </button>

            </div>
        </div>

    )
}

export default memo(PollContainer);