import './App.css'
import {io} from 'socket.io-client';

function App() {
  let socket = io("http://localhost:8080");



  socket.on('connect',()=>{
    console.log("connected");
  });

  return (
    <>
    <div>
      Socket connecting
    </div>
    </>
  )
}

export default App
