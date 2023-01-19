import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import JobCard from "../components/reusable/JobCard";
import Loading from "../components/reusable/Loading";
import { useGetJobQuery } from "../features/job/jobApi";

const Jobs = () => {
  const navigate = useNavigate();
  const { data : jobList, isFetching } = useGetJobQuery();
  const [jobs, setJobs] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setJobs(jobList?.data);
    const filteredData = jobList?.data.filter((coin) =>
      coin.position.toLowerCase().includes(searchTerm)
    );
    setJobs(filteredData);
  }, [searchTerm, jobList]);

  console.log(searchTerm);

  if (isFetching) return <Loading/>;

  return (
    <div className="pt-14 lg:px-0 md:px-4">
      <div className="bg-primary/10 p-5 rounded-2xl">
        <h1 className="font-semibold text-xl">Jobs</h1>
      </div>
      <div
        id="search-container"
        className="flex overflow-hidden my-10 items-center justify-between"
      >
      <h4 className="font-semibold text-xl">Find Jobs</h4>
      <input
          className="o w-1/3 bg-primary/10 text-lg px-5 border-none outline-none focus:ring-0"
          type="text"
          name="search"
          id="search"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search By Job Title"
        />
      </div>
      <div className="grid lg:grid-cols-3 gap-5 mt-5 md:grid-cols-2 sm:grid-cols-1 ">
        {jobs?.map((singleJob) => (
          <JobCard key={singleJob._id} jobData={singleJob} />
        ))}
      </div>
    </div>
  );
};

export default Jobs;
