import './chat.css'
import { Avatar, IconButton } from '@mui/material';
import {useState, useEffect} from 'react'
import {SearchOutlined, AttachFile, MoreVert} from '@mui/icons-material';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import {useParams} from 'react-router-dom'
import db from './firebase'
import {doc, onSnapshot, query, collection, orderBy} from 'firebase/firestore'

function Chat() {

  const [seed, setSeed] = useState('')
  const [input, setInput] = useState('')
  const {roomId} = useParams()
  const [roomName, setRoomName] = useState('')

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 500))
  }, [roomId])

  useEffect(() => {
    if(roomId){
      onSnapshot(doc(db, 'rooms', roomId), (doc) => {
        setRoomName(doc.data().name)
      })
    }
  }, [roomId])


  const sendMessage = e => {
    e.preventDefault()
    console.log('yoo types >> ', input)
    setInput('')
  }

  return (
    <div className='chat'>
      <div className='chat__header'>
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
       
        <div className='chat__headerInfo'>
          <h3>{roomName}</h3>
          <p>Last seen at ...</p>
        </div>
        <div className='chat__headerRight'>
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton >
            <AttachFile />
          </IconButton >
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className='chat__body'>
        <p className= {`chat__message ${true && 'chat__reciever'}`}>
          <span className='chat__name'>
            Tammibriggs
          </span>
          Hey Guys
          <span className='chat__timestamp'>3.52pm</span>
        </p>
        <p className='chat__message'>Hey Guys</p>
        <p className='chat__message'>Hey Guys</p>
      </div>
      <div className='chat__footer'>
        <InsertEmoticonIcon />
        <form>
          <input type='text' placeholder='Type a message' value={input} onChange={e => setInput(e.target.value) }/>
          <button
            onClick={sendMessage}
            type='submit'>Send a message</button>
        </form>
        <MicIcon />
      </div>
    </div>
  )
}

export default Chat
