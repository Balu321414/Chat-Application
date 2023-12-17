import React, { useEffect, useState, useRef } from 'react'
import ChatBar from './ChatBar'
import ChatBody from './ChatBody'
import ChatFooter from './ChatFooter'
import swal from 'sweetalert'

const ChatPage = ({ socket }) => {
  const [messages, setMessages] = useState([])
  const [typingStatus, setTypingStatus] = useState("")
  const lastMessageRef = useRef(null);

  useEffect(() => {
    socket.on("messageResponse", data => setMessages([...messages, data]))
  }, [socket, messages])

  useEffect(() => {
    socket.on("typingResponse", data => setTypingStatus(data))
  }, [socket])

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  

  const handleClickDelete = (id) => {
   swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this data!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      const datareponse=messages.map((item,index)=>{
        if(index!==id?.id){
         return item
        }
        return messages.splice(id?.id,1)
         })
        setMessages(datareponse)
      swal("Poof! Your data has been deleted!", {
        icon: "success",
      });
    } else {
      swal("Your data is safe!");
    }
  });
  }
  return (
    <div className="chat">
      <ChatBar socket={socket} />
      <div className='chat__main'>
        <ChatBody messages={messages} typingStatus={typingStatus} lastMessageRef={lastMessageRef} handleClickDelete={handleClickDelete} />
        <ChatFooter socket={socket} />
      </div>
    </div>
  )
}

export default ChatPage;