import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const JobCard = ({ jobData }) => {
  const navigate = useNavigate();

  const {user} = useSelector(state => state.auth);

  const { _id, position, companyName, location, employmentType , applicants} =
    jobData || {};
  return (
    <div
      key={_id}
      className='border shadow-xl p-5 rounded-2xl'
    >
      <div className='flex justify-between'>
        <div>
          <p className='text-xl'>{position}</p>
          
          <small className='text-primary/70 '>
            by{" "}
            <span className='font-semibold hover:text-primary cursor-pointer hover:underline transition-all'>
              {companyName}
            </span>
          </small>
        </div>
        
        <p>{location}</p>
      </div>
      <div className='flex md:flex-row md:justify-between md:items-center mt-5 sm:flex-col sm:justify-start'>
        <p>{employmentType}</p>
        {
          user.role == "employer" && <p>Total Applied : {applicants.length}</p>
        }
        <button className='btn' onClick={() => navigate(`/job-details/${_id}`)}>
          Details
        </button>
      </div>
    </div>
  );
};

export default JobCard;