import React, { useState, useEffect } from 'react'
import { createStore } from 'redux'
import { counterReducer } from './ReduxStore'


const ChatBar = ({ socket }) => {
    const [users, setUsers] = useState([])
    let store = createStore(counterReducer)
    store.subscribe(() => setUsers(store.getState()))

    useEffect(() => {
        socket.on("newUserResponse", data => store.dispatch({ type: 'firstData', data }))
    }, [socket, users])

    return (
        <div className='chat__sidebar'>
            <h2>Open Chat </h2>
            <div>
                <h4 className='chat__header'>ACTIVE USERS</h4>
                <div className='chat__users'>
                    {users.map(user => <p key={user.socketID}>{user.userName}</p>)}
                </div>
            </div>
        </div>
    )
}

export default ChatBar