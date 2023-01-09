import React from 'react';
import { useParams } from 'react-router-dom';
import ChatInput from './ChatInput';

const ChatArea = () => {

  const {id} = useParams();


  return (
   <div className="p-10">
      <div className="bg-primary/10 p-5 rounded-2xl">
        <h1 className="font-semibold text-xl">{id}</h1>
      </div>
      <div className="grid grid-cols-2 gap-5 mt-5 relative">
        <ChatInput/>
      </div>
    </div>
  )
}

export default ChatArea