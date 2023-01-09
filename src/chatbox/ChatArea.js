import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetUserByIdQuery } from '../features/user/userApi';
import ChatInput from './ChatInput';

const ChatArea = () => {

  const {id} = useParams();
  const { data } = useGetUserByIdQuery(id);
  const receiver = data?.data;

  

  return (
   <div className="p-10">
      <div className="bg-primary/10 p-5 rounded-2xl">
        <h1 className="font-semibold text-xl">{receiver.firstName} {receiver.lastName}</h1>
      </div>
      <div className="grid grid-cols-2 gap-5 mt-5 relative">
        <ChatInput/>
      </div>
    </div>
  )
}

export default ChatArea