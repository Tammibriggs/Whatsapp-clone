import './chat.css'
import { Avatar, IconButton } from '@mui/material';
import {useState, useEffect} from 'react'
import {SearchOutlined, AttachFile, MoreVert} from '@mui/icons-material';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import {useParams} from 'react-router-dom'
import db from './firebase'
import {doc, onSnapshot, query, collection, orderBy, addDoc, FieldValue, serverTimestamp} from 'firebase/firestore'
import {useStateValue} from './StateProvider'

function Chat() {

  const [seed, setSeed] = useState('')
  const [input, setInput] = useState('')
  const {roomId} = useParams()
  const [roomName, setRoomName] = useState('')
  const [messages, setMessages] = useState([])
  const [{user}, dispatch] = useStateValue()

  console.log(user)

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 500))
  }, [roomId])

  useEffect(() => {
    if(roomId){
      onSnapshot(doc(db, 'rooms', roomId), (doc) => {
        setRoomName(doc.data().name)
      })
      let ref = collection(db, 'rooms', roomId, 'messages')
      let orderedMessages = query(ref, orderBy('timestamp', 'asc'))
      onSnapshot(
        orderedMessages,
        snapshot => {
        let arr = []
        snapshot.docs.map(docs => 
          arr.push({
            data: docs.data()
          }))
        setMessages(arr)
      })
    }

  }, [roomId])

  const sendMessage = e => {
    e.preventDefault()

    let ref = collection(db, 'rooms', roomId, 'messages')
    addDoc(ref, {
      message: input,
      name: user.displayName,
      timestamp: serverTimestamp(new FieldValue),
      email: user.email
    })

    setInput('')
  }

  console.log('This is the message', messages)

  return (
    <>
    {roomId ? <div className='chat'>
     <div className='chat__header'>
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/> 
        <div className='chat__headerInfo'>
          <h3>{roomName}</h3>
          <p>
            last seen{" "}
            {new Date(
              messages[messages.length - 1]?.data.timestamp?.toDate()
            ).toUTCString()}
          </p>
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
        {messages.map((message) => (
          <p className= {`chat__message ${message.data.email === user.email && 'chat__reciever'}`}>
            <span className='chat__name'>{message.data.name}</span>
            {message.data.message}
            <span className='chat__timestamp'>
              {new Date(message.data.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
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
    </div> : <div className='nochat'></div> }
    </>
  )
}

export default Chat
