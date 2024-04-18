import React from 'react';
import PollItem from '../../components/PollItem';
function PollListContainers() {
  return (
    <div className="container-fluid list-container" >
      <div>
        <PollItem />
      </div>
    </div>
  );
}

export default PollListContainers;