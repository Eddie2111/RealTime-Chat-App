// client.js

import React, { useState, useEffect } from 'react';
import {io} from 'socket.io-client';
import axios from 'axios';

interface messages {
    name: string;
    message: string;
}

function Chat() {
  const socket = io("http://localhost:3200");
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<messages>();
  const [inbox, setInbox] = useState<messages[]>([
    {name:"alpha",message:"dataset"},
    {name:"beta",message:"dataset2"}
]);
  useEffect(()=>{
    // learn axios here
    if(messages){
        setInbox([...inbox,messages])
    }
    },[messages])
  const handleSubmit = async(event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(message){
        setMessages({ name: 'firstUser', message });
        socket.emit("sendMessage", { name: 'firstUser', message });
        setMessage('');
    }
  };
  

  return (
    <div className="container">
    <div className='inbox'>
        <div className="messages">
        {inbox.map((message, index) => (
            <div key={index}>
                <p>{message.name}→<span>{message.message}</span></p>
            </div>
        ))}
        </div>
        </div>
      <form onSubmit={handleSubmit} className="inputbox">
        <input type="text" className="width" value={message} onChange={e => setMessage(e.target.value)} />
        <button className='submitbutton' type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chat;
