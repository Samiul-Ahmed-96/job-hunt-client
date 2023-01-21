import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import chatUser from "../assets/chat-user.png";
import { useGetChatsQuery } from "../features/chat/chatApi";
import { useGetUserByIdQuery } from "../features/user/userApi";
import ChatInput from "./ChatInput";

const ChatArea = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { data } = useGetUserByIdQuery(id);
  const receiver = data?.data;
  const setRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView({ behavior: "smooth" });
    }
  }, []);
  console.log("rec", receiver?.email, "user", user?.email);

  const { data: chats } = useGetChatsQuery(id,{pollingInterval:3000});

  const allChats = chats?.data;

  const filterChats = allChats?.filter(
    (chat) =>
      (chat.sender == user?.email && chat.receiver == receiver?.email) ||
      (chat.sender == receiver?.email && chat.receiver == user?.email)
  );

  return (
    <div className="p-10">
      <div className="bg-primary/10 flex items-center p-5 rounded-2xl">
      <img className="w-[20px] mr-2 inline-block" src={chatUser} alt="" />
        <h1 className="font-semibold text-xl capitalize">
          {receiver?.firstName} {receiver?.lastName}
        </h1>
      </div>
      <div className=" mt-5 relative ">
        <div className="conversation  flex flex-col gap-5">
          {filterChats?.map((chat, index) => {
            const lastMessage = filterChats.length - 1 === index;
            return (
              <div key={chat._id} ref={lastMessage ? setRef : null}>
                <p
                  className={
                    chat?.sender === user?.email
                      ? "bg-primary/10 inline-block float-right py-1 px-3 rounded-full"
                      : "bg-primary float-left py-1 px-3 rounded-full text-white"
                  }
                >
                  
                  {chat?.message}
                </p>
              </div>
            );
          })}
        </div>
        <ChatInput />
      </div>
    </div>
  );
};

export default ChatArea;
