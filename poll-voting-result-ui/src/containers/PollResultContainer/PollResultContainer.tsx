import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { VoteContext } from '../../App';
import PollResultItem from '../../components/PollResultItem';
import Loading from '../../components/Loading';
import { CURRENT_POLL_LIST_LOADING, CURRENT_POLL_LIST_LOADING_FINISH } from '../../utils/voteActions';

function PollResultContainer() {
    const { id } = useParams();
    const location = useLocation();
    const [pollColor, setPollColor] = useState(['#025464', '#1B6B93', '#B31312', '#FFA41B']);
    const { pollState: {
        currentPoll: {
            loading, poll
        }
    }, pollDispatch, socket } = useContext(VoteContext);

    useEffect(() => {
        pollDispatch({ type: CURRENT_POLL_LIST_LOADING, payload: null });
        socket.emit('FETCH_CURRENT_POLL_REQUEST', id);
        socket.on('FETCH_CURRENT_POLL_RESPONSE', (data: any) => {
            pollDispatch({ type: CURRENT_POLL_LIST_LOADING_FINISH, payload: data });
        })
    }, []);

    useEffect(() => {
        console.log('Location changed!', location.pathname);
        const poll_id: string | undefined = id?.toString();
        localStorage.setItem('poll_id' , poll_id ? poll_id : '');
        socket.emit('join_result_room', id);
    }, [location]);

    return (
        <div id="intro" className="bg-image shadow-2-strong">
            <div className="mask d-flex align-items-center h-100" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
                <div className="container">
                    {
                        loading && <Loading />
                    }
                    {
                        !loading && poll &&
                        <div className="span6">
                            <h5 className='text text-capitalize'>{poll.title}</h5>
                            {
                                poll.options.map((option: any, index: number) => {
                                    return <PollResultItem key={index} total_votes={poll.total_votes} color={pollColor[index]} option={option} />
                                })
                            }
                            <p>
                                <a href="#" className="btn btn-large btn-success text text-capitalize">Total Votes : {poll.total_votes}</a>
                            </p>
                        </div>
                    }
                </div>
            </div>
        </div>



    )
}

export default PollResultContainer