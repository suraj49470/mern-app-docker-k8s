import React from 'react';

function PollListContainers() {
  return (
    <div className="container">
    <div className="mt-5">
          <div className="d-style bgc-white btn btn-brc-tp btn-outline-green btn-h-outline-green btn-a-outline-green w-100 my-2 py-3 shadow-sm border-2">
            <div className="row align-items-center">
              <div className="col-12 col-md-4">
                <h4 className="pt-3 text-170 text-600 text-green-d1 letter-spacing">
                  Pro Plan
                </h4>
    
                <div className="text-secondary-d2 text-120">
                  <div className="text-danger-m3 text-90 mr-1 ml-n4 pos-rel d-inline-block">
                    $<span className="text-150 deleted-text">30</span>
                    <span>
                        <span className="d-block rotate-45 position-l mt-n475 ml-35 fa-2x text-400 border-l-2 h-5 brc-dark-m1"></span>
                    </span>
                  </div>
                  <span className="align-text-bottom">$</span><span className="text-180">20</span> / month
                </div>
              </div>
    
              <ul className="list-unstyled mb-0 col-12 col-md-4 text-dark-l1 text-90 text-left my-4 my-md-0">
                <li>
                  <i className="fa fa-check text-success-m2 text-110 mr-2 mt-1"></i>
                  <span>
                    <span className="text-110">Everything in Basic...</span>
                  </span>
                </li>
    
                <li className="mt-25">
                  <i className="fa fa-check text-success-m2 text-110 mr-2 mt-1"></i>
                  <span className="text-110">
                    Non diam phasellus
                </span>
                </li>
    
                <li className="mt-25">
                  <i className="fa fa-check text-success-m2 text-110 mr-2 mt-1"></i>
                  <span className="text-110">
                    Tortor mauris
                </span>
                </li>
              </ul>
    
              <div className="col-12 col-md-4 text-center">
                <a href="#" className="f-n-hover btn btn-success btn-raised px-4 py-25 w-75 text-600">Get Started</a>
              </div>
            </div>
    
          </div>
        </div>
    </div>
    
  );
}

export default PollListContainers;