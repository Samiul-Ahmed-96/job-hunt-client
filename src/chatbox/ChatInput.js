import React, { useState } from "react";
import { useForm } from "react-hook-form";
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

  const [postChat, { isLoading, isSuccess }] = usePostChatMutation();
  const { register, handleSubmit, reset} = useForm();

  const sender = user.email;
  const receiver = data?.data.email;


  const handleSubmitMessage = ({text}) => {
    const data = {
      sender,
      receiver,
      message : text,
    };
    postChat(data);
    reset();
  };

  return (
    <div>
      
      <form  className="fixed bottom-10 right-10 flex" onSubmit={handleSubmit(handleSubmitMessage)}>
      <input  className="mr-3 rounded-full p-4 border-2 border-primary" placeholder="Message" {...register("text")} />
      <button
        type="submit"
        className="bg-primary/10 p-4 rounded-full flex items-center hover:bg-primary hover:text-white gap-1"
      >
        Send <AiOutlineSend />
      </button>
      </form>
    </div>
  );
};

export default ChatInput;
