import React from "react";
import Loading from "../../components/reusable/Loading";
import UserCard from "../../components/reusable/UserCard";
import { useGetUserQuery } from "../../features/user/userApi";

const Employers = () => {
  const { data, isLoading, isFetching } = useGetUserQuery();

  const users = data?.data || [];
  const filterEmployers = users.filter((user) => user.role === "employer");

  if(isLoading){
    return <Loading/>
}
  return (
    <div className="pt-14">
      <div className="bg-primary/10 p-5 rounded-2xl">
        <h1 className="font-semibold text-xl">Employers</h1>
      </div>
      <div className="grid grid-cols-2 gap-5 mt-5">
        {
            filterEmployers.map(employer => <UserCard userData={employer}></UserCard> )
        }
      </div>
    </div>
  );
};

export default Employers;
