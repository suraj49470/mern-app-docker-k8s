import {
  ActionType,
  PollOptionType,
  createPoll,
  initialStateType,
} from "../utils/vote.types";
import {
  ADD_POLL_OPTION,
  ADD_POLL_TITLE,
  CLEAR_CREATE_POLL,
  CREATE_POLL,
  DELETE_POLL_OPTION,
  UPDATE_POLL_OPTION,
} from "../utils/voteActions";

const createPollReducer = (state: createPoll, action: ActionType) => {
  switch (action.type) {
    case CREATE_POLL:
      return {
        ...state,
        title: null,
        options: [],
      };
    case ADD_POLL_TITLE:
      return {
        ...state,
        title: action.payload,
      };
    case ADD_POLL_OPTION:
      return {
        ...state,
        options: [...state?.options, action.payload],
      };
      break;
    case DELETE_POLL_OPTION:
      return {
        ...state,
        options: state.options.filter(
          (option: PollOptionType, index) => option.id !== action.payload
        ),
      };
      break;
    case UPDATE_POLL_OPTION:
      return {
        ...state,
        options: state.options.map((option: PollOptionType, index) => {
          if (index === action.payload.index) {
            return {
              ...option,
              title: action.payload.title,
            };
          }
          return option;
        }),
      };
      break;
    case CLEAR_CREATE_POLL:
      return {
        title: null,
        options: [],
      };
      break;

    default:
      return state;
  }
};

export default createPollReducer;
