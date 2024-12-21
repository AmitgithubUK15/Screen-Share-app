import  {  useEffect } from 'react'
import { useSocket } from '../context/socketConfig/SocketConfig'
import { Link } from 'react-router-dom';

export default function Home() {
  const socket = useSocket();

  useEffect(()=>{
    console.log(socket);
  },[socket])

  return (
    <div>Home
      <Link to="/room">
      <button>Go to room</button> 
      </Link>
    </div>
  )
}
