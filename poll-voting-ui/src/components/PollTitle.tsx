import React, { FormEvent } from 'react'

function PollTitle({addPollTitle}: any) {
    return (
        <div className="form-outline mb-4" data-mdb-input-init>
            <label className="form-label" htmlFor="form1Example1"><b>Poll Title :</b></label>
            <input onChange={(e) => addPollTitle(e.target.value)} type="text" id="form1Example1" placeholder='Poll Title' className="form-control" />
        </div>
    )
}

export default PollTitle