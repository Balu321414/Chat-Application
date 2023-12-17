import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"

const Home = ({ socket }) => {
  const navigate = useNavigate()
  const [userName, setUserName] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    localStorage.setItem("userName", userName)
    socket.emit("newUser", { userName, socketID: socket.id })
    navigate("/chat")
  }
  return (
    <div className='main_Container'>
      <form className='home__container' onSubmit={handleSubmit}>
        <h2 className='home__header'>Sign in to Open Chat</h2>
        <label htmlFor="username" className='name'>Username</label>
        <input type="text"
          minLength={4}
          name="username"
          id='username'
          className='username__input'
          value={userName}
          onChange={e => setUserName(e.target.value)}
        />
        <button className='home__cta'>SIGN IN</button>
      </form>
    </div>

  )
}

export default Home