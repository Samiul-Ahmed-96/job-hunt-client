import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import uuid from "react-uuid";
import chatUser from "../assets/chat-user.png";
import { useGetUserQuery } from "../features/user/userApi";

const ChatSidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const { data, isLoading, isFetching } = useGetUserQuery();

  const users = data?.data || [];
  const filterEmployers = users.filter((user) => user.role === "employer");
  const filterCandidates = users.filter((user) => user.role === "candidate");

  return (
    <div className="bg-primary/10 lg:col-span-2 h-screen sticky top-0 sm:col-span-4">
      <ul className="flex flex-col gap-2 w-full h-full  p-3">
        <div className="flex lg:flex-row lg:justify-between lg:items-center sm:flex-col  my-1">
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
              className="hover:bg-primary items-center hover:text-white bg-primary/10 transition-all w-full block py-2 px-3 rounded-full capitalize"
            > 
              <img className="w-[20px] mr-2 inline-block" src={chatUser} alt="" />
              {candidate.firstName} {candidate.lastName}
            </Link>
          ))}
        {user.role == "candidate" &&
          filterEmployers.map((employer) => (
            <Link
              key={uuid()}
              to={`/chat/${employer._id}`}
              className="hover:bg-primary items-center hover:text-white bg-primary/10 transition-all w-full block py-2 px-3 rounded-full capitalize sm:text-sm"
            >
            <img className="w-[20px] mr-2 inline-block" src={chatUser} alt="" />
              {employer.firstName} {employer.lastName}
            </Link>
          ))}
      </ul>
    </div>
  );
};

export default ChatSidebar;
