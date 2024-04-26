import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Poll } from '../utils/vote.types'


function checkPollExpiry(data: Date) {
  // Define the first date
  const date1: any = new Date();

  // Define the second date
  const date2: any = new Date(data);

  // Calculate the difference in milliseconds
  const differenceInMilliseconds = Math.abs(date1 - date2);

  // Convert milliseconds to hours
  const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);
  return differenceInHours < 24

}
function PollItem({ poll }: any) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const result = checkPollExpiry(poll.createdAt);
    setActive(result)
  }, []);
  return (
    <div className="d-style bgc-white btn btn-brc-tp btn-outline-green btn-h-outline-green btn-a-outline-green w-100 my-2 py-3 shadow-sm border-2">
      <div className="row align-items-center">
        <div className="col-12 col-md-4">
          <h4 className="pt-3 text-170 text-600 text-green-d1 letter-spacing text-capitalize">
            {poll.title}
          </h4>

          <div className="text-secondary-d2 text-120">
            {
              poll.total_votes
            } votes
          </div>
        </div>

        <ul className="list-unstyled mb-0 col-12 col-md-4 text-dark-l1 text-90 text-left my-4 my-md-0">


          <li>
            <span className={`badge ${active ? 'text-bg-success' : 'text-bg-danger'} `}>
              {
                active ? 'Active' : 'Expired'
              }
            </span>
          </li>

        </ul>

        <div className="col-12 col-md-4 text-center">
          <Link to={`/result/${poll._id}`} className="f-n-hover btn btn-success btn-raised px-4 py-25 w-75 text-600 list-btn">
              View Result
          </Link>
        </div>
      </div>

    </div>
  )
}

export default PollItem