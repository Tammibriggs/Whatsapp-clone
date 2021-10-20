import './sidebarChat.css'
import { Avatar } from '@mui/material';
import {useState, useEffect} from 'react'
import db from './firebase'
import {query, collection, addDoc, onSnapshot, orderBy} from 'firebase/firestore'
import {Link} from 'react-router-dom'

function SidebarChat({addNewChat, id, name}) {

  const [seed, setSeed] = useState('')
  const [messages, setMessages] = useState('')

  useEffect(() => {
    if(id){
      let ref = collection(db, 'rooms', id, 'messages')
      let orderedMessages = query(ref, orderBy('timestamp', 'desc'))
      onSnapshot(
        orderedMessages,
        snapshot => {
        let arr = []
        console.log(snapshot)
        snapshot.docs.map(docs => 
          arr.push({
            data: docs.data()
          }))
        setMessages(arr)
      })
    }
  },[id])


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
          <p>{messages[0]?.data?.message}</p>
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
