import React from 'react'

function PollResultItem({ option, color, total_votes }: any) {
    const { title, number_of_votes } = option;
    const vote_percentage = `${Math.round(number_of_votes === 0 ? 0 : (number_of_votes / total_votes) * 100)}%`;
    
    
    return (
        <div className='poll-seperator'>
            <strong className='text text-capitalize'>{option.title}</strong>
            <span className="pull-right per text text-capitalize">
                {
                    vote_percentage
                } 
            </span>
            <div className="progress progress-danger active pro">
                <div className="bar text-center text text-capitalize" style={{ "width": vote_percentage, background: color }}>
                    {number_of_votes} votes
                </div>
            </div>
        </div>
    )
}

export default PollResultItem