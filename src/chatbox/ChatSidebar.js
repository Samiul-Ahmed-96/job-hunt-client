import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import uuid from "react-uuid";
import { useGetUserQuery } from "../features/user/userApi";

const ChatSidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const { data, isLoading, isFetching } = useGetUserQuery();

  const users = data?.data || [];
  const filterEmployers = users.filter((user) => user.role === "employer");
  const filterCandidates = users.filter((user) => user.role === "candidate");

  return (
    <div className="bg-primary/10 col-span-2 h-screen sticky top-0">
      <ul className="flex flex-col gap-2 w-full h-full  p-3">
        <div className="flex justify-between items-center text-primary my-1">
          <Link to="/" className="flex items-center">
            <FaChevronLeft />
            <h1>Back</h1>
          </Link>
          <h1 className="text-xl">Chat List</h1>
        </div>
        {user.role == "employer" &&
          filterCandidates.map((candidate) => (
            <Link
              key={uuid()}
              to={`/chat/${candidate._id}`}
              className="hover:bg-primary hover:text-white bg-primary/10 transition-all w-full block py-2 px-3 rounded-full"
            >
              {candidate.firstName} {candidate.lastName}
            </Link>
          ))}
        {user.role == "candidate" &&
          filterEmployers.map((employer) => (
            <Link
              key={uuid()}
              to={`/chat/${employer._id}`}
              className="hover:bg-primary hover:text-white bg-primary/10 transition-all w-full block py-2 px-3 rounded-full"
            >
              {employer.firstName} {employer.lastName}
            </Link>
          ))}
      </ul>
    </div>
  );
};

export default ChatSidebar;
