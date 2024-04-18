import React from 'react';
import PollItem from '../../components/PollItem';
function PollContainer() {
    return (
        <div className="poll-container">
        <div className="poll">
            <h3>Select an option below that you like best or something...</h3>
            <ul>
                <li><input name="poll_value" type="radio" value="option 1" />Option 1</li>
                <li><input name="poll_value" type="radio" value="option 1" />Option 2</li>
                <li><input name="poll_value" type="radio" value="option 1" />Option 1</li>
                <li><input name="poll_value" type="radio" value="option 1" />Option 2</li>
            </ul>
            <input type="submit" value="Submit" />

        </div>
        </div>
        
    )
}

export default PollContainer;