export type Poll = {
    objectId: string | null,
    poll_title:string,
    poll_options: PollOptionType[]
};

export type PollOptionType = {
	id:number | null,
    option_id:string
	title:string,
};

export type currentPoll = {
    loading:boolean,
    poll: Poll | null
};
export type initialStateType = {
    poll: PollType,
    currentPoll: currentPoll,
    createPoll:createPoll
}
export type ActionType = {
    type: string,
    payload:any
}
export type createPoll = {
    title:string | null,
    options:PollOptionType[]
}

export type PollType = {
    loading:boolean,
    polls: Poll[]
};