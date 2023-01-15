import React from "react";
import { useNavigate } from "react-router-dom";
import JobCard from "../components/reusable/JobCard";
import { useGetJobQuery } from "../features/job/jobApi";

const Jobs = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetJobQuery();

  return (
    <div className="pt-14 lg:px-0 md:px-4">
      <div className="bg-primary/10 p-5 rounded-2xl">
        <h1 className="font-semibold text-xl">Find Jobs</h1>
      </div>
      <div className="grid lg:grid-cols-3 gap-5 mt-5 md:grid-cols-2 sm:grid-cols-1 ">
        {data?.data.map((singleJob) => (
          <JobCard key={singleJob._id} jobData={singleJob} />
        ))}
      </div>
    </div>
  );
};

export default Jobs;
