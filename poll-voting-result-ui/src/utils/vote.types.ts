export type Poll = {
    objectId: string | null,
    title:string,
    total_votes: Number,
    poll_options: PollOptionType[]
};

export type PollOptionType = {
	id:number | null,
	title:string,
    number_of_votes: number
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
    options:PollOptionType[],
}

export type PollType = {
    loading:boolean,
    polls: Poll[]
};