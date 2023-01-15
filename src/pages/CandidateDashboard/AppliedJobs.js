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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="pt-6 md:mx-12 sm:mx-6">
      <div className="bg-primary/10 p-5 rounded-2xl">
        <h1 className="font-semibold text-xl">Applied Jobs</h1>
      </div>
      <div className="grid lg:grid-cols-3 gap-5 mt-5 md:grid-cols-2 sm:grid-cols-1 ">
        {data?.data.map((job) => (
          <JobCard key={job._id} jobData={job}></JobCard>
        ))}
      </div>
    </div>
  );
};

export default AppliedJobs;
