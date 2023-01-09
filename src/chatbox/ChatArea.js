import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetChatsQuery } from "../features/chat/chatApi";
import { useGetUserByIdQuery } from "../features/user/userApi";
import ChatInput from "./ChatInput";

const ChatArea = () => {
  const { id } = useParams();
  const {user} = useSelector(state => state.auth)
  const { data } = useGetUserByIdQuery(id);
  const receiver = data?.data;

  const { data: chats } = useGetChatsQuery();

  const allChats = chats?.data;


  return (
    <div className="p-10">
      <div className="bg-primary/10 p-5 rounded-2xl">
        <h1 className="font-semibold text-xl">
          {receiver?.firstName} {receiver?.lastName}
        </h1>
      </div>
      <div className="grid gap-5 mt-5 relative">
        {allChats?.map((chat) => (
          <div key={chat._id} >
            <p className={chat?.sender === user.email ? 'bg-primary/10 inline-block float-right py-1 px-3 rounded-full' : 'bg-teal-200 float-left py-1 px-3 rounded-full'}>{chat?.message}</p>
          </div>
        ))}
        <ChatInput />
      </div>
    </div>
  );
};

export default ChatArea;
