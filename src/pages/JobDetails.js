import React from "react";

import { useNavigate, useParams } from "react-router-dom";
import { useGetJobByIdQuery } from "../features/job/jobApi";

const JobDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  console.log(id);

  const { data, isLoading, isError } = useGetJobByIdQuery(id);
  const {
    position,
    companyName,
    employmentType,
    experience,
    location,
    requirements,
    responsibilities,
    salaryRange,
    skills,
    workLevel,
  } = data?.data || {};
  return (
    <div className="pt-14 ">
      {
        isLoading == false && <div className="job-details bg-primary/10  inline-block rounded p-10 ">
        <h1>Postion : {position}</h1>
        <h2>Comapany Name : {companyName}</h2>
        <h4>Employment Type : {employmentType}</h4>
        <h4>Experience : {experience}</h4>
        <h4>Location : {location}</h4>
        <h5>Salary Rang : {salaryRange}</h5>
        <h4>Skills : </h4>
        {
          skills.map(skillItem => <p className="inline-block bg-white rounded mr-2 p-2 my-2" key={skillItem}>{skillItem}</p> )
        }
        <h4>Requirements : </h4>
        {
          requirements.map(requirementsItem => <p className="block bg-white rounded mr-2 p-2 my-2" key={requirementsItem}>{requirementsItem}</p> )
        }
  
        <button className="border-primary border-2 border-solid p-2 mt-4 rounded hover:bg-white block">Apply</button>
        </div>
      }
    </div>
  );
};

export default JobDetails;
