import { useContext, useEffect } from 'react';
import PollItem from '../../components/PollItem';
import { VoteContext } from '../../App';
import { Poll } from '../../utils/vote.types';
import Loading from '../../components/Loading';
import { useLocation } from 'react-router-dom';
function PollListContainers() {
  const location = useLocation();
  const { pollState, pollDispatch,socket } = useContext(VoteContext);
  const {
    poll : {
      polls , loading
    }
  } = pollState;
  
  
  useEffect(() => {
    pollDispatch({type:'POLL_LIST_LOADING' , payload: null})
    socket.emit('FETCH_POLL_LIST_REQUEST');
    socket.on('FETCH_POLL_LIST_RESPONSE' , (data:any) => {
      console.log(data);
      
      pollDispatch({type:'POLL_DATA_FETCHED' , payload: data})
    })
  },[]);

  useEffect(() => {
    console.log('Location changed!', location.pathname)
    const id = localStorage.getItem('poll_id');
    socket.emit('leave_result_room', id);
    localStorage.removeItem('poll_id')
}, [location]);

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
      </div>
    </div>
  );
}

export default PollListContainers;