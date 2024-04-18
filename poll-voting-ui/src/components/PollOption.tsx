import React from 'react'
import image from '../images/delete.svg';
function PollOption({option,deletePollOption , index , updateOption}: any) {
    console.log(option);
    
    return (
        <div className="form-outline mb-4" data-mdb-input-init>
            <label className="form-label" htmlFor="form1Example2"><b>Poll Option {index+1} :</b> </label>
            <div className='poll-flex'>
                <input onChange={(e) => updateOption(e.target.value,index)} value={option.title} type="text" id="form1Example2" placeholder='Poll Option' className="form-control" />
                <button className='btn btn-link' onClick={(e) => deletePollOption(e,option.id)}>
                    <img src={image}/>
                </button>
            </div>

        </div>
    )
}

export default PollOption