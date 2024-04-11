import { initialStateType } from "./vote.types"

const initialState:initialStateType = {
    poll: {
        loading: false,
        polls: []
    },
    currentPoll: {
        loading: false,
        poll: undefined
    }
};
export default initialState;