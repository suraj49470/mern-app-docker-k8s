import { initialStateType } from "./vote.types"

const initialState:initialStateType = {
    poll: {
        loading: false,
        polls: []
    },
    currentPoll: {
        loading: false,
        poll: null
    },
    createPoll: {
        options:[],
        title:null,

    }
};
export default initialState;