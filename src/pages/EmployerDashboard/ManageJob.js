import React from "react";
import { useSelector } from "react-redux";
import JobCard from "../../components/reusable/JobCard";
import { useGetJobQuery } from "../../features/job/jobApi";

const ManageJob = () => {
  const { user } = useSelector((state) => state.auth);
  const { data, isLoading } = useGetJobQuery();

  const jobs = data?.data || [];

  const filterEmployerJob = jobs.filter((job) => job?.email === user.email);
  console.log(filterEmployerJob);

  return (
    <div className="pt-14">
      <div className="bg-primary/10 p-5 rounded-2xl">
        <h1 className="font-semibold text-xl">Manage Job</h1>
      </div>
      <div className="grid grid-cols-2 gap-5 mt-5">
        {filterEmployerJob.map((job) => (
          <JobCard jobData={job}></JobCard>
        ))}
      </div>
    </div>
  );
};

export default ManageJob;
