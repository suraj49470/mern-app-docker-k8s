import { memo, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
const { REACT_APP_POLL_RESULT_URL } = process.env;

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
  console.log(poll);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const result = checkPollExpiry(poll.createdAt);
    setActive(result)
    console.log(result);
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
          <Link to={active ? `/poll/${poll._id}` : ''} className={`f-n-hover btn btn-primary btn-raised px-4 py-25 w-75 text-600 list-btn ${!active ? 'disabled' : ''}`}>Vote</Link>
          <Link target="_blank" rel="noopener noreferrer" to={`${REACT_APP_POLL_RESULT_URL}/result/${poll._id}`} className="f-n-hover btn btn-success btn-raised px-4 py-25 w-75 text-600 list-btn">
            View Result
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-up-right open-new" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"/>
                <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"/>
            </svg> 
          </Link>
        </div>
      </div>

    </div>
  )
}

export default memo(PollItem)