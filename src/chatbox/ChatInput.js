import React, { useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { usePostChatMutation } from "../features/chat/chatApi";
import { useGetUserByIdQuery } from "../features/user/userApi";

const ChatInput = () => {
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { data } = useGetUserByIdQuery(id);

  const [postChat , {isLoading,isSuccess}] = usePostChatMutation();

  const sender = user.email;
  const receiver = data?.data.email;

  console.log(sender, receiver);

  const handleSubmitMessage = () =>{
   const data  = {
      sender,
      receiver,
      message
    }
    postChat(data);
  }

  return (
    <div className="fixed bottom-10 right-10 flex">
      <input onBlur={(e)=>setMessage(e.target.value)} className="mr-3" type="text" placeholder="Text.." />
      <button onClick={()=>handleSubmitMessage()} className="bg-primary/10 p-4 rounded-full flex items-center hover:bg-primary hover:text-white gap-1">
        Send <AiOutlineSend />
      </button>
    </div>
  );
};

export default ChatInput;
