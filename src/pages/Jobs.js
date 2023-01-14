import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import JobCard from "../components/reusable/JobCard";
import { useGetJobQuery } from "../features/job/jobApi";

const Jobs = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetJobQuery();
  const [jobs, setJobs] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  console.log(data);
  // job.position.toLowerCase().includes(searchTerm)
  useEffect(() => {
    setJobs(data?.data);
    const filteredData = data?.data.filter((job) =>
    console.log(job)
    );
    setJobs(filteredData);
  }, [searchTerm, jobs]);

  console.log(searchTerm ,jobs)
  return (
    <div className="pt-14 lg:px-0 md:px-4">
      <div className="bg-primary/10 p-5 rounded-2xl">
        <h1 className="font-semibold text-xl">Find Jobs</h1>
      </div>

      <div
        id="search-container"
        className="bg-white rounded-full p-3 flex w-full max-w-xl overflow-hidden mt-5  shadow-lg"
      >
        <input
          className="flex-auto text-lg p-2 border-none outline-none focus:ring-0"
          type="text"
          name="search"
          id="search"
          placeholder="Job title or Keyword"
          onChange={(e)=>setSearchTerm(e.target.value)}
        />
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
