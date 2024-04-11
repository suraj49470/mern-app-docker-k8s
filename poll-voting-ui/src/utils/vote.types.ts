export type Poll = {
    objectId: string,
    poll_title:string,
    poll_options: PollOption[]
};

export type PollOption = {
	id:1,
    poll_id:string
	title:string,
};

export type currentPoll = {
    loading:boolean,
    poll: PollOption | undefined
};
export type initialStateType = {
    poll: {
        loading:boolean,
        polls: Poll[]
    },
    currentPoll: currentPoll
}
export type ActionType = {
    type: string,
    payload:any
}