import React from 'react'
import { createContext ,useContext,useEffect,useState} from 'react'
import {useSelector} from 'react-redux'
import {io} from 'socket.io-client'

const SocketProvider = createContext(null);

export const useSocket = ()=>{
    const socket = useContext(SocketProvider);
    return socket;
}

export default function SocketConfig({children}) {
  const [socket,setSocket] = useState();
  const {S_ID} = useSelector((state)=>state.user);

  useEffect(()=>{
    let websocket;
    if(S_ID !== null ){
        websocket = io("http://localhost:8080",{
            query:{userID:S_ID},
            transports:['websocket','polling']
        })

        websocket.on("message",(msg)=>{
            console.log(msg);
        })

    
        setSocket(websocket);
    }

    return ()=>{
        if(websocket){
            websocket.disconnect();
            setSocket(null);
        }
    }
  },[S_ID]);

  return (
    <SocketProvider.Provider value={socket}>
        {children}
    </SocketProvider.Provider>
  )
}
