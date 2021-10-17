import './sidebarChat.css'
import { Avatar } from '@mui/material';
import {useState, useEffect} from 'react'

function SidebarChat({addNewChat}) {

  const [seed, setSeed] = useState('')

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 500))
  }, [])

  const createChat = () => {
    const roomName = prompt('Please enter name for chat')

    if (roomName){
      // do some clever database stuff...
    }
  }

  return !addNewChat ? (
    <div className='sidebarChat'>
      <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
      <div className='sidebarChat__info'>
        <h2>Room name</h2>
        <p>Last message</p>
      </div>
    </div>
  ) : (
    <div onClick={createChat} className='sidebarChat'>
      <h2>Add new chat</h2>
    </div>
  )
}

export default SidebarChat
