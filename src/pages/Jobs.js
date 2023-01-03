import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetJobQuery } from "../features/job/jobApi";

const Jobs = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetJobQuery();

  return (
    <div className="pt-14">
      <div>
        {data?.data?.map((singleJob) => (
          <div
            className=" bg-primary/10 inline-block rounded p-10 mr-2 "
            key={singleJob._id}
          >
            <h1>Postion : {singleJob.position}</h1>
            <p>Company Name :{singleJob.companyName}</p>
            <h4>skills : </h4>
            {singleJob?.skills.map((skill) => (
              <p className="inline-block bg-white rounded mr-2 p-2 my-2" key={skill}>
                {skill}
              </p>
            ))}
            <h4>Requirements : </h4>
            {singleJob?.requirements.map((requirement) => (
              <p
                className="inline-block bg-white rounded mr-2 p-2 my-2"
                key={requirement}
              >
                {requirement}
              </p>
            ))} 

            <button
              className="border-primary border-2 border-solid p-2 mt-4 rounded hover:bg-white block"
              onClick={() => navigate(`/job-details/${singleJob?._id}`)}
            >
              Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
