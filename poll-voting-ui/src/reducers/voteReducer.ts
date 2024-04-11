import {
  CURRENT_POLL_LIST_LOADING,
  CURRENT_POLL_LIST_LOADING_FINISH,
  POLL_CREATED,
  POLL_DATA_FETCHED,
  POLL_LIST_LOADING,
  POLL_LIST_LOADING_FINISH,
} from "../utils/voteActions";
import { ActionType, initialStateType } from "../utils/vote.types";
 const voteReducer = (state: initialStateType, action: ActionType) => {
  switch (action.type) {
    case POLL_LIST_LOADING:
      return {
        ...state,
        poll: {
            loading: true,
            polls: []
        }
      };
    case POLL_LIST_LOADING_FINISH:
        return {
            ...state,
            poll: {
                loading: false,
                polls: []
            }
          };
    case POLL_DATA_FETCHED:
    return {
        ...state,
        poll: {
            ...state.poll,
            loading: false,
            polls: action.payload
        }
        };      
    case CURRENT_POLL_LIST_LOADING:
      return {
        ...state,
        currentPoll: {
          ...state.currentPoll,
          loading: true,
        },
      };
    case CURRENT_POLL_LIST_LOADING_FINISH:
      return {
        ...state,
        currentPoll: {
          ...state.currentPoll,
          loading: false,
        },
      };
    case POLL_CREATED:
    return {
        ...state,
        poll: {
            ...state.poll,
            polls: [
                ...state.poll.polls, action.payload
            ]
        }
    };  
    default:
      return state;
  }
};

export default voteReducer;
