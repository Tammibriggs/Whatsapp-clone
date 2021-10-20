import './App.css';
import Sidebar from './Sidebar'
import Chat from './Chat'
import {BrowserRouter as Router, Routes, Route, useParams} from 'react-router-dom'
import Login from './Login'
import {useStateValue} from './StateProvider'

function App() {
  const [{user}, dispatch] = useStateValue()

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
      <div className='app__body'>
        <Router>
          <Sidebar />
          <Routes>
            <Route path='/' element={ <Chat />} exact />
            <Route path='/rooms/:roomId' element={ <Chat />} exact/>
          </Routes>
        </Router>
      </div>
      )}
    </div>
  );
}

export default App;
