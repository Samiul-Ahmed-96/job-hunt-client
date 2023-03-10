import React from "react";
import Loading from "../../components/reusable/Loading";
import UserCard from "../../components/reusable/UserCard";
import { useGetUserQuery } from "../../features/user/userApi";

const Candidates = () => {
  const { data, isLoading, isFetching } = useGetUserQuery();

  const users = data?.data || [];
  const filterCandidates = users.filter((user) => user.role === "candidate");

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="pt-14 lg:px-0 md:px-4">
      <div className="bg-primary/10 p-5 rounded-2xl">
        <h1 className="font-semibold text-xl">Candidates</h1>
      </div>
      <div className="grid lg:grid-cols-3 gap-5 mt-5 md:grid-cols-2 sm:grid-cols-1 ">
        {filterCandidates.map((candidate) => (
          <UserCard userData={candidate}></UserCard>
        ))}
      </div>
    </div>
  );
};

export default Candidates;
