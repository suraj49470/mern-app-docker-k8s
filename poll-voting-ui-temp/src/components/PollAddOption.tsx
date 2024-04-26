import React, { memo } from 'react'

function PollAddOption({addPollOption}: any) {
   
    return (
        <div className="form-outline mb-4 text-left" data-mdb-input-init>
            <button type="button" onClick={(e) => addPollOption(e)} className='btn btn-link addOption'>+ Add Option</button>
        </div>
    )
}

export default memo(PollAddOption) 