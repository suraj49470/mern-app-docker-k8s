import React, { memo } from 'react'

function Loading() {
    return (
        <div className="loading">
            <p>loading...</p>
        </div>
    )
}

export default memo(Loading); 