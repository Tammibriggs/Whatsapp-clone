import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './sidebar.css'
import { Avatar, IconButton } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import SidebarChat from './SidebarChat';
import { onSnapshot, collection, query } from "firebase/firestore";
import db from './firebase'
import {useState, useEffect} from 'react'
import {useStateValue} from './StateProvider'

function Sidebar() {

  const [rooms, setRooms] = useState([])
  const [{user}, dispatch] = useStateValue()

  useEffect(() => {
    const q = query(collection(db, "rooms"));
    onSnapshot(q, (querySnap) => {
      let arr = [];
      querySnap.forEach((doc) => {
        arr.push( {
          id: doc.id,
          data: doc.data()
        })
      });
      setRooms(arr);
    })
  }, [])  

  console.log(user)

  return (
    <div className='sidebar'>
      <div className='sidebar__header'>
        <Avatar src={user?.photoURL}/>
        <div className='sidebar__headerRight'>
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton >
            <ChatIcon />
          </IconButton >
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className='sidebar__search'>
        <div className='sidebar__searchContainer'>
          <SearchOutlined />
          <input placeholder='Search or start new chat' type='text'/>
        </div>
      </div>

      <div className='sidebar__chats'>
        <SidebarChat addNewChat/>
        {rooms.map(room => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name}/>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
