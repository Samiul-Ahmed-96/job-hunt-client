import React from "react";
import { useSelector } from "react-redux";
import JobCard from "../../components/reusable/JobCard";
import Loading from "../../components/reusable/Loading";
import { useGetAppliedJobsQuery } from "../../features/job/jobApi";

const AppliedJobs = () => {
  const {
    user: { email },
  } = useSelector((state) => state.auth);
  const { data, isLoading } = useGetAppliedJobsQuery(email);

  if(isLoading){
    return <Loading/>
  }

  return (
    <div>
      <h1 className="my-5 text-primary font-semibold ">Applied Jobs</h1>
      <div className="grid grid-cols-2">
        {data?.data.map((job) => (
          <JobCard key={job._id} jobData={job}></JobCard>
        ))}
      </div>
    </div>
  );
};

export default AppliedJobs;
