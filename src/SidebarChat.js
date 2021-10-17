import './sidebarChat.css'
import { Avatar } from '@mui/material';
import {useState, useEffect} from 'react'
import db from './firebase'
import {query, collection, addDoc} from 'firebase/firestore'
import {Link} from 'react-router-dom'

function SidebarChat({addNewChat, id, name}) {

  const [seed, setSeed] = useState('')

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 500))
  }, [])

  const createChat = () => {
    const roomName = prompt('Please enter name for chat room')

    if (roomName){
      const q = query(collection(db, 'rooms'))
      addDoc(q, {
        name: roomName,
      });
    }
  }

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className='sidebarChat'>
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
        <div className='sidebarChat__info'>
          <h2>{name}</h2>
          <p>Last message...</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className='sidebarChat'>
      <h2>Add new chat</h2>
    </div>
  )
}

export default SidebarChat
