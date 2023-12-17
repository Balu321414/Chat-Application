import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import swal from 'sweetalert'

const ChatBody = ({ messages, typingStatus, lastMessageRef,handleClickDelete }) => {
  const navigate = useNavigate()
  const [setIndex,setIndexData]=useState()


  const handleLeaveChat = () => {
    localStorage.removeItem("userName")
    navigate("/")
    window.location.reload()
  }
const handleClickLike=()=>{
  swal('',"You Liked Message in Chat","success")
}
  const LikeDeleteComponent=(id)=>{
    return(
      <ul type='square'>
      <li><button style={{border:'none',marginBottom:10}} onClick={()=>handleClickLike(id)}>Like</button></li>
      <li><button style={{border:'none',cursor:'pointer'}} onClick={()=>handleClickDelete(id)}>delete</button></li>
    </ul>
    )
  }
  return (
    <>
      <header className='chat__mainHeader'>
        <p>Hangout with Friends</p>
        <button className='leaveChat__btn' onClick={handleLeaveChat}>LEAVE CHAT</button>
      </header>


      <div className='message__container'>
        {messages.map((message,index) => (
          message.name === localStorage.getItem("userName") ? (
            <div className="message__chats" key={message.id}>
              <p className='sender__name'>You</p>
              <div className='message__sender' onClick={() =>{ 
                setIndexData(index)}}>
                <p>{message.text}</p>
              </div>
              <div className='message__sender1'>
              {setIndex===index&& <LikeDeleteComponent id={index} />}
              </div>
            </div>
          ) : (
            <div className="message__chats" key={message.id}>
              <p>{message.name}</p>
              {message.text&&<div className='message__recipient'>
                <p>{message.text}</p>
              </div>
}
            </div>
          )
        ))}

        <div className='message__status'>
          <p>{typingStatus}</p>
        </div>
        <div ref={lastMessageRef} />
      </div>
    </>
  )
}

export default ChatBody;